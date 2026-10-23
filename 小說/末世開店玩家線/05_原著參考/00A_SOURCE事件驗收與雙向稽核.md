# 《晨曦》原著 SOURCE 事件驗收與雙向稽核 v1.0

> 2026-10-23起有效；依《重生就是最大的BUG》研究流程改造，專供《末世開店玩家線》使用。  
> 第一手原著：本目錄「末日求生：我有一家商店 - 山rain.txt」（現行交接記錄為完結538章）。  
> 啟動入口：07_工作流程/00_雙軌原著考據與因果續寫總Gate.md；正式責任表：04_連續性與索引/09_原著事件差分與塞希莉雅因果帳.md。

## 1. 原著不能取代本線已成立正文

研究原著是為了辨認「世界原本有什麼機制與事件功能」「後文依賴什麼」，不是把楚河的行動、道具、收益、身份、關係、店務助手、事件成敗自動移植給塞希莉雅。每次 SOURCE 判定之前必做 REWRITE_CANON_REVERSE_LOOKUP：先查本線已取得或已完成的情況，再談原著同功能如何在本線成立。

主角替換、商店機制、晨曦發展、槍擊後效、跨區貿易、燦金生命體，以及未來確立的隕石與法月懷時間鎖，都會使部分原著前提和結果變化；變化要寫成具體因果，而不是給出「塞希莉雅太強所以略過」的空話。

## 2. SOURCE_CAPTURE 母表：每一件可辨識事件都有去向

首次正式準備進入新的原著連續窗口時，逐章、逐小節整理母表。最低事件單位不是「這三章已讀」，而是：
- 行動與任務節點、衝突與解決；
- 角色首次有效登場、人格與關係形成；
- 資產、貨款、獎勵、物權、裝備、庫存與實際交付；
- 系統硬機制、資格、任務、等級與限制；
- 聚居地、玩家、普通人、勢力及經濟的獨立動態；
- 不在主角鏡頭內發生、但後續有客觀後果的事件；
- 本次未立即顯現、後續須回收的資訊或世界鉤子。

每個 SOURCE 事件應拆成 SCENE / ASSET / CHARACTER / INFORMATION / WORLD / RULE / LONG_TERM 等功能，逐功能給去向。禁止「原著某事件未再上演」連帶把事件中的可重用資產、制度與人物從世界中消除。

去向最少分：
- INTEGRATED：本線正式落地且同步；
- WORLD_BACKGROUND_LOCKED：只在世界／其他人物線持續存在，已記知情與觸發；
- SOURCE_RULE_ONLY：客觀原著機制可採用，但不重演原事件；
- DEFERRED_WITH_TRIGGER：已知未到窗口，需記重檢時機；
- REBUILD_REQUIRED：本線需以新起因重建同功能；
- VOID_WITH_CAUSE：只作廢證明失效的局部功能；
- SOURCE_PENDING：研究尚未確認，禁止宣稱原著完成分類；
- READY_NOW：有證據、已達本線合法執行窗口、且完成下列六項重要節點稽核，等待正文落地。

即使目前章節未打算展示的原著事件，也要有合法去向，不能只有「研究檔存在」。但不得為了整齊假造來源對照結果；未讀或未閉環就標未完成。

## 3. SOURCE_NODE 雙向稽核

重要 SOURCE_NODE：後文仍會使用的物品、貨物、交易合同、關鍵任務、人物關係、情報、軍械與技術、通信途徑、特殊戰力、系統機制、權限、地點和長線事件。單純有關鍵字匹配不算完成。

Pass A｜LOCAL_SEQUENCE
- 連續讀當地前後文直到明確起因、動作順序、當時持有人／執行人、知情者、結果。
- 對資產拆「來源→取得→持有→加工／啟動→提供資訊／出售→交付→付款／結算→再次使用」，原文未寫不可補原文。
- 對人物拆「原有生活→進場理由→親歷／獲告知→選擇→關係結果」。

Pass B｜DOWNSTREAM_REUSE
- 向後搜尋第一次實際再用、下一硬依賴、遠期更改的狀態；
- 再反向追查資產保管、原著時間錨與前置取得／知情；
- 找出最晚安全窗口，標出本線若改動此節點會連鎖影響哪些後續。

六項驗收：
1. LOCAL_SEQUENCE_PASS
2. CUSTODY_CHAIN_PASS
3. KNOWLEDGE_BOUNDARY_PASS
4. DOWNSTREAM_REUSE_PASS
5. UNSTATED_EDGE_MARKED
6. FORMAL_CONFLICT_CHECK_PASS

只有六項都PASS可標 SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE=PASS。若沒有適用資產，CUSTODY_CHAIN_PASS須明示 N/A 與理由，而非假裝已查保管鏈。若不能向後查清，標 INCOMPLETE／RESUME_CURSOR，不送READY_NOW。

## 4. 來源證據四分欄

