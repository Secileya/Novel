# SOURCE_CAPTURE_EVENT_ACCEPTANCE_MATRIX｜原著第121～150章逐事件驗收

> 建立：2026-10-01
> SOURCE母表：`05_原著參考/06_原著事件捕捉_121-150.md`
> 二次反查：`05_原著參考/09A_原著事件捕捉二次反向歸屬掃描_121-150.md`
> 流程：`07_工作流程/08_原著事件捕捉母表逐事件驗收硬流程.md`
> 狀態：`SOURCE_CAPTURE_COVERAGE_GATE = PASS_AFTER_EVENT_BY_EVENT_AUDIT`
> 規則：本檔只做正式 disposition，不把研究檔「已讀」冒充事件已處理。121章既有LIVE消耗以`40_SOURCE_LIVE_REBUILD_119-121_CH62.md`為準；111-G-3／112-B雅典娜入口以`36_SOURCE_CORRECTION_111G3_112B_雅典娜第二身份入口.md`覆蓋舊判定。

允許狀態只有：`INTEGRATED / WORLD_BACKGROUND_LOCKED / DEFERRED_WITH_TRIGGER / REBUILD_REQUIRED / VOID_WITH_CAUSE`。

---

## 第121章｜第一環結算／第二環

### 121-A 第一環通過、真我流資格、牛戰士推薦鏈
- disposition：`INTEGRATED`
- 第62章已完成，詳見LIVE SOURCE 40。

### 121-B 第二環【蒂姬的幫手】
- disposition：`INTEGRATED`
- 30日、失敗當場死亡、迦娜、兩張卷軸獎勵均已落地；卷軸仍`REWARD_ONLY / NOT_ACQUIRED`。

### 121-C 芬里爾免控／沈雲謊稱藥水
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人裝備保密話術與原著有效命中條件未在本線成立。
- 保留：眩暈機制與蒂姬會根據戰鬥資訊修正打法。

---

## 第122章｜定點卷軸／流派說明／初級游俠

### 122-A 蒂姬交付定點傳送卷軸
- disposition：`REBUILD_REQUIRED`
- CURRENT_CUSTODY：尚未取得。
- EVENT_OR_ACQUISITION_WINDOW：第63章承接第62章後的離場前對話。
- LATEST_SAFE_DEADLINE：離開蒂姬區域前。
- FIRST_REQUIRED_USE_NODE：蒂姬定位迦娜後的召集。
- NEXT_RECHECK_TRIGGER：CH63_PREWRITE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 122-B 真我流／極限流理論與蒂姬主觀排名
- disposition：`REBUILD_REQUIRED`
- EVENT_OR_ACQUISITION_WINDOW：第63章離場前補足合法對話。
- LATEST_SAFE_DEADLINE：第一次正式教學或比較兩流派前。
- FIRST_REQUIRED_USE_NODE：第一次使用「真我流／極限流」理論作角色決策。
- NEXT_RECHECK_TRIGGER：CH63_PREWRITE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 限制：`TIJI_SAYS_TRUE_SELF_STRONGER = CHARACTER_OPINION`。

### 122-C 艾莉／艾米麗家庭背景
- disposition：`WORLD_BACKGROUND_LOCKED`
- 父母為當世強者、兩名女孩與蒂姬親近；Franiya僅在合法談話或觀察時取得人物資訊。

### 122-D 彩虹鳥羽毛200／初級游俠轉職
- disposition：`REBUILD_REQUIRED`
- CURRENT_STATE：107／200；普通彩虹鳥擊殺100；領袖已死亡。
- EVENT_OR_ACQUISITION_WINDOW：第63章。
- LATEST_SAFE_DEADLINE：進入第123章雅典娜神殿入口前。
- FIRST_REQUIRED_USE_NODE：格拉蒙正式完成初級游俠職階提升。
- NEXT_RECHECK_TRIGGER：CH63_PREWRITE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 122-E 游俠基礎技能規則
- disposition：`WORLD_BACKGROUND_LOCKED`
- 鎖定：雙手武器、射術、兩連射、穿透、衝刺、蓄力重擊等客觀面板規則。
- Franiya實際購買／學習數量依當時金幣、職業與自身選擇重算，不幽靈照搬沈雲全部購買結果。

