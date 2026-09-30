from pathlib import Path
import re, subprocess

root = Path('小說')
proj = root / '網遊：重生就是最大的BUG（芙蘭妮雅改寫版）'

def read(p): return p.read_text(encoding='utf-8')
def write(p,s): p.write_text(s.rstrip()+chr(10), encoding='utf-8')
def repl(p, old, new, label, count=1):
    s=read(p)
    if old not in s: raise SystemExit(f'missing:{label}')
    s=s.replace(old,new,count)
    write(p,s)
def sec(p, pat, new, label):
    s=read(p); ns,n=re.subn(pat,new,s,flags=re.S)
    if n!=1: raise SystemExit(f'{label}:{n}')
    write(p,ns)

family = root/'家庭總檔/09_芙蘭妮雅施法載體與魔法造詣補充.md'
repl(family,
'''若某種「神咒」的難點只是術式複雜度、元素排列、能量控制、幾何、多層咒式、多線並行與即時重算，這些本身不構成Franiya的學習瓶頸。真正能限制她實際放出的，是可用能量／MP、角色殼吞吐、世界法則與不可偽造的神格、血脈、唯一職業、神權或其他硬權限。\n\n缺少權限時，她不能偽造那把「系統鑰匙」；但若同一效果能由其他合法作用路徑重建，她可以在現有資源內設計替代／近似術式。''',
'''「神咒」首先表示威力、效果或術式層級已達神級的魔法。它不是神殿專屬術式的同義詞，也不預設一套所有神咒共用的神格、神權、血脈或職業門檻。\n\n每一道具體神咒的前置條件都要個別判定。有些只要求足夠能量、角色殼承載與術式控制；有些才因自身機制另外要求神格、神權、特定血脈、唯一職業、神器、神殿許可或其他條件。\n\n因此，純技術／純能量型神咒若難點只是神級規模、術式複雜度、元素排列、能量控制、幾何、多層咒式、多線並行與即時重算，這些本身不構成Franiya的學習瓶頸。實際能否施放先看資源與角色殼承載；只有該神咒本身另有明確權限時，才核對那一項權限。''','family09')

p=proj/'02_角色設定/09_Franiya法師身份與施法尺度基準.md'
sec(p,r'## 七、神咒級複雜度與真正瓶頸\n.*?(?=## 八、)',
'''## 七、神咒層級與真正瓶頸\n\n神咒是威力、效果或術式層級達到神級的魔法分類，不是神殿專屬的同義詞，也不自動附帶固定的神格、神權、血脈或唯一職業要求。\n\n具體前置逐咒判定：純技術／純能量型神咒可能只需要足夠MP、精神、角色殼吞吐與術式控制；另一部分神咒則可能因自身機制要求神格、神權、特定血脈、唯一職業、神器、神殿許可或其他身份鑰匙。不得只因名稱叫神咒就自行補上一整套權限。\n\n對Franiya而言，神級規模與高複雜度本身不是理解牆。實際能不能放，先看角色殼是否供得起；若某一道神咒另有特殊前置，再只核那一道神咒的條件。\n\n施工固定語意：神咒代表神級術式／效果層級；神咒的特殊權限需求逐咒判定；術式複雜度本身不是Franiya的學習瓶頸。\n\n''','project09')

p=proj/'02_角色設定/14_Franiya自由構築_多線施法與術式升階補充.md'
sec(p,r'## 六、神咒級複雜度不是Franiya的理解瓶頸\n.*?(?=## 七、)',
'''## 六、神咒是神級術式層級；前置條件逐咒判定\n\n神咒表示術式或效果已達神級層次。它不等於神殿專屬，也不代表所有神咒都必須先取得神格、神權、血脈或唯一職業。\n\n判定時先看這一道神咒的實際結構與輸出，再看它自己有沒有額外前置。只有資料明示或合法觀測支持時，才加入神格、神權、特定血脈、唯一職業、神器、神殿許可等條件。\n\n有些神咒完全可以是純術式／純能量型，只要資源與角色殼承載足夠就能施放；另一些神咒才有專屬權限鎖。兩者都可以是神咒。\n\n對Franiya而言，若某個神咒的困難只是神級規模、術式複雜度、元素排列、能量控制、幾何、多層咒式、多線並行與即時重算，她可以理解、推演與設計。真正限制實際輸出的是當前MP、精神、角色殼吞吐與本地世界硬規則；只有該神咒本身另帶特殊權限時，才把那項權限加入限制。\n\n禁止把「神咒」直接翻譯成「必須神格／神權」；也禁止反向宣稱所有神咒都不需要權限。答案只能由具體神咒決定。\n\n''','project14')

