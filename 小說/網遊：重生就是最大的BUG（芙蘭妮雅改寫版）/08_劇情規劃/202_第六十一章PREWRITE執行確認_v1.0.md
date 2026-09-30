# 第六十一章PREWRITE執行確認 v1.0

> 日期：2026-10-01  
> 目標章：`061`  
> 暫定章名：**第六十一章｜第一百隻之後**  
> 狀態：`PREWRITE_PASS / BODY_ALLOWED`

## 一、Bootstrap／正式起點

本輪以GitHub `main` 為唯一真值，起點HEAD：

`ef65b5b7d1b990c666f2b888559e88a132116e8f`

已重新核對：
- `07_工作流程/15_新對話完整啟動與章節交易總Gate.md`
- `00_專案交接.md`
- Current State／未完成因果／Active Queue／Audit
- `04_連續性與索引/09_裝備與資產權威總表.md`
- 第60章知識矩陣與章節索引
- 第60章全文
- `02/11` Franiya完整能力施工表
- `02/12` 施法前兆解析
- `02/13` 折光外觀
- `02/14` 自由構築／多線施法／術式升階
- 家庭總檔Franiya `15.1 / 15.3 / 15.7 / 15.8 / 15.10` 有效原文
- SOURCE 116～120與121必要下游

`BOOTSTRAP_GATE = PASS`
`STATE_RESTORATION_GATE = PASS`
`ASSET_LEDGER_PREWRITE_GATE = PASS`
`KNOWLEDGE_BOUNDARY_GATE = PASS`

---

## 二、第60章精確停點

- 世界時間：開服第10日，同一登入時段。
- 地點：日光森林，更深處。
- active身份：【折光】。
- 折光：精靈／法師／共享Lv10／50精神基礎；白色長髮、璀璨金瞳、精靈長耳；無狼耳、無左眼繃帶。
- 身份切換1H鎖約剩40+分鐘。
- 【神隱】72H cooldown ACTIVE。
- 【深海水晶球】＋【火焰法杖】為折光當前明確裝備。
- 【海潮】8階：AVAILABLE_READY。
- 【火雨降臨】8階：AVAILABLE_READY，至今未使用。
- 【採集彩虹鳥的羽毛】：7／200；仍缺193根；5日倒數。
- 彩虹鳥普通擊殺：0。
- 第60章章末：折光取得第7根自然換羽翎羽後繼續往森林深處走，正在考慮下一根羽毛的取得效率。
- 公共層已有「小火球最好別信」等素材，但無可信證據證明折光＝Franiya。

`CH60_TO_CH61_CONTINUITY = DIRECT`

---

## 三、第61章核心因果

### 3.1 為什麼Franiya會開始殺彩虹鳥

Franiya不知道「殺約100隻會觸發領袖」。

她只知道：
- 任務要求200根完整翎羽；
- 現在只有7根；
- 自然換羽方式合法，但目前取得速度不足以作為唯一效率方案；
- 任務有5日倒數；
- 彩虹鳥本身就是當地可合法狩獵的任務怪物。

因此她會先以一隻普通彩虹鳥做最低樣本驗證：精確擊殺後，自屍體上取得至少一根未受損、可被任務判定為「完整翎羽」的樣本。這是本線的最小相容橋接，不宣稱原著逐隻掉落表：

`CH61_FEATHER_FROM_KILL = ADAPTATION_OPTIONAL_BRIDGE`

正文只需要證明「合法狩獵也能推進採集」，不建立未有SOURCE證據的固定掉率表。

通過一次樣本後，Franiya才基於效率決定狩獵。

### 3.2 為什麼不使用大範圍八階魔法洗地

目標是保留完整翎羽與控制MP，不是單純追求最大殺傷。

- 【海潮】500MP、10×5米，對分散飛鳥不一定是最低成本。
- 【火雨降臨】750MP、8×8米，且火系大範圍攻擊可能降低翎羽完整度。
- Franiya可用多條低負荷自由構型精確處理單體／小群飛鳥。

因此普通狩獵優先：水線、壓縮空氣、其他低耗精確構型，多線並行但不為展示上限堆滿視野。

### 3.3 領袖硬觸發

只有在正文中普通彩虹鳥實際擊殺累積到約100隻後，才允許出現：

- 系統提示「大量獵殺引起彩虹鳥領袖憤怒」；
- 5分鐘追殺；
- Lv12白銀【彩虹鳥領袖】。

