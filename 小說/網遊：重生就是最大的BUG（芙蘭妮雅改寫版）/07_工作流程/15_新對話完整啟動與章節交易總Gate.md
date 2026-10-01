# 新對話完整啟動與章節交易總Gate

> 狀態：`ACTIVE / REQUIRED / BOOTSTRAP_ROOT`  
> 日期：2026-10-01  
> 原則：GitHub `main` 是唯一專案真值；聊天記憶只能當提示。

## 一、零上下文啟動

新對話收到「繼續／下一章／修正／檢查／回改」時，先同步 `main`，動態確認最高正式章，不得先按聊天摘要續寫。

必讀：
1. `00_專案交接.md`
2. 本檔
3. `07_工作流程/00、01、04、05、06、07、08、10、14`
4. `04_連續性與索引/01_當前狀態快照.md`
5. `04_連續性與索引/02_未完成因果與待定事項.md`
6. `04_連續性與索引/07_有效性與同步稽核.md`
7. `04_連續性與索引/08_原著事件待處理佇列.md`
8. `04_連續性與索引/09_裝備與資產權威總表.md`
9. 最新有效知識矩陣、章節索引、最高正式章全文
10. `小說/家庭總檔/01_家庭完整角色設定總檔.md` 的 Franiya 權威段
11. `小說/家庭總檔/10_芙蘭妮雅痛覺形成史補充.md`
12. `02_角色設定/11_Franiya能力技巧與使用區段施工總表.md`
13. 涉及魔法時加讀 `家庭總檔/09`、`02/09`、`02/12`、`02/14`；涉及折光外觀時加讀 `02/13`。

任一必要檔缺失，不得宣告 `BOOTSTRAP_GATE = PASS`。

## 二、PREWRITE前狀態恢復

必須恢復：HEAD、最高章與下一章、精確停點、時間地點POV、active身份與切換鎖、技能／物品CD、任務與deadline、裝備／持有資產、人物知情邊界、未完成因果、SOURCE游標與下一個硬錨。

### 2.1 Franiya／折光單一內在知識主體Gate

- `INTERNAL_KNOWLEDGE_OWNER = Franiya`
- `INTERNAL_KNOWLEDGE_SYNC = Franiya <-> 折光`
- `KNOWLEDGE_IDENTITY_SPLIT_FORBIDDEN = TRUE`
- 折光是Franiya的第二身份／角色殼，不是獨立記憶主體；任何一個身份親自合法取得的知識，都必須同步存在於Franiya的內在知識中，切換身份不得造成失憶、重複詢問或重新得知。
- 身份隔離只作用於`PUBLIC_DISCLOSURE`、`PUBLIC_IDENTITY_LINK`與其他角色可合理推知的資訊，不得反向切割Franiya自己的記憶與認知。
- 為保護折光身份，Franiya可以故意裝作不知道、否認、模糊、省略或提出掩飾性問題；但必須視為`DELIBERATE_CONCEALMENT`。
- 特例鎖定：第47章Franiya已親自遭遇【迦娜】。第62章起折光內在必須認得迦娜。

固定：
- `STATE_RESTORATION_GATE = PASS`
- `ASSET_LEDGER_PREWRITE_GATE = PASS`
- `KNOWLEDGE_BOUNDARY_GATE = PASS`
- `INTERNAL_KNOWLEDGE_SYNC_GATE = PASS`

## 三、原著事件Gate

- 正常長章：`9000_TO_14000`中文字。
- 原則上每章至少完整消耗原著3章事件責任，因果自然可更多。
- `TOUCHED_NOT_CONSUMED / READY / DEFERRED`不得灌入最低數。
- 每個來源章的兄弟事件都要正式分類。
- 不得為湊數壓縮重要人物、資產、關係、世界反應或後果。
- 最終回報必須逐章說明原著事件本體與本線處理，不能只報章號。

### 3.1 原著保留／差異分類硬Gate