### 122-F 【英雄之軀】先行者／NPC評價型隱藏獎勵
- disposition：`REBUILD_REQUIRED`
- EVENT_OR_ACQUISITION_WINDOW：初級游俠轉職與格拉蒙技能評價同場。
- LATEST_SAFE_DEADLINE：離開格拉蒙技能學習窗口前。
- FIRST_REQUIRED_USE_NODE：格拉蒙是否向Franiya開放隱藏技能。
- NEXT_RECHECK_TRIGGER：CH63_RANGER_TRANSFER。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 原著觸發條件可作評價框架，但Franiya表現、金幣與是否購買全部重算。

### 122-G 多身份職階聯動
- disposition：`WORLD_BACKGROUND_LOCKED`
- 一身份被導師提升正式職階時，其他身份可受同類職階提升機制影響；實際對折光是否成立在主身份轉職後當場驗證，不提前偽造結果。

---

## 第123章｜智慧之城／雅典娜神殿

### 123-A 智慧之城與雅典娜神殿客觀設定
- disposition：`WORLD_BACKGROUND_LOCKED`
- 城市風格、巨型雅典娜神像、完成轉職後入殿、貢獻可換裝備／隱藏職業／特殊道具／血脈、轉信仰清貢獻均鎖定。

### 123-B 主身份因赫爾墨斯關聯遭拒
- disposition：`DEFERRED_WITH_TRIGGER`
- CURRENT_STATE：主身份已拒絕赫爾墨斯見習神使，並存在十二主神神殿拒入Canon。
- EVENT_OR_ACQUISITION_WINDOW：初級游俠轉職後第一次智慧之城／雅典娜神殿訪問。
- LATEST_SAFE_DEADLINE：第二身份第一次雅典娜神殿重試前。
- FIRST_REQUIRED_USE_NODE：莫妮卡／神殿對主身份作准入判定。
- NEXT_RECHECK_TRIGGER：AFTER_RANGER_TRANSFER_COMPLETE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 123-C 第二身份【折光】合法重試／高階NPC氣息隔離驗證
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：主身份神殿拒入後、身份切換鎖合法解除後。
- LATEST_SAFE_DEADLINE：跨過CH123神殿窗口前。
- FIRST_REQUIRED_USE_NODE：莫妮卡第一次直接接觸折光。
- NEXT_RECHECK_TRIGGER：PRIMARY_ID_REJECTION + IDENTITY_SWITCH_AVAILABLE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 第一位玩家免信仰任務等待遇依本線當時進度重算，不預支。

### 123-D 跨身份職階同步實證
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：主身份完成初級游俠轉職後第一次查看折光職階。
- LATEST_SAFE_DEADLINE：折光第一次以正式法師職階接受神殿判定前。
- FIRST_REQUIRED_USE_NODE：折光狀態面板／NPC職階識別。
- NEXT_RECHECK_TRIGGER：RANGER_TRANSFER_COMPLETE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 123-E 翡翠湖畔天痕／錦繡／魚人守護者公開衝突
- disposition：`WORLD_BACKGROUND_LOCKED`
- 作為公開世界事件存在；Franiya是否讀到、介入與其理解依本線資訊渠道重算。

---

## 第124章｜大夢初曉情報誘餌

### 124-A 左谷風以大夢初曉測試「雲深不知處私人關係」
- disposition：`VOID_WITH_CAUSE`
- cause：成立前提來自沈雲原著特定放人、私人關係與公開行為資料；Franiya不存在同一可供左谷風合理推出的證據鏈。
- VOID範圍：只移除「為測沈雲與大夢初曉關係而專門布餌」這條私人主角因果。

