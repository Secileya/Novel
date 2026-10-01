# SOURCE CANON MASTER｜原著第100～150章（重建中）

> 建立日期：2026-10-01  
> 性質：`SOURCE_CANON_MASTER_REBUILD / SINGLE_AUTHORITY_CANDIDATE`  
> 目前狀態：`IN_PROGRESS / NOT_YET_PROMOTED`  
> 目標：完成後取代 `45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md` 成為 CH100～150 **唯一現行權威 SOURCE 檔**。  
> 第一手最高證據：`05_原著參考/网游：重生就是最大的BUG - 刘巴库.txt`

---

# 0｜這份檔案跟舊 Master 最大差異

本檔不是「多份研究的濃縮摘要」，而是原著事件的**完整現行帳本**。

完成並升格後，新對話查 CH100～150 時，應只需要：

`原著 TXT（必要時回證） → 本 CANON MASTER`

母抓取、反向掃描、Acceptance、LIVE、RETRO、SOURCE_NODE 全部降為：

`PROVENANCE / HISTORICAL_EVIDENCE / SPECIAL_DISPUTE_DRILLDOWN`

固定：

`MASTER_IS_SUMMARY = FALSE`

`MASTER_IS_COMPLETE_EVENT_LEDGER = TRUE`

`MASTER_IS_SINGLE_CURRENT_AUTHORITY = TRUE`（僅在本檔完成並正式升格後生效）

`HISTORICAL_FILE_MAY_OVERRIDE_MASTER = FALSE`

若後來發現新證據：

`新證據 → 核第一手TXT → 修正既有EVENT_ID → 記修正來源`

不是再生一份平行 Acceptance／LIVE／第四輪掃描當新真值。

---

# 1｜事件不得被 disposition 吃掉

Master 必須先完整記錄「原著發生了什麼」，再記 Franiya 線怎麼處理。

所以：

`SOURCE_EVENT_EXISTENCE` 與 `FRANIYA_DISPOSITION` 完全分離。

例如：

- 沈雲因前世唐曉煙私人關係跑去翡翠湖：可以 `VOID / REBUILD`；
- 翡翠湖本來就有白銀 BOSS【魚人守護者】：不能跟著消失；
- BOSS 被殺後屍體可由玩家採集出【魚人寶庫圖紙】：不能因沈雲私人動機作廢；
- 誰去殺、誰採集、誰拿到圖紙：依 Franiya 線實際因果重算。

固定：

`PRIVATE_CAUSE_VOID != OBJECTIVE_EVENT_VOID`

`VOID_WITH_CAUSE_MUST_NOT_DELETE_ADJACENT_OBJECTIVE_EVENTS = TRUE`

---

# 2｜每個事件最低必填欄位

每個 `EVENT_ID` 至少回答：

- `SOURCE_CHAPTER`
- `SOURCE_IN_WORLD_ORDER`
- `NARRATIVE_MODE`
- `EVENT_CLASS`
- `PRECONDITIONS / CAUSE`
- `ACTION_SEQUENCE`
- `OBJECTIVE_RESULT`
- `STATE_DELTA`
- `CUSTODY_CHAIN`（若涉及物品／資產／權限）
- `KNOWLEDGE_FLOW`（若涉及情報／秘密／公開資訊）
- `DOWNSTREAM_EVIDENCE`
- `SOURCE_CLASS = EXPLICIT / DERIVED / REASONABLE_INFERENCE / UNSTATED`
- `FRANIYA_MAPPING`
- `DISPOSITION`
- `PROVENANCE`
- `OPEN_EDGE`（若仍有未知）

### ACTION_SEQUENCE 的要求

不能把可分離動作縮成一句結果。

例如以下兩種寫法不等價：

錯：

`魚人守護者被處理後形成【魚人寶庫圖紙】來源。`

正：

`魚人守護者被沈雲擊殺 → 屍體保留 → CH126重新登入 → 沈雲本人對屍體使用採集 → 取得【魚人寶庫圖紙】。`

因為「掉落」「採集」「任務獎勵」「NPC交付」「交易」「拾取」是完全不同的來源機制，會直接影響 Franiya 線能否合法取得。

---

# 3｜章號所有權

完成重建後固定：

- `CH100～150` 只由本檔持有現行 EVENT truth。
- 下一份 Master 從 `CH151` 開始，不再複製 CH150 作第二份現行真值。
- 跨章因果用 `PREVIOUS_EVENT / NEXT_EVENT / RELATED_EVENT` 指向，不用重複建立第二套事件。

