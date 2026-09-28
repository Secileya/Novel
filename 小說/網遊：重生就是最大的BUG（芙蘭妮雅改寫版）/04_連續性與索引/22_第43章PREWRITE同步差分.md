# 第43章 PREWRITE 同步差分

> 建立日期：2026-09-28
> 狀態：CURRENT_SYNC
> 對應Gate：`08_劇情規劃/119_第四十三章PREWRITE核定表_v1.0.md`

## 一、目前正式狀態

- 最高正式章仍為第42章〈先賣一塊〉。
- 第42章POSTWRITE PASS。
- 第43章PREWRITE已建立並PASS；正式施工現為ALLOWED。
- 尚未建立第43章正式正文。

## 二、第43章核定範圍

- 時間：開服第5日剩餘時間 → 第6日主要遊戲時段。
- 第7日／原著第76章硬時間錨完整保留，本章不得直接跳過。
- 主事件弧：跨村月神石資料驗證＋星辰深淵第一輪路線／補給實查。
- 跨村資料須由大量留言提升為有證據分級、可交叉驗證的資料集；當前只可確認342路線不能直接視為全球模板，不提前給出第81～83章開光／全球統一答案。
- 星辰深淵本章只允許前置偵察，不正式踏入第85～94章深淵事件鏈；正式進入前仍需獨立專項Gate。
- 第6日需安排Franiya本人實際城外路線偵察，取得可操作的道路／地圖／補給結果，而不是只在主城做紙面準備。
- 簡雨朧／【細雨朦朧大魔王】遊戲線需在本章或等價近期場景繼續成長，且Franiya仍不知道兩個身份的現實對應。
- 世界第二～前十離村順位不強制在本章產生；按本線實際等級、月神石與離村條件重算。

## 三、角色與能力同步

- 文森特分身回修已有效：Franiya可在系統標籤前直接辨識「眼前不是完整本體」及其自主分身結構，但不因此得到本體精確位置、距離、完整能力或目的。
- 自由模式弓術最新設定有效：只要存在合法可執行的射擊解，Franiya不承受普通人類瞄準誤差；射程、箭速、障礙、彈藥、攻速、耐久與角色殼硬規則仍有效。
- 第43章若使用弓，箭矢必須有合法來源；可在主城正常補充普通箭矢，不能因火狐炎刀可重構成弓便憑空生成彈藥。
- 外貌／身形、觀察者差異、早期粉絲生態與最新肢體表演設定全部沿用現行家庭總檔及本線規則。

## 四、原著事件Gate

- `ACTIVE_ORIGINAL_WINDOW = CH076_DAY7_TIME_ANCHOR_PREPARATION`
- `UPCOMING_HARD_ANCHOR = CH076_TIME_PRIORITY_AND_THUNDERBIRD`
- CH076：UPCOMING_ANCHOR。
- CH077沈雲／黃博士記憶線：VOID_WITH_CAUSE，除非本世界另有獨立因果。
- CH078簡雨朧遊戲身份：ACTIVE_REBUILD。
- CH079牛戰士面具化身解法：VOID_WITH_CAUSE；雷鳥世界內容未作廢。
- CH079～080雷鳥／驚雷骨架：DEFERRED_WITH_TRIGGER，待第7日／雷鳥區自然進鏡。
- CH081～082月神石全球爭奪／開光：WORLD_OFFSCREEN，等待世界時間與有效樣本成熟。
- CH083～084全球第二～前十離村：WORLD_OFFSCREEN，順位全部按本線重算。
- CH085～094星辰深淵：DEFERRED_WITH_TRIGGER，正式進入前專項核定。
- CH099～101格拉蒙、CH115～116彩虹鳥：DEPENDENCY_LOCKED，不提前。

## 五、舊檔狀態說明

`04_連續性與索引/08_原著事件待處理佇列.md`中仍存在「第43章PREWRITE需建立／需核定」等施工前語句。這些語句代表第42章結束時的歷史Gate；自本檔與119號PREWRITE建立後，涉及「PREWRITE是否存在／是否允許施工」的判定，以較新的119號PREWRITE、本同步差分、`00_專案交接.md`與`07_有效性與同步稽核.md`為準。

原著事件本身的分類、狀態碼與重檢條件仍以`08_原著事件待處理佇列.md`為核心來源；本檔只覆蓋其中已被119號PREWRITE完成的「下一章Gate尚未建立」狀態，不修改其餘事件判定。

## 六、同步標記

- `CHAPTER_043_PREWRITE = PASS_IN_FILE_119`
- `CHAPTER_043_FORMAL = ALLOWED`
- `CHAPTER_043_FORMAL_WRITTEN = FALSE`
- `CHAPTER_043_TIME_RANGE = DAY5_REMAINDER_TO_DAY6`
- `DAY7_HARD_ANCHOR = PRESERVED`
- `MOONSTONE_RECORD_DELIVERY = ACTIVE_NOT_DUE`
- `STAR_ABYSS_FORMAL_ENTRY = BLOCKED_PENDING_SEPARATE_GATE`
- `JIAN_YULONG_GAME_LINE = ACTIVE_REBUILD`
- `GLOBAL_SECOND_DEPARTURE = NOT_FORCED`
- `GRAMON = DEPENDENCY_LOCKED`
- `THUNDERBIRD = NOT_CH43`
- `FREEMODE_ARCHERY_RULE = SYNCED`
