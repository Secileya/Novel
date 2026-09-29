# SOURCE_CAPTURE_EVENT_ACCEPTANCE_MATRIX｜原著第091～120章逐事件驗收

> 建立：2026-09-29  
> SOURCE母表：`05_原著參考/05_原著事件捕捉_091-120.md`  
> 流程：`07_工作流程/08_原著事件捕捉母表逐事件驗收硬流程.md`  
> 狀態：`SOURCE_CAPTURE_COVERAGE_GATE = PASS_AFTER_EVENT_BY_EVENT_AUDIT`  
> 規則：本檔不是「大事件摘要」。母表中的逐章小節與可辨識子功能都必須取得正式 disposition；研究檔寫過不等於已處理。

允許狀態只有：

- `INTEGRATED`
- `WORLD_BACKGROUND_LOCKED`
- `DEFERRED_WITH_TRIGGER`
- `REBUILD_REQUIRED`
- `VOID_WITH_CAUSE`

凡 `DEFERRED_WITH_TRIGGER / REBUILD_REQUIRED`，均必須具備事件窗口、最晚安全截止、第一次不可缺席節點、重檢trigger與逾期動作。

---

# 第091章｜肉痛的斯芬克斯

## 91-A｜靈動之靴／火狐炎刀強化前面板
- disposition：`INTEGRATED`
- 本線已在斯芬克斯強化前保存兩件裝備的既有來源與強化前後差分；後續只以最新正式面板為現行狀態。

## 91-B｜斯芬克斯強化規則
- disposition：`INTEGRATED`
- 契約履約、真實材料／能量成本、火狐炎刀高材質造成斯芬克斯「肉痛」、額外聖火靈狐晶核投入均已進第49章強化線。

## 91-C｜高階強化不是免費系統升階
- disposition：`WORLD_BACKGROUND_LOCKED`
- 後續任何高階強化不得退化成無成本按鈕升級。

---

# 第092章｜技能：解放

## 92-A｜靈動祝福之靴暗金面板
- disposition：`INTEGRATED`
- Current State已持有正式暗金面板：耐久87、敏捷+24、防禦+13、疾馳30%／5秒／1分鐘CD、踢擊20秒CD。

## 92-B｜火狐炎刀暗金面板／晶核2/10
- disposition：`INTEGRATED`
- Current State已持有正式面板與晶核2/10。

## 92-C｜【解放】
- disposition：`INTEGRATED`
- 已合法持有但未使用；使用後3日不可使用火狐炎刀的限制維持。

## 92-D｜神器完成前火狐炎刀的階段性定位
- disposition：`WORLD_BACKGROUND_LOCKED`
- 芬里爾原著評價只作來源尺度，不自動把Franiya未來所有武器排序鎖死；若本線先取得更強合法武器，依本線狀態重算。

## 92-E｜「十分之一／十分之二」文字衝突
- disposition：`WORLD_BACKGROUND_LOCKED`
- 實際現行晶核量以本章明示「十分之二」為準；背景模板殘句不得反向把現行量改回1/10。

---

# 第093章｜華夏第一法師！

## 93-A｜星辰深淵來源／墜落星辰／芬里爾煉化
- disposition：`INTEGRATED`
- 已在第50章與芬里爾線建立。

## 93-B｜傳奇任務【關鍵時刻】
- disposition：`INTEGRATED`
- 1年時限、需尋找願意幫助芬里爾的神明、最終階段提供援助等長線仍ACTIVE。

## 93-C｜高智慧NPC追問可開出隱藏支線
- disposition：`WORLD_BACKGROUND_LOCKED`
- 屬世界互動規則；不代表所有NPC對話必定藏任務。

## 93-D｜星辰獸／第二法師身份基礎
- disposition：`INTEGRATED`
- Franiya第二身份【折光】已在第49～50章合法建立並於星辰獸實戰驗證。

## 93-E｜自由模式低階雙重吟唱／並行構築
- disposition：`INTEGRATED`
- Franiya已以自身理解重建低階並行構型；禁止把這寫成訓練極限或所有高階法術可無條件雙開。

## 93-F｜精靈語排列魔法元素／原著沈雲雙倍傷害技巧
- disposition：`VOID_WITH_CAUSE`
- cause：這是沈雲前世長期研究、向高階精靈NPC學得的專屬知識；Franiya不得幽靈繼承。
- residual world function：精靈語可作高階魔法知識路線存在，已鎖為世界背景；Franiya若未來自然學到，需獨立來源。

---

# 第094章｜星辰能量

## 94-A｜前期法師單刷限制／智慧之書存在
- disposition：`WORLD_BACKGROUND_LOCKED`
- 法師前期技能少、藍耗高屬一般遊戲層限制；神器【智慧之書】存在但未被Franiya持有。

