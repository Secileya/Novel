#!/usr/bin/env node
// 09五檔與原始第九章同blob SHA的自動回驗；不修改任何小說或設定。
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const HOME=dirname(fileURLToPath(import.meta.url)),PROJECT=resolve(HOME,'../..');
const file="20261107_第九章幕後因果與完整候選原文_使用者上傳封存.md",oldPath='09_跨AI原始來源/'+file,newPath='待定正文/原始來源封存/'+file;
const originalSHA='78adb6225d3ff3a71538a70e66cb176e1571f258';
const err=[];
const should=['README.md','195_A_對話與核心決議_含031與189全文_2026-11-05.md',
'195_B_Roblox情報與世界生命力_190至191全文_2026-11-05.md',
'195_C_BLAME旅行研究與Roblox續研_192至193全文_2026-11-05.md',
'195_D_第三至六章QA_第七章保全與PR核驗_2026-11-05.md'].sort();
const existing=fs.readdirSync(resolve(PROJECT,'09_跨AI原始來源')).sort();
if(JSON.stringify(existing)!==JSON.stringify(should))err.push('09資料夾不是原規定五檔');
if(fs.existsSync(resolve(PROJECT,oldPath)))err.push('舊09第九章路徑仍存在');
const original=fs.readFileSync(resolve(PROJECT,newPath));
const actual=createHash('sha1').update(Buffer.from('blob '+original.length+'\0')).update(original).digest('hex');
if(actual!==originalSHA)err.push('原始第九章Git blob SHA變更：'+actual);
const physical=JSON.parse(fs.readFileSync(resolve(HOME,'全庫物理清冊.json'),'utf8'));
const row=physical.files.find(x=>x.path===newPath);
if(physical.files_count!==335||physical.files.length!==335||physical.files.some(x=>x.path===oldPath)||
!row||row.git_blob_sha!==originalSHA||row.bytes!==original.length)err.push('335來源物理清冊未同步');
const base=JSON.parse(fs.readFileSync(resolve(HOME,'213份回收來源基線.json'),'utf8'));
if(base.sources.length!==213||base.sources.some(x=>x.path===oldPath)||
base.sources.filter(x=>x.path===newPath).length!==1)err.push('213來源基線未同步');
const fourth=JSON.parse(fs.readFileSync(resolve(HOME,'20261109_171待深審_第四批跨源語義衝突與審核門檻.json'),'utf8'));
const fifth=JSON.parse(fs.readFileSync(resolve(HOME,'20261109_171待深審_第五批首篇版本與敘事權威仲裁.json'),'utf8'));
const a=fourth.records.find(x=>x.id==='SRC-171-001');
if(a?.resolution?.original_blob_sha_unchanged!==originalSHA||a.evidence[1]?.source_path!==newPath)
err.push('原稽核歷史與新來源未相連');
const board=JSON.parse(fs.readFileSync(resolve(HOME,'AI接手_工作板.json'),'utf8'));
const listed=board.audited_batch_paths;
if(!Array.isArray(listed)||listed.length<2)err.push('工作板未列原文錨點審核批次');
const audits=(listed||[]).map(p=>{
 if(typeof p!=='string'||p.includes('..')||p.includes('\\')||p.startsWith('/'))throw Error('unsafe audit batch path');
 return JSON.parse(fs.readFileSync(resolve(PROJECT,p),'utf8'));
});
const ids=new Set(audits.flatMap(b=>b.records.map(x=>x.id)));
const count=audits.reduce((n,b)=>n+b.records.length,0);
const anchors=audits.reduce((n,b)=>n+(b.evidence_count??b.original_anchors_count??0),0);
if(ids.size!==count)err.push('重複或缺失的跨批次審核ID');
if(count!==board.fact_snapshot.targeted_audit_records||
 anchors!==board.fact_snapshot.targeted_audit_verified_quotes)
 err.push('跨批次審核與工作板累積紀錄不一致');
const ledger=JSON.parse(fs.readFileSync(resolve(HOME,'版本取代與相容決策鏈.json'),'utf8'));
for(const record of ledger.records)for(const id of record.related_audit_ids||[])
if(!ids.has(id))err.push(record.id+'引用不存在的審核ID:'+id);
if(ledger.records.length!==board.fact_snapshot.version_decision_nodes)
err.push('既有版本圖節點數與工作板不一致');
if(err.length){console.error(err.join('\n'));process.exitCode=1}
else console.log('遷移通過：09五檔、原第九章Git blob不變、335來源、213份索引、'+ledger.records.length+'版本節點、'+count+'項跨批次證據、'+anchors+'錨點');