p=proj/'07_工作流程/15_新對話完整啟動與章節交易總Gate.md'
repl(p,
'- 真正有效限制優先檢查MP、精神、瞬時吞吐、環境、職業／世界硬規則、神格／血脈／神權／唯一權限，而不是把術式複雜度本身誤寫成Franiya的學習瓶頸。',
'- 神咒按神級威力／效果／術式層級理解，不自動等同神殿專屬，也不預設固定的神格、神權、血脈或唯一職業門檻。每一道神咒的特殊前置逐咒判定；高階／神咒術式先檢查MP、精神、瞬時吞吐、環境與世界硬規則，只有該具體術式已知有特殊權限時才額外核對。','gate15')

p=proj/'01_章節/060_第六十章_小火球最好別信.md'
repl(p,
'''如果某個所謂神咒必須先有神格、神權、特殊血脈、唯一職業，或者某種只有神殿才能給的許可，那就是權限。\n\n她可以看懂門。\n\n不代表系統會把鑰匙憑空塞給她。\n\n也不代表她需要因為沒有鑰匙，就假裝自己連門的結構都看不懂。''',
'''神咒本身只是另一個層級。\n\n威力、效果或術式完整度真正跨進神級，才是那個稱呼首先代表的東西。\n\n至於要不要神格、神權、特殊血脈、唯一職業，甚至神殿許可，要看是哪一道神咒。\n\n有的要。\n\n有的不用。\n\n如果只是把能量、結構與控制推到神級，那她真正缺的只會是這個角色殼能不能供得起。\n\n如果某一道神咒自己另外鎖了一把鑰匙，那才是那一道術式的權限問題。\n\n沒有哪條規則說，每一道叫作神咒的術式，都一定掛著同一把鎖。''','ch60')

p=proj/'04_連續性與索引/01_當前狀態快照.md'
repl(p,
'- 高位術式若只難在結構、排列、幾何、能量與並行，對Franiya不是理解瓶頸；真正限制優先看MP、精神、角色殼瞬時吞吐、等級／世界硬規則與神格／神權／血脈／唯一職業等權限。',
'- 神咒表示神級術式／效果層級；純技術／純能量型神咒先受MP、精神、角色殼吞吐與世界規則限制。只有某一道具體神咒自身已知另有神格、神權、血脈、唯一職業等前置時，才核那一項條件。','state')

p=proj/'04_連續性與索引/02_未完成因果與待定事項.md'
repl(p,
'- 真正需要時先核MP、精神、瞬時吞吐、環境元素、職業／世界硬規則與神格／神權／血脈／唯一職業等權限。',
'- 真正需要時先核MP、精神、瞬時吞吐、環境元素、職業與世界硬規則；若涉及具體神咒，再依那一道神咒自身資料判定是否另有神格、神權、血脈、唯一職業、神器或神殿許可等前置。','unfinished')

p=proj/'04_連續性與索引/04M_角色知識矩陣_第60章增量.md'
repl(p,
'- 若高位術式難點只在結構、排列、幾何、能量與並行，對Franiya不是理解瓶頸；真正硬限制是MP、精神、角色殼吞吐、世界規則與神格／神權／血脈／唯一職業等權限。',
'- 神咒代表神級術式／效果層級；純技術／純能量型神咒的神級複雜度對Franiya不是理解牆，實際先受MP、精神、角色殼吞吐與世界規則限制。只有某一道神咒自身明示需要神格、神權、血脈、唯一職業等前置時，才核那一項權限。','knowledge1')
repl(p,'- 神格／神權／特殊血脈／唯一職業等權限如何取得。','- 各具體神咒是否帶有神格／神權／血脈／唯一職業等特殊前置，以及這些前置的取得方式。','knowledge2')

