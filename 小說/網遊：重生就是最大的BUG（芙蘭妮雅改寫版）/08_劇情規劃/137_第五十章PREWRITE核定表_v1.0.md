# 第五十章 PREWRITE 核定表 v1.0

> 前置：正式第49章〈五秒有點多〉＋135號POSTWRITE＋136號交易同步。  
> 世界時間：開服第10日，承接第49章同一登入時段。  
> 地點：星辰深淵·下層，斯芬克斯剛離場。  
> 候選章名：**〈這裡真的掉過一顆星〉**。  
> 結論：**PROJECT_PREWRITE = PASS／正式施工ALLOWED。**

## 一、SOURCE／事件Gate

- `SOURCE_READ = PASS`
  - `05_原著參考/05_原著事件捕捉_091-120.md`
  - `05_原著參考/10_原著事件捕捉反向稽核_091-120.md`
  - 原著TXT連續讀：第92章尾→第95章；反查第104～107章、第190章。
  - 新建：`05_原著參考/16_SOURCE_NODE_星辰深淵來源與芬里爾煉化鏈.md`。
- `SOURCE_NODE_STAR_ABYSS_ORIGIN_FENRIR_REFINING_CHAIN = BIDIRECTIONAL_AUDIT_COMPLETE`
- 六項 SOURCE Gate：全部PASS。
- `EVENT_CLASSIFICATION = PASS`
- `EVENT_PLANNING_COVERAGE = PASS`
- `UNCLASSIFIED_ORIGINAL_EVENTS = 0`
- `OVERDUE_ORIGINAL_EVENTS = 0`
- `SOURCE_CURSOR_START = CH93`
- `SOURCE_CURSOR_END = CH95_MINIMAL_EXIT_RECOVERY_RESULT`
- `NEXT_UNSKIPPABLE_EVENT = CH94_95_RETURN_REPORT_AND_STAR_FRUIT_LOGISTICS_AFTER_FORMAL_EXIT`

## 二、正式事件佇列處理決策

### EVT-STAR-ABYSS-ORIGIN-FENRIR-CRITICAL-MOMENT-001

- 本章處理：**YES**。
- 方法：由第49章芬里爾主動要求Franiya理解受污染果實切入；自然落地星辰深淵得名、芬里爾煉化原因、【關鍵時刻】；有限確認星辰獸／星辰能量；最後履行芬里爾協助離場承諾。
- ACK：`ACKED_CH50_PREWRITE_SOURCE_GATE_PASS`
- 章前最小修復：不需要；第48～49章已有完整合法入口。
- 禁止提前：羅蒙【運送星辰果實】、定位傳送機器、傳送珠標記。

### EVT-ASSET-TRANSFER-ORB-001

- 本章處理取得：**NO**。
- 理由：原著第107章首次建立地下森林標記；本章第一次離場不是硬截止，SOURCE_NODE已證明 `CURRENT_WINDOW_ACTIVE = FALSE`。
- 觸發／deadline：`EVERY_CHAPTER_PREWRITE_RECHECK`；最遲 `BEFORE_CH107_EQUIVALENT_FIXED_STAR_ABYSS_LOGISTICS_OR_FIRST_REQUIRED_TRANSFER_ORB_MARK`。
- ACK：`NO_NATURAL_SOURCE_KEEP_READY_NOW`。

### EVT-ASSET-TOP10-REWARD-RECOVERY-001

- 本章取得：**NO**。星辰深淵現場沒有11件原物的自然來源。
- 觸發：每章PREWRITE＋各物第一個原著下游用途前。
- ACK：`RECHECKED_NO_NATURAL_ACQUISITION_SOURCE`。

### EVT-ASSET-ELEMENTAL-PEARLS-001

- 本章處理：**NO**。
- 觸發：魚人寶庫／艾特納火山／穆斯貝爾海姆／天空之城對應硬窗前。
- ACK：`RECHECKED_NOT_TRIGGERED`。

### EVT-ASSET-WAN-GHOST-BLOOD-BOX-001

- 本章處理：**NO**。本章星辰／芬里爾事件沒有自然血盒來源，禁止硬塞。
- 觸發：每章PREWRITE＋最早自然Boss／遺跡／特殊寶箱／血系／吸血鬼來源。
- ACK：`RECHECKED_NO_NATURAL_SOURCE_IN_STAR_ABYSS_EVENT`。

