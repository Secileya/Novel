# 原著 SOURCE 閱讀路由與新對話執行交接

> 更新日期：2026-10-01  
> 性質：`SOURCE_HANDOFF / READING_ROUTER / NEW_CHAT_BOOTSTRAP / MANDATORY`  
> 適用專案：`網遊：重生就是最大的BUG（芙蘭妮雅改寫版）`  
> 目的：讓完全沒有前文的新對話，也能正確理解 `05_原著參考` 的檔案分工、權威層級、閱讀順序與 Master Set 更新方式，不再靠舊對話記憶猜哪份檔才是現行真值。

---

# 一、新對話固定啟動順序

如果任務是「接手芙蘭原文事件／原著事件捕捉／Master Set／查某章原著事件」，**不要先逐個翻整個資料夾。**

固定順序：

1. 讀 `00A_原著事件捕捉與反向歸屬流程.md`
   - 了解五 Pass、反向歸屬、證據層級與30章閉環。
2. 讀本檔 `00C_原著SOURCE閱讀路由與新對話執行交接.md`
   - 了解檔案角色與現行入口。
3. 依章號讀對應 **SOURCE_CHAPTER_EVENT_MASTER_SET**。
4. 只有 Master Set 顯示爭議、SOURCE_UNSTATED、高風險因果、RETRO或需要追歷史判定時，才往下鑽 SOURCE_NODE／RETRO／舊研究檔。
5. 若要新增、否定或修正原著事實，最終仍必須回第一手原著 TXT。

正常路由：

`第一手原著TXT → 對應Master Set → 有爭議才下鑽SOURCE_NODE／RETRO／歷史檔`

不是：

`母抓取 → 反掃 → Acceptance → LIVE → RETRO → SOURCE_NODE → 自己猜誰最新`

---

# 二、目前 Master Set 路由

現行已建立：

- `45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`
- `46_SOURCE_CHAPTER_EVENT_MASTER_SET_150-200.md`

查詢規則：

| 原著章號 | 日常第一入口 |
|---|---|
| CH100～149 | SOURCE45 |
| CH150 | SOURCE45／SOURCE46 的重疊邊界章；往前追100～150脈絡看45，往後追150→151與後續保管鏈看46 |
| CH151～200 | SOURCE46 |
| CH201以後 | 尚無對應Master Set時，依00A回第一手TXT＋既有母抓取／反掃／時間序研究，完成後再建立下一Master Set |

### CH150重疊邊界原則

CH150刻意存在於兩份 Master Set，不是重複錯誤。

原因：

- SOURCE45需要把100～150閉合；
- SOURCE46需要讀150→151，才能正確判定【神恩守護項鏈】不是150章永久入手，而是151章交還切爾文後再以第二環任務暫借。

固定：

`BOUNDARY_OVERLAP_IS_INTENTIONAL = TRUE`

若未來重疊章兩份 Master Set 出現真正SOURCE矛盾：

1. 回第一手TXT；
2. 讀跨章連續窗口；
3. 修正兩份Master Set對應EVENT；
4. 不允許讓兩份現行入口長期保存互斥真值。

---

# 三、第一手權威與三種不同問題

第一手最高權威固定為：

`05_原著參考/网游：重生就是最大的BUG - 刘巴库.txt`

母抓取、反掃、Acceptance、LIVE、RETRO、SOURCE_NODE、Master Set 都是研究／收斂層，**不能取代第一手原文。**

但日常查詢不要求每次從TXT重新研究。Master Set的目的，就是把已完成的第一手核對、反掃、回證與修正收斂成現行入口。

固定區分：

`SOURCE真相` ≠ `研究歷史` ≠ `Franiya改寫線現況`

- **SOURCE真相**：原著客觀發生什麼。
- **研究歷史**：以前哪份檔漏了、判錯了、後來怎麼修。
- **Franiya改寫線現況**：該原著事件目前在本線是整合、延後、重建、作廢或等待觸發。

Master Set負責把三者分開，不得混成一句模糊摘要。

---

# 四、05_原著參考裡各類檔案用途

## A｜母抓取檔 `SOURCE_CAPTURE`

例：

- `04_原著事件捕捉_061-090.md`
- `05_原著事件捕捉_091-120.md`
- `06_原著事件捕捉_121-150.md`
- `07_原著事件捕捉_151-180.md`
- `08_原著事件捕捉_181-210.md`

用途：按章保存流程、人物、任務、技能、裝備、數值、世界規則、知情狀態、公開情報與長線鉤子。

定位：**基礎資料層，不是現行最終真值入口。**

---

## B｜反向掃描／交叉稽核／時間序稽核

例：

