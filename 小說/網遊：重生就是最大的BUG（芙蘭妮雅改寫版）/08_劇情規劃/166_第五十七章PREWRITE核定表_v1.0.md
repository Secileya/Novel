# 第五十七章 PREWRITE核定表 v1.0

> 日期：2026-09-30  
> 狀態：`PREWRITE_COMPLETE / PENDING_ONE_AUTHOR_DECISION`  
> 對應上游：第56章RETRO交易已CLOSED  
> SOURCE_NODE：`05_原著參考/33_SOURCE_NODE_第107至117章日光森林與彩虹鳥窗口.md`

---

## 一、正式入口

- `CURRENT_FORMAL_CHAPTER = 056`
- `NEXT_FORMAL_CHAPTER = 057`
- 世界時間：開服第10日，同一登入時段。
- Franiya已正式走出光明主城東門，朝【日光森林】移動。
- 【採集彩虹鳥的羽毛】＝ACTIVE，0／200，剩餘約4日23時以上。
- 游俠轉職尚未完成。
- 【運送星辰果實】仍ACTIVE，但本章當前物理動線不是星辰深淵。
- 第56章皇家寶庫／置產／額外月神石批次均已合法收口。

---

## 二、第57章核心章節責任

本章不是直接跳進彩虹鳥BOSS房。

必須依序建立：
1. 光明主城東門外→日光森林的實際移動。
2. 107-B：多職業初級轉職任務集中日光森林，玩家／小隊密度明顯上升。
3. 107-D：岩石巨獸世界事件是否與Franiya自然交叉，依本PREWRITE唯一作者決策處理。
4. Franiya開始實際尋找／擊殺彩虹鳥，羽毛任務進度開始變動。
5. 游俠短弓／操作模式規則只在Franiya實際接觸相應武器時自然呈現，不為展示設定硬塞。
6. 若當章擊殺數接近約100隻，必須觸發【彩虹鳥領袖】5分鐘追殺。
7. 在【俯空殺】精確取得邊未恢復前，本章不得跨過任何會使該技能應被取得／學會的未驗證節點。

---

## 三、章節最大安全施工範圍

`CH57_MAX_SAFE_SCOPE = FOREST_ENTRY_TO_RAINBOW_BIRD_LEADER_ENGAGEMENT_BEFORE_UNVERIFIED_DIVE_KILL_ACQUISITION_EDGE`

可以寫：
- 日光森林入口與高密度轉職玩家。
- 岩石巨獸事件的A／B分支。
- 彩虹鳥普通狩獵。
- 羽毛進度自然上升。
- 約100擊殺後系統觸發領袖憤怒與5分鐘追殺。
- 【彩虹鳥領袖】登場、探查只能讀部分資訊、第一輪交鋒。

不可寫：
- 無來源證據地讓【俯空殺】掉落、進背包、被學會或被使用。
- 為了補【俯空殺】自行杜撰NPC導師／寶箱／系統贈送來源。
- 在沒有合法接觸下讓黑色暗流突然送來【傳送珠】或【魔·陽炎腰帶】。
- 強迫Franiya本章中途離開日光森林去做星辰深淵物流，只因原著107-A排序更早。

---

## 四、107～117來源事件處理表

### 107-A｜星辰果固定物流
- `REBUILD_REQUIRED / CURRENT_CH57_SCENE_NOT_TRIGGERED`
- 【定位傳送機器】已持有，第一次回返工具成立。
- 【傳送珠】仍缺，固定往返未成立。
- 本章不主動觸發星辰深淵回返，因此尚未越過硬截止。

### 107-B｜日光森林轉職人口
- `MUST_RENDER_CH57`
- 不能把森林寫成只有Franiya與任務怪的空副本。

### 107-C｜雷電磁場
- `DEFERRED_WITH_TRIGGER`
- 本章不補虛假來源。

### 107-D｜岩石巨獸／燃燒軍團／霓裳
- 世界事件必然存在：`WORLD_BACKGROUND_LOCKED`
- Franiya直接交叉：`PENDING_AUTHOR_DECISION`
- 原沈雲故意踩攻擊線、搶BOSS、後續殺人不得套用。

