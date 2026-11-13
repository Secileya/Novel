/**
 * Offline regression test of the real Apps Script Code.gs using Node's vm.
 * No Google credentials, GitHub network access or writes to user's Drive.
 * Run: node tools/google_drive_mirror/test_quick_sync.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('tools/google_drive_mirror/Code.gs','utf8');
const PREFIX='小說/巨構世界（法月懷造物）/';
const sha = char => char.repeat(40);
const makeEntry = (name,size,hash) => ({path:PREFIX+name,size,sha:hash});
const mkIndex = (entries,commit,changedFiles=[]) => ({
  sourceCommit:commit,sourceRevision:commit,sourceTreeSha:sha('f'),
  familySourceCommit:commit,familySourceTreeSha:sha('f'),files:entries,
  changedFiles:changedFiles.map(e=>({path:e.path,sha:e.sha,change:'added'}))
});
const four = [
  makeEntry('06_敘事規劃與工作流/128題_機讀索引.json',87500,sha('1')),
  makeEntry('08_交接勘誤與決議/ch19_old_new.json',18760,sha('2')),
  makeEntry('待定正文/ch19_R0.md',67344,sha('3')),
  makeEntry('待定正文/ch19_R1.md',67572,sha('4'))
];

function setup({index, state, props={}, failPath=null}) {
  const writes=[], enabled=[], handoffs=[], manifests=[], log={};
  const cache=new Map(Object.entries(props));
  const ctx=vm.createContext({ Date, console });
  vm.runInContext(source,ctx,{filename:'Code.gs'});
  ctx.LockService={getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})};
  ctx.PropertiesService={getScriptProperties:()=>({
    getProperty:k=>cache.get(k)??null,
    setProperty:(k,v)=>cache.set(k,String(v))
  })};
  ctx.DriveApp={getFolderById:()=>({})};
  ctx.Utilities={newBlob:()=>({getDataAsString:()=>''})};
  ctx.readSourceIndex_=()=>index;
  ctx.getOrCreateManifest_=()=>({});
  ctx.parseState_=()=>state;
  ctx.getOrCreateSubfolder_=()=>({});
  ctx.fetchPinnedBytes_=path=>({path});
  ctx.gitBlobSha_=bytes=>(index.files.find(x=>x.path===bytes.path)||{}).sha;
  ctx.makeMirrorText_=(entry,commit,raw)=>'wrapped:'+entry.path;
  ctx.writeMirrorFileFast_=(old,folder,name,content)=>{
    if (name===failPath) throw Error('simulated write failure');
    writes.push({name,content,old});
    return {id:'drive:'+name,mime:'text/plain'};
  };
  ctx.makeFastHandoff_=(index,state,changed,pending,applied,errors)=>{
    handoffs.push({changed:[...changed],pending:[...pending],applied:[...applied],errors:[...errors]});
    return 'HANDOFF';
  };
  ctx.writeFastHandoff_=()=> 'handoff-id';
  ctx.saveState_=(file,state)=>manifests.push(JSON.parse(JSON.stringify(state)));
  ctx.ensureTrigger_=(fn,minutes)=>enabled.push({fn,minutes});
  return {run:()=>ctx.syncQuick(),writes,enabled,props:cache,state,manifests,handoffs,log};
}

// Regression: a prior index is already marked seen and has zero pending,
// but four files were NEVER mirrored (three exceed the old 64,000-byte limit).
{
  const old=makeEntry('already-current.md',1000,sha('5'));
  const index=mkIndex([...four,old],sha('a'),[old]);
  const state={
    schema:1,files:{'already-current.md':{blobSha:old.sha,status:'CURRENT',driveId:'existing'}},
    quickLaneIndexCommit:index.sourceCommit,
    quickLanePendingPaths:[],
    quickLaneChangedPaths:['already-current.md']
  };
  const test=setup({index,state,props:{megaQuickCommit:index.sourceCommit,megaQuickHasPending:'0'}});
  let res=test.run();
  assert.equal(res.updated,2,'missing sources recovered even when commit is unchanged');
  assert.equal(res.pending,2);
  assert.equal(test.writes.length,2);
  assert.equal(test.props.get('megaQuickRevision'),'2026-11-12-reconcile-v2');
  res=test.run();
  assert.equal(res.updated,2);
  assert.equal(res.pending,0);
  assert.equal(test.writes.length,4);
  assert.deepEqual(new Set(test.writes.map(x=>x.name)),new Set(four.map(e=>e.path.split('/').pop())));
  assert.equal(test.run().status,'NO_SOURCE_CHANGE');
  for(const f of four) {
    const rel=f.path.slice(PREFIX.length);
    assert.equal(state.files[rel].blobSha,f.sha,'each source SHA matches current manifest');
  }
  assert.equal(state.files['already-current.md'].driveId,'existing','existing mirror untouched');
}

// Regression: two source-index publications between polls; only the *latest*
// new source appears in changedFiles, so the earlier new source must still sync.
{
  const older=makeEntry('older.md',1200,sha('6'));
  const latest=makeEntry('latest.md',1300,sha('7'));
  const index=mkIndex([older,latest],sha('b'),[latest]);
  const state={schema:1,files:{},quickLaneIndexCommit:sha('a'),quickLanePendingPaths:[],quickLaneChangedPaths:[]};
  const test=setup({index,state,props:{megaQuickCommit:sha('a'),megaQuickHasPending:'0',megaQuickRevision:'2026-11-12-reconcile-v2'}});
  const res=test.run();
  assert.equal(res.updated,2);
  assert.deepEqual(new Set(test.writes.map(x=>x.name)),new Set(['older.md','latest.md']));
}

// Regression: huge file is not silently discarded; it remains pending and
// wakes full sync. Once full sync publishes CURRENT the fast queue drains.
{
  const huge=makeEntry('huge.md',200000,sha('8'));
  const index=mkIndex([huge],sha('c'),[huge]);
  const state={schema:1,files:{},quickLaneIndexCommit:sha('b'),quickLanePendingPaths:[],quickLaneChangedPaths:[]};
  const test=setup({index,state,props:{megaQuickCommit:sha('b'),megaQuickHasPending:'0',megaQuickRevision:'2026-11-12-reconcile-v2'}});
  let result=test.run();
  assert.equal(result.updated,0);
  assert.equal(result.deferredLarge,1);
  assert.equal(result.pending,1);
  assert.ok(test.enabled.some(x=>x.fn==='syncDrain'&&x.minutes===5));
  assert.deepEqual(test.state.quickLaneDeferredLargePaths,['huge.md']);
  assert.equal(test.writes.length,0,'no over-limit fast download');
  state.files['huge.md']={blobSha:huge.sha,status:'CURRENT',driveId:'full-mirror-id'};
  result=test.run();
  assert.equal(result.pending,0);
  assert.equal(result.deferredLarge,0);
  assert.equal(test.run().status,'NO_SOURCE_CHANGE');
}

// Regression: a fast-lane save failure cannot mark the mirror CURRENT.
{
  const f=makeEntry('broken.md',1500,sha('9'));
  const index=mkIndex([f],sha('d'),[f]);
  const state={schema:1,files:{},quickLaneIndexCommit:sha('c'),quickLanePendingPaths:[],quickLaneChangedPaths:[]};
  const test=setup({index,state,props:{megaQuickCommit:sha('c'),megaQuickHasPending:'0',megaQuickRevision:'2026-11-12-reconcile-v2'},failPath:'broken.md'});
  const res=test.run();
  assert.equal(res.status,'PARTIAL_WITH_ERRORS');
  assert.equal(res.pending,1);
  assert.equal(state.files['broken.md'],undefined);
}

console.log('PASS: fast index catch-up, 128KB originals, large-file draining, state and failed writes');

 
// Family source paths must be namespaced, while existing giant-world keys stay unchanged.
{
  const family={path:'小說/家庭總檔/00_總檔交接.md',sha:sha('9'),size:2000};
  const giant=makeEntry('00_總檔交接.md',2000,sha('a'));
  const index=mkIndex([giant,family],sha('d'),[giant,family]);
  const state={schema:1,files:{}};
  const test=setup({index,state});
  assert.equal(test.run().updated,2);
  assert.equal(state.files['00_總檔交接.md'].blobSha,giant.sha);
  assert.equal(state.files['家庭總檔/00_總檔交接.md'].blobSha,family.sha);
  assert.equal(test.writes.length,2);
}