p=proj/'04_連續性與索引/06I_章節索引_第60章增量.md'
repl(p,
'10. 正文固定：具名系統技能權限≠自由構築等價術式；Franiya可優化8階實效，但不能憑空取得同名UI、神格／神權／血脈／唯一職業等硬權限。',
'10. 正文固定：具名系統技能權限與自由構築等價術式分流；Franiya可優化8階實效。神咒只代表神級術式／效果層級，是否另需神格、神權、血脈、唯一職業等前置，要逐個神咒判定。','index60')

p=proj/'08_劇情規劃/197_第六十章POSTWRITE差分_v1.0.md'
s=read(p).replace('> 狀態：`POSTWRITE_PASS / SYNC_REQUIRED`','> 狀態：`POSTWRITE_PASS / SYNCED / TRANSACTION_CLOSED`',1)
s=s.replace('13. 高位術式若只難在元素排列／幾何／能量控制／並行，對Franiya本體不是理解瓶頸；真正限制是MP、精神、角色殼吞吐、世界硬規則與神格／血脈／唯一職業／神權等權限。','13. 神咒表示神級術式／效果層級；若某神咒只是純技術／純能量型，其神級規模與複雜度對Franiya不是理解牆，實際先受MP、精神、角色殼吞吐與世界規則限制。神格／神權／血脈／唯一職業等只在該具體神咒自身有此要求時成立。',1)
s=s.replace('- 未取得神格／神權／血脈／唯一職業等權限內容。','- 各具體神咒是否另有神格／神權／血脈／唯一職業等特殊前置，以及其取得方式。',1)
s=s.replace('`ASSET_LEDGER_SYNC_REQUIRED = TRUE`','`ASSET_LEDGER_SYNC_REQUIRED = FALSE`\n`CH60_TRANSACTION_CLOSED = TRUE`',1)
write(p,s)

# Active Queue: advance current branch and preserve completed source summary
p=proj/'04_連續性與索引/08_原著事件待處理佇列.md'
s=read(p)
s=re.sub(r'## 二、正式進度／來源窗口\n.*?(?=---\n\n## 三、)', '''## 二、正式進度／來源窗口\n\n`CURRENT_FORMAL_CHAPTER = 060`\n`NEXT_FORMAL_CHAPTER = 061`\n`EVENT_CONSUMPTION_CURSOR = THROUGH_CH115`\n`SOURCE_READ_CURSOR > EVENT_CONSUMPTION_CURSOR`\n`NEXT_SOURCE_WINDOW = CH116_FORWARD`\n`CH61_PREWRITE_REQUIRED = TRUE`\n`CH61_BODY_GATE = BLOCKED_UNTIL_PREWRITE`\n\n第60章PREWRITE、正文與POSTWRITE已完成；113、114、115現行分支責任已完整消耗。\n\n''',s,flags=re.S)
s=re.sub(r'## 四、第60章READY_NOW／最低三章來源責任\n.*?(?=## 五、)', '''## 四、第60章已完成／113～115消耗結果\n\n- CH113：雨天決行身份、冰霜舞步推測、匿名擊殺規則、海潮實戰、法器疊加、元素排列功能均已處理。\n- CH114：霓裳／清酒牧歌／高端圈公共分析功能已依本線真實素材重建。\n- CH115：官媒／公共責任／論壇迷因功能已重建；沈雲專屬外號與人格策略未移植。\n- 第60章新VOID＝0；現行覆蓋見`05_原著參考/37_SOURCE_LIVE_REBUILD_113-115_CH60.md`。\n\n''',s,flags=re.S)
s=s.replace('當前Franiya彩虹鳥擊殺仍0；羽毛6／200。','當前Franiya彩虹鳥擊殺仍0；羽毛7／200。')
s=re.sub(r'## 七、下一章Gate\n.*?\Z', '''## 七、下一章Gate\n\n`CURRENT_FORMAL_CHAPTER = 060`\n`NEXT_FORMAL_CHAPTER = 061`\n`EVENT_CONSUMPTION_CURSOR = THROUGH_CH115`\n`NEXT_SOURCE_WINDOW = CH116_FORWARD`\n`CH116_RAINBOW_BIRD_LEADER = BLOCKED_BY_TRIGGER`\n`RAINBOW_BIRD_KILLS = 0`\n`RAINBOW_FEATHERS = 7/200`\n`MIN_ORIGINAL_SOURCE_CHAPTERS_TO_CONSUME = 3`\n`NORMAL_CHAPTER_TARGET_HAN = 9000_TO_14000`\n`ABILITY_NOT_EVALUATED = MUST_BE_0_IN_CH61_PREWRITE`\n`CH61_BODY_GATE = BLOCKED_UNTIL_NEW_PREWRITE`\n''',s,flags=re.S)
write(p,s)