### 108～115
- 所有沈雲專屬事件已依33號SOURCE_NODE拆成scene／method／private-motive scoped VOID。
- 人物、組織、媒體、論壇、神殿、世界規則、龍寵規則與Franiya已成立身份能力均保留。
- 本章若107-D選A，任何新互動都由Franiya現場行為重新生成，不能偷接舊仇怨結果。

### 116-A/B｜游俠短弓／操作模式
- `WORLD_BACKGROUND_LOCKED`
- 游俠可用短弓但只發揮約30%裝備屬性。
- 自由模式無輔助瞄準；半輔助在弓系可有實際優勢。

### 116-C｜彩虹鳥領袖
- `REBUILD_REQUIRED / CURRENT_WINDOW`
- 約100隻彩虹鳥擊殺後必觸發5分鐘追殺。
- 不得刷滿200再補BOSS。
- Boss完整作者層數值不等於Franiya探查可見內容。

### 116-E｜魔·陽炎腰帶
- `WORLD_BACKGROUND_LOCKED / BLACK_CURRENT_CUSTODY`
- 本章不因它能力很強就讓Franiya幽靈知道面板。

### 116-F｜破防規則
- `WORLD_BACKGROUND_LOCKED`
- PvP完全不破防可MISS；怪物普攻仍有最低1點。

### 117-A｜魔獸晶核施法
- `WORLD_BACKGROUND_LOCKED`

### 117-B｜俯空殺
- `REBUILD_REQUIRED / SOURCE_FACT_UNRESOLVED`
- 技能效果已確認：150%基礎、自由模式依完成度與高度追加、CD50秒、與貪狼腿甲協同。
- 精確掉落／取得／學習節點尚無可信原文證據。
- `GHOST_SKILL_ACQUISITION = FORBIDDEN`

### 117-C～E｜蒂姬／牛戰士／真我流
- `DEFERRED_WITH_TRIGGER`
- 至少在彩虹鳥領袖處理後重檢；本章不為趕原著章號硬塞登場。

---

## 五、黑色暗流兩件必取資產核定

`MUST_ACQUIRE_11_PROGRESS = 9/11`

尚缺：
- 【魔·陽炎腰帶】
- 【傳送珠】

作者保管：BLACK_CURRENT。

本章核定：
- `CURRENT_WINDOW_ACTIVE = FALSE_FOR_FOREST_TRANSFER_TASK`
- `DEADLINE_MISSED = FALSE`
- 原因：第一個不可缺席節點是固定星辰深淵物流／地下森林傳送標記，本章物理目標是日光森林轉職。
- `NEXT_RECHECK_TRIGGER = ANY_BLACK_CURRENT_RECONTACT + ANY_STAR_ABYSS_RETURN_PLAN + NEXT_PREWRITE`
- 若正文意外自然遇到黑色暗流，立即重新開啟物權窗口，不得忽略。

---

## 六、星辰果物流核定

- 【定位傳送機器】＝HELD／UNUSED。
- 超大型空間戒指已解決大宗容量。
- 固定路線仍缺。
- 本章沒有準備第一次有效交付，也沒有啟動定位機回地下森林。
- 因此：
  - `STARFRUIT_FIXED_LOGISTICS_DEADLINE_MISSED = FALSE`
  - `STARFRUIT_ROUTE_RECHECK = DEFER_TO_FIRST_RETURN_PLAN`
- 禁止將「原著107-A在107章」機械理解成「Franiya第57章必須先回深淵」。本線依實際責任與物理動線排序。

---

## 七、Franiya人物／能力保全

- 不因原著112-C、113-B等沈雲專屬場景VOID而削弱【折光】。
- 【折光】仍是合法精靈／法師第二身份，Lv10／50精神。
- 已理解並實測低階元素構型與雙構型並行。
- 不具有沈雲前世精靈語雙倍魔法技巧。
- 本章主身份仍為Franiya／見習游俠；除非正文出現充分理由，不為展示第二身份而隨意切換。
- Franiya面對陌生森林仍維持既有行為：先看地形、人群、退出線、怪物分布與任務效率，不做無目的表演。

固定：
`GAME_SHELL_LIMITS_OUTPUT, NOT_UNDERSTANDING`

---

## 八、VOID_DISCLOSURE_LEDGER

