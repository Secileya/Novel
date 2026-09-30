# SOURCE RETRO｜原著117【俯空殺】與彩虹鳥領袖掉落補證

> 日期：2026-10-01  
> 狀態：`FIRST_HAND_SOURCE_REPAIR / ACTIVE_OVERRIDE`  
> 觸發：使用者提供原著第117章〈得來全不費工夫〉第一手閱讀截圖。

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

因此舊判定：

`DIVE_KILL_EXACT_ACQUISITION_EDGE = SOURCE_FACT_UNRESOLVED`

正式作廢，改為：

`DIVE_KILL_EXACT_ACQUISITION_EDGE = RAINBOW_BIRD_LEADER_DROP`

`RAINBOW_BIRD_LEADER_DROPS_DIVE_KILL_SKILLBOOK = TRUE`

`RAINBOW_BIRD_LEADER_DROPS_SILVER_HEAVY_SWORD = TRUE`

## 二、Franiya分支的客觀結果

第61章Franiya／折光已合法擊殺同一事件鏈中的【彩虹鳥領袖】。

依永久規則：

`VOID_METHOD != VOID_LEGAL_REWARD`

`OBJECTIVE_REACHABLE_DROP_CANNOT_DISAPPEAR_BECAUSE_PROTAGONIST_CHANGED = TRUE`

因此同輪RETRO修復為：

- 【俯空殺技能書】：`ACQUIRED / HELD_SKILLBOOK / NOT_LEARNED_YET`。
- 理由：當下ACTIVE身份是精靈法師【折光】；技能書明確是游俠技能。現階段不自行假定跨身份能立即學習，等待切回主身份或取得系統明示再處理。
- 【俯空殺】技能本體：`NOT_LEARNED_YET / NOT_IN_SKILL_BAR_YET`，但不得再寫成「技能書未取得」。
- 白銀級重劍：`ACQUIRED / HELD_NOT_EQUIPPED`。
- 截圖目前只鎖到「白銀裝備＋重劍」，未提供名稱與完整面板，因此名稱／數值不得自行補完。

## 三、正文修復

`01_章節/061_第六十一章_第一百隻之後.md` 已RETRO補回：

- 領袖屍體下方兩件掉落；
- 【俯空殺】技能書完整可見功能；
- 白銀級重劍；
- 折光將技能書與重劍收進物品欄；
- 明確區分「看懂俯衝」與「合法取得技能書」；
- 明確區分「取得技能書」與「已學會技能」；
- 不因Franiya全武器精通便幽靈無視遊戲職業／身份裝備規則。

## 四、SOURCE分類修正

原第117章：

`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH_WITH_SOURCE_EDGE_RESIDUAL`

改為：

`CH117 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

【俯空殺】取得邊殘留已關閉。

僅白銀重劍的**名稱／完整面板**仍屬未鎖SOURCE細節，這不影響「裝備客觀掉落＋Franiya合法取得」成立。

`CH117_DIVE_KILL_ACQUISITION_RETRO = PASS`
`LEGAL_REWARD_PRESERVATION_GATE = PASS`
`ASSET_LEDGER_REPAIR_REQUIRED = TRUE`