`ONE_CHAPTER_ONE_CURRENT_MASTER_OWNER = TRUE`

---

# 4｜目前重建進度

本次先用 CH123～126 作模板段，因為這裡同時包含：

- 沈雲私人前世／關係因果；
- 公開世界事件；
- BOSS擊殺；
- 強制下線造成的時間斷點；
- 屍體採集；
- 早期資產回收；
- 寶庫位置與進入規則；
- NPC第三方利用玩家。

`CH123_126_CANON_REBUILD = PASS`

`CH100_122_CANON_REBUILD = PENDING`

`CH127_150_CANON_REBUILD = PENDING`

在兩個 PENDING 全部清零以前，本檔**不升格**，舊 SOURCE45 仍只作過渡入口。

---

# CH123｜雅典娜神殿

## CH123-E01｜智慧之城與雅典娜神殿進入條件

- `SOURCE_CHAPTER = 123`
- `SOURCE_IN_WORLD_ORDER = CH122正式完成初級游俠轉職之後`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = WORLD_RULE / LOCATION / FAITH_SYSTEM`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

- CH122 沈雲完成正式游俠轉職。
- 雅典娜神殿要求玩家先完成正式職業轉職，才進入信仰流程。

### ACTION_SEQUENCE

1. 沈雲抵達智慧之城。
2. 智慧之城中央有巨型雅典娜神像，城市比光明主城更清冷，但人種、服裝、武器與文化更具包容性。
3. 沈雲前往雅典娜神殿處理信仰。

### OBJECTIVE_RESULT

雅典娜神殿正式作為可加入的信仰組織開放；神殿貢獻可兌換：

- 裝備；
- 隱藏職業；
- 特殊道具；
- 罕見血脈等。

轉換信仰會清空既有神殿貢獻。

### STATE_DELTA

`WORLD_FAITH_SYSTEM.Athena = REVEALED`

### FRANIYA_MAPPING

完全屬世界客觀規則，不依賴沈雲前世。

### DISPOSITION

`WORLD_BACKGROUND_LOCKED`

### PROVENANCE

- 第一手 CH123。
- `06_原著事件捕捉_121-150.md`。
- 舊 SOURCE45 `CH123-E01`。

---

## CH123-E02｜主身份因赫爾墨斯神使徽章遭拒

- `SOURCE_CHAPTER = 123`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = IDENTITY / FAITH / NPC_REACTION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

- 沈雲此前取得【赫爾墨斯神使徽章】。
- 即使沈雲本人沒有真正接受赫爾墨斯神使職位，神殿仍可根據徽章／關聯判斷其身份。

### ACTION_SEQUENCE

1. 沈雲以【雲深不知處】身份向白袍 NPC【莫妮卡】申請加入雅典娜神殿。
2. 莫妮卡辨識到赫爾墨斯神使關聯。
3. 莫妮卡拒絕其加入。
4. 莫妮卡透露：赫爾墨斯昔日的行為曾差點使光明陣營神明隕落大半。
5. 她拒絕補完整細節，要求沈雲自行去問赫爾墨斯。
6. 沈雲也不願先投赫爾墨斯再轉信仰，因為轉信仰會清空既有神殿貢獻。

### OBJECTIVE_RESULT

【雲深不知處】在此時點無法以原身份加入雅典娜神殿。

### KNOWLEDGE_FLOW

- 沈雲知道「赫爾墨斯曾造成重大光明陣營歷史事件」。
- 具體歷史仍未知。
- 莫妮卡知道的細節 > 沈雲目前知道的細節。

### FRANIYA_MAPPING

此事件是否發生取決於 Franiya 是否持有／被判定具赫爾墨斯相關身份；不能因原著沈雲被拒就自動複製。

### DISPOSITION

`CONDITIONAL_RECALC`

### PROVENANCE

- 第一手 CH123。
- `06_原著事件捕捉_121-150.md`。
- 舊 SOURCE45 `CH123-E02`。

---

## CH123-E03｜第二身份通過神殿與身份隔離回證

- `SOURCE_CHAPTER = 123`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = IDENTITY / CLASS_SYNC / FAITH_ENTRY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

- 【千幻之心】可切換第二身份【撥雲見月】。
- CH122 主身份已被導師提升為初級游俠。
- 多身份共享層會同步職階提升，因此第二身份法師也由見習升為【初級法師】。

### ACTION_SEQUENCE

1. 主身份被莫妮卡拒絕。
2. 沈雲切換成【撥雲見月】。
3. 重新進入雅典娜神殿。
4. 莫妮卡沒有辨識出【撥雲見月】與剛才的【雲深不知處】是同一人。
5. 因【撥雲見月】是第一個到雅典娜神殿的玩家信仰者，直接免除一般信仰任務。
6. 【撥雲見月】成為雅典娜信徒。

### OBJECTIVE_RESULT

- 身份隔離足以騙過神殿高階 NPC。
- 第二身份正式取得雅典娜信徒狀態。

### STATE_DELTA

`撥雲見月.CLASS = 初級法師`

`撥雲見月.FAITH = 雅典娜`

### KNOWLEDGE_FLOW

莫妮卡不知道兩身份同源。

### DOWNSTREAM_EVIDENCE

後續神殿貢獻、血脈與身份差異均以此為基礎。

### FRANIYA_MAPPING

只有在 Franiya 線存在對應合法多身份／信仰條件時才能承接；身份隔離規則本身屬世界機制，可保留。

### DISPOSITION

`WORLD_RULE_PRESERVE / PERSONAL_RESULT_RECALC`

### PROVENANCE

- 第一手 CH123。
- `06_原著事件捕捉_121-150.md`。
- 舊 SOURCE45 `CH123-E03`。

---

## CH123-E04｜翡翠湖魚人守護者衝突成為公開情報

- `SOURCE_CHAPTER = 123`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = PUBLIC_INFORMATION / BOSS_EVENT / GUILD_CONFLICT`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

