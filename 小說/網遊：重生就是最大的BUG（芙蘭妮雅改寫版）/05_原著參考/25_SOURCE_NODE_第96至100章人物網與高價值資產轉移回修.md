# SOURCE_NODE｜第96～100章人物網與高價值資產轉移回修

> 日期：2026-09-29  
> 性質：SOURCE_NODE / EVENT_CONSUMPTION_REPAIR / PARTIALLY_EXECUTED  
> 第一手來源窗：原著第96～100章。  
> 第96～97章：已完成回修／消耗。  
> 第98～100章：`READY_NOW / CURRENT_WINDOW_ACTIVE_TRUE`。  
> 目標：避免「只留下公告」或「沈雲私人伏擊不成立，所以整段資產與人物功能一起蒸發」。

## 一、第96章已消耗功能

已正式成立：
- 3日「世界各地新手村→華夏光明主城」臨時指定通道。
- 世界第4～10離村排行獎勵＝暗金級裝備。
- 伯爵完整制度權限：光明帝國NPC普遍尊敬、商店85折、可購買莊園、每日可主動PK 6名玩家而不受通常懲罰。
- 五階主城守護者可支配50名衛兵。

沈雲原著安排特定第4／5名的私人策略不移植；本線由公開月神石服務、公證時序、持有人既有Lv9與自行使用自然形成順位。

`CH96_EVENT_CONSUMPTION = FULLY_CONSUMED`

## 二、第97章人物網已回修

第54章正式回修commit：`4be65bc88f50df38ec03342ea41c6ff7fdadbc6e`。

已進正式正文：
1. 【糖度過高】
   - 天痕核心之一。
   - 華夏法師榜第78。
   - 第54章已選【光明主城】。

2. 【青絲縛劍】
   - 論俠行道。
   - 華夏戰士榜第41。
   - 第54章已選【光明主城】。

3. 【半夢半醒】
   - 風雪夜歸人。
   - 華夏戰士榜第53。
   - 第54章已選【光明主城】。

4. 【西江月】
   - 一品逍遙居。
   - 華夏戰士榜第92。
   - 男友【溫酒師】＝華夏牧師榜第5。
   - 第54章已以兩人的最小合法關係互動進場。
   - 第54章已選【光明主城】。

5. 【四海縱橫】
   - 華夏法師榜第26。
   - 第54章已選【光明主城】。

大夢初曉第54章前往智慧之城；細雨朦朧大魔王前往風暴之城。

Franiya本人當前不知道上述五名第6～10玩家的主城目的地。

原著只提供部分身份／排名／組織／關係，沒有完整逐句人格；第54章新增對話屬本線最小角色適配，不升格成原著完整人格定論。

`CH97_EVENT_CONSUMPTION = FULLY_CONSUMED`

## 三、第98章原著伏擊正確拆分

原著沈雲在光明主城伏擊並擊殺：
- 四海縱橫
- 西江月
- 半夢半醒
- 青絲縛劍
- 糖度過高

該行動依賴：
- 前世知情；
- 私人策略；
- 順位操控；
- 對掉落與裝備價值預知；
- 【三三卷軸】最大化掉落。

Franiya沒有這些前提。

因此只作廢：

`ORIGINAL_AMBUSH_ACTION = VOID_WITH_CAUSE`

不能跟著作廢：
- 五人實際抵達光明主城；
- 五人各自的公會／職業／關係與高端玩家位置；
- 五人持有的世界順位暗金＋華夏順位特殊道具；
- 海外高端圈把華夏排行理解成實際裝備差距；
- 第99～100章九件高價值原物的保管鏈；
- 九件原物最終合法進入Franiya保管的敘事責任。

## 四、第99～100章資產保管鏈

### 戰士暗金池
持有人：西江月／青絲縛劍／半夢半醒。

原物：
- 【貪狼鎧甲】
- 【貪狼戰盔】
- 【貪狼腿甲】

