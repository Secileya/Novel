# SOURCE LIVE REBUILD｜原著116～118 → 第61章

> 日期：2026-10-01  
> 狀態：`CURRENT_LIVE_SOURCE_OVERLAY / CH61 / RETRO_REPAIRED_BY_39`  
> 對應正文：`01_章節/061_第六十一章_第一百隻之後.md`  
> 最新補證：`05_原著參考/39_SOURCE_RETRO_117_俯空殺與BOSS掉落.md`

## 一、總結

第61章承接第60章章末【折光】仍在日光森林、羽毛7／200、彩虹鳥擊殺0的狀態。Franiya因自然落羽效率不足，自行改用合法狩獵採集；實際擊殺到第100隻後，才觸發原著116的【彩虹鳥領袖】5分鐘追殺。領袖死亡後取得原著117客觀掉落【俯空殺技能書】與一把白銀級重劍，再自然接入蒂姬／真我流線，並在第118章責任所要求的第一輪考驗、傳奇任務、貪狼王氣息辨認與屬性壓制完成後停在第二輪剛開始。

`EVENT_CONSUMPTION_CURSOR = THROUGH_CH118`
`NEXT_SOURCE_WINDOW = CH119_FORWARD`

---

## 二、CH116｜彩虹鳥領袖

### ORIGINAL_EVENT
- 游俠／弓手存在短弓與輔助瞄準相關世界規則。
- 約100隻彩虹鳥被殺後，Lv12白銀【彩虹鳥領袖】觸發5分鐘追殺。
- 探查術不會一次給出怪物全部資訊。
- 領袖具高空俯衝、魔法驅散、龍捲風等能力；原著面板／文字另有火抗39%與後文5%算例衝突，來源衝突不自行抹平。
- 怪物普通攻擊／玩家破防等規則與【魔·陽炎腰帶】完整資料屬世界背景責任。

### PRESERVATION_DELTA
- `RAINBOW_BIRD_100_KILL_TRIGGER = PRESERVED`
- `LEADER_5_MINUTE_PURSUIT = PRESERVED`
- `LEADER_LV12_SILVER_12000HP = PRESERVED`
- `PROBE_NOT_FULL_INFORMATION = PRESERVED`
- 領袖具體戰鬥結果依Franiya／折光當下能力、裝備與選擇重算。

### REWRITE_DISPOSITION
- 第61章從擊殺0實際累積至100，沒有提前知道「100必觸發」。
- 第100隻死亡後才收到系統警告並觸發領袖。
- 折光透過實際前兆讀取領袖體內魔力核心、俯衝、驅散、風系結構；官方語義只在系統明示時取得。
- 【海潮】【火雨降臨】均評估但未使用；以低耗自由構築與完美時機處理領袖。
- 領袖死亡；5分鐘追殺結束。
- 原著117補證確認領袖死亡後存在兩件客觀掉落，本線不得因主角替換而刪除合法獎勵。