### EVT-MOONSTONE-ACTIVATION-SERVICE-001 / EVT-RANK-TOP10-ORDER-001

- 本章處理：**NO**。
- 當前下層現場尚未成立第一批非Franiya玩家原石啟用／世界第二正式離村事件。
- ACK：`RECHECKED_NOT_TRIGGERED_IN_CURRENT_SCENE`。

## 三、開場硬狀態

- 現場：Franiya、芬里爾分身、昏迷貝克；斯芬克斯已離開。
- Franiya Lv10、人族游俠、自由模式；初級游俠轉職未完成。
- 基礎力量23／敏捷17；10點自由屬性未分配。
- 第48章左肩等真實功能損傷仍在；**主觀痛覺固定0**，不得寫疼痛反應。
- 【探索星辰深淵】ACTIVE；找到人不等於已向羅蒙回報完成。
- 【被污染的星辰果實】×1持有。
- 【芬里爾劍柄】持有；【芬里爾的呼喚】未使用；【解救芬里爾】ACTIVE。
- 千幻之心未建第二／第三身份。
- 火狐炎刀已暗金重煉，耐久91；靈動祝福之靴已裝備。
- 普通回城／常規傳送在下層仍不可直接使用。
- 芬里爾已承諾能協助Franiya與貝克離開。

## 四、本章主要目標

1. 讓Franiya合法理解自己手上的受污染果實。
2. 由人物對話而非百科旁白揭露星辰深淵名稱來源與芬里爾留在此處的核心原因。
3. 重建原著【關鍵時刻】長期任務，讓Franiya依自身現況選擇，而非繼承沈雲判斷。
4. 只做一次有限的星辰獸／星辰能量機制確認，不把貝克丟在現場刷素材。
5. 芬里爾履約，將Franiya與貝克送離下層；離場後讓果實污染自然退去，形成實證。
6. 章末抵達光明主城外，留下「帶貝克回報羅蒙」的自然下一章入口。

## 五、場景鏈

### A｜果實與「星辰」

- 芬里爾要求Franiya拿出樣本。
- 他先說正常星辰果實的用途，再解釋污染只屬當前受影響狀態。
- Franiya從「這東西為什麼在這裡」自然追問到星辰深淵得名與芬里爾為何留在下層。
- 芬里爾說明：巨大的「星辰」曾墜落、力量改變土壤；其分身正在煉化它，本體仍受封鎖／痛苦；約需一年多。
- 禁止把墜落天體硬定義為現實物理恆星或補完整宇宙學。

### B｜【關鍵時刻】

- 芬里爾的邀請基於本線既有關係：劍柄、【解救芬里爾】、Franiya活著抵達下層、找到貝克、辨識分身、斯芬克斯5/5。
- 面板固定：傳奇／一年／煉化末期找可幫忙的神明／失敗降5級／成功給神器材料之一。
- Franiya不預知哪位神可以幫，也不搬沈雲未來人脈。
- 她可確認這與【解救芬里爾】不是同一任務、不互相自動完成。
- 是否接受：**接受**。理由是任務方向與既有長線相容，且一年內尋找協力者，不要求她現在憑空完成。

### C｜星辰獸／星辰能量

- 芬里爾只指出更深處有一類能量生物會掉有用東西。
- Franiya設定短時間／單次確認，不做大量清場。
- 遭遇1頭Lv10【星辰獸】；同級角色殼＋Franiya技術下戰鬥不做技術苦戰。
- 合法掉落1個【星辰能量·力】：力量+5，每玩家限用一次。
- Franiya看到「每玩家限用一次」後不自行推論千幻多身份是否可各用一次；本章**先收起，不使用**，保留SOURCE_UNSTATED邊界。

### D｜離場與污染恢復

- Franiya回到貝克位置。
- 芬里爾建立六芒星離場陣；本線依第49章承諾把昏迷貝克一起送出。
- 落點：光明主城外。
- 離開受影響區域後，一段短時間內受污染星辰果實黑色異常逐漸退去；不得寫精確秒數／距離閾值。
- 面板更新為正常【星辰果實】：治療疾病、緩解疼痛；玩家使用後解除當前所有負面狀態，CD1小時。
- Franiya不必使用果實；保留樣本／任務價值。
- 貝克仍未醒。
- 【探索星辰深淵】維持ACTIVE，等待向羅蒙正式回報。