## 94-B｜【智慧之書】未來取得線
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_WISDOM_BOOK_OR_RECORDED_MAGIC_LIBRARY_SOURCE_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_ANY_FUTURE_SCENE_REQUIRES_WISDOM_BOOK_INSTANT_CAST_OR_SPELL_ARCHIVE_FUNCTION`
- `FIRST_REQUIRED_USE_NODE = FIRST_DOWNSTREAM_SOURCE_NODE_THAT_REQUIRES_WISDOM_BOOK_FUNCTION`
- `NEXT_RECHECK_TRIGGER = ANY_WISDOM_BOOK_KEYWORD_OR_HIGH_LEVEL_SPELL_ARCHIVE_WINDOW`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 不因沈雲前世曾持有就給Franiya。

## 94-C｜【星辰能量】五屬性／每玩家一次
- disposition：`INTEGRATED`
- Franiya目前合法持有【星辰能量·力】×1未使用；「每個玩家限用一次」維持。
- 原著大批量力／體／敏／神／防庫存沒有在本線同樣取得，不得幽靈補發。

## 94-D｜沈雲為三身份預留星辰能量
- disposition：`VOID_WITH_CAUSE`
- cause：本線沒有照搬沈雲清空星辰獸與三身份資源分配行動；且「每玩家一次」與多身份交互尚無足夠證據可概括成每身份一次。

## 94-E｜第三身份暫不建立
- disposition：`INTEGRATED`
- Franiya目前第三身份仍未建立。

## 94-F｜芬里爾傳送清紅
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya早在主城監牢合法洗掉紅名，離開星辰深淵時不存在需由芬里爾傳送清紅的同一狀態。

## 94-G｜主城交通：城內免費／跨城按距離收費
- disposition：`WORLD_BACKGROUND_LOCKED`
- 第52章已實際使用主城免費傳送。

## 94-H｜回報星辰深淵＋羅蒙隱瞞貝克
- disposition：`INTEGRATED`
- 2026-09-29已回修第41／48／51章，正式恢復隱瞞→三倍補償。

---

# 第095章｜世界前十，我來安排

## 95-A｜【運送星辰果實】
- disposition：`INTEGRATED`
- ACTIVE；每5日2000顆、離樹≤10日、60日、失敗撤官爵；首次有效交付後正式計時的本線最小橋接維持。

## 95-B｜伯爵／五階主城守護者／羅蒙高好感層
- disposition：`INTEGRATED`
- 伯爵與五階主城守護者已取得；好感不機械填原著數值80，除非本線正文明示。

## 95-C｜皇家寶庫正常1件→三倍補償後3件
- disposition：`INTEGRATED`
- 第51章已回修；第52章面板已同步為3件。

## 95-D｜星辰果實完整功能
- disposition：`WORLD_BACKGROUND_LOCKED`
- 玩家面板解除當前負面狀態／1小時CD及NPC醫療價值均屬世界硬功能；本線已見至少解除負面價值。

## 95-E｜簡雨朧救沈雲／人情／情感線
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲個人前世／感情／欠人情因果，不移植到Franiya。
- 簡雨朧及其既有人物關係獨立存在，不因本事件消失。

## 95-F｜驛站超過1萬原石＋沈雲主動控制世界前十順序
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya建立的是公證服務與固定批次，不採沈雲私人操控世界排行的策略。
- residual：跨國通道、排行獎勵與服務後果已另行重建。

---

# 第096章｜4和5，報恩與隊友

## 96-A｜全球投訴→3日臨時跨國通道
- disposition：`INTEGRATED`
- 第52章已正式成立。

## 96-B｜離村排名獎勵
- disposition：`WORLD_BACKGROUND_LOCKED`
- 世界4～10暗金、11～30黃金、世界前一萬仍有獎勵等規則保持。

## 96-C｜伯爵完整權限
- disposition：`INTEGRATED`
- NPC尊敬、商店85折、可購莊園、每日6次主動PK豁免均已進Current State。

## 96-D｜五階主城守護者可支配50衛兵
- disposition：`INTEGRATED`
- 基礎權限已取得；實際49衛兵＋馬修統領配置另見103-A，尚需重建。

## 96-E｜世界第四大夢初曉
- disposition：`INTEGRATED`
- 排名／所在主城／人物網已在第54章回修。

## 96-F｜沈雲對大夢初曉前世戀人／報恩理由
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲專屬前世因果，不移植。

## 96-G｜世界第五細雨朦朧大魔王
- disposition：`INTEGRATED`
- 排名／所在主城／人物網已建立。

## 96-H｜沈雲判斷簡雨朧喜歡自己／只當高強度隊友
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人感情線。

---

# 第097章｜雲深不知處是老色痞

## 97-A｜世界第6～10五人完整人物網
- disposition：`INTEGRATED`
- 糖度過高、西江月、青絲縛劍、四海縱橫、半夢半醒已於第54～55章正式入網。

## 97-B｜沈雲選人為掩護大夢初曉／簡雨朧
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲前世與私人策略不存在於Franiya線。

## 97-C｜簡雨朧低公開度／炎黃聯盟刻意壓曝光
- disposition：`WORLD_BACKGROUND_LOCKED`
- 不得因她排名高就把完整家世自動公開給普通玩家。

## 97-D｜7顆月神石排序操作
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya固定批次＋公證完成時間排序，不採沈雲操榜。

## 97-E｜「老色痞」論壇梗
- disposition：`VOID_WITH_CAUSE`
- cause：原梗依賴沈雲故意偏選美女與公開身份觀感，本線沒有同一行為基礎。

---

# 第098章｜真·辣手摧花

## 98-A｜海外高端玩家把華夏高名次視為戰區級裝備差距
- disposition：`INTEGRATED`
- 第55章已建立海外高端圈第一層反應。

## 98-B｜五人抵達光明主城
- disposition：`INTEGRATED`
- 第55章合法交叉。

## 98-C｜沈雲伏擊／殺五人／三三卷軸爆裝
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya無沈雲前世資訊、私人敵意與爆裝策略；本線以額外月神石批次契約重建九件物權轉移。

## 98-D｜青絲縛劍反應速度／糖度過高一次性保命鏈
- disposition：`WORLD_BACKGROUND_LOCKED`
- 屬角色能力／裝備背景，不因伏擊場景作廢；未在Franiya面前實測前不得讓她自動知道。

## 98-E｜火狐炎刀「80點火傷／55%火傷」原著衝突
- disposition：`WORLD_BACKGROUND_LOCKED`
- 現行正式面板採第92章明示80點火傷；保留來源衝突，不自行混算。

---

# 第099章｜貪狼系列，套裝屬性

## 99-A｜PvP隱私部位特殊反制規則
- disposition：`WORLD_BACKGROUND_LOCKED`
- 正常戰鬥合理誤傷不等於惡意針對；不得把規則泛化成所有胸／胯攻擊自動懲罰。

## 99-B｜貪狼鎧甲／戰盔／腿甲
- disposition：`INTEGRATED`
- 第55章已合法取得。

## 99-C｜貪狼系列10件／至少2件才啟動系列判定／力量共鳴套裝
- disposition：`INTEGRATED`
- Franiya已持有4件貪狼系列並觸發系列辨識；未杜撰2／3／4件額外數值。

---

# 第100章｜還是做掉玩家來錢快

## 100-A｜深海水晶球／火焰法杖
- disposition：`INTEGRATED`
- 第55章合法取得。

## 100-B｜不同類型法師增幅可疊加／同類型只計較強者
- disposition：`INTEGRATED`
- 已進Franiya知情層與世界規則。

## 100-C｜避風／避雷／避水／避火珠
- disposition：`INTEGRATED`
- 第55章合法取得四顆。

## 100-D｜天空之城／烏拉諾斯／彼得大帝／一年後跨戰區交匯
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = APPROX_ONE_YEAR_AFTER_SERVER_OPEN_OR_FIRST_SKY_CITY_DATA_PATCH_SIGNAL`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_SKY_CITY_GATE_OPENS_IN_ANY_WARZONE`
- `FIRST_REQUIRED_USE_NODE = FIRST_SKY_CITY_EXTREME_CLIMATE_OR_CROSS_WARZONE_ENTRY`
- `NEXT_RECHECK_TRIGGER = ANY_PETER_THE_GREAT_OR_URANUS_OR_SKY_CITY_OR_ONE_YEAR_DATA_PATCH_SIGNAL`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 四元素珠的極端環境功能必須在此類節點前保持可用，不可遺忘。

## 100-E｜初級游俠轉職【採集彩虹鳥的羽毛】
- disposition：`INTEGRATED`
- 第55章已正式接取；0／200、5日倒數ACTIVE。

## 100-F｜轉職大廳獨立空間／導師分身／轉職後神殿信仰入口
- disposition：`WORLD_BACKGROUND_LOCKED`
- Franiya不因沈雲個人目標而自動選雅典娜神殿。

---

# 第101章｜風再起時

## 101-A｜張文君【香檳怪盜】華夏第10／世界第11離村
- disposition：`REBUILD_REQUIRED`
- 世界11與華夏10本身不依賴沈雲伏擊，應在本線順位推進中保留；延後原因仍是正天集團現實事務牽制。
- `EVENT_WINDOW = IMMEDIATELY_AFTER_WORLD_TOP10_LOCKS_AND_WORLD11_LEAVES_BEGIN`
- `LATEST_SAFE_DEADLINE = BEFORE_NEXT_FORMAL_WORLD_TOP30_RANK_DISPLAY_OR_ANY_SCENE_CALLING_HUAXIA_TOP10_COMPLETE`
- `FIRST_REQUIRED_USE_NODE = FIRST_POST_TOP10_RANKING_OR_ZHANG_WENJUN_GAME_ENTRY_SCENE`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_ANY_RANKING_UPDATE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 101-B｜青絲縛劍公開沈雲伏擊影片／紅臉基尼黃羽翼成商品辨識
- disposition：`VOID_WITH_CAUSE`
- cause：本線沒有沈雲式光明主城伏擊五人，自然不存在同一影片與同款商品熱潮。

## 101-C｜星羽公會存在／全女性大型公會／多家公司注資／霓裳羽衣流量人格
- disposition：`WORLD_BACKGROUND_LOCKED`
- 公會與會長DNA保留。

## 101-D｜霓裳羽衣以「追蹤沈雲」炒流量
- disposition：`VOID_WITH_CAUSE`
- cause：原活動直接依賴沈雲殺女性玩家與影片熱點；Franiya沒有同一事件。
- 若霓裳羽衣未來因Franiya其他公開事件追熱度，必須由當時新因果重建。

## 101-E｜十大會長協調／沈雲已得罪六家／左谷風出作戰計畫
- disposition：`VOID_WITH_CAUSE`
- cause：六家仇怨源自沈雲伏擊與前世路線，Franiya沒有同一敵對網。
- 十大公會本身仍存在，未來反應按Franiya實際行動重算。

---

# 第102章｜購置產業

## 102-A｜黑色暗流現實人臉調查沈雲／前世仇怨推測
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya與黑色暗流沒有沈雲的前世死敵因果；不得無因啟動全國人臉調查。

## 102-B｜沈雲月神石最終4.2億收帳／辱罵差價／超寄照收
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya服務定價、保管、公證與退件邏輯已走不同制度。

## 102-C｜沈雲8000華夏／2000海外操控前一萬分配
- disposition：`VOID_WITH_CAUSE`
- cause：Franiya固定批次、不售順位插隊，不主動操控世界前一萬。

## 102-D｜前100公告、前100後停公告但世界前一萬獎勵仍存在
- disposition：`WORLD_BACKGROUND_LOCKED`
- 未來排行／離村場景必須遵守。

## 102-E｜高手因沈雲伏擊而避開光明主城
- disposition：`VOID_WITH_CAUSE`
- cause：本線沒有該伏擊；第55章反而可能因服務與玩家聚集形成不同人口後果。

## 102-F｜原著月神石後輿論反轉／華夏觀察者AI批霓裳
- disposition：`VOID_WITH_CAUSE`
- cause：原輿論依賴沈雲原本的服務方式、伏擊與霓裳公開操作；Franiya線應按實際服務、公證與世界排行後果重算。

## 102-G｜影子已出現在尚未開放的黑暗帝國死神神殿前
- disposition：`WORLD_BACKGROUND_LOCKED`
- 這是世界自主長線，必須視為已在世界某處發生，不要求Franiya當下知道。
- `SURFACE_RECHECK_TRIGGER = FIRST_SHADOW_OR_DARK_EMPIRE_OR_DEATH_TEMPLE_RELEVANT_WINDOW`
- `LATEST_SAFE_SURFACE = BEFORE_ANY_SCENE_EXPLAINS_NORMAL_ACCESS_TO_DARK_EMPIRE_OR_SHADOW_ROUTE`
- 不可把影子壓成普通出村玩家。

## 102-H｜沈雲大規模購置光明／智慧之城產業
- disposition：`VOID_WITH_CAUSE`
- cause：依賴原著4.2億資金與沈雲投資策略；Franiya沒有同一資金與動機。

## 102-I｜王宮核心區設施：競技場／原初之地／怪物訓練營／全龍餐廳／精靈百花釀
- disposition：`WORLD_BACKGROUND_LOCKED`
- 地點與設施仍存在。

## 102-J｜【地表最強玩家】稱號三個100連勝條件及效果
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_ENTRY_INTO_ORIGINAL_LAND_MODE_OR_PERSONAL_ARENA_OR_MONSTER_TRAINING_CAMP`
- `LATEST_SAFE_DEADLINE = BEFORE_ANY_ONE_OF_THE_THREE_100_WIN_MILESTONES_IS_REACHED`
- `FIRST_REQUIRED_USE_NODE = FIRST_SYSTEM_EVALUATION_TOWARD_GROUND_STRONGEST_PLAYER_TITLE`
- `NEXT_RECHECK_TRIGGER = ANY_OF_THREE_MODES_FORMALLY_ENTERED`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 102-K｜貨幣兌換開啟後國家稅制／玩家商鋪課稅
- disposition：`WORLD_BACKGROUND_LOCKED`
- 當前貨幣兌換未開時不提前課此稅。

