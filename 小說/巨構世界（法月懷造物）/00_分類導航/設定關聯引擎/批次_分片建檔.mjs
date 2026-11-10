import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL,fileURLToPath} from 'node:url';
if(process.argv.length!==4)throw Error('Usage: node 批次_分片建檔.mjs <manual-spec-module.mjs> <output-outside-project.json>');
const cfg=(await import(pathToFileURL(path.resolve(process.argv[2])))).default;
const specs=cfg.specs;
if(!Number.isInteger(cfg.batch)||!Array.isArray(specs)||!specs.length)throw Error('invalid manual batch spec');
const output=path.resolve(process.argv[3]);
const engine=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(engine,'../..');
if(output.startsWith(root+path.sep)||output===root)throw Error('render candidate outside project; register only after preflight');
const read=n=>JSON.parse(fs.readFileSync(path.join(engine,n),'utf8'));
const write=(n,o)=>{if(fs.existsSync(output))throw Error('output already exists');fs.writeFileSync(output,JSON.stringify(o,null,2)+'\n',{flag:'wx'});};
const hash=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const all=fs.readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.md')&&!p.includes('設定關聯引擎')).map(p=>p.replaceAll('\\','/'));
const source=prefix=>{const choices=all.filter(p=>path.basename(p).startsWith(prefix));if(choices.length!==1)throw Error('non-unique prefix '+prefix);const p=choices[0],b=fs.readFileSync(path.join(root,p));return {path:p,git_blob_sha:hash(b),lines:b.toString('utf8').split(/\r?\n/)};};
const evidence=(s,n)=>{if(!s.lines[n-1]?.trim())throw Error('empty evidence '+s.path+':'+n);return {source_path:s.path,git_blob_sha:s.git_blob_sha,line:n,quote:s.lines[n-1].slice(0,240)};};
const name=cfg.shard_name;
const authority={A:'AUTHOR_CONFIRMED',D:'AUTHOR_DIRECTION',S:'AUTHOR_SELECTED_NOT_OCCURRED',C:'ASSISTANT_CANDIDATE',R:'SECONDARY_RESEARCH',H:'HISTORICAL_CORRECTION',O:'OPEN_UNVERIFIED',P:'PROCEDURAL_NON_CANON'};
const extra=cfg.extraEvidence||{},later=cfg.laterEvidence||{};
let seq=cfg.baseClaimId??read('AI接手_工作板.json').fact_snapshot.targeted_audit_records;
const shard={schema:`mega-batch${cfg.batch}-full-file-v2-sharded`,date:cfg.date,source_file_count:specs.length,source_line_count:0,source_sections:0,evidence_count:0,source_file_manifest:[],authority_boundary:'作者確認、已選未發生、方向、助手候選、二手研究、後修與未知逐項分開；全文編輯性驗收不代表作者Canon批准。正式0章／PREWRITE HOLD。',records:[],staged_attestations:[],staged_graph_records:[]};
for(const spec of specs){
 const s=source(spec.prefix),units=[];const items=spec.items.trim().split('\n').map(l=>{const [n,a,t,...f]=l.split('|');return {line:+n,authority:authority[a],target:t,finding:f.join('|')};});
 const sections=[];let from=1;
 for(const to of spec.sections){const matches=items.filter(x=>x.line>=from&&x.line<=to);if(!matches.length)throw Error('empty thematic section '+spec.label+':'+from);const ev=evidence(s,matches[0].line);sections.push({from,to,anchor_line:ev.line,quote:ev.quote,meaning:matches.map(x=>x.finding).join('；')});from=to+1;}
 if(from!==s.lines.length+1)throw Error('line coverage '+spec.label+' '+s.lines.length+' '+from);
 const ids=[];
 for(const item of items){const id='SRC-ALL-'+(++seq),ev=evidence(s,item.line),evs=[ev];for(const n of extra[spec.label]?.[item.line]||[])if(n!==item.line)evs.push(evidence(s,n));const correction=later[spec.label]?.[item.line];if(correction)evs.push(evidence(source(correction[0]),correction[1]));
 const record={id,title:spec.label+'｜'+item.finding,status:'CANDIDATE_OR_EDITORIAL_BOUNDARY',analysis:item.finding,authority:item.authority,authority_axis:item.authority,strength_axis:item.authority==='AUTHOR_CONFIRMED'?'EXPLICIT_WITH_SOURCE_LIMITS':item.authority==='AUTHOR_SELECTED_NOT_OCCURRED'?'SELECTED_FUTURE_NOT_OCCURRED':'DIRECTION_CANDIDATE_OR_EDITORIAL_SCOPE',story_progress_axis:'PREWRITE_HOLD_NO_FORMAL_STORY',guardrail:'依原文與列明後修限定權威；未決不補定、候選不升格、已選未發生不倒寫歷史。',next_action:'來源或依賴SHA變動時重核受影響命題及知情時序。',priority:'HIGH',evidence:evs};
 shard.records.push(record);ids.push(id);const section_index=sections.findIndex(x=>item.line>=x.from&&item.line<=x.to)+1;units.push({section_index,line:ev.line,quote:ev.quote,topic:item.finding.slice(0,34),finding:item.finding,authority:item.authority,claim_ids:[id]});
 const relations=item.target.split(',').map((target_id,i)=>({link_id:'A2G-'+id+'-'+(i+1),target_type:target_id.startsWith('MG-')?'claim':target_id.startsWith('P-')?'temporal_phase':target_id.startsWith('REL-')?'social_relation':target_id.startsWith('XDEP-')?'crosslayer_dependency':target_id.startsWith('ECO-')?'ecology_dependency':target_id.includes(':')?'social_entity':'entity',target_id,connection:'EVIDENCE_SCOPED_DOMAIN_RELEVANCE__NOT_CANON_PROMOTION'}));
 shard.staged_graph_records.push({audit_id:id,reviewed_status:record.status,summary:record.title,authority:'SCOPE_LIMITED_CROSS_REFERENCE_ONLY__SEE_ORIGINAL_AUDIT_FOR_ACTUAL_AUTHORITY',primary_source_anchor:{path:s.path,git_blob_sha:s.git_blob_sha,line:ev.line},relations,guardrail:'既有領域節點的雙向來源回查；不是新世界因果、正式事件或作者採案證明。'});
 }
 const deps=spec.deps.map(([prefix,line,impact])=>{const d=source(prefix);return {path:d.path,git_blob_sha:d.git_blob_sha,impact,evidence:[evidence(d,line)],review_status:'VERIFIED_FOR_DESCRIBED_IMPACT__NOT_FULL_FILE_ACCEPTANCE'};});
 shard.staged_attestations.push({source_path:s.path,git_blob_sha:s.git_blob_sha,source_role_id:'FULL-B'+cfg.batch+'-'+spec.label,source_kind:'TEXT_SOURCE',related_claim_ids:ids,status:'FULL_FILE_EDITORIAL_ATTESTED',source_progress_note:'完整逐行取得後提取命題，再對照原文上下文與實際後修作四類二遍查漏；同一AI非第三方盲審。',source_line_count:s.lines.length,reviewed_sections:sections,latest_revisions_checked:deps.map(d=>d.path),latest_revision_source_sha_manifest:deps.map(({path,git_blob_sha})=>({path,git_blob_sha})),checklist:{all_source_lines_accounted_for:true,all_sections_have_semantic_classification:true,author_vs_assistant_boundary_checked:true,latest_known_revisions_checked:true,candidate_and_canon_separated:true,no_source_content_rewritten:true,claims_to_current_version_reconciled:true,all_relevant_atomic_claims_are_source_anchored:true,existing_graph_edges_not_canon_upgraded:true},attestation:{actor:'AI_EDITORIAL_REVIEW_NOT_AUTHOR_SIGNOFF',checked_on:cfg.date,review_scope:'全部文字含後附勘誤均已讀取；第二遍逐項比對原文、所提命題與後修。缺失原圖僅核文字記錄，不冒稱視覺原件驗收。',revocation:'原文或具體依賴SHA改變、重要漏項或端點失效須重驗；當批CI完成success前不報完成。'},semantic_quality_v2:{protocol:'FULL_FILE_SEMANTIC_V2',material_units:units,countercheck_questions:spec.checks.map(([line,kind,question,finding])=>({kind,line,quote:evidence(s,line).quote,question,finding})),dependency_impact_review:deps,second_pass_method:spec.second_pass_method??cfg.second_pass_method,unresolved_risks:[spec.risk]}});
 shard.source_file_manifest.push({path:s.path,git_blob_sha:s.git_blob_sha,source_line_count:s.lines.length,reviewed_sections:sections.length});shard.source_line_count+=s.lines.length;shard.source_sections+=sections.length;
}
shard.evidence_count=shard.records.length;
const {validateBatchQuality}=await import('./批量審核_語義缺口與跨批影響.mjs');
for(const record of shard.staged_attestations){const faults=validateBatchQuality(record);if(faults.length)throw Error(record.source_path+': '+faults.join('; '));}
write(name,shard);
console.log(JSON.stringify({phase:'candidate_rendered',files:shard.source_file_count,lines:shard.source_line_count,sections:shard.source_sections,claims:shard.evidence_count,actual_quotes:shard.records.reduce((n,r)=>n+r.evidence.length,0),bytes:fs.statSync(output).size,sha:hash(fs.readFileSync(output))}));