本輪PREWRITE重新使用的有效VOID均為function-scoped，不是整事件刪除：

1. 108-A 沈雲版道歉／熱搜場景。
2. 108-B 霓裳對沈雲的特定私人假設。
3. 108-C 沈雲假幫忙真搶BOSS的方法。
4. 109-A 沈雲殺霓裳五人場景。
5. 109-C 因沈雲殺人形成的特定追殺／仇敵鏈。
6. 109-D 沈雲因赫爾墨斯關係成月神神殿第33必殺目標。
7. 110-A 洛反覆殺沈雲至新手村的追殺場景。
8. 111-D 沈雲對洛的特定生存戰結果。
9. 111-G 沈雲私人七項路線排序。
10. 112-C 沈雲第二身份精靈語欺騙PvP場景／方法。
11. 113-B 沈雲精靈語海潮傷害算例。
12. 113-F 沈雲為錦繡滲透調整第二身份臉的計畫。
13. 114-B 沈雲殺人後霓裳哭播／清酒牧歌評論造勢場景。
14. 114-C 「女人是沈雲軟肋」特定推理。
15. 114-E 用錦繡摩擦測沈雲軟肋計畫。
16. 115-A 針對沈雲的青年偶像／封殺文章鏈。
17. 115-B 「華夏美女收割機」外號。
18. 115-C 雲深不知處承載所有惡的私人身份策略。
19. 115-D 沈雲論壇挑釁原句與世界趨勢事件。
20. 115-F 沈雲前世四翼黑龍私人寵物。

每項的原因、Franiya替代因果與保留功能已在33號SOURCE_NODE逐項寫明；最終對使用者回報仍須公開，不得只藏在本檔。

---

## 九、唯一作者層待決事項

### DECISION-CH57-ROCKBEAST-INTERSECTION-001

**A｜Franiya自然撞上岩石巨獸／霓裳羽衣／燃燒軍團事件，正文演出。**
- 不照搬沈雲的搶BOSS、故意紅名、殺人。
- Franiya依現場規則與自身判斷行動。
- 會建立新的星羽／燃燒軍團直接關係。

**B｜Franiya與該場事件在路線／時間上錯開。**
- 世界事件照常發生，但本章Franiya不直接參與。
- 第57章更聚焦彩虹鳥游俠轉職。
- 星羽／燃燒軍團直接關係延後。

此題無Canon唯一答案，且會改變長期人物關係，因此必須由使用者確認。

---

## 十、Gate

`LOCAL_SEQUENCE = PASS`
`CUSTODY_CHAIN = PASS`
`KNOWLEDGE_BOUNDARY = PASS`
`DOWNSTREAM_REUSE = PASS`
`UNSTATED_EDGE = PASS_WITH_HARD_SOURCE_BOUNDARY`
`FORMAL_CONFLICT_CHECK = PASS`
`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = PASS_FOR_PRE_DIVE_KILL_SCOPE`
`SOURCE_SIBLING_COMPLETENESS = PASS`
`VOID_FUNCTION_RESIDUE_CHECK = PASS`
`FRANIYA_SUBSTITUTE_CAUSE_CHECK = PASS`
`CHARACTER_INFERENCE_CHECK = PASS`
`ESTABLISHED_IDENTITY_CAPABILITY_PRESERVATION_CHECK = PASS`
`ECONOMIC_CHAIN_CONTINUITY_CHECK = PASS`
`RELATIONSHIP_FUNCTION_CONTINUITY_CHECK = PASS`
`STATE_LEDGER_DRIFT_CHECK = PASS`

`DIVE_KILL_ACQUISITION_EDGE = SOURCE_FACT_UNRESOLVED`
`AUTHOR_DECISION_PENDING = DECISION-CH57-ROCKBEAST-INTERSECTION-001`
`CH57_PREWRITE_GATE = PASS_PENDING_USER_AUTHOR_DECISION`
`CH57_BODY_GATE = BLOCKED_PENDING_USER_AUTHOR_DECISION`
`CH57_DIVE_KILL_ACQUISITION_GATE = BLOCKED_PENDING_SOURCE_EVIDENCE`

使用者選A或B後，可直接更新本PREWRITE為核定版並進入第57章安全正文範圍；不需重問Canon已能推出的事項。
