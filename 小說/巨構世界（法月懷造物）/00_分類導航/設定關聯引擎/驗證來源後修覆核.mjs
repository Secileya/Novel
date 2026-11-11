import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {createHash} from 'node:crypto';import {spawnSync,execFileSync} from 'node:child_process';import {fileURLToPath,pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
import {readRevalidations,applyAttestationRevalidations,readEffectiveJson} from './來源後修_證據覆核.mjs';
import {loadLedger,loadBridge} from './AI接手_分片讀取.mjs';
const home=path.dirname(fileURLToPath(import.meta.url)),project=path.resolve(home,'../..'),repo=execFileSync('git',['rev-parse','--show-toplevel'],{cwd:home,encoding:'utf8'}).trim();
const patches=readRevalidations(home),ledger=loadLedger(home),bridge=loadBridge(home);
assert.equal(new Set(ledger.records.map(r=>r.source_path)).size,ledger.records.length);
for(const p of patches)for(const x of p.attestation_replacements){
 const actual=ledger.records.find(r=>r.source_path===x.path);assert(actual);
 const latest=patches.flatMap(p=>p.attestation_replacements).filter(r=>r.path===x.path).at(-1);
 assert.equal(actual.git_blob_sha,latest.record.git_blob_sha); // earlier attestations are historical steps of the same SHA chain
 for(const dep of actual.semantic_quality_v2?.dependency_impact_review||[])for(const e of dep.evidence||[]){
  const b=fs.readFileSync(path.join(project,e.source_path)),hash=createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
  assert.equal(hash,e.git_blob_sha);assert(b.toString('utf8').split(/\r?\n/)[e.line-1]?.includes(e.quote));
 }
 const missing={records:[{...x.record,git_blob_sha:'0'.repeat(40)}]};assert.throws(()=>applyAttestationRevalidations(missing,home),/base does not match/);
}
const b=JSON.parse(fs.readFileSync(path.join(home,'AI接手_工作板.json'))),claims=b.audited_batch_paths.flatMap(p=>readEffectiveJson(path.basename(p),home).records);
for(const c of claims){const g=bridge.records.find(x=>x.audit_id===c.id);assert(g);assert.equal(g.primary_source_anchor.git_blob_sha,c.evidence[0].git_blob_sha);assert.equal(g.primary_source_anchor.line,c.evidence[0].line);}
if(process.argv.includes('--negative-test')){
 const tmp=fs.mkdtempSync(path.join(repo,'.audit-revalidation-test-')),fixtureHome=path.join(tmp,'project','00_分類導航','設定關聯引擎'),fixtureProject=path.resolve(fixtureHome,'../..');fs.mkdirSync(fixtureHome,{recursive:true});
 const name='20261110_fixture.json',mod=pathToFileURL(path.join(home,'來源後修_證據覆核.mjs')).href;
 const hash=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
 function check(change,pass=false,wrongSHA=false){
  const p=structuredClone(patches[0]);change(p);
  for(const m of patches[0].anchor_migrations){const f=path.join(fixtureProject,m.path);fs.mkdirSync(path.dirname(f),{recursive:true});fs.copyFileSync(path.join(project,m.path),f);}
  const bytes=Buffer.from(JSON.stringify(p));fs.writeFileSync(path.join(fixtureHome,name),bytes);fs.writeFileSync(path.join(fixtureHome,'AI接手_增量分片清單.json'),JSON.stringify({revalidations:[{path:name,git_blob_sha:wrongSHA?'0'.repeat(40):hash(bytes)}]}));
  const r=spawnSync(process.execPath,['--input-type=module','-e',`import {readRevalidations} from ${JSON.stringify(mod)};readRevalidations(${JSON.stringify(fixtureHome)});`],{cwd:repo,encoding:'utf8'});
  assert.equal(r.status===0,pass,r.stderr);
 }
 try{
  check(()=>{},true);
  check(()=>{},false,true);
  check(p=>{p.anchor_migrations[0].insert_count++;});
  check(p=>{p.anchor_migrations[0].decision_quote='__NOT_IN_SOURCE__';});
  check(p=>{p.attestation_replacements[0].counterchecks.pop();});
  check(p=>{p.attestation_replacements.push(p.attestation_replacements[0]);});
  check(p=>{p.newly_accepted_source_count=16;});
  check(p=>{p.anchor_migrations[0].to_sha='0'.repeat(40);});
 }finally{if(path.dirname(tmp)!==path.resolve(repo)||!path.basename(tmp).startsWith('.audit-revalidation-test-'))throw Error('unsafe fixture cleanup');fs.rmSync(tmp,{recursive:true});}
}
console.log(`來源後修覆核通過：${patches.length}個SHA分片、${patches.reduce((n,p)=>n+p.attestation_replacements.length,0)}份既有來源重驗，新增計數0；歷史帳與舊分片不改。`);
