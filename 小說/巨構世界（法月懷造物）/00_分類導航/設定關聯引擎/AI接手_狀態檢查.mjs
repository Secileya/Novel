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
const A4=JSON.parse(fs.readFileSync(path.join(HOME,'20261109_171待深審_第四批跨源語義衝突與審核門檻.json'),'utf8'));
const A5=JSON.parse(fs.readFileSync(path.join(HOME,'20261109_171待深審_第五批首篇版本與敘事權威仲裁.json'),'utf8'));
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
function check(label,actual,expected){if(actual!==expected)faults.push(label+': actual='+actual+', board='+expected)}
check('raw_source_files',INV.files.length,snapshot.raw_source_files);
check('inventory_count',INV.files_count,snapshot.raw_source_files);
check('source_paths_with_prior_fine_grained_references',BACK.referenced,snapshot.source_paths_with_prior_fine_grained_references);
check('source_role_cards_awaiting_full_claim_arbitration',BACK.sources.length,snapshot.source_role_cards_awaiting_full_claim_arbitration);
check('source_dossiers_machine_screened',DOS.sources.length,snapshot.source_dossiers_machine_screened);
check('source_excerpt_sections',SECTION.sections,snapshot.source_excerpt_sections);
check('candidate_version_text_diff_pairs',DIFF.comparisons.length,snapshot.candidate_version_text_diff_pairs);
check('candidate_version_human_semantic_reviews',HUMAN.records.length,snapshot.candidate_version_human_semantic_reviews);
check('fourth_and_fifth_audit_records',A4.records.length+A5.records.length,snapshot.fourth_and_fifth_audit_records);
check('fourth_and_fifth_verified_quotes',A4.evidence_count+A5.original_anchors_count,snapshot.fourth_and_fifth_verified_quotes);
check('version_decision_nodes',VER.records.length,snapshot.version_decision_nodes);
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
const allAudits=new Set([...A4.records,...A5.records].map(x=>x.id));
for(const v of VER.records)for(const id of v.related_audit_ids||[])
 if(!allAudits.has(id))faults.push(v.id+': audit ID not in reviewed evidence: '+id);
if(args.includes('--task')){
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
  source_snapshot:{raw_files:INV.files.length,source_role_backlog:BACK.sources.length,
    indexed_213:DOS.sources.length,verified_quote_anchors:A4.evidence_count+A5.original_anchors_count,
    version_nodes:VER.records.length},
  task_counts:{ready:B.tasks.filter(t=>t.status==='READY').length,
    blocked:B.tasks.filter(t=>t.status==='BLOCKED').length,done:B.tasks.filter(t=>t.status==='DONE').length},
  recommended_next_ready_task:B.tasks.filter(t=>t.status==='READY').sort((a,b)=>a.priority-b.priority||B.tasks.indexOf(a)-B.tasks.indexOf(b))[0]?.id||null,
  verdict:faults.length?'NEEDS_REPAIR':'STATIC_LOCAL_INVARIANTS_PASS',errors:faults,warnings,
  note:'成功只表示本地機器台帳一致；原文語義/CANON/遠端CI仍要查證。'},null,2));
 if(args.includes('--check')&&faults.length)process.exitCode=2;
}
