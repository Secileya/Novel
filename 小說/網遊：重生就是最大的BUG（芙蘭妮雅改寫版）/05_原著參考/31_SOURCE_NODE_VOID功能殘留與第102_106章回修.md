# SOURCE_NODE｜VOID功能殘留與第102／106章回修

> 日期：2026-09-30  
> 狀態：`BIDIRECTIONAL_AUDIT_COMPLETE / RETRO_REPAIR_REQUIRED`  
> 適用：原著第102章【月神石最終收帳／購置產業】、第106章【芬里爾私下請託聖安東尼奧】及其下游。

---

## 一、問題來源

第56章第一次施工時錯誤使用了過寬的 `VOID_WITH_CAUSE`：

- 因Franiya不採沈雲的「辱罵者3000金／8000華夏＋2000海外人為配額」策略，錯把第102章的**月神石巨額現金流→購置產業**功能一併作廢；
- 因主角不再是沈雲，錯把第106章**芬里爾私下請託聖安東尼奧多照顧主角**延後，忽略Franiya已與芬里爾建立更直接的救援／長期任務／信任因果。

固定結論：

`ORIGINAL_CAUSE_INVALID != EVENT_FUNCTION_INVALID`

`RETRO_REPAIR_REQUIRED = TRUE`

---

# 二、第102章｜月神石收入→資本→產業

## 2.1 SOURCE_EXPLICIT｜原著局部序列

原著第102章明示：

1. 月神石收費計畫進入大規模結算；
2. 未辱罵沈雲者1000金／顆，部分有辱罵紀錄者3000金／顆；
3. 少數少付者退件；有人寄超過一顆，照單全收；
4. 約1.5小時完成收費；
5. 加上既有資金，總持有金幣超過4億2000萬；
6. 隨後進入主城產業市場；
7. 光明主城購買：王宮／核心區63家大型／超大型商鋪、另424家分散商鋪、13,472套住宅，總價2.3億；
8. 智慧之城購買：高人氣區977家商鋪、26,123套住宅，總價1.3億；
9. 購置後餘額65,059,254金；
10. 當時貨幣兌換尚未開啟，因此沒有後續國家稅制下的產業稅；
11. 大額交易提高交易官弗蘭好感；
12. 後續選一間五層大型商鋪作拍賣行，雇工匠／護衛／黃金級店鋪管家；
13. 原著另因哥布林秘境前世情報，特別收感知類資源。

## 2.2 本線已合法成立的替代因果

Franiya線已正式建立：

- 第42章直接競價出售一顆【月神石】，成交416,000金；
- 第52章建立【月神原石啟用委託】，普通委託固定1000金／件；
- 成功／普通石都收服務費，買的是合法處理，不保證石頭一定有效；
- 完整啟用方法不出售；
- 第一批3件已成功並回寄；
- 第53章成功案例後申請量再次暴增，新的已付款公證件一排排進隊；
- 第54章固定批次17件，15成功／2普通石；
- 第55～56章另有九件排行資產換一次額外批次，屬非金幣對價；
- 月神石普通服務仍持續運作，且第52章正文已明確判斷真正瓶頸在「幾十萬件物品的收件、分件、保管、返還」，不是啟用材料成本。

Franiya本人另具備：

- 長期組織／會長／資源管理經驗；
- 頂尖商業、談判、風險、資本配置能力；
- 伯爵與主城守護者身份；
- 光明帝國商業折扣／主城高層接口；
- 能看懂人口、交通、制度與稅制切換前的時間窗口。

因此：

`FRANIYA_SUBSTITUTE_CAUSE_CHECK = PASS`

她不需要沈雲前世記憶才能理解：大量現金長期躺在帳戶裡比不上在主城人口湧入、貨幣兌換與稅制正式上線前取得核心不動產。

## 2.3 正確功能拆分

### 沈雲「辱罵者3000金」差別定價
- `VOID_WITH_CAUSE`
- 原因：Franiya已建立統一1000金普通服務規則，不按私人好惡漲價。

### 沈雲「約8000華夏＋2000海外」人工順位配額
- `VOID_WITH_CAUSE`
- 原因：Franiya採系統公證完成順序，不以國籍／私人偏好操榜。
- 但月神石服務改變全球高端玩家進主城速度與戰區競爭的世界功能：`WORLD_BACKGROUND_LOCKED / ACTIVE_CONSEQUENCE`。

### 巨額月神石現金流
- `REBUILD_REQUIRED → RETRO_INTEGRATE_CH56`
- 精確4.2億不得由原著直接幽靈繼承；必須由本線服務帳本正式結算。
- 第56章回修以系統服務帳正式顯示「普通委託規模已跨過四十二萬件級、可用總資金超過4.2億」完成重建。

### 主城大規模置產
- `REBUILD_REQUIRED → RETRO_INTEGRATE_CH56`
- 資本化功能必須保留。
- Franiya可透過主城交易所／跨城合法產權系統，以自己的商業判斷完成與原著同量級的核心資產配置。

### 原著精確資產組合
- `REBUILD_REQUIRED / PRESERVE_FUNCTION_AND_SCALE`
- 光明主城：核心區63大型／超大型商鋪＋424分散商鋪＋13,472住宅，2.3億。
- 智慧之城：977商鋪＋26,123住宅，1.3億。
- 本線保留這組客觀市場資產包與價格，購買理由改為Franiya根據交通、神殿／競技／訓練等固定高流量節點、住宅供需與免稅窗口自行判斷。

