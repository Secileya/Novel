# 原著客觀結果延後落實與差異公開硬Gate

> 建立日期：2026-10-01  
> 狀態：`MANDATORY / CURRENT_WORKFLOW`  
> 觸發原因：第63章游俠技能曾把反向掃描已確認的「全部買下」無理由降級；100～130逆向稽核又發現【黑鐵寶箱×1】、【蒂姬好感度30】與【俯空殺】學習結果未被完整落實／呈現。

本Gate補足一個舊流程缺口：**原著客觀結果不是非得鎖死在原著同章、同一句、同一秒落地，但任何延後、改變或不落地都必須被顯式管理。**

---

## 一、核心原則

### 1. 原著客觀結果預設保留

若SOURCE_CANON、反向掃描、SOURCE_NODE雙向稽核、第一手截圖／TXT或更高權威來源已確認某一客觀結果，例如：

- 任務獎勵真正發放；
- 技能書真正使用／技能真正學會；
- NPC好感度變化；
- 金錢支付／取得；
- 裝備／道具取得、掉落、消耗；
- 職階、身份、權限、貢獻、任務狀態；
- 公告、排名、世界規則結算；

則：

`OBJECTIVE_RESULT_DEFAULT = PRESERVE`

不得只因主角換成Franiya、她本人會類似技巧、精確金幣餘額未鎖、作者覺得暫時用不到、當章篇幅不方便等理由，擅自把`ACQUIRED / LEARNED / PAID / REWARDED / RELATION_CHANGED`降級成`OFFERED / HELD_ONLY / DEFERRED / OMITTED`。

---

## 二、允許延後，但必須建立完整責任卡

原著結果若因本線真實條件不能在原章對應位置立即落地，可以使用：

`DEFERRED_OBJECTIVE_RESULT`

但必須同時寫齊以下欄位，缺一即FAIL：

1. `ORIGINAL_OBJECTIVE_RESULT`：原著已確認的真正結果。
2. `DEFER_REASON`：為何本線此刻不能或不應立即落地，必須是具體因果／規則，不得只寫「主角不同」「需要重算」「暫時不需要」。
3. `FIRST_LEGAL_TRIGGER`：第一個能合法完成該結果的明確節點。
4. `LATEST_SAFE_DEADLINE`：最晚必須完成或重新判定的節點。
5. `EXPECTED_RESULT`：若沒有新的衝突證據，到期限時預設應落成什麼結果。
6. `MISSED_DEADLINE_ACTION`：若越過期限仍未處理，必須`BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`，不得默默滑過。
7. `OWNER`：由哪一條正文／哪個角色／哪個SOURCE窗口負責。
8. `DOWNSTREAM_DEPENDENCIES`：哪些後續技能、資產、任務、關係或場景會依賴它。

固定：

`DEFER_WITHOUT_DEADLINE = FORBIDDEN`

`DEFER_WITHOUT_EXPECTED_RESULT = FORBIDDEN`

---

## 三、區分「結果生效」與「正文呈現」

有些結果其實已在世界／系統中生效，但正文漏掉或延後顯示。此時必須分開記：

- `EFFECTIVE_AT`：結果在因果上真正成立的時間／章節節點。
- `SURFACED_IN_BODY_AT`：讀者／角色面板何時在正文真正看到。

若是RETRO修復，必須明寫：

`HISTORICAL_BODY_OMISSION = TRUE`

並將狀態回填到真正`EFFECTIVE_AT`，不得假裝它是在RETRO章節才突然發生。

例如：原著第一環結算時蒂姬好感度已升30，而舊第62章漏寫；RETRO若在第63章補呈現，仍應記：

`TIJI_FAVORABILITY_30_EFFECTIVE_AT = CH62_RING1_COMPLETION`

`TIJI_FAVORABILITY_30_SURFACED_IN_BODY_AT = CH63_RETRO`

---

## 四、結果若與原著不同，強制公開差異

只要本線最終結果與原著客觀結果不同，無論差異大小，PREWRITE與章後最終回報都必須逐項列：

1. `SOURCE_CHAPTER`
2. `ORIGINAL_OBJECTIVE_RESULT`
3. `FRANIYA_LINE_RESULT`
4. `DIVERGENCE_TYPE`：方法差異／時點差異／數值差異／取得差異／完全VOID等
5. `CONFLICT_EVIDENCE`
6. `WHY_PRESERVATION_WAS_IMPOSSIBLE_OR_WRONG`
7. `DOWNSTREAM_IMPACT`
8. `RESIDUAL_STATUS`

固定：

`UNREPORTED_OBJECTIVE_RESULT_DIVERGENCE_COUNT = 0`

若最終回報沒有列出已發生的客觀結果分歧：

`CHAPTER_TRANSACTION = FAIL`

不得宣告交易關閉。

---

## 五、正文完成後的強制「結果清單」

每章POSTWRITE在同步State前，必須建立本章所有原著來源章的：

`OBJECTIVE_RESULT_RECONCILIATION_TABLE`

至少逐項檢查：

- 任務獎勵；
- 掉落；
- 技能取得／技能書使用；
- 金錢支付／收入；
- NPC好感／敵意／關係；
- 職階／身份／神殿／貢獻；
- 裝備／道具取得與消耗；
- 公告／排名／稱號；
- 冷卻／時限／任務階段；
- 跨身份同步；
- 任何反向掃描特別點名的「真正到手時間／真正結算」。

