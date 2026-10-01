# 原著 SOURCE 閱讀路由與新對話執行交接

> 更新日期：2026-10-01  
> 性質：`SOURCE_HANDOFF / READING_ROUTER / NEW_CHAT_BOOTSTRAP / MANDATORY`  
> 適用專案：`網遊：重生就是最大的BUG（芙蘭妮雅改寫版）`  
> 目的：讓完全沒有前文的新對話，也能知道原著SOURCE應先讀哪裡、各類研究檔用途、Canon Master如何更新，以及哪些區間仍未完成完整反向閉環。

---

# 一、新對話固定啟動順序

如果任務是「接手芙蘭原文事件／查某章原著／建立或更新Canon Master／做PREWRITE前SOURCE核對」，固定：

1. 讀 `00A_原著事件捕捉與反向歸屬流程.md`。
2. 讀本 `00C_原著SOURCE閱讀路由與新對話執行交接.md`。
3. 依章號讀對應 `SOURCE_CANON_MASTER`。
4. 只有遇到爭議、SOURCE_UNSTATED、高風險物權／知情鏈、RETRO或歷史誤判，才下鑽 SOURCE_NODE／RETRO／母抓取／反掃／舊Acceptance／舊LIVE／舊Master Set。
5. 若要新增、否定、改變SOURCE結論，最終必須回第一手原著TXT。

正常路由：

`第一手原著TXT（最高證據） → 對應Canon Master（日常唯一現行入口） → 特殊爭議才下鑽歷史／專題檔`

不要把日常工作變成：

`母抓取 → 反掃 → Acceptance → LIVE → RETRO → SOURCE_NODE → 舊45/46/47 → 自己猜哪份最新`

---

# 二、目前唯一現行 Canon Master 路由

現行：

- `48_SOURCE_CANON_MASTER_100-150.md`
- `49_SOURCE_CANON_MASTER_151-200.md`
- `50_SOURCE_CANON_MASTER_201-250.md`

| 原著章號 | 唯一現行入口 |
|---|---|
| CH100～150 | SOURCE48 |
| CH151～200 | SOURCE49 |
| CH201～250 | SOURCE50 |
| CH251以後 | 尚無Canon Master時，依00A回TXT＋既有研究；完成後建立下一份Master，從CH251起不得複製CH250現行真值 |

固定：

`ONE_CHAPTER_ONE_CURRENT_MASTER_OWNER = TRUE`

`BOUNDARY_OVERLAP_AS_CURRENT_TRUTH = FORBIDDEN`

`HISTORICAL_MASTER_SET_MAY_OVERRIDE_CANON_MASTER = FALSE`

### 舊45／46／47的定位已正式降級

以下檔案保留，但全部只屬歷史／證據層：

- `45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`
- `46_SOURCE_CHAPTER_EVENT_MASTER_SET_150-200.md`
- `47_SOURCE_CHAPTER_EVENT_MASTER_SET_200-250.md`

它們檔內若仍殘留 `CURRENT_SOURCE_TRUTH_ENTRY`、`ACTIVE_CURRENT_SOURCE_ENTRY`、邊界重疊等舊自我描述，**一律由本00C與48／49／50的新路由覆蓋**，不得再被新對話解讀為現行權威。

舊重疊章只保留作歷史證據：

- CH150過去同時出現在45／46，現在只屬48；49以指標承接151開始。
- CH200過去同時出現在46／47，現在只屬49；50以指標承接201開始。

---

# 三、目前各區間研究成熟度

## SOURCE48｜CH100～150

- 已有母抓取、多輪反掃／交叉稽核、時間序、Acceptance、LIVE、RETRO、SOURCE_NODE收斂。
- 已升格為 `CURRENT_SOURCE_CANON_MASTER / SINGLE_AUTHORITY / COMPLETE_EVENT_LEDGER`。
- CH150神恩守護項鏈只記當章取得；真正「交還→暫借」在SOURCE49的CH151繼續。

## SOURCE49｜CH151～200

- 由舊SOURCE46、151～180／181～210母抓取、121～210反向稽核、時間序第三輪與相關修正重新收斂。
- CH180→181跨章結算、CH191～200平行剪輯已鎖定。
- CH200「今天遊戲時間最後5分鐘會來」只建立到期責任；真正抵達／決戰由SOURCE50的CH201～204承接。

## SOURCE50｜CH201～250

- CH201～240：已有母抓取／第三輪交叉稽核／時間序第三輪，多層收斂。
- CH241～250：2026-10-01直接回第一手TXT新抓，原證據檔 `47A_SOURCE_FIRST_HAND_CAPTURE_241-250.md` 已降為歷史證據層，現行結論已收斂進SOURCE50。
- CH240→241跨窗已解決：真正破局是莎莉補1000魔力→薩拉達14000→【毀滅法則－崩壞】。
- CH250→251必須跨窗：18:00港口會面、記憶讀取與治療結果不可提前標完成。
- **241～270完整30章反向歸屬閉環仍未完成。** 下一批延伸CH251～270時需補完整forward reuse／reverse attribution，再回寫SOURCE50／下一Master相關EVENT_ID。