# Audit: mark old material historical, set live head, append Ch60 closeout
p=proj/'04_連續性與索引/07_有效性與同步稽核.md'
s=read(p)
s=s.replace('> 本輪：第59章正文＋POSTWRITE＋知識矩陣＋章節索引＋Current State／Queue／交接／交易同步＋【海潮】／VOID RETRO修正。','> 本輪：第60章正文＋POSTWRITE＋知識矩陣＋索引＋State／Queue／資產／SOURCE同步＋神咒分類RETRO封帳。\n> 第59章相關段落保留為歷史驗收；最新有效結論以本文末「第60章封帳覆蓋」為準。',1)
s=s.replace('- 最高正式章：`01_章節/059_第五十九章_名字可以晚一點.md`。','- 最高正式章：`01_章節/060_第六十章_小火球最好別信.md`。',1)
s=s.replace('`CURRENT_FORMAL_CHAPTER = 059`','`CURRENT_FORMAL_CHAPTER = 060`',1).replace('`NEXT_FORMAL_CHAPTER = 060`','`NEXT_FORMAL_CHAPTER = 061`',1)
if '## 十三、第60章封帳覆蓋' not in s:
    s += '''\n\n## 十三、第60章封帳覆蓋\n\n- 正文：`060_第六十章_小火球最好別信.md`。\n- 原著113／114／115：`FULLY_CONSUMED_FOR_CURRENT_LIVE_BRANCH`。\n- 游標：`EVENT_CONSUMPTION_CURSOR = THROUGH_CH115`。\n- 羽毛7／200；彩虹鳥擊殺0；116領袖仍`BLOCKED_BY_TRIGGER`。\n- 【海潮】章內使用一次且章末CD已結束；【火雨降臨】完整評估後未使用。\n- `ABILITY_NOT_EVALUATED = 0`。\n- 第60章新VOID＝0。\n- 神咒分類已修正：神咒表示神級術式／效果層級；是否另需神格、神權、血脈、唯一職業、神器或神殿許可逐咒判定。\n- `CH60_POSTWRITE = PASS`。\n- `CH60_ASSET_LEDGER_GATE = PASS`。\n- `CH60_KNOWLEDGE_GATE = PASS`。\n- `GOD_SPELL_CLASSIFICATION_GATE = PASS`。\n- `CH60_TRANSACTION = CLOSED`。\n'''
write(p,s)