### 124-B 天痕使用輿論、直播、延遲衝突作情報測試的組織能力
- disposition：`WORLD_BACKGROUND_LOCKED`
- 保留作為天痕／左谷風可用的情報戰方法，不代表本線已對Franiya使用同一套餌。

### 124-C 翡翠湖畔魚人守護者衝突本體
- disposition：`WORLD_BACKGROUND_LOCKED`
- 公會摩擦與白銀BOSS客觀存在；後續若Franiya或相關人物到場再依本線因果施工。

---

## 第125章｜情報反制／魚人守護者資產鏈

### 125-A 沈雲親手殺大夢初曉以切斷私人關係推測
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲前世／私人關係與其公開人格策略不可轉移給Franiya。

### 125-B AI以出刀速度比對後否決關係假說
- disposition：`WORLD_BACKGROUND_LOCKED`
- 「高階公會可用錄像與AI比較玩家動作資料」保留為世界情報能力；原著針對沈雲的結論不移植。

### 125-C 魚人守護者死亡與【魚人寶庫圖紙】
- disposition：`DEFERRED_WITH_TRIGGER`
- CURRENT_CUSTODY：Franiya已持【魚人寶庫鑰匙】，尚缺地圖。
- EVENT_OR_ACQUISITION_WINDOW：第一次翡翠湖畔魚人守護者合法處理窗口。
- LATEST_SAFE_DEADLINE：進入魚人寶庫CH126功能前。
- FIRST_REQUIRED_USE_NODE：確認地圖來源與寶庫位置。
- NEXT_RECHECK_TRIGGER：FRANIYA_OR_RELEVANT_OWNER_ENTERS_JADE_LAKE_FISHMAN_GUARDIAN_WINDOW。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 125-D 沈雲殺大夢初曉後現實身體／記憶異常
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲專屬現實身體、前世與記憶因果。

---

## 第126～135章｜魚人寶庫與資產鏈

### 126-A 寶庫開門：鑰匙＋魔法陣供能／疾風狼優質晶核×75
- disposition：`DEFERRED_WITH_TRIGGER`
- CURRENT_CUSTODY：魚人寶庫鑰匙HELD；地圖尚未取得；晶核實際本線庫存需到窗再核。
- EVENT_OR_ACQUISITION_WINDOW：魚人寶庫入口第一次合法開啟。
- LATEST_SAFE_DEADLINE：寶庫大門真正開啟前。
- FIRST_REQUIRED_USE_NODE：門鎖／魔法陣供能。
- NEXT_RECHECK_TRIGGER：TREASURY_MAP_ACQUIRED + TREASURY_ENTRY_ATTEMPT。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 126-B 避水珠水下行走規則
- disposition：`WORLD_BACKGROUND_LOCKED`

### 127-A 哈姆利用空間門引約千名玩家清怪
- disposition：`WORLD_BACKGROUND_LOCKED`
- NPC可利用玩家作工具、臨時空間門不是寶庫固定公共機制。

### 128-A 寶庫身份／玩家混戰／身份切換功能
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：本線寶庫玩家大規模接觸成立時。
- LATEST_SAFE_DEADLINE：第一次需要以身份隔離處理寶庫公開資訊前。
- FIRST_REQUIRED_USE_NODE：身份公開／切換決策。
- NEXT_RECHECK_TRIGGER：FISHMAN_TREASURY_PLAYER_CROWD_FORMS。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 129-A 30名10級盜賊開箱／魚人王子封印釋放
- disposition：`WORLD_BACKGROUND_LOCKED`
- 巨箱條件、風刃陷阱、原傳奇→長期封印降階皆為客觀機制。

### 129-B 原著撥雲見月【海潮】堵出口
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲特定戰術選擇；Franiya雖合法擁有同名裝備技能，也不能被迫照演。

### 130-A 紅名／罪惡值／全屬性-10%規則
- disposition：`WORLD_BACKGROUND_LOCKED`