翡翠湖畔本來就存在白銀 BOSS【魚人守護者】；天痕與錦繡玩家圍繞其處置／利益發生衝突。

### ACTION_SEQUENCE

1. 翡翠湖畔出現魚人守護者相關公會衝突。
2. 事件被玩家公開傳播到論壇。
3. 沈雲透過論壇看到消息。

### OBJECTIVE_RESULT

魚人守護者從「地方 BOSS」變成可被外部玩家知道並介入的公開事件。

### KNOWLEDGE_FLOW

`現場玩家 → 論壇／公開資訊 → 沈雲及其他看到論壇者`

### FRANIYA_MAPPING

**本事件不依賴沈雲私人關係。** 即使 Franiya 沒有沈雲與大夢初曉的前世關係，她仍可能因：

- 公開 BOSS 本身；
- 掉落價值；
- 翡翠湖探索；
- 公會衝突；
- 單純認為值得處理的白銀 BOSS

而合理介入。

### DISPOSITION

`PRESERVE_BY_DEFAULT`

### PROVENANCE

- 第一手 CH123。
- `06_原著事件捕捉_121-150.md`。
- 舊 SOURCE45 `CH123-E04`。

---

# CH124｜上鉤了！

## CH124-E01｜沈雲先懷疑翡翠湖事件是關係測試

- `SOURCE_CHAPTER = 124`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = CHARACTER_REASONING / PRIVATE_CAUSALITY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

- 沈雲前世與大夢初曉／唐曉煙具有特殊私人關係。
- 左谷風此前已注意到沈雲曾對大夢初曉、細雨朦朧大魔王表現出異常差別待遇。

### ACTION_SEQUENCE

1. 沈雲看到翡翠湖衝突。
2. 他沒有直接衝去救人。
3. 他注意到【江城】平時處事高效，這次卻為 BOSS 分配拖延近半小時。
4. 沈雲據此懷疑天痕在設局測試自己與大夢初曉的關係。

### OBJECTIVE_RESULT

沈雲決定以反情報思路處理，而不是單純救援。

### FRANIYA_MAPPING

這個「因大夢初曉私人關係而警覺」屬沈雲專屬因果，不移植。

### DISPOSITION

`VOID_WITH_CAUSE`

### IMPORTANT_BOUNDARY

此事件可作廢，**不代表魚人守護者、公會衝突、BOSS屍體、後續採集圖紙跟著作廢。**

---

## CH124-E02｜左谷風實際設局與資訊放大

- `SOURCE_CHAPTER = 124`
- `EVENT_CLASS = ORGANIZATION_OPERATION / INFORMATION_WAR`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

左谷風懷疑大夢初曉／細雨朦朧可能是雲深不知處的軟肋。

### ACTION_SEQUENCE