每一項只能是：

- `PRESERVED_AND_LANDED`
- `PRESERVED_BUT_DEFERRED_WITH_FULL_CARD`
- `RECALCULATED_WITH_REPORTED_DIVERGENCE`
- `VOID_WITH_CAUSE_AND_REPORTED`
- `NOT_YET_TRIGGERED`

禁止使用含糊狀態：

- 「之後再看」
- 「依需要」
- 「可選」
- 「主角不同所以重算」
- 「先開放但沒取得」但沒有原著結果對照與理由

---

## 六、章末交易關閉硬Gate

交易關閉前必須驗證：

`OBJECTIVE_RESULT_RECONCILIATION_GATE = PASS`

`DEFERRED_OBJECTIVE_RESULT_CARD_COMPLETENESS = PASS`

`MISSED_OBJECTIVE_RESULT_DEADLINE_COUNT = 0`

`UNREPORTED_OBJECTIVE_RESULT_DIVERGENCE_COUNT = 0`

`SOURCE_TO_BODY_RESULT_DRIFT_COUNT = 0`

任何一項不過：

`TRANSACTION_CLOSURE = BLOCKED`

---

## 七、本次100～130回歸測試

本Gate建立時以三個真實錯誤作回歸：

1. 初級游俠轉職任務的【黑鐵寶箱×1】：原任務已明示，完成時不得漏發。
2. 蒂姬第一環結算【好感度30】：反向掃描已確認，不得因LIVE SOURCE漏抄而消失。
3. 【俯空殺】：原著取得技能書後成為新技能；Franiya第61章活動身份為法師折光，因此可合法暫緩使用技能書，但必須建立：
   - `DEFER_REASON = ACTIVE_IDENTITY_IS_MAGE_AND_CROSS_IDENTITY_SKILLBOOK_REGISTRATION_UNCONFIRMED`
   - `FIRST_LEGAL_TRIGGER = FIRST_RETURN_TO_PRIMARY_RANGER_IDENTITY`
   - `LATEST_SAFE_DEADLINE = SAME_FIRST_RETURN_TO_PRIMARY_RANGER_IDENTITY_BEFORE_NEXT_MAJOR_ROUTE`
   - `EXPECTED_RESULT = LEARN_DIVE_KILL`
   - 第63章首次合法切回主身份即到期，必須完成。

`WORKFLOW16_REGRESSION_SET = PASS_ONLY_AFTER_RETRO_REPAIR`

---

## 八、Franiya可控執行品質上限Gate

若原著客觀結果屬「角色本人可控執行品質」的系統評分，例如技能完成度、動作完成率、可觀測精度、依完成度給出的倍率，施工時不得機械照抄原主角較低數值。

必讀：

`02_角色設定/15_Franiya系統完成度與上限型評分補充.md`

固定：

`FRANIYA_CONTROLLABLE_EXECUTION_SCORE = SYSTEM_ALLOWED_MAXIMUM`

也就是：系統允許上限多少，Franiya在合法執行時就取多少。

適用前必須確認：

1. 評分確實主要由Franiya本人可控的角度、時機、節奏、動作、發力、武器／能量控制等決定；
2. 系統上限可合法確定；
3. 不存在資格、資源、身份、裝備、抗性等其他硬限制。

不得把此規則套到掉寶率、暴擊暗骰、不可觀測RNG或其他非本人可控結果。

若原著角色數值低於上限，而Franiya依本規則取上限，必須列為：

`DIVERGENCE_TYPE = RECALCULATED_CHARACTER_PERFORMANCE_TO_SYSTEM_CAP`

並在PREWRITE與章後最終報告公開原著數值、系統上限與Franiya結果。

第116章【踢擊】為回歸案例：

- 原著沈雲：92%完成度／+92%傷害；
- Franiya：合法執行時100%完成度／+100%完成度傷害；
- 第61章因ACTIVE身份為折光法師且主身份靴技接口不可用，不能同節點硬演；責任依SOURCE44延後至第一個自然合法主身份【踢擊】窗口。

`FRANIYA_EXECUTION_CAP_GATE = REQUIRED_WHEN_RELEVANT`

---

## 九、反向掃描事件集合完整性Gate

每個準備宣告`FULLY_CONSUMED`的SOURCE章，不能只拿Acceptance與LIVE SOURCE互相對帳。必須先建立：

`SOURCE_CHAPTER_EVENT_MASTER_SET = CAPTURE ∪ REVERSE_SCAN ∪ SECOND_PASS ∪ CROSS_AUDIT ∪ FIRST_HAND_PATCHES`

然後逐項確認Master Set中的每一事件都有合法disposition與正文／延後／VOID去向。

如果高權威反向掃描存在事件，但Acceptance層沒有條目：

`SOURCE_EVENT_SET_COMPLETENESS_GATE = FAIL`

該章禁止宣告`FULLY_CONSUMED`，直到補齊。

第116章【踢擊】92%漏項為本Gate回歸案例：10A與第三輪交叉稽核有明確結果，但28 Acceptance漏列，38 LIVE又錯誤宣告CH116完全消耗。

`FULLY_CONSUMED_REQUIRES_MASTER_SET_CLOSURE = TRUE`