# Handoff: latest progress and next gate
p=proj/'00_專案交接.md'
s=read(p)
new='''## 一、最新正式進度\n\n- 最高正式章：`060_第六十章_小火球最好別信.md`。\n- 正式正文共60章。\n- 世界時間：開服第10日，同一登入時段。\n- 當前地點：日光森林。\n- 精確停點：第二身份【折光】仍ACTIVE；雨天決行主動先手轉紅後被8階【海潮】擊殺回城；公共錄影與「小火球最好別信」迷因已開始發酵；章末自然取得1根脫落彩虹鳥羽毛。\n\n`CURRENT_FORMAL_CHAPTER = 060`\n`NEXT_FORMAL_CHAPTER = 061`\n`EVENT_CONSUMPTION_CURSOR = THROUGH_CH115`\n`NEXT_SOURCE_WINDOW = CH116_FORWARD`\n`CH116_RAINBOW_BIRD_LEADER = BLOCKED_BY_TRIGGER`\n`RAINBOW_BIRD_KILLS = 0`\n`RAINBOW_FEATHERS = 7/200`\n`CH61_BODY_GATE = BLOCKED_UNTIL_NEW_PREWRITE`\n\n'''
s=re.sub(r'## 一、最新正式進度\n.*?(?=---)',new,s,flags=re.S)
s=s.replace('## 五、第60章施工入口','## 五、第60章施工入口（歷史，已完成）',1)
if '## 最新下一章入口｜第61章' not in s:
    s += '''\n\n## 最新下一章入口｜第61章\n\n- 先讀15號總Gate、Current State、Queue、09資產Ledger與第60章全文。\n- SOURCE從116起逐事件判斷；彩虹鳥領袖仍因擊殺0被硬條件阻擋。\n- 羽毛7／200；折光仍ACTIVE；身份切換鎖約40+分鐘。\n- 第61章必須新建PREWRITE，並重新完整跑能力／裝備／知識／SOURCE Gate。\n'''
write(p,s)

body = subprocess.check_output(['git','log','-n1','--format=%H','--',str(proj/'01_章節/060_第六十章_小火球最好別信.md')],text=True).strip()
plan=proj/'08_劇情規劃/198_第六十章章節交易同步_v1.0.md'
write(plan,f'''# 第六十章章節交易同步 v1.0\n\n- 正文：第六十章〈小火球最好別信〉\n- 正文commit：`{body}`\n- PREWRITE／正文／POSTWRITE／知識矩陣／章節索引／Current State／未完成因果／Queue／資產Ledger／SOURCE LIVE覆蓋均已完成。\n- 原著113～115完整消耗。\n- 第60章新VOID＝0。\n- 神咒分類RETRO：神咒＝神級術式／效果層級；特殊權限逐咒判定。\n- 下一章＝61；SOURCE起點116；彩虹鳥領袖仍被擊殺數硬條件阻擋。\n\n`CH60_TRANSACTION_SYNC = PASS`\n''')
close=proj/'08_劇情規劃/199_第60章神咒分類RETRO與交易關閉_v1.0.md'
write(close,f'''# 第60章神咒分類RETRO與交易關閉 v1.0\n\n## 修正\n- 移除把神咒與固定神格／神權／血脈／唯一職業需求綁死的模糊表述。\n- 固定：神咒代表神級威力／效果／術式層級；每一道神咒是否另有特殊前置，依其自身機制判定。\n- 第60章正文、家庭總檔、法師基準、自由構築專檔、新對話Gate、State、未完成因果、知識矩陣、索引與POSTWRITE同步修正。\n\n## 第60章封帳\n- 正文commit：`{body}`\n- `EVENT_CONSUMPTION_CURSOR = THROUGH_CH115`\n- `CH60_NEW_VOID_WITH_CAUSE_COUNT = 0`\n- `ABILITY_NOT_EVALUATED = 0`\n- `RAINBOW_FEATHERS = 7/200`\n- `RAINBOW_BIRD_KILLS = 0`\n- `CH116_RAINBOW_BIRD_LEADER = BLOCKED_BY_TRIGGER`\n- `CH60_TRANSACTION = CLOSED`\n''')

# basic guards
for path in [family,proj/'02_角色設定/09_Franiya法師身份與施法尺度基準.md',proj/'02_角色設定/14_Franiya自由構築_多線施法與術式升階補充.md',proj/'01_章節/060_第六十章_小火球最好別信.md']:
    t=read(path)
    if '所有神咒都需要' in t or '神咒必須先有神格' in t:
        raise SystemExit(f'stale godspell rule:{path}')
