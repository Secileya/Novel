# 施工門禁與 Franiya 能力 Gate 補充

> 2026-09-30起PREWRITE另必讀`04_連續性與索引/09_裝備與資產權威總表.md`；完整啟動／封口以`07_工作流程/15_新對話完整啟動與章節交易總Gate.md`收口。

> 狀態：FIXED_WORKFLOW_SUPPLEMENT
> 日期：2026-09-30
> 上位流程仍為 `小說/00_總索引與交接/NOVEL_WORKFLOW_PROTOCOL.md`；本檔補充本專案正式續寫前的可驗證施工門禁，不取代既有 `01_原著改寫長期循環.md`。

## 一、目的

本檔專門防止以下漏項：
- 只讀最新PREWRITE與上一章，漏掉30章級原著事件統整／反向稽核。
- 模型口頭宣稱「已讀／PASS」，但拿不出實際讀取來源。
- 「原著事件覆蓋窗」與芙蘭妮雅能力「事件視界」混名。
- 作者因為知道芙蘭妮雅有高階能力，就在危急場景臨時掏出來。
- 只核人物知情，不核本章哪些高階能力允許／禁止使用。
- **只記得事件視界／速度解除等顯眼底牌，卻漏掉Franiya早已建立的常態感知、武器技巧、軌跡控制、前兆讀取、四層格擋、最少樣本、重構等。**
- **正文最後沒使用某能力，就倒推「PREWRITE不必評估」。**
- **把Franiya自身能力誤掛到裝備名下，例如把瞬時重構寫成【火狐炎刀】的技能。**

固定原則：

`ABILITY_NOT_USED = ALLOWED`
`ABILITY_NOT_EVALUATED = FORBIDDEN`

也就是：**未使用可以，未評估不可以。**

---

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
- `FRANIYA_ABILITY_SOURCE_READ = PASS`
- `FRANIYA_ABILITY_GATE = PASS`
- `ABILITY_NOT_EVALUATED = 0`
- `ABILITY_SOURCE_ATTRIBUTION = PASS`
- `LOWEST_SUFFICIENT_TIER_SELECTED = PASS`
- `KNOWLEDGE_BOUNDARY_GATE = PASS`
- `PREWRITE_GATE = PASS`

若任一項無法證明，不能用一句「流程已跑完」替代。

---

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

---

## 四、命名隔離

為避免混淆，流程文件固定使用：

- `ORIGINAL_EVENT_WINDOW`／「原著事件覆蓋窗」：指原著研究與規劃窗口。
- `EVENT_HORIZON`／「事件視界」：只指Franiya的能力 event horizon／因果邊界。

流程語境禁止把 `ORIGINAL_EVENT_WINDOW` 簡稱成「視界」。

---

## 五、FRANIYA_ABILITY_GATE｜從「高階能力」擴張為「完整能力／技巧掃描」

### 5.1 每章必讀來源

只要Franiya在場，PREWRITE不能只憑聊天摘要或只看當前裝備。至少按本章需求定向讀：

1. `小說/家庭總檔/01_家庭完整角色設定總檔.md` 的Franiya上位段落；
2. `小說/家庭總檔/02_芙蘭妮雅武器戰鬥補充.md`；
3. `小說/家庭總檔/03_芙蘭妮雅瞬時武器重構補充.md`；
4. `小說/家庭總檔/04_芙蘭妮雅軌跡控制與偽追蹤戰鬥補充.md`；
5. 涉及事件視界時讀 `小說/家庭總檔/08_芙蘭妮雅事件視界使用時機與視覺補充.md`；
6. `02_角色設定/11_Franiya能力技巧與使用區段施工總表.md`；
7. 本章涉及的專案世界規則，例如 `03_世界觀設定/02_操作模式與系統作用邊界.md`。

如果本章只涉及日常社交、不存在戰鬥／機制／感知／技能判定，可以按任務縮小定向讀取，但**11號施工總表仍必須掃過**，確認沒有能力影響場景因果。

`FRANIYA_ABILITY_SOURCE_READ = PASS` 必須列出實際讀到的來源。