1. 左谷風讓江城介入魚人守護者事件。
2. 刻意把原可快速處理的 BOSS 分配爭議拖長。
3. 天痕公關組同步買熱搜、推直播、放大事件可見度。
4. 目的不是單純搶 BOSS，而是觀察雲深不知處是否會為大夢初曉出現。
5. 江城收到最終命令：BOSS事件結束後，無論如何都要對大夢初曉一方下殺手，以製造足夠強的測試刺激。

### OBJECTIVE_RESULT

翡翠湖事件具有兩層：

- 客觀 BOSS／公會利益衝突；
- 天痕額外疊加的私人關係測試。

兩者不可混成同一件事。

### KNOWLEDGE_FLOW

- 左谷風／天痕相關執行者知道測試目的。
- 普通觀眾只看到公會衝突／直播。
- 大夢初曉未必知道自己被當成測試工具。

### FRANIYA_MAPPING

天痕具備這種「輿論＋直播＋拖延＋公關組」操作能力可保留；是否拿 Franiya 做同類測試需另有本線證據。

### DISPOSITION

`ORG_CAPABILITY_PRESERVE / TARGET_CAUSE_RECALC`

---

## CH124-E03｜雲深不知處抵達，左谷風誤判魚已上鉤

- `SOURCE_CHAPTER = 124`
- `EVENT_CLASS = ARRIVAL / MISINTERPRETATION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE

1. 沈雲以【雲深不知處】身份抵達翡翠湖現場。
2. 左谷風把他的出現解讀成「大夢初曉確實能釣出他」。
3. 沈雲實際已看穿測試，雙方對同一行為的理解不同。

### OBJECTIVE_RESULT

形成 CH125 反情報行動的直接前置。

### FRANIYA_MAPPING

沈雲抵達原因屬私人線；Franiya若因公開 BOSS 自主抵達，外部勢力仍可能誤讀她的動機，但必須依本線已有情報推導。

### DISPOSITION

`REBUILD_REQUIRED_IF_REUSED`

---

# CH125｜身體異常

## CH125-E01｜沈雲以親手擊殺大夢初曉反向切斷關係判斷

- `SOURCE_CHAPTER = 125`
- `NARRATIVE_MODE = PRESENT`
- `EVENT_CLASS = COMBAT / COUNTERINTELLIGENCE / PRIVATE_RELATION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

CH124 沈雲已判斷左谷風正在測試他與大夢初曉的私人關係。

### ACTION_SEQUENCE

1. 沈雲沒有救大夢初曉。
2. 他主動對錦繡一方多人下手。
3. 他本人親手殺死大夢初曉。
4. 大夢初曉身上的暗金裝備幸運地沒有爆出。
5. 沈雲藉此向觀察者製造「兩人沒有特殊關係」的行為證據。

### OBJECTIVE_RESULT

左谷風的原假說遭到強烈反證。

### FRANIYA_MAPPING

純沈雲前世私人關係＋反情報選擇，不移植。

### DISPOSITION

`VOID_WITH_CAUSE`

---

## CH125-E02｜左谷風用 AI 做出刀速度反查並得到錯誤結論

