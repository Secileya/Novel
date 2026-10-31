# 《晨曦》｜每章至少三原著章完整消耗、逐E來源對照與 VOID_WITH_CAUSE 硬Gate

> **2026-10-31｜USER_DIRECT_REQUIREMENT／MANDATORY／優先於舊「每章約2～3章」容量建議。** 本文件是實際執行義務；凡本文件未通過者不能只憑前一版A/B/POSTWRITE宣告「合格」。
> **同一使用者正式規則**：「參考《重生就是最大的BUG》原著事件抓取，一章至少推進消耗三章以上事件；事件取消一樣要用 `VOID_WITH_CAUSE` 和說明原因，原著跟你修改的對照。」
> 上位遵守：`04_連續性與索引/11_無塞希莉雅因果即照原著_保留優先硬規則_20261024.md`、`07_工作流程/02_原著逐章詳卡_VOID與事件消耗硬Gate.md`、`07_工作流程/03_每章強制證據閉環與審稿硬Gate_20261031.md`；本文件**新增硬下限**，不得由舊文件的「非硬限制」反向取消。
> **來源參考（方法，非人物/事件）**：《網遊：重生就是最大的BUG（芙蘭妮雅改寫版）》`07_工作流程/07_原著事件消耗與章節內容密度規則.md`（舊版最少3、後調整5；只採其事件核銷方法）、`08_原著事件捕捉母表逐事件驗收硬流程.md`、`09_VOID_WITH_CAUSE功能殘留與角色推理硬門檻.md`、`10_VOID_WITH_CAUSE使用者公開回報硬門檻.md`、`16_原著客觀結果延後落實與差異公開硬Gate.md`、`17_章節容量與原著事件消耗最新硬規格.md`。**不移植另一作品專屬13,000～18,000中文字/五章/芙蘭妮雅設定。**

## 1. 章級最低要求：不是讀取量、提到量或PREWRITE計畫量

```text
MIN_ORIGINAL_SOURCE_CHAPTERS_TO_CONSUME = 3
FULLY_CONSUMED_SOURCE_CHAPTER_COUNT >= 3
MORE_CHAPTERS_IF_CAUSALLY_NATURAL = TRUE
SOURCE_READ_CURSOR != EVENT_DISPOSITION_CURSOR != EVENT_CONSUMPTION_CURSOR
CHAPTER_GATE = PASS only after prose + reverse SOURCE audit + ledger + Git commit
```

- 「一章」指**一章《晨曦》正式改編正文**；「三章」指原著TXT中**至少三個不同原著章號、每章的獨立事件/敘事功能均已由本章與既有合法前置階段完成必要收束，並在本章最後一次核銷**。優先選時間相鄰、因果連續的3章，除非原著真正交錯多視角而有明確證據。
- 原著第A章在《晨曦》CH118只做50%、CH119把剩餘獨立事件完成並正式關閉，**只可在CH119的完整消耗數計一次**；CH118只列`TOUCHED_NOT_CONSUMED`。同一原著章不得在不同改編章重複計數。
- 一章原著可能分多個E/段/功能：主線、旁支、角色閒談、錢貨實付、人物反應、組織制度、任務資格、後續首次依賴。**只提到了章名、只發布任務、只起草合約、只是為另一章鋪路，都不算整章消耗**；真正已發生的前置結果可保留，剩餘部分在下一實際事件窗口核清。
- **`SOURCE_READ=290`不是`SOURCE_CONSUMED=290`；`A_STATUS=PASS`、`B_ACK=YES`、`POSTWRITE_EVENTS_VALID`都不代表`MIN_THREE_CHAPTER_GATE=PASS`**。
- `VOID_WITH_CAUSE`僅在嚴格證實原始因果失效、且其他功能有合法去向時算該功能已處理；**不准為湊3章把能正常發生的人事、交易、發獎、普通生活隨手標VOID**。同章三個來源章即使都有個別VOID，也要有足夠**實際新增故事結果**；若只用3張VOID卡、沒有相稱正文推進，`NARRATIVE_ADVANCEMENT_GATE=FAIL`。
- 若原著長任務本章只完成【開始】或【階段】、但來源章尚有同章獨立責任未落地，只把該階段E標`INTEGRATED`、未完E保留；**不要因任務遠期仍活著就把已完整結案的早期來源章無限卡死**：來源章「當章事件功能」與「它產生的未來子事件」分開計帳；已正式生成且具責任人的新子事件可存在後文，不妨礙前一原著章在自身全部事件處理完後算關閉。
- 原著只需2000～2500字不意味《晨曦》必須寫得機械精簡；**不壓縮情節**，有價值的場景可自然擴至更多字；但不能用多次重述同一結果/程序或無變化的等待，把1章來源事件拉成8000～10000字而缺少真進展。**本線沒有擅自設定13k～18k字硬配額**，最終看事件與因果完整度。

