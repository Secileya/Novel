# Franiya系統完成度與上限型評分補充

> 日期：2026-10-01  
> 狀態：`FIXED_CANON_SUPPLEMENT / MANDATORY_WHEN_RELEVANT`  
> 用途：補足《信仰》角色殼對技能完成度、動作完成率、操作精度等「由Franiya本人可控執行品質」所做的系統評分。

## 一、核心規則

只要某項系統評分同時滿足：

1. 評分對象是Franiya本人當次可控的動作／技能執行品質；
2. 評分機制存在明確上限；
3. 成敗主要由角度、時機、節奏、力量路線、姿勢、動作精度、武器控制、能量控制、可觀測操作等Franiya既有能力可完整掌握的因素決定；
4. 不存在額外硬規則把上限壓低；

則固定：

`FRANIYA_CONTROLLABLE_EXECUTION_SCORE = SYSTEM_ALLOWED_MAXIMUM`

換言之：**這類上限是多少，Franiya就是多少。**

若系統允許100%，Franiya合法執行時就是100%；若特定機制明示實際上限只有80%，則取80%，不得擅自突破系統硬上限。

## 二、適用類型

包括但不限於：

- 自由模式技能完成度；
- 動作完成率；
- 依動作完成品質給出的傷害／倍率修正；
- 可觀測的時機、角度、姿勢、落點、發力、軌跡、連段、招架、投擲、射擊等系統評分；
- 技能明示「完成度多少就追加多少效果」的本人操作評分。

## 三、不適用類型

本規則**不**把下列項目自動變成100%：

- 掉寶率、暴擊率、抽獎、暗骰；
- 不可觀測RNG；
- 對方抗性、免疫、等級壓制；
- 裝備／職業／身份／任務資格；
- MP、體力、冷卻、材料等資源硬限制；
- 系統直接固定的成功率，且Franiya沒有合法可控變量；
- 其他人的完成度或操作結果。

固定：

`CONTROLLABLE_EXECUTION_CAP != RNG_CAP`

`PERFECT_EXECUTION != BYPASS_SYSTEM_PERMISSION`

## 四、第116章【踢擊】回歸案例

原著第116章：

- 沈雲自由模式使用【踢擊】；
- 系統評估完成度92%；
- 額外造成92%傷害。

Franiya線：

- 【踢擊】完成度屬本人可控執行品質；
- 系統百分比完成度上限為100%；
- 因此Franiya在合法身份、合法裝備與合法技能接口下真正執行【踢擊】時：

`FRANIYA_KICK_COMPLETION = 100%`

`FRANIYA_KICK_BONUS_DAMAGE_FROM_COMPLETION = +100%`

原著92%不照抄為Franiya數值，差異類型固定：

`DIVERGENCE_TYPE = RECALCULATED_CHARACTER_PERFORMANCE_TO_SYSTEM_CAP`

此差異必須在SOURCE／PREWRITE／章後最終報告公開，不得只在內部推理存在。

## 五、施工硬Gate

涉及任何「完成度／熟練完成率／操作評分／動作評分／精準度百分比」時：

1. 先確認是不是本人可控執行品質；
2. 找出系統明示或可合法確定的上限；
3. 若屬可控品質，Franiya結果直接取該上限；
4. 若原著角色結果低於上限，標記為角色個體數值差異，不得機械照抄；
5. 若當下身份／裝備／技能接口不合法，可延後，但必須依工作流程16建立完整責任卡。

`FRANIYA_EXECUTION_CAP_GATE = REQUIRED_WHEN_RELEVANT`
