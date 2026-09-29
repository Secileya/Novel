# SOURCE disposition correction｜109-D／110-A／111-D／112-C／113-B／115-F

> 日期：2026-09-30  
> 狀態：**CURRENT_OVERLAY / SUPERSEDES_CONFLICTING_ROWS_IN_28_AND_33**  
> 根因：第57章PREWRITE未完成正文Canon逆向核對，錯把已成立的神殿敵對、精靈語能力、裝備物權與可延續世界實體當成不存在。  
> 上位流程：`07_工作流程/11_PREWRITE正文Canon逆向核對硬門檻.md`

---

## 一、109-D｜月神神殿候補神使【洛】／必殺名單第33位

### 舊判定
`VOID_WITH_CAUSE`，理由為Franiya沒有沈雲的赫爾墨斯關聯。

### 回修證據
第15章正式Canon已成立：
- Franiya取得並綁定赫爾墨斯相關物；
- 拒絕赫爾墨斯【見習神使】邀請；
- 月神神殿因此轉敵對；
- Franiya正式進入月神神殿必殺名單**第33位**；
- 十二主神神殿拒絕其進入。

因此舊判定與更早正式正文直接衝突。

### 新 disposition
`REBUILD_REQUIRED / ACTIVE_EXISTING_HOSTILITY`

- 【洛】作為月神神殿候補神使的世界身份：`WORLD_BACKGROUND_LOCKED`。
- Franiya作為必殺名單第33位：`INTEGRATED_EXISTING_CANON`。
- 洛對第33位目標採取追擊／處置：`REBUILD_REQUIRED`，依本線地點、時間與洛的實際任務自然接入。
- 不得再寫「Franiya沒有此既定前提」。

`EVENT_WINDOW = CURRENT_CH107_TO_CH111_ROUTE_WINDOW`
`LATEST_SAFE_DEADLINE = BEFORE_CH111_EQUIVALENT_LUO_COMBAT_FUNCTION_IS_SKIPPED`
`NEXT_RECHECK_TRIGGER = CH57_PREWRITE_REPAIR + ANY_LUNAR_TEMPLE_OR_LUO_SURFACE`
`MISSED_DEADLINE_ACTION = BLOCK_BODY_AND_RETRO_REPAIR`

---

## 二、110-A｜洛反覆追殺／赫爾墨斯仇恨鏈

### 舊判定
`VOID_WITH_CAUSE`。

### 回修
109-D前提已正式存在，因此110-A不能再整體VOID。

### 新 disposition
`REBUILD_REQUIRED / COMBAT_ROUTE_RECALC`

- 原著「反覆殺沈雲直到新手村」的**精確次數、節奏與結果**不能照搬。
- 但「月神神殿候補神使洛因既有必殺名單追擊Franiya」功能存活。
- 實際戰鬥結果需按Franiya當前裝備、角色殼、能力與洛完整技能重算。

---

## 三、111-D｜貪狼盾＋芬里爾劍柄＋避雷珠等對洛戰鬥功能

### 舊判定
因洛追殺事件被VOID，連特定生存戰結果一起VOID。

### Canon逆向核對
Franiya目前正式持有：
- 【貪狼之爪】；
- 【貪狼鎧甲】；
- 【貪狼戰盔】；
- 【貪狼腿甲】；
- 【芬里爾劍柄】；
- 【避雷珠】。

其中三件新貪狼裝與其他排行資產在**第55章正文**透過 `EXTRA_BATCH_SERVICE_BARTER_CONTRACT` 合法取得：五名世界第6～10玩家以九件資產作完整對價，交換一次不影響正常隊列的額外月神石服務批次；第56章該服務已履約CLOSED。

所以不能把這些裝備當成原著沈雲私有組合而忽略本線已成立物權。

### 新 disposition
`REBUILD_REQUIRED / CURRENT_ASSET_COMBAT_RECALC`

- 精確原著傷害結果不照搬。
- Franiya是否穿戴哪些貪狼裝，必須由正文當下明確處理；HELD不等於已裝備。
- 若洛戰成立，貪狼護盾、芬里爾劍柄、避雷珠與魔抗機制都是合法可用資源，需按當時狀態重算。

---

## 四、112-C｜第二身份PvP／華夏語假咒＋精靈語資訊欺騙

### 舊判定
`VOID_WITH_CAUSE`，理由包含「沈雲精靈語知識不移植」。

### Canon逆向核對
Franiya早期已正式建立：
- 對各種陌生語言的極高速理解／反推能力；
- 精靈語是遊戲內最早案例；
- 【折光】精靈／法師第二身份；
- 高階魔法理解、術式拆解與自由模式並行構築能力。

因此「Franiya不懂精靈語」是錯誤前提。

