# SOURCE_NODE雙向稽核與證據邊界

> 狀態：ACTIVE / REQUIRED  
> 建立：2026-09-28  
> 適用：原著事件審計、SOURCE_CANON捕捉、差分研究、正式事件佇列，以及任何會被正文端使用的原文事實。  
> 核心目的：禁止「只抓事件結果」；重要事件必須追蹤局部序列、保管鏈、資訊流與後續再利用，並把原著沒寫出的邊明確留白。

---

## 一、SOURCE_NODE 的強制適用範圍

以下任一項出現，即建立或更新一個重要 `SOURCE_NODE`：

- 具名物品、裝備、技能、稱號；
- 金錢、收入、價格、產業、經濟資產；
- 排名、首殺、榜單、世界／區域獎勵；
- 官職、爵位、權限、特殊身份；
- 任務關鍵物、任務入口、唯一線索；
- 地點標記、傳送點、交通／物流工具；
- 人物關係建立、知識／情報轉移、秘密公開；
- 任何後文會再次使用、回收、升級、交易、依賴或改變長線因果的要素。

不得因某事件表面看起來只是小Boss、小交易、小道具就省略 SOURCE_NODE；是否重要由**後續再利用**決定。

---

## 二、每個重要 SOURCE_NODE 必填欄位

### 2.1 精確來源

- `SOURCE_NODE_ID`
- 原著章號／章名；
- 可回查第一手證據位置；
- 本輪讀取的連續上下文範圍。

只找到關鍵詞／搜尋片段不得算「已讀完事件」。

### 2.2 逐步動作序列

必須把動作拆開，不得只寫最後結果。至少在適用時分離：

`發現/來源 → 取得 → 持有 → 啟用/加工 → 公開 → 出售 → 交付 → 代辦服務 → 返還 → 首次使用 → 後續再使用`

原文若跳過其中一步，不能自行補齊。

### 2.3 物品／資產保管鏈（CUSTODY CHAIN）

逐段記錄：

`來源 → 誰取得 → 誰持有 → 誰啟用/加工 → 是否交付 → 交給誰 → 是否返還 → 後續誰使用`

對每一個轉移節點都標來源證據。若只知道前後狀態、原文沒有寫中間交接，標 `SOURCE_UNSTATED`。

### 2.4 資訊流／知情邊界（KNOWLEDGE FLOW）

至少回答：

- 誰知道這件事；
- 知道的是名稱、位置、機制、完整方法，還是只知道結果；
- 哪些已公開；
- 哪些只在小圈子／單一人物間；
- 出售的是**資訊、物品、服務**中的哪一種；不得合併寫成「賣月神石線」之類模糊摘要；
- 哪些資訊仍然保密；
- 哪些只是人物推測／作者旁白推測，而非系統或客觀事實。

---

## 三、證據四分欄

每一個重要斷言只能進以下一欄：

### `SOURCE_EXPLICIT`
原著明示。可直接作母本事實。

### `SOURCE_UNSTATED`
原著沒有寫出該中間步驟／說明／交付／對話／操作。  
固定附加：

`DO_NOT_NARRATIVIZE_OR_FILL = TRUE`

禁止把空白改寫成「原著其實就是這樣」。

### `REASONABLE_INFERENCE`
由前後明示證據高度支持，但原著未直接說出。必須保留「推論」身份，不能升格成 SOURCE_EXPLICIT。

### `ADAPTATION_OPTIONAL_BRIDGE`
Franiya線為使因果連續可以自行新增的橋接。它屬改寫選擇，不屬原著事實。

若正文需要跨過 `SOURCE_UNSTATED`，只能在 PREWRITE 另選**最小相容橋接**：只補足使已知前後狀態能連起來所需的最少行為，不替角色追加完整自述、額外情報、額外交易內容或未證實操作。

---

## 四、強制同輪雙向稽核

### Pass A｜LOCAL CONTEXT / 局部連續序列

必須連續閱讀事件當地上下文，直到可回答：

1. 事件怎麼開始；
2. 每一步實際動作順序；
3. 當下誰持有什麼；
4. 當下誰知道什麼；
5. 事件在哪一個明示狀態結束。

只用搜尋摘要、舊事件捕捉或單一命中句，不算 Pass A。

### Pass B｜DOWNSTREAM REUSE / 向後再利用

針對該物／技能／權限／收入／關係／資訊向後搜尋：

1. 第一次再使用在哪；
2. 第一個真正下游依賴是什麼；
3. 後面有哪些重要重複用途／升級／交易／經濟／權限／關係／情報回收；
4. 再反向檢查：這些後續是否需要原始事件中某個「取得／交付／知情」邊，而原始事件其實沒寫；
5. 找出最晚處理窗口。

### 雙 Pass 未完成

只要已開啟一個 SOURCE_NODE，本輪沒有完成 Pass A + Pass B，就必須標：

`SOURCE_NODE_AUDIT = INCOMPLETE`

並留下精確 `RESUME_CURSOR`。  
禁止用「已仔細檢查」「已完整抓取」「已閉環」描述它，也不得把節點送入 `READY_NOW`。