一人一件；逐件映射`SOURCE_UNSTATED`。

### 法師暗金池
持有人：糖度過高／四海縱橫。

原物：
- 【深海水晶球】
- 【火焰法杖】

一人一件；逐件映射`SOURCE_UNSTATED`。

### 四元素珠
持有人池：糖度過高／西江月／四海縱橫／半夢半醒。

原物：
- 【避風珠】
- 【避雷珠】
- 【避水珠】
- 【避火珠】

一人一顆；逐顆映射`SOURCE_UNSTATED`。

### 青絲縛劍其他特殊道具
- 另持一件未命名華夏順位特殊道具。
- 原著伏擊時沒有掉出。
- 不屬四珠池。

## 五、Franiya線資產轉移硬鎖

Franiya必取11件原著資產中，本窗口負責九件：
1. 貪狼鎧甲
2. 貪狼戰盔
3. 貪狼腿甲
4. 深海水晶球
5. 火焰法杖
6. 避風珠
7. 避雷珠
8. 避水珠
9. 避火珠

【魔·陽炎腰帶】【傳送珠】仍由黑色暗流持有，屬另一保管鏈。

`EVT-CH98-100-LIGHTCITY-ASSET-TRANSFER-001 = READY_NOW`

`CURRENT_WINDOW_ACTIVE = TRUE`

`ASSET_ACQUISITION_DEADLINE = BY_END_OF_CH98_100_EQUIVALENT_EVENT_WINDOW`

第55章PREWRITE必須回答：

> Franiya在不知道五人私人物品名稱、沒有沈雲前世情報、沒有沈雲私人報復策略的情況下，會因什麼當前真實事件與五人建立足以造成九件高價值原物轉移的合法因果？

允許方向：
- 公開且可驗證的交易／交換；
- 事前規則明示的競技／賭注；
- 雙方自願任務合作與戰利品分配；
- 當前事件自然生成的敵對衝突與掉落；
- 其他同時滿足人物利益、物權、知情與後續關係的本線因果。

禁止：
- 為拿裝備讓Franiya隨機殺人；
- 作者知識直接點名誰有哪件私人物品；
- 五人無代價贈送；
- 用「原著主角本來拿到」作物權理由；
- 為湊九件讓五人集體降智。

取得方式必須產生真實後果：交易有交換成本，競技有事前規則，任務有分配理由，衝突有責任與後續關係。

## 六、海外高端反應

第54章已補第一層：海外高端玩家開始把華夏第4～10的暗金排行獎勵視為實際裝備差距，不再只看榜單名次。

`OVERSEAS_HIGHEND_GEAR_GAP_REACTION = PARTIALLY_CONSUMED_CH54`

下一活動窗口需完成第一層後果。

## 七、六Gate

- `LOCAL_SEQUENCE_PASS = PASS`
- `CUSTODY_CHAIN_PASS = PASS`
- `KNOWLEDGE_BOUNDARY_PASS = PASS`
- `DOWNSTREAM_REUSE_PASS = PASS`
- `UNSTATED_EDGE_MARKED = PASS`
- `FORMAL_CONFLICT_CHECK_PASS = PASS_FOR_CH96_CH97 / CH98_100_PENDING_FORMAL_EXECUTION`

第96～97章：`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = PASS`。

第98～100章：`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = PASS_FOR_PREWRITE / PROSE_NOT_YET_EXECUTED`。

## 八、正文施工狀態

- 第54章人物完整性回修：DONE。
- 第96章狀態／制度功能同步：DONE。
- 第97章人物事件消耗：DONE。
- 第98～100章等價資產活動：NOT YET INTEGRATED。
- 第55章PREWRITE不得先跳原著101後事件。

`NEXT_CURRENT_TIME_ACTIVE_WINDOW = CH98_TO_CH100_EQUIVALENT_LIGHT_MAIN_CITY_ASSET_TRANSFER`。