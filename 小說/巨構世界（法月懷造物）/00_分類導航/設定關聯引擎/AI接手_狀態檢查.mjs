#!/usr/bin/env node
/**
 * 巨構下一任AI的狀態入口：只讀；--status / --task NEXT / --task ID / --check。
 * 靜態工作板不會在程式執行時自動驗證遠端CI。必須依最新HEAD查Actions。
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const HOME=path.dirname(fileURLToPath(import.meta.url));
const PROJECT=path.resolve(HOME,'../..');
const B=JSON.parse(fs.readFileSync(path.join(HOME,'AI接手_工作板.json'),'utf8'));
const auditFiles=B.audited_batch_paths||[];
const audits=auditFiles.map(p=>{
  if(!p.startsWith('00_分類導航/設定關聯引擎/')||p.includes('..'))throw Error('unsafe audit path: '+p);
  return JSON.parse(fs.readFileSync(path.join(PROJECT,p),'utf8'));
});
const auditedRecords=audits.flatMap(a=>a.records||[]);
const auditedAnchorsCount=audits.reduce((n,a)=>n+Number(a.evidence_count??a.original_anchors_count??0),0);
const BACK=JSON.parse(fs.readFileSync(path.join(HOME,'全庫待原子化缺口清冊.json'),'utf8'));
const INV=JSON.parse(fs.readFileSync(path.join(HOME,'全庫物理清冊.json'),'utf8'));
const VER=JSON.parse(fs.readFileSync(path.join(HOME,'版本取代與相容決策鏈.json'),'utf8'));
const DOS=JSON.parse(fs.readFileSync(path.join(HOME,'213份回收來源基線.json'),'utf8'));
const SECTION=JSON.parse(fs.readFileSync(path.join(HOME,'213份來源索引分卷清單.json'),'utf8'));
const DIFF=JSON.parse(fs.readFileSync(path.join(HOME,'候選版本37組_逐行文字差異證據.json'),'utf8'));
const HUMAN=JSON.parse(fs.readFileSync(path.join(HOME,'候選版本差異_14項重要語義核對.json'),'utf8'));
const faults=[],warnings=[],args=process.argv.slice(2);
let head='NOT_VERIFIED_GIT_CHECKOUT';
try{head=execFileSync('git',['rev-parse','HEAD'],{cwd:PROJECT,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim()}
catch{warnings.push('未取得本機git HEAD；請用GitHub連接器查main HEAD，不得自行推定')}
const snapshot=B.fact_snapshot;
const FULL=JSON.parse(fs.readFileSync(path.join(HOME,'AI接手_整檔語義驗收台帳.json'),'utf8'));
const editorialAccepted=FULL.records.filter(x=>x.status==='FULL_FILE_EDITORIAL_ATTESTED').length;
const COVER=JSON.parse(fs.readFileSync(path.join(HOME,'語義覆蓋計數快照.json'),'utf8'));
const sourceRolePaths=new Set(BACK.sources.map(x=>x.path));
const derivedCategories={};
for(const f of INV.files){
  const k=f.path.includes('/')?f.path.split('/')[0]:'專案根目錄';
  const row=derivedCategories[k]??={physical:0,referenced:0,bytes:0,source_role_indexed:0,source_roles_plus_atomic:0};
  row.physical++;row.bytes+=f.bytes;row.source_roles_plus_atomic++;
  if(sourceRolePaths.has(f.path))row.source_role_indexed++;
  else row.referenced++;
}
const latestDerivedMetrics={
  raw_original_sources:INV.files.length,
  with_fine_grained_reference:BACK.referenced,
  with_source_role_card_pending_full_semantic_review:BACK.sources.length,
  machine_screened_source_dossiers:DOS.sources.length,
  source_excerpt_sections:SECTION.sections,
  version_nodes:VER.records.length,
  audited_batched_claims:auditedRecords.length,
  audited_original_quote_anchors:auditedAnchorsCount,
  original_archive_09_files:fs.readdirSync(path.join(PROJECT,'09_跨AI原始來源')).length,
  formal_novel_chapters:snapshot.canon_formal_chapters,
  prewrite_hold:snapshot.prewrite_hold,
  full_file_editorial_accepted:editorialAccepted,
  full_file_editorial_pending:BACK.sources.length-editorialAccepted
};
const actualCoverage=Object.freeze({
  raw_source_files:INV.files.length,
  direct_fine_grained_source_paths:BACK.referenced,
  source_role_backlog:BACK.sources.length,
  machine_screened_dossiers:DOS.sources.length,
  excerpt_sections:SECTION.sections,
  version_literal_diff_pairs:DIFF.comparisons.length,
  human_semantic_version_issues:HUMAN.records.length,
  targeted_reviewed_claims:auditedRecords.length,
  verified_source_quotes:auditedAnchorsCount,
  version_decisions:VER.records.length,
  original_archive_09_files:fs.readdirSync(path.join(PROJECT,'09_跨AI原始來源')).length,
  full_file_semantic_review_completed:'EDITORIAL_ATTESTED__NOT_AUTHOR_CANON_SIGNOFF',
  full_file_editorial_accepted:editorialAccepted,
  full_file_editorial_remaining:BACK.sources.length-editorialAccepted
});
const liveSnapshot=COVER.current_operational_metrics||{};
if(JSON.stringify(derivedCategories)!==JSON.stringify(COVER.source_categories))
  faults.push('覆蓋快照 source_categories 已過期；需從物理清冊和待審用途卡重新產生');
for(const [name,value] of Object.entries(latestDerivedMetrics))
  if(liveSnapshot[name]!==value)faults.push('coverage snapshot stale: '+name+': saved='+liveSnapshot[name]+', actual='+value);
if(COVER.version_decision_count!==VER.records.length)
  faults.push('top-level version_decision_count stale');
if(new Set(auditFiles).size!==auditFiles.length)
  faults.push('duplicated audit batch path');
if(auditedRecords.length!==new Set(auditedRecords.map(x=>x.id)).size)
  faults.push('duplicated reviewed finding ID');
const historyIsNotCurrent='舊版文檔的251／213／182、41條／111錨點等都是歷史快照；以本報表實際讀取的來源清冊與審核檔為準。';
function check(label,actual,expected){if(actual!==expected)faults.push(label+': actual='+actual+', board='+expected)}
check('raw_source_files',INV.files.length,snapshot.raw_source_files);
check('inventory_count',INV.files_count,snapshot.raw_source_files);
check('source_paths_with_prior_fine_grained_references',BACK.referenced,snapshot.source_paths_with_prior_fine_grained_references);
check('source_role_cards_awaiting_full_claim_arbitration',BACK.sources.length,snapshot.source_role_cards_awaiting_full_claim_arbitration);
check('source_dossiers_machine_screened',DOS.sources.length,snapshot.source_dossiers_machine_screened);
check('source_excerpt_sections',SECTION.sections,snapshot.source_excerpt_sections);
check('candidate_version_text_diff_pairs',DIFF.comparisons.length,snapshot.candidate_version_text_diff_pairs);
check('candidate_version_human_semantic_reviews',HUMAN.records.length,snapshot.candidate_version_human_semantic_reviews);
check('targeted_audit_records',auditedRecords.length,snapshot.targeted_audit_records);
check('targeted_audit_verified_quotes',auditedAnchorsCount,snapshot.targeted_audit_verified_quotes);
check('version_decision_nodes',VER.records.length,snapshot.version_decision_nodes);
check('full_file_editorial_accepted',editorialAccepted,snapshot.full_file_editorial_accepted);
check('nine_folder_files',fs.readdirSync(path.join(PROJECT,'09_跨AI原始來源')).length,snapshot.nine_folder_files);
if(snapshot.canon_formal_chapters!==0||snapshot.prewrite_hold!==true)
 faults.push('PREWRITE HOLD / 正式0章快照被更改：需要核對明確作者採案與現有正式正文真源');
if(!fs.existsSync(path.join(HOME,'AI接手_完整作業流程.md')))
 faults.push('完整作業流程不存在');
if(!B.manual_path.endsWith('AI接手_完整作業流程.md'))faults.push('workboard manual_path mismatch');
if(B.schema!=='mega-next-agent-workboard-v1')faults.push('workboard schema 不符');
const statuses=new Set(B.rules.states);
const seen=new Set();
for(const task of B.tasks||[]){
 if(!task.id||seen.has(task.id))faults.push('duplicate/missing task ID: '+task.id);
 seen.add(task.id);
 if(!statuses.has(task.status))faults.push(task.id+': invalid status');
 if(!Number.isInteger(task.priority)||task.priority<1)faults.push(task.id+': invalid priority');
 if(!task.name||!task.purpose||!task.first_action||!Array.isArray(task.acceptance)||task.acceptance.length<2)
  faults.push(task.id+': missing actionable goal/acceptance');
 if(!Array.isArray(task.required_read_files)||task.required_read_files.length<1)
  faults.push(task.id+': no source reading list');
 if(task.status==='BLOCKED'&&!task.blocked_on)faults.push(task.id+': BLOCKED without reason');
 if(task.status==='DONE'&&!(task.complete_evidence||[]).length)
  faults.push(task.id+': DONE without completion evidence');
 for(const p of task.required_read_files||[]){
  if(!p||p.startsWith('/')||p.split('/').includes('..')){faults.push(task.id+': unsafe source path '+p);continue}
  if(!fs.existsSync(path.resolve(PROJECT,p)))faults.push(task.id+': missing read file '+p);
 }
}
const allAudits=new Set(auditedRecords.map(x=>x.id));
for(const v of VER.records)for(const id of v.related_audit_ids||[])
 if(!allAudits.has(id))faults.push(v.id+': audit ID not in reviewed evidence: '+id);
if(args.includes('--metrics')){
 console.log(JSON.stringify({schema:'mega-derived-live-coverage-v1',git_head:head,source_categories:derivedCategories,
  current_operational_metrics:latestDerivedMetrics,audited_batch_paths:auditFiles,
  snapshot_in_sync:faults.length===0,errors:faults,
  note:'Machine-derived local counts; not proof of full semantic review or remote CI.'},null,2));
 if(faults.length)process.exitCode=2;
}else if(args.includes('--report')){
 const pending=B.tasks.filter(x=>x.status!=='DONE');
 const next=B.tasks.filter(x=>x.status==='READY').sort((a,b)=>a.priority-b.priority||B.tasks.indexOf(a)-B.tasks.indexOf(b))[0]||null;
 console.log(JSON.stringify({schema:'mega-required-every-turn-status-report-v1',git_head:head,
  last_successful_ci:'NOT_CHECKED__FETCH_GITHUB_ACTIONS',completed_tasks:B.tasks.filter(x=>x.status==='DONE').map(x=>x.id),
  latest_actual_progress:B.latest_progress||null,
  remaining_tasks:pending.map(x=>({id:x.id,name:x.name,status:x.status,blocked_on:x.blocked_on||null})),
  incomplete_full_file_semantic_reviews:BACK.sources.length-editorialAccepted,
  targeted_reviewed_findings:actualCoverage.targeted_reviewed_claims,
  verified_exact_quotes:actualCoverage.verified_source_quotes,
  dynamic_coverage:actualCoverage,
  historical_snapshot_warning:historyIsNotCurrent,
  next_task:next?{id:next.id,name:next.name,first_action:next.first_action}:null,
  reporting_rule:'每次答覆列已做、還沒做、下一步、commit與CI。不可把此本機報表當全部語義證明。'},null,2));
 if(faults.length)process.exitCode=2;
}else if(args.includes('--task')){
 const ix=args.indexOf('--task');
 const requested=args[ix+1];
 const next=B.tasks.filter(t=>t.status==='READY').sort((a,b)=>a.priority-b.priority||B.tasks.indexOf(a)-B.tasks.indexOf(b))[0];
 const task=requested==='NEXT'?next:B.tasks.find(t=>t.id===requested);
 if(!task){console.error('Unknown/unavailable task '+requested);process.exit(2)}
 console.log(JSON.stringify({schema:'mega-next-task-route-v1',head,board_snapshot_head:B.last_checked_head_before_handoff,
  task,disclaimer:'Task recommendation is not authorization to amend Canon; verify current user request and main CI.'},null,2));
 if(faults.length)process.exitCode=2;
}else{
 console.log(JSON.stringify({schema:'mega-handoff-live-local-check-v1',repository:B.repository,project:B.project_root,
  git_head:head,previous_verified_baseline:B.last_checked_head_before_handoff,
  same_head_as_stored_baseline:head===B.last_checked_head_before_handoff,
  ci_status:'NOT_CHECKED_BY_THIS_SCRIPT__VERIFY_REMOTE_ACTIONS_FOR_CURRENT_HEAD',
  source_snapshot:actualCoverage,
  historical_snapshot_warning:historyIsNotCurrent,
  task_counts:{ready:B.tasks.filter(t=>t.status==='READY').length,
    blocked:B.tasks.filter(t=>t.status==='BLOCKED').length,done:B.tasks.filter(t=>t.status==='DONE').length},
  recommended_next_ready_task:B.tasks.filter(t=>t.status==='READY').sort((a,b)=>a.priority-b.priority||B.tasks.indexOf(a)-B.tasks.indexOf(b))[0]?.id||null,
  verdict:faults.length?'NEEDS_REPAIR':'STATIC_LOCAL_INVARIANTS_PASS',errors:faults,warnings,
  note:'成功只表示本地機器台帳一致；原文語義/CANON/遠端CI仍要查證。'},null,2));
 if(args.includes('--check')&&faults.length)process.exitCode=2;
}