### 5.2 每章能力掃描不再只列高階底牌

每章至少核以下五組。

#### A｜常態感知／認知／技術
- `EFFECT_RELATION_PERCEPTION = CONSIDERED / USED / NOT_RELEVANT`
- `OCCLUSION_IMMUNITY = CONSIDERED / USED / NOT_RELEVANT`
- `INTERNAL_PRECURSOR_READING = CONSIDERED / USED / NOT_RELEVANT`
- `PERFECT_TIMING_WINDOW = CONSIDERED / USED / NOT_RELEVANT`
- `MINIMUM_SAMPLE_PRINCIPLE = CONSIDERED / USED / NOT_RELEVANT`
- `PAIN_ZERO_DAMAGE_SENSING = CONSIDERED / USED / NOT_RELEVANT`

#### B｜武器／戰鬥技巧
- `ALL_WEAPON_MASTERY = CONSIDERED / USED / NOT_RELEVANT`
- `ZERO_TRANSITION_WEAPON_SWITCH = CONSIDERED / USED / NOT_RELEVANT`
- `INSTANT_RECONSTRUCTION = CONSIDERED / USED / NOT_RELEVANT`
- `RANGED_COMBAT = CONSIDERED / USED / NOT_RELEVANT`
- `TRAJECTORY_CONTROL = CONSIDERED / USED / NOT_RELEVANT`
- `PSEUDO_HOMING_REBOUND_RETURN = CONSIDERED / USED / NOT_RELEVANT`
- `FOUR_TIER_PARRY = CONSIDERED / USED / NOT_RELEVANT`

#### C｜角色殼／裝備／身份
- `CURRENT_EQUIPMENT_SKILLS = CHECKED`
- `GAME_SHELL_OUTPUT = PASS / FAIL`
- `SECOND_IDENTITY_MAGIC = OFF / ON / CONDITIONAL`
- `THUNDER_FIELD = OFF / ON / CONDITIONAL / N/A`

#### D｜較高層能力
- `GENERAL_EFFECT_WEIGHT_ADJUSTMENT = OFF / ON / CONDITIONAL`
- `SPEED_LIMIT_RELEASE = OFF / ON / CONDITIONAL`
- `EVENT_HORIZON_LOCAL = OFF / ON / CONDITIONAL`
- `EVENT_HORIZON_RANGE_COMPOSITE = OFF / ON / CONDITIONAL`
- `FULL_BLACK_HOLE_CELESTIAL = OFF / ON / CONDITIONAL`
- `OTHER_HIGH_LEVEL_BODY_ABILITY = OFF / ON / CONDITIONAL`

#### E｜邊界
- `KNOWLEDGE_GAIN = LEGAL / FAIL`
- `ABILITY_SOURCE_ATTRIBUTION = PASS / FAIL`
- `LOWEST_SUFFICIENT_TIER_SELECTED = PASS / FAIL`
- `ABILITY_NOT_EVALUATED = 0`

只有E組全部PASS，才能宣告`FRANIYA_ABILITY_GATE = PASS`。

### 5.3 OFF必須有理由

禁止：

`EVENT_HORIZON = OFF`
`SPEED_LIMIT_RELEASE = OFF`

然後沒有任何判斷。

應寫成例如：

`EVENT_HORIZON_LOCAL = OFF`
- 本章問題只涉及三十米級普通地形藏匿；Franiya自身作用感知已直接成立，不需要因果邊界。

`SPEED_LIMIT_RELEASE = OFF`
- 角色殼現有速度＋【疾馳】已足夠完成當前攻防；瓶頸不在角色執行速度。

這樣才證明「不用」是判斷結果，而不是「沒想起來」。

### 5.4 能力來源歸屬Gate

每次出現能力／技巧表現，必須問：**來源是Franiya本人、裝備、身份、世界系統，還是其他外部物件？**