- `09_原著事件捕捉反向稽核_121-210.md`
- `10A_原著事件捕捉二次反向歸屬掃描_091-120.md`
- `21_原著事件時間序第三輪稽核_121-180.md`
- `22_原著事件時間序第三輪稽核_181-240.md`

用途：

- 回抓母抓取漏掉的來源與數值；
- 追物品／技能／任務的第一次後續使用；
- 補持有人、掉落池、資產鏈；
- 區分角色推測與客觀事實；
- 抓原著自身矛盾；
- 修正世界內時間、回憶、平行剪輯與跨章結算。

典型：第116章【踢擊】92%／+92%就是反掃已抓到、舊Acceptance卻漏接的案例。

定位：**補強證據層。**

---

## C｜Acceptance

例：

- `28_SOURCE_CAPTURE_ACCEPTANCE_091-120.md`
- `41_SOURCE_CAPTURE_ACCEPTANCE_121-150.md`

只回答：

> 「哪些SOURCE事件被列進正式驗收／disposition？」

它不是原著正文摘要，也不是完整SOURCE全集。

固定：

`ACCEPTANCE != SOURCE_EVENT_MASTER`

`ACCEPTANCE_MISSING_EVENT != SOURCE_EVENT_NONEXISTENT`

---

## D｜SOURCE_NODE

只處理一條高風險局部因果，例如：

- 高價值物權／保管鏈；
- 技能／裝備來源跨多章；
- 知情邊界；
- 同章多事件只搬了一部分；
- 正式正文可能已與SOURCE衝突；
- SOURCE_UNSTATED中間邊會影響正式敘事。

SOURCE_NODE不是整章摘要，也不是Master Set替代品。

完成SOURCE_NODE後，**最終結論仍要回寫Master Set。**

---

## E｜SOURCE LIVE / LIVE REBUILD

表示某個正式施工分支在**那個時間點**採用的SOURCE狀態。

LIVE可覆蓋更早Acceptance，但LIVE也可能被後來RETRO修正。

固定：

`LIVE = CURRENT_BRANCH_STATE_AT_THAT_TIME`

不是：

`LIVE = ETERNAL_SOURCE_TRUTH`

---

## F｜RETRO

用途：

> 「以前漏了／判錯了，現在回頭修。」

典型：

`44_SOURCE_RETRO_116_踢擊完成度與反向掃描完整性.md`

RETRO保留錯誤如何產生、怎麼被發現、修正責任與下游影響。

修完後：

`RETRO_RESULT → UPDATE_MASTER_SET`

未來正常查事件，不應每次先讀RETRO。

---

## G｜SOURCE_CHAPTER_EVENT_MASTER_SET

這是**日常現行第一閱讀入口**。

現行：

- SOURCE45：100～150
- SOURCE46：150～200

建立公式概念：

`MASTER_SET`
`= FIRST_HAND_TXT`
`∪ SOURCE_CAPTURE`
`∪ REVERSE_SCAN`
`∪ SECOND_PASS`
`∪ THIRD_CROSS_AUDIT`
`∪ TIMELINE_AUDIT`
`∪ FIRST_HAND_PATCHES`
`∪ LATEST_SOURCE_RETRO`

Master Set不是「再多一份摘要」，而是把前面研究結果**收斂成現行事件帳本**。

---

# 五、權威與覆蓋關係

## 5.1 問原著事實時

優先邏輯：

1. 第一手TXT直接證據；
2. 經反掃／交叉稽核／RETRO驗證的結論；
3. Master Set現行收斂；
4. 舊母抓取、舊Acceptance、舊LIVE等歷史層。

Master Set是**第一閱讀入口**，不是高於TXT的證據來源。

若Master Set與重新核對的TXT衝突，修Master Set。

## 5.2 問Franiya改寫線現況時

需綜合：

- 最新正式正文；
- Active Queue；
- Current State；
- 有效LIVE；
- 最新RETRO；
- Master Set disposition。

舊Acceptance／舊LIVE可留歷史，但不能只按檔號大小決定誰贏。

---

# 六、正常查某一章怎麼做

## Step 1｜先定位Master Set

例：

- 查CH116 → SOURCE45
- 查CH176 → SOURCE46
- 查CH189 → SOURCE46

先讀該章EVENT_ID，確認：

- 完整事件集合；
- SOURCE_CLASS；
- 客觀結果；
- 數值；
- 時間位置；
- disposition；
- trigger／deadline；
- 是否有矛盾或特殊回證。

## Step 2｜只有有爭議才下鑽

例如問「CH116踢擊為什麼以前漏掉」，才讀：

