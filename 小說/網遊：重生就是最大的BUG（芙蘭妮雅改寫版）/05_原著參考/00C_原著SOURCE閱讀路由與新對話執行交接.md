# 原著 SOURCE 閱讀路由與新對話執行交接

> 更新日期：2026-10-01  
> 性質：`SOURCE_HANDOFF / READING_ROUTER / NEW_CHAT_BOOTSTRAP / MANDATORY`  
> 適用專案：`網遊：重生就是最大的BUG（芙蘭妮雅改寫版）`  
> 目的：讓完全沒有前文的新對話，也能知道原著SOURCE應先讀哪裡、各類研究檔用途、Master Set如何更新，以及哪些區間仍未完成完整反向閉環。

---

# 一、新對話固定啟動順序

如果任務是「接手芙蘭原文事件／查某章原著／建立或更新Master Set／做PREWRITE前SOURCE核對」，固定：

1. 讀 `00A_原著事件捕捉與反向歸屬流程.md`。
2. 讀本 `00C_原著SOURCE閱讀路由與新對話執行交接.md`。
3. 依章號讀對應 `SOURCE_CHAPTER_EVENT_MASTER_SET`。
4. 只有遇到爭議、SOURCE_UNSTATED、高風險物權／知情鏈、RETRO或歷史誤判，才下鑽 SOURCE_NODE／RETRO／母抓取／反掃／舊Acceptance／舊LIVE。
5. 若要新增、否定、改變SOURCE結論，最終必須回第一手原著TXT。

正常路由：

`第一手原著TXT（最高證據） → 對應Master Set（日常第一入口） → 特殊爭議才下鑽歷史／專題檔`

不要把日常工作變成：

`母抓取 → 反掃 → Acceptance → LIVE → RETRO → SOURCE_NODE → 自己猜哪份最新`

---

# 二、目前Master Set路由

現行：

- `45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`
- `46_SOURCE_CHAPTER_EVENT_MASTER_SET_150-200.md`
- `47_SOURCE_CHAPTER_EVENT_MASTER_SET_200-250.md`

| 原著章號 | 日常第一入口 |
|---|---|
| CH100～149 | SOURCE45 |
| CH150 | SOURCE45／SOURCE46重疊邊界 |
| CH151～199 | SOURCE46 |
| CH200 | SOURCE46／SOURCE47重疊邊界 |
| CH201～250 | SOURCE47 |
| CH251以後 | 尚無Master Set時，依00A回TXT＋既有研究；完成後建立下一份Master Set |

### 重疊邊界不是錯誤

- CH150重疊，是為了讓SOURCE45閉合100～150，同時讓SOURCE46讀150→151，正確處理【神恩守護項鏈】「取得→交還→暫借」。
- CH200重疊，是為了讓SOURCE46閉合150～200，同時讓SOURCE47讀200→202，正確處理「今天最後5分鐘會來」的赴約與後續決戰。

固定：

`BOUNDARY_OVERLAP_IS_INTENTIONAL = TRUE`

若重疊章兩份Master Set未來出現互斥真值：

1. 回TXT；
2. 讀跨章連續窗口；
3. 同步修兩份Master Set的同一SOURCE事實；
4. 不允許平行保留互斥現行版本。

---

# 三、目前各區間研究成熟度

## SOURCE45｜100～150

- 已有母抓取、多輪反掃／交叉稽核、時間序與RETRO收斂。
- 第116章【踢擊】92%案例證明：反掃抓到 ≠ Acceptance一定有收。

## SOURCE46｜150～200

- 150～200已由母抓取、121～210反向稽核、121～180／181～240時間序第三輪等收斂。
- 180→181跨章結算、191～200平行剪輯等已寫入時間骨架。

## SOURCE47｜200～250

- CH200～240：已有母抓取／第三輪交叉稽核／時間序第三輪，多層收斂。
- CH241～250：原本沒有母抓取；2026-10-01已直接回第一手TXT新抓，證據檔為：
  - `47A_SOURCE_FIRST_HAND_CAPTURE_241-250.md`
- 241～250已完成逐章第一手捕捉、240→241／250→251跨窗及部分後文回證，並已收斂進SOURCE47。
- **但241～270完整30章反向歸屬閉環尚未完成。** 下一批延伸251～270時仍需補完整 forward reuse／reverse attribution。

固定：

`CH241_250_FIRST_HAND_CAPTURE = PASS`

`CH241_250_MASTER_INTEGRATION = PASS`

`CH241_270_FULL_REVERSE_ATTRIBUTION_CLOSURE = PENDING`

---

# 四、第一手權威與三種問題必須分開

第一手最高權威：

`05_原著參考/网游：重生就是最大的BUG - 刘巴库.txt`

所有母抓取、反掃、Acceptance、LIVE、RETRO、SOURCE_NODE、Master Set都是研究／收斂層，不能取代TXT。

但日常查詢不要求每次從TXT從零研究，否則Master Set失去意義。