固定：
- 瞬時武器重構＝Franiya本人能力／技術；
- 火狐炎刀＝被重構的裝備，不是重構能力來源；
- 軌跡控制／偽追蹤＝Franiya本人技術；
- 真正追蹤技能若存在＝該裝備／技能本身機制；
- 本體多尺度作用感知＝Franiya本人；
- 【雷電磁場】＝【驚雷羽翼】裝備技能。

`ABILITY_SOURCE_ATTRIBUTION = FAIL` 時不得進正文。

---

## 六、能力規格選擇：最低足夠層與問題類型

Franiya不是因為「有強能力」就每次開最高規格，也不是因為正常遊戲自限就把既有技術忘掉。

通常先按問題尋找最低足夠層：

1. **純技術／感知／武器層**：走位、距離、節奏、武器、軌跡、地形、預判、反應、內部前兆、常態感知。
2. **世界／角色殼合法能力層**：裝備技能、職業技能、第二身份合法魔法、系統判定。
3. **一般作用權重微調**：力量、慣性、方向、作用份量等較低層調整。
4. **角色速度限制解除**：專門處理「她知道答案，但角色執行速度跟不上」的瓶頸。
5. **局部事件視界／視界附著**：處理普通作用是否能真正成立、單向因果邊界等。
6. **範圍／複合視界**：封鎖一片空間、多條作用鏈、回復、逃逸、供能等。
7. **完整黑洞／天體級構成**：只有事件真正需要完整天體／更高尺度時才評估。

注意：第4與第5不是線性升級關係。
- 速度解除處理執行速度；
- 事件視界處理作用成立／逃逸／恢復／因果邊界。

不能因敵人強就兩個一起全開。

---

## 七、EVENT_HORIZON判定

- 強敵、Boss、危險、受傷、血量低不構成自動開啟理由。
- 正常技術、角色殼能力或較低層作用權重足夠時，預設不開。
- 合理開啟通常需要：作用結果能否成立、逃逸／再生／回復／重生／傳送／技能供能等機制需被封鎖，或Franiya主動決定升規格快速終結。
- 事件視界不是偵查、真視、未來視、攻略或隱藏資料讀取能力。
- 局部視界附著、範圍／複合視界與完整黑洞必須分層，不能互相偷換。
- 具體能力物理語義與固定視覺以家庭總檔15.8及 `小說/家庭總檔/08_芙蘭妮雅事件視界使用時機與視覺補充.md` 為準。

---

## 八、SPEED_LIMIT_RELEASE判定

- 此能力不是提高Franiya反應速度；她的感知、理解、反應、決策本來就沒有降到角色等級。
- 它解除的是「角色執行速度跟不上她本人」的落差。
- 平常關閉。
- 普通高速技能、一般Boss、原著主角曾吃力，都不是自動使用理由。
- 只有當她已經看懂答案，而真正瓶頸明確是角色動作／執行速度，且她主動決定撤掉這層自限時，才進入`CONDITIONAL / ON`。
- 開啟不自動解除冷卻、資源、傷害公式、攻擊力、資格、階段鎖、系統真正不可格擋等非速度限制。

---

## 九、Gate 的證據格式

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

同理，`FRANIYA_ABILITY_GATE = PASS`不能只列兩三個顯眼能力；必須完成第五節完整掃描，並列出本章真正相關項目的理由與來源。

---

## 十、使用者指出漏項時的修正義務

使用者若指出「是不是漏了X」，不能只在聊天裡承認。

必須判斷：
1. **執行漏掉**：流程已有要求，但本輪沒做。立即補跑並重做Gate。
2. **流程本身沒有強制要求**：把規則補入正式流程／交接／能力檔，使下一個零上下文模型也能找到。
3. **能力散在多份檔案導致模型只讀到局部**：建立或更新施工總索引，使能力不再靠模型恰好搜尋到。

只有聊天內知道、沒有落盤的修正，不算完成。

---

## 十一、第44／57章RETRO能力Gate示例

### 第44章雷鳥
- `EFFECT_RELATION_PERCEPTION = USED`
- `RANGED_COMBAT = USED`
- `INSTANT_RECONSTRUCTION = USED`
- `TRAJECTORY_CONTROL = USED`
- `FIREFOX_BLADE = TARGET_OF_RECONSTRUCTION, NOT_SOURCE`
- `SPEED_LIMIT_RELEASE = OFF`：現有角色速度／技術足夠。
- `EVENT_HORIZON_LOCAL = OFF`：沒有作用成立／逃逸／回復層問題。