- `44_SOURCE_RETRO_116_...`
- 舊Acceptance；
- 舊LIVE；
- `10A_...二次反向歸屬掃描...`

若只是問「CH116現在正確SOURCE是什麼」，SOURCE45已是第一入口。

## Step 3｜若要修改SOURCE結論，回第一手TXT

至少：

- 當章完整上下文；
- 前後相鄰章；
- 必要全文關鍵詞回查；
- 後文第一次再利用；
- 若是區間邊界，讀到真正事件停止點。

然後才更新Master Set。

---

# 七、EVENT_ID規則

穩定格式：

`CH<原著章號>-E<序號>`

例如：

`CH116-E03｜【踢擊】92%量化回證`

`CH189-E01｜【鮮血之翼】31級／30級矛盾`

找到新證據時：

`新證據 → 更新既有EVENT_ID`

不要：

`第四輪事件 → 第五輪事件 → RETRO事件 → 新LIVE事件`

研究檔可以新增，但**事件本體只有一個現行帳本ID。**

---

# 八、Master Set事件應保存什麼

建議欄位／問題集：

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

不必每條機械用表格，但以上問題不能遺失。

SOURCE45／46目前採可讀性較高的Markdown事件塊；未來發現新證據直接更新既有EVENT。

---

# 九、SOURCE分類

### `SOURCE_EXPLICIT`
原文直接明示。

### `SOURCE_DERIVED`
沒有單句直接點名，但多項原文明示事實可邏輯證明／縮到必然集合。

### `SOURCE_UNSTATED`
必須完成：

1. 當章完整回讀；
2. 前後章；
3. 全文搜尋；
4. 跨章數量／職業／掉落／交易／後續清點反推；

仍不能縮小，才可標。

必要時另保留：

- `REASONABLE_INFERENCE`
- `ADAPTATION_OPTIONAL_BRIDGE`

禁止把合理推論冒充EXPLICIT／DERIVED。

---

# 十、Disposition

### `INTEGRATED`
本線已合法承接該客觀結果。

### `PRESERVE_BY_DEFAULT`
原著客觀結果已明確，沒有衝突證據時預設保留。

### `WORLD_BACKGROUND_LOCKED`
世界規則、角色背景、制度、NPC／組織等不因主角換人自行消失。

### `DEFERRED_WITH_TRIGGER`
目前尚未落地，但已有未來觸發窗口。

### `DEFERRED_WITH_CAUSE`
客觀功能需保留，但本線有合法原因不能在原節點落地。

### `REBUILD_REQUIRED`
功能重要，但依賴沈雲私人前世／關係／選擇，需重建Franiya線因果。

### `VOID_WITH_CAUSE`
純沈雲私人因果可以合法作廢；若仍有客觀世界功能，必須另列，不可一起蒸發。

### `OPEN_SOURCE_UNSTATED`
SOURCE本身尚無足夠證據完成命名／逐件配對。

任何事件沒有合法disposition，不得用`FULLY_CONSUMED`掩蓋。

---

# 十一、原著數值與Franiya映射分開

禁止用Franiya更高結果覆寫原著事實。

固定案例CH116：

原著：

- 沈雲自由模式【踢擊】92%完成度；
- 額外+92%傷害。

Franiya：

- 本人可控執行品質＋系統有明確上限時，合法執行取系統允許上限；
- 因此預期100%／+100%；
- 但仍需合法身份、裝備、技能與觸發窗口。

所以：

`ORIGINAL_RESULT = 92% / +92%`

`FRANIYA_MAPPING = SYSTEM_ALLOWED_MAXIMUM`

兩者並存。

---

# 十二、時間序與跨章規則

原著章號不等於世界時間。

Master Set必須保留：

- `SOURCE_IN_WORLD_ORDER`
- `NARRATIVE_MODE`
- PRESENT
- FLASHBACK
- PARALLEL
- MEMORY_EXPOSITION
- LATE_DISCOVERED_HISTORY

固定：

`RESEARCH_DISCOVERY_TIME != SOURCE_EVENT_TIME != ADAPTATION_EVENT_TIME`

### SOURCE46必讀時間案例

- CH150→151：項鏈所有權必須跨讀。
- CH154：前世戰爭記憶，不是當前新事件。
- CH157：前世源義清關係記憶。
- CH169→170：約15分鐘，不是隔日。
- CH170～181：同一場原初之地。
- CH180→181：180不是結算點。
- CH182：明示兩天後。
- CH191～200：競技場與矮人城是同日平行剪輯。

---

# 十三、原著自身矛盾怎麼處理

原著若自相矛盾：

**保留兩版，不替作者偷偷修。**

SOURCE46例：

`CH189-E01`