每一個本輪宣告「已完整消耗」的來源章，最終使用者回報至少要列出：

1. `SOURCE_CHAPTER`
2. `ORIGINAL_EVENT`
3. `PRESERVATION_DELTA`
4. `REWRITE_DISPOSITION`
5. `REWRITE_RESULT`
6. `RESIDUAL_STATUS`

固定：
- `REWRITE_RESULT != DIVERGENCE_BY_DEFAULT`
- `PRESERVED_OBJECTIVE_OUTCOME_CAN_COEXIST_WITH_RECALCULATED_CAUSAL_IMPLEMENTATION`
- 原著客觀結果若保留，`PRESERVATION_DELTA`必須明寫`PRESERVED`。
- 若原著結果相同、但具體達成方法依法重算，拆開寫「結果保留」與「方法／因果重算」。
- `SOURCE_METHOD_NOT_LOCKED -> DO_NOT_INFER_SAME_OR_DIFFERENT_METHOD`
- `METHOD_UNRESOLVED != RESULT_UNRESOLVED`
- 同一來源章內可同時存在多種分類，不得把兄弟事件壓成單一總標籤。

`SOURCE_PRESERVATION_DELTA_GATE = REQUIRED`

### 3.2 反向掃描／高權威SOURCE客觀結果保留硬Gate

若SOURCE_CANON母表、二次反向歸屬掃描、SOURCE_NODE雙向稽核、逐事件acceptance或更高權威SOURCE已明確確認客觀結果，例如：

- 已購買／已學會／已取得；
- 已死亡／已回城；
- 任務已完成／未完成；
- 已加入／已拒絕；
- 已掉落／已交付；
- 已支付／已消耗；

則正文施工固定：

`REVERSE_AUDIT_CONFIRMED_OBJECTIVE_RESULT = PRESERVE_BY_DEFAULT`

不得只因以下理由降級或改寫客觀結果：

- 主角由沈雲改成Franiya；
- Franiya本人已會相似技巧；
- 覺得某技能「她可能不需要」；
- 精確金幣餘額沒有鎖死，但既有資金尺度已明確足夠；
- 具體達成方法需要重算；
- 作者偏好延後取得。

若確實需要分歧，PREWRITE必須先列：

1. `ORIGINAL_CONFIRMED_RESULT`
2. `PROPOSED_REWRITE_RESULT`
3. `EXPLICIT_CONFLICT_EVIDENCE`
4. `FRANIYA_SPECIFIC_CAUSAL_CONFLICT`
5. `WHY_PRESERVATION_IS_IMPOSSIBLE_OR_ILLOGICAL`
6. `DOWNSTREAM_EFFECT`
7. `USER_OVERRIDE`（若有）

只有存在使用者明確覆蓋、已成立的直接因果衝突、世界規則不相容、實際資源／資格不可能，或更高權威SOURCE修正時，才可合法改變客觀結果。

最終報告必須再次公開相同分歧與理由；不得只在內部PREWRITE出現。

固定：

`SOURCE_AUTHORITY_DOWNGRADE_WITHOUT_CAUSE = FORBIDDEN`
`EXPLICIT_CONFLICT_EVIDENCE_REQUIRED_FOR_OBJECTIVE_DIVERGENCE = TRUE`
`UNREPORTED_OBJECTIVE_RESULT_DIVERGENCE_COUNT = 0`

任一違反：

`SOURCE_PRESERVATION_DELTA_GATE = FAIL`
`CHAPTER_TRANSACTION_CLOSE = FORBIDDEN`

## 四、Franiya能力與裝備Gate

每章完整掃 `02/11` 全能力組與 `09_裝備與資產權威總表.md`。

固定：
- `ABILITY_NOT_USED = ALLOWED`
- `ABILITY_NOT_EVALUATED = FORBIDDEN`
- `ABILITY_NOT_EVALUATED = 0`
- `ABILITY_SOURCE_ATTRIBUTION = PASS`
- `LOWEST_SUFFICIENT_TIER_SELECTED = PASS`
- `HELD != EQUIPPED`
- `NOT_USED != NOT_ACQUIRED`