`CH116_RAINBOW_BIRD_LEADER_TRIGGER = KILL_COUNT_REACHED_IN_PROSE`

禁止提前。

---

## 四、EVENT_CONSUMPTION_PLAN

`TARGET_HAN = 9000_TO_14000`
`MIN_ORIGINAL_SOURCE_CHAPTERS_TO_CONSUME = 3`
`PLANNED_SOURCE_CHAPTER_RANGE = CH116 -> CH118`
`PLANNED_CHAPTER_RESPONSIBILITY_CLOSURE = [116,117,118]`

### SOURCE 116｜雲深不知處的實力

#### ORIGINAL_EVENT
- 游俠可裝短弓但只能發揮約30%遠程武器裝備屬性；弓箭手為完整專精。
- 自由模式無輔助瞄準；頂尖弓手也常選半輔助，代表自由模式不是對所有人都必然最優。
- 原著沈雲殺約100隻彩虹鳥後觸發領袖憤怒與5分鐘追殺。
- 【彩虹鳥領袖】：Lv12白銀、HP12000、具有俯衝類攻擊、魔法驅散、龍卷風等技能；探查只能得到部分資訊。
- 【魔·陽炎腰帶】技能規則補充。
- 玩家打不破防可MISS；怪物普通攻擊至少保留1點強制傷害。
- SOURCE內對領袖火抗存在39%／5%矛盾，禁止作者擅選其一當絕對真值。

#### PRESERVATION_DELTA
`MIXED / OBJECTIVE_LEADER_TRIGGER_PRESERVED`

#### REWRITE_DISPOSITION
- 弓／輔助瞄準／傷害底層規則：`SOURCE_RULE_ONLY / WORLD_BACKGROUND_LOCKED`。
- 領袖100擊殺觸發：`INTEGRATE`，但必須由Franiya本章真實決定狩獵後累積，不得作者先知。
- 領袖戰力與技能：`INTEGRATE / RESULT_RECALCULATED`。
- 陽炎腰帶：規則保留；折光當前未裝備，禁止幽靈生效。
- 火抗矛盾：`SOURCE_CONFLICT_PRESERVED / DO_NOT_ASSERT_FIXED_PERCENT`。

#### REWRITE_RESULT PLAN
折光以低耗多線自由構型完成普通狩獵；到約100隻才觸發領袖。領袖戰按Franiya／折光當前實力、裝備與魔法理解重算，不複製沈雲數值戰。

#### RESIDUAL_STATUS PLAN
領袖處理完成；任何未明確掉落不自行補。

`CH116_TARGET = FULLY_CONSUMED`

---

### SOURCE 117｜得來全不費工夫

#### ORIGINAL_EVENT
- 魔獸晶核可儲魔，因此能直接調用魔力施法，不必完整使用人類／精靈吟唱流程。
- 出現游俠技能書【俯空殺】：高跳後借下墜衝擊攻擊，150%基礎，自由模式依高度／完成度追加，CD50秒。
- 蒂姬正式登場；可無聲接近；探查只顯示名字，其餘大量未知。
- 牛戰士面具任務真相：不是戀愛邀約。蒂姬只模糊記得牛戰士是相處約一週的「師弟」；牛戰士真正要推薦的是可挑戰／繼承【真我流】的人。
- 蒂姬進入戰鬥姿態，至少是傳奇格鬥家級高位人物。

#### PRESERVATION_DELTA
`MIXED`

#### REWRITE_DISPOSITION
- 魔獸晶核施法規則：`SOURCE_RULE_ONLY / WORLD_BACKGROUND_LOCKED`。
- 蒂姬登場、牛戰士真相、真我流入口：`INTEGRATE`。
- 牛戰士未被Franiya殺死，且【牛戰士面具】合法HELD，因此任務入口具備。
- 【俯空殺】技能本體保留，但**精確取得／掉落／學習邊仍未被SOURCE鎖定**。

固定拆分：

`CH117_PARENT_RESPONSIBILITY = CLOSE_WITH_RESIDUAL_CHILD_DEPENDENCY`

`EVT-SKILL-DIVE-KILL-001 = SOURCE_FACT_UNRESOLVED / NOT_ACQUIRED`

`GHOST_SKILL_ACQUISITION = FORBIDDEN`

正文可以讓Franiya看見彩虹鳥領袖的俯衝類攻擊、理解其物理與技巧，但這不等於取得系統技能【俯空殺】。

