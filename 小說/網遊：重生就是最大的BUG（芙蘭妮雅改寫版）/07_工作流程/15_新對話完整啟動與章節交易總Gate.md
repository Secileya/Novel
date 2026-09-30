# 新對話完整啟動與章節交易總Gate

> 狀態：`ACTIVE / REQUIRED / BOOTSTRAP_ROOT`  
> 日期：2026-09-30  
> 目的：讓目前對話或任何零上下文新對話都能從GitHub自行恢復完整施工狀態，不依賴聊天記憶，也不漏掉後期新增的Gate。

## 一、唯一啟動原則

新對話收到「繼續／下一章／修正／檢查／回改」時，先以GitHub `main`為真值，不先相信聊天摘要。

`CHAT_MEMORY_IS_HINT_ONLY = TRUE`

`GITHUB_MAIN_IS_PROJECT_SOURCE_OF_TRUTH = TRUE`

`DYNAMIC_STATE_RECONSTRUCTION_REQUIRED = TRUE`

## 二、零上下文最小必讀包

### A. 專案／流程
1. `00_專案交接.md`
2. 本檔
3. `07_工作流程/00_新對話長期主提示詞.md`
4. `07_工作流程/01_原著改寫長期循環.md`
5. `07_工作流程/04_施工門禁與Franiya能力Gate補充.md`
6. `07_工作流程/05_正文事件佇列自動讀取與章節交易.md`
7. `07_工作流程/06_SOURCE_NODE雙向稽核與證據邊界.md`
8. `07_工作流程/07_原著事件消耗與章節內容密度規則.md`
9. `07_工作流程/08_原著事件捕捉母表逐事件驗收硬流程.md`
10. `07_工作流程/10_VOID_WITH_CAUSE使用者公開回報硬門檻.md`
11. `07_工作流程/14_使用者最終回報全變更公開硬門檻.md`

### B. 當前狀態
12. `04_連續性與索引/01_當前狀態快照.md`
13. `04_連續性與索引/02_未完成因果與待定事項.md`
14. `04_連續性與索引/07_有效性與同步稽核.md`
15. `04_連續性與索引/08_原著事件待處理佇列.md`
16. **`04_連續性與索引/09_裝備與資產權威總表.md`**
17. `04_角色知識矩陣.md`＋有效最新增量
18. `06_章節索引.md`＋有效最新增量
19. 動態確認的最高正式章全文；只有需要銜接才補前一章章末

### C. Franiya
20. `小說/家庭總檔/01_家庭完整角色設定總檔.md`中Franiya權威段
21. `小說/家庭總檔/10_芙蘭妮雅痛覺形成史補充.md`
22. `02_角色設定/11_Franiya能力技巧與使用區段施工總表.md`
23. 涉及法術前兆／威力效果判斷時讀`02_角色設定/12_Franiya施法前兆威力與效果解析補充.md`
24. 涉及【折光】時讀`02_角色設定/13_折光外觀與白髮選擇補充.md`
25. 本章會實際用到的家庭總檔能力補充檔

若任何必要檔缺失：

`BOOTSTRAP_REQUIRED_FILE_MISSING = TRUE`

則禁止宣告`BOOTSTRAP_GATE = PASS`。

## 三、PREWRITE前不可省略的狀態恢復

必須明確恢復：
- `HEAD_SHA`
- `CURRENT_FORMAL_CHAPTER / NEXT_FORMAL_CHAPTER`
- 正文精確停點、時間、地點、POV、在場者
- active身份、身份切換鎖、技能／物品CD
- active任務與截止
- 目前裝備／持有資產／本章可能相關裝備技能
- 人物知情邊界
- 未完成因果
- 原著事件消耗游標與當前SOURCE窗口
- 下一個不可跳事件與硬錨

固定：

`STATE_RESTORATION_GATE = PASS`

`ASSET_LEDGER_PREWRITE_GATE = PASS`

`KNOWLEDGE_BOUNDARY_GATE = PASS`

## 四、原著事件Gate

- 正常長章：`9000_TO_14000`中文字。
- 每章原則上至少完整消耗原著3章事件責任，因果自然可更多。
- 「讀到3章」不等於「消耗3章」。
- `TOUCHED_NOT_CONSUMED / READY / DEFERRED`不得灌入最低數。
- 每個來源章的兄弟事件都要有正式 disposition。
- 重要SOURCE_NODE必須完成雙向Pass與六Gate。
- 若因果上無法自然放入，透明分類，不為湊數硬塞。

`MIN_ORIGINAL_SOURCE_CHAPTERS_CONSUMED_PER_REWRITE_CHAPTER = 3`

`SOURCE_SIBLING_COMPLETENESS_CHECK = REQUIRED`