---

## 五、六項驗收硬門檻

每個 SOURCE_NODE 必須同時有：

- `LOCAL_SEQUENCE_PASS`
- `CUSTODY_CHAIN_PASS`
- `KNOWLEDGE_BOUNDARY_PASS`
- `DOWNSTREAM_REUSE_PASS`
- `UNSTATED_EDGE_MARKED`
- `FORMAL_CONFLICT_CHECK_PASS`

六項全部 `PASS` 才可：

- 宣稱雙向稽核完成；
- 將其衍生問題提升為正式佇列 `READY_NOW`；
- 宣稱該 SOURCE_NODE 已閉環。

任一缺失：

`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = FAIL`

### 硬門檻名稱

- `SOURCE_NODE_LOCAL_SEQUENCE_GATE`
- `SOURCE_NODE_CUSTODY_CHAIN_GATE`
- `SOURCE_NODE_KNOWLEDGE_BOUNDARY_GATE`
- `SOURCE_NODE_DOWNSTREAM_REUSE_GATE`
- `SOURCE_NODE_UNSTATED_EDGE_GATE`
- `SOURCE_NODE_FORMAL_CONFLICT_GATE`
- 總門檻：`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE`

---

## 六、研究進度三級制

只能用以下三級：

### `SOURCE_PROGRESS = KEYWORD_LOCATED`
只找到關鍵詞／搜尋片段／舊摘要。  
**不得寫成完整核對。**

### `SOURCE_PROGRESS = LOCAL_CONTEXT_READ`
已完成 Pass A 的連續局部閱讀，但尚未完成向後再利用稽核。

### `SOURCE_PROGRESS = BIDIRECTIONAL_AUDIT_COMPLETE`
Pass A + Pass B 完成，六項驗收全部 PASS。

研究進度檔、SOURCE_CANON、事件佇列與聊天回報的措辭都必須遵守此三級制。

---

## 七、FORMAL CONFLICT CHECK

雙向原文稽核結束後，必須反查：

- 正式正文；
- Current State；
- 角色知識矩陣；
- 正式事件佇列；
- 仍有效的POSTWRITE／同步差分／索引。

若正式正文把 `SOURCE_UNSTATED` 或 `REASONABLE_INFERENCE` 寫成「原著明示」或因此造成長線因果錯誤：

- 原文審計端**不得自行改正式章**；
- 六項驗收全部 PASS 後，在正式佇列建立／更新 `READY_NOW`；
- 精確寫：正文章節、原文證據、衝突邊界、最小可接受修復範圍、禁止補寫內容；
- owner=`芙蘭 信仰正文`。

若只是 Franiya 線主動增加內容，而且已明確標成 `ADAPTATION_OPTIONAL_BRIDGE`、不冒充原著事實，也不破壞長線，則不必判正文錯誤。

---

## 八、SOURCE_NODE 記錄模板

```md
### SOURCE_NODE_ID: ...
- SOURCE_PROGRESS: ...
- 原文證據: ...

#### Pass A｜局部序列
1. ...

#### Custody Chain
- ...

#### Knowledge Flow
- ...

#### Evidence Class
- SOURCE_EXPLICIT: ...
- SOURCE_UNSTATED: ...
- REASONABLE_INFERENCE: ...
- ADAPTATION_OPTIONAL_BRIDGE: ...
- DO_NOT_NARRATIVIZE_OR_FILL: TRUE/FALSE

#### Pass B｜下游再利用
- First downstream dependency: ...
- Later reuse: ...

#### Over-inference risks
- ...

#### Formal conflict check
- ...

#### Trigger / deadline / owner / state
- 觸發點: ...
- 最晚處理窗口: ...
- owner: ...
- status: ...

#### Acceptance
- LOCAL_SEQUENCE_PASS: PASS/FAIL
- CUSTODY_CHAIN_PASS: PASS/FAIL
- KNOWLEDGE_BOUNDARY_PASS: PASS/FAIL
- DOWNSTREAM_REUSE_PASS: PASS/FAIL
- UNSTATED_EDGE_MARKED: PASS/FAIL
- FORMAL_CONFLICT_CHECK_PASS: PASS/FAIL
- SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE: PASS/FAIL
```

---

## 九、禁止事項

- 禁止把「前後看起來應該如此」改寫成「原著明寫如此」。
- 禁止把物品取得和第一次使用混成同一事件。
- 禁止把持有與知道機制混成一回事。
- 禁止把出售資訊、出售物品、代辦服務寫成同一種交易。
- 禁止看到最終持有人後自行補「某人把東西遞給他並完整解釋來源」。
- 禁止只做 Pass A 就宣稱長線完整；也禁止只搜尋後文用途、不讀原事件上下文。
- 禁止為了讓正文順而抹掉 `SOURCE_UNSTATED`。

固定標記：

`SOURCE_UNSTATED_DO_NOT_NARRATIVIZE = TRUE`
`SOURCE_NODE_DOUBLE_PASS_REQUIRED = TRUE`
`READY_NOW_REQUIRES_SIX_SOURCE_GATES = TRUE`
