/* Regression harness for Code.gs. No Google credentials or real Drive writes. */
'use strict';
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('tools/google_drive_mirror/Code.gs','utf8');
function iterator(arr) {
  let i=0;
  return {hasNext(){return i<arr.length;},next(){return arr[i++];}};
}
let nextId=0;
class MockFile {
  constructor(name,content,mime) {
    this.id='mock-'+(++nextId);
    this.name=name;
    this.text=content;
    this.mime=mime;
  }
  getId(){return this.id;}
  getName(){return this.name;}
  getMimeType(){return this.mime;}
  setContent(text){this.text=text;return this;}
  setName(name){this.name=name;return this;}
  moveTo(folder){folder.files.push(this);}
  getBlob(){return {getDataAsString:()=>this.text};}
}
class MockFolder {
  constructor(name){this.name=name;this.files=[];this.folders=[];}
  createFile(name,text,mime) {
    const file=new MockFile(name,text,mime);this.files.push(file);return file;
  }
  createFolder(name) {
    const folder=new MockFolder(name);this.folders.push(folder);return folder;
  }
  getFilesByName(name){return iterator(this.files.filter(f=>f.name===name));}
  getFoldersByName(name){return iterator(this.folders.filter(f=>f.name===name));}
}
function setup() {
  const prefix='小說/巨構世界（法月懷造物）/';
  const first=prefix+'000_現行決策與主題索引.md';
  const second=prefix+'08_交接勘誤與決議/新規則.md';
  const one=Buffer.from('author confirmation test\n','utf8');
  const two=Buffer.from('new source test\n','utf8');
  const hash=bytes=>crypto.createHash('sha1').update(
    Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes])).digest('hex');
  const contents=new Map([[first,one],[second,two]]);
  let index={
    schema:1,repository:'Secileya/Novel',branch:'main',sourcePrefix:prefix,
    sourceCommit:'a'.repeat(40),sourceTreeSha:'b'.repeat(40),
    changedFiles:[{path:first,sha:hash(one),change:'modified'},
      {path:second,sha:hash(two),change:'added'}],
    removedFiles:[],
    files:[{path:first,sha:hash(one),size:one.length},
      {path:second,sha:hash(two),size:two.length}]
  };
  const root=new MockFolder('mirror');
  const filesById=new Map();
  const capture=()=>{
    function walk(folder){
      folder.files.forEach(f=>filesById.set(f.id,f));
      folder.folders.forEach(walk);
    }
    walk(root);
  };
  const existingState={
    schema:1,files:{
      '08_交接勘誤與決議/失敗.md':{status:'SYNC_FAILED',error:'docs create quota'}
    },
    docsCreateQuotaPauseUntil:new Date(Date.now()+3600000).toISOString()
  };
  const manifest=root.createFile('_GITHUB_SYNC_STATE.json',JSON.stringify(existingState),'text/plain');
  capture();
  let creates=0;
  const props=new Map();
  const ctx={
    console,Date,JSON,Buffer,
    LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
    PropertiesService:{getScriptProperties:()=>({
      getProperty:k=>props.get(k)||null,
      setProperty:(k,v)=>props.set(k,v)
    })},
    DriveApp:{
      getFolderById:()=>root,
      getFileById:id=>{
        capture();
        if(!filesById.has(id))throw Error('Unknown file '+id);
        return filesById.get(id);
      }
    },
    DocumentApp:{
      create:()=>{creates++;throw Error('DocumentApp.create must never be called in fast lane');},
      openById:id=>({
        getBody:()=>({
          setText:text=>{capture();filesById.get(id).setContent(text);},
          getText:()=>{capture();return filesById.get(id).text;}
        }),
        saveAndClose:()=>{},
        getId:()=>id
      })
    },
    MimeType:{PLAIN_TEXT:'text/plain',GOOGLE_DOCS:'application/vnd.google-apps.document'},
    ScriptApp:{getProjectTriggers:()=>[],deleteTrigger:()=>{}},
    UrlFetchApp:{fetch:url=>{
      if(url.includes('source-index.json')) {
        return {getResponseCode:()=>200,getContentText:()=>JSON.stringify(index)};
      }
      const suffix=url.split('/').slice(7).map(decodeURIComponent).join('/');
      const path=prefix+suffix.replace(/^.*?小說\/巨構世界（法月懷造物）\//,'');
      let bytes=contents.get(path);
      if(!bytes) {
        const idx=url.indexOf('/'+index.sourceCommit+'/');
        const rawPath=decodeURIComponent(url.slice(idx+index.sourceCommit.length+2));
        bytes=contents.get(rawPath);
      }
      if(!bytes)throw Error('Unexpected raw URL '+url);
      return {getResponseCode:()=>200,getContent:()=>Array.from(bytes)};
    }},
    Utilities:{
      newBlob:value=>{
        const bytes=Buffer.isBuffer(value)?value:
          typeof value==='string'?Buffer.from(value,'utf8'):Buffer.from(value);
        return {getBytes:()=>Array.from(bytes),getDataAsString:()=>bytes.toString('utf8')};
      },
      DigestAlgorithm:{SHA_1:'SHA_1'},
      computeDigest:(algo,bytes)=>Array.from(crypto.createHash('sha1').update(Buffer.from(bytes)).digest())
    }
  };
  vm.runInNewContext(source,ctx,{filename:'Code.gs'});
  return {ctx,root,manifest,contents,props,hash,first,second,one,two,
    getIndex:()=>index,setIndex:v=>{index=v;},getCreates:()=>creates};
}
const s=setup();
const first=s.ctx.syncQuick();
assert.equal(first.status,'CURRENT_CHANGES_READY');
assert.equal(first.updated,2);
assert.equal(first.changed,2);
assert.equal(first.pending,0);
assert.equal(s.getCreates(),0);
let state=JSON.parse(s.manifest.text);
assert.equal(state.files['08_交接勘誤與決議/失敗.md'].status,'SYNC_FAILED');
assert.equal(state.files['000_現行決策與主題索引.md'].status,'CURRENT');
assert.equal(state.files['08_交接勘誤與決議/新規則.md'].status,'CURRENT');
const handoff=s.root.files.find(f=>f.name==='00_最新GitHub變更交接.txt');
assert.ok(handoff,'stable fast handoff should exist');
assert.match(handoff.text,/DRIVE_CURRENT 000_現行決策與主題索引.md/);
assert.match(handoff.text,/Source Git blob SHA: [a-f0-9]{40}/);
assert.match(handoff.text,/Pinned source URL: https:\/\/github.com\/Secileya\/Novel\/blob\//);
const repeated=s.ctx.syncQuick();
assert.equal(repeated.status,'NO_SOURCE_CHANGE');
assert.equal(s.getCreates(),0);
assert.equal(s.root.files.filter(f=>f.name==='00_最新GitHub變更交接.txt').length,1);
const next=Buffer.from('second author confirmation\n');
s.contents.set(s.first,next);
const current=s.getIndex();
s.setIndex(Object.assign({},current,{
  sourceCommit:'c'.repeat(40),sourceTreeSha:'d'.repeat(40),
  previousSourceCommit:current.sourceCommit,
  changedFiles:[{path:s.first,sha:s.hash(next),change:'modified'}],
  files:current.files.map(e=>e.path===s.first?Object.assign({},e,{sha:s.hash(next),size:next.length}):e)
}));
const newer=s.ctx.syncQuick();
assert.equal(newer.updated,1);
state=JSON.parse(s.manifest.text);
assert.equal(state.files['000_現行決策與主題索引.md'].blobSha,s.hash(next));
assert.ok(s.root.files.find(f=>f.name==='00_最新GitHub變更交接.txt').text.includes('c'.repeat(40)));
assert.equal(s.getCreates(),0);
console.log('PASS: delta-based one-minute quick lane, exact SHA, existing backlog untouched, no new Google Docs, stable handoff, repeat skip');