## 102-L｜NPC交易官弗蘭好感／NPC有利益與個性
- disposition：`WORLD_BACKGROUND_LOCKED`
- 原著沈雲因巨額消費獲弗蘭100／120好感不移植；但NPC好感可因交易與人物互動改變是硬規則。

## 102-M｜沈雲拍賣行／工匠／100級NPC護衛／黃金店管家／收感知裝備
- disposition：`VOID_WITH_CAUSE`
- cause：依賴沈雲大額置產與哥布林秘境計畫；Franiya沒有同一投資行動。
- NPC僱員、店管家、商業裝修制度本身：`WORLD_BACKGROUND_LOCKED`。

---

# 第103章｜抄家

## 103-A｜50衛兵實際配置＝49金甲衛兵＋統領馬修
- disposition：`REBUILD_REQUIRED`
- Franiya已取得同一五階主城守護者職位，不能只永久停在「可支配50人」抽象面板。
- `EVENT_WINDOW = FIRST_FORMAL_INSPECTION_OR_DEPLOYMENT_OF_GRADE5_MAIN_CITY_GUARDS`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_USE_OF_THE_50_GUARD_AUTHORITY_OR_BEFORE_CH103_EQUIVALENT_WINDOW_IS_CLOSED`
- `FIRST_REQUIRED_USE_NODE = FIRST_GUARD_SUMMON_DEPLOYMENT_OR_PROPERTY_ENFORCEMENT_SCENE`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_ANY_GUARD_OR_MAIN_CITY_AUTHORITY_SCENE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 衛兵等級不得高於官職持有人規則保留。

## 103-B｜馬修【抄家】
- disposition：`REBUILD_REQUIRED`
- 需有「充足理由」才能命令馬修封鎖光明主城玩家產業1小時，每日1次。
- `EVENT_WINDOW = SAME_AS_103_A`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_SCENE_WHERE_FRANIYA_USES_OR_EVALUATES_GUARD_CAPTAIN_SPECIAL_AUTHORITY`
- `FIRST_REQUIRED_USE_NODE = FIRST_LEGAL_PROPERTY_BLOCKADE_OR_GUARD_CAPTAIN_SKILL_INSPECTION`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_FIRST_MATTHEW_APPEARANCE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 馬修之所以優質與羅蒙好感／深淵任務／星辰果長線有關，不能隨機換成普通制式隊長而抹掉功能。

