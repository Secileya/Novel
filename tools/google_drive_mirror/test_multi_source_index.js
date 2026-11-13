/* Family/giant index composition: no network access or Drive writes. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const code=fs.readFileSync('tools/google_drive_mirror/Code.gs','utf8');
const ctx=vm.createContext({Date,JSON,console});
vm.runInContext(code,ctx,{filename:'Code.gs'});
const G='小說/巨構世界（法月懷造物）/';
const F='小說/家庭總檔/';
const A='a'.repeat(40),B='b'.repeat(40),C='c'.repeat(40),D='d'.repeat(40);
function index(prefix,commit,tree){
  return {schema:1,repository:'Secileya/Novel',branch:'main',
    sourcePrefix:prefix,sourceCommit:commit,sourceTreeSha:tree,
    files:[{path:prefix+'00_總檔交接.md',sha:tree,size:240}],
    changedFiles:[]};
}
const giant=index(G,A,C),family=index(F,B,D);
ctx.readPublishedIndex_=(path,expectedPrefix)=>{
  if(path==='tools/google_drive_mirror/source-index.json'&&expectedPrefix===G)return giant;
  if(path==='tools/google_drive_mirror/family-source-index.json'&&expectedPrefix===F)return family;
  throw Error('Unexpected index request '+path);
};
const merged=ctx.readSourceIndex_();
assert.equal(merged.sourceCommit,A,'legacy giant commit must remain valid');
assert.equal(merged.familySourceCommit,B);
assert.equal(merged.sourceRevision,A+'|'+B);
assert.equal(merged.files.length,2);
assert.equal(merged.files[0].sourceCommit,A);
assert.equal(merged.files[1].sourceCommit,B);
assert.equal(ctx.sourceMirrorKey_(G+'00_總檔交接.md'),'00_總檔交接.md');
assert.equal(ctx.sourceMirrorKey_(F+'00_總檔交接.md'),'家庭總檔/00_總檔交接.md');
assert.equal(ctx.sourceMirrorKey_('小說/其他/00_總檔交接.md'),null);
const state={files:{'家庭總檔/00_總檔交接.md':{status:'CURRENT',blobSha:D}},
  quickLaneDeferredLargePaths:[]};
const note=ctx.makeFastHandoff_(merged,state,['家庭總檔/00_總檔交接.md'],[],[],[]);
assert.match(note,/DRIVE_CURRENT 家庭總檔\/00_總檔交接.md/);
assert.ok(note.includes('/blob/'+B+'/'),'family pinned URL must use family commit');
assert.ok(!note.includes('/blob/'+A+'/'),'family must not use stale giant commit');
console.log('PASS: separate indexes, stable legacy keys, namespaced family, per-file pinned source commit');
