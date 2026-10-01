# 原著 SOURCE 閱讀路由與新對話執行交接

> 建立日期：2026-10-01  
> 性質：`SOURCE_HANDOFF / READING_ROUTER / NEW_CHAT_BOOTSTRAP / MANDATORY`  
> 適用專案：`網遊：重生就是最大的BUG（芙蘭妮雅改寫版）`  
> 目的：讓完全沒有前文的新對話，也能正確理解 `05_原著參考` 中不同檔案的用途、權威層級、閱讀順序與 Master Set 更新方式，不再靠舊對話記憶猜檔案誰新誰舊。

---

# 一、新對話先做什麼

如果你的任務是「接手芙蘭原文事件／原著事件捕捉／Master Set／查某章原著事件」，**先不要逐個翻整個資料夾。**

固定啟動順序：

1. 讀 `00A_原著事件捕捉與反向歸屬流程.md`
   - 了解原著捕捉的五 Pass、反向歸屬、SOURCE_EXPLICIT／DERIVED／UNSTATED、30章閉環等基本方法。
2. 讀本檔 `00C_原著SOURCE閱讀路由與新對話執行交接.md`
   - 了解不同檔案層級與現行入口。
3. 查目標章所在的 **SOURCE_CHAPTER_EVENT_MASTER_SET**。
   - 目前已建立第一個正式 Master Set：
     - `45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`
4. 只有 Master Set 顯示爭議、RETRO、SOURCE_UNSTATED、高風險因果或需要追歷史判定時，才往下鑽舊檔。
5. 若要新增／修正原著事實，最終仍必須回到第一手原著 TXT。

正常查一章的預設路由應是：

`第一手原著TXT → 對應Master Set → 有爭議才下鑽SOURCE_NODE／RETRO／歷史檔`

不是：

`母抓取 → 反掃 → Acceptance → LIVE → RETRO → SOURCE_NODE → 自己猜誰最新`

---

# 二、第一手權威與最重要原則

第一手權威固定為：

`05_原著參考/网游：重生就是最大的BUG - 刘巴库.txt`

既有母抓取、反向掃描、Acceptance、LIVE、RETRO、SOURCE_NODE、Master Set 都是研究／收斂層，**不能取代第一手原文。**

但日常查詢時，不要求每次都重新從 TXT 從零研究。Master Set 的存在目的，就是把已完成的第一手核對、反掃、回證與修正收斂成現行入口。

固定區分：

`SOURCE真相` ≠ `研究歷史` ≠ `Franiya改寫線現況`

- SOURCE真相：原著客觀發生了什麼。
- 研究歷史：以前哪些檔曾漏、曾判錯、後來如何修正。
- Franiya改寫線現況：原著事件在本線目前是整合、延後、重建、作廢或等待觸發。

Master Set 要把這三者分欄／分層，不得混成一句摘要。

---

# 三、05_原著參考裡的檔案其實分成不同用途

## A｜母抓取檔 SOURCE_CAPTURE

例：

- `04_原著事件捕捉_061-090.md`
- `05_原著事件捕捉_091-120.md`
- `06_原著事件捕捉_121-150.md`

用途：

- 按章保存原著流程；
- 人物出場與關係；
- 任務、技能、裝備、數值；
- 世界規則；
- 知情狀態；
- 公開資訊與後續鉤子。

定位：**基礎資料層，不是現行最終真值入口。**

母抓取可能漏掉跨章來源、後文回證或量化結果，所以後面還需要反向掃描。

---

## B｜反向掃描／交叉稽核

例：

- `10_原著事件捕捉反向稽核_091-120.md`
- `10A_原著事件捕捉二次反向歸屬掃描_091-120.md`
- 其他二次／三次／時間序交叉稽核。

用途：

- 回頭抓母抓取漏掉的來源；
- 追物品／技能／任務的後續第一次使用；
- 反推持有人、掉落池、資產鏈；
- 補數值；
- 把人物推測與客觀事實拆開；
- 抓後文對前文的量化回證。

典型案例：原著第116章【踢擊】完成度92%／額外+92%傷害，就是這一層已抓到的重要量化結果。

定位：**補母抓取的證據層。**

它本身不等於 Acceptance，也不等於已被改寫線處理。

---

## C｜Acceptance

例：

- `28_SOURCE_CAPTURE_ACCEPTANCE_091-120.md`
- `41_SOURCE_CAPTURE_ACCEPTANCE_121-150.md`

用途：

回答：

> 「這一章哪些 SOURCE 事件已被列入正式驗收／disposition？」

它不是原著正文摘要，也不是完整 SOURCE 事件全集。

重要教訓：

原著第116章【踢擊】92%事件在反掃中存在，但舊 Acceptance 沒收入，因此**不能再用 Acceptance 反推某章 SOURCE 事件已完整。**