### 130-B 張文君復活＋傳送逃生
- disposition：`WORLD_BACKGROUND_LOCKED`
- 角色資產與逃生能力保留，實際是否在本線同場使用需按事件發展。

### 130-C 哈姆Lv11盜賊／辨識雙重吟唱／死亡
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：魚人寶庫哈姆正式入場。
- LATEST_SAFE_DEADLINE：哈姆戰鬥／掉落處理前。
- FIRST_REQUIRED_USE_NODE：第一次與哈姆直接互動。
- NEXT_RECHECK_TRIGGER：FISHMAN_TREASURY_HAM_APPEARS。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 130-D 魚人王子吸收死亡玩家殘存力量／屍體強制送回
- disposition：`WORLD_BACKGROUND_LOCKED`

### 131-A 迪亞斯偽暗金／氣息辨識／魔武路線／元素假前搖
- disposition：`WORLD_BACKGROUND_LOCKED`
- 高智慧NPC可偽裝技能前兆；千幻之心可真正切斷身份氣息。

### 132-A 八階水牢與火狐炎刀【解放】→【聖炎】原著逆轉
- disposition：`REBUILD_REQUIRED`
- CURRENT_CUSTODY：Franiya合法持有火狐炎刀，但是否使用【解放】必須由本線局勢決定。
- EVENT_OR_ACQUISITION_WINDOW：若本線進入迪亞斯戰鬥且普通解法不足。
- LATEST_SAFE_DEADLINE：任何【解放】結果寫入前。
- FIRST_REQUIRED_USE_NODE：Franiya第一次實際啟動火狐炎刀【解放】。
- NEXT_RECHECK_TRIGGER：DIAS_COMBAT + FIREFOX_LIBERATION_CONSIDERED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 133-A 迪亞斯死亡掉落／暗金首殺／穆斯塔傳奇線索
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：迪亞斯正式死亡結算。
- LATEST_SAFE_DEADLINE：任何相關掉落進Ledger前。
- FIRST_REQUIRED_USE_NODE：BOSS掉落、首殺獎勵、寶箱資產分源。
- NEXT_RECHECK_TRIGGER：DIAS_DEATH_CONFIRMED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 「死靈法師穆斯塔」為原著既有角色／線索，舊原創誤判作廢。

### 134-A 亞特蘭蒂斯、貪狼之刃、清影寶珠、迪亞斯日記
- disposition：`WORLD_BACKGROUND_LOCKED`
- 客觀城市／物品／日記來源與職業試煉背景規則鎖定；實際本線取得需跟隨133資產鏈。

### 135-A 星辰寶石／萬能鑰匙／血脈規則／神殿貢獻
- disposition：`WORLD_BACKGROUND_LOCKED`
- 血脈覺醒≠血脈更換；一次正常更換、再換需地獄清洗；神殿貢獻為唯一貨幣。

### 135-B 原著月精靈／聖精靈購買結果
- disposition：`REBUILD_REQUIRED`
- EVENT_OR_ACQUISITION_WINDOW：Franiya第一次具備合法神殿貢獻並選擇血脈窗口。
- LATEST_SAFE_DEADLINE：第一次血脈覺醒／更換前。
- FIRST_REQUIRED_USE_NODE：血脈購買或使用。
- NEXT_RECHECK_TRIGGER：TEMPLE_CONTRIBUTION_AVAILABLE + BLOODLINE_DECISION。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

---

## 第136～144章｜職業試煉／永恆長眠

### 136-A 職業試煉硬規則
- disposition：`WORLD_BACKGROUND_LOCKED`
- 外部屬性／技能／裝備失效；通訊不可用；下線失敗；理論20%、戰鬥錄像20%、戰鬥之道等模組存在；時間流速高度不同。