### REWRITE_RESULT
`CH116 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

### RESIDUAL_STATUS
- 游俠短弓／瞄準等未當場需要的客觀規則保持`WORLD_BACKGROUND_LOCKED`。
- 原著火抗文字衝突保持未統一，不影響本章正文。

---

## 三、CH117｜俯空殺／蒂姬／真我流入口

### ORIGINAL_EVENT
- 魔獸可藉體內晶核儲魔並直接調用魔力。
- 【彩虹鳥領袖】死亡後，沈雲從領袖屍體下取得**一本技能書＋一件白銀裝備**。
- 白銀裝備明確是一把**重劍**。
- 技能書明確為游俠技能【俯空殺】；原著旁白指出游俠導師處也無法學到此技能。
- 【俯空殺】：高高躍起後借下墜衝擊攻擊，150%基礎，自由模式依完成度／跳躍高度評估傷害，CD50秒。
- 蒂姬於日光森林正式登場。
- 牛戰士所謂「心上人」方向翻轉：實際只與蒂姬相處約一週，為其師弟。
- 牛戰士真正功能是替真我流尋找更合適的候選者；「找到蒂姬」不是終點，而是流派資格入口。

### PRESERVATION_DELTA
- `MONSTER_INTERNAL_MANA_CORE_FUNCTION = PRESERVED`
- `RAINBOW_BIRD_LEADER_DROPS_DIVE_KILL_SKILLBOOK = PRESERVED`
- `RAINBOW_BIRD_LEADER_DROPS_SILVER_HEAVY_SWORD = PRESERVED`
- `TIGI_FIRST_CONTACT = PRESERVED`
- `BULL_WARRIOR_RELATIONSHIP_REVEAL = PRESERVED`
- `TRUE_SELF_STYLE_ENTRY_FUNCTION = PRESERVED`
- 【俯空殺】技能功能、世界存在性與精確掉落來源均已由第一手截圖鎖定。

### REWRITE_DISPOSITION
- 領袖戰中正式觀測到「體內穩定高密度魔力核心→直接調用」的客觀作用；折光只以「晶核類型」作自身描述，不宣告當地正式學術名。
- 領袖死亡後，折光合法拾取【俯空殺技能書】與一把白銀級重劍。
- 【俯空殺技能書】先收進物品欄，沒有在【折光】法師身份下擅自假定可跨身份直接學習。
- 白銀級重劍同樣收入物品欄，沒有因Franiya全武器精通就無視遊戲身份／職業裝備條件當場裝備。
- 領袖死亡後，蒂姬依合法地理／任務鏈自然登場。
- Franiya取出但沒有佩戴【牛戰士面具】，讓蒂姬確認來源。
- 蒂姬親口揭露牛戰士只短暫跟隨約一週、稱她師姐，以及真正目的為尋找真我流候選者。
- Franiya正式合法知道「真我流」名稱，但尚不知道完整流派理論。

### DIVE_KILL SOURCE BOUNDARY
`DIVE_KILL_SKILL_EXISTS = SOURCE_LOCKED`
`DIVE_KILL_FUNCTION = SOURCE_LOCKED`
`DIVE_KILL_EXACT_ACQUISITION_EDGE = RAINBOW_BIRD_LEADER_DROP`
`DIVE_KILL_SKILLBOOK_ACQUIRED_BY_FRANIYA = TRUE`
`DIVE_KILL_SKILL_LEARNED_BY_FRANIYA = FALSE`
`DIVE_KILL_SKILLBOOK_STATUS = HELD_SKILLBOOK_NOT_LEARNED_YET`
`SILVER_HEAVY_SWORD_STATUS = HELD_NOT_EQUIPPED`

固定區分：

`DIVE_KILL_PHYSICAL_UNDERSTANDING != DIVE_KILL_SKILLBOOK_ACQUISITION`

`DIVE_KILL_SKILLBOOK_ACQUISITION != DIVE_KILL_SKILL_LEARNED`

### REWRITE_RESULT
`CH117 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

### RESIDUAL_STATUS
- 【俯空殺】取得邊殘留已關閉。
- 技能書何時／以哪個身份正式使用並登記技能，依後續合法系統條件處理；目前只鎖「已持有、未學」。
- 白銀級重劍的名稱／完整面板目前未由使用者截圖鎖定，不自行補完；不影響其客觀掉落與持有成立。
- 真我流完整理論仍UNKNOWN，依後續蒂姬線逐步揭露。

---

## 四、CH118｜蒂姬第一環考驗