## 103-C｜同一官職附屬NPC品質受君主好感／履歷影響
- disposition：`WORLD_BACKGROUND_LOCKED`

## 103-D｜主城交易所可跨城置產
- disposition：`WORLD_BACKGROUND_LOCKED`

---

# 第104章｜毀天滅地

## 104-A｜對高階NPC亂用探查術會掉好感
- disposition：`WORLD_BACKGROUND_LOCKED`

## 104-B｜聖光秘境／皇家寶庫七層巨塔／第四層／1小時挑選
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = CH56_ROYAL_TREASURY_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_FRANIYA_LEAVES_LIGHT_MAIN_CITY_WITH_THE_CURRENT_3_PICK_VOUCHER_UNUSED`
- `FIRST_REQUIRED_USE_NODE = FIRST_FORMAL_USE_OF_ROYAL_TREASURY_F4_VOUCHER`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 第4層以技能書、一次性卷軸、傳送／特殊道具為主，不得寫成普通裝備倉庫。

## 104-C｜【毀天滅地卷軸】表面面板
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = SAME_CH56_TREASURY_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_TREASURY_SELECTION_IS_FINALIZED`
- `FIRST_REQUIRED_USE_NODE = FIRST_TREASURY_ITEM_SELECTION_SEQUENCE`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 104-D｜真正啟動還需獻祭兩件傳說級裝備
- disposition：`REBUILD_REQUIRED`
- 必須由寶庫守護者在阻止取走卷軸時補出；不能讓Franiya從短面板自動知道。
- `EVENT_WINDOW = GUARDIAN_BLOCKS_DESTROY_HEAVEN_SCROLL`
- `LATEST_SAFE_DEADLINE = BEFORE_GUARDIAN_COMPENSATION_CHANGES_3_PICKS_TO_4`
- `FIRST_REQUIRED_USE_NODE = TREASURY_GUARDIAN_INTERVENTION`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 104-E｜簡短物品面板不保證列出全部啟動條件
- disposition：`WORLD_BACKGROUND_LOCKED`

---

# 第105章｜賦能之書

## 105-A｜守護者阻止毀天滅地→補償改選4件
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = CH56_TREASURY_GUARDIAN_INTERVENTION`
- `LATEST_SAFE_DEADLINE = BEFORE_FINAL_TREASURY_CUSTODY_TRANSFER`
- `FIRST_REQUIRED_USE_NODE = AFTER_DESTROY_HEAVEN_SCROLL_IS_DENIED`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 現行資格起點為3件，不可直接跳成4件。

## 105-B｜【運送星辰果實】後續取得毀天滅地資格條件
- disposition：`DEFERRED_WITH_TRIGGER`
- 條件：完成星辰果實任務且持有兩件傳說級裝備後，才有帶走【毀天滅地卷軸】資格。
- `EVENT_WINDOW = STAR_FRUIT_TRANSPORT_QUEST_COMPLETION_PLUS_TWO_LEGENDARY_ITEMS`
- `LATEST_SAFE_DEADLINE = BEFORE_ANY_ATTEMPT_TO_ACQUIRE_DESTROY_HEAVEN_SCROLL`
- `FIRST_REQUIRED_USE_NODE = FIRST_POST_STARFRUIT_TREASURY_RETURN_FOR_DESTROY_HEAVEN`
- `NEXT_RECHECK_TRIGGER = STAR_FRUIT_QUEST_COMPLETION_OR_SECOND_LEGENDARY_ITEM_ACQUIRED`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 105-C｜超大型空間戒指
- disposition：`REBUILD_REQUIRED`
- 約20個標準足球場空間；稀有度極高。
- `EVENT_WINDOW = CH56_TREASURY_4_PICK_COMPENSATION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_2000_STAR_FRUIT_LARGE_SCALE_LOGISTICS_PREPARATION`
- `FIRST_REQUIRED_USE_NODE = FIRST_LARGE_VOLUME_STAR_FRUIT_COLLECTION_OR_OTHER_BULK_CARGO_USE`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 105-D｜【賦能之書】
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = CH56_TREASURY_4_PICK_COMPENSATION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_SPECIAL_PROFESSION_TRIAL_SCROLL_IS_FIRST_USED`
- `FIRST_REQUIRED_USE_NODE = PROFESSION_TRIAL_SCROLL_ENHANCEMENT_OR_USE`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 原著效果：把1個最佳隱藏職業匹配提升為2個最高適配隱藏職業，各轉化為職業卷軸；不得先讓Franiya知道結果再選書。

## 105-E｜【定位傳送機器】／桑普拉斯／3個月CD
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = CH56_TREASURY_4_PICK_COMPENSATION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_CH106_EQUIVALENT_RETURN_TO_STAR_ABYSS_LOWER_FOREST`
- `FIRST_REQUIRED_USE_NODE = FIRST_REQUIRED_RETURN_TO_STAR_ABYSS_BEFORE_FIXED_TRANSFER_ORB_MARK_EXISTS`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_ANY_STAR_ABYSS_RETURN_PLAN`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 105-F｜第四件「未知圖紙」
- disposition：`REBUILD_REQUIRED`
- `EVENT_WINDOW = CH56_TREASURY_4_PICK_COMPENSATION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_TREASURY_EXIT`
- `FIRST_REQUIRED_USE_NODE = FIRST_LATER_SOURCE_CHAPTER_THAT_NAMES_OR_USES_THIS_BLUEPRINT`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_ANY_BLUEPRINT_DOWNSTREAM_HIT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 本章只能叫「未知圖紙」，不得提前拿後文名稱補進來。