#### REWRITE_RESULT PLAN
領袖處理後，Franiya在同一森林自然遇到蒂姬。先由感知知道有人接近，再由名稱／對話合法確定「蒂姬」。Franiya取出但不穿【牛戰士面具】，說明來意；蒂姬揭露牛戰士真正目的並開始測試。

#### RESIDUAL_STATUS PLAN
【俯空殺】取得邊獨立留在Active Queue；技能欄仍不存在該技能。其餘117主事件責任關閉。

`CH117_TARGET = CHAPTER_RESPONSIBILITY_CONSUMED_WITH_CHILD_DEPENDENCY`

---

### SOURCE 118｜人形女暴龍

#### ORIGINAL_EVENT
- 蒂姬近乎瞬發飛膝；原著沈雲用手臂＋貪狼之爪硬擋仍受2430傷害，若未格擋推算可能超過1萬。這些數值是沈雲結果，不轉移。
- 任務轉為傳奇【蒂姬的幫手】；第一環要求在蒂姬三輪攻勢／3分鐘中存活，失敗死亡，成功進下一環，挑戰立即開始。
- 若早期牛戰士被殺，蒂姬傳奇任務不出現；Franiya此前沒有殺牛戰士，因此入口成立。
- 蒂姬原著因貪狼裝備認出貪狼王氣息；她曾與貪狼王接觸／交手。
- 兩名金髮黑鐵級小女孩與蒂姬關係親近；其中一人具清理／淨化魔法能力；孩子稱蒂姬屬大陸傳奇強者前十層級。
- 第二輪前蒂姬把自身屬性壓到與挑戰者接近，測真正戰鬥技術並避免波及孩子。

#### PRESERVATION_DELTA
`MIXED / QUEST_ENTRY_PRESERVED / SHEN_YUN_DAMAGE_RESULT_RECALCULATED`

#### REWRITE_DISPOSITION
- 飛膝與傳奇第一環：`INTEGRATE / RESULT_RECALCULATED`。
- 牛戰士存活條件：`PRESERVED`，Franiya線確實滿足。
- 貪狼氣息辨識：`RECALCULATED_NOT_TRIGGERED`，因折光沒有裝備主身份貪狼裝備，HELD不得幽靈生效。
- 兩名女孩／蒂姬前十傳說資訊／淨化能力：`INTEGRATE`，若SOURCE姓名版本仍不穩，本章不強行鎖姓名。
- 蒂姬壓低屬性：`INTEGRATE`。

#### REWRITE_RESULT PLAN
Franiya憑前兆讀取與完美時機對第一擊作合法反應，不複製沈雲硬吃2430。任務第一環成立後，蒂姬對她產生真正興趣；兩名女孩進場／被保護，蒂姬為公平與安全壓低屬性，章末進入下一輪前。

#### RESIDUAL_STATUS PLAN
三分鐘／三輪考驗尚未完成；它作為第62章起的ACTIVE CHILD EVENT延續。原著119幻想之舞尚未提前消耗。

`CH118_TARGET = FULLY_CONSUMED_WITH_ACTIVE_CHALLENGE_CHILD`

---

## 五、SOURCE NODE／證據邊界

### 5.1 【俯空殺】
已確認：
- 技能本體、150%基礎、自由模式高度／完成度追加、CD50秒。

未確認：
- 原著精確取得者；
- 精確掉落來源；
- 精確學習／入欄操作；
- 發生在領袖死亡前、後或另一相鄰節點。

因此：

`DIVE_KILL_ACQUISITION_EDGE = SOURCE_FACT_UNRESOLVED`
`DIVE_KILL_ACQUISITION_GATE = BLOCKED_CHILD`
`CH61_BODY_SCOPE = DOES_NOT_ACQUIRE_DIVE_KILL`

### 5.2 蒂姬自然出現
舊SOURCE Node要求至少領袖處理後重新檢查自然交叉，不能為了任務把蒂姬傳送過來。

本章採：領袖戰後仍位於日光森林深處；戰鬥造成足量局部動靜；Franiya繼續處理任務／戰後狀態時，有人物自然從森林另一側接近。先感知到「人」，之後才由名稱／對話知道是蒂姬。

此為：

`ADAPTATION_OPTIONAL_BRIDGE = MINIMAL_LOCAL_ENCOUNTER_AFTER_TRIGGER_WINDOW`

不聲稱原著精確相遇座標／方向。

### 5.3 證據Gate