- 【鮮血之翼】正式面板要求31級；
- 同章旁白又寫30級即可自主飛行。

所以：

`SOURCE_CONTRADICTION = PRESERVE_BOTH`

除非後文有明確修正證據，不自行挑一個變成唯一真值。

同理，名詞浮動如【火炎血雨／火焰血雨】若上下文明確是同一能力，就記名詞浮動，不擅自創造成兩個魔法。

---

# 十四、Master Set怎麼更新

未來發現漏項：

1. 回TXT核對；
2. 判斷是新EVENT還是既有EVENT的新證據；
3. 必要時建／更新RETRO或SOURCE_NODE保存錯誤歷史；
4. 更新對應Master Set；
5. 更新SOURCE_CLASS、後文回證、disposition、trigger、deadline；
6. 若影響正式改寫，再同步Active Queue／Current State／正文修復責任；
7. commit後，以更新後Master Set為日常第一入口。

不要把「第四輪、第五輪、第六輪掃描」永久堆成新的真值森林。

研究工作檔可存在，但驗證完成後必須：

`NEW_EVIDENCE → CONVERGE_TO_MASTER_SET`

---

# 十五、何時另建SOURCE_NODE／RETRO

只更新Master Set：

- 新找到普通數值；
- 同事件後文回證；
- 母抓取漏一個明確小事件；
- disposition普通更新；
- 無複雜保管／知情／正式衝突。

另建SOURCE_NODE／RETRO：

- 物權／保管鏈不清；
- 重要技能／裝備跨很多章；
- 正式正文可能已寫錯；
- Acceptance／LIVE曾錯誤宣告完整；
- 高價值世界線事件漏失；
- SOURCE_UNSTATED中間邊會影響正式正文；
- 需要雙向稽核才能閉環。

完成後仍回寫Master Set。

---

# 十六、SOURCE45與SOURCE46目前代表什麼

## SOURCE45｜100～150

第一個正式Master Set實作，建立了：

- 世界內時間骨架；
- 章級EVENT_ID；
- SOURCE分類；
- 客觀事件與數值；
- disposition；
- RETRO收斂；
- 舊Acceptance／LIVE降為歷史證據。

## SOURCE46｜150～200

沿用SOURCE45架構，並進一步強化：

- CH150重疊邊界；
- CH150→151物權回證；
- 154／157前世記憶標記；
- CH170～181同一場原初之地；
- CH180→181跨章真正結算；
- CH182「兩天後」硬時間錨；
- 血夜之王開荒版與後世攻略差異；
- CH189原著31級／30級矛盾雙保留；
- CH191～200雙線平行剪輯；
- CH200最後5分鐘作201～204後續觸發。

因此新對話查150～200，不應再自己從07、08、09、21、22拼答案，先讀SOURCE46。

---

# 十七、給新對話的最小執行清單

- [ ] 已讀 `00A_原著事件捕捉與反向歸屬流程.md`
- [ ] 已讀本 `00C`
- [ ] 已依章號定位 SOURCE45／SOURCE46
- [ ] 已確認EVENT_ID與SOURCE_CLASS
- [ ] 已確認disposition
- [ ] 已確認時間位置／是否回憶／平行／跨章
- [ ] 已確認是否有SOURCE矛盾、RETRO或SOURCE_NODE
- [ ] 若修改SOURCE，已回第一手TXT
- [ ] 新證據已更新既有EVENT_ID或合法新增EVENT_ID
- [ ] 歷史判錯有保留provenance，不是偷偷抹除
- [ ] 最終現行結果已收斂回Master Set

只有要寫正式正文時，才再進PREWRITE／能力Gate／Active Queue／Current State等施工流程。

---

# 十八、一句話交接

**原著TXT是最高證據；Master Set是日常現行入口；SOURCE_NODE／RETRO負責特殊爭議；母抓取、反掃、Acceptance、LIVE保留作證據與歷史，不再要求新對話靠多檔考古拼出現在真相。**

固定：

`FIRST_READ_ENTRY = MASTER_SET`

`FIRST_HAND_TXT = HIGHEST_SOURCE_AUTHORITY`

`CURRENT_MASTER_SETS = SOURCE45_100_150 + SOURCE46_150_200`

`BOUNDARY_OVERLAP_CH150 = INTENTIONAL`

`HISTORICAL_FILES = PROVENANCE_NOT_PRIMARY_ENTRY`

`NEW_EVIDENCE_MUST_CONVERGE_BACK_TO_MASTER_SET = TRUE`

`ACCEPTANCE_OR_LIVE_ALONE_CANNOT_PROVE_FULL_SOURCE_CLOSURE = TRUE`
