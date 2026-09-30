# 第61章【俯空殺】與BOSS掉落RETRO v1.0

> 日期：2026-10-01  
> 狀態：`RETRO_REPAIR_COMPLETE / WAIT_FINAL_CLOSE`

## 一、觸發原因

使用者提供原著第117章〈得來全不費工夫〉第一手閱讀截圖，補足舊SOURCE研究遺漏的關鍵客觀事件：

1. 彩虹鳥領袖死亡後，沈雲從領袖屍體下摸到**一本技能書＋一件白銀裝備**。
2. 白銀裝備明確是**重劍**。
3. 技能書明確是游俠技能【俯空殺】。
4. 【俯空殺】：150%基礎傷害；自由模式依技能完成度與跳躍高度評估；CD50秒。
5. 原著旁白明示此技能在游俠導師處也無法學到。

舊研究因此錯把【俯空殺】取得邊標為`SOURCE_FACT_UNRESOLVED`，並讓第61章正文錯過了兩件合法BOSS掉落。

這屬於可確定修正，依專案規則必須同輪修正文＋SOURCE＋資產／狀態／知識／Queue／Audit／交接，不得只口頭說明。

## 二、正式修正結論

`DIVE_KILL_EXACT_ACQUISITION_EDGE = RAINBOW_BIRD_LEADER_DROP`

`DIVE_KILL_SKILLBOOK_ACQUIRED_BY_FRANIYA = TRUE`

`DIVE_KILL_SKILLBOOK_STATUS = HELD_SKILLBOOK_NOT_LEARNED_YET`

`DIVE_KILL_SKILL_LEARNED_BY_FRANIYA = FALSE`

`DIVE_KILL_SKILL_STATUS = NOT_LEARNED_YET / NOT_IN_SKILL_BAR_YET`

`SILVER_HEAVY_SWORD_ACQUIRED_BY_FRANIYA = TRUE`

`SILVER_HEAVY_SWORD_STATUS = HELD_NOT_EQUIPPED`

### 為什麼技能書沒有直接變成已學技能

- 第61章當下ACTIVE身份是精靈法師【折光】。
- 【俯空殺】第一手SOURCE明確是游俠技能。
- 本專案尚未鎖定「第二身份法師使用游俠技能書時，技能會如何跨身份登記」的系統規則。
- 因此最低風險合法狀態是：**取得技能書 → 收進物品欄 → 尚未使用／尚未學習**。

固定：

`SKILLBOOK_ACQUIRED != SKILL_LEARNED`

`DIVE_KILL_PHYSICAL_UNDERSTANDING != DIVE_KILL_SKILLBOOK_ACQUISITION`

`DIVE_KILL_SKILLBOOK_ACQUISITION != DIVE_KILL_SKILL_LEARNED`

### 為什麼白銀重劍也必須保留

原著「沈雲用不上」是沈雲的私人職業／裝備結果，不是掉落不存在。

Franiya分支已合法擊殺同一事件節點的領袖，因此：

`VOID_METHOD != VOID_LEGAL_REWARD`

合法客觀掉落不能因主角替換而消失。

但第一手截圖目前只鎖定「白銀裝備＋重劍」，未鎖正式名稱／完整面板，故不自行補完。

## 三、第61章正文RETRO

正式正文已補入：

- 領袖屍體下兩道掉落光；
- 【俯空殺】技能書；
- 技能書可見功能與CD；
- 折光區分「看懂俯衝」與「合法取得技能書」；
- 技能書收進物品欄，沒有在法師身份下直接學習；
- 白銀級重劍收進物品欄，未裝備；
- 後續回顧同步知道領袖確實掉落這兩件資產。

正文RETRO commit：

`f6991aa6766e3fa4bf8456b01c26828050229282`

## 四、SOURCE修復

### 新增第一手補證

`05_原著參考/39_SOURCE_RETRO_117_俯空殺與BOSS掉落.md`

commit：

`922a6f42a8a89cc830bbc299d97281b379ab7bcb`

### 修正現行LIVE

`05_原著參考/38_SOURCE_LIVE_REBUILD_116-118_CH61.md`

commit：

`f7ac66eeddb89d71a19ebcbad66e277dae67b509`

修正後：

`CH117 = FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

不再保留`WITH_SOURCE_EDGE_RESIDUAL`。

## 五、同步檔與commit

- Current State：`32241c8e8ff762d5c81fc7db79787baf16fd089a`
- 未完成因果：`8a74f457d86a27ff39fdb9858d394f026ce83644`
- 第61章知識矩陣：`b6b7cca8bdc4f2812110f9460e7df8265c0d96af`
- 第61章章節索引：`e0522f0f6061c27bba7c7c15c23a692d8931ddde`
- 有效性／同步稽核：`d983567f5018820c5967b97f9efea385ae6d068c`
- Active Queue：`157b9c1eb52e703366f195fb28acb8ec6161d872`
- 09資產Ledger：`471490f0c873972670b2553fcc553cf46d9834ff`
- 專案交接：`06f109b655ee9a2b2bfdba36aa485a4d2a053fcb`
- 第61章POSTWRITE：`2ba702824dfeda8bae1fab4bb939e5e26248589a`
- 第61章交易同步204：`f6fbb80dd6f290cc53a6a5064cf417ce0aa87f74`
- 舊205 close改標歷史／被RETRO覆蓋：`b7dff0a28f7fcbfc51f30e97e8185b85b91ad77b`

## 六、SOURCE逐章狀態

### CH116
`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

100殺觸發、5分鐘追殺、領袖身份／能力功能保留；具體戰鬥依法重算。

### CH117
`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

領袖掉落【俯空殺技能書】＋白銀重劍、魔獸體內儲魔、蒂姬登場、牛戰士關係翻轉、真我流入口全部已有正式去向。

### CH118
`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`

蒂姬第一擊、三輪3分鐘傳奇第一環、牛戰士存活前置、貪狼王氣息、兩名女孩／淨化、第二輪前壓低屬性全部落地。

`EVENT_CONSUMPTION_CURSOR = THROUGH_CH118`

本次RETRO**沒有消耗新的SOURCE章節**。

## 七、VOID

`RETRO_NEW_VOID_WITH_CAUSE_COUNT = 0`

本次不是新增VOID，而是修復先前漏掉的合法客觀掉落。

## 八、下一章影響

第62章仍從原著119起，直接承接蒂姬第二輪。

新增硬Gate：

- 若第62章要讓Franiya真正學會／使用【俯空殺】，先核當前ACTIVE身份與技能書使用／技能登記規則。
- 不得因技能書已在物品欄，就直接把【俯空殺】寫進技能欄。
- 白銀重劍保持HELD_NOT_EQUIPPED，除非正文建立合法裝備動作與條件。

`RETRO_BODY_TO_STATE_RECONCILIATION = PASS`
`LEGAL_REWARD_PRESERVATION_GATE = PASS`
`ASSET_LEDGER_RETRO_GATE = PASS`
`KNOWLEDGE_RETRO_GATE = PASS`
`FINAL_RETRO_CLOSE_REQUIRED = TRUE`