固定：

`CH241_250_FIRST_HAND_CAPTURE = PASS`

`CH241_250_CANON_MASTER_INTEGRATION = PASS`

`CH241_270_FULL_REVERSE_ATTRIBUTION_CLOSURE = PENDING`

---

# 四、第一手權威與三種問題必須分開

第一手最高權威：

`05_原著參考/网游：重生就是最大的BUG - 刘巴库.txt`

所有母抓取、反掃、Acceptance、LIVE、RETRO、SOURCE_NODE、舊Master Set、Canon Master都是研究／收斂層，不能取代TXT。

但日常查詢不要求每次從TXT從零研究，否則Canon Master失去意義。

固定分三層：

`SOURCE真相` ≠ `研究歷史` ≠ `Franiya改寫線現況`

- **SOURCE真相**：原著客觀發生了什麼。
- **研究歷史**：以前漏了什麼、哪份檔判錯、怎麼被修正。
- **Franiya改寫線現況**：原著事件在本線目前是整合、延後、重建、作廢或等待觸發。

Canon Master要把三者分開，不把「原著結果」與「Franiya映射」混成一句。

---

# 五、各類檔案定位

## 5.1 母抓取 `SOURCE_CAPTURE`

用途：按章保存原著流程、人物、任務、技能、裝備、數值、規則、知情狀態、公開情報、長線鉤子。

定位：**基礎研究層，不是現行第一入口。**

## 5.2 反向掃描／交叉稽核／時間序稽核

用途：補來源、持有人、後文首次使用、量化數值、跨章反推、角色推測／客觀事實區分、原著矛盾與時間序。

反掃抓到的事實不能因Acceptance沒收就消失；有效結果最終回寫Canon Master。

## 5.3 Acceptance

只回答「哪些SOURCE事件已被列入正式驗收／disposition？」

`ACCEPTANCE != SOURCE_EVENT_MASTER`

`ACCEPTANCE_MISSING_EVENT != SOURCE_EVENT_NONEXISTENT`

## 5.4 SOURCE_NODE

只處理高風險局部因果，例如高價值物權／保管鏈、跨多章技能／裝備來源、知情邊界、SOURCE_UNSTATED中間邊、正文可能衝突。

SOURCE_NODE做完，最終結論仍要回寫Canon Master。

## 5.5 LIVE / LIVE REBUILD

表示某個正式施工分支在那個時間點採用的SOURCE狀態。

`LIVE = CURRENT_BRANCH_STATE_AT_THAT_TIME`

不是：

`LIVE = ETERNAL_SOURCE_TRUTH`

## 5.6 RETRO

用途：「以前漏／判錯，現在回頭修」。

`RETRO_RESULT → UPDATE_CANON_MASTER`

未來正常查事件不應每次先讀RETRO。

## 5.7 舊 Master Set 45／46／47

定位：`HISTORICAL_SOURCE_LEDGER / PROVENANCE`。

它們保留遷移前事件集合、舊邊界重疊與研究狀態，只有追查「以前為何這樣判」時下鑽。

## 5.8 Canon Master 48／49／50

這是日常唯一現行入口。

概念公式：

`CANON_MASTER`
`= FIRST_HAND_TXT`
`∪ SOURCE_CAPTURE`
`∪ REVERSE_SCAN`
`∪ CROSS_AUDIT`
`∪ TIMELINE_AUDIT`
`∪ FIRST_HAND_PATCHES`
`∪ LATEST_VALID_RETRO`

它不是「多一份摘要」，而是研究結果收斂後的**現行事件帳本**。

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
只有完成：當章完整回讀、前後章、全文搜尋、跨章數量／職業／掉落／交易／後續持有反推，仍不能再縮小時才可標。

可另保留：

- `REASONABLE_INFERENCE`
- `ADAPTATION_OPTIONAL_BRIDGE`
- `CHARACTER_STATEMENT_KNOWN_FALSE`

不要拿角色猜測冒充SOURCE_EXPLICIT。

---

# 八、原著矛盾怎麼處理

原著自己矛盾時，**雙版本保留**，直到後文真的修正。

現有典型：

- CH170原初之地「1級開始／0級開始」。
- CH189【鮮血之翼】面板31級、旁白又說30級能飛。
- CH219納塔麗數到110股／種異能，CH220旁白又寫108種異能齊聚。

`ORIGINAL_INTERNAL_CONTRADICTION != LICENSE_TO_SILENTLY_FIX_AUTHOR`

---

