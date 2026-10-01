# 原著 SOURCE 閱讀路由與新對話執行交接

> 更新日期：2026-10-02  
> 性質：`SOURCE_HANDOFF / READING_ROUTER / NEW_CHAT_BOOTSTRAP / MANDATORY`  
> 適用專案：`網遊：重生就是最大的BUG（芙蘭妮雅改寫版）`

---

# 一、新對話固定啟動順序

如果任務是「接手芙蘭原文事件／查原著章節／更新 Canon Master／PREWRITE前SOURCE核對」，固定：

1. 讀 `00A_原著事件捕捉與反向歸屬流程.md`。
2. 讀本 `00C_原著SOURCE閱讀路由與新對話執行交接.md`。
3. 依章號讀唯一對應的 `SOURCE_CANON_MASTER`。
4. 正常情況到此即可工作；只有遇到爭議、SOURCE_UNSTATED、高風險物權／知情鏈、RETRO或歷史誤判，才下鑽 SOURCE_NODE／RETRO／母抓取／反掃／舊Acceptance／舊LIVE／舊Master。
5. 若要新增、否定或改變SOURCE結論，必須回第一手原著TXT與必要後文窗口核對，然後**回寫既有 Canon Master EVENT_ID**。

正常路由：

`第一手原著TXT（最高證據） → 對應Canon Master（日常唯一現行入口） → 特殊爭議才下鑽歷史／專題檔`

禁止回到：

`母抓取 → 反掃 → Acceptance → LIVE → RETRO → SOURCE_NODE → 自己猜哪份最新`

---

# 二、唯一現行 Canon Master 路由

| 原著章號 | 唯一現行入口 |
|---|---|
| CH100～150 | `48_SOURCE_CANON_MASTER_100-150.md` |
| CH151～200 | `49_SOURCE_CANON_MASTER_151-200.md` |
| CH201～250 | `50_SOURCE_CANON_MASTER_201-250.md` |
| CH251～300 | `51_SOURCE_CANON_MASTER_251-300.md` |
| CH301以後 | 尚無Canon Master時，依00A回第一手TXT＋必要歷史研究，完成後從CH301建立下一份，不複製CH300現行真值 |

固定：

`ONE_CHAPTER_ONE_CURRENT_MASTER_OWNER = TRUE`

`BOUNDARY_OVERLAP_AS_CURRENT_TRUTH = FORBIDDEN`

`HISTORICAL_MASTER_MAY_OVERRIDE_CANON = FALSE`

舊 `45／46／47_SOURCE_CHAPTER_EVENT_MASTER_SET` 已全部降為歷史／證據層；檔頭若殘留 `CURRENT`、`ACTIVE`、重疊邊界等舊自我描述，均由本路由覆蓋。

---

# 三、Canon Master 的真正定義

Canon Master **不是摘要、索引或多檔案拼接結果**，而是該章段目前唯一完整SOURCE事件帳本。

新對話正常只讀對應 Master，就應能知道：

- 原著全部會影響後續的事件；
- 世界內真實時間位置；
- 前因 → 動作 → 客觀結果；
- 任務／技能／裝備／物品／貨幣／權限的來源與持有人；
- 誰知道、誰不知道、是否公開；
- 後文第一次回證／再利用；
- SOURCE_EXPLICIT／DERIVED／UNSTATED等證據層級；
- Shen Yun私人因果與可保留世界因果的分離；
- Franiya映射與最終 disposition。

固定：

`MASTER_IS_SUMMARY = FALSE`

`MASTER_IS_COMPLETE_EVENT_LEDGER = TRUE`

`PRIVATE_CAUSE_VOID != OBJECTIVE_EVENT_VOID`

例如「沈雲因私人關係去翡翠湖」可作廢，不代表「魚人守護者死亡 → 本人採集屍體 → 魚人寶庫圖紙 → 與早期鑰匙閉環」也一起消失。

---

# 四、各類舊檔的用途

## 母抓取 SOURCE_CAPTURE
按章保留原著流程、人物、規則、數值、資訊與鉤子。是基礎研究層，不是現行第一入口。

## 反向掃描／交叉稽核／時間序稽核
補來源、持有人、後文用途、量化數值、時間錯位、平行剪輯、原著矛盾。反掃抓到的事實不能因Acceptance漏收就消失。

## Acceptance
只回答「哪些SOURCE事件被列入某次驗收」。

`ACCEPTANCE != SOURCE_EVENT_MASTER`

`ACCEPTANCE_MISSING_EVENT != SOURCE_EVENT_NONEXISTENT`

## SOURCE_NODE
只處理高風險局部因果：物權、保管、交易、知情鏈、跨多章資產、SOURCE_UNSTATED等。結論最後仍必須回寫 Canon Master。

## LIVE／LIVE REBUILD
表示某正式施工分支在當時採用的SOURCE狀態，不是永恆真值，可被RETRO修正。

## RETRO
保存「以前漏／判錯 → 現在修」的歷史。修完後：