## 五、Franiya能力＋裝備Gate

每章必須完整掃`02/11`五組能力。固定：

- `ABILITY_NOT_USED = ALLOWED`
- `ABILITY_NOT_EVALUATED = FORBIDDEN`
- `ABILITY_NOT_EVALUATED = 0`
- `CURRENT_EQUIPMENT_SKILLS = CHECKED_AGAINST_ASSET_LEDGER`
- `ABILITY_SOURCE_ATTRIBUTION = PASS`
- `LOWEST_SUFFICIENT_TIER_SELECTED = PASS`

現況主觀痛覺0是**經歷逐步鈍化的結果**，不是先天無痛、主動開關或屏蔽。涉及受傷時必讀家庭總檔10號補充。

## 六、正式章施工

正文前PREWRITE至少鎖：
1. 前一動作與位置；
2. 全員狀態；
3. 知情邊界；
4. 本章目標；
5. 原著至少3章事件責任與逐項去向；
6. 裝備／技能／CD與能力Gate；
7. 禁止錯誤；
8. 章末預定停點。

沒有新PREWRITE不得直接沿用上一章PREWRITE寫下一章。

## 七、POSTWRITE與同步

同輪必做：
- 正文QA；
- POSTWRITE；
- 角色知識矩陣；
- 章節索引；
- Current State；
- 未完成因果；
- Active Queue ACK／event state；
- **裝備與資產權威總表**；
- 有效性與同步稽核；
- 專案交接；
- 原著事件游標；
- 交易同步／關閉紀錄。

若正文沒有改某一帳，也要確認它不需要改：

`NOT_CHANGED_AFTER_EVALUATION = ALLOWED`

`NOT_EVALUATED = FORBIDDEN`

## 八、VOID與改動回報

### VOID
使用`VOID_WITH_CAUSE`時，每一項必須按10號流程公開完整理由，包括至少：來源事件、原事件、VOID層、原因、替代因果、保留功能、為何不重建、下游狀態。

### 全部改動
最終回報不能只講VOID。只要本輪正式改了任何內容，都要依14號流程公開：
- 舊值→新值；
- 為什麼；
- 影響哪些檔；
- 下游如何改。

`VOID_USER_DISCLOSURE_GATE = PASS`不代表`ALL_CHANGE_DISCLOSURE_GATE = PASS`。

## 九、使用者最終回報固定結構

正式章／RETRO／大稽核完成時，至少包含：
1. 本輪主要成果；
2. **原著逐章原事件＋本線處理**（有消耗來源時）；
3. VOID逐項理由，或明寫本輪無VOID；
4. 本輪所有其他正式改動；
5. 同步檔案；
6. 當前狀態／下一章入口是否改變；
7. Git body commit／close commit／最新HEAD／ancestry。

`USER_VISIBLE_ORIGINAL_EVENT_SUMMARY_REQUIRED = TRUE_WHEN_SOURCE_CONSUMED`

`ALL_CHANGE_DISCLOSURE_GATE = REQUIRED`

## 十、Git交易與關閉

推薦：
1. 可恢復正文／RETRO本體commit；
2. 同輪同步所有Ledger／State／Queue／Audit；
3. transaction close commit；
4. 重新讀`main` HEAD；
5. 驗證本體commit是最新HEAD祖先，`behind_by = 0`；
6. 準備完整使用者回報payload後才宣告交易完整。

`COMMIT_REACHABILITY = PASS`

`TRANSACTION_CLOSE_REQUIRES_ALL_GATES = TRUE`

## 十一、修正／中斷／status-only

- 使用者指出錯誤：同輪查證→回改→同步→驗證→完整回報，不只解釋。
- 修一處時若確定發現其他受同一因果影響的錯誤，`DETERMINISTIC_FIX_AVAILABLE = TRUE`就同輪修並回報。
- 使用者只問狀態／查詢：不得擅自寫下一章。
- 使用者要求續寫：只有上一筆交易完整關閉且新PREWRITE PASS才可進正文。

## 十二、歷史文件與過時值

舊PREWRITE／舊POSTWRITE／RETRO紀錄可以保留當時舊值作歷史證據，但必須清楚標示`HISTORICAL / SUPERSEDED / RETRO_CORRECTED`；**現行權威檔、Current State、Queue、工作流程入口不得保留未標示的過時值。**

每次重要修正後至少做一次針對性掃描：
- 舊外觀；
- 舊技能取得狀態；
- 舊裝備狀態；
- 舊章容量；
- 舊VOID數；
- 舊痛覺因果；
- 舊章號／事件游標。

`CURRENT_AUTHORITY_STALE_VALUE_COUNT = 0`才可關閉大修交易。
