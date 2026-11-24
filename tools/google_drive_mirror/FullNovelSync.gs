/** Secileya/Novel full repository incremental mirror (independent of old scope).
 * Paste as a NEW .gs file in the existing Stingray Apps Script project.
 * Baseline is the verified Drive recovery chain, ending 04474db.
 * Immutable plans/receipts, small pointer in ScriptProperties, no destructive updates.
 * No GitHub writes. No API token. No sharing changes. Raw files, not converted Docs.
 */
const NOVEL_FULL = Object.freeze({
  api:'https://api.github.com/repos/Secileya/Novel',
  raw:'https://raw.githubusercontent.com/Secileya/Novel/',
  base:'04474db91ce20f6eba68ee146c52528828569e69',
  baseManifest:'1p-mac5IQX6Z1uPSbtesOWzkWoNisfpuf',
  deltaRoot:'1eppxXt86PrH4Xd5vNS4q3EIzc4hdBURK',
  maintenance:'10kAkAtAcKA1mIDFGAhwSdVFJ6E4QFYwz',
  oldManifest:'1s9GM0w-zHkhwlQAy3hopKPy-0sDdOzN0',
  stateKey:'NOVEL_FULL_DELTA_V1', oldBackupKey:'NOVEL_OLD_SAFE_BACKUP_V1',
  maxFiles:8, maxMs:65000, maxBytes:45000000
});
function installFullNovelSync() {
  const result=fullNovelSyncNow(); // first real run before installing the trigger
  if(result.status==='BUSY') throw Error('Other sync busy; run installFullNovelSync again later');
  if(!ScriptApp.getProjectTriggers().some(t=>t.getHandlerFunction()==='fullNovelSyncNow'))
    ScriptApp.newTrigger('fullNovelSyncNow').timeBased().everyHours(1).create();
  return result;
}
function stopFullNovelSync(){
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='fullNovelSyncNow').forEach(t=>ScriptApp.deleteTrigger(t));
  return {status:'STOPPED',oldMirrorUnchanged:true};
}
function fullNovelSyncNow(){
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(0)) return {status:'BUSY'};
  try{
    const start=Date.now(), props=PropertiesService.getScriptProperties(), c=NOVEL_FULL;
    const root=DriveApp.getFolderById(c.deltaRoot);
    const baseline=JSON.parse(DriveApp.getFileById(c.baseManifest).getBlob().getDataAsString('UTF-8'));
    if(baseline.head!==c.base||!Array.isArray(baseline.entries))throw Error('Baseline manifest mismatch');
    const saved=props.getProperty(c.stateKey);
    const state=saved?JSON.parse(saved):{complete:c.base,pending:null};
    if(!nfSha_(state.complete))throw Error('Bad state pointer; do not reset');
    if(!state.pending){
      const head=nfApi_('/branches/main').commit;
      if(!head||!nfSha_(head.sha)||!nfSha_(head.commit.tree.sha))throw Error('Invalid branch response');
      if(head.sha===state.complete){const r={status:'UP_TO_DATE',complete:state.complete};console.log(JSON.stringify(r));return r;}
      const prev=nfApi_('/git/commits/'+state.complete);
      const old=nfTree_(prev.tree.sha), current=nfTree_(head.commit.tree.sha);
      const plan=nfPlan_(state.complete,head.sha,old,current);
      const batch=nfFolder_(root,'AUTO_'+state.complete+'__'+head.sha);
      const planFile=nfImmutableText_(batch,'_PLAN.json',JSON.stringify(plan,null,2),'application/json');
      state.pending={head:head.sha,folder:batch.getId(),plan:planFile.getId(),planHash:nfHash_(planFile.getBlob().getBytes()),cursor:0};
      props.setProperty(c.stateKey,JSON.stringify(state));
    }
    const p=state.pending,batch=DriveApp.getFolderById(p.folder),planBytes=DriveApp.getFileById(p.plan).getBlob().getBytes();
    if(nfHash_(planBytes)!==p.planHash)throw Error('Plan damaged; refusing to advance');
    const plan=JSON.parse(Utilities.newBlob(planBytes).getDataAsString('UTF-8'));
    if(plan.base!==state.complete||plan.head!==p.head||!Array.isArray(plan.changes)||!Number.isInteger(p.cursor)||p.cursor<0||p.cursor>plan.changes.length)throw Error('Plan/pointer mismatch');
    const data=nfFolder_(batch,'原始檔'), receipts=nfFolder_(batch,'核驗與閱讀導航'), cache={'':data};
    let count=0;
    // Commit each independently verified receipt before moving the cursor.
    while(p.cursor<plan.changes.length && count<c.maxFiles && Date.now()-start<c.maxMs){
      const i=p.cursor,e=plan.changes[i], parts=e.path.split('/'),name=parts.pop();
      const dir=nfPath_(data,parts.join('/'),cache);
      const f=nfGetFile_(dir,name);
      let verified=f;
      if(f){if(f.getSize()!==e.size||nfGitSha_(f.getBlob().getBytes())!==e.sha)throw Error('Existing conflicting raw file: '+e.path);}
      else{
        const bytes=nfFetchBytes_(plan.head,e);
        verified=dir.createFile(Utilities.newBlob(bytes,nfMime_(name),name));
        if(verified.getSize()!==e.size||nfGitSha_(verified.getBlob().getBytes())!==e.sha)throw Error('Drive readback failed: '+e.path);
      }
      const record={index:i,path:e.path,gitBlobSha:e.sha,mode:e.mode,bytes:e.size,sha256:nfHash_(verified.getBlob().getBytes()),driveId:verified.getId(),url:verified.getUrl()};
      nfImmutableText_(receipts,String(i).padStart(6,'0')+'.json',JSON.stringify(record,null,2),'application/json');
      p.cursor++;props.setProperty(c.stateKey,JSON.stringify(state));count++;
    }
    let result={status:'PARTIAL',base:plan.base,head:plan.head,verified:p.cursor,total:plan.changes.length,deletions:plan.deleted.length,updated:count,folder:batch.getUrl()};
    if(p.cursor===plan.changes.length){
      // All receipts were written and verified before the cursor advanced.
      const complete={schema:1,base:plan.base,head:plan.head,files:plan.changes.length,deletions:plan.deleted.length,planId:p.plan,planSha256:p.planHash,rawFolder:data.getId(),receiptsFolder:receipts.getId(),complete:true};
      nfImmutableText_(batch,'_COMPLETE.json',JSON.stringify(complete,null,2),'application/json');
      const guide=['完整增量：'+plan.base+' → '+plan.head,'已驗證原檔：'+plan.changes.length,'來源移除：'+plan.deleted.length+'（僅列於清冊，不刪除歷史）','原始檔依 GitHub 路徑逐份開啟：'+data.getUrl(),'完整變更路徑清冊：'+DriveApp.getFileById(p.plan).getUrl(),'逐檔 SHA256、Drive 連結與核驗紀錄：'+receipts.getUrl(),'此批只代表來源增量，並非新的 Canon 或已更新舊閱讀合冊。'].join('\n');
      nfImmutableText_(batch,'00_增量閱讀入口.txt',guide,'text/plain');
      state.complete=p.head;state.pending=null;props.setProperty(c.stateKey,JSON.stringify(state));result.status='COMPLETE';
    }
    console.log(JSON.stringify(result));return result;
  }finally{lock.releaseLock();}
}
function fullNovelSyncStatus(){
  const s=PropertiesService.getScriptProperties().getProperty(NOVEL_FULL.stateKey);
  const r=s?JSON.parse(s):{complete:NOVEL_FULL.base,pending:null,installed:false};
  console.log(JSON.stringify(r));return r;
}
function nfSha_(s){return typeof s==='string'&&/^[0-9a-f]{40}$/.test(s);}
function nfApi_(path){
  const r=UrlFetchApp.fetch(NOVEL_FULL.api+path,{muteHttpExceptions:true,headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});
  if(r.getResponseCode()!==200)throw Error('GitHub API HTTP '+r.getResponseCode());return JSON.parse(r.getContentText());
}
function nfTree_(sha){
  if(!nfSha_(sha))throw Error('Invalid tree SHA');const t=nfApi_('/git/trees/'+sha+'?recursive=1');
  if(t.truncated!==false||t.sha!==sha||!Array.isArray(t.tree))throw Error('Incomplete or wrong tree');
  if(t.tree.some(e=>e.type==='commit'))throw Error('Git submodule requires separate policy');
  return t.tree.filter(e=>e.type==='blob');
}
function nfPlan_(base,head,old,current){
  function map(es){const m=new Map();for(const e of es){
    if(typeof e.path!=='string'||e.path.split('/').some(x=>!x||x==='.'||x==='..')||!nfSha_(e.sha)||!Number.isInteger(e.size)||e.size<0||m.has(e.path))throw Error('Invalid tree entry');
    m.set(e.path,{path:e.path,sha:e.sha,size:e.size,mode:e.mode});}return m;}
  const a=map(old),b=map(current),changes=[],deleted=[];
  for(const [k,e] of b){const p=a.get(k);if(!p||p.sha!==e.sha||p.mode!==e.mode)changes.push({...e,oldSha:p?p.sha:null,status:p?'modified':'added'});}
  for(const [k,e] of a)if(!b.has(k))deleted.push(e);
  changes.sort((x,y)=>x.path<y.path?-1:x.path>y.path?1:0);deleted.sort((x,y)=>x.path<y.path?-1:x.path>y.path?1:0);
  return {schema:1,base,head,oldCount:a.size,newCount:b.size,changes,deleted};
}
function nfFetchBytes_(head,e){
  if(e.size>NOVEL_FULL.maxBytes)throw Error('File exceeds safe per-fetch limit: '+e.path);
  const url=NOVEL_FULL.raw+head+'/'+e.path.split('/').map(encodeURIComponent).join('/');
  const r=UrlFetchApp.fetch(url,{muteHttpExceptions:true,followRedirects:true});
  if(r.getResponseCode()===200){const b=r.getBlob().getBytes();const ok=nfVerifyOrBom_(b,e);if(ok)return ok;}
  const blob=nfApi_('/git/blobs/'+e.sha);
  if(blob.sha!==e.sha||blob.encoding!=='base64')throw Error('Unexpected blob response');
  const b=Utilities.base64Decode(blob.content.replace(/\s/g,''));
  if(b.length!==e.size||nfGitSha_(b)!==e.sha)throw Error('Git blob verification failed: '+e.path);return b;
}
function nfVerifyOrBom_(b,e){
  if(b.length===e.size&&nfGitSha_(b)===e.sha)return b;
  if(b.length+3===e.size){const candidate=[-17,-69,-65].concat(b);if(nfGitSha_(candidate)===e.sha)return candidate;}
  return null;
}
function nfHex_(a){return a.map(x=>('0'+((x+256)%256).toString(16)).slice(-2)).join('');}
function nfHash_(b){return nfHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,b));}
function nfGitSha_(b){return nfHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1,Utilities.newBlob('blob '+b.length+'\0').getBytes().concat(b)));}
function nfFolder_(parent,name){const it=parent.getFoldersByName(name);if(!it.hasNext())return parent.createFolder(name);const f=it.next();if(it.hasNext())throw Error('Duplicate folder: '+name);return f;}
function nfPath_(root,path,cache){if(cache[path])return cache[path];let d=root,key='';for(const part of path.split('/').filter(Boolean)){key+=(key?'/':'')+part;d=cache[key]||(cache[key]=nfFolder_(d,part));}return d;}
function nfGetFile_(folder,name){const it=folder.getFilesByName(name);if(!it.hasNext())return null;const f=it.next();if(it.hasNext())throw Error('Duplicate file: '+name);return f;}
function nfImmutableText_(folder,name,text,mime){
  const b=Utilities.newBlob(text,mime,name).getBytes(),h=nfHash_(b);let f=nfGetFile_(folder,name);
  if(!f)f=folder.createFile(Utilities.newBlob(b,mime,name));
  if(f.getSize()!==b.length||nfHash_(f.getBlob().getBytes())!==h)throw Error('Immutable file conflict/damage: '+name);return f;
}
function nfMime_(name){const ext=name.split('.').pop().toLowerCase();return ({png:'image/png',webp:'image/webp',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',svg:'image/svg+xml',pdf:'application/pdf',zip:'application/zip',json:'application/json',csv:'text/csv',tsv:'text/tab-separated-values',md:'text/plain',txt:'text/plain',js:'text/plain',mjs:'text/plain',gs:'text/plain',py:'text/plain',yml:'text/plain',yaml:'text/plain',toml:'text/plain',sha256:'text/plain'})[ext]||'application/octet-stream';}

/** Old mirror backup hooks. Optional until the two explicit old functions are changed. */
function nfValidateOld_(text){const s=JSON.parse(text);if(s.schema!==1||!s.files||typeof s.files!=='object'||Array.isArray(s.files))throw Error('Invalid old manifest');return s;}
function nfOldSignature_(s){return nfHash_(Utilities.newBlob(JSON.stringify([s.files,s.completeCommit||'',s.pending??null])).getBytes());}
function nfBackupOld_(s){
  const c=NOVEL_FULL,props=PropertiesService.getScriptProperties(),sig=nfOldSignature_(s),stored=props.getProperty(c.oldBackupKey);
  if(stored){const p=JSON.parse(stored);if(p.signature===sig){const f=DriveApp.getFileById(p.id),b=f.getBlob().getBytes();if(nfHash_(b)===p.hash){nfValidateOld_(Utilities.newBlob(b).getDataAsString('UTF-8'));return p;}}}
  const text=JSON.stringify(s,null,2),b=Utilities.newBlob(text).getBytes(),hash=nfHash_(b);
  const dir=nfFolder_(DriveApp.getFolderById(c.maintenance),'舊清冊不可變備援');
  const f=nfImmutableText_(dir,'STATE_'+hash+'.json',text,'application/json');
  const p={id:f.getId(),hash,signature:sig};props.setProperty(c.oldBackupKey,JSON.stringify(p));return p;
}
function novelSafeParseOldState_(file){
  try{return nfValidateOld_(file.getBlob().getDataAsString('UTF-8'));}
  catch(err){const saved=PropertiesService.getScriptProperties().getProperty(NOVEL_FULL.oldBackupKey);if(!saved)throw err;
    const p=JSON.parse(saved),b=DriveApp.getFileById(p.id).getBlob().getBytes();if(nfHash_(b)!==p.hash)throw Error('Old backup damaged; refusing to recover');
    const s=nfValidateOld_(Utilities.newBlob(b).getDataAsString('UTF-8'));if(nfOldSignature_(s)!==p.signature)throw Error('Old backup signature mismatch');
    console.warn('Old manifest damaged; using verified backup '+p.id);return s;
  }
}
function novelSafeSaveOldState_(file,state){
  nfValidateOld_(JSON.stringify(state));nfBackupOld_(state); // durable verified generation FIRST
  const text=JSON.stringify(state,null,2),hash=nfHash_(Utilities.newBlob(text).getBytes());
  file.setContent(text);const b=file.getBlob().getBytes();
  if(nfHash_(b)!==hash)throw Error('Old manifest write not verified; protected backup retained');
  nfValidateOld_(Utilities.newBlob(b).getDataAsString('UTF-8'));
}
function initializeOldManifestProtection(){
  const lock=LockService.getScriptLock();if(!lock.tryLock(0))return {status:'BUSY'};
  try{const f=DriveApp.getFileById(NOVEL_FULL.oldManifest),s=nfValidateOld_(f.getBlob().getDataAsString('UTF-8'));const p=nfBackupOld_(s);const r={status:'BACKUP_VERIFIED',id:p.id,files:Object.keys(s.files).length};console.log(JSON.stringify(r));return r;}finally{lock.releaseLock();}
}
