# PREWRITE來源時間序與主動準備硬門檻

> 建立：2026-09-30
> 狀態：FIXED / MANDATORY
> 適用：所有正式PREWRITE、SOURCE disposition、事件延期與章節範圍判定。

## 一、問題來源

第57章PREWRITE曾把原著107-A【星辰果固定物流】判成「CH57_NOT_TRIGGERED」，理由只是Franiya當前正往日光森林走。

這個判斷錯誤，因為：
1. 原著107-A本來就在107-B日光森林事件之前；
2. Franiya已持有【定位傳送機器】與超大型空間戒指；
3. 【運送星辰果實】是明確長期任務，固定回返路線尚未建立；
4. Franiya具有高階觀察、規劃、會長與商業管理能力，不應把週期性物流拖到首次交貨前才開始想；
5. 「當前物理目的地」不能自動等於「其他已進入準備窗口的責任尚未觸發」。

因此舊判：

`CURRENT_PHYSICAL_DESTINATION != SOURCE_EVENT_NOT_TRIGGERED`

## 二、PREWRITE必做時間序核對

每個SOURCE事件進入當前來源窗時，必須記錄：
- `SOURCE_RELATIVE_ORDER`
- `CURRENT_REWRITE_ORDER`
- `WHY_ORDER_CHANGED`
- `ACTIVE_TASK_DEPENDENCY`
- `PREPARATION_SHOULD_ALREADY_START`
- `FIRST_IRREVERSIBLE_STEP`

如果原著事件位於當前目標事件之前，除非有正式Canon阻擋，禁止只因角色「正在去別處」就整段延期。

## 三、主動準備檢查

對長期任務、週期物流、倒數任務、必取資產、商業營運、追殺／敵對等，必須額外問：

1. 角色是否已知道問題存在？
2. 角色是否已有部分解法或工具？
3. 延後是否會降低未來容錯？
4. 以角色既有能力／經驗，她是否會現在開始準備？
5. 準備與「立刻完成」是否其實是兩件事？

只要1～4多數成立，就不得寫成`NOT_TRIGGERED`；至少應為：

`PREPARATION_WINDOW_ACTIVE = TRUE`

即使最終完成仍被某個未知物權／情報邊阻擋。

## 四、完成與準備必須拆開

固定原則：

`PREPARATION_ACTIVE != COMPLETION_AVAILABLE`

例如107-A：
- Franiya不知道【傳送珠】在黑色暗流手上，因此「固定路線完成」仍受阻；
- 但她已知道定位機3個月CD不能支撐每5日物流，所以「尋找固定傳送方案／開啟取得窗口」應立即ACTIVE。

禁止把「不知道答案」錯寫成「不需要開始準備」。

## 五、原著骨架優先

若使用者已確立「原著骨架／事件時間優先，人物行動依Franiya重寫」，則：

- 原著同一窗口本來與主角交叉的事件，除非Canon明確排斥，預設保留交叉；
- 不再把可由既有時間序推出的交叉丟回使用者做A／B選擇；
- 只有Canon真的存在兩條同等合法、且會造成重大長期差分時，才升成作者層決策。

## 六、章節範圍不得跳過中間來源節點

若原著順序為：

`107物流 → 107岩石巨獸 → 109月神神殿追擊 → 110～111洛戰 → 112～115後果 → 116彩虹鳥領袖`

則正式改寫不得在尚未處理／合法重排108～115功能前，直接把同一章施工上限跳到116彩虹鳥領袖。

固定：

`SOURCE_ORDER_GAP > 0 => CHAPTER_MAX_SCOPE_MUST_STOP_BEFORE_UNRESOLVED_INTERMEDIATE_NODE`

## 七、Gate

PREWRITE核定前新增：

- `SOURCE_RELATIVE_ORDER_CHECK`
- `ACTIVE_OBLIGATION_PREPARATION_CHECK`
- `COMPETENT_CHARACTER_PROACTIVE_PLANNING_CHECK`
- `INTERMEDIATE_SOURCE_NODE_SKIP_CHECK`

任一FAIL：

`PREWRITE_GATE = FAIL`
`BODY_BUILD = BLOCKED`

直到事件時間序與準備責任被正確處理。