## 2. A端SOURCE逐章逐E抓取與「原著⇄本線」實際比較

**開工先確認唯一正式CH、GitHub HEAD、最近正典與既有SRC進度**；若已存在同號正式章，先STOP，不得再創另一份（07/03並行章節硬Gate）。

來源必讀**原著TXT連續章節原文**，不得只憑研究卡、搜尋摘要、章名或已寫本線結果臆測。每個來源章先列以下最小矩陣，每個事件至少一列：

| 欄位 | 必填的實證內容 |
|---|---|
| `SOURCE_CHAPTER / SCENE_ORDER / EVENT_ID / ORIGINAL_QUOTE_OR_TEXT_RANGE` | 原著幾章、該章哪個場景及可回查上下文；不能只寫大概有賣東西 |
| `ORIGINAL_ACTION / INITIATOR / CAUSE / TIME` | **誰主動做什麼，為何此時做**；當事人與角色猜測必區分 |
| `ORIGINAL_OBJECTIVE_RESULT / FIRST_REACTION` | 何人付錢、取得什麼、如何宣告、誰怎麼反應；不要將`OFFERED`冒充`PAID` |
| `SOURCE_FUNCTIONS` | `SCENE, ASSET_ECONOMIC, CHARACTER_RELATION, INFORMATION, WORLD_RULE, SOCIAL_REACTION, LONG_TERM`逐功能記錄 |
| `SOURCE_EXPLICIT / SOURCE_UNSTATED / INFERENCE` | 明示、未明示、角色推測、作者提案分開 |
| `CANON_BEFORE / SECILEYA_CAUSAL_DELTA` | 此刻《晨曦》已寫成什麼；**是哪個已成立人物行為/交易讓本線不同，或使用者已核准的特例**；原著事實不因本線改寫而變真 |
| `REWRITE_EVENT_ACTUAL / DIVERGENCE_REASON` | 本章**實際**保留、重算、替換、延後、局部VOID了哪些部分；每一差異具體說原因 |
| `DISPOSITION_BY_FUNCTION / RESIDUAL / DEADLINE` | 每一層採`INTEGRATED`/`WORLD_OFFSCREEN`/`WORLD_BACKGROUND_LOCKED`/`VOID_WITH_CAUSE`/`DEFERRED_WITH_TRIGGER`/`REBUILD_REQUIRED`，先完成本層合法結果，未完列最早重檢節點與最晚截止 |
| `BODY_LOCATION / ASSET_OWNER / KNOWLEDGE_OWNER / QA` | 本線正文第幾章哪個場景、誰現真持有、誰經由什麼得知、正反兩邊核對結果；A讀到不等於B真的寫到 |

A端**每個候選完整消耗的來源章**建立一張`SOURCE_EVENT_ACCEPTANCE_MATRIX`，掃全部E和兄弟事件，不得只給主線大事件；再讀原著下一章/更遠第一個依賴，反查付款、物權、受益與知情原起點。
雙向檢查：`ORIGINAL -> REWRITE`防少寫，`REWRITE -> ORIGINAL/CANON`防新增無源科技/虛構付款/幽靈知情。A先提交GitHub；B須**另取原著及正式Canon**核對，單一執行者仍只算分階段自我核對。

## 3. VOID_WITH_CAUSE八格＋八欄公開：不能用主角不同一筆勾銷

任何取消原著事件／對話／起因／交易／行動（連局部取消），先填**VOID判決八格**：

1. `ORIGINAL_ACTION`：原著具體做了什麼？
2. `ORIGINAL_CAUSE`：原著誰為何這樣做？
3. `SCENE_FUNCTION`：場景的必要展示／起承轉合；
4. `ASSET_ECONOMIC_FUNCTION`：價格、道具、資金、權屬、物流；
5. `CHARACTER_RELATION_FUNCTION`：人物選擇、關係、對話、地位；
6. `WORLD_RULE_FUNCTION`：組織、制度、玩家/居民、社會規則；
7. `DOWNSTREAM_REUSE`：後文第一次依賴及長線結果；
8. `SECILEYA_SUBSTITUTE_CAUSE_CHECK`：**就算原著楚河的私人動機不再存在，塞希莉雅的性格/行動、晨曦獨立意志、方城/聖樹/雙星利益，是否仍有足夠合法原因讓等價功能發生？** 必須回答YES/NO並有證據。

`VOID_ALLOWED`唯當原始前提在本線已**客觀不存在**、確實沒有替代起因、其他所有功能均有正式去向，且不破壞既有Canon/下游使用時成立。不能用「塞希莉雅很強」「另一主角」「沒必要寫」「太慢」「想換舞台」當作原因。

