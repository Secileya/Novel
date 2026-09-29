# PREWRITE正文Canon逆向核對硬門檻

> 狀態：**ACTIVE / REQUIRED / PERMANENT**  
> 建立：2026-09-30  
> 適用：所有PREWRITE、SOURCE_NODE、acceptance matrix重核、VOID判定、資產／能力／關係／身份／任務／世界事件施工。  
> 根因：第57章PREWRITE曾讀取來源窗與active queue，卻沒有對每個事件逐實體反查既有改寫Canon，導致已成立事實被錯判不存在。

---

## 一、核心規則

`SOURCE_EVENT_REVIEW != REWRITE_CANON_REVERSE_LOOKUP`

只讀原著母表、SOURCE_NODE、acceptance matrix或active queue，不足以完成PREWRITE。

任何事件在取得 disposition 前，必須把事件涉及的所有實體逐一反查改寫Canon：

- 人物／ID／組織；
- 裝備／資產／貨幣／產業；
- 技能／語言／魔法／戰鬥能力；
- 任務／稱號／官職／敵對／必殺名單；
- 關係／契約／承諾／照顧／仇恨；
- 身份／第二身份／種族／職業；
- 已成立世界事件與讀者側秘密。

固定Gate：

`PREWRITE_CANON_REVERSE_LOOKUP_GATE = PASS/FAIL`

未PASS不得核定PREWRITE，不得寫正文。

---

## 二、反查順序

每一個來源事件至少依下列順序查一次：

1. **最新Current State**：現在是否HELD／ACTIVE／KNOWN／敵對／已成立。
2. **最新正式正文**：第一次合法取得／建立／發生在哪一章，以正文為物權與因果最高證據。
3. **最新POSTWRITE／章節索引／知識矩陣**：確認正文後同步帳沒有漂移。
4. **角色設定／家庭總檔**：確認Franiya既有能力、語言、魔法、戰鬥、人格與長期DNA。
5. **active queue／未完成因果**：確認是否已有硬截止、保管鏈、重檢trigger。
6. **SOURCE／原著母表**：最後才判斷原事件如何接入本線。

若SOURCE與改寫Canon衝突，不得讓SOURCE倒寫已成立正文。

固定優先級：

`FORMAL_REWRITE_PROSE / CURRENT_CANON > SYNC_LEDGER > SOURCE_DISPOSITION > HISTORICAL_RESEARCH`

---

## 三、CANON_BINDING_LEDGER

PREWRITE對當前來源窗每一個具有實質下游功能的事件，必須至少記：

- `SOURCE_EVENT_ID`
- `SOURCE_ENTITY_OR_FUNCTION`
- `REWRITE_CANON_MATCH`
- `CANON_EVIDENCE_FILE_OR_CHAPTER`
- `CURRENT_STATUS`
- `DISPOSITION_AFTER_BINDING`

若事件含多個實體，必須拆開。

例：

### 【貪狼腿甲】
- Source：117-B【俯空殺】與貪狼腿甲協同。
- Rewrite Canon：第55章以一次性額外月神石服務交換九件排行資產，完整物權轉入Franiya；第56章服務已履約CLOSED。
- Current State：HELD／未正式宣告穿戴。
- 結論：任何PREWRITE不得再寫成未取得、來源不明或需要重新補物權。

### 月神神殿第33位
- Source：109-D【洛】追擊必殺名單第33位。
- Rewrite Canon：第15章Franiya拒絕赫爾墨斯【見習神使】後，月神神殿敵對、Franiya正式列入必殺名單第33位。
- 結論：109-D不得以「Franiya沒有赫爾墨斯前提」VOID；洛追擊功能必須重建／接續。

### 精靈語
- Source：93-F／112-C／113-B。
- Rewrite Canon：Franiya早期已建立對各種語言的高速理解／反推能力，精靈語是第一個遊戲內案例；法師基準亦保留精靈語／咒式／元素排列等本地魔法規則。
- 結論：不得以「Franiya不懂精靈語」VOID。沈雲前世的具體技巧可重算，但語言與魔法功能必須保留／重建。

---