固定：

`ACCEPTANCE != SOURCE_EVENT_MASTER`

`ACCEPTANCE_MISSING_EVENT != SOURCE_EVENT_NONEXISTENT`

---

## D｜SOURCE_NODE

用途：只處理某一條高風險、容易誤接的局部因果。

例如：

- 第68章同章只搬了【貪狼之爪】，卻漏掉源義清／國際異能線；
- 月神石交付、傳送珠、定位傳送機等保管／使用邊界；
- 某件高價值資產的來源、交付、首次使用與下游回收。

SOURCE_NODE 不是整章摘要，也不是整段 Master Set。

只有碰到：

- 保管鏈高風險；
- 知情邊界高風險；
- 中間步驟有 SOURCE_UNSTATED；
- 正式正文可能已與SOURCE衝突；
- 需要完整雙向稽核；

才需要下鑽 SOURCE_NODE。

---

## E｜SOURCE LIVE / LIVE REBUILD

用途：表示某個正式施工分支**當下採用的SOURCE狀態**。

LIVE 可以覆蓋較早 Acceptance，尤其當正式正文、Active Queue、最新修正已經向前走時。

但 LIVE 也不是永遠正確。

第116章案例已證明：舊 LIVE 曾把相關章標為近似完整消耗，但後來 RETRO 證明仍漏【踢擊】92%。

所以：

`LIVE = CURRENT_BRANCH_STATE_AT_THAT_TIME`

不是：

`LIVE = ETERNAL_SOURCE_TRUTH`

Master Set 建立時，要吸收 LIVE 的有效現況，但也要允許最新 RETRO 修正它。

---

## F｜RETRO

用途：

> 「以前漏了／判錯了，現在回頭修。」

典型：

`44_SOURCE_RETRO_116_踢擊完成度與反向掃描完整性.md`

這個 RETRO 的意義不是重新寫一份第116章摘要，而是：

1. 指出反掃其實早有【踢擊】92%；
2. 指出 Acceptance／LIVE 沒接到；
3. 重新打開該章 residual；
4. 確立 Franiya線需要在第一個合法主身份【踢擊】窗口落實100%完成度規則；
5. 推動建立 Master Set，避免以後再靠 Acceptance＋LIVE互相驗證。

RETRO 是**修正來源／歷史證據**。修正完成後，現行結論要收斂回 Master Set，而不是要求未來每次都先讀 RETRO。

---

## G｜SOURCE_CHAPTER_EVENT_MASTER_SET

這是未來的**現行第一閱讀入口**。

第一個正式實作：

`45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`

其建立公式：

`MASTER_SET`
`= FIRST_HAND_TXT`
`∪ SOURCE_CAPTURE`
`∪ REVERSE_SCAN`
`∪ SECOND_PASS`
`∪ THIRD_CROSS_AUDIT`
`∪ FIRST_HAND_PATCHES`
`∪ LATEST_SOURCE_RETRO`

Master Set 不是再增加一層摘要，而是把前面所有證據層**重新收斂成事件帳本**。

---

# 四、權威與覆蓋關係

遇到衝突時，先分清是在問「原著事實」還是「Franiya改寫線現況」。

## 4.1 原著事實的權威

優先順序：

1. 第一手原著 TXT 的直接證據；
2. 經反向掃描／交叉稽核／最新 RETRO 驗證後的SOURCE結論；
3. Master Set 現行收斂；
4. 舊母抓取、舊反掃、Acceptance、LIVE 等歷史檔。

注意：Master Set 是**日常第一入口**，但不是高於第一手TXT的來源。

若 Master Set 與重新核對的第一手TXT衝突，必須修 Master Set。

## 4.2 Franiya改寫線現況的權威

要綜合：

- 最新正式正文；
- Active Queue；
- Current State；
- 有效 LIVE；
- 最新 RETRO；
- Master Set disposition。

舊 Acceptance／舊 LIVE 可以留下歷史，但不能因檔名或編號較大／較小就自動決定勝負。

最終應把現行結果收斂回 Master Set。

---

# 五、正常查某一章，怎麼做

假設要查原著第116章。

## Step 1｜直接看對應 Master Set

目前查：

`45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`

找到第116章事件列，例如：

- `CH116-E01`
- `CH116-E02`
- `CH116-E03`【踢擊】92%量化回證
- 其他同章事件。

先回答：

- 這章完整有哪些事件；
- 哪些是 SOURCE_EXPLICIT；
- 哪些客觀結果必須保留；
- 哪些 WORLD_BACKGROUND_LOCKED；
- 哪些 DEFERRED_WITH_CAUSE；
- 哪些需要未來觸發。

## Step 2｜只有有爭議才下鑽

若要問「為什麼踢擊以前漏了」，才讀：

