# 第六十三章｜游俠技能客觀結果 RETRO 修正 v1.0

> 日期：2026-10-01  
> 狀態：`RETRO_ACTIVE / SUPERSEDES_CH63_RANGER_SKILL_FIELDS`  
> 原因：第63章原交易錯誤將原著第122章已由二次反向掃描確認的「全部買下技能」客觀結果降級為`OFFERED_NOT_ACQUIRED`，且未在最終報告公開差異理由。

## 一、錯誤來源

原著母抓取`06_原著事件捕捉_121-150.md`已記錄第122章初級游俠完整技能表；二次反向歸屬掃描`09A_原著事件捕捉二次反向歸屬掃描_121-150.md`進一步以完整原著TXT確認：沈雲把以上技能全部買下。

第63章舊SOURCE LIVE卻擅自加入：`原著「全部買下技能」不強制移植；Franiya是否購買依當下資產與需要重算。`

此句沒有第一手SOURCE、人物因果、資源限制或使用者修正支持，屬`UNAUTHORIZED_OBJECTIVE_RESULT_DOWNGRADE`。

## 二、為何沒有合法分歧理由

### 2.1 人物技術不是系統技能衝突
Franiya本來就具全武器高階精通，可以自然雙持、射擊、位移與發力；但這不等於遊戲角色殼已取得系統技能。

- 【精通雙手武器】提供主／副武器系統屬性結算規則；
- 【一級精通射術】提供游俠武器模板的系統屬性利用率；
- 【兩連射】【一級穿透】【衝刺】【蓄力重擊】提供具名系統倍率／判定；
- 【英雄之軀】提供1秒系統無敵。

人物本人會做相似動作，不構成放棄系統權限的理由。

### 2.2 金幣不是限制
既有第102章經濟鏈RETRO已正式建立Franiya線：月神石服務將可用資本推至超4.2億金，完成3.6億級主城置產後仍保留六千多萬級流動性。精確當前餘額可以不鎖，但不能反向把「沒有精確餘額」解讀成「資金不足」。

第122章七項技能總價格：20＋5＋5＋5＋5＋20＋10000＝10060金。此費用對既有合法資金尺度不構成實質取捨。

## 三、正式修正

第63章正文已RETRO改為Franiya在格拉蒙開放【英雄之軀】後，一次支付10060金並正式學會全部七項技能：

- 【精通雙手武器】：`ACQUIRED / LEARNED`
- 【一級精通射術】：`ACQUIRED / LEARNED`
- 【兩連射】：`ACQUIRED / LEARNED`
- 【一級穿透】：`ACQUIRED / LEARNED`
- 【衝刺】：`ACQUIRED / LEARNED`
- 【蓄力重擊】：`ACQUIRED / LEARNED`
- 【英雄之軀】：`ACQUIRED / LEARNED / READY`

正文RETRO commit：`500ce2ae72546cd53d59c1fc7d01527591b369a0`。

## 四、SOURCE 重新分類

### SOURCE_CHAPTER
`122`

### ORIGINAL_EVENT
沈雲完成初級游俠轉職，格拉蒙開放六項基礎技能與評價型隱藏技能【英雄之軀】，沈雲將以上技能全部買下。

### PRESERVATION_DELTA
`PRESERVED`

Franiya同樣完成初級游俠轉職並滿足【英雄之軀】評價條件；沒有角色、規則或資產衝突，因此保留「全部購買並取得」客觀結果。實際人物理解方式依Franiya自身能力重算，但不改變取得結果。

### REWRITE_DISPOSITION
`PRESERVED_OBJECTIVE_RESULT_WITH_CHARACTER_SPECIFIC_INTERPRETATION`

### REWRITE_RESULT
Franiya支付10060金，七項系統技能全部正式進技能欄；自身武器／戰鬥技巧與系統技能權限保持分流。

### RESIDUAL_STATUS
`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH / NO_RANGER_SKILL_PURCHASE_RESIDUAL`

## 五、歷史檔覆蓋範圍

下列舊檔仍保留當時施工歷史，但其「游俠技能只開放未取得／未知金幣餘額故不購買」相關欄位自本RETRO起全部標記：`HISTORICAL_SUPERSEDED_BY_217`。

- `213_第六十三章PREWRITE核定表_v1.0.md`
- `214_第六十三章POSTWRITE差分_v1.0.md`
- `215_第六十三章章節交易同步_v1.0.md`
- `216_第六十三章最終交易關閉_v1.0.md`
- `04_連續性與索引/06L_章節索引_第63章增量.md`中的技能未取得欄位

現行權威以正文RETRO、Current State、Ledger、Active Queue、Audit、SOURCE LIVE、本217與後續218關閉檔為準。

## 六、流程錯誤定性

`ROOT_CAUSE = REVERSE_AUDIT_CONFIRMED_OBJECTIVE_RESULT_DOWNGRADED_WITHOUT_CAUSE`
`REPORTING_FAILURE = OBJECTIVE_DIVERGENCE_NOT_DISCLOSED`
`GOLD_BALANCE_FALSE_GATE = REMOVED`
`RETRO_REQUIRED = TRUE`
`UNREPORTED_OBJECTIVE_RESULT_DIVERGENCE_COUNT_AFTER_REPAIR = 0`