## 105-G｜寶庫守護者至少亞神級的來源尺度
- disposition：`WORLD_BACKGROUND_LOCKED`
- Franiya可依實際可見行為形成有限判斷，不能直接讀作者旁白標籤。

---

# 第106章｜諸神黃昏，人間黎明

## 106-A｜守護者真身：聖安東尼奧／永恆之王／第一任帝王
- disposition：`WORLD_BACKGROUND_LOCKED`
- 作者層世界秘密存在；Franiya未被告知前不得自動知道。

## 106-B｜聖安東尼奧假死／黑暗陣營合作
- disposition：`WORLD_BACKGROUND_LOCKED`
- 光明陣營神明普遍以為其已死；黑暗陣營知道真相的知情差保留。

## 106-C｜芬里爾暗中要求聖安東尼奧照顧主角／合法投資包裝
- disposition：`DEFERRED_WITH_TRIGGER`
- Franiya線芬里爾是否做出完全相同私下請託不能自動照搬；必須依本線芬里爾與Franiya現有關係及守護者實際行為判定。
- `EVENT_WINDOW = CH56_TREASURY_GUARDIAN_SCENE`
- `LATEST_SAFE_DEADLINE = BEFORE_TREASURY_GUARDIAN_BEHAVIOR_IS_FINALIZED`
- `FIRST_REQUIRED_USE_NODE = ANY_EXCEPTIONAL_GUARDIAN_FAVOR_BEYOND_BASE_RULES`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE`
- `MISSED_DEADLINE_ACTION = IF_UNRESOLVED_DO_NOT_GIVE_EXTRA_FAVOR; BLOCK_IF_STORY_ALREADY_RELIES_ON_IT`

## 106-D｜古老預言「滅世魔狼，吞日噬月；諸神黃昏，人間黎明」
- disposition：`WORLD_BACKGROUND_LOCKED`
- 世界長線存在；Franiya不因進寶庫就自動知道。

## 106-E｜定位傳送機器第一次使用回星辰深淵地下森林
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = AFTER_POSITIONING_TELEPORT_DEVICE_IS_LEGALLY_ACQUIRED`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_EFFECTIVE_STAR_FRUIT_DELIVERY_PREPARATION_OR_FIRST_REQUIRED_RETURN_TO_LOWER_FOREST`
- `FIRST_REQUIRED_USE_NODE = FIRST_RETURN_TO_STAR_ABYSS_LOWER_FOREST`
- `NEXT_RECHECK_TRIGGER = AFTER_CH56_TREASURY_EXIT_AND_ANY_STAR_ABYSS_ROUTE_PLAN`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

---

# 第107章｜路見不平

## 107-A｜傳送珠標記地下森林／第一批星辰果物流
- disposition：`REBUILD_REQUIRED`
- 【傳送珠】目前由黑色暗流持有，本線尚未合法取得。
- `EVENT_WINDOW = AFTER_POSITIONING_DEVICE_RETURN_TO_LOWER_FOREST_AND_BEFORE_FIRST_EFFECTIVE_STARFRUIT_DELIVERY`
- `LATEST_SAFE_DEADLINE = BEFORE_FIXED_STAR_ABYSS_LOGISTICS_IS_FIRST_REQUIRED`
- `FIRST_REQUIRED_USE_NODE = CREATE_FIXED_LOWER_FOREST_TRANSFER_MARK`
- `NEXT_RECHECK_TRIGGER = EVERY_PREWRITE_AND_ANY_BLACK_CURRENT_RECONTACT_AND_AFTER_POSITIONING_DEVICE_USE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 107-B｜不同職業初期轉職任務集中日光森林
- disposition：`WORLD_BACKGROUND_LOCKED`
- Franiya目前正前往日光森林完成游俠轉職，世界人口／組隊密度應反映此設計。