- `44_SOURCE_RETRO_116_踢擊完成度與反向掃描完整性.md`
- 舊 Acceptance；
- 舊 LIVE；
- `10A_...二次反向歸屬掃描...`

如果只是問「第116章目前正確SOURCE結果是什麼」，不需要從這些歷史檔重新拼一次。

## Step 3｜若要修改SOURCE結論，回TXT

任何新增、否定或改變SOURCE層級的修改，必須回第一手TXT，至少讀：

- 當章完整上下文；
- 前後相鄰章；
- 必要的全文關鍵詞回查；
- 後文第一次再利用。

然後才更新 Master Set。

---

# 六、Master Set 每個事件應怎麼記

未來事件帳本至少應能回答以下內容。

建議欄位：

`EVENT_ID`
`SOURCE_CHAPTER`
`SOURCE_IN_WORLD_ORDER`
`NARRATIVE_MODE`
`ORIGINAL_EVENT`
`OBJECTIVE_RESULT`
`NUMERIC_FACTS`
`ASSET_CUSTODY`
`KNOWLEDGE_FLOW`
`DOWNSTREAM_EVIDENCE`
`SOURCE_CLASS`
`ACCEPTANCE_STATUS`
`LIVE_STATUS`
`LATEST_RETRO`
`FRANIYA_MAPPING`
`DISPOSITION`
`TRIGGER`
`LATEST_DEADLINE`
`CONFLICT_NOTE`
`LAST_UPDATED_FROM`

不要求每個事件都用表格；可以用可讀性更高的Markdown事件塊。但這些問題不能丟失。

---

# 七、EVENT_ID規則

每個獨立事件使用穩定ID：

`CH<原著章號>-E<序號>`

例如：

`CH116-E03｜【踢擊】92%量化回證`

一旦建立，不要因為後來第五輪、第六輪又找到新證據，就另外建立「新版本踢擊事件」。

正確：

`新證據 → 更新既有 EVENT_ID → 更新來源／回證／disposition`

錯誤：

`第四輪踢擊事件 → 第五輪踢擊事件 → RETRO踢擊事件 → 新LIVE踢擊事件`

研究檔可以新增，但**事件本體只有一個現行帳本ID。**

---

# 八、SOURCE分類

至少保留：

### `SOURCE_EXPLICIT`
原文直接明示。

### `SOURCE_DERIVED`
沒有單句直接點名，但多項原文明示事實可邏輯證明或縮到必然集合。

例如職業＋掉落總數＋後續清點，可以把「完全未知」縮成法師池／戰士池。

### `SOURCE_UNSTATED`
只有完成：

1. 當章完整回讀；
2. 前後章；
3. 全文搜尋；
4. 跨章數量／職業／掉落／交易／後續清點反推；

仍不能再縮小，才可以標。

必要時另外保留：

- `REASONABLE_INFERENCE`
- `ADAPTATION_OPTIONAL_BRIDGE`

但不能拿合理推論冒充 SOURCE_EXPLICIT／DERIVED。

---

# 九、Disposition怎麼理解

現行常用：

### `INTEGRATED`
本線已合法承接該客觀結果。

### `PRESERVE_BY_DEFAULT`
原著已有明確客觀結果，除非本線有明確衝突證據，否則預設保留。

### `WORLD_BACKGROUND_LOCKED`
世界規則、角色背景、制度等不能因主角換人自行消失。

### `DEFERRED_WITH_TRIGGER`
目前不必在原節點重演，但功能不能消失，已有未來觸發點。

### `DEFERRED_WITH_CAUSE`
原著客觀結果需要保留，但Franiya線有合法原因不能在原節點落地。

### `REBUILD_REQUIRED`
原著功能要保留，但依賴沈雲私人前世／關係／選擇，必須重建本線因果。

### `VOID_WITH_CAUSE`
只有當事件確實依賴已不存在的沈雲私人因果，才可作廢。世界客觀功能若仍存在，需另列。

### `OPEN_SOURCE_UNSTATED`
SOURCE本身仍沒有足夠證據完成命名／逐件配對。

任何事件沒有合法 disposition，該章不得被宣告 `FULLY_CONSUMED`。

---

# 十、原著數值與Franiya映射必須分開

禁止把Franiya線的更高結果覆寫原著事實。

第116章固定案例：

原著：

- 沈雲自由模式使用【踢擊】；
- 系統完成度92%；
- 額外+92%傷害。

Franiya映射：

- 這類「本人可控執行品質＋系統有明確上限」的項目，合法執行時取系統允許上限；
- 因此預期100%完成度／+100%完成度傷害；
- 但必須等合法身份、裝備、技能與觸發窗口成立。

所以 Master Set 應同時保留：

`ORIGINAL_RESULT = 92% / +92%`