`LOCAL_SEQUENCE_PASS = PASS_FOR_CH116_118_PROSE_SCOPE`
`CUSTODY_CHAIN_PASS = PASS`
`KNOWLEDGE_BOUNDARY_PASS = PASS`
`DOWNSTREAM_REUSE_PASS = PASS`
`UNSTATED_EDGE_MARKED = PASS`
`FORMAL_CONFLICT_CHECK_PASS = PASS`

【俯空殺】取得子節點仍是未解SOURCE事實，但因本章明確不取得，不阻擋其餘已驗證事件正文：

`SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = PASS_FOR_NON_ACQUISITION_SCOPE`

---

## 六、Franiya角色權威Gate

本章實讀家庭總檔：
- 15.1 身分、姓名與家庭位置；
- 15.3 性格核心：木然、空虛與生存；
- 15.7 武器、戰鬥與廣泛適應；
- 15.8 能力本質：作用關係與權重；
- 15.10 容易寫錯的方向。

本章固定：
- Franiya安靜低振幅，但不是被動或無判斷力。
- 任務效率不足時，她會主動換合法方法，不會因前兩章先撿自然落羽就永遠拒絕狩獵。
- 她不是沈雲，不知道100擊殺會觸發領袖，不知道蒂姬會在哪裡出現，不知道真我流任務真相。
- 完美時機是可觀測前兆＋自身控制，不是預知。
- 面對蒂姬高階近身攻擊，必須按Franiya真實感知與技術重算，不可為貼原著硬吃傷害。
- 她可以使用本體能力，但優先選最低足夠層，不為展示天體／事件視界等高層能力破壞遊戲體驗。

---

## 七、完整能力Gate

### A｜認知／感知
- `EFFECT_RELATION_PERCEPTION = ON`：讀飛鳥運動、領袖俯衝／龍卷／驅散結構、蒂姬近身前兆。
- `OCCLUSION_IMMUNITY = ON`：蒂姬無聲靠近不能等於真正從Franiya感知中消失。
- `INTERNAL_PRECURSOR_READING = ON`：蒂姬飛膝、領袖蓄力等。
- `PERFECT_TIMING_WINDOW = ON`：普通狩獵精確擊殺、領袖技能截斷／避讓、蒂姬第一擊。
- `MINIMUM_SAMPLE_PRINCIPLE = ON`：一隻普通彩虹鳥即可驗證狩獵採集合法性；不反覆浪費樣本。
- `PAIN_ZERO_DAMAGE_SENSING = PASS / ONLY_IF_HIT`：不主動安排受傷；若有功能損傷仍準確感知，主觀痛覺0。

### B｜武器／戰鬥
- `ALL_WEAPON_MASTERY = AVAILABLE`：蒂姬挑戰若進入純技術近身段可自然使用徒手／環境，不需因法師身份失去本體戰鬥理解。
- `ZERO_TRANSITION_WEAPON_SWITCH = AVAILABLE_NOT_NEEDED_AT_OPEN`。
- `INSTANT_RECONSTRUCTION = AVAILABLE_NOT_NEEDED`。
- `RANGED_COMBAT = AVAILABLE`，但折光優先魔法；不為展示游俠弓規則強行換弓。
- `TRAJECTORY_CONTROL = AVAILABLE`，若投射魔法／物體需要可低層使用。
- `PSEUDO_HOMING_REBOUND_RETURN = AVAILABLE_NOT_NEEDED`。
- `FOUR_TIER_PARRY = AVAILABLE`，蒂姬近戰需重新判斷最低足夠層。

### C｜角色殼／裝備／身份
- `CURRENT_ACTIVE_IDENTITY = ZHEGUANG`。
- `ONE_HOUR_SWITCH_LOCK = ACTIVE_AT_CHAPTER_START`，約40+分鐘。
- `DEEP_SEA_CRYSTAL_BALL = IDENTITY_EQUIPPED`。
- `FIRE_WAND = IDENTITY_EQUIPPED`。
- `TIDAL_WAVE_8TH = AVAILABLE_READY / EVALUATED_NOT_NECESSARILY_USED`。
- `FIRE_RAIN_8TH = AVAILABLE_READY / EVALUATED_NOT_NECESSARILY_USED`。
- `SECOND_IDENTITY_MAGIC = ON`。
- `THUNDER_FIELD = UNAVAILABLE_WITH_CURRENT_IDENTITY_EQUIPMENT / NO_GHOST_STACK`。
- `PRIMARY_IDENTITY_GREEDY_WOLF_GEAR = HELD_NOT_EQUIPPED / NO_GHOST_STACK`。
- `BULL_WARRIOR_MASK = HELD_NOT_WORN / MAY_BE_SHOWN_AS_QUEST_PROOF`。
- `MAGIC_YANGYAN_BELT = HELD_NOT_EQUIPPED / NO_GHOST_SKILLS`。