`RETRO_RESULT → UPDATE_CANON_MASTER`

---

# 五、EVENT_ID與SOURCE分類

事件ID固定：

`CH<章號>-E<序號>`

同一事件後來找到新證據：

`新證據 → 更新既有EVENT_ID → 補CHAIN／CUSTODY／KNOWLEDGE／DOWNSTREAM／DISPOSITION`

不要為同一事件長出第四輪、第五輪、平行LIVE真值。

證據層：

- `SOURCE_EXPLICIT`：原文直接明示。
- `SOURCE_DERIVED`：多個明示事實可邏輯證明／縮成必然集合。
- `REASONABLE_INFERENCE`：高度支持但不能證明為唯一答案。
- `SOURCE_UNSTATED`：只有完成當章、相鄰章、全文關鍵詞、跨章來源／數量／持有／後用反查仍不能再縮小才可使用。
- `CHARACTER_STATEMENT_KNOWN_FALSE`：角色明說但作者已明示是假話，例如CH249沈雲把Zero說成關山瑞資料來源。
- `ADAPTATION_OPTIONAL_BRIDGE`：改寫線自己建立的橋，永遠不能反標成原著事實。

---

# 五-A、語義過推 Gate｜觀察事實不能自行升格成能力／通則

Canon Master 必須嚴格區分四層：

`OBSERVED_FACT → CHARACTER_INTERPRETATION → DERIVED_CONCLUSION → WORLD_RULE`

只有原文直接明示規則，或多個明示事實已把答案邏輯鎖死時，才可寫成 `WORLD_RULE / SOURCE_DERIVED`。單次事件、角色感知、角色猜測、一次成功／失敗，不得直接泛化。

固定禁止：

- `感知到差異 != 能辨識真實身份`
- `一次成功或失敗 != 通用規則`
- `某角色能做到 != 同類角色都能做到`
- `角色判斷 != 作者客觀事實`
- `後文證實結果 != 前文角色當時已知原因`
- `相關性 != 因果性`
- `特定條件有效 != 無條件有效`
- `後期版本能力 != 可倒灌成早期版本`
- `沒有觀察到 != 不存在`
- `可感知 != 可理解 != 可定位真相 != 可穿透偽裝`

量詞也不得漂移：

- 原文「迪亞斯能感知氣息差異」不得寫成「高階NPC都能靠氣息辨身份」。
- 原文「這次兩個身份氣息不同」只能證明這次感知結果；若要推成《千幻之心》對氣息層的穩定隔離，需結合明示機制／多次回證，並保留證據層級。
- 原文「某能力在A目標有效」不得直接寫成「對所有同類目標必然有效」。

遇到 `顯示／證明／代表／因此可知／能以／必然／說明` 等句型時，必須自問：

1. 前句只是觀察，還是原文明示規則？
2. 結論是否增加了原文沒有的能力、範圍、對象、必然性或量詞？
3. 是否把角色主觀理解誤寫成作者客觀真相？
4. 是否有反例、條件限制、版本差異或知情邊界？
5. 若拿掉這個結論詞，剩下的客觀事件是否仍成立？

若有疑慮：

`先降回 OBSERVED_FACT / CHARACTER_INTERPRETATION → 回第一手TXT＋相鄰章＋必要後文 → 再決定 EXPLICIT / DERIVED / REASONABLE_INFERENCE`

典型修正：CH131迪亞斯只明確感知到「撥雲見月的法師氣息」與「雲深不知處的游俠氣息」不同，因此當下合理判斷是兩者不是同一個人；這不能寫成「迪亞斯靠氣息看穿兩個身份其實同一人」。該事件首先是《千幻之心》氣息隔離成功的觀察證據，而不是高階NPC穿透身份偽裝的證據。

`SEMANTIC_OVERREACH_GATE = MANDATORY`

`OBSERVATION_TO_WORLD_RULE_WITHOUT_EVIDENCE = FORBIDDEN`

`CHARACTER_INTERPRETATION_MUST_REMAIN_ATTRIBUTED = TRUE`

---

# 六、物權與因果硬規則

以下動作不能混成「取得」：

`掉落 / 屍體採集 / 拾取 / NPC交付 / 系統獎勵 / 任務獎勵 / 買入 / 拍賣成交 / 暫借 / 返還 / 消耗 / 轉讓 / 許願生成`

持有不等於知情；作者知道不等於角色知道；公開結果不等於真實動機也公開。

原著客觀結果已確認時：

`OBJECTIVE_RESULT_DEFAULT = PRESERVE`

若Franiya線要改：必須有明確衝突證據、因果理由與下游影響，不能只因「主角換人」就把 ACQUIRED 寫成 OFFERED、COMPLETED 寫成 ACTIVE、DEAD 寫回 ALIVE。

---

# 七、時間序硬規則

章號不是世界時間。

Master 必須保留需要的：

`SOURCE_IN_WORLD_ORDER`

`NARRATIVE_MODE = PRESENT / FLASHBACK / PARALLEL / MEMORY_EXPOSITION / LATE_DISCOVERED_HISTORY`