- `SOURCE_CHAPTER = 125`
- `EVENT_CLASS = ORGANIZATION_ANALYSIS / KNOWLEDGE_BOUNDARY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE

1. 左谷風收集沈雲殺不同玩家的錄像。
2. 使用 AI 比對出刀速度。
3. 控制不同對象敏捷差異。
4. 結果顯示沈雲殺大夢初曉時沒有刻意放慢，甚至略快。
5. 左谷風因此判斷兩人不存在特殊關係。

### OBJECTIVE_RESULT

`左谷風主觀結論 = 無特殊關係`

`客觀真相 = 結論錯誤`

### KNOWLEDGE_FLOW

必須分開：

- 作者／讀者知道沈雲在反情報；
- 左谷風只看得到行為數據；
- AI只能分析動作，不能讀取沈雲真正動機。

### FRANIYA_MAPPING

高階公會使用錄像＋AI作動作分析的能力屬客觀組織能力，可保留。

### DISPOSITION

`WORLD_BACKGROUND_LOCKED`

---

## CH125-E03｜沈雲單殺白銀 BOSS【魚人守護者】

- `SOURCE_CHAPTER = 125`
- `EVENT_CLASS = BOSS_COMBAT / OBJECTIVE_WORLD_EVENT`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

魚人守護者本來就在翡翠湖畔，並非因沈雲私人關係才生成。

### BOSS PANEL

- 等級：Lv10
- 品質：白銀 BOSS
- HP：11000
- 火抗：41%
- 雷抗：12%
- 水抗：52%
- 技能：【集中猛擊／水流術／橫掃】

### ACTION_SEQUENCE

1. 翡翠湖公會衝突背景中，魚人守護者仍是獨立 BOSS 目標。
2. 沈雲最終親自與魚人守護者交戰。
3. 沈雲將其擊殺。
4. BOSS死亡後留下屍體，屍體在 CH126 仍可被玩家執行【採集】。

### OBJECTIVE_RESULT

`魚人守護者 = DEAD`

`CORPSE_GATHER_NODE = AVAILABLE`

### STATE_DELTA

這裡只完成「擊殺」，**尚未完成【魚人寶庫圖紙】取得。**

### FRANIYA_MAPPING

這是本次修正的核心：

- 「沈雲為大夢初曉私人因果來到翡翠湖」可以作廢；
- 「魚人守護者客觀存在」不可作廢；
- 「有人合法擊殺後屍體可採集」不可作廢；
- Franiya可完全因公開 BOSS、掉落價值、探索興趣或其他自身理由前往並親手擊殺。

### DISPOSITION

`PRESERVE_BY_DEFAULT / ACTOR_AND_MOTIVE_RECALC`

### NEXT_EVENT

`CH126-E02`：重新登入後對屍體採集出【魚人寶庫圖紙】。

### PROVENANCE

- 第一手 CH125。
- `06_原著事件捕捉_121-150.md`。
- 舊 SOURCE45 `CH125-E03` 曾把「BOSS死亡」與「圖紙來源」壓縮在一起，本 CANON 拆開。

---

## CH125-E04｜擊殺大夢初曉後現實身體／記憶異常，5秒強制下線

- `SOURCE_CHAPTER = 125`
- `EVENT_CLASS = REALITY_SUPERNATURAL / PRIVATE_MEMORY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

沈雲親手攻擊／殺死與前世記憶高度相關的大夢初曉。

### ACTION_SEQUENCE

1. 戰後沈雲現實身體突然出現嚴重異常。
2. 系統連續提示。
3. 5秒後被強制下線。

### OBJECTIVE_RESULT

125→126 之間存在真實的「遊戲中斷 → 現實異常 → 再登入」時間斷點。

### FRANIYA_MAPPING

屬沈雲重生身體／唐曉煙缺失記憶私人因果，不移植。

### DISPOSITION

`VOID_WITH_CAUSE`

### IMPORTANT_BOUNDARY

即使這條私人異常不移植，也不能刪掉 CH125-E03 的 BOSS 擊殺結果或 CH126-E02 的屍體採集機制。

---

# CH126｜魚人寶庫

## CH126-E01｜現實側心靈劇痛與缺失記憶聯想