## 四、VOID額外限制

任何 `VOID_WITH_CAUSE` 除既有八格功能殘留檢查外，再加：

`VOID_CANON_REVERSE_LOOKUP_REQUIRED = TRUE`

必須先證明：

- Current State沒有已成立相同資產／能力／關係；
- 正文沒有已成立替代取得路徑；
- 角色設定沒有足以承接功能的既有能力；
- active queue沒有已登記的相同長線；
- 沒有更早章節已建立同一敵對／承諾／身份。

任一反查命中：整體VOID禁止，重新做 `INTEGRATED / REBUILD_REQUIRED / DEFERRED_WITH_TRIGGER / WORLD_BACKGROUND_LOCKED`。

---

## 五、資產與裝備特殊Gate

來源事件提到任何物品時，PREWRITE必須回答：

- `CURRENT_CUSTODY` 是誰？
- Franiya是否已持有？
- 第一次正式取得在哪章？
- 取得方式是掉落、交易、任務、公證、贈與還是其他？
- 是否HELD但未裝備？
- 是否已消耗／轉移／CLOSED？

禁止只看到SOURCE原持有人就忽略本線後來已轉移物權。

固定：

`ASSET_REVERSE_CUSTODY_LOOKUP_GATE = PASS`

---

## 六、能力／語言特殊Gate

來源事件若涉及角色「會不會」某件事，必須查：

- 角色DNA／家庭總檔；
- 角色設定；
- 已完成正式正文展示；
- 第二身份與合法系統接口；
- 遊戲殼限制與理解能力的區分。

禁止：

`ORIGINAL_PROTAGONIST_LEARNED_IT_DIFFERENTLY => FRANIYA_CANNOT_DO_IT`

正確判定是：原取得／學習原因可以不同，但Franiya若已具備等價或更高能力，就必須按本線重新映射。

---

## 七、關係／敵對特殊Gate

來源事件涉及追殺、幫助、仇恨、神殿敵對、排行榜名次或組織名單時，必須反查所有更早正式章節。

禁止只因「原著是沈雲和某人」就假定Franiya沒有同一制度性狀態。

例：Franiya已在第15章正式成為月神神殿必殺名單第33位，因此109-D的制度性追擊前提已成立。

---

## 八、失敗處理

若使用者能用一個已存在於repo的明確Canon事實指出PREWRITE判定錯誤，而該事實在PREWRITE前本來即可透過精確反查找到：

`PREWRITE_CANON_REVERSE_LOOKUP_GATE = RETRO_FAIL`

必須：

1. 停止正文；
2. 回修SOURCE disposition；
3. 回修PREWRITE；
4. 回修active queue；
5. 檢查同一錯誤前提是否污染相鄰事件；
6. 將該案例加入永久反例。

不得只改使用者點名的單一條目。

---

## 九、本次永久反例

### 反例A｜貪狼腿甲
第55章正文已透過月神石額外批次服務交換取得九件資產，包括【貪狼腿甲】。若後續PREWRITE只看原著99／117章而不反查第55章物權鏈，即為FAIL。

### 反例B｜月神神殿第33位
第15章已正式成立Franiya月神神殿敵對與必殺名單第33位。109-D再以「沒有赫爾墨斯前提」VOID，即為FAIL。

### 反例C｜精靈語
Franiya早期已正式建立精靈語／通用語言快速理解與反推能力。112-C／113-B再以「精靈語不屬Franiya」VOID，即為FAIL。

### 反例D｜已成立第二身份
原取得問題不得反向刪除【折光】與法師接口，沿用既有錯誤VOID範本。

---

## 十、固定施工口令

每次PREWRITE完成前必須能回答：

`CANON_REVERSE_LOOKUP_ENTITY_COUNT = N`

`CANON_BINDING_CONFLICT_COUNT = 0`

`ASSET_REVERSE_CUSTODY_LOOKUP_GATE = PASS`

`PREWRITE_CANON_REVERSE_LOOKUP_GATE = PASS`

任一未成立：

`PREWRITE_COMPLETE = FALSE`

`BODY_BUILD = BLOCKED`
