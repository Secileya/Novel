# 章節索引｜第65章身份氣息 RETRO 增量

> 狀態：`CURRENT_INDEX_OVERLAY / CH65_RETRO`  
> 日期：2026-10-02  
> 前一overlay：`06P_章節索引_第65章增量.md`  
> 對應RETRO：`08_劇情規劃/229_第六十五章身份氣息與目擊鏈RETRO覆蓋_v1.0.md`

## 065｜十五秒，聖炎｜身份氣息修正

### 修正後身份切換節點
- 章初：【折光】ACTIVE。
- 玩家／死亡視角清空後，折光先利用巨大寶箱、斷裂石柱與殘留水霧形成的遮蔽死角，確認迪亞斯無直接視線。
- 折光在完全不可見的死角內切回主身份Franiya。
- 迪亞斯沒有目擊切換過程。
- Franiya從另一側重新出現後，迪亞斯只辨認到「眼前游俠的氣息與先前法師完全不同」，並把兩者當作不同身份／不同人處理。
- 章末：Franiya ACTIVE；新1H身份切換限制ACTIVE。

### 對06P第6項的覆蓋
06P原句：
> 「無可驗證玩家視線後切回主身份；迪亞斯辨認兩身份氣息差異，但此知識隨其死亡停止傳播。」

現精確化為：
> 無可驗證玩家視線後，折光在迪亞斯也看不到的遮蔽死角切回主身份；迪亞斯只感知折光與Franiya氣息／職業／種族表現完全不同，沒有目擊切換，也沒有確認兩者同一人。

`DIAS_SEES_SWITCH_PROCESS = FALSE`
`DIAS_CONFIRMS_ZHEGUANG_EQUALS_FRANIYA = FALSE`
`ZHEGUANG_EQUALS_FRANIYA_PUBLIC_LINK = FALSE`

### 其他第65章索引結果
06P其餘項目全部維持：
- CH130～CH134仍FULLY_CONSUMED。
- CH116【踢擊】100%／+100%已結算。
- 【火狐炎刀】聖炎15秒與3日休眠不變。
- 暗金首殺與全部獎勵不變。
- 巨大寶箱四件核心物與迪亞斯日記知識不變。
- CH135仍NOT_CONSUMED。

`EVENT_CONSUMPTION_CURSOR = THROUGH_CH134`
`NEXT_SOURCE_WINDOW = CH135_FORWARD`