- `SOURCE_CHAPTER = 126`
- `SOURCE_IN_WORLD_ORDER = CH125強制下線之後、重新登入之前`
- `NARRATIVE_MODE = PRESENT_REALITY`
- `EVENT_CLASS = REALITY_SUPERNATURAL / PRIVATE_MEMORY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE

1. 強制下線後，沈雲在現實承受劇烈心靈疼痛。
2. 他把異常與自己缺失的記憶聯繫起來。
3. 他進一步懷疑缺失記憶可能與唐曉煙相關，尤其「對她出手」會觸發異常。
4. 狀態處理後才重新登入《信仰》。

### OBJECTIVE_RESULT

`SOURCE_TIMELINE = GAME(CH125) → REALITY_BREAK → GAME(CH126)`

### FRANIYA_MAPPING

沈雲私人重生／記憶線，不移植。

### DISPOSITION

`VOID_WITH_CAUSE`

---

## CH126-E02｜重新上線後，沈雲本人從魚人守護者屍體採集【魚人寶庫圖紙】

- `SOURCE_CHAPTER = 126`
- `SOURCE_IN_WORLD_ORDER = CH126-E01之後`
- `NARRATIVE_MODE = PRESENT_GAME`
- `EVENT_CLASS = GATHERING / ASSET_ACQUISITION / CUSTODY_CHAIN`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS / CAUSE

- `CH125-E03`：魚人守護者已被擊殺。
- 屍體仍保留為可採集節點。
- 沈雲重新登入後仍能接觸該屍體。

### ACTION_SEQUENCE

1. 沈雲重新登入。
2. 回到魚人守護者屍體所在處。
3. **本人對魚人守護者屍體執行採集。**
4. 採集成功。
5. 取得【魚人寶庫圖紙】。

### OBJECTIVE_RESULT

`魚人寶庫圖紙 = ACQUIRED`

### CUSTODY_CHAIN

`魚人守護者屍體（可採集來源） → 沈雲使用採集 → 沈雲持有【魚人寶庫圖紙】`

### SOURCE MECHANISM

`ACQUISITION_METHOD = GATHERING_FROM_CORPSE`

不是：

- BOSS直接掉落；
- 系統擊殺獎勵；
- NPC交付；
- CH125擊殺瞬間自動入包。

### FRANIYA_MAPPING

這是本次最重要修正：

若 Franiya 在本線以自身理由合法擊殺【魚人守護者】，且屍體仍可採集、她具合法採集能力／窗口，則**原著客觀取得機制應預設保留**：

`Franiya擊殺守護者 → Franiya親自採集屍體 → 【魚人寶庫圖紙】`

不得因沈雲原本來翡翠湖的私人原因不存在，就把圖紙一併刪掉。

### DISPOSITION

`OBJECTIVE_RESULT_DEFAULT = PRESERVE`

`ACTOR = RECALCULATE_BY_CURRENT_CAUSALITY`

### PROVENANCE

- 第一手 CH126。
- `06_原著事件捕捉_121-150.md` 明記「回線後從魚人守護者採集到【魚人寶庫圖紙】」。
- `09A_原著事件捕捉二次反向歸屬掃描_121-150.md` 再次確認「採集得到【魚人寶庫圖紙】」。
- 舊 SOURCE45 把這條壓成「魚人守護者掉落與寶庫線合流」，屬過度摘要；本 CANON 明確修正來源機制。

---

## CH126-E03｜魚人守護者其他戰利品與圖紙來源機制分離

- `SOURCE_CHAPTER = 126`
- `EVENT_CLASS = LOOT / ASSET_ACQUISITION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE / RESULT

已確認戰利品包含：

- 青銅布袍：防禦+4、精神+8；
- 未鑑定白銀法杖；
- 【魚人寶庫圖紙】另走「屍體採集」來源，不與裝備掉落混為一談。

### OBJECTIVE_RESULT

`LOOT_DROP` 與 `CORPSE_GATHER` 是兩套不同來源機制。

### FRANIYA_MAPPING

若本線擊殺結果成立，裝備掉落與屍體採集應分別判定，不可因只保留其中一種而吞掉另一種。

### DISPOSITION

`PRESERVE_BY_DEFAULT`

---

## CH126-E04｜【魚人寶庫鑰匙】早期來源與圖紙合流

- `SOURCE_CHAPTER = 126（合流回證）`
- `EVENT_CLASS = LONG_CAUSAL_CHAIN / ASSET_CUSTODY`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PREVIOUS SOURCE

早期沈雲擊殺 Lv8 黃金 BOSS【暗黑魚人刺客】時，已取得【魚人寶庫鑰匙】。

### ACTION_SEQUENCE

1. 早期：【暗黑魚人刺客】死亡。
2. 沈雲取得【魚人寶庫鑰匙】。
3. CH126：沈雲從魚人守護者屍體採集【魚人寶庫圖紙】。
4. 圖紙資訊與鑰匙功能正式合流。
5. 沈雲因此具備「知道寶庫位置＋持有開門核心鑰匙」的完整前置。

### CUSTODY_CHAIN

`暗黑魚人刺客 → 【魚人寶庫鑰匙】 → 沈雲持有至CH126 → 與圖紙配套`

### OBJECTIVE_RESULT

兩件早期資產形成第一個真正用途閉環。

### FRANIYA_MAPPING

Franiya線必須看實際持有人：

- 若鑰匙已由 Franiya 合法取得，且圖紙也由她取得，則可直接閉環；
- 若鑰匙在其他人手上，不能因原著沈雲兩件都有就自動讓 Franiya擁有；需進入交易、競逐、合作或其他合法因果。

### DISPOSITION

`CUSTODY_DEPENDENT`

---

## CH126-E05｜圖紙揭示魚人寶庫位置：翡翠湖水下約500米

- `SOURCE_CHAPTER = 126`
- `EVENT_CLASS = LOCATION_INFORMATION / KNOWLEDGE_TRANSFER`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE

1. 取得【魚人寶庫圖紙】。
2. 圖紙／配套資訊指向翡翠湖水下約500米的魚人寶庫。
3. 沈雲因此能前往正確位置。

### KNOWLEDGE_FLOW

`圖紙資訊 → 圖紙持有人`

不應自動變成全服公開情報。

### OBJECTIVE_RESULT

`FISHMAN_TREASURY_LOCATION = KNOWN_TO_HOLDER`

### FRANIYA_MAPPING

知情者依本線圖紙持有人重算。

### DISPOSITION

`PRESERVE_BY_DEFAULT`

---

## CH126-E06｜水下500米環境與【避水珠】／白骨戒指的既有資產回證

- `SOURCE_CHAPTER = 126`
- `EVENT_CLASS = ENVIRONMENT / ITEM_REUSE / ACCESS_CONDITION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### WORLD RULE

一般玩家在此階段很難直接深入500米水下；原著估計約30級後，才較普遍能靠水下屏障魔法／藥劑處理。

### ACTION_SEQUENCE

1. 沈雲前往翡翠湖深水區。
2. 使用【避水珠】，直接排開周圍約3米水域，獲得自由水下活動空間。
3. 使用【白骨戒指】提供黑暗環境視野。
4. 因此提前突破一般玩家的水下進入門檻。

### DOWNSTREAM EVIDENCE

這是 CH100 四元素珠中【避水珠】的第一次高價值環境用途回證之一。

### FRANIYA_MAPPING

只有實際持有相應資產者才能沿用同路徑；若沒有避水珠，必須另找合法水下手段。

### DISPOSITION

`WORLD_BACKGROUND_LOCKED / CUSTODY_DEPENDENT`

---

## CH126-E07｜寶庫門需要【鑰匙】＋75枚疾風狼優質晶核充能

- `SOURCE_CHAPTER = 126`
- `EVENT_CLASS = ACCESS_RULE / RESOURCE_CONSUMPTION`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### PRECONDITIONS

沈雲已抵達寶庫門前並持有【魚人寶庫鑰匙】。

### ACTION_SEQUENCE

1. 使用鑰匙並不能單獨開門。
2. 寶庫門上的古老魔法陣長期缺乏維護，已耗盡能量。
3. 門上存在晶核充能凹槽。
4. 沈雲投入 **75枚【疾風狼優質晶核】**。
5. 魔法陣補能完成。
6. 寶庫門才真正開啟。

### OBJECTIVE_RESULT

`疾風狼優質晶核 -75`

`FISHMAN_TREASURY_DOOR = OPEN`

### WORLD RULE

許多古老寶庫以魔法陣驅動；長期無維護後可用魔獸晶核補充能量。

### FRANIYA_MAPPING

這是客觀進門成本。沒有足夠晶核就不能用一句「她也有鑰匙」跳過。

### DISPOSITION

`PRESERVE_BY_DEFAULT`

---

## CH126-E08｜第三方 NPC 盜賊在沈雲入內後現身

- `SOURCE_CHAPTER = 126`
- `EVENT_CLASS = NPC_PARALLEL_ACTION / HIDDEN_OBSERVER`
- `SOURCE_CLASS = SOURCE_EXPLICIT`

### ACTION_SEQUENCE

1. 沈雲成功進入魚人寶庫。
2. 其後方出現一名原本未公開身份的 NPC 盜賊。
3. 該 NPC 準備利用玩家替自己掃除寶庫守衛。
4. CH127 他使用定點傳送卷軸／空間門將大量玩家導入寶庫。
5. 後文才正式確認其身份為【哈姆】。

### OBJECTIVE_RESULT

魚人寶庫事件從「單人探索」轉為即將爆發的大量玩家／NPC利用鏈。

### KNOWLEDGE_FLOW

- 此時沈雲未必知道盜賊完整計畫。
- 讀者可看到 NPC 行動。
- 其他玩家尚不知道自己將被利用。

### NEXT_EVENT

`CH127：空間門開啟 → 1200+玩家湧入 → 空間門崩解`

### FRANIYA_MAPPING

NPC本身與其利用玩家的計畫屬客觀外部因果，不應因主角不同自動消失；但是否因 Franiya 的先前行為而被迫調整，依本線實際情況重算。

### DISPOSITION

`PRESERVE_BY_DEFAULT / REACTION_RECALC`

---

# 5｜CH123～126 因果總鏈

```text
CH122 完成正式轉職
→ CH123 前往雅典娜神殿
→ 主身份因赫爾墨斯徽章被拒
→ 切第二身份撥雲見月
→ 成為雅典娜信徒
→ 從論壇得知翡翠湖魚人守護者／天痕vs錦繡公開衝突

