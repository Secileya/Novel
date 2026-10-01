# SOURCE RETRO｜原著117【俯空殺】與彩虹鳥領袖掉落補證

> 日期：2026-10-01  
> 狀態：`FIRST_HAND_SOURCE_REPAIR / ACTIVE_OVERRIDE / TERMINAL_STATE_RETRO_CORRECTED`  
> 觸發：使用者提供原著第117章〈得來全不費工夫〉第一手閱讀截圖；2026-10-01再以原著捕捉的「新技能【俯空殺】」終態做反向核對。

## 一、第一手證據新增鎖定

原著第117章在【彩虹鳥領袖】死亡後，沈雲直接摸取領袖屍體下方掉落，明確得到：

1. **一本技能書**；
2. **一件白銀裝備**；
3. 白銀裝備明確是一把**重劍**；
4. 技能書明確為游俠技能【俯空殺】。

【俯空殺】原文功能：

- 高高躍起，借助下落時的衝擊力對敵人進行一次強力打擊；
- 基礎造成150%傷害；
- 自由模式下依技能完成度及跳躍高度評估傷害；
- 冷卻時間50秒；
- 原著旁白另明確說明：這是游俠導師處也無法學到的游俠技能。

原著母抓取`05_原著事件捕捉_091-120.md`後續把它記為「新技能【俯空殺】」，因此來源鏈不能只停在「技能書掉落」中間態；原著終態還包含技能進入技能層。

因此舊判定：

`DIVE_KILL_EXACT_ACQUISITION_EDGE = SOURCE_FACT_UNRESOLVED`

正式作廢，改為：

`DIVE_KILL_EXACT_ACQUISITION_EDGE = RAINBOW_BIRD_LEADER_DROP`

`RAINBOW_BIRD_LEADER_DROPS_DIVE_KILL_SKILLBOOK = TRUE`

`RAINBOW_BIRD_LEADER_DROPS_SILVER_HEAVY_SWORD = TRUE`

`ORIGINAL_DIVE_KILL_TERMINAL_STATE = LEARNED_SKILL`

## 二、Franiya分支的客觀結果

第61章Franiya／折光已合法擊殺同一事件鏈中的【彩虹鳥領袖】。

依永久規則：

`VOID_METHOD != VOID_LEGAL_REWARD`

`OBJECTIVE_REACHABLE_DROP_CANNOT_DISAPPEAR_BECAUSE_PROTAGONIST_CHANGED = TRUE`

`OBJECTIVE_TERMINAL_STATE_CANNOT_BE_DOWNGRADED_TO_INTERMEDIATE_STATE_WITHOUT_CAUSE = TRUE`

### 第61章當下中間態

- 【俯空殺技能書】：`ACQUIRED / HELD_SKILLBOOK / TEMPORARILY_NOT_REGISTERED`。
- 當下ACTIVE身份是精靈法師【折光】；技能書明確是游俠技能，因此第61章不越權假定法師身份可直接登記游俠技能。
- 這只允許形成**短暫中間態**，不能被錯寫成「原著客觀結果因此改成永久不學」。
- 白銀級重劍：`ACQUIRED / HELD_NOT_EQUIPPED`。
- 截圖目前只鎖到「白銀裝備＋重劍」，未提供名稱與完整面板，因此名稱／數值不得自行補完。

### 第一個合法終態窗口

第63章身份鎖解除後，折光第一次合法切回Franiya游俠主身份。此時不存在職業衝突，且原著終態為【俯空殺】成為技能，因此必須立即完成：

- 【俯空殺技能書】：`CONSUMED_CH63`。
- 【俯空殺】：`ACQUIRED / LEARNED / IN_PRIMARY_SKILL_BAR`。
- 技能已知效果：150%基礎傷害；自由模式依完成度／跳躍高度評估；CD50秒。

`DIVE_KILL_FIRST_LEGAL_REGISTRATION_WINDOW = CH63_FIRST_SWITCH_BACK_TO_PRIMARY_RANGER`
`DIVE_KILL_TERMINAL_STATE = LEARNED`

## 三、正文修復

`01_章節/061_第六十一章_第一百隻之後.md` 已RETRO補回：

- 領袖屍體下方兩件掉落；
- 【俯空殺】技能書完整可見功能；
- 白銀級重劍；
- 折光將技能書與重劍收進物品欄；
- 明確區分「看懂俯衝」與「合法取得技能書」。

`01_章節/062_第六十二章_看見不等於跟得上.md` 已進一步修正：

- 不再把`技能書已取得／技能未學`寫成可無限期維持的終態；
- 明示當下只因ACTIVE身份為法師折光而暫緩登記；
- 下一次切回游俠主身份即為第一合法處理窗口。

`01_章節/063_第六十三章_同一扇門，兩個答案.md` 已正式落地終態：

- 第一次切回Franiya主身份後使用技能書；
- 技能書消耗；
- 【俯空殺】正式學會並進主身份技能欄。

## 四、SOURCE分類修正

原第117章：

`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH_WITH_SOURCE_EDGE_RESIDUAL`

後續曾暫記：

`SKILLBOOK_ACQUIRED / SKILL_NOT_LEARNED_YET`

現行改為：

`CH117 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

`DROP_EDGE = CLOSED`

`TERMINAL_SKILL_STATE = RESOLVED_CH63`

僅白銀重劍的**名稱／完整面板**仍屬未鎖SOURCE細節，這不影響「裝備客觀掉落＋Franiya合法取得」成立。

## 五、永久門禁

若原著事件鏈明確具有：

`取得物 → 使用／學習／開啟／結算 → 最終狀態`

改寫線因當下身份、職業、CD、地點或其他合法條件只能先完成前半段時，必須：

1. 標記為`TEMPORARY_INTERMEDIATE_STATE`，不得冒充終態；
2. 建立`FIRST_LEGAL_TERMINAL_WINDOW`；
3. 每章PREWRITE重檢直到終態完成；
4. 若要永久改變原著終態，必須有明確衝突證據＋PRESERVATION_DELTA＋最終報告公開理由；
5. 「暫時不能做」不得偷換成「因此永遠不做」。

`CH117_DIVE_KILL_ACQUISITION_RETRO = PASS`
`LEGAL_REWARD_PRESERVATION_GATE = PASS`
`OBJECTIVE_TERMINAL_STATE_GATE = PASS_AFTER_CH63_REPAIR`