## 107-C｜【雷電磁場】500米立體感知含隱身
- disposition：`DEFERRED_WITH_TRIGGER`
- 原始雷鳥羽翼取得路徑已因Franiya選擇差分作廢；功能仍需保留。
- `EVENT_WINDOW = FIRST_NATURAL_THUNDERBIRD_OR_STEALTH_DETECTION_EQUIVALENT_SOURCE`
- `LATEST_SAFE_DEADLINE = BEFORE_CH211_EQUIVALENT_HIDDEN_SPACE_PREWRITE`
- `FIRST_REQUIRED_USE_NODE = CH211_EQUIVALENT_3D_STEALTH_DETECTION`
- `NEXT_RECHECK_TRIGGER = FIRST_THUNDERBIRD_OR_STEALTH_WINDOW + EVERY_PREWRITE_AFTER_CH180_EQUIVALENT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 107-D｜岩石巨獸／5人臨時隊／燃燒軍團12人伏擊／霓裳羽衣在場
- disposition：`WORLD_BACKGROUND_LOCKED`
- 這場野外爭奪可在世界中獨立發生，不依賴沈雲出現；Franiya是否撞上需依當前路徑自然性判定。
- 原著沈雲刻意站進攻擊線讓霓裳變紅名的行為不自動發生。

---

# 第108章｜拔刀相「助」

## 108-A｜霓裳羽衣因沈雲輿論風向修正／買熱搜
- disposition：`VOID_WITH_CAUSE`
- cause：本線沒有沈雲伏擊與原先網路罵戰；霓裳的人設與炒流量能力保留，但未來操作需新事件驅動。

## 108-B｜霓裳以為沈雲看過熱搜並會受她外貌／名氣影響
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲與霓裳的特定認知差，不移植。

## 108-C｜沈雲「拔刀相助」實為搶BOSS
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人行為。

## 108-D｜野外直接掉落裝備通常需鑑定；採集材料通常不需再鑑定
- disposition：`WORLD_BACKGROUND_LOCKED`

---

# 第109章｜神殿來人

## 109-A｜霓裳與同伴被沈雲火焰刀殺死
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲原事件不存在於Franiya線。

## 109-B｜紅名／誤傷5分鐘退紅／殺人才加罪惡值／每人+1／紅名提高爆率
- disposition：`WORLD_BACKGROUND_LOCKED`
- 與早期紅名制度合併使用。

## 109-C｜燃燒軍團追殺／新敵對勢力形成
- disposition：`VOID_WITH_CAUSE`
- cause：原敵對由沈雲主動介入並殺人形成；Franiya未做同一行為。
- 燃燒軍團、星羽公會、東湖山莊作為世界組織本身：`WORLD_BACKGROUND_LOCKED`。

## 109-D｜月神神殿候補神使【洛】登場／沈雲必殺名單33
- disposition：`VOID_WITH_CAUSE`
- cause：追殺沈雲的直接理由是其赫爾墨斯關聯，Franiya沒有此既定前提。
- 【洛】本人與月神神殿候補神使身份：`WORLD_BACKGROUND_LOCKED`；若未來Franiya因自身行為被神殿列敵，須重新建立理由與名單順位。

---

# 第110章｜大地守護鎧甲

## 110-A｜洛反覆殺沈雲至新手村／赫爾墨斯神使仇恨鏈
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲專屬赫爾墨斯關聯。

## 110-B｜法師高階職階：魔導士→魔導師→大魔導師→聖魔導師
- disposition：`WORLD_BACKGROUND_LOCKED`

## 110-C｜洛的海潮／瞬移／大地囚籠／大地守護鎧甲／雷弩／雷谷轟鳴
- disposition：`WORLD_BACKGROUND_LOCKED`
- 這些是洛的能力與世界魔法規則；Franiya未見過前不得自動掌握其完整技能表。

---

# 第111章｜第七感

## 111-A｜11階【雷谷轟鳴】範圍／效果
- disposition：`WORLD_BACKGROUND_LOCKED`

## 111-B｜洛封閉五感摸索雅典娜神殿【第七感】
- disposition：`WORLD_BACKGROUND_LOCKED`
- 第七感是雅典娜神殿核心圈重要能力之一；Franiya不自動選此神殿。

## 111-C｜NPC沒有玩家式「任務完成」提示，只能依自身認知判斷
- disposition：`WORLD_BACKGROUND_LOCKED`

## 111-D｜沈雲以4層貪狼盾＋芬里爾劍柄＋避雷珠等活過雷谷轟鳴
- disposition：`VOID_WITH_CAUSE`
- cause：洛追殺沈雲事件本體不成立；不得為展示同裝備組合硬造同一戰鬥。
- 貪狼盾／避雷珠／魔抗機制仍各自有效。

## 111-E｜魔抗不是簡單加總／原著72～73%混合算例
- disposition：`WORLD_BACKGROUND_LOCKED`
- 保留原著實例，不自造統一加法公式。

## 111-F｜千幻之心不同身份連「氣息」都完全隔離
- disposition：`WORLD_BACKGROUND_LOCKED`
- Franiya第二身份已正式建立；未來高階NPC同時接觸兩身份時必須遵守此規則。
- `FIRST_FIELD_VALIDATION_TRIGGER = FIRST_HIGH_LEVEL_NPC_WITH_PRIOR_MAIN_ID_AURA_MEMORY_MEETS_SECOND_ID`

## 111-G｜沈雲下一步私人七項計畫
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲個人雅典娜、錦繡、項鏈與隱藏職業路線；Franiya只保留自身已合法成立的游俠轉職與職業試煉卷軸責任。

---

# 第112章｜第一次出手

## 112-A｜跨身份裝備技能：已啟動持續效果可保留，但不符職業時不能重新啟動
- disposition：`WORLD_BACKGROUND_LOCKED`
- `FIRST_REQUIRED_USE_NODE = FIRST_CROSS_IDENTITY_ATTEMPT_TO_REACTIVATE_CLASS_RESTRICTED_GEAR_SKILL`

## 112-B｜神殿100貢獻值→本種族血脈覺醒藥劑／各族分支
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_FORMAL_TEMPLE_JOIN_OR_TEMPLE_CONTRIBUTION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_BLOODLINE_AWAKENING_OR_TEMPLE_CONTRIBUTION_EXCHANGE`
- `FIRST_REQUIRED_USE_NODE = FIRST_BLOODLINE_SELECTION_OR_AWAKENING`
- `NEXT_RECHECK_TRIGGER = ANY_TEMPLE_JOIN_CONTRIBUTION_OR_BLOODLINE_EVENT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 112-C｜沈雲第二身份首次公開PvP／華夏語假咒＋精靈語海潮資訊欺騙
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲精靈語知識與特定遭遇不移植。
- Franiya第二身份公開首戰仍依她自己的自然事件決定。

---

# 第113章｜老熟人

## 113-A｜深海水晶球＋火焰法杖不同類型疊加
- disposition：`INTEGRATED`
- 第55章已正式鎖定規則與兩件裝備保管。

## 113-B｜沈雲海潮＋精靈語實戰傷害算例
- disposition：`VOID_WITH_CAUSE`
- cause：精靈語雙倍技巧不屬Franiya既有知識；不得照搬傷害。

## 113-C｜【雨天決行】＝影子弟子／接班候選／希望之星／選秀第一
- disposition：`WORLD_BACKGROUND_LOCKED`

## 113-D｜【冰霜舞步】華夏第一法師級人物／每遊戲換ID外貌
- disposition：`WORLD_BACKGROUND_LOCKED`

## 113-E｜匿名擊殺提示只顯示「姓名隱藏」／只能記臉
- disposition：`WORLD_BACKGROUND_LOCKED`

## 113-F｜沈雲為錦繡選秀再次調整第二身份外貌
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人滲透錦繡計畫。

---

# 第114章｜推測與行動

## 114-A｜重甲高防／高體、犧牲敏捷
- disposition：`WORLD_BACKGROUND_LOCKED`

## 114-B｜霓裳直播哭訴／清酒牧歌借流量評論
- disposition：`VOID_WITH_CAUSE`
- cause：原始殺人／搶怪事件不存在。

## 114-C｜左谷風／清酒牧歌推測沈雲「女人可能是軟肋」
- disposition：`VOID_WITH_CAUSE`
- cause：推測建立在沈雲特定殺人／放過兩女／名聲策略上；Franiya行為資料完全不同。

## 114-D｜簡雨朧與張文君姐妹般關係／張文君護短宣言
- disposition：`WORLD_BACKGROUND_LOCKED`
- 這是人物關係，不因沈雲推測鏈作廢。

## 114-E｜十大準備用錦繡摩擦測沈雲軟肋
- disposition：`VOID_WITH_CAUSE`
- cause：原推理前提不存在。

---

# 第115章｜華夏美女收割機

## 115-A｜華夏觀察者把沈雲上升為青年偶像道德討論／封殺爭議
- disposition：`VOID_WITH_CAUSE`
- cause：依賴沈雲原著殺人、輿論與公開挑釁累積；Franiya沒有同一形象線。

## 115-B｜「華夏美女收割機」外號
- disposition：`VOID_WITH_CAUSE`
- cause：同上。

## 115-C｜沈雲「雲深不知處承載所有惡」身份策略
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人身份品牌策略，禁止套給Franiya。

## 115-D｜論壇留言「信仰里，我就是規則」及世界趨勢
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲主動操作。

## 115-E｜龍寵稀有度／馴服需擊敗＋好感／龍族能力差異
- disposition：`WORLD_BACKGROUND_LOCKED`

## 115-F｜沈雲前世四翼黑龍私人寵物
- disposition：`VOID_WITH_CAUSE`
- cause：前世私人資產／關係，不移植。

---

# 第116章｜雲深不知處的實力

## 116-A｜游俠可用短弓但只能發揮約30%裝備屬性
- disposition：`WORLD_BACKGROUND_LOCKED`
- `FIRST_REQUIRED_USE_NODE = FIRST_FRANIYA_SHORTBOW_INSPECTION_OR_EQUIP_ATTEMPT`

## 116-B｜自由模式弓手無輔助瞄準／半輔助可更適合
- disposition：`WORLD_BACKGROUND_LOCKED`
- 自由模式不是所有職業／情境絕對最優。

## 116-C｜殺約100彩虹鳥後觸發【彩虹鳥領袖】5分鐘追殺
- disposition：`REBUILD_REQUIRED`
- Franiya當前【採集彩虹鳥的羽毛】0／200，正朝日光森林移動，已進入最自然窗口。
- `EVENT_WINDOW = CURRENT_RANGER_FEATHER_TASK_IN_SUNLIGHT_FOREST`
- `LATEST_SAFE_DEADLINE = BEFORE_200_FEATHERS_ARE_COMPLETED_OR_BEFORE_FRANIYA_LEAVES_SUNLIGHT_FOREST_AFTER_MASS_RAINBOW_BIRD_KILLS`
- `FIRST_REQUIRED_USE_NODE = APPROX_100_RAINBOW_BIRD_KILL_AGGRO_THRESHOLD`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_EVERY_RAINBOW_BIRD_COMBAT_CHAPTER`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 白銀Lv12／HP12000／攻274～311／力78／防52／敏119／火抗39%／雷抗2%／俯衝殺、魔法驅散、龍捲風面板按原著保留，探查術仍只能看到部分資訊。