# 九、時間序硬規則

章號不是世界內時間。

Canon Master必須保留需要的：

- `SOURCE_IN_WORLD_ORDER`
- `NARRATIVE_MODE = PRESENT / FLASHBACK / PARALLEL / MEMORY_EXPOSITION / LATE_DISCOVERED_HISTORY`

尤其：

- CH154／157有前世回憶，不是現在事件。
- CH170～181是一場原初之地對局。
- CH191～200有競技場／矮人城平行剪輯。
- CH207～222是同一現實日下午→深夜郵輪線，大量Zero前世背景不是當晚新事實。
- CH223明示第二天一早。
- CH224～241是同一水晶通道／伏擊遊戲日。
- CH240必須跨CH241才完成戰鬥解法。
- CH250必須跨CH251才能知道羅成女兒的治療／記憶讀取實際結果。

`RESEARCH_DISCOVERY_TIME != SOURCE_EVENT_TIME != ADAPTATION_EVENT_TIME`

---

# 十、Disposition常用值

- `PRESERVE_BY_DEFAULT`
- `WORLD_BACKGROUND_LOCKED`
- `DEFERRED_WITH_TRIGGER`
- `DEFERRED_WITH_CAUSE`
- `REBUILD_REQUIRED`
- `VOID_WITH_CAUSE`
- `OPEN_SOURCE_UNSTATED`

任何重要事件沒有合法disposition，不得只因「章節看過」就宣告 `FULLY_CONSUMED`。

---

# 十一、正常查某一章

## Step 1｜先看對應Canon Master

先取得EVENT_ID、SOURCE_CLASS、客觀事件／結果、數值、世界內時間、後文回證、disposition、trigger／deadline、conflict note。

## Step 2｜有爭議才下鑽

例如：

- 為什麼CH116踢擊以前漏？→讀RETRO＋反掃＋舊Acceptance／LIVE。
- CH241～250第一次怎麼抓？→讀 `47A_SOURCE_FIRST_HAND_CAPTURE_241-250.md`。
- 某高價值物品保管鏈不清？→讀對應SOURCE_NODE。
- 為什麼舊45／46／47跟現在章號邊界不同？→讀舊Master Set作遷移歷史，不可拿來覆蓋48／49／50。

## Step 3｜若要改SOURCE，回TXT

至少讀當章連續上下文、相鄰章、必要全文關鍵詞、後文第一次再利用、邊界章真正停止點，然後才改Canon Master。

---

# 十二、Canon Master更新規則

新證據出現：

1. 回第一手TXT核對；
2. 判斷是新事件還是既有EVENT_ID補證；
3. 必要時建RETRO／SOURCE_NODE保留錯誤歷史；
4. 更新對應Canon Master；
5. 更新 source class／後文回證／disposition／trigger／deadline；
6. 若影響正式改寫，再同步Active Queue／Current State／正文修復責任；
7. commit後，以Canon Master新狀態作唯一日常入口。

---

# 十三、給新對話的最小Checklist

- [ ] 已讀00A
- [ ] 已讀00C
- [ ] 已定位章號對應48／49／50 Canon Master
- [ ] 已確認EVENT_ID／source class
- [ ] 已確認真實時間位置
- [ ] 已確認客觀結果與數值
- [ ] 已確認disposition／trigger／deadline
- [ ] 已確認是否有原著自相矛盾
- [ ] 若修改SOURCE，已回TXT
- [ ] 若是高風險因果，已確認是否需SOURCE_NODE／RETRO
- [ ] 新證據最終已回寫Canon Master
- [ ] 若工作區含CH241～250，知道CH241～270完整30章閉環仍待下一批

只有要寫正式正文時，才再進PREWRITE／能力Gate／Active Queue／Current State等正式施工流程。

---

# 十四、一句話交接

**原著TXT是最高證據；48／49／50 Canon Master是日常唯一現行入口；SOURCE_NODE／RETRO處理特殊爭議；45／46／47與母抓取、反掃、Acceptance、LIVE保留為證據與歷史；所有新證據最後必須回到既有EVENT_ID與Canon Master。**

`FIRST_READ_ENTRY = SOURCE_CANON_MASTER`

`FIRST_HAND_TXT = HIGHEST_SOURCE_AUTHORITY`

`CURRENT_CANON_MASTERS = SOURCE48 + SOURCE49 + SOURCE50`

`HISTORICAL_MASTER_SETS = SOURCE45 + SOURCE46 + SOURCE47`

`HISTORICAL_FILES = PROVENANCE_NOT_PRIMARY_ENTRY`

`NEW_EVIDENCE_MUST_CONVERGE_BACK_TO_CANON_MASTER = TRUE`

`ACCEPTANCE_OR_LIVE_ALONE_CANNOT_PROVE_FULL_SOURCE_CLOSURE = TRUE`