【私人因果支線】
左谷風懷疑沈雲與大夢初曉關係
→ CH124 天痕刻意拖延衝突＋熱搜＋直播作關係測試
→ 沈雲看穿
→ CH125 親手殺大夢初曉反情報
→ 左谷風AI分析後誤判兩人無關
→ 沈雲身體／記憶異常
→ 強制下線
→ CH126 現實心靈疼痛／唐曉煙記憶聯想
【此支線可在Franiya線作廢／重建】

【客觀魚人寶庫主鏈】
翡翠湖本來存在白銀BOSS【魚人守護者】
→ CH125 沈雲親手擊殺
→ 屍體留下可採集節點
→ CH126 重新登入後本人使用採集
→ 取得【魚人寶庫圖紙】
→ 與早期暗黑魚人刺客來源【魚人寶庫鑰匙】合流
→ 得知寶庫位於翡翠湖水下約500米
→ 避水珠＋白骨戒指突破水下環境
→ 抵達寶庫門
→ 鑰匙＋75枚疾風狼優質晶核為魔法陣補能
→ 寶庫門開啟
→ 主角進入
→ NPC盜賊在後方現身
→ CH127 開空間門導入1200+玩家
```

### Franiya 線的正確分流

```text
沈雲私人關係誘因：可作廢
≠
魚人守護者：作廢
≠
屍體採集圖紙：作廢
≠
魚人寶庫：作廢
```

正確是：

```text
私人誘因作廢
→ Franiya以自身合理理由得知／前往翡翠湖
→ 若她親自擊殺魚人守護者
→ 屍體採集機制仍成立
→ 圖紙取得結果預設保留
→ 是否能與鑰匙閉環取決於當前真正持有人
→ 水下與開門成本照客觀規則處理
```

---

# 6｜本段修正舊 SOURCE45 的地方

1. 舊 `CH125-E03` 把「魚人守護者死亡」與「魚人寶庫圖紙來源」壓在一起，會讓改寫者誤以為圖紙是擊殺結果自動落袋。
2. 舊 `CH126-E02` 標題使用「魚人守護者掉落與寶庫線合流」，來源機制不精確；二次反掃與母抓取均明確是**屍體採集得到圖紙**。
3. 舊版沒有完整保留：
   - CH125擊殺；
   - 強制下線；
   - CH126重新登入；
   - 本人回到屍體；
   - 親自採集；
   - 圖紙入手；
   這六步彼此獨立的因果順序。
4. 舊版 disposition 容易讓「私人因果作廢」污染相鄰客觀事件；本 CANON 明確禁止。

`CH123_126_CAUSAL_CHAIN_DETAIL_GATE = PASS`

`CH123_126_CUSTODY_CHAIN_GATE = PASS`

`CH123_126_KNOWLEDGE_BOUNDARY_GATE = PASS`

`CH123_126_FRANIYA_MAPPING_SEPARATION_GATE = PASS`

---

# 7｜下一步重建順序

固定從相鄰區間往外擴，不跳著補：

1. `CH117～122`，把游俠轉職／蒂姬／技能取得完整接到 CH123。
2. `CH100～116`，把資產來源、身份、四元素珠、月神石、皇宮寶庫、第二身份等前置全部拉直。
3. `CH127～135`，完成魚人寶庫全事件、NPC哈姆、迪亞斯、暗金首殺與資產鏈。
4. `CH136～144`，完整保存職業試煉雙時間軸與每個取得結果。
5. `CH145～150`，哥布林秘境、嘯月銀狼、月爆、神恩守護項鏈與 CH151 跨界只用引用，不重複建立 CH151。
6. 完成全章後執行：
   - 全事件數量對母抓取；
   - 全反掃事件回收；
   - SOURCE_NODE／RETRO結果回寫；
   - 所有 OBJECTIVE RESULT 對帳；
   - 所有 CUSTODY／KNOWLEDGE／TIMELINE 閉合。
7. 全部 PASS 後，本檔才升格：

`PROMOTION_STATUS = CURRENT_SINGLE_SOURCE_AUTHORITY`

並將舊 SOURCE45／Acceptance／LIVE 明確降為歷史證據層。