### D｜高階本體能力
- `GENERAL_EFFECT_WEIGHT_ADJUSTMENT = AVAILABLE / LOWEST_TIER_ONLY_IF_ROLE_SHELL_CANNOT_EXECUTE_KNOWN_RESPONSE`。
- `SPEED_LIMIT_RELEASE = AVAILABLE / OFF_BY_DEFAULT`；只有Franiya已知道答案、但角色殼自限速度客觀趕不上時才可用，不能當常駐加速。
- `EVENT_HORIZON_LOCAL = OFF`。
- `EVENT_HORIZON_RANGE_COMPOSITE = OFF`。
- `FULL_BLACK_HOLE_CELESTIAL = OFF`。
- `OTHER_HIGH_LEVEL_BODY_ABILITY = OFF_UNLESS_UNFORESEEN_HARD_REQUIREMENT`。

### E｜知識／來源／最低足夠層
- `KNOWLEDGE_GAIN = PASS`。
- `ABILITY_SOURCE_ATTRIBUTION = PASS`。
- `LOWEST_SUFFICIENT_TIER_SELECTED = PASS`。
- `ABILITY_NOT_EVALUATED = 0`。

`FRANIYA_ABILITY_GATE = PASS`

---

## 八、魔法專項Gate

- 普通飛鳥狩獵優先多條低耗、低破壞、精確自由構型。
- 雙線不是並行上限；本章可以依需要同時維持多於兩條，但不為數量表演。
- 【海潮】／【火雨降臨】已證明八階角色殼承載；「不使用」不等於不能使用。
- 領袖具有魔法驅散，Franiya可讀其正在建立的驅散作用；不要把她寫成必須先吃一次才知道那是拆魔法結構的效果。
- SOURCE未鎖領袖火抗矛盾值，Franiya若實際測試，只能得到**本線此刻的實際作用結果**，不能反向宣布原著39%或5%哪個才是唯一真值。
- 神咒／超八階與本章無自然需求，不為展示設定硬上強度。

`FRANIYA_MAGIC_OPTIMIZATION_GATE = PASS`
`FRANIYA_PARALLEL_CAST_GATE = PASS`
`FRANIYA_FREE_CONSTRUCTION_TIER_GATE = PASS`
`FRANIYA_PERMISSION_VS_TECHNIQUE_GATE = PASS`

---

## 九、知識邊界

### Franiya章首知道
- 自己任務7／200、5日限時；自然換羽可取得完整翎羽。
- 自己尚在折光身份切換鎖。
- 日光森林已有彩虹鳥。
- 牛戰士曾讓自己拿面具尋找蒂姬；面具仍在自己手上。

### Franiya章首不知道
- 殺到約100隻會觸發彩虹鳥領袖。
- 領袖等級、HP、技能名、抗性百分比。
- 【俯空殺】存在／取得法（除非本章有合法語義來源；看見領袖俯衝動作只等於理解動作）。
- 蒂姬正在哪裡、何時來。
- 牛戰士和蒂姬的真實關係。
- 真我流、傳奇第一環、三輪／三分鐘規則。
- 兩名金髮女孩的姓名與能力。

### 蒂姬章首對Franiya／折光
不得預設她知道折光＝Franiya、洛事件、公共論壇、Franiya完整本體能力。她只能依當下看見／感知／任務物件形成認知。

`KNOWLEDGE_BOUNDARY_QA = PASS`

---

## 十、資產與CD Gate

### active身份裝備
- 【深海水晶球】暗金：EQUIPPED_ZHEGUANG。
- 【火焰法杖】暗金：EQUIPPED_ZHEGUANG。

### relevant held assets
- 【牛戰士面具】：HELD_NOT_WORN；本章蒂姬線可作證物／來意說明，但預設不轉移物權。
- 【魔·陽炎腰帶】：HELD_NOT_EQUIPPED。
- 四件貪狼：HELD_NOT_EQUIPPED_ON_ZHEGUANG。
- 四元素珠／芬里爾劍柄等：HELD，不得幽靈套用。