### ORIGINAL_EVENT
- 蒂姬第一擊具有極高近身壓迫；原著沈雲硬擋受到2430傷害等數值屬沈雲結果，不可直接套給Franiya。
- 任務轉為傳奇【蒂姬的幫手】第一環：三輪攻勢／3分鐘／失敗死亡／成功進後續。
- 早期是否殺牛戰士會改變蒂姬任務樹。
- 蒂姬可從貪狼系列辨認傳奇魔獸【貪狼王】氣息，且過去曾與貪狼王接觸／交手。
- 兩名金髮黑鐵級女孩與蒂姬親近；其中一人有清理／淨化魔法；其姓名在來源文字存在變體。
- 有「蒂姬屬大陸十位傳奇級強者之一」的角色／世界說法。
- 第二輪前蒂姬會把自身屬性主動壓到與挑戰者近似，以測真正格鬥／實戰能力。

### PRESERVATION_DELTA
- `TIGI_FIRST_ATTACK_FUNCTION = PRESERVED`
- `LEGENDARY_QUEST_RING1_STRUCTURE = PRESERVED`
- `BULL_WARRIOR_SURVIVAL_PREREQUISITE = PRESERVED`；Franiya早期未殺牛戰士，因此入口成立。
- `TIGI_RECOGNIZES_GREED_WOLF_KING_AURA = PRESERVED`
- `TIGI_SELF_SUPPRESSION_BEFORE_NEXT_ROUND = PRESERVED`
- 沈雲2430傷害與其具體擋法不移植；Franiya依自身能力與角色殼重算。

### REWRITE_DISPOSITION
- 蒂姬第一擊以前，Franiya已從腳底壓力、重心、肌群／關節傳力等讀到前兆，以最低足夠動作提前離開攻擊線，未受傷。
- 傳奇任務正式更新為【蒂姬的幫手】第一環；三輪／3分鐘／失敗死亡／成功開啟後續。
- 蒂姬辨認Franiya持有物中的貪狼王氣息；Franiya短暫取出【貪狼之爪】供確認後收回，沒有裝備。
- 蒂姬只據此知道眼前精靈法師帶有貪狼王相關裝備，不因此知道【折光】＝Franiya或第二身份機制。
- 兩名金髮女孩正式出場；其中一人展示清理／淨化性質的魔法。由於SOURCE姓名存在變體，本章不自行替她們鎖定姓名。
- 蒂姬主動壓低輸出／速度／身體作用到接近挑戰者區間；章末宣告「第二輪」，但未進入原著119的【幻想之舞】等內容。

### REWRITE_RESULT
`CH118 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

### RESIDUAL_STATUS
- 【蒂姬的幫手】第一環仍`ACTIVE`，倒數尚餘2分鐘以上；第二輪剛開始。
- 真我流學習資格尚未判定。
- 原著119為下一SOURCE入口。

---

## 五、VOID／知識／資產

`CH61_NEW_VOID_WITH_CAUSE_COUNT = 0`

- 本輪沒有把任何仍需保留的116～118客觀事件以VOID刪除。
- 沈雲專屬數值／擋法只是不移植其私人結果，正文直接依Franiya分支重算，未建立新的VOID項。
- 【牛戰士面具】仍`HELD_NOT_WORN`。
- 【貪狼之爪】仍`HELD`；只短暫取出確認氣息，沒有裝備。
- 【海潮】／【火雨降臨】均READY，本章評估後未使用。
- 【俯空殺技能書】：`HELD_SKILLBOOK_NOT_LEARNED_YET`。
- 【俯空殺】技能：`NOT_LEARNED_YET / NOT_IN_SKILL_BAR_YET`。
- 白銀級重劍：`HELD_NOT_EQUIPPED`；名稱／完整面板未鎖。

## 六、下一窗口

`NEXT_SOURCE_WINDOW = CH119_FORWARD`

- CH119：蒂姬紅／青氣勁與自然元素的戰中推測邊界、【幻想之舞】、沈雲私人現實格鬥履歷等。
- 第62章PREWRITE必須從第61章章末「第二輪剛開始」直接承接，不得跳過第一環倒數或提前宣告真我流資格。
- 若第62章涉及【俯空殺】，必須先判定當下ACTIVE身份、技能書使用資格與系統是否允許將技能登記到主身份；不得把「已持有技能書」直接偷換成「已學會技能」。