`FRANIYA_MAPPING = SYSTEM_ALLOWED_MAXIMUM`

而不是把原著事件改寫成100%。

---

# 十一、Master Set怎麼更新

未來若又發現漏項：

## 正確流程

1. 回第一手TXT核對；
2. 確認是新事件還是既有EVENT_ID的新證據；
3. 必要時建立／更新RETRO或SOURCE_NODE，保存「錯誤怎麼發生」的證據鏈；
4. 更新對應Master Set EVENT；
5. 更新 source class／後文回證／disposition／trigger／deadline；
6. 若影響改寫線，再同步 Active Queue／Current State／正式修復責任；
7. commit後，以Master Set的新狀態作為日常第一入口。

## 不再建議的流程

不要每找到一批漏項就永久新增：

- 第四輪完整掃描；
- 第五輪完整掃描；
- 第六輪完整掃描；

然後要求下一個對話自己猜哪輪最終有效。

研究工作檔可以存在，但驗證完成後必須**收斂回Master Set**。

---

# 十二、何時建立SOURCE_NODE，何時只更新Master Set

只更新 Master Set：

- 新找到普通數值；
- 新找到同事件後文回證；
- 母抓取漏了一個明確小事件；
- disposition單純需要更新；
- 沒有複雜保管／知情／正式衝突。

另外建 SOURCE_NODE／RETRO：

- 物權／保管鏈不清；
- 重要技能／裝備來源跨很多章；
- 正式正文已可能寫錯；
- Acceptance／LIVE曾錯誤宣告完整；
- 高價值世界線事件漏失；
- SOURCE_UNSTATED中間邊會影響正式正文；
- 需要雙向稽核才能確定。

完成後仍要把最終結論回寫Master Set。

---

# 十三、時間序規則

原著章號不等於世界內時間。

Master Set 必須先有該區間的世界內時間骨架，並在事件需要時保留：

- `SOURCE_IN_WORLD_ORDER`
- `NARRATIVE_MODE`
- PRESENT
- FLASHBACK
- PARALLEL
- LATE_DISCOVERED_HISTORY
- MEMORY_EXPOSITION

研究今天才發現的舊事件，不等於今天在Franiya線才發生。

固定：

`RESEARCH_DISCOVERY_TIME != SOURCE_EVENT_TIME != ADAPTATION_EVENT_TIME`

---

# 十四、目前SOURCE45代表什麼

`45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md` 是本架構第一個正式實作。

它已完成的核心功能：

- 100～150世界內時間骨架；
- 按章拆 EVENT_ID；
- SOURCE分類；
- 客觀事件與數值；
- disposition；
- 把最新RETRO收斂回現行入口；
- 舊Acceptance／LIVE降為歷史證據。

它不是完美終稿模板，但應作為後續 Master Set 的母體。

未來100～240完整Master Set整理時，應在SOURCE45基礎上補強：

- Acceptance歷史狀態；
- LIVE歷史狀態；
- 最新RETRO來源；
- 後文回證來源；
- 最終現行狀態來源；

讓每個EVENT不只知道「現在是什麼」，也能追出「為什麼變成現在這樣」。

---

# 十五、給新對話的最小執行清單

如果你剛接手這個專案，只要先做到以下即可開始工作：

- [ ] 已讀 `00A_原著事件捕捉與反向歸屬流程.md`
- [ ] 已讀本 `00C`
- [ ] 已定位目標章對應 Master Set
- [ ] 已確認該EVENT的 source class
- [ ] 已確認 disposition
- [ ] 已確認是否存在 RETRO／SOURCE_NODE 標記
- [ ] 若修改SOURCE，已回第一手TXT
- [ ] 若新增證據，已更新既有EVENT_ID或建立新EVENT_ID
- [ ] 若歷史判定有錯，已保留RETRO／provenance，而不是偷偷抹掉舊證據
- [ ] 最終現行結果已收斂回Master Set

只有需要寫正式正文時，才再進 PREWRITE／能力Gate／Active Queue／Current State 等施工流程。

---

# 十六、一句話交接

**原著TXT是最高證據；Master Set是日常現行入口；SOURCE_NODE／RETRO負責特殊爭議；母抓取、反掃、Acceptance、LIVE保留作證據與歷史，不再要求新對話靠多檔考古拼出現在的真相。**

固定：

`FIRST_READ_ENTRY = MASTER_SET`

`FIRST_HAND_TXT = HIGHEST_SOURCE_AUTHORITY`

`HISTORICAL_FILES = PROVENANCE_NOT_PRIMARY_ENTRY`

`NEW_EVIDENCE_MUST_CONVERGE_BACK_TO_MASTER_SET = TRUE`

`ACCEPTANCE_OR_LIVE_ALONE_CANNOT_PROVE_FULL_SOURCE_CLOSURE = TRUE`