每個VOID必須**正式記錄且向使用者公開**八欄：
`SOURCE_CHAPTER_EVENT`／`ORIGINAL_EVENT`／`VOID_SCOPE`／`CAUSE_INVALID_REASON`／`SECILEYA_SUBSTITUTE_CAUSE_CHECK`／`PRESERVED_FUNCTIONS`／`WHY_NOT_REBUILT`／`DOWNSTREAM_STATUS_TRIGGER_DEADLINE`。
若非整項取消，只能標 `VOID_WITH_CAUSE_SCENE_ONLY` 等局部；金錢/人情/世界規則仍要`INTEGRATED`或`DEFERRED`。若實際沒有VOID，最終回報須寫**「本輪未使用VOID_WITH_CAUSE」**，避免掩蓋或誤判。
`OLD_VOID_REAUDIT=MANDATORY`：任何舊VOID重新進入窗口，A/B須重新驗證，不能複製舊卡的結論直接當有效。

**一個正面例子（已授權但不是VOID全部）**：原著CH280小晨奉楚河之命**主動**向方城兜售約30名戰力；《晨曦》CH117改為方城三長老/城主主動詢價，**使用者明確單項批准**；因此只把**原著主動詢價方式/說話者**標`RECALCULATED_WITH_USER_EXCEPTION`，而不是對30人雇傭、聖樹/雙星競爭、三長老決策或月結價格全案VOID。CH118仍有方城條件框架，未真實出兵或收款。

## 4. 原著客觀結果（獎勵/交易/制度）不得因劇情慢而偷延後

若原著實際已`PAID/ACQUIRED/REWARDED/CONTRACT_SIGNED/LEARNED/RELATION_CHANGED`，本線預設保留結果；只有可舉出已成立不同因果或新合法時間窗口，才能：
- `PRESERVED`：結果落在該場；
- `RECALCULATED_WITH_CAUSE`：價格、主動者、細節因實際差分調整；
- `DEFERRED_OBJECTIVE_RESULT`：**必填**原結果、延期理由、首次合法節點、最晚安全截止、預期結果、期限未達應`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`、OWNER、遠期依賴；
- `VOID_WITH_CAUSE`：滿足上節所有適用條件及公開義務。

任務`AVAILABLE`不等於`ACCEPTED`，`ACCEPTED`不等於`COMPLETED`，`COMPLETED`不等於`REWARDED`；報價/意向/框架合約/出勤/實際收付亦不可互相當成同一階段；人物不在場也不會令原本存在的經濟、社會後果消失。

## 5. B端 PREWRITE：未規劃至少3章完整消耗，不能開寫

```text
MIN_ORIGINAL_SOURCE_CHAPTERS_TO_CONSUME = 3
PLANNED_FULLY_CONSUMED_SOURCE_CHAPTERS = [CHaaa, CHbbb, CHccc, ...]
PLANNED_SOURCE_CHAPTERS_AND_EVENT_IDS = SOURCE_CARD_REFERENCES
PLANNED_TOUCHED_NOT_CONSUMED = [...]
PLANNED_VOID_WITH_CAUSE_DISCLOSURE = [...] / NONE
CANON_CHANGE_PROOF = [chapter, scene, affected function, reason]
SCENE_PLAN_IN_CHRONOLOGICAL_ORDER = [...]
FIRST_LAYER_RESULTS = [...]
CHAPTER_END_REAL_PROGRESS = [what actually closes]
NEXT_DEPENDENCIES = [...]
MIN_THREE_GATE_PREWRITE = PASS / FAIL
```

- 一章要**真推進世界狀態**，不能用三個`VOID`或三張研究卡湊數；以**原著至少3章完整E責任**為硬要求，且正文保留自然流暢的敘事、角色、金錢與反應。
- 若A卡已讀到原著CH290卻只能合法閉環CH282的部分、CH283部分，則`MIN_THREE_GATE_PREWRITE=FAIL`，必須沿真實因果擴展至可閉環三章的場景/事件，再開寫；不是增加生活對話數量把字數撐長。
- 每章有一張完整 **ORIGINAL⇄REWRITE 逐E對照表**：`原著章/事件/原行動者/客觀結果 | 本線Canon已有前因 | 本章怎麼演/取得/交付 | 差異原因與已成立證據 | 分類 | 殘留/下一期限`。必須在正式正文開寫前預計，再在寫後按實際場景更新；**表中的「將寫」不許事後冒充「寫了」**。
- B端前後必須做7功能掃描與上一來源章兄弟事件掃描；有未證VOID、到期延期、未寫關鍵獎勵/交易時，`PREWRITE_GATE=BLOCKED`。

## 6. POSTWRITE：原著每一章對完，才可宣告3章

每次正式章在提交前：先把本章與SOURCE逐E雙向檢查，**列出整個來源章所有獨立E**及正文位置。若新稿漏了可自然承接的原著兄弟事件，只是文字換皮重複/章末留懸，則繼續修稿或擴寫**同一章**，不得以`POSTWRITE_PASS_FOR_WRITTEN_EVENTS`取代完整來源章門檻。

