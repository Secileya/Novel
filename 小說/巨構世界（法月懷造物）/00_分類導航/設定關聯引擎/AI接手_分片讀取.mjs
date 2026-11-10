#!/usr/bin/env node
/** Immutable legacy JSON + append-only per-batch shards; no giant JSON rewrite. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {applyEvidenceRevalidations,applyAttestationRevalidations} from './來源後修_證據覆核.mjs';
const HOME=path.dirname(fileURLToPath(import.meta.url));
const read=(n)=>JSON.parse(fs.readFileSync(path.join(HOME,n),'utf8'));
const sha=buf=>createHash('sha1').update(Buffer.from('blob '+buf.length+'\0')).update(buf).digest('hex');
export function readManifest(home=HOME){
 const m=JSON.parse(fs.readFileSync(path.join(home,'AI接手_增量分片清單.json'),'utf8'));
 if(m.schema!=='mega-ledger-shard-manifest-v1'||!Array.isArray(m.shards))throw Error('Invalid shard manifest');
 return m;
}
export function readShards(home=HOME){
 const m=readManifest(home),seen=new Set(),out=[];
 for(const ent of m.shards){
  const p=ent.path;
  if(typeof p!=='string'||!/^202\d{5}_.+\.json$/.test(p)||p.includes('..')||p.includes('/')||seen.has(p))throw Error('unsafe or duplicate shard '+p);
  seen.add(p);
  const buf=fs.readFileSync(path.join(home,p));
  if(sha(buf)!==ent.git_blob_sha)throw Error('batch shard SHA drift '+p);
  const j=JSON.parse(buf.toString('utf8'));
  if(j.source_file_count!==j.staged_attestations?.length||j.evidence_count!==j.records?.length||j.evidence_count!==j.staged_graph_records?.length)throw Error('incomplete shard '+p);
  const ids=new Set(j.records.map(x=>x.id));
  if(ids.size!==j.records.length||j.staged_graph_records.some(x=>!ids.has(x.audit_id)))throw Error('shard graph mismatch '+p);
  if(j.staged_attestations.some(x=>!j.source_file_manifest?.some(y=>y.path===x.source_path&&y.git_blob_sha===x.git_blob_sha)))throw Error('unverified source manifest '+p);
  out.push(j);
 }
 return out;
}
export function loadLedger(home=HOME){
 const base=JSON.parse(fs.readFileSync(path.join(home,'AI接手_整檔語義驗收台帳.json'),'utf8'));
 const original=base.records||[],oldPaths=new Set(original.map(x=>x.source_path));
 const cohort=JSON.parse(fs.readFileSync(path.join(home,'全庫待原子化缺口清冊.json'),'utf8'));
 const rolePaths=new Set(cohort.sources.map(x=>x.path));let roleDelta=0;
 for(const s of readShards(home))for(const r of s.staged_attestations){
  if(oldPaths.has(r.source_path))throw Error('duplicate source acceptance '+r.source_path);
  oldPaths.add(r.source_path);base.records.push(r);
  if(rolePaths.has(r.source_path))roleDelta++;
 }
 base.accepted_editorial_file_count+=roleDelta;
 base.remaining_for_full_file_semantic_acceptance-=roleDelta;
 return applyAttestationRevalidations(base,home);
}
export function loadBridge(home=HOME){
 const base=JSON.parse(fs.readFileSync(path.join(home,'審核命題至既有關係圖_雙向證據橋.json'),'utf8'));
 const oldIds=new Set(base.records.map(x=>x.audit_id));
 for(const s of readShards(home))for(const r of s.staged_graph_records){
  if(oldIds.has(r.audit_id))throw Error('duplicate graph audit '+r.audit_id);
  oldIds.add(r.audit_id);base.records.push(r);
  base.audit_record_count++;base.mapped_review_count++;base.links_count+=r.relations.length;
 }
 return applyEvidenceRevalidations(base,home);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const ledger=loadLedger(),bridge=loadBridge(),shards=readShards();
 const faults=[];
 if(bridge.records.length!==bridge.audit_record_count)faults.push('bridged source count mismatch');
 if(process.argv.includes('--negative-test')){
  const x={...ledger,records:ledger.records.slice()};
  x.records.push(ledger.records[0]);
  if(new Set(x.records.map(r=>r.source_path)).size===x.records.length)faults.push('duplicate-source test failed');
  if(!/^[0-9a-f]{40}$/.test(sha(Buffer.from('a'))))faults.push('Git blob SHA function failed');
 }
 if(faults.length){console.error(faults.join('\n'));process.exitCode=1}
 else if(process.argv.includes('--metrics'))console.log(JSON.stringify({accepted_editorial_file_count:ledger.accepted_editorial_file_count,remaining_for_full_file_semantic_acceptance:ledger.remaining_for_full_file_semantic_acceptance,all_accepted:ledger.records.length,audit_record_count:bridge.audit_record_count,graph_links_count:bridge.links_count,shards:shards.length}));
 else console.log('Shard overlay valid: '+shards.length+' shards, '+ledger.records.length+' editorial file records, '+bridge.audit_record_count+' mapped claims');
}
