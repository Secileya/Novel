# VOID_WITH_CAUSE功能殘留與角色推理硬門檻

> 狀態：**ACTIVE / REQUIRED / PERMANENT**  
> 建立：2026-09-30  
> 適用：所有原著事件捕捉、SOURCE_NODE、acceptance matrix、active queue、PREWRITE／POSTWRITE、歷史回修與120章後直到原著終章的全部正式改寫。  
> 優先級：本檔補強並約束 `06_SOURCE_NODE雙向稽核與證據邊界.md`、`07_原著事件消耗與章節內容密度規則.md`、`08_原著事件捕捉母表逐事件驗收硬流程.md`。若舊 disposition 與本檔衝突，以本檔重新稽核。

---

## 一、核心問題

過去曾發生以下錯誤：

`沈雲的原始理由不存在 → 整個事件 VOID_WITH_CAUSE → 人物／資產／制度／經濟／關係／下游功能一起消失`

這是錯誤流程。

固定式：

`ORIGINAL_CAUSE_INVALID != EVENT_FUNCTION_INVALID`

`PROTAGONIST_CHANGED != WORLD_FUNCTION_DISAPPEARS`

`VOID_WITH_CAUSE_MUST_BE_FUNCTION_SCOPED = TRUE`

只有**確實失效的那一個行動／功能**可以VOID。其他仍成立的功能必須重建、延後、轉成世界背景或由Franiya自己的因果接手。

---

## 二、任何VOID前必做八格分解

在標記 `VOID_WITH_CAUSE` 前，必須逐項回答：

1. `ORIGINAL_ACTION`：原著角色實際做了什麼？
2. `ORIGINAL_CAUSE`：原著角色為什麼這樣做？
3. `SCENE_FUNCTION`：場景本身承擔什麼作用？
4. `ASSET_ECONOMIC_FUNCTION`：金錢、物品、產業、資格、物流或所有權發生什麼變化？
5. `CHARACTER_RELATION_FUNCTION`：人物登場、關係、照顧、敵意、合作、組織位置有什麼作用？
6. `WORLD_RULE_FUNCTION`：制度、市場、社會、NPC、戰區、世界規則留下什麼？
7. `DOWNSTREAM_REUSE`：後文哪些章再次依賴它？
8. `FRANIYA_SUBSTITUTE_CAUSE_CHECK`：即使沈雲的原始理由不存在，Franiya依自己的性格、能力、經歷、資源、關係與當前利益，是否仍會自然做出相同／相近功能的行動？

第8格不得省略。

如果第8格為YES，原事件不得整體VOID，必須使用 `INTEGRATED / REBUILD_REQUIRED / DEFERRED_WITH_TRIGGER / WORLD_BACKGROUND_LOCKED` 中的適當組合。

---

## 三、Franiya替代因果檢查

判斷事件是否對Franiya仍成立時，必須檢查她本人，而不是只問「沈雲的前世記憶還在不在」。

至少檢查：

- 極高觀察力與模式辨識能力；
- 漫長跨世界閱歷與高階事件經驗；
- 曾有會長／組織管理與資源配置經驗；
- 頂尖商業、談判、風險與長期價值判斷能力；
- 對契約、所有權、成本、時間窗口與機會成本的敏感度；
- 已建立的人際關係與NPC關係；
- 已合法取得的爵位、官職、折扣、服務網、物流與資本；
- 當前實際任務、商業線、資產線與長期利益。

禁止：

`NO_SHEN_YUN_PREMEMORY => NO_ACTION`

除非該事件**客觀上只能依靠沈雲獨有且不可替代的未來情報**才能成立。

---

## 四、經濟鏈硬門檻

任何涉及收入、服務、資本、產業與市場的事件，必須建立完整經濟鏈：

`REVENUE_SOURCE → CASHFLOW → AVAILABLE_CAPITAL → INVESTMENT_DECISION → ASSET_CUSTODY → OPERATING_STRUCTURE → TAX / MARKET CONSEQUENCE → DOWNSTREAM_REUSE`

### 禁止斷鏈

若正文已建立世界級高需求服務並持續收費，例如月神石服務，就不得只記「賺錢」而讓巨額現金長期無用途。

PREWRITE必須問：

- 目前累積現金與待結算收入是多少？
- 是否存在原著同窗口的投資／置產／商業擴張事件？
- Franiya是否具備理解該投資價值的能力？
- 當前是否存在時間窗口，例如貨幣兌換前免稅、主城人口尚未完全湧入、核心區資產尚未重估？
- 若不投資，角色必須有明確理由，而不是流程遺忘。

固定Gate：

`ECONOMIC_CHAIN_CONTINUITY_CHECK = PASS/FAIL`

`IDLE_CAPITAL_WITHOUT_CHARACTER_REASON = FAIL`

### 精確數字與事件功能分離

原著精確資金數字若由沈雲特定收費策略造成，可以重算；但：

`EXACT_AMOUNT_RECALCULATED != INVESTMENT_FUNCTION_VOID`

例如原著4.2億金幣可按Franiya線實際服務費與處理量重算，但「月神石收入轉為主城產業」這個功能不能因此消失。

---

## 五、關係功能硬門檻

原著人物對沈雲的照顧、投資、敵意或合作，不得只因主角更換便自動VOID。

必須問：

