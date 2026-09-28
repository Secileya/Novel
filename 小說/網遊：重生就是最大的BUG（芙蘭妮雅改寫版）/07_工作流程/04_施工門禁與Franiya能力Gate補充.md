# 施工門禁與 Franiya 能力 Gate 補充

> 狀態：FIXED_WORKFLOW_SUPPLEMENT
> 日期：2026-09-28
> 上位流程仍為 `小說/00_總索引與交接/NOVEL_WORKFLOW_PROTOCOL.md`；本檔補充本專案正式續寫前的可驗證施工門禁，不取代既有 `01_原著改寫長期循環.md`。

## 一、目的

本檔專門防止以下漏項：
- 只讀最新PREWRITE與上一章，漏掉30章級原著事件統整／反向稽核。
- 模型口頭宣稱「已讀／PASS」，但拿不出實際讀取來源。
- 「原著事件覆蓋窗」與芙蘭妮雅能力「事件視界」混名。
- 作者因為知道芙蘭妮雅有高階能力，就在危急場景臨時掏出來。
- 只核人物知情，不核本章哪些高階能力允許／禁止使用。

## 二、正式續寫前必須輸出的 PREWRITE EXECUTION CHECK

正式正文前，模型必須先在工作階段內建立可檢查的施工門禁表。每項不能只寫PASS，必須附實際證據／來源。

至少包含：

- `HEAD_SHA`
- `CURRENT_FORMAL_CHAPTER`
- `FORMAL_PROSE_STOP`
- `ACTIVE_ORIGINAL_WINDOW`
- `SOURCE_CURSOR_START`
- `SOURCE_CURSOR_END`
- `NEXT_UNSKIPPABLE_EVENT`
- `UPCOMING_HARD_ANCHOR`
- `UNCLASSIFIED_ORIGINAL_EVENTS = 0`
- `OVERDUE_ORIGINAL_EVENTS = 0`
- `SOURCE_READ = PASS`
- `EVENT_CLASSIFICATION = PASS`
- `EVENT_PLANNING_COVERAGE = PASS`
- `FRANIYA_ABILITY_GATE = PASS`
- `KNOWLEDGE_BOUNDARY_GATE = PASS`
- `PREWRITE_GATE = PASS`

若任一項無法證明，不能用一句「流程已跑完」替代。

## 三、30章級原著證據層固定加入施工流程

原著施工證據採三層：

1. **大區間事件捕捉**：例如 `原著事件捕捉_061-090`、`091-120`，用來掌握整段事件順序、依賴、伏筆與後果。
2. **對應反向稽核**：若該區間已有反向稽核，必須一起讀，作為原事件捕捉的修正overlay。
3. **當前連續原著正文窗口**：回到TXT讀足夠連續前後文，確認起因、人物知情、決策、結果與第一層後果。

規則：
- 大區間統整不能取代當前原文；當前原文也不能取代大區間統整。
- 施工點跨30章分界時，兩側區間都要讀。
- 若反向稽核指出原事件捕捉有誤，以反向稽核＋原著TXT直接證據為準。
- 只有檔名被列出、不曾實讀內容，不算 `SOURCE_READ = PASS`。

## 四、命名隔離

為避免混淆，流程文件固定使用：

- `ORIGINAL_EVENT_WINDOW`／「原著事件覆蓋窗」：指原著研究與規劃窗口。
- `EVENT_HORIZON`／「事件視界」：只指Franiya的能力 event horizon／因果邊界。

流程語境禁止把 `ORIGINAL_EVENT_WINDOW` 簡稱成「視界」。

## 五、FRANIYA_ABILITY_GATE

每章正式正文前，只要Franiya在場，都必須明列本章高階能力狀態；至少核：

- `EVENT_HORIZON = OFF / ON / CONDITIONAL`
- `SPEED_LIMIT_RELEASE = OFF / ON / CONDITIONAL`
- `HIGH_LEVEL_BODY_ABILITY = OFF / ON / CONDITIONAL`
- `WEAPON_RECONSTRUCTION = LEGAL / RESTRICTED / N/A`
- `GAME_SHELL_OUTPUT = PASS / FAIL`
- `KNOWLEDGE_GAIN = LEGAL / FAIL`

### EVENT_HORIZON判定

- 強敵、Boss、危險、受傷、血量低不構成自動開啟理由。
- 正常技術、角色殼能力或較低層作用權重足夠時，預設不開。
- 合理開啟通常需要：作用結果能否成立、逃逸／再生／回復／重生／傳送／技能供能等機制需被封鎖，或Franiya主動決定升規格快速終結。
- 事件視界不是偵查、真視、未來視、攻略或隱藏資料讀取能力。
- 局部視界附著、範圍／複合視界與完整黑洞必須分層，不能互相偷換。
- 具體能力物理語義與固定視覺以家庭總檔15.8及 `小說/家庭總檔/08_芙蘭妮雅事件視界使用時機與視覺補充.md` 為準。

## 六、Gate 的證據格式

禁止：

`SOURCE_READ = PASS`

但不列任何來源。

應寫成：

`SOURCE_READ = PASS`
- 已讀：`04_原著事件捕捉_061-090.md`
- 已讀：`11_原著事件捕捉反向稽核_061-090.md`
- 已讀：`05_原著事件捕捉_091-120.md`
- 已讀：`10_原著事件捕捉反向稽核_091-120.md`
- 原著TXT：實讀本輪必要連續窗口XX～XX章（實際章號依本輪施工點填寫）

同理，`FRANIYA_ABILITY_GATE = PASS` 必須列出本章每項高階能力是 OFF、ON 還是 CONDITIONAL，以及理由。

## 七、使用者指出漏項時的修正義務

使用者若指出「是不是漏了X」，不能只在聊天裡承認。

必須判斷：
1. **執行漏掉**：流程已有要求，但本輪沒做。立即補跑並重做Gate。
2. **流程本身沒有強制要求**：把規則補入正式流程／交接／能力檔，使下一個零上下文模型也能找到。

只有聊天內知道、沒有落盤的修正，不算完成。

## 八、第48章當前能力Gate overlay

在現有第48章PREWRITE未被後續正式重算前：

- `EVENT_HORIZON = OFF`
- Lv17～18暗影魔獸、貝克異常狀態、芬里爾分身的存在本身，都不構成自動開視界理由。
- 若施工中出現PREWRITE原本沒有、且真的涉及「普通作用無法成立／因果逃逸／高階回復或逃逸機制必須封鎖」的新證據，必須先停在規劃層重算能力Gate；不得正文臨場為了帥直接開視界。
- 第48章仍優先依角色殼、技術、裝備、重構與合法世界規則解題。

## 九、事件視界可視特效提醒

沿用家庭總檔固定視覺：近乎吞光的深黑／無光核心，外側為熾白、白金、金黃、橙金、橙紅至深紅的吸積盤式高亮環帶，最高能處可少量藍白。不得因Franiya藍紫瞳色把視界誤寫成紫黑特效。