每一條 SOURCE 斷言只能是：
- SOURCE_EXPLICIT：原著連續正文明示；
- SOURCE_UNSTATED：原著沒寫，不得補出原著台詞、操作、交接或承諾；
- REASONABLE_INFERENCE：有證據但仍是推測；
- ADAPTATION_OPTIONAL_BRIDGE：為本線新因果採取的最小相容橋接，不說成原著原本有。

例如原著某物在後期由一人持有，但中間沒寫交接：保管鏈標 SOURCE_UNSTATED。若《晨曦》必須使交接成立，需由本線PREWRITE建立合乎人物／物流／交易條件的橋接，且只補必要的最短過程。

## 5. 完整差分不只對主角：四層回查

每事件給出：
1. ORIGINAL_FACTS：原著第一手序列與客觀結果。
2. EXISTING_REWRITE_CANON：本線已發生具體事實（附正文章與交接記錄）；不得只查本章。
3. DIVERGENCE_CAUSE：塞希莉雅實際行動／拒絕／交易、晨曦自主選擇或其他世界條件如何改變前提。
4. CONSEQUENCE_LEDGER：誰獲益或受損、誰取得或失去物、誰知道什麼、哪些原著事件不再按原樣發生、什麼後續功能要以新因果承接。

本線重算結果可與原著客觀結果不同，**但必須寫出造成不同的本線既成因果或可檢驗世界條件**。不可把原著客觀事實直接篡改以匹配本線。若目前只是猜測，保持待定並不升格硬規則。

尤其注意：
- 楚河曾親手拿到／交出的物品，不會因主角替換自動變塞希莉雅或晨曦所有。
- 沒有原著同一人接觸，不代表那個聚居地、普通居民或交易需求從世界上消失。
- 塞希莉雅可直接得知資訊不代表陸延、林妙、王強、齊星宇、洪定、葉天也知道。
- 方城普通手機只限城內／近距離；玩家區域頻道不跨區；真正跨區資訊靠已成立中繼／使者／正式聯絡。
- 已經用「正常價格」成交的物資不得重寫成免費恩賜或重新按原著劇本收一次費。

## 6. 事件尚未到時與截止規則

對必須保留但未觸發的功能，至少記：
- OWNER
- CURRENT_STATE / CURRENT_CUSTODY（如適用）
- EVENT_OR_ACQUISITION_WINDOW
- NEXT_RECHECK_TRIGGER
- FIRST_REQUIRED_USE_NODE
- LATEST_SAFE_DEADLINE（可用世界事件節點，不必猜章號）
- MISSED_DEADLINE_ACTION

不能因「現在鏡頭在研究基地」就判定晨曦工廠、東線防守、洪定資訊聯絡、雙星欠款或王強本部管理都暫停準備；也不能因某個日後結果被定案就提前讓角色預知。

SOURCE_READ_CURSOR ≠ SOURCE_VERIFIED_CURSOR ≠ EVENT_DISPOSITION_CURSOR ≠ 正文事件完成。

## 7. SRC 卡模板（可複製）

### SRC-EXAMPLE（正式使用時改為唯一ID）
- SOURCE_RANGE：原著起訖章／必要前後文
- SOURCE_PROGRESS：KEYWORD_LOCATED / LOCAL_CONTEXT_READ / BIDIRECTIONAL_AUDIT_COMPLETE
- SOURCE_EVIDENCE：精確原文定位
- ORIGINAL_SEQUENCE：起因→行動→結果
- ORIGINAL_OBJECTIVE_RESULT：原著客觀事實
- SOURCE_UNSTATED：未寫出的邊
- CUSTODY_CHAIN：逐步保管與權屬
- KNOWLEDGE_FLOW：人物／勢力及知情層級
- PASS_B_DOWNSTREAM：首次再用與遠期依賴
- REWRITE_CANON_MATCH：本線已完成章節與狀態
- SECILEYA_CAUSAL_DELTA：她的行動與直接影響；若非她造成，寫其他因果
- REWRITE_PROPOSED_RESULT：本線可合法承接結果，不得誤稱已發生
- EVENT_FUNCTION_DISPOSITION：逐功能狀態
- NEXT_RECHECK_TRIGGER / DEADLINE：必要時
- SIX_GATE：逐項 PASS / FAIL / N/A理由
- STATUS：SOURCE_PENDING / INCOMPLETE / READY_NOW / INTEGRATED...
- RESUME_CURSOR：若未完，下一輪實際要查的章／關鍵詞
- EVIDENCE_LIMITS：哪些只看過索引或摘要、哪些仍不得確定

## 8. 交接與驗收

研究端可獨立提交 SOURCE 卡和09帳更新，但不得修改正式正文。寫作端收到READY_NOW先核 main／正典，再ACK事件；必要時仍須親讀原著關鍵段。寫作完成後依POSTWRITE回寫結果、資產、知情、世界後果、狀態、交接與提交資訊。

若使用者只說「接手／導入方法」而尚未要求下一章，不因建立此文件就假稱本輪 SOURCE 全部完成、PREWRITE PASS 或第116章已可直接開寫。