```text
ACTUAL_FULLY_CONSUMED_SOURCE_CHAPTERS = [CHaaa, CHbbb, CHccc, ...]
ACTUAL_FULLY_CONSUMED_SOURCE_CHAPTER_COUNT = N
TOUCHED_NOT_CONSUMED_SOURCE_CHAPTERS = [...]
FULL_ORIGINAL_VS_REWRITE_EVENT_MATRIX = COMMITTED
VOID_WITH_CAUSE_EVIDENCE_AND_USER_DISCLOSURE = COMPLETE / NONE
SOURCE_EVENT_CONSUMPTION_CURSOR = LAST_PROVEN_CLOSED_E
NEW_STATES_AND_RESIDUAL_OWNERS = VERIFIED
MIN_THREE_SOURCE_CHAPTER_GATE = PASS if N >= 3 else FAIL
CHAPTER_TRANSACTION = CLOSED only if all other Gates pass
```

- 即使已寫8,000、10,000或15,000字，若**只可證明完成1或2章來源**，則`MIN_THREE=FAIL`、`CHAPTER_TRANSACTION=PARTIAL`。標`RETRO_DENSITY_REPAIR_REQUIRED`，擴寫/重構自然後續，不能照舊發布後轉下章；不可為符合數值改動真實因果或省略重要對話。
- 完整來源章的任何功能可採合法`INTEGRATED`、`WORLD_OFFSCREEN_DONE`、`SOURCE_RULE_ONLY_CONSUMED`或逐功能驗證VOID；`DEFERRED`、`READY`、`SOURCE_CAPTURED`、`TOUCHED`、`REBUILD_PENDING`等永遠不計入3章。**已關閉來源章產生的遠期新子事件可仍為OPEN，但其源章當下義務必真的完成。**
- 如有不可立即修復的章節容量不足，保留既有正文且標**不合格／需回修**，不得單憑工作檔重寫其真實正文；後續需按原文、台帳、既定時間及角色身份執行最小有效回修，不能把章號重複創一份。**不准在修復前宣稱新Gate PASS**。

## 7. 回報：逐章告訴使用者原著跟《晨曦》怎麼不同

每次正式交付不只給「第X章完成」，而是提供：
- **原著A章**實際有哪些獨立人物/事件、錢貨/技能/任務原結果；
- **《晨曦》第Y章**如何保留、重算或重建，哪個事件真的結束；有何因果證據，誰現在持有/知道；
- **原著B、C章**同樣逐章比較；確認已消耗的3個原著章號，而不是`涵蓋A～C`；
- 被延後/未消耗的原著E與明確下一觸發、最晚期限；
- **每個VOID的八欄公開**，若沒有則明確說沒有；
- 本章正文長度、當章實際3章核銷數、未結責任、GitHub Commit與正典正文連結。
**最終回報不能把歷史研究檔、草稿、改寫提案說成正式正文**。

## 8. 舊章與本線下一章：立即重驗，不靠舊PASS

- 使用者在正式CH118後新增此**最低3章**硬規：CH116〈十萬的鑰匙〉、CH117〈門開了，戰線還在〉、CH118〈寒冬之前〉先按本規則逐E RETRO。舊POSTWRITE的`PASS_FOR_WRITTEN_EVENTS_WITH_EXPLICIT_RESIDUALS`只能表示當時寫到的事件有核，**不是`MIN_THREE_SOURCE_CHAPTER_GATE=PASS`**。
- **歷史字元與來源事件粗略對照（待RETRO嚴格確認）**：CH116約5,538字元，主處理原著CH279～280購卡；CH117約6,033字元，主處理CH280～281開門及詢價；CH118約9,605字元，主處理CH281先遣/寒冬，觸及CH282/283部分。不得將「觸及多章」當作三章完整消耗；精確缺口以新增RETRO逐E證據為準。
- **CH119不得沿用舊PREWRITE**：先核主分支仍以〈寒冬之前〉為唯一CH118正典；研究CH282～285的**完整原文**，先設合法可關閉至少3個來源章的真實事件計畫（例如把CH282/283/284的殘留完整接起，還需依條件確認能否真閉環，不能僅因列了3章就宣布PASS）；補4萬庇護、人工中繼、洪定會員借貸、工坊/坐騎與居民俘虜的自主行動；直到場景合法、角色知情有據才寫。
- `HISTORICAL_DENSITY_RETRO_REQUIRED=TRUE`；是否回修正式CH116～118，必依完整事件責任及下游正典連續性**真正執行**並再提交，不能只把RETRO報告稱為完成修稿。**本Gate先修制度及審計，不自動重寫三章正文。**
