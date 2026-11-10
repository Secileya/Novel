#!/usr/bin/env node
import {loadLedger} from './AI接手_分片讀取.mjs';
/** Batch semantic QA v2: strengthens evidence requirements, not a substitute for reading. */
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const home=path.dirname(fileURLToPath(import.meta.url)),project=path.resolve(home,"../..");
const read=n=>JSON.parse(fs.readFileSync(path.join(home,n),"utf8"));
const legacy=new Map([
 ["05_場景視覺與參考/009_搜尋詞與繪圖提示詞.md","34519957135498742dd8fad840c253ea8d29975a"],
 ["00_分類導航/艾莉維亞稱呼與原槍知識邊界_2026-11-04.md","b7cc311ffd87f202cb05c02b4d5d58cbb9ee19ee"],
 ["03_人物關係與語感/104_使用者轉貼研究_莉雅多情境語體與艾莉維亞自然對話移植.md","0684791518dead99de1b27a48a6f82af91dfbccc"],
 ["03_人物關係與語感/106_參考研究_方九莉雅雙向情緒先行_身體本能_死亡復歸與共同承擔.md","830fbec6a0838f33710d26460515dfdb4e736ece"],
 ["05_場景視覺與參考/083_原文保存_方九莉雅初遇_能力互識_第2至26章修正_使用者轉貼.md","23dea8daea4842fdd5b7262acdb3d6b8abb35541"],
 ["06_敘事規劃與工作流/084_完整回應存證_方九莉雅能力互識_諾亞艾莉維亞初遇與劇情.md","36dfa471d0c11f8db7b579b57ca9f3bd5d4e1c31"]
]);
const allowedAuthorities=new Set(["AUTHOR_CONFIRMED","AUTHOR_DIRECTION","AUTHOR_SELECTED_NOT_OCCURRED","ASSISTANT_CANDIDATE","SECONDARY_RESEARCH","HISTORICAL_CORRECTION","OPEN_UNVERIFIED","PROCEDURAL_NON_CANON"]);
const checkKinds=["AUTHORITY_BOUNDARY","VERSION_OR_LATER_REVISION","MISSED_MATERIAL_CLAIM","CROSS_FILE_IMPACT"];
function safeLines(p){
 if(typeof p!=="string"||!p||p.startsWith("/")||p.split("/").includes("..")||p.includes("\\"))throw Error("unsafe path");
 const f=path.resolve(project,p);if(!f.startsWith(project+path.sep))throw Error("outside project");
 return fs.readFileSync(f,"utf8").split(/\r?\n/);
}
export function validateBatchQuality(record) {
 if(record.status!=="FULL_FILE_EDITORIAL_ATTESTED")return [];
 if(legacy.get(record.source_path)===record.git_blob_sha)return [];
 const e=[],q=record.semantic_quality_v2,segments=record.reviewed_sections||[];
 if(!q||q.protocol!=="FULL_FILE_SEMANTIC_V2")return ["new full-file acceptance missing semantic_quality_v2"];
 let lines=[];
 try{lines=safeLines(record.source_path)}catch(x){return ["cannot read full semantic QA source: "+x.message]}
 const units=q.material_units||[], checks=q.countercheck_questions||[], deps=q.dependency_impact_review||[];
 if(!Array.isArray(units)||!Array.isArray(checks)||!Array.isArray(deps))return ["semantic QA arrays missing"];
 for(let index=0;index<segments.length;index++){
  const s=segments[index],matched=units.filter(u=>u.section_index===index+1);
  const minimum=s.to-s.from+1>70?2:1;
  if(matched.length<minimum)e.push("section "+(index+1)+" has fewer than "+minimum+" material-topic checkpoints");
 }
 for(const u of units){
  const s=segments[u.section_index-1];
  if(!s||!Number.isInteger(u.line)||u.line<s.from||u.line>s.to||!u.quote||!lines[u.line-1]?.includes(u.quote))
   e.push("material-topic quote/section mismatch at "+u.line);
  if(typeof u.topic!=="string"||u.topic.trim().length<5||
     typeof u.finding!=="string"||u.finding.trim().length<12||
     !allowedAuthorities.has(u.authority))e.push("incomplete material-topic meaning/authority");
  if(!Array.isArray(u.claim_ids)||u.claim_ids.some(id=>!(record.related_claim_ids||[]).includes(id)))e.push("unlinked material-topic claim ID");
  if(!u.claim_ids?.length&&(!u.no_claim_reason||u.no_claim_reason.length<12))e.push("unmapped material topic lacks explicit exception");
 }
 for(const kind of checkKinds){
  if(!checks.some(c=>c.kind===kind))e.push("missing second-pass risk question "+kind);
 }
 for(const c of checks){
  if(!checkKinds.includes(c.kind)||!Number.isInteger(c.line)||!c.quote||!lines[c.line-1]?.includes(c.quote)||
     !c.question||c.question.length<8||!c.finding||c.finding.length<15)
   e.push("invalid countercheck question/anchor at "+c.line);
 }
 const prior=record.latest_revision_source_sha_manifest||[];
 for(const rev of prior){
  if(!deps.some(d=>d.path===rev.path&&d.git_blob_sha===rev.git_blob_sha&&typeof d.impact==="string"&&d.impact.length>=12))
   e.push("missing cross-batch dependency impact for "+rev.path);
 }
 if(!q.second_pass_method||q.second_pass_method.length<25)e.push("no documented second-pass method");
 if(!q.unresolved_risks||!Array.isArray(q.unresolved_risks))e.push("unresolved risks not explicitly reviewed");
 return [...new Set(e)];
}
export function impactClosure(changedPath,records) {
 const affected=[],seen=new Set([changedPath]),queue=[{path:changedPath,depth:0}];
 while(queue.length) {
  const current=queue.shift();
  for(const r of records){
   const upstream=[...(r.latest_revisions_checked||[]),...((r.semantic_quality_v2?.dependency_impact_review||[]).map(d=>d.path))];
   if(upstream.includes(current.path)&&!seen.has(r.source_path)){
    seen.add(r.source_path);affected.push({path:r.source_path,depth:current.depth+1,from:current.path,status:r.status});
    queue.push({path:r.source_path,depth:current.depth+1});
   }
  }
 }
 return affected;
}
async function main(){
 const a=process.argv.slice(2),ledger=loadLedger(home);
 const errors=ledger.records.flatMap(r=>validateBatchQuality(r).map(e=>r.source_path+": "+e));
 if(a.includes("--negative-test")){
  const base=ledger.records.find(r=>r.status==="FULL_FILE_EDITORIAL_ATTESTED");
  const pretend={...base,git_blob_sha:"0".repeat(40),semantic_quality_v2:undefined};
  if(!validateBatchQuality(pretend).some(x=>x.includes("missing semantic_quality_v2")))errors.push("bad new certificate was accepted");
  const changed=base.latest_revisions_checked[0];
  const impacts=impactClosure(changed,ledger.records);
  if(!impacts.some(x=>x.path===base.source_path))errors.push("cross-batch change did not reach dependent legacy file");
 }
 if(a.includes("--impact")){
  const ix=a.indexOf("--impact"),changed=a[ix+1];
  if(!changed)throw Error("--impact requires a source relative path");
  console.log(JSON.stringify({changed,transitive_known_impact:impactClosure(changed,ledger.records),warning:"Known attestation dependencies only; unindexed semantic dependencies require further audit."},null,2));
 }else if(a.includes("--plan")){
  const {buildLiveReviewReport}=await import("./全量來源_動態納管與驗收.mjs");
  const report=buildLiveReviewReport(),board=read("AI接手_工作板.json");
  const nominated=board.tasks.find(t=>t.id==="NEXT-009")?.progress?.next_batch||[];
  const priority=p=>{const x=report.remaining_file_records.find(z=>z.source_path===p);return x?x:null};
  const selected=[],seen=new Set(),pool=[...nominated.map(priority).filter(Boolean),...report.remaining_file_records];
  let lines=0;
  for(const x of pool){
   if(seen.has(x.source_path)||x.kind!=="TEXT_SOURCE")continue;
   let count;
   try{count=safeLines(x.source_path).length}catch{continue}
   if(lines+count>2600&&selected.length>=4)continue;
   if(count>900&&selected.length>=4)continue;
   selected.push({source_path:x.source_path,lines:count,cohort:x.cohort,review_status:x.review_status});
   seen.add(x.source_path);lines+=count;
   if(selected.length>=12)break;
  }
  console.log(JSON.stringify({task:"NEXT-009",strategy:"workload-budget batch; each individual file separately attested",planned_files:selected,planned_lines:lines,quality_gate:"semantic_quality_v2 + legacy full-file validator + source SHA + graph links + CI",note:"Planning is not acceptance; no new source is marked complete by --plan."},null,2));
 }else console.log(JSON.stringify({v2_required_for_new_full_file_acceptances:true,legacy_v1_preserved:legacy.size,currently_v2_accepted:ledger.records.filter(r=>r.status==="FULL_FILE_EDITORIAL_ATTESTED"&&!legacy.has(r.source_path)).length,errors},null,2));
 if(errors.length){for(const e of errors)console.error(e);process.exitCode=2}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
