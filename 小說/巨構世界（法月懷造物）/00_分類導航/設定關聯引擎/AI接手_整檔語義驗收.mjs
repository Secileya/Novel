#!/usr/bin/env node
/** Full-file semantic editorial acceptance: mechanical proof, not author Canon. */
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),errors=[];
const read=n=>JSON.parse(fs.readFileSync(resolve(here,n),'utf8'));
const ledger=read('AI接手_整檔語義驗收台帳.json');
const gap=read('全庫待原子化缺口清冊.json');
const board=read('AI接手_工作板.json');
const role=new Map(gap.sources.map(x=>[x.path,x]));
const known=new Set((board.audited_batch_paths||[]).flatMap(p=>read(p.slice('00_分類導航/設定關聯引擎/'.length)).records.map(x=>x.id)));
const referenced=new Set(),passed=[];
function getText(p){
 if(typeof p!=='string'||!p||p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe source path');
 const full=resolve(root,p);
 if(!full.startsWith(root+sep))throw Error('source escapes root');
 const buf=fs.readFileSync(full);
 return {sha:createHash('sha1').update(Buffer.from('blob '+buf.length+'\0')).update(buf).digest('hex'),lines:buf.toString('utf8').split(/\r?\n/)};
}
function validate(record){
 const faults=[],src=role.get(record.source_path);
 if(!src||src.git_blob_sha!==record.git_blob_sha)faults.push('backlog source SHA mismatch');
 if(referenced.has(record.source_path))faults.push('duplicate source');
 referenced.add(record.source_path);
 for(const id of record.related_claim_ids||[])if(!known.has(id))faults.push('unresolved claim '+id);
 let original;
 try{original=getText(record.source_path)}catch(e){faults.push(e.message);return faults}
 if(original.sha!==record.git_blob_sha)faults.push('source Git blob changed; revoke acceptance');
 if(record.status==='FULL_FILE_EDITORIAL_ATTESTED'){
  if(original.lines.length!==record.source_line_count)faults.push('line count changed');
  const sections=record.reviewed_sections||[];
  let end=0;
  for(const part of sections){
   if(!Number.isInteger(part.from)||!Number.isInteger(part.to)||part.from!==end+1||part.to<part.from)faults.push('gap/overlap at '+part.from);
   if(!Number.isInteger(part.anchor_line)||part.anchor_line<part.from||part.anchor_line>part.to||
     !original.lines[part.anchor_line-1]?.includes(part.quote)||!part.meaning)faults.push('invalid section anchor');
   end=part.to;
  }
  if(end!==record.source_line_count)faults.push('uncovered tail lines');
  const checks=record.checklist||{};
  if(Object.keys(checks).length<6||Object.values(checks).some(x=>x!==true))faults.push('missing semantic checklist attestation');
  if(record.attestation?.actor!=='AI_EDITORIAL_REVIEW_NOT_AUTHOR_SIGNOFF')faults.push('missing editorial-not-Canon caveat');
  if(!(record.latest_revisions_checked||[]).length)faults.push('missing later-revision evidence');
  const checked=record.latest_revisions_checked||[];
  const manifest=record.latest_revision_source_sha_manifest||[];
  if(manifest.length!==checked.length)faults.push('later revision manifest missing/outdated');
  for(let i=0;i<checked.length;i++){
    const path=checked[i],rev=manifest[i];
    if(!rev||rev.path!==path||!rev.git_blob_sha){faults.push('later revision manifest path missing '+path);continue;}
    try{if(getText(path).sha!==rev.git_blob_sha)faults.push('later-revision source SHA changed: '+path)}
    catch{faults.push('later source missing '+path)}
  }
 }else if(record.status!=='TARGETED_SEMANTIC_ONLY__NOT_FULL_FILE')faults.push('unknown review state');
 return faults;
}
for(const x of ledger.records){const faults=validate(x);for(const f of faults)errors.push(x.source_role_id+':'+f);if(!faults.length&&x.status==='FULL_FILE_EDITORIAL_ATTESTED')passed.push(x.source_path)}
if(ledger.historical_171_role_backlog!==gap.sources.length)errors.push('171 baseline mismatched');
if(passed.length!==ledger.accepted_editorial_file_count)errors.push('accepted count mismatch');
if(gap.sources.length-passed.length!==ledger.remaining_for_full_file_semantic_acceptance)errors.push('remaining count mismatch');
if(process.argv.includes('--negative-test')){
 const full=ledger.records.find(x=>x.status==='FULL_FILE_EDITORIAL_ATTESTED');
 const broken=structuredClone(full);
 broken.reviewed_sections[3].from++;
 if(!validate(broken).some(x=>x.includes('gap/overlap')))errors.push('negative gap fixture did not fail');
 const outdated=structuredClone(full);
 outdated.latest_revision_source_sha_manifest[0].git_blob_sha='0000000000000000000000000000000000000000';
 if(!validate(outdated).some(x=>x.includes('later-revision source SHA changed')))
   errors.push('negative later-source drift fixture did not fail');
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}
else console.log('整檔驗收台帳：'+passed.length+'份編輯性全行覆蓋已核對、'+(gap.sources.length-passed.length)+'份待處理，原始來源一字未改；非Canon核准');