## 116-D｜探查術不給怪物全部資訊
- disposition：`WORLD_BACKGROUND_LOCKED`

## 116-E｜【魔·陽炎腰帶】完整技能
- disposition：`WORLD_BACKGROUND_LOCKED`
- 本體目前仍由黑色暗流持有；Franiya未取得前不得自動知道完整面板，除非公開情報來源成立。
- 取得本體時必須同步【陽炎之力】【陽炎殉爆】與太陽充能／5日鎖限制。

## 116-F｜玩家近戰破不了防可MISS；怪物普通攻擊仍最低1點
- disposition：`WORLD_BACKGROUND_LOCKED`

## 116-G｜彩虹鳥領袖火抗39% vs 後續5%文字矛盾
- disposition：`WORLD_BACKGROUND_LOCKED`
- 不自行統一；面板展示以39%為主，傷害算例保留來源衝突。

---

# 第117章｜得來全不費工夫

## 117-A｜魔獸以晶核儲魔，可直接調動體內魔力施法
- disposition：`WORLD_BACKGROUND_LOCKED`

## 117-B｜新技能【俯空殺】／與貪狼腿甲協同
- disposition：`REBUILD_REQUIRED`
- 本母表已確認技能功能，但「本線取得」前仍需在彩虹鳥領袖SOURCE_NODE確認原文精確掉落／學習邊，禁止只因後文會用就幽靈加入技能欄。
- `EVENT_WINDOW = RAINBOW_BIRD_LEADER_RESOLUTION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_TIGI_OR_OTHER_COMBAT_SCENE_REQUIRES_AERIAL_IMPACT_SKILL_FUNCTION`
- `FIRST_REQUIRED_USE_NODE = FIRST_LEGAL_ACQUISITION_OR_LEARNING_OF_DIVE_KILL`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE_AND_RAINBOW_BIRD_LEADER_SOURCE_AUDIT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 117-C｜蒂姬在日光森林登場
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_NATURAL_TIGI_ENCOUNTER_IN_OR_AFTER_RAINBOW_BIRD_TASK_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_ANY_DOWNSTREAM_TRUE_SELF_SCHOOL_OR_TIGI_QUEST_EVENT_IS_USED`
- `FIRST_REQUIRED_USE_NODE = FIRST_TIGI_CONTACT`
- `NEXT_RECHECK_TRIGGER = CH56_PREWRITE + AFTER_RAINBOW_BIRD_LEADER_RESOLUTION + ANY_BULL_WARRIOR_MASK_CUSTODY_CONFIRMATION`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 是否由牛戰士面具直接引發，先以本線實際保管鏈確認；不得幽靈假設面具在手。

## 117-D｜牛戰士「心上人」說法翻轉為只相處約一週的師弟
- disposition：`DEFERRED_WITH_TRIGGER`
- 與117-C同一窗口；只有蒂姬真正接觸後才可揭露。
- `LATEST_SAFE_DEADLINE = BEFORE_TIGI_QUEST_ACCEPTANCE`
- `FIRST_REQUIRED_USE_NODE = TINGI_RECOGNIZES_BULL_WARRIOR_ITEM_OR_STORY`
- `NEXT_RECHECK_TRIGGER = FIRST_TIGI_CONTACT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 117-E｜真我流
- disposition：`WORLD_BACKGROUND_LOCKED`
- 流派客觀存在；Franiya未接觸前不知道完整理論。

---

# 第118章｜人形女暴龍

## 118-A｜蒂姬第一擊近身壓迫尺度
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_TIGI_CHALLENGE_IF_TRIGGERED`
- `LATEST_SAFE_DEADLINE = BEFORE_TIGI_COMBAT_IS_WRITTEN`
- `FIRST_REQUIRED_USE_NODE = TINGI_FIRST_ATTACK`
- `NEXT_RECHECK_TRIGGER = FIRST_TIGI_CONTACT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 不照搬沈雲2430傷害值給Franiya，實際傷害依本線裝備／屬性重算。

## 118-B｜傳奇任務【蒂姬的幫手】第一環：三輪／3分鐘／失敗死亡
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_TIGI_CHALLENGE_AFTER_VALID_ENTRY`
- `LATEST_SAFE_DEADLINE = BEFORE_TIGI_COMBAT_BEGINS`
- `FIRST_REQUIRED_USE_NODE = FORMAL_QUEST_TRIGGER`
- `NEXT_RECHECK_TRIGGER = FIRST_TIGI_CONTACT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 118-C｜早期是否殺牛戰士會改變蒂姬任務樹
- disposition：`WORLD_BACKGROUND_LOCKED`
- 本線必須按Franiya早期實際選擇判定，不得無視前置選擇直接塞任務。

