# 章節索引｜第63章 RETRO 增量

狀態：`ACTIVE / SUPERSEDES_06L_ON_ALL_RETRO_FIELDS`

## 063｜同一扇門，兩個答案｜RETRO

### 不變項
- Day10，同一登入日。
- 起點：日光森林蒂姬區域；章末：智慧之城雅典娜神殿內。
- POV：Franiya；章末第二身份【折光】ACTIVE。
- 【定點傳送卷軸】取得但需蒂姬定位迦娜後才可用。
- 彩虹鳥羽毛107→200→交付→0；任務COMPLETE。
- 主身份見習游俠→初級游俠。
- 折光見習法師→初級法師。
- Franiya主身份遭雅典娜神殿拒入；折光重入成功、免入門任務、正式加入神殿，貢獻0。
- CH122～124仍FULLY_CONSUMED；CH124私人誘餌VOID不變。

### RETRO修正項
本檔現行覆蓋06L內三類舊值：
1. 七項游俠技能只開放未購買；
2. 【俯空殺技能書】仍持有／技能未學；
3. 完成彩虹鳥轉職任務時漏掉【黑鐵寶箱×1】獎勵。

第63章正式結果：
1. 折光補齊彩虹鳥羽毛至200後，身份鎖自然解除，合法切回Franiya主游俠身份。
2. 這是第61章取得【俯空殺技能書】後第一個無跨身份職業疑義的合法使用窗口；Franiya使用技能書，技能書消耗，【俯空殺】正式學會。
3. Franiya向格拉蒙交付200根羽毛，任務COMPLETE；系統發放【黑鐵寶箱】×1，`HELD_UNOPENED`。
4. 格拉蒙開放六項初級游俠技能。
5. 依Franiya首位、獨立完成、效率、領袖處理與互動評價，額外開放【英雄之軀】。
6. Franiya確認人物自身技巧與系統技能權限是兩回事。
7. 七項技能總價10060金；既有資金尺度足夠。
8. Franiya支付10060金，七項全部正式學會。
9. 基礎職階同步使折光`見習法師 -> 初級法師`，不免費送法術。

### 正式技能／資產狀態
- 【俯空殺技能書】：`CONSUMED_CH63`。
- 【俯空殺】：`ACQUIRED / LEARNED / READY`；150%基礎傷害，自由模式依完成度／跳躍高度評估，CD50秒。
- 【黑鐵寶箱】×1（彩虹鳥轉職任務獎勵）：`ACQUIRED / HELD_UNOPENED`；與早期「黑鐵級隨機寶箱×3」分列。
- 【精通雙手武器】：ACQUIRED / LEARNED。
- 【一級精通射術】：ACQUIRED / LEARNED。
- 【兩連射】：ACQUIRED / LEARNED。
- 【一級穿透】：ACQUIRED / LEARNED。
- 【衝刺】：ACQUIRED / LEARNED。
- 【蓄力重擊】：ACQUIRED / LEARNED。
- 【英雄之軀】：ACQUIRED / LEARNED / READY。

`DIVE_KILL_SKILL = ACQUIRED_LEARNED_READY`
`RANGER_TRANSFER_BLACK_IRON_CHEST = ACQUIRED_HELD_UNOPENED`
`RANGER_SYSTEM_SKILLS = ACQUIRED_LEARNED_ALL_7`
`CH122_SKILL_PURCHASE_OBJECTIVE_RESULT = PRESERVED`

### 蒂姬跨章關係值
- 原著121第一環結算的`TIJI_FAVORABILITY = 30`真正生效點在第62章。
- 第63章RETRO正文可補面板呈現，但不得誤寫成第63章才增加。

### SOURCE
- CH117【俯空殺】終態：`CLOSED_AT_CH63_FIRST_LEGAL_TERMINAL_WINDOW`。
- CH121好感度30：`PRESERVED / EFFECTIVE_AT_CH62_RING1_COMPLETION`。
- CH122：`FULLY_CONSUMED / NO_RANGER_SKILL_PURCHASE_RESIDUAL / NO_RANGER_QUEST_REWARD_RESIDUAL`。
- CH123：`FULLY_CONSUMED`。
- CH124：`FULLY_CONSUMED`。
- 游標：`THROUGH_CH124`。
- CH125：`READY_NEXT / NOT_CONSUMED`。

### 覆蓋關係
- `06L_章節索引_第63章增量.md`保留為原交易歷史。
- 06L中`RANGER_SYSTEM_SKILLS = OFFERED_NOT_ACQUIRED`、`DIVE_KILL_SKILLBOOK = HELD_NOT_USED`、`DIVE_KILL_SKILL = NOT_LEARNED`與漏記黑鐵寶箱等欄位：`HISTORICAL_SUPERSEDED_BY_06M_219_SOURCE43`。
- Current State、Ledger、Active Queue與本06M不得再被06L歷史值反向覆蓋。