固定分三層：

`SOURCE真相` ≠ `研究歷史` ≠ `Franiya改寫線現況`

- **SOURCE真相**：原著客觀發生了什麼。
- **研究歷史**：以前漏了什麼、哪份檔判錯、怎麼被修正。
- **Franiya改寫線現況**：原著事件在本線目前是整合、延後、重建、作廢或等待觸發。

Master Set要把三者分開，不把「原著結果」與「Franiya映射」混成一句。

---

# 五、各類檔案到底是什麼

## 5.1 母抓取 `SOURCE_CAPTURE`

例：`07_原著事件捕捉_151-180.md`、`08_...181-210.md`、`19_...211-240.md`。

用途：按章保存原著流程、人物、任務、技能、裝備、數值、規則、知情狀態、公開情報、長線鉤子。

定位：**基礎研究層，不是現行第一入口。**

## 5.2 反向掃描／交叉稽核／時間序稽核

用途：

- 補來源、持有人、後文首次使用；
- 抓量化數值；
- 由跨章事實縮小未知；
- 區分角色推測與客觀事實；
- 保留原著自身矛盾；
- 修正回憶、平行剪輯、跨章結算。

反掃抓到的事實不能因Acceptance沒收就消失。

## 5.3 Acceptance

只回答：

> 「哪些SOURCE事件已被列入正式驗收／disposition？」

固定：

`ACCEPTANCE != SOURCE_EVENT_MASTER`

`ACCEPTANCE_MISSING_EVENT != SOURCE_EVENT_NONEXISTENT`

## 5.4 SOURCE_NODE

只處理高風險局部因果，例如：

- 高價值物權／保管鏈；
- 跨多章技能／裝備來源；
- 知情邊界；
- SOURCE_UNSTATED中間邊；
- 正式正文已可能與SOURCE衝突。

SOURCE_NODE做完，最終結論仍要回寫Master Set。

## 5.5 LIVE / LIVE REBUILD

表示某個正式施工分支在**那個時間點**採用的SOURCE狀態。

`LIVE = CURRENT_BRANCH_STATE_AT_THAT_TIME`

不是：

`LIVE = ETERNAL_SOURCE_TRUTH`

LIVE可被後來RETRO修正。

## 5.6 RETRO

用途：「以前漏／判錯，現在回頭修」。

RETRO保留錯誤歷史與修正責任；修完後：

`RETRO_RESULT → UPDATE_MASTER_SET`

未來正常查事件不應每次先讀RETRO。

## 5.7 Master Set

這是日常現行第一入口。

概念公式：

`MASTER_SET`
`= FIRST_HAND_TXT`
`∪ SOURCE_CAPTURE`
`∪ REVERSE_SCAN`
`∪ CROSS_AUDIT`
`∪ TIMELINE_AUDIT`
`∪ FIRST_HAND_PATCHES`
`∪ LATEST_VALID_RETRO`

它不是「多一份摘要」，而是把研究結果重新收斂成**事件帳本**。

---

# 六、EVENT_ID規則

固定格式：

`CH<原著章號>-E<序號>`

例如：

- `CH116-E03｜【踢擊】92%量化回證`
- `CH241-E01｜【毀滅法則－崩壞】完整數值`
- `CH249-E01｜Zero情報來源是已知假話`

新證據出現時：

`新證據 → 更新既有EVENT_ID → 更新後文回證／source class／disposition`

不要為同一事件永久生出「第四輪版、第五輪版、新LIVE版」多個現行真值。

---

# 七、SOURCE分類

### `SOURCE_EXPLICIT`
原文直接明示。

### `SOURCE_DERIVED`
沒有單句點名，但多個原文明示事實可邏輯證明或縮到必然集合。

### `SOURCE_UNSTATED`
只有完成：

1. 當章完整回讀；
2. 前後章；
3. 全文搜尋；
4. 跨章數量／職業／掉落／交易／後續持有反推；

仍不能再縮小時才可標。

可另保留：

- `REASONABLE_INFERENCE`
- `ADAPTATION_OPTIONAL_BRIDGE`
- `CHARACTER_STATEMENT_KNOWN_FALSE`，例如CH249沈雲把Zero說成關山瑞資料來源，作者已明說這是假遮罩。

不要拿角色猜測冒充SOURCE_EXPLICIT。

---

# 八、原著矛盾怎麼處理

原著自己矛盾時，**雙版本保留**，直到後文真的修正。

現有典型：

- CH170原初之地「1級開始／0級開始」。
- CH189【鮮血之翼】面板31級、旁白又說30級能飛。
- CH219納塔麗數到110股／種異能，CH220旁白又寫108種異能齊聚。

固定：

`ORIGINAL_INTERNAL_CONTRADICTION != LICENSE_TO_SILENTLY_FIX_AUTHOR`

---

# 九、時間序硬規則

章號不是世界內時間。

Master Set必須保留需要的：

