#!/usr/bin/env node
/** Generate a single readable handoff from the authoritative workboard. Does not certify semantics. */
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const board=JSON.parse(fs.readFileSync(path.join(here,"AI接手_工作板.json"),"utf8"));
const task=board.tasks.find(t=>t.id==="NEXT-009");
if(!task||!task.progress)throw Error("NEXT-009 progress missing");
const p=task.progress, f=board.fact_snapshot||{}, last=board.latest_progress||{}, delivered=board.last_delivered_work||{};
const qa=board.tasks.find(t=>t.id==="NEXT-011");
const issueBoard=JSON.parse(fs.readFileSync(path.join(here,"正文待修_統一問題台帳.json"),"utf8"));
const total=f.raw_source_files, accepted=p.verified_complete, pending=p.pending;
if(!Number.isInteger(total)||!Number.isInteger(accepted)||!Number.isInteger(pending)||accepted+pending!==total)throw Error("handoff counts inconsistent");
if(f.all_source_full_file_editorial_accepted!==accepted||f.all_source_full_file_editorial_remaining!==pending)throw Error("workboard snapshot is stale");
const isVerified=String(last.stage||"").includes("VERIFIED")&&last.ci_result==="success";
const next=Array.isArray(p.next_batch)?p.next_batch:[];
const lines=[
 "# 巨構世界｜最新 AI 交接（自動生成；以 GitHub 現行提交為準）",
 "",
 "> 單一入口：本文件依「AI接手_工作板.json」產生。若沒有同步更新，CI 應失敗。這是工作追蹤，不是小說 Canon，也不是獨立語義複核。",
 "",
 "## 當前數字與證據狀態",
 "",
 "- 工作板更新時間："+(board.updated_at||"未記錄"),
 "- 全庫整檔驗收登記："+accepted+"／"+total+"；待審："+pending+"。來源新增或版本失效時需重新掃描，不能永遠固定335。",
 "- 第"+(String(delivered.task||"NEXT-009").match(/batch\s*(\d+)/i)?.[1]||String(delivered.task||"NEXT-009").replace(/[^0-9]/g,""))+"批／最新進度："+(last.stage||p.stage||"未知"),
 "- CI："+(isVerified?"已由工作板記錄成功":"尚未完成當前批次成功確認；數字只能視為待核對提交狀態"),
 "- 最近一次驗證 URL："+(last.ci_run_url||p.last_ci||"未記錄"),
 "- 最新批次提交："+(last.commit||p.last_verified_commit||"未記錄"),
 "- 正式小說章數："+f.canon_formal_chapters+"；PREWRITE HOLD："+String(f.prewrite_hold),
 "",
 "## 剛完成與剩餘",
 "",
 "- 本次內容："+(last.scope||"依工作板當次來源清單"),
 "- 其他限制："+(last.not_finished||"全部未驗收來源仍需逐份實際閱讀"),
 "- 下步："+(last.next_step||"依 NEXT-009.next_batch 查核"),
 "",
 "## 正文接手｜統一待修問題（必讀）",
 "",
 "- [正文接手必讀](正文待修_接手必讀.md)｜[逐項證據與修法 JSON](正文待修_統一問題台帳.json)。",
 "- 共"+issueBoard.stats.total+"項：衍生勘誤已更正 "+(issueBoard.stats.RESOLVED_DERIVED||0)+"、仍待審 "+(issueBoard.stats.OPEN_REVIEW||0)+"、已有其他候選補丁 "+(issueBoard.stats.PATCHED_CANDIDATE||0)+"、後續守門 "+(issueBoard.stats.WATCH||0)+"；原始候選未改，非Canon。",
 "- [獨立更正對帳](正文待修_01至14章_勘誤後獨立對帳_20261111.md)｜[三條精確非Canon修稿補丁](正文待修_精確修訂補丁候選.json)｜[SHA與負測驗證器](正文待修_問題證據與補丁驗證.mjs)。",
 "",
 "## 下一個主目標（已登記，與整檔驗收數量分開）",
 "",
 "- "+(qa?qa.id+"｜"+qa.name:"未登記；先更新工作板"),
 "- 狀態："+(qa?.status||"未登記")+"；QA進度："+(qa?.progress?.stage||"未知"),
 "- 首個實際工作："+(qa?.first_action||"未設定"),
 "- 新增/改版的優先路線：NEXT-009／NEXT-010；[完整SOP](來源新增與既有檔案更新_CI與歷史批次處理SOP_20261111.md)。",
 "",
 "## 下一批具體來源",
 "",
 ...(next.length?next.map((x,i)=>String(i+1)+". "+x):pending===0?["（目前來源待審0；改依NEXT-011進行跨檔語義QA。新來源或SHA改版才另開來源驗收批。）"]:["（待工作板填入 next_batch，禁止猜測）」"]),
 "",
 "## 接手故障經驗與每批必回寫",
 "",
 "- 必讀：[AI接手經驗回寫與Git交易規範](AI接手_經驗回寫與Git交易規範.md)；逐批追加：[經驗更新日誌](AI接手_經驗更新日誌.jsonl)。",
 "- 實際批次SOP與第25、26批缺口：[第25–26批執行對照與S0–S4](20261110_第25_26批真實執行對照與現行SOP_非正史.md)；下一批不能重複排已驗收來源。",
 "- 每次更新工作板進度，必須同批記錄問題／根因／解法／驗證及未完成，通過 AI接手_經驗回寫驗證.mjs；不能把預審當正式完成。",
 "",
 "## 下一任 AI 必守事項",
 "",
 "1. 先看本文件、AI接手_工作板.json、AI接手_整檔語義驗收台帳.json、最近批次 JSON 與 CI；再從 GitHub main 讀原文 SHA。",
 "1a. **強制防重先查**：先跑 AI接手_排批防重預檢.mjs --check，再用 --select 核對所選全部來源，分片入Manifest前再以 --candidate 查重；若只有連接器則須核查歷史總帳與每份Manifest分片。任何已驗收來源不得重算。",
 "2. 原始設定、候選章和原始對話資料不得擅自覆寫；候選不升 Canon，正式0章 PREWRITE HOLD 仍有效。",
 "3. 逐檔閱讀、二遍漏檢、引文 SHA/行號、後出來源依賴與非 Canon 雙向圖連線都要保存；CI 成功不證明語義全知。",
 "4. 每批新增SHA驗收分片與Manifest，更新工作板、覆蓋統計、經驗日誌及本報告（舊巨大總帳與證據橋唯讀）；用 AI接手_最新交接產生器.mjs --write 更新交接，提交後核CI。",
 "5. CI 執行 --check 防止本交接落後工作板；若尚未驗證成功，不對使用者稱完整驗收完成。",
 "",
 "## 可靠來源",
 "",
 "- 工作板：00_分類導航/設定關聯引擎/AI接手_工作板.json",
 "- 最近批次驗收檔："+((board.audited_batch_paths||[]).at(-1)||"未記錄"),
 "- 最新 CI："+(last.ci_run_url||p.last_ci||"未記錄"),
 "",
];
const output=lines.join("\n")+"\n";
const file=path.join(here,"最新交接_請先讀.md");
if(process.argv.includes("--write")){fs.writeFileSync(file,output,"utf8");console.log("handoff written");}
else if(process.argv.includes("--check")){if(!fs.existsSync(file)||fs.readFileSync(file,"utf8")!==output){console.error("STALE_HANDOFF: regenerate 最新交接_請先讀.md with --write");process.exitCode=2;}else console.log("handoff synchronized");}
else process.stdout.write(output);