### 第57章石後12人
- `EFFECT_RELATION_PERCEPTION = USED`
- `OCCLUSION_IMMUNITY = USED`
- `THUNDER_FIELD = AVAILABLE_BUT_OFF`：三十多米普通藏匿，本體感知更直接，不值得等待10秒準備。
- `SPEED_LIMIT_RELEASE = OFF`
- `EVENT_HORIZON_LOCAL = OFF`

兩者共同原則：**高階能力沒有使用，但已被評估。**

---

## 十二、事件視界可視特效提醒

沿用家庭總檔固定視覺：近乎吞光的深黑／無光核心，外側為熾白、白金、金黃、橙金、橙紅至深紅的吸積盤式高亮環帶，最高能處可少量藍白。不得因Franiya藍紫瞳色把視界誤寫成紫黑特效。

---

## 十三、發現問題即處理（AUTO_FIX_ON_DISCOVERY）

稽核、續寫、同步、接手或回查途中，只要發現的問題同時符合以下條件：
- 已有唯一或高度明確的正確答案；
- 可由最新正式正文、後期明確修正、固定流程或既有Canon直接判定；
- 修正不需要新增重大世界觀、角色選擇、劇情分歧或其他創作性取捨；
- 可在當前工作階段安全完成；

則**必須在同一輪直接修正並繼續工作，不得只回報問題、把實際修正拆到下一輪等待使用者再次下令。**

典型應自動處理：
- Current State／交接／稽核檔仍停在舊章號。
- 正文已完成，但同步標記仍寫 `ALLOWED`／`PENDING`。
- 已有POSTWRITE PASS，卻沒有更新當前狀態。
- 使用者剛確認的固定能力規則尚未落盤。
- 同一事實在有效文件中存在一條明顯過時說法。
- 原著事件已明確列為HIGH PRIORITY缺口，但事件佇列／後續規劃沒有對應追蹤。
- 能力來源被誤掛到裝備／技能名下。
- PREWRITE只列高階底牌卻沒有掃常態技巧。

只有下列情況才停下詢問：
- 存在兩個以上都合理、會導向不同Canon的方案；
- 涉及重大角色選擇、不可逆世界觀修改、正式正文大幅重寫；
- 缺乏足夠證據判斷哪個版本有效；
- 使用者明確要求先提案、不直接修改。

原則：**能確定怎麼修，就先修；真正需要創作決策，才問。**

---

## 十四、章節交易完整性（CHAPTER_TRANSACTION_INTEGRITY）

正式章節不得只以「正文檔存在」視為流程完成，也不得只因交接檔仍舊就誤判正文不存在。

每次章節完成後，至少核對：
1. `01_章節/NNN_...md` 正式正文存在，且最高正式章號正確。
2. 對應POSTWRITE存在並PASS。
3. `01_當前狀態快照.md` 已同步到該章結果。
4. `07_有效性與同步稽核.md` 已同步到該章結果。
5. 原著事件待處理佇列／未完成因果已依正文結果更新。
6. 章節索引與必要同步差分已反映該章。
7. 專案交接若仍保留舊「目前／下一章」描述，必須在同輪修正；若因工具限制暫時無法安全更新，需明確記錄為待修同步債，不得讓下一輪把舊交接當真值。
8. 若Franiya在章內出現戰鬥／感知／技能／機制處理，POSTWRITE需再次核對實際正文是否符合PREWRITE能力Gate與能力來源歸屬。

任一核心項落後時：
- `CHAPTER_TRANSACTION = PARTIAL`
- 先執行恢復／同步修正，再開始下一章。
- 不得因為「正文已經有了」就跳過POSTWRITE，也不得因為「交接仍寫上一章」就重寫已完成正文。

完成條件：
`CHAPTER_TRANSACTION = COMPLETE`