既有典型：

- CH154／157：前世回憶，不是現在新事件。
- CH170～181：同一場原初之地，CH180不能單章結算。
- CH191～200：競技場／矮人城同日平行剪輯。
- CH207～222：同一現實日下午→深夜郵輪線；Zero前世史不是當晚新發生。
- CH223：明示第二天。
- CH224～241：同一水晶通道／伏擊遊戲日；CH240必須跨CH241。
- CH250：只建立18:00港口約定；真正治療在CH259，記憶讀取結果在CH283。
- CH260～280：貨幣更新後首拍／排行榜大鏈。
- CH285～300：同一次第73屆選秀大會；CH300只到前往中心，CH301才親眼確認巨蛋神咒級結界。

`RESEARCH_DISCOVERY_TIME != SOURCE_EVENT_TIME != ADAPTATION_EVENT_TIME`

---

# 八、目前研究成熟度與跨區間閉環

## SOURCE48｜CH100～150
多輪研究收斂，唯一現行權威。

## SOURCE49｜CH151～200
母抓取＋反掃＋時間序收斂；CH180→181、CH191～200已鎖。

## SOURCE50｜CH201～250
CH201～240為多輪收斂；CH241～250由第一手TXT新抓後升格。重要跨窗：CH240→241已解決；CH250治療／記憶讀取需由SOURCE51後文回證。

## SOURCE51｜CH251～300
2026-10-01直接對第一手TXT連續回讀CH251→CH301邊界建立。

本輪已確認的高風險後文回證：

- CH243【變身藥丸】→ CH281第49顆成功改變聲帶。
- CH250羅紫玲→ CH259聖焰約5分鐘完全治癒器官傷勢；CH283 E級記憶讀取僅得表層、未解沈雲缺失記憶，讀到內容被消除，翌早送回羅成。
- CH206幸運+1鑰匙→ CH270明確提高星辰能量掉率；鑰匙「真正能開什麼」仍未知。
- CH249「Zero是情報來源」仍是假話；CH257～259的郵輪通行反而使張文君／張天權／卡里姆更深地誤信這條假說。

`CH241_270_HIGH_RISK_FORWARD_REUSE_CHECK = PASS`

`CH241_270_REVERSE_ATTRIBUTION_CLOSURE = PASS_WITH_OPEN_KEY_PURPOSE`

---

# 九、原著自身矛盾

作者自己矛盾時雙版本保留，直到後文明確修正：

- CH170原初之地「1級開始／0級開始」。
- CH189鮮血之翼面板31級，但旁白又說30級能飛。
- CH219納塔麗數到110，CH220旁白又寫108種異能。

`ORIGINAL_INTERNAL_CONTRADICTION != LICENSE_TO_SILENTLY_FIX_AUTHOR`

---

# 十、正常查某章

1. 先看唯一對應 Canon Master。
2. 取得 EVENT_ID、SOURCE_CLASS、CHAIN、RESULT、CUSTODY、KNOWLEDGE、DOWNSTREAM、MAP、DISPOSITION、trigger/deadline。
3. 有爭議才下鑽歷史檔／SOURCE_NODE／RETRO。
4. 若要改 SOURCE，回第一手TXT當章連續上下文＋相鄰章＋必要全文搜尋＋第一次後用。
5. 驗證完直接更新既有 Master EVENT_ID。
6. 對任何「顯示／證明／代表／因此可知／能以／必然」結論再過一次 `SEMANTIC_OVERREACH_GATE`。

---

# 十一、新對話最小 Checklist

- [ ] 已讀00A。
- [ ] 已讀00C。
- [ ] 已定位唯一 Canon Master。
- [ ] 沒有把舊45／46／47當現行真值。
- [ ] 已確認完整因果鏈，不只看結果。
- [ ] 已確認世界時間／回憶／平行剪輯。
- [ ] 已確認物權與知情邊界。
- [ ] 已區分沈雲私人因果與客觀世界事件。
- [ ] 已區分觀察事實／角色判斷／推導結論／世界規則，沒有把一次案例過度泛化。
- [ ] 若修改SOURCE，已回第一手TXT與必要後文。
- [ ] 新證據最後已回寫 Canon Master，而不是只多生一份研究檔。

---

# 十二、一句話交接

**第一手TXT是最高證據；48／49／50／51是目前各章段唯一現行SOURCE權威；其他SOURCE研究檔只保留證據／歷史功能；任何新證據最後必須收斂回唯一Master的既有EVENT_ID；任何能力／規則結論必須先通過語義過推Gate。**

`FIRST_HAND_TXT = HIGHEST_EVIDENCE`

`CANON_MASTER = SINGLE_CURRENT_SOURCE_AUTHORITY`

`HISTORICAL_FILES = PROVENANCE_NOT_PRIMARY_ENTRY`

`NEW_EVIDENCE_MUST_CONVERGE_BACK_TO_MASTER = TRUE`

`SEMANTIC_OVERREACH_GATE = MANDATORY`