### 拍賣行／工匠／管家／護衛
- `DEFERRED_WITH_TRIGGER`
- 產權先成立；正式營運可在下一商業運作窗口落地。
- `EVENT_WINDOW = FIRST_POST_PROPERTY_OPERATION_WINDOW`
- `LATEST_SAFE_DEADLINE = BEFORE_FIRST_LARGE_SCALE_PLAYER_MARKET_OR_AUCTION_HOUSE_DEPENDENCY`
- `NEXT_RECHECK_TRIGGER = EVERY_PREWRITE_WITH_MAIN_CITY_COMMERCE`
- `MISSED_DEADLINE_ACTION = BLOCK_NEW_CHAPTER_AND_RETRO_REPAIR`

### 收感知裝備
- `VOID_WITH_CAUSE`
- 原因：此項依賴沈雲哥布林秘境前世情報；Franiya目前沒有同一合法需求。

## 2.4 經濟鏈

`月神石服務 → 超4.2億可用資本 → 3.6億主城不動產 → 六千多萬流動性保留 → 未來租售／拍賣／NPC營運／稅制`

`ECONOMIC_CHAIN_CONTINUITY_CHECK = PASS_AFTER_RETRO_REPAIR`

---

# 三、第106章｜芬里爾→聖安東尼奧

## 3.1 SOURCE_EXPLICIT｜原著局部序列

原著第106章明示：

1. 寶庫守護者真身＝第一任帝王【聖安東尼奧】／永恆之王；
2. 光明陣營多數神明以為其已死；黑暗陣營知道其假死；
3. 假死本身曾與黑暗陣營神明合作；
4. 沈雲進入聖光秘境時，芬里爾神魂已先暗中找到聖安東尼奧；
5. 芬里爾要求他「多照顧」沈雲；
6. 【毀天滅地】卷軸被刻意放在顯眼位置，本身屬隱形投資；
7. 聖安東尼奧仍遵守創世神規則，把照顧包裝為合法資格、任務、選取與補償，而非直接私送；
8. 沈雲本人當下不知道此私下對話。

## 3.2 本線替代因果

Franiya已與芬里爾建立：

- 星辰深淵核心接觸；
- 【關鍵時刻】；
- 【解救芬里爾】；
- 【運送星辰果實】；
- 芬里爾劍柄與後續救援責任；
- 芬里爾向她直接揭露大量自身處境與世界級資訊。

因此芬里爾沒有理由因主角換人就失去「在規則允許範圍內替自己重視／投資的人增加合法機會」這一人物功能。

`FRANIYA_SUBSTITUTE_CAUSE_CHECK = PASS`

## 3.3 正確處理

- 芬里爾私下請託：`INTEGRATED_READER_SIDE_CH56_RETRO`
- Franiya知情：`AUTHOR_READER_ONLY / FRANIYA_UNKNOWN`
- 聖安東尼奧不得直接送寶物或破壞規則；
- 【毀天滅地】顯眼位置、守護者主動補充完整條件、依規則提供補償，均可與此隱形照顧並存；
- Franiya所有實際選擇仍由本人完成。

`RELATIONSHIP_FUNCTION_CONTINUITY_CHECK = PASS_AFTER_RETRO_REPAIR`

---

# 四、角色推理回修

## 簡雨朧＝【細雨朦朧大魔王】

第40章已出現直接遊戲好友私訊：

- 對Franiya十級作熟人式驚訝；
- 「不准一個人把主城好東西全吃完」帶有明顯既有私人關係語氣；
- ID「細雨朦朧」與「雨朧」具有高辨識命名痕跡；
- Franiya已有足夠現實互動樣本可比對語氣。

正確狀態：

`INFERRED_HIGH_CONFIDENCE_FROM_CH40`

對日常決策可視為Franiya已識別其身份，但不是對方正式自報，因此仍與 `EXPLICIT_KNOWN` 區分。

## 唐曉煙＝【大夢初曉】

- 唐曉煙與Franiya已有現實直接關係；
- 「曉」的命名痕跡、錦繡活動線、時間、語氣與後續服務ID可疊合；
- 過往流程曾錯誤反覆把她鎖成完全UNKNOWN。

正確狀態：

`INFERRED_HIGH_CONFIDENCE_NO_LATER_THAN_CH54`

這只代表遊戲ID身份推理，不自動給Franiya：炎黃聯盟全部資料、私人任務、未公開裝備、完整家庭／組織秘密。

`CHARACTER_INFERENCE_CHECK = PASS_AFTER_RETRO_REPAIR`

---

# 五、Pass B｜下游再利用

第102置產下游：
- 玩家大量入城後的商業升值；
- 貨幣兌換／國家稅制；
- 商鋪、住宅、跨城資產；
- 拍賣／NPC僱員／管家／工匠；
- 主城核心設施帶來的人流與長期資產價值。

第106請託下游：
- 芬里爾與Franiya關係的世界側重量；
- 聖安東尼奧對Franiya的合法機會投資；
- 【毀天滅地】後續再次取得資格；
- 預言與諸神／人間秩序長線。

角色推理下游：
- Franiya看到【細雨朦朧大魔王】【大夢初曉】時不得再人工裝作完全陌生；
- 但仍須遵守更細的秘密邊界。

---

# 六、Acceptance

- `LOCAL_SEQUENCE_PASS = PASS`
- `CUSTODY_CHAIN_PASS = PASS`
- `KNOWLEDGE_BOUNDARY_PASS = PASS_AFTER_INFERENCE_REPAIR`
- `DOWNSTREAM_REUSE_PASS = PASS`
- `UNSTATED_EDGE_MARKED = PASS`
- `FORMAL_CONFLICT_CHECK_PASS = FAIL_UNTIL_CH56_AND_STATE_FILES_REPAIRED`
- `SOURCE_NODE_BIDIRECTIONAL_CLOSURE_GATE = CONDITIONAL_PASS_PENDING_FORMAL_RETRO_REPAIR`

完成第56章正文、overlay、Current State／知識矩陣／queue／交接回修後，才可升為完全PASS。