### 136-B Franiya使用【職業試煉卷軸·賦能】
- disposition：`DEFERRED_WITH_TRIGGER`
- CURRENT_CUSTODY：卷軸HELD_UNUSED。
- EVENT_OR_ACQUISITION_WINDOW：Franiya主動選擇使用卷軸時。
- LATEST_SAFE_DEADLINE：實際進入試煉空間前。
- FIRST_REQUIRED_USE_NODE：卷軸啟動。
- NEXT_RECHECK_TRIGGER：CAREER_TRIAL_SCROLL_USE_DECISION。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 137-A 永恆長眠跨國、游客身份、五日後公開約戰
- disposition：`WORLD_BACKGROUND_LOCKED`
- 作為公開世界大事件存在；Franiya是否知道取決於試煉／通訊／論壇時間線。

### 137-B 試煉封閉期間收不到外界公告
- disposition：`WORLD_BACKGROUND_LOCKED`

### 138～143 沈雲多職業戰鬥之道、智慧之書、宙斯／堤豐、最終幻想
- disposition：`REBUILD_REQUIRED`
- EVENT_OR_ACQUISITION_WINDOW：Franiya職業試煉真正啟動後。
- LATEST_SAFE_DEADLINE：各試煉模組第一次生成結果前。
- FIRST_REQUIRED_USE_NODE：試煉對Franiya建立個人化題目／敵人／獎勵。
- NEXT_RECHECK_TRIGGER：CAREER_TRIAL_ACTIVE。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 沈雲私人前世知識、疲勞尺度與具體解題路線不可照搬；試煉內資產不可帶回外界，除正式結算者外。

### 144-A 【時空掌控者】／【處女座聖斗士】原著結算
- disposition：`REBUILD_REQUIRED`
- EVENT_OR_ACQUISITION_WINDOW：Franiya完成其職業試煉結算。
- LATEST_SAFE_DEADLINE：任何隱藏職業卷軸進Ledger前。
- FIRST_REQUIRED_USE_NODE：試煉最終獎勵生成。
- NEXT_RECHECK_TRIGGER：CAREER_TRIAL_FINAL_EVALUATION。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 144-B 永恆長眠約戰外部反應
- disposition：`WORLD_BACKGROUND_LOCKED`

---

## 第145～150章｜地獄哥布林秘境／月爆

### 145-A 1500精英哥布林＋怪物最低1點強制傷害
- disposition：`WORLD_BACKGROUND_LOCKED`
- 玩家對玩家可MISS；怪物對玩家破不了防仍至少1點傷害。

### 145-B 夏日可可／夏小悠對沈雲殺大夢初曉的私人反應
- disposition：`VOID_WITH_CAUSE`
- cause：125-A私人殺人事件在Franiya線不成立。

### 146-A 哥布林秘境＝神之試煉地、世界級副本、普通／地獄兩難度
- disposition：`WORLD_BACKGROUND_LOCKED`

### 146-B 沈雲「我動手，需要理由？」公開人格
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲刻意塑造的私人公開人格不可套給Franiya。

### 147-A 左谷風由裝備缺席反推底牌冷卻／大公會反情報能力
- disposition：`WORLD_BACKGROUND_LOCKED`

### 147-B 唐曉煙聽聲音懷疑夢中人物
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲／唐曉煙前世戀人、夢境與缺失記憶因果不可轉移。

### 148-A 地獄哥布林真正攻略：感知>20＋隨機地下密道
- disposition：`WORLD_BACKGROUND_LOCKED`
- 副本4小時限時、地道位置隨機、前人盜賊團遺跡均鎖定。

### 148-B Franiya第一次挑戰該地獄秘境
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：Franiya實際進入哥布林地獄副本。
- LATEST_SAFE_DEADLINE：第一次選路／搜索前。
- FIRST_REQUIRED_USE_NODE：副本環境解析。
- NEXT_RECHECK_TRIGGER：GOBLIN_HELL_INSTANCE_ENTERED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- Franiya可更快讀出地下結構，但必須先確認副本真的生成該通路。