人物本人已有類似技巧不等於系統技能無取得價值；須分清「人物技術／理解」與「角色殼系統權限／倍率／屬性結算」。

主觀痛覺0是漫長經歷逐步鈍化的結果，不是先天無痛、主動關閉或屏蔽。

### 4.1 金幣／資源可負擔性Gate

- `EXACT_BALANCE_UNLOCKED`可以成立，但不等於`INSUFFICIENT_FUNDS`。
- 若既有正式資產／經濟鏈已證明某筆支出遠低於可用流動性尺度，不能只因「精確餘額未鎖」阻斷正常購買。
- 只有真正存在大額消耗、資產凍結、規則限制、資格限制或已知現金不足時，才可建立資金衝突。

`UNKNOWN_EXACT_BALANCE != INSUFFICIENT_FUNDS`

## 五、魔法專項Gate

涉及折光／自由構築時必須完成：
- `FRANIYA_MAGIC_OPTIMIZATION_GATE = PASS`
- `FRANIYA_PARALLEL_CAST_GATE = PASS`
- `FRANIYA_FREE_CONSTRUCTION_TIER_GATE = PASS`
- `FRANIYA_PERMISSION_VS_TECHNIQUE_GATE = PASS`

固定認知：
- 不知道別人的私人公式，不代表不能自行觀察元素、MP、穩定性、凝聚速度與輸出後推導更佳排列。
- 第50章兩條構型只是當次使用量；雙線不是並行上限。
- 8階【海潮】與【火雨降臨】能合法啟動，已證明角色殼在對應資源與接口成立時能承載8階量級。
- 具名系統技能與自由構築等價術式必須分流。
- 神咒表示威力、效果或術式層級已達神級，不等於神殿專屬。

## 六、正式章施工與POSTWRITE

正文前PREWRITE至少鎖：前一動作與位置、全員狀態、知情邊界、本章目標、原著至少3章事件責任、裝備／技能／CD與能力Gate、禁止錯誤、章末停點。

沒有新PREWRITE不得沿用上一章PREWRITE直接寫下一章。

正文後同輪必做：正文QA、POSTWRITE、知識矩陣、章節索引、Current State、未完成因果、Active Queue、裝備資產Ledger、有效性稽核、專案交接、SOURCE游標、交易同步／關閉。

`NOT_CHANGED_AFTER_EVALUATION = ALLOWED`，但 `NOT_EVALUATED = FORBIDDEN`。

## 七、VOID與全部改動公開

若使用 `VOID_WITH_CAUSE`，逐項公開原事件、VOID範圍、原因、Franiya替代因果、保留功能、為何不重建、下游狀態。

無論是否有VOID，只要本輪正式改了內容，都必須公開所有變更。

## 八、Git交易關閉

推薦順序：
1. 正文／RETRO本體commit；
2. 同輪同步所有State／Ledger／Queue／Audit；
3. transaction close commit；
4. 重新讀 `main` HEAD；
5. 驗證本體commit在最新HEAD祖先鏈，`behind_by = 0`；
6. 完成使用者最終回報後才宣告交易完整。

## 九、歷史資料與過時值

舊PREWRITE／POSTWRITE／RETRO可以保留歷史舊值，但必須明確標示為歷史／已覆蓋。現行權威檔、Current State、Queue、工作流程入口不得留未標示的過時值。

每次重大修正至少掃：舊外觀、技能取得、裝備狀態、章容量、VOID數、痛覺因果、魔法並行上限、元素公式誤綁、神咒分類、SOURCE保留／差異分類、章號與SOURCE游標，以及**反向掃描已確認但被正文降級的客觀結果**。

`CURRENT_AUTHORITY_STALE_VALUE_COUNT = 0` 才可關閉大修交易。
