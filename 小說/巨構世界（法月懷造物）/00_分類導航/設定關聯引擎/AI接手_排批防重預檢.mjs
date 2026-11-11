#!/usr/bin/env node
/**
 * Batch-selection preflight gate. NEVER count an already accepted source twice.
 * Sources of truth: immutable historical full-file ledger + EVERY SHA-verified
 * incremental shard. No second counter/registry is maintained.
 *
 * Run BEFORE reading/authoring:
 *   node AI接手_排批防重預檢.mjs --select "04_能力武器與試煉/...md" ...
 *   node AI接手_排批防重預檢.mjs --check
 * Run BEFORE writing a new shard into its manifest:
 *   node AI接手_排批防重預檢.mjs --candidate ./unregistered-shard.json
 * CI: --check --negative-test (rejects duplicates in next_batch and any shard).
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {readManifest,readShards} from './AI接手_分片讀取.mjs';

const home=path.dirname(fileURLToPath(import.meta.url));
const project=path.resolve(home,'../..');
const board=JSON.parse(fs.readFileSync(path.join(home,'AI接手_工作板.json'),'utf8'));
const task=board.tasks.find(x=>x.id==='NEXT-009');
const manifest=readManifest(home);
const shards=readShards(home);
const historical=JSON.parse(fs.readFileSync(path.join(home,'AI接手_整檔語義驗收台帳.json'),'utf8'));
const accepted=new Map(),errors=[];
const gitSha=buf=>createHash('sha1').update(Buffer.from('blob '+buf.length+'\0')).update(buf).digest('hex');

function safePath(p){
 if(typeof p!=='string'||!p||p.startsWith('/')||p.includes('\\')||p.includes('\0')||p.split('/').some(s=>!s||s==='..'||s==='.'))throw Error('INVALID_SOURCE_PATH '+String(p));
 const full=path.resolve(project,p);
 if(!full.startsWith(project+path.sep))throw Error('OUTSIDE_PROJECT '+p);
 return full;
}
function addAccepted(r,origin){
 const p=r.source_path;
 try{safePath(p)}catch(e){errors.push(origin+': '+e.message);return;}
 if(r.status!=='FULL_FILE_EDITORIAL_ATTESTED'){
  errors.push(origin+': not a full-file attestation '+p);
  return;
 }
 if(accepted.has(p)){
  errors.push('ALREADY_REGISTERED_TWICE '+p+' in '+accepted.get(p).origin+' and '+origin);
  return;
 }
 accepted.set(p,{sha:r.git_blob_sha,origin});
}
for(const r of historical.records||[])addAccepted(r,'HISTORICAL_LEDGER');
for(let i=0;i<shards.length;i++){
 const origin='SHARD '+manifest.shards[i].batch+' '+manifest.shards[i].path;
 const used=new Set();
 for(const r of shards[i].staged_attestations){
  if(used.has(r.source_path))errors.push('DUPLICATE_WITHIN_SHARD '+origin+' '+r.source_path);
  used.add(r.source_path);
  addAccepted(r,origin);
 }
}

function checkSelected(paths,{verifyCurrent=true}={}){
 const problems=[],report=[],seen=new Set();
 if(!Array.isArray(paths)||!paths.length)problems.push('EMPTY_SELECTION');
 for(const p of paths||[]){
  if(seen.has(p)){problems.push('DUPLICATE_SELECTION '+p);continue;}
  seen.add(p);
  let file;try{file=safePath(p)}catch(e){problems.push(e.message);continue;}
  const prev=accepted.get(p);
  if(prev){problems.push('ALREADY_ACCEPTED '+p+' ('+prev.origin+', SHA '+prev.sha+')');continue;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){problems.push('SOURCE_NOT_FOUND '+p);continue;}
  const sha=verifyCurrent?gitSha(fs.readFileSync(file)):null;
  report.push({path:p,sha,status:'ELIGIBLE_NOT_YET_ACCEPTED'});
 }
 return {ok:problems.length===0,problems,eligible:report};
}
function checkCurrentBoard(){
 const faults=[];
 if(!task?.progress)faults.push('NEXT_009_PROGRESS_MISSING');
 const p=task?.progress||{};
 const total=board.fact_snapshot?.raw_source_files;
 if(!Number.isInteger(total)||!Number.isInteger(p.verified_complete)||!Number.isInteger(p.pending)||p.verified_complete!==accepted.size||p.verified_complete+p.pending!==total)
  faults.push('WORKBOARD_ACCEPTED_MISMATCH computed='+accepted.size+' board='+p.verified_complete+' total='+total+' pending='+p.pending);
 if(!Array.isArray(p.next_batch)||(p.pending>0&&!p.next_batch.length))faults.push('NEXT_BATCH_EMPTY_WHILE_PENDING');
 const next=checkSelected(p.next_batch||[]);
 faults.push(...next.problems.map(s=>'NEXT_BATCH: '+s));
 const paths=board.audited_batch_paths||[];
 for(const s of manifest.shards){
  const rel='00_分類導航/設定關聯引擎/'+s.path;
  if(paths.filter(x=>x===rel).length!==1)faults.push('MANIFEST_NOT_REGISTERED_ONCE '+rel);
 }
 const last=shards.at(-1)?.staged_attestations.map(x=>x.source_path)||[];
 const saved=p.last_batch_files||[];
 if(last.length!==saved.length||new Set(last).size!==last.length||last.some(x=>!saved.includes(x)))
  faults.push('LAST_BATCH_FILES_DO_NOT_MATCH_LATEST_SHARD');
 return {ok:faults.length===0,faults,next};
}
function checkCandidate(p){
 const raw=JSON.parse(fs.readFileSync(path.resolve(p),'utf8'));
 const rows=raw.staged_attestations;
 if(!Array.isArray(rows)||!rows.length)throw Error('CANDIDATE_MISSING_ATTESTATIONS');
 const test=checkSelected(rows.map(r=>r.source_path));
 const faults=[...test.problems];
 for(const r of rows){
  if(r.status!=='FULL_FILE_EDITORIAL_ATTESTED')faults.push('NOT_FULL_FILE '+r.source_path);
  const found=test.eligible.find(x=>x.path===r.source_path);
  if(found&&found.sha!==r.git_blob_sha)faults.push('CANDIDATE_SOURCE_SHA_DRIFT '+r.source_path);
 }
 return {ok:faults.length===0,faults,eligible:test.eligible};
}
function negativeTest(){
 const faults=[];
 const legacy=[...accepted].find(([p,v])=>v.origin==='HISTORICAL_LEDGER'&&p.includes('/088_'))||
              [...accepted].find(([,v])=>v.origin==='HISTORICAL_LEDGER');
 const shard=[...accepted].find(([,v])=>v.origin.startsWith('SHARD '));
 if(!legacy||checkSelected([legacy[0]]).ok||!checkSelected([legacy[0]]).problems.some(x=>x.includes('ALREADY_ACCEPTED')))
  faults.push('NEGATIVE_TEST_FAILED historical accepted not blocked');
 if(!shard||checkSelected([shard[0]]).ok)
  faults.push('NEGATIVE_TEST_FAILED incremental shard accepted not blocked');
 const available=task?.progress?.next_batch?.[0]||[...accepted.keys()][0];
 const replay=available?checkSelected([available,available]):{ok:true,problems:[]};
 if(!available||replay.ok||!replay.problems.some(x=>x.startsWith('DUPLICATE_SELECTION ')))
  faults.push('NEGATIVE_TEST_FAILED repeated selection not blocked');
 if(checkSelected(['../outside.md']).ok)faults.push('NEGATIVE_TEST_FAILED traversal not blocked');
 if(checkSelected(['04_能力武器與試煉/this-file-never-existed.md']).ok)
  faults.push('NEGATIVE_TEST_FAILED missing file not blocked');
 return faults;
}
const argv=process.argv.slice(2);
if(argv.includes('--check')){
 const r=checkCurrentBoard();errors.push(...r.faults);
}
if(argv.includes('--negative-test'))errors.push(...negativeTest());
const ix=argv.indexOf('--select');
let selected;
if(ix>=0){
 const paths=[];
 for(let i=ix+1;i<argv.length&&!argv[i].startsWith('--');i++)paths.push(argv[i]);
 selected=checkSelected(paths);
 errors.push(...selected.problems);
}
const ci=argv.indexOf('--candidate');
let candidate;
if(ci>=0){
 if(!argv[ci+1]||argv[ci+1].startsWith('--'))errors.push('MISSING_CANDIDATE_FILE');
 else {
  try{candidate=checkCandidate(argv[ci+1]);errors.push(...candidate.faults)}
  catch(e){errors.push('CANDIDATE_ERROR '+e.message)}
 }
}
const report={status:errors.length?'BLOCKED':'PASS',accepted_sources:accepted.size,remaining_sources:task?.progress?.pending,
 next_batch_count:task?.progress?.next_batch?.length,selected: selected?.eligible||candidate?.eligible||[],
 errors};
if(argv.includes('--json'))console.log(JSON.stringify(report,null,2));
else if(errors.length)console.error('排批防重預檢：BLOCKED\n'+errors.map(x=>' - '+x).join('\n'));
else console.log('排批防重預檢：PASS；歷史＋全部分片已驗收 '+accepted.size+' 份；下一批 '+report.next_batch_count+' 份均未重複。');
if(errors.length)process.exitCode=2;