### active cooldowns
- 【神隱】：72H_COOLDOWN_ACTIVE。
- 【傳送珠】：CURRENT_DAY_USE_CONSUMED。
- 【定位傳送機器】：3_MONTH_COOLDOWN_ACTIVE。
- 【海潮】：READY。
- 【火雨降臨】：READY。

### named equipment skill evaluation
- 【海潮】：`AVAILABLE_READY / NOT_REQUIRED_FOR_ORDINARY_BIRD_HUNT / REEVALUATE_ON_LEADER`。
- 【火雨降臨】：`AVAILABLE_READY / FIRE_FEATHER_DAMAGE_AND_750MP_COST_MAKE_IT_NONDEFAULT / REEVALUATE_ON_LEADER`。
- 【雷電磁場】：`UNAVAILABLE_WITH_REASON = WINGS_NOT_EQUIPPED_ON_ACTIVE_IDENTITY`。
- 【陽炎之力／陽炎殉爆】：`UNAVAILABLE_WITH_REASON = BELT_NOT_EQUIPPED_ON_ACTIVE_IDENTITY`。

`ASSET_LEDGER_PREWRITE_GATE = PASS`

---

## 十一、禁止錯誤

1. 不得讓Franiya在第100隻以前知道領袖將來。
2. 不得因原著有【俯空殺】就讓技能書憑空掉落／技能自動入欄。
3. 不得把彩虹鳥領袖的俯衝技能直接等同游俠具名技能【俯空殺】。
4. 不得讓折光使用未裝備的貪狼、陽炎腰帶、驚雷羽翼技能。
5. 不得複製沈雲對蒂姬第一膝2430／萬傷推算。
6. 不得讓蒂姬因作者知道Franiya很強就提前全知。
7. 不得把Franiya看到飛膝前兆寫成預知未來。
8. 不得把兩名女孩姓名在SOURCE仍有版本差時硬鎖。
9. 不得提前寫119【幻想之舞】；本章章末停在第二輪正式開始前。
10. 不得把未完成的三輪／三分鐘考驗誤報成已通過真我流資格。

---

## 十二、章末預定停點

- 彩虹鳥普通擊殺已達約100；領袖已觸發並處理。
- 羽毛任務由7／200顯著上升，但精確值依正文合法採集逐步記錄；不以SOURCE未證明的自動掉率灌數。
- 【俯空殺】仍未取得。
- 蒂姬已合法登場；牛戰士面具來意與真我流入口已揭露。
- 【傳奇任務：蒂姬的幫手】第一環已觸發。
- 蒂姬第一輪／首次高壓攻擊結果已按Franiya重算。
- 兩名金髮女孩已自然進場；名字若未合法確定仍保持未知。
- 蒂姬為公平／避免波及孩子，將自身屬性壓到接近折光當前層級。
- 章末一句／動作進入第二輪，但119幻想之舞尚未開始。

`EVENT_CONSUMPTION_CURSOR_AFTER_POSTWRITE = THROUGH_CH118_IF_ALL_PLANNED_RESPONSIBILITIES_CLOSE`
`CH119 = READY_NEXT`
`CH62_BODY_GATE = BLOCKED_UNTIL_NEW_PREWRITE`

---

## 十三、VOID預判

本章預計不需要新增VOID_WITH_CAUSE。

沈雲的私人數值結果、私人裝備搭配與其後119～120私人現實武術選擇，採 `RECALCULATED_RESULT / NONTRANSFERABLE_PRIVATE_CAUSALITY`；只有真正失效且需要正式作廢的事件功能才使用VOID。

`PLANNED_NEW_VOID_WITH_CAUSE_COUNT = 0`

---

## 十四、最終Gate

`BOOTSTRAP_GATE = PASS`
`SOURCE_PRESERVATION_DELTA_GATE = PASS`
`SOURCE_SIBLING_COMPLETENESS_CHECK = PASS_FOR_CH116_118_SCOPE`
`DIVE_KILL_ACQUISITION_GATE = BLOCKED_CHILD_NOT_USED_IN_BODY`
`FRANIYA_ABILITY_GATE = PASS`
`FRANIYA_MAGIC_GATE = PASS`
`ASSET_LEDGER_PREWRITE_GATE = PASS`
`KNOWLEDGE_BOUNDARY_GATE = PASS`
`CH61_PREWRITE_GATE = PASS`
`CH61_BODY_GATE = ALLOWED`