## 118-D｜蒂姬認得貪狼王氣息
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = FIRST_TIGI_CONTACT_WHILE_FRANIYA_CARRIES_GREED_WOLF_SERIES`
- `LATEST_SAFE_DEADLINE = BEFORE_TIGI_RELATIONSHIP_OR_QUEST_ENTRY_IS_FINALIZED`
- `FIRST_REQUIRED_USE_NODE = TINGI_NOTICES_GREED_WOLF_AURA`
- `NEXT_RECHECK_TRIGGER = FIRST_TIGI_CONTACT`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 118-E｜艾莉／艾米麗／清潔魔法／蒂姬「大陸十位傳奇級強者之一」
- disposition：`WORLD_BACKGROUND_LOCKED`
- 兩名女孩姓名存在原著文字變體，未正式登場前不自行統一錯字版本。

## 118-F｜第二輪蒂姬把屬性壓到與挑戰者近似
- disposition：`DEFERRED_WITH_TRIGGER`
- 與118-B同一挑戰窗口；實際壓制基準按Franiya當時屬性重算。
- `LATEST_SAFE_DEADLINE = BEFORE_SECOND_ROUND_OF_TIGI_CHALLENGE`
- `NEXT_RECHECK_TRIGGER = TINGI_CHALLENGE_ACTIVE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

---

# 第119章｜幻想之舞

## 119-A｜沈雲現實異能者／正規格鬥訓練／頂級格鬥水準
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人履歷；Franiya以自己的漫長戰鬥閱歷與既定能力DNA施工，不照搬此履歷。

## 119-B｜蒂姬紅／青氣勁與自然元素混入氣勁推測
- disposition：`WORLD_BACKGROUND_LOCKED`
- 「能混入自然元素」在此仍是沈雲戰中推測，不得升格成完整真我流客觀理論。

## 119-C｜【幻想之舞】約3秒100連擊／大量殘像／可快速耗盡2萬貪狼盾
- disposition：`DEFERRED_WITH_TRIGGER`
- `EVENT_WINDOW = TINGI_CHALLENGE_IF_FORMALLY_TRIGGERED`
- `LATEST_SAFE_DEADLINE = BEFORE_FANTASY_DANCE_FIRST_USE`
- `FIRST_REQUIRED_USE_NODE = FIRST_TIGI_FANTASY_DANCE`
- `NEXT_RECHECK_TRIGGER = TINGI_CHALLENGE_ACTIVE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`
- 實際對Franiya造成的護盾／血量結果需按當時狀態重算。

---

# 第120章｜絞殺

## 120-A｜沈雲以裸絞破解幻想之舞
- disposition：`VOID_WITH_CAUSE`
- cause：沈雲私人格鬥選擇；Franiya不可被迫照演同一招。

## 120-B｜《信仰》人類NPC人體構造與現實人類相同
- disposition：`WORLD_BACKGROUND_LOCKED`
- 現實格鬥控制在屬性／生理條件成立時可有效，但不能無視力量差、種族與技能。

## 120-C｜蒂姬因壓屬性＋缺乏裸絞應對經驗才會被控制
- disposition：`DEFERRED_WITH_TRIGGER`
- 只有未來本線真的出現相同性質的生理控制時才重檢；不要求重演裸絞。
- `EVENT_WINDOW = IF_FRANIYA_USES_ANATOMICAL_CONTROL_ON_HUMAN_NPC`
- `LATEST_SAFE_DEADLINE = BEFORE_RESULT_OF_SUCH_CONTROL_IS_WRITTEN`
- `FIRST_REQUIRED_USE_NODE = FIRST_ANATOMICAL_CONTROL_SCENE`
- `NEXT_RECHECK_TRIGGER = ANY_GRAPPLE_CHOKE_OR_VASCULAR_CONTROL_SCENE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

## 120-D｜普通人4～6秒／蒂姬約30秒耐受
- disposition：`WORLD_BACKGROUND_LOCKED`
- 只作原著尺度；本線人物實際耐受依當時屬性／能力重算。

## 120-E｜艾莉／艾米麗／艾麗亞等姓名文字不一致
- disposition：`WORLD_BACKGROUND_LOCKED`
- `SOURCE_NAME_CONFLICT = PRESERVE_UNRESOLVED_UNTIL_FIRST_FORMAL_APPEARANCE_SOURCE_RECHECK`

---

# 跨章硬規則與當前阻擋摘要

## 已完成／已鎖世界背景

- 第91～100大部分功能已於第49～55章及歷史回修整合。
- 第41／48／51／52「貝克隱瞞→三倍補償→皇家寶庫3選」已完成回修。
- 天空之城、影子死神神殿、世界排行／產業／稅制／NPC／神殿／血脈／PvP／魔法／種族／格鬥等未當下入正文的硬設定，已各自取得正式 disposition，不再只是研究檔孤島。

## 第56章前仍需當前PREWRITE直接處理的 `REBUILD_REQUIRED`

1. `101-A` 張文君【香檳怪盜】華夏10／世界11順位事件。
2. `103-A/B` 49金甲衛兵＋馬修統領＋【抄家】權限，至少要在首次實際使用50衛兵前完成，且第56章PREWRITE必須決定是否當章落地。
3. `104-B/C/D` 聖光秘境／皇家寶庫／毀天滅地／隱藏兩傳說條件。
4. `105-A/C/D/E/F` 3選→4選補償、超大型空間戒指、賦能之書、定位傳送機器、未知圖紙。
5. `116-C` 彩虹鳥領袖已進當前游俠轉職任務窗口，但可在實際約100隻擊殺門檻時落地，不要求第56章開場立刻出現。
6. `117-B` 【俯空殺】需在彩虹鳥領袖來源節點前補精確取得邊；在確認前禁止幽靈進技能欄。
7. `107-A` 傳送珠固定星辰深淵標記仍被黑色暗流保管鏈阻擋，硬截止不變。

## 當前母表覆蓋Gate

- `SOURCE_CAPTURE_RANGE = CH091_TO_CH120`
- `SOURCE_CAPTURE_CHAPTER_COUNT = 30`
- `UNRESOLVED_SOURCE_EVENT_COUNT = 0`
- `UNCLASSIFIED_SOURCE_SUBSECTION_COUNT = 0`
- `SOURCE_CAPTURE_EVENT_BY_EVENT_AUDIT = COMPLETE`
- `SOURCE_CAPTURE_COVERAGE_GATE = PASS`
- `SOURCE_CAPTURE_READ != SOURCE_EVENT_PROCESSED`
- `NEXT_FORMAL_CHAPTER_BUILD`仍需通過active queue中的其他硬阻擋與第56章PREWRITE，不因本矩陣PASS而自動寫正文。

## 永久延伸

121章之後每一份SOURCE_CANON_CAPTURE母表，在其範圍第一次被正式改寫游標觸及前，都必須建立同型逐事件驗收矩陣。未分類事件數不是0，就不得跨窗。