- `SOURCE_IN_WORLD_ORDER`
- `NARRATIVE_MODE = PRESENT / FLASHBACK / PARALLEL / MEMORY_EXPOSITION / LATE_DISCOVERED_HISTORY`

尤其：

- 154／157有前世回憶，不是現在事件。
- 170～181是一場原初之地對局。
- 191～200有競技場／矮人城平行剪輯。
- 207～222是同一現實日下午→深夜郵輪線，大量Zero前世背景不是當晚新事實。
- 223明示第二天一早。
- 224～241是同一水晶通道／伏擊遊戲日。
- 240必須跨241才完成戰鬥解法。
- 250必須跨251才能知道羅成女兒的治療／記憶讀取實際結果。

固定：

`RESEARCH_DISCOVERY_TIME != SOURCE_EVENT_TIME != ADAPTATION_EVENT_TIME`

---

# 十、Disposition常用值

- `PRESERVE_BY_DEFAULT`：原著客觀結果明確，本線無明確衝突時保留。
- `WORLD_BACKGROUND_LOCKED`：客觀世界規則／制度／角色背景不能因換主角自行消失。
- `DEFERRED_WITH_TRIGGER`：已有未來觸發點。
- `DEFERRED_WITH_CAUSE`：客觀功能保留，但原節點因本線合法原因不能落地。
- `REBUILD_REQUIRED`：功能重要，但依賴沈雲私人前世／關係／選擇，需重建。
- `VOID_WITH_CAUSE`：純沈雲私人因果，可合法不移植。
- `OPEN_SOURCE_UNSTATED`：SOURCE仍不足以完成命名／精確配對。

任何重要事件沒有合法disposition，不得只因「章節看過」就宣告 `FULLY_CONSUMED`。

---

# 十一、正常查某一章

## Step 1｜先看對應Master Set

先取得：

- EVENT_ID；
- SOURCE_CLASS；
- 客觀事件／結果；
- 數值；
- 世界內時間；
- 後文回證；
- disposition；
- trigger／deadline；
- conflict note。

## Step 2｜有爭議才下鑽

例如：

- 為什麼116踢擊以前漏？→讀RETRO＋反掃＋舊Acceptance／LIVE。
- 241～250第一次怎麼抓？→讀 `47A_SOURCE_FIRST_HAND_CAPTURE_241-250.md`。
- 某高價值物品保管鏈不清？→讀對應SOURCE_NODE。

## Step 3｜若要改SOURCE，回TXT

至少讀：

- 當章連續上下文；
- 相鄰章；
- 必要全文關鍵詞；
- 後文第一次再利用；
- 邊界章讀到真正停止點。

然後才改Master Set。

---

# 十二、Master Set更新規則

新證據出現：

1. 回第一手TXT核對；
2. 判斷是新事件還是既有EVENT_ID補證；
3. 必要時建RETRO／SOURCE_NODE保留錯誤歷史；
4. 更新對應Master Set；
5. 更新 source class／後文回證／disposition／trigger／deadline；
6. 若影響正式改寫，再同步Active Queue／Current State／正文修復責任；
7. commit後，以Master Set新狀態作日常第一入口。

不要把永久流程重新長回：

`第四輪完整掃描 → 第五輪完整掃描 → 第六輪完整掃描 → 新對話自己考古`

研究檔可以存在，但驗證結果必須收斂回Master Set。

---

# 十三、給新對話的最小Checklist

- [ ] 已讀00A
- [ ] 已讀00C
- [ ] 已定位章號對應Master Set
- [ ] 已確認EVENT_ID／source class
- [ ] 已確認真實時間位置
- [ ] 已確認客觀結果與數值
- [ ] 已確認disposition／trigger／deadline
- [ ] 已確認是否有原著自相矛盾
- [ ] 若修改SOURCE，已回TXT
- [ ] 若是高風險因果，已確認是否需SOURCE_NODE／RETRO
- [ ] 新證據最終已回寫Master Set
- [ ] 若工作區含241～250，知道241～270完整30章閉環仍待下一批

只有要寫正式正文時，才再進PREWRITE／能力Gate／Active Queue／Current State等正式施工流程。

---

# 十四、一句話交接

**原著TXT是最高證據；Master Set是日常第一入口；SOURCE_NODE／RETRO處理特殊爭議；母抓取、反掃、Acceptance、LIVE保留為證據與歷史；所有新證據最後必須回到既有EVENT_ID與Master Set。**

`FIRST_READ_ENTRY = MASTER_SET`

`FIRST_HAND_TXT = HIGHEST_SOURCE_AUTHORITY`

`HISTORICAL_FILES = PROVENANCE_NOT_PRIMARY_ENTRY`

`NEW_EVIDENCE_MUST_CONVERGE_BACK_TO_MASTER_SET = TRUE`

`ACCEPTANCE_OR_LIVE_ALONE_CANNOT_PROVE_FULL_SOURCE_CLOSURE = TRUE`