### 149-A 嘯月銀狼／芬里爾狼族相性／【月爆】規則
- disposition：`WORLD_BACKGROUND_LOCKED`
- 【月爆】「無視遊戲防禦／能量、攻擊本體」為規則級效果；作用到Franiya時仍須建立有效作用目標，不自動升格成對本體絕對必中。

### 150-A 地獄級57分36秒首通／特殊卷軸／玩家編年史
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：本線第一次正式完成地獄哥布林秘境。
- LATEST_SAFE_DEADLINE：副本結算公告前。
- FIRST_REQUIRED_USE_NODE：首通判定與獎勵生成。
- NEXT_RECHECK_TRIGGER：GOBLIN_HELL_BOSS_DEFEATED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 150-B 【月爆】技能書實際掉落
- disposition：`DEFERRED_WITH_TRIGGER`
- EVENT_OR_ACQUISITION_WINDOW：嘯月銀狼正式掉落結算。
- LATEST_SAFE_DEADLINE：技能書進Ledger前。
- FIRST_REQUIRED_USE_NODE：掉落生成。
- NEXT_RECHECK_TRIGGER：HOWLING_MOON_SILVER_WOLF_DEFEATED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。

### 150-C 【神恩守護項鏈】跨151章保管鏈
- disposition：`DEFERRED_WITH_TRIGGER`
- CURRENT_CUSTODY：Franiya現有任務【找回神恩守護項鏈】ACTIVE_UNIQUE；不得因原著150章寶箱資訊直接宣告取得。
- EVENT_OR_ACQUISITION_WINDOW：本線項鏈真正被找到／取得時。
- LATEST_SAFE_DEADLINE：任何永久所有權判定前。
- FIRST_REQUIRED_USE_NODE：切爾文交任務／暫借／第二環判定。
- NEXT_RECHECK_TRIGGER：DIVINE_GRACE_NECKLACE_RECOVERED。
- MISSED_DEADLINE_ACTION：`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`。
- 原著151證明項鏈先屬任務物／暫借，不是150章一撿就永久自有。

---

## 跨窗世界硬規則正式鎖定

- NPC可設局、利用玩家、偽裝元素前搖並從戰鬥資訊學習：`WORLD_BACKGROUND_LOCKED`。
- 高階NPC可辨識氣息；千幻之心可切斷身份氣息：`WORLD_BACKGROUND_LOCKED`。
- 游俠雙武器／弓屬性利用率：`WORLD_BACKGROUND_LOCKED`。
- 神殿貢獻、轉信仰、首位玩家可能免信仰任務：`WORLD_BACKGROUND_LOCKED`，首位待遇逐次重算。
- 血脈覺醒／更換／地獄清洗：`WORLD_BACKGROUND_LOCKED`。
- 紅名／罪惡值：`WORLD_BACKGROUND_LOCKED`。
- 怪物最低1點強制傷害：`WORLD_BACKGROUND_LOCKED`。
- 副本可能存在非正面攻略機制：`WORLD_BACKGROUND_LOCKED`。
- 智腦可動態調整宏觀生態：`WORLD_BACKGROUND_LOCKED`。
- 職業試煉長體感時間、多模組評估、外部能力失效：`WORLD_BACKGROUND_LOCKED`。

## Gate

- `SOURCE_CAPTURE_RANGE = CH121_TO_CH150`
- `SOURCE_CAPTURE_CHAPTER_COUNT = 30`
- `UNRESOLVED_SOURCE_EVENT_COUNT = 0`
- `UNCLASSIFIED_SOURCE_SUBSECTION_COUNT = 0`
- `SOURCE_CAPTURE_EVENT_BY_EVENT_AUDIT = COMPLETE`
- `SOURCE_CAPTURE_COVERAGE_GATE = PASS`
- `SECOND_PASS_121_150 = COMPLETE`
- `CURRENT_SOURCE_WINDOW_EVENT_COVERAGE = PASS`
- 第63章仍須依active queue與新PREWRITE處理122-A/B/D/F與123-B/C/D，不能因本矩陣PASS直接跳正文。