### 新 disposition
`REBUILD_REQUIRED / SECOND_IDENTITY_PUBLIC_PVP_FUNCTION_PRESERVED`

- 原著特定對手、原句與精確戰鬥流程不必照搬。
- 「利用對手對吟唱語言與技能辨識的預期進行資訊欺騙」功能對Franiya成立，甚至可依她的語言與魔法能力自然做得更乾淨。
- 第一次公開第二身份PvP需按本線自然遭遇建立。

`EVENT_WINDOW = FIRST_PUBLIC_SECOND_IDENTITY_PVP`
`LATEST_SAFE_DEADLINE = BEFORE_FIRST_SCENE_FORMALLY_DEFINES_ZHEGUANG_PUBLIC_COMBAT_STYLE`

---

## 五、113-B／93-F｜精靈語與魔法元素排列／海潮傷害

### 舊判定
把沈雲前世精靈語技巧與Franiya能否承接整個功能混在一起，標成VOID。

### 新 disposition
`REBUILD_REQUIRED / LOCAL_MAGIC_RULE_VALIDATION`

固定拆分：
- 沈雲前世具體學習歷史：不移植。
- Franiya會不會精靈語：**會**，且已是正式Canon。
- 精靈語／元素排列／咒式作為《信仰》本地魔法規則：保留。
- 原著「雙倍傷害」若來自特定元素排列技巧，不可僅因會語言就自動贈送；但以Franiya既有魔法理解，一旦接觸足夠本地術式樣本，必須允許她自然解析／重建等價機制，不能永久禁止。
- 原著沈雲某一發【海潮】的精確數字不直接複製；Franiya實際輸出按【折光】50精神、深海水晶球、法師接口、技能與本地規則重算。

固定：
`KNOWS_ELVISH = TRUE`
`SHEN_YUN_LEARNING_HISTORY_TRANSFER = FALSE`
`ELVISH_MAGIC_FUNCTION_VOID = FALSE`

---

## 六、115-F｜四翼黑龍

### 舊判定
`VOID_WITH_CAUSE`，理由為沈雲前世私人寵物／資產不移植。

### 問題
「沈雲前世曾經擁有它」與「四翼黑龍這個世界實體及其龍寵長線是否存在」是兩個不同功能。

私人前世所有權不能移植，不代表世界中的四翼黑龍消失，也不代表Franiya未來不能以自己的因果與其建立關係。

### 新 disposition
`DEFERRED_WITH_TRIGGER / WORLD_ENTITY_AND_DRAGON_PET_ROUTE_PRESERVED`

- `SHEN_YUN_PREVIOUS_LIFE_OWNERSHIP = NOT_TRANSFERRED`
- 四翼黑龍作為異變黑龍／世界實體：保留。
- 黑龍外貌地位、四翼異變、遠近戰兼具與高魔法操控等種族／個體功能：保留，具體正式登場時再回源核對。
- Franiya未來是否遇到、擊敗、建立好感並成為其主人，不預先保證結果，但**此長線不得被VOID**。

`EVENT_WINDOW = FIRST_DRAGON_PET_OR_FOUR_WING_BLACK_DRAGON_SOURCE_WINDOW`
`LATEST_SAFE_DEADLINE = BEFORE_FIRST_FORMAL_DRAGON_PET_ACQUISITION_DECISION_OR_ANY_DOWNSTREAM_FOUR_WING_DRAGON_REUSE`
`NEXT_RECHECK_TRIGGER = ANY_DRAGON_PET / BLACK_DRAGON / FOUR_WING_DRAGON KEYWORD`
`MISSED_DEADLINE_ACTION = BLOCK_AND_SOURCE_RECHECK`

---

## 七、115-B更正說明

使用者本輪明確指出先前口誤：要回修的是**115-F**，不是115-B。

因此115-B「華夏美女收割機」外號本輪**不因此次指示自動撤銷VOID**；若後續另有Canon／公開事件足以讓同類社群外號自然成立，再依當時功能殘留檢查重建。

---

## 八、第57章PREWRITE Gate修正

由於第57章PREWRITE漏掉上述既有Canon：

`PREWRITE_CANON_REVERSE_LOOKUP_GATE = RETRO_FAIL`

原166號PREWRITE不得再視為可直接核定正文的最終版本。

必須建立修正版PREWRITE，至少綁定：
- 第15章月神神殿第33位；
- 第55章月神石服務交換九件資產與【貪狼腿甲】物權；
- 第56章額外批次履約CLOSED；
- Franiya精靈語／通用語言反推能力；
- 【折光】法師身份與魔法理解；
- 115-F四翼黑龍世界實體長線。

`CH57_BODY_GATE = BLOCKED_UNTIL_PREWRITE_V1_1_REPAIR`
