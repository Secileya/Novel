# VOID_WITH_CAUSE使用者公開回報硬門檻

> 狀態：**ACTIVE / REQUIRED / PERMANENT**  
> 建立：2026-09-30  
> 適用：本專案全部SOURCE捕捉、acceptance matrix、SOURCE_NODE、PREWRITE、POSTWRITE、歷史回修、章節交易與最終交付回報，直到原著終章。  
> 上位依據：`09_VOID_WITH_CAUSE功能殘留與角色推理硬門檻.md`。

---

## 一、核心規則

`VOID_WITH_CAUSE`屬於會實際刪減原著事件／場景／功能的高風險處置。

因此從本規則生效起，只要任何正式施工中使用下列任一標記：

- `VOID_WITH_CAUSE`
- `VOID_WITH_CAUSE_SCENE_ONLY`
- 任一明確表示「原事件某一功能層作廢」的function-level VOID

就必須在該輪對使用者的最終回報中逐項公開。

不得只把VOID藏在SOURCE矩陣、PREWRITE、POSTWRITE或內部稽核檔，讓使用者自行翻檔尋找。

固定式：

`VOID_USED => USER_VISIBLE_VOID_DISCLOSURE_REQUIRED`

`HIDDEN_VOID_DISPOSITION = FORBIDDEN`

---

## 二、每一個VOID必須公開的欄位

每個被VOID的事件至少必須告知：

1. `SOURCE_CHAPTER / EVENT_ID`：原著章號與事件識別。
2. `ORIGINAL_EVENT`：原著原本發生什麼。
3. `VOID_SCOPE`：實際刪掉哪一層，必須精確到場景／方法／私人動機／特定結果，不可籠統寫整件作廢。
4. `CAUSE_INVALID_REASON`：原始因果為何在Franiya線不成立。
5. `FRANIYA_SUBSTITUTE_CAUSE_CHECK`：Franiya依自身能力、關係、資源與利益是否有替代因果。
6. `PRESERVED_FUNCTIONS`：哪些人物／資產／制度／世界／下游功能仍保留、重建或延後。
7. `WHY_NOT_REBUILT`：被刪掉的那一層為何不能合理重建。
8. `DOWNSTREAM_STATUS`：後續是否另有trigger／deadline／recheck。

任何一欄缺失，該VOID不得視為已完成驗收。

---

## 三、PREWRITE硬門檻

若PREWRITE預計使用任何VOID，必須先建立：

`VOID_DISCLOSURE_LEDGER`

其中列出本章／本輪預計VOID項目與上述八欄。

如果尚不能合理回答「Franiya替代因果」或「功能殘留」，則：

`VOID_DECISION = BLOCKED`

不得先刪再說。

---

## 四、POSTWRITE與章節交易硬門檻

正式章節交易關閉前，必須檢查：

`VOID_USER_DISCLOSURE_GATE = PASS/FAIL`

若本輪有VOID但最終使用者回報尚未逐項公開：

`VOID_USER_DISCLOSURE_GATE = FAIL`

`CHAPTER_TRANSACTION_REPORT = INCOMPLETE`

若本輪完全沒有使用VOID，最終回報必須明確寫：

`本輪未使用VOID_WITH_CAUSE。`

避免「沒有說」與「忘了說」混在一起。

---

## 五、禁止以舊VOID自動沿用

歷史檔案出現過 `VOID_WITH_CAUSE` 不代表後續施工可以直接繼承。

每次該事件重新進入來源窗／下游使用窗時，仍須依：

- `09_VOID_WITH_CAUSE功能殘留與角色推理硬門檻.md`
- 本檔使用者公開回報規則

重新確認其有效性。

若舊VOID其實刪掉仍有功能殘留的事件，必須回修，並在同輪回報中告知：

- 原本錯刪了什麼；
- 為什麼舊判定錯；
- 現在恢復／重建了哪些功能。

---

## 六、使用者可見回報格式

每次有VOID時，最終回報至少需有一個清楚的「本輪VOID事件」區塊，使用表格或等價清單逐項呈現。

推薦欄位：

`原著章／事件 | VOID範圍 | 判斷理由 | Franiya替代因果 | 保留／重建功能 | 後續狀態`

不允許只寫：

> 某事件因主角不同所以VOID。

必須說明到底只有哪一層失效，以及其他功能去了哪裡。

---

## 七、永久固定Gate

`VOID_FUNCTION_RESIDUE_CHECK = PASS`

`FRANIYA_SUBSTITUTE_CAUSE_CHECK = PASS`

`VOID_SCOPE_IS_FUNCTION_SPECIFIC = TRUE`

`VOID_USER_DISCLOSURE_GATE = PASS`

四者缺一，VOID不得完成正式封帳。
