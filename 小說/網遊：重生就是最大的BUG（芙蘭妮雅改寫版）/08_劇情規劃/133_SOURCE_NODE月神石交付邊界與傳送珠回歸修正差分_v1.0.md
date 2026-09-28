# SOURCE_NODE月神石交付邊界與傳送珠回歸修正差分 v1.0

> 日期：2026-09-29  
> 類型：FORMAL_SOURCE_REGRESSION_REPAIR_TRANSACTION  
> 最高正式章：048；本輪未建立第49章PREWRITE，未寫第49章正文。  
> 唯一 active queue：`04_連續性與索引/08_原著事件待處理佇列.md`。

## 一、來源結論

### 月神石付費資訊
- 原著明示：付費交付為「取得線路＋三顆石頭在月神遺跡的位置」。
- 原著未明示：辨識方式、已驗證結果、失敗紀錄、環境紀錄、完整發現經歷、跨村完整封包。
- 固定：`SOURCE_UNSTATED + DO_NOT_NARRATIVIZE_OR_FILL = TRUE`。

### 傳送珠
- 第84章取得【傳送珠】。
- 第107章前回地下森林明示使用【定位傳送機】。
- 第107章才用傳送珠建立星辰深淵地下森林標記。
- 第152章末才首次明示直接使用傳送珠去星辰深淵。
- 因此「第48章身處地下森林＝CURRENT_WINDOW_ACTIVE＝第一次離開前必須取得」屬過度推演，已撤銷。

## 二、正式正文回修

### 第42章
- 保留：已啟用成品【月神石】出售、416000金成交、1銀幣＋三日後08:00交付。
- 付費承諾收斂為：342前往月神遺跡的取得路線＋遺跡內三顆原始石位置。
- 刪除：辨識方式、已驗證結果、失敗／環境紀錄、完整發現經歷。
- 最低風險提示保留為本線 `ADAPTATION_OPTIONAL_BRIDGE`，不得當 SOURCE_EXPLICIT。

### 第45章
- 08:00履約維持。
- 正式交付只保留：路線＋三石位置＋最低風險提示。
- 刪除：遺跡完整結構、辨識、已驗證結果、失敗／環境紀錄、跨村完整封包、付費包內【月神石×3】啟用結果。
- 外界可以知道342遺跡中央有三顆無屬性原石；不能由付費包推出三顆都成功開光或Franiya目前剩餘數量。

### 第46章
- 2147灰船不再從342付費包繼承失敗紀錄／方法論。
- 342只提供「三石結構」最低參照。
- 2147亮槽、敲擊、聲音、角度、順序、失敗樣本回歸本地自行測試。

### 第47～48章
- 不改正文。
- `CHAPTER_TRANSACTION_048 = COMPLETE_FOR_CH48` 維持成立。

## 三、事件最終狀態

### EVT-SOURCE-MOONSTONE-DELIVERY-BOUNDARY-001
- `status = INTEGRATED`
- `ACK = ACKED_AND_REPAIRED_2026-09-29_SOURCE_BOUNDARY`
- `trigger = COMPLETE`
- `deadline = SATISFIED_BEFORE_NEXT_MOONSTONE_INFO_OR_ACTIVATION_SCENE`
- 正文累積執行commit：`4451f7a9b84c6786d7d08c5db5139ad57c466415`

### EVT-ASSET-TRANSFER-ORB-001
- `status = READY_NOW`
- `ACK = ACKED_AFTER_REGRESSION_CORRECTION`
- `CURRENT_WINDOW_ACTIVE = FALSE`
- `trigger = EVERY_CHAPTER_PREWRITE_RECHECK`
- `deadline = BEFORE_CH107_EQUIVALENT_FIXED_STAR_ABYSS_LOGISTICS_OR_FIRST_REQUIRED_TRANSFER_ORB_MARK`
- 第49章不硬塞；第42～48章不因傳送珠回改。

### 定位傳送機
- `PENDING_SOURCE_NODE_AUDIT`
- `DO_NOT_GHOST_INHERIT = TRUE`
- 尚無獨立六Gate SOURCE_NODE；未完成前不得成為Franiya本線既有資產／權限。

## 四、同步檔

已同步：
- `01_章節/042_第四十二章_先賣一塊.md`
- `01_章節/045_第四十五章_路不再回頭.md`
- `01_章節/046_第四十六章_森林還沒有走完.md`
- `04_連續性與索引/08_原著事件待處理佇列.md`
- `04_連續性與索引/01_當前狀態快照.md`
- `04_連續性與索引/06A_章節索引_043-048增量.md`
- `04_連續性與索引/07_有效性與同步稽核.md`
- `00_專案交接.md`
- `08_劇情規劃/132_第42至46章月神石正史回修差分_v1.0.md`
- 本檔。

已核對但不需修改：
- `07_工作流程/00_新對話長期主提示詞.md`
- `07_工作流程/01_原著改寫長期循環.md`
- `07_工作流程/05_正文事件佇列自動讀取與章節交易.md`
- `07_工作流程/06_SOURCE_NODE雙向稽核與證據邊界.md`

其中05流程目前已明確規定：傳送珠不是 `CURRENT_WINDOW_ACTIVE` 案例；`SOURCE_UNSTATED` 只能以最小 `ADAPTATION_OPTIONAL_BRIDGE` 跨越，因此不另做無意義重寫。

## 五、QA

- `KEYWORD_HIT_COUNTS_AS_FULL_AUDIT = FALSE`
- `SOURCE_NODE_SIX_GATES_REQUIRED = TRUE`
- `SOURCE_UNSTATED_NARRATIVIZED_AS_SOURCE_FACT = FALSE`
- `MOONSTONE_PAID_DELIVERY = ROUTE_PLUS_THREE_STONE_POSITIONS`
- `MOONSTONE_PRIVATE_PRAYER = PRESERVED`
- `MOONSTONE_ACTIVATION_SERVICE = PRESERVED_FOR_FUTURE`
- `MOONSTONE_CASHFLOW_AND_RANK_CONTROL = PRESERVED_FOR_FUTURE`
- `TRANSFER_ORB_CURRENT_WINDOW_ACTIVE = FALSE`
- `TRANSFER_ORB_CH49_FORCE_INSERT = FALSE`
- `TRANSFER_ORB_READY_NOW_RECHECK = TRUE`
- `POSITIONING_TELEPORTER_GHOST_INHERIT = FORBIDDEN`
- `CH42_45_46_MINIMAL_REPAIR = PASS`
- `CH47_48_CHANGED = FALSE`
- `CHAPTER_TRANSACTION_048 = COMPLETE_FOR_CH48`
- `NEW_CH49_PROSE = FALSE`

## 六、下一步許可

本回修交易完成並通過最終main可達性驗證後，可開始第49章PREWRITE。PREWRITE仍必須先讀唯一active queue；傳送珠每章重檢合法來源，但不存在「離開下層森林前必須取得」的硬窗口。