1. 原著關係行動的真正驅動是「沈雲本人不可替代的私人歷史」，還是某種可重建關係？
2. Franiya是否已與該人物建立等價甚至更強的信任／利益／救援／契約／共同目標？
3. 原著行動是否受世界規則限制，需要透過合法方式實現？
4. 若Franiya線條件成立，該人物應以符合自身人格的方式重新作出選擇。

例：芬里爾私下請託聖安東尼奧照顧主角，其功能是「芬里爾利用既有關係，在不違反創世神規則下替自己重視的人增加合法機會」。Franiya已與芬里爾建立深度任務／救援關係時，不得因主角不是沈雲而自動延後或刪除。

---

## 六、角色知情不是二元開關

知識矩陣禁止只使用「知道／不知道」處理所有資訊。

正式使用五級：

### `EXPLICIT_KNOWN`
- 系統、當事人、可靠文件或直接可驗證來源明示。

### `INFERRED_HIGH_CONFIDENCE`
- 角色根據多條現有線索、說話方式、命名習慣、行為、時間、關係與背景，已能高可信度判斷。
- 對角色日常決策可視為實際已知，但仍需區分「推理所得」與「對方正式承認」。

### `SUSPECTED`
- 有合理懷疑，但仍存在多個同等可能。

### `UNKNOWN`
- 缺乏足夠線索。

### `AUTHOR_READER_ONLY`
- 只有作者層／讀者側知道，角色沒有合法取得路徑。

固定式：

`NO_EXPLICIT_REVEAL != CHARACTER_CANNOT_INFER`

---

## 七、CHARACTER_INFERENCE_CHECK

每次PREWRITE／POSTWRITE若涉及身份、關係、秘密或玩家ID，必須問：

- 名稱是否具有明顯個人命名痕跡？
- 對方是否用只有熟人才自然使用的語氣？
- 對方是否知道只有特定熟人才應知道的資訊？
- 時間、地點、組織、操作風格、戰鬥習慣是否高度吻合？
- Franiya是否已有足夠私人互動樣本可做比對？
- 以Franiya的觀察力，繼續寫成完全UNKNOWN是否反而構成降智？

若答案高度集中，至少升為 `INFERRED_HIGH_CONFIDENCE`。

禁止為保護「知情邊界」而反向製造人物失智。

`KNOWLEDGE_BOUNDARY_IS_NOT_ANTI_INFERENCE = TRUE`

---

## 八、VOID_WITH_CAUSE允許條件

只有同時滿足以下條件，整個事件功能才可完整VOID：

1. 原始前提已確定不存在；
2. Franiya沒有等價／替代動機；
3. 世界沒有獨立發生理由；
4. 人物／資產／制度／規則沒有殘留功能；
5. 後文沒有任何依賴；
6. 不會因此讓既有長線失去合理用途；
7. 不會因此讓角色的已建立能力、關係或資源失效；
8. 已在acceptance matrix逐功能寫明為何全部失效。

任一不滿足：

`WHOLE_EVENT_VOID = FORBIDDEN`

必須拆分。

---

## 九、既有VOID回溯稽核

本規則建立後，所有已處理來源窗中的 `VOID_WITH_CAUSE` 都不是自動永久有效。

建立：

`RETRO_VOID_FUNCTION_RESIDUE_AUDIT_REQUIRED = TRUE`

至少在下一正式章PREWRITE前，對已進入當前正式進度的所有VOID重新掃描：

- 是否錯刪資產／經濟功能；
- 是否錯刪人物／關係功能；
- 是否錯刪世界背景；
- 是否忽略Franiya自身能力提供的替代因果；
- 是否使後續事件失去來源。

發現一項即建立 `RETRO_REPAIR_REQUIRED`，先修再放行新章。

---

## 十、目前已確認的回修案例

### 原著第102章｜月神石收入→購置產業
- 沈雲的差別收費、8000／2000人為配額可局部作廢／重算。
- 月神石服務帶來巨額現金流：保留並按Franiya線實際帳本重算。
- 主城置產與資本化功能：不得VOID，必須重建。
- 商鋪、住宅、NPC僱員、未來拍賣／商業節點與稅制：依實際資產逐步延伸。

### 原著第106章｜芬里爾私下請託聖安東尼奧
- 不屬沈雲前世記憶專屬行動。
- Franiya已與芬里爾建立深度任務／救援／信任因果。
- 應在第56章讀者側重建；Franiya本人維持不知情。

### 簡雨朧／唐曉煙遊戲身份
- 不再用「沒有人直接明說」永久鎖UNKNOWN。
- 依命名、熟人語氣、既有私交、時間與行為線索執行 `CHARACTER_INFERENCE_CHECK`。
- 已達高可信度者升為 `INFERRED_HIGH_CONFIDENCE`，但不自動獲得其完整家庭、組織、裝備與私人任務情報。

---

## 十一、PREWRITE新增Gate

每章正式PREWRITE必須多列：

- `VOID_FUNCTION_RESIDUE_CHECK = PASS/FAIL`
- `FRANIYA_SUBSTITUTE_CAUSE_CHECK = PASS/FAIL`
- `CHARACTER_INFERENCE_CHECK = PASS/FAIL`
- `ECONOMIC_CHAIN_CONTINUITY_CHECK = PASS/FAIL`（涉及經濟事件時）
- `RELATIONSHIP_FUNCTION_CONTINUITY_CHECK = PASS/FAIL`（涉及人物關係時）

任一適用項FAIL：

`PREWRITE_GATE = BLOCKED`

先修因果，不得用VOID繞過。