## 六、人物對話雙方議程

### Franiya
- 當前要的是：知道樣本是什麼、確認是否值得繼續深探、把貝克安全帶出去、完成任務資訊閉環。
- 不會因奇觀本身普通人式震驚；真正注意的是機制、因果與長期義務。
- 對芬里爾保持可交流但不盲信；會問必要問題，不把對方當百科全書。
- 動作：低振幅但不僵硬；耳朵、視線、手指、站位與左肩功能限制持續存在。

### 芬里爾分身
- 當前要的是：把斯芬克斯後續收乾淨、回去繼續煉化；同時判斷Franiya是否值得承擔一年後的協力節點。
- 不想：把所有封印歷史、敵人名單、神界政治一次講完。
- 社交方式：高位、直接、有自己的判斷；對Franiya因劍柄與現有任務而比普通冒險者多一層關注。
- 情緒外漏：談到本體封鎖／煉化受干擾時更簡短；看到Franiya不急著把永久屬性物品吞掉時可有一點重新評估。

### 貝克
- 本章仍昏迷，不能用突然醒來解說。
- 其身體狀態必須影響Franiya是否繼續深入與停留多久。

## 七、禁止誤寫

- 不解開貝克失神的完整原因。
- 不補迦娜完整歷史／立場。
- 不讓Franiya知道芬里爾本體精確位置。
- 不把星辰寫成已被證明的現實恆星。
- 不說污染的精確公式、恢復秒數、固定距離。
- 不把星辰獸寫成每隻必掉星辰能量。
- 不確認千幻身份可重複吃星辰能量。
- 不建立第二身份。
- 不使用【芬里爾的呼喚】。
- 不讓Franiya幽靈持有【傳送珠】／【定位傳送機器】。
- 不提前發放羅蒙【運送星辰果實】任務。
- 不讓【探索星辰深淵】在未回報前自動結算。
- 不寫主觀疼痛。
- `EVENT_HORIZON_CH50 = OFF`，本章無必要升規格。

## 八、章末新狀態

自然停點固定為：

- Franiya與仍昏迷的貝克已離開星辰深淵下層，位於光明主城外。
- 【關鍵時刻】ACTIVE；【解救芬里爾】仍ACTIVE。
- 新持有【星辰能量·力】×1，未使用。
- 原【被污染的星辰果實】已在離場後恢復為正常【星辰果實】×1，未使用。
- 芬里爾分身留在星辰深淵繼續煉化。
- 【探索星辰深淵】仍ACTIVE，下一個直接動作是帶貝克回去並向羅蒙正式回報。
- 下一章在落地羅蒙回報／星辰果長期物流前，先完成對應第94～95章回報鏈SOURCE_NODE或確認既有SOURCE_NODE可覆蓋。

## 九、PREWRITE EXECUTION CHECK

- `BASE_MAIN_HEAD = 02c5ec45e62e899501bd06d0b0fa452ba0904876`（施工前初始main；之後SOURCE／queue commit已正常推進main）
- `HIGHEST_FORMAL_CHAPTER = 049`
- `LATEST_PROSE_STOP = 芬里爾說「那就先不走。」準備說明被污染星辰果實`
- `ACTIVE_ORIGINAL_WINDOW = CH93 → CH95_MINIMAL_EXIT_RECOVERY_RESULT`
- `SOURCE_CURSOR_START = CH93`
- `SOURCE_CURSOR_END = CH95_MINIMAL_EXIT_RECOVERY_RESULT`
- `NEXT_UNSKIPPABLE_EVENT = RETURN_WITH_BECKER_AND_FORMAL_REPORT`
- `UNCLASSIFIED_ORIGINAL_EVENTS = 0`
- `OVERDUE_ORIGINAL_EVENTS = 0`
- `SOURCE_READ = PASS`
- `EVENT_CLASSIFICATION = PASS`
- `EVENT_PLANNING_COVERAGE = PASS`
- `SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = PASS`
- `PROJECT_PREWRITE = PASS`
