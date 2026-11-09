#!/usr/bin/env node
/**
 * One evolving source universe, not a permanent 171-only backlog.
 * All current Git-committed source files are placed in the same editorial
 * full-file/graph-linked acceptance queue; future files enter automatically.
 * No Canon decisions are made by this tool. Requires a full git checkout.
 */
import fs from "node:fs";
import {validateBatchQuality} from "./批量審核_語義缺口與跨批影響.mjs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {execFileSync} from "node:child_process";
const HOME=path.dirname(fileURLToPath(import.meta.url));
const PROJECT=path.resolve(HOME,"../..");
const read=name=>JSON.parse(fs.readFileSync(path.join(HOME,name),"utf8"));
const baseline=read("全庫物理清冊.json");
const historical=read("全庫待原子化缺口清冊.json");
const ledger=read("AI接手_整檔語義驗收台帳.json");
const board=read("AI接手_工作板.json");
const bridge=read("審核命題至既有關係圖_雙向證據橋.json");
const textExtensions=/\.(md|txt|json|yaml|yml|svg)$/i;
const ignored=new Set(["AGENTS.md","GEMINI.md"]);
const allowedGraphNodeTypes=new Set(["entity","claim","version","temporal_phase","social_entity","social_relation","container","ecology_dependency","crosslayer_dependency"]);
function git(...args){return execFileSync("git",args,{cwd:PROJECT,encoding:"utf8",maxBuffer:40*1024*1024}).trim();}
export function discoverCommittedSources(){
 const repoRoot=git("rev-parse","--show-toplevel");
 const head=git("rev-parse","HEAD");
 const prefix=path.relative(repoRoot,PROJECT).split(path.sep).join("/");
 if(!prefix||prefix.startsWith(".."))throw Error("not inside requested project root");
 const raw=execFileSync("git",["ls-tree","-r","-z","HEAD","--",prefix],{cwd:repoRoot,encoding:"buffer",maxBuffer:48*1024*1024});
 const rows=[];
 for(const record of raw.toString("utf8").split("\0")){
  if(!record)continue;
  const tab=record.indexOf("\t");
  if(tab<0)throw Error("invalid ls-tree record");
  const [mode,kind,sha]=record.slice(0,tab).split(" ");
  const full=record.slice(tab+1);
  if(kind!=="blob"||!full.startsWith(prefix+"/"))continue;
  const p=full.slice(prefix.length+1);
  if(p.startsWith("00_分類導航/設定關聯引擎/")||ignored.has(p))continue;
  rows.push({path:p,git_blob_sha:sha,content_kind:textExtensions.test(p)?"TEXT_SOURCE":"ASSET_OR_UNKNOWN_MEDIA_REQUIRES_SPECIAL_REVIEW",git_mode:mode});
 }
 rows.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
 return {head,repoRoot,prefix,sources:rows};
}
const historicalByPath=new Map(baseline.files.map(f=>[f.path,f]));
const oldBacklogPaths=new Set(historical.sources.map(f=>f.path));
const acceptanceByPath=new Map(ledger.records.map(x=>[x.source_path,x]));
const sourceAudits=board.audited_batch_paths.flatMap(p=>{
 if(!p.startsWith("00_分類導航/設定關聯引擎/")||p.split("/").includes(".."))throw Error("unsafe audited_batch_paths entry "+p);
 return JSON.parse(fs.readFileSync(path.join(PROJECT,p),"utf8")).records;
});
const claimByID=new Map(sourceAudits.map(x=>[x.id,x]));
const mappingByClaim=new Map(bridge.records.map(x=>[x.audit_id,x]));
const auditsBySource=new Map();
for(const a of sourceAudits){
 for(const e of a.evidence||[]){
  if(!auditsBySource.has(e.source_path))auditsBySource.set(e.source_path,new Set());
  auditsBySource.get(e.source_path).add(a.id);
 }
}
const sourceReadCache=new Map();
function sourceLines(loc){
 if(typeof loc!=="string"||!loc||loc.startsWith("/")||loc.includes("\\")||loc.split("/").includes(".."))throw Error("unsafe path "+loc);
 if(!sourceReadCache.has(loc)){
  const file=path.join(PROJECT,loc),bytes=fs.readFileSync(file);
  sourceReadCache.set(loc,{lines:bytes.toString("utf8").split(/\r?\n/),bytes:bytes.length});
 }
 return sourceReadCache.get(loc);
}
function validateAcceptance(record,liveByPath){
 const issues=[],live=liveByPath.get(record.source_path);
 if(!live){issues.push("missing_current_source");return issues;}
 if(record.git_blob_sha!==live.git_blob_sha)issues.push("source_sha_changed");
 if(live.content_kind!=="TEXT_SOURCE"){issues.push("media_requires_dedicated_review_not_text_line_attestation");return issues;}
 const parts=record.reviewed_sections||[];
 let last=0;
 for(const p of parts){
  if(!Number.isInteger(p.from)||!Number.isInteger(p.to)||p.from!==last+1||p.to<p.from)issues.push("missing_or_overlapping_section");
  if(!Number.isInteger(p.anchor_line)||p.anchor_line<p.from||p.anchor_line>p.to||!p.quote||!p.meaning)issues.push("bad_section_evidence");
  else {
   const line=sourceLines(record.source_path).lines[p.anchor_line-1];
   if(!line?.includes(p.quote))issues.push("source_quote_mismatch_at_"+p.anchor_line);
  }
  last=p.to;
 }
 if(!parts.length||last!==record.source_line_count||sourceLines(record.source_path).lines.length!==record.source_line_count)
  issues.push("incomplete_full_line_coverage");
 const checks=record.checklist||{};
 if(Object.keys(checks).length<6||Object.values(checks).some(x=>x!==true))
  issues.push("semantic_acceptance_checklist_incomplete");
 if(record.attestation?.actor!=="AI_EDITORIAL_REVIEW_NOT_AUTHOR_SIGNOFF")
  issues.push("editorial_not_author_consent_missing");
 const revisions=record.latest_revisions_checked||[],manifest=record.latest_revision_source_sha_manifest||[];
 if(!revisions.length||revisions.length!==manifest.length)issues.push("later_revision_checklist_missing");
 for(let i=0;i<revisions.length;i++){
  const r=manifest[i],now=liveByPath.get(revisions[i]);
  if(!r||r.path!==revisions[i]||!now||now.git_blob_sha!==r.git_blob_sha)issues.push("later_revision_changed_or_missing:"+revisions[i]);
 }
 const claims=record.related_claim_ids||[];
 if(!claims.length)issues.push("missing_atomic_semantic_claim_links");
 for(const id of claims){
  const a=claimByID.get(id),m=mappingByClaim.get(id);
  if(!a)issues.push("unverified_semantic_claim:"+id);
  if(!m||!m.relations?.length)issues.push("missing_domain_graph_link:"+id);
  if(m?.relations?.some(link=>!allowedGraphNodeTypes.has(link.target_type)||link.connection!=="EVIDENCE_SCOPED_DOMAIN_RELEVANCE__NOT_CANON_PROMOTION"))
   issues.push("unverified_or_promoted_graph_edge:"+id);
 }
 issues.push(...validateBatchQuality(record));
 return [...new Set(issues)];
}
export function buildLiveReviewReport(options={}){
 const current=discoverCommittedSources();
 if(options.sourceOverride)current.sources=[...options.sourceOverride].sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
 const liveByPath=new Map(current.sources.map(x=>[x.path,x]));
 const faults=[],knownPaths=new Set(),cases=[];
 if(baseline.files.length!==baseline.files_count)faults.push("baseline inventory internal count mismatch");
 if(historical.referenced+historical.sources.length!==baseline.files_count)faults.push("historical 164/171 partition mismatch");
 for(const f of baseline.files)if(!liveByPath.has(f.path))faults.push("historical original missing from current Git tree: "+f.path);
 for(const file of current.sources){
  if(knownPaths.has(file.path))faults.push("duplicate Git tree source: "+file.path);
  knownPaths.add(file.path);
  const b=historicalByPath.get(file.path),rec=acceptanceByPath.get(file.path);
  const reviewed=(auditsBySource.get(file.path)||new Set());
  const mapped=[...reviewed].filter(id=>mappingByClaim.has(id));
  const cohort=!b?"NEW_POST_BASELINE":oldBacklogPaths.has(file.path)?"HISTORICAL_ROLE_CARD_171":"HISTORICAL_FINE_GRAINED_164";
  const auditInfo=rec?.status==="FULL_FILE_EDITORIAL_ATTESTED"?validateAcceptance(rec,liveByPath):[];
  const completed=rec?.status==="FULL_FILE_EDITORIAL_ATTESTED"&&auditInfo.length===0;
  const changed=!!b&&b.git_blob_sha!==file.git_blob_sha;
  const state=completed?"FULL_FILE_EDITORIAL_VERIFIED":
    rec?.status==="FULL_FILE_EDITORIAL_ATTESTED"?"REVOKED_RECHECK_REQUIRED":
    !b?"NEW_SOURCE_AUTO_QUEUED":
    changed?"CHANGED_SOURCE_RECHECK_REQUIRED":
    rec?.status==="TARGETED_SEMANTIC_ONLY__NOT_FULL_FILE"||reviewed.size>0?"PARTIAL_REVIEW_NOT_FULL_FILE":
    "AWAITING_FULL_FILE_REVIEW";
  if(auditInfo.length)faults.push("invalid acceptance "+file.path+": "+auditInfo.join(","));
  cases.push({source_path:file.path,source_sha:file.git_blob_sha,kind:file.content_kind,
    cohort,review_status:state,baseline_source_sha:b?.git_blob_sha||null,
    prior_fine_grained_source_reference:cohort==="HISTORICAL_FINE_GRAINED_164",
    targeted_claim_ids:[...reviewed].sort(),mapped_existing_domain_claim_ids:mapped.sort(),
    full_review_proof:completed?{source_lines:rec.source_line_count,reviewed_sections:rec.reviewed_sections.length,accepted_without_author_canon_promotion:true}:null,
    unmet_review_requirement:completed?[]:[
     "read and classify all source sections and embedded original discussions",
     "resolve author vs assistant vs external source; three axes authority/strength/story progress",
     "check later corrections, candidate versions, provenance and character knowledge",
     "extract and anchor all relevant semantic claims and reconcile with other source files",
     "connect relevant claims to existing entity/temporal/social/version/container/ecology graphs without false Canon upgrades",
     "record contiguous full-file review/asset inspection with source SHA and dependency SHA; run CI"
    ],invalidation_reasons:auditInfo});
 }
 for(const record of ledger.records||[])if(record.status==="FULL_FILE_EDITORIAL_ATTESTED"&&!liveByPath.has(record.source_path))
  faults.push("accepted original no longer tracked: "+record.source_path);
 const completed=cases.filter(x=>x.review_status==="FULL_FILE_EDITORIAL_VERIFIED");
 const pending=cases.filter(x=>x.review_status!=="FULL_FILE_EDITORIAL_VERIFIED");
 const groups={};
 for(const row of cases){groups[row.cohort]??={total:0,accepted:0,pending:0};groups[row.cohort].total++;groups[row.cohort][row.review_status==="FULL_FILE_EDITORIAL_VERIFIED"?"accepted":"pending"]++}
 const statusCounts={};for(const row of cases)statusCounts[row.review_status]=(statusCounts[row.review_status]||0)+1;
 const newFiles=cases.filter(x=>x.cohort==="NEW_POST_BASELINE").map(x=>({path:x.source_path,type:x.kind,sha:x.source_sha}));
 const changedFiles=cases.filter(x=>x.baseline_source_sha&&x.baseline_source_sha!==x.source_sha).map(x=>({path:x.source_path,current_sha:x.source_sha,baseline_sha:x.baseline_source_sha}));
 if(completed.length+pending.length!==cases.length)faults.push("source accounting mismatch");
 return {schema:"mega-all-current-source-full-review-v1",git_head:current.head,source_total:cases.length,
  historical_baseline_count:baseline.files_count,
  accepted_full_file_count:completed.length,pending_full_file_count:pending.length,
  historically_previously_referenced_fine_grained:historical.referenced,
  historical_role_card_set:historical.sources.length,
  cohort_counts:groups,status_counts:statusCounts,
  new_sources_auto_queued:newFiles,changed_sources_requiring_inspection:changedFiles,
  audited_issue_count:sourceAudits.length,verified_source_anchor_count:board.fact_snapshot.targeted_audit_verified_quotes,
  audited_graph_linked_issues:bridge.records.length,audited_graph_relevance_edges:bridge.links_count,
  source_text_and_media_counts:cases.reduce((a,x)=>(a[x.kind]=(a[x.kind]||0)+1,a),{}),
  remaining_file_records:pending,
  all_file_records:cases,
  faults,completion_rule:"ALL current Git-committed originals, including historic 164, historic 171 and future additions, need identical semantic editorial acceptance plus grounded domain-graph linkage. Proof != author Canon.",
  important:"2/335 currently has recorded valid full-file acceptance; 164 prior references are not full-file acceptances; 68 issues/188 quotes and 164 domain links are different, non-file-count dimensions."
 };
}
function main(){
 const args=process.argv.slice(2),report=buildLiveReviewReport();
 const summary={schema:report.schema,git_head:report.git_head,source_total:report.source_total,
  accepted_full_file_count:report.accepted_full_file_count,pending_full_file_count:report.pending_full_file_count,
  historical_baseline_count:report.historical_baseline_count,
  historical_fine_grained_reference_only:report.historically_previously_referenced_fine_grained,
  historical_role_card_set:report.historical_role_card_set,
  cohort_counts:report.cohort_counts,status_counts:report.status_counts,
  new_sources_auto_queued:report.new_sources_auto_queued,changed_sources_requiring_inspection:report.changed_sources_requiring_inspection,
  audited_issues_not_files:report.audited_issue_count,
  audited_graph_linked_issues:report.audited_graph_linked_issues,
  audited_graph_relevance_edges_not_source_count:report.audited_graph_relevance_edges,
  source_text_and_media_counts:report.source_text_and_media_counts,
  faults:report.faults,completion_rule:report.completion_rule,
  next_action:"Batch-read multiple unverified files, examine later revisions and real graph dependencies; write a full-file evidence card for EACH file that genuinely passes, re-run CI, then continue until pending=0. Future Git source additions are immediately in this dynamic queue.",
  guarantee:"CI validates structure, evidence, and referential integrity; no program alone can certify deep semantic understanding or grant author Canon."
 };
 if(args.includes("--negative-test")){
  const proof=ledger.records.find(x=>x.status==="FULL_FILE_EDITORIAL_ATTESTED");
  const live=new Map(discoverCommittedSources().sources.map(x=>[x.path,x]));
  if(!proof)report.faults.push("no proof for negative fixtures");
  else{
   const gap=structuredClone(proof);gap.reviewed_sections[1].from++;
   if(!validateAcceptance(gap,live).includes("missing_or_overlapping_section"))report.faults.push("negative missing-line fixture not caught");
   const wrong=structuredClone(proof);wrong.git_blob_sha="0".repeat(40);
   if(!validateAcceptance(wrong,live).includes("source_sha_changed"))report.faults.push("negative original-SHA fixture not caught");
   const unlink=structuredClone(proof);unlink.related_claim_ids=["UNLINKED-CLAIM-IMPOSSIBLE"];
   if(!validateAcceptance(unlink,live).some(s=>s.includes("missing_domain_graph_link")))report.faults.push("negative unlinked claim fixture not caught");
   const current=discoverCommittedSources().sources;
   const pretendNew={path:"__FUTURE_SOURCE_INTAKE_FIXTURE__.md",git_blob_sha:"a".repeat(40),content_kind:"TEXT_SOURCE",git_mode:"100644"};
   const auto=buildLiveReviewReport({sourceOverride:[...current,pretendNew]});
   if(auto.source_total!==report.source_total+1||
      auto.pending_full_file_count!==report.pending_full_file_count+1||
      !auto.new_sources_auto_queued.some(x=>x.path===pretendNew.path)||
      auto.faults.length)
     report.faults.push("negative future-source automatic intake fixture failed");
   const originalCorrupted=current.map(x=>x.path===proof.source_path?{...x,git_blob_sha:"0".repeat(40)}:x);
   const revoked=buildLiveReviewReport({sourceOverride:originalCorrupted});
   if(revoked.accepted_full_file_count>=report.accepted_full_file_count||
      !revoked.all_file_records.some(x=>x.source_path===proof.source_path&&x.review_status==="REVOKED_RECHECK_REQUIRED"))
     report.faults.push("negative original-blob change failed to revoke full-file acceptance");
   const upstream=proof.latest_revision_source_sha_manifest?.[0]?.path;
   if(upstream){
    const revisionCorrupted=current.map(x=>x.path===upstream?{...x,git_blob_sha:"0".repeat(40)}:x);
    const downstream=buildLiveReviewReport({sourceOverride:revisionCorrupted});
    if(downstream.accepted_full_file_count>=report.accepted_full_file_count||
       !downstream.all_file_records.some(x=>x.source_path===proof.source_path&&x.review_status==="REVOKED_RECHECK_REQUIRED"))
       report.faults.push("negative later-authority-source change failed to revoke dependent acceptance");
   }
  }
 }
 if(args.includes("--report"))console.log(JSON.stringify(report,null,2));
 else if(args.includes("--next")){
  const prioritized=report.remaining_file_records.slice().sort((a,b)=>{
   const weight=x=>x.review_status==="REVOKED_RECHECK_REQUIRED"?0:
    x.review_status==="CHANGED_SOURCE_RECHECK_REQUIRED"?1:
    x.review_status==="NEW_SOURCE_AUTO_QUEUED"?2:
    x.targeted_claim_ids.length>0?3:x.cohort==="HISTORICAL_FINE_GRAINED_164"?4:5;
   return weight(a)-weight(b)||a.source_path.localeCompare(b.source_path,"zh-Hant");
  });
  console.log(JSON.stringify({...summary,suggested_first_batch:prioritized.slice(0,12)},null,2));
 }else console.log(JSON.stringify(summary,null,2));
 if(report.faults.length)process.exitCode=2;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
