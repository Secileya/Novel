# SOURCE45 CH122／123 已落地 disposition 同步覆蓋

> 日期：2026-10-01  
> 狀態：`CURRENT_SOURCE_DISPOSITION_OVERLAY / SOURCE_ONLY`  
> 上位來源：`45_SOURCE_CHAPTER_EVENT_MASTER_SET_100-150.md`。  
> 用途：只修正 SOURCE45 中四個「事件內容正確、但 disposition 仍停在施工前狀態」的欄位；不改寫原著事實，不新增事件。

## 一、修正原因

SOURCE45 建立時，CH122-E04／E05 與 CH123-E02／E03 的事件描述與第一手原著均正確，但 disposition 仍沿用 `PRESERVE_BY_DEFAULT / DEFERRED_WITH_TRIGGER`。現行正式第63章與其 RETRO 已經把這四項客觀結果全部落地，因此若繼續以未完成狀態讀取，會與 Current State、Audit、Active Queue 及正式正文衝突。

依 SOURCE45 自身定義：當「現行研究層已確認相應客觀結果已被本線合法承接」時，應標 `INTEGRATED`。

## 二、現行覆蓋

### CH122-E04｜游俠基礎技能完整清單
- SOURCE45舊 disposition：`PRESERVE_BY_DEFAULT`
- 現行 disposition：`INTEGRATED`
- 本線終態：Franiya 已於第63章支付對應金額並學會【精通雙手武器】【一級精通射術】【兩連射】【一級穿透】【衝刺】【蓄力重擊】。
- residual：`CLOSED`

### CH122-E05｜特殊技能【英雄之軀】
- SOURCE45舊 disposition：`PRESERVE_BY_DEFAULT`
- 現行 disposition：`INTEGRATED`
- 本線終態：第63章由格拉蒙依本線表現合法開放；Franiya 已支付10000金並學會，目前 `READY / NOT_USED / NO_COOLDOWN_ACTIVE`。
- residual：`CLOSED`

### CH123-E02｜主身份因赫爾墨斯關聯被拒
- SOURCE45舊 disposition：`DEFERRED_WITH_TRIGGER`
- 現行 disposition：`INTEGRATED`
- 本線終態：第63章 Franiya 主身份已遭莫妮卡拒絕加入雅典娜神殿；赫爾墨斯關聯仍有效。
- residual：`CLOSED`

### CH123-E03｜第二身份通過神殿／氣息隔離再證
- SOURCE45舊 disposition：`DEFERRED_WITH_TRIGGER`
- 現行 disposition：`INTEGRATED`
- 本線終態：第63章【折光】重入神殿，莫妮卡未連回主身份；折光免除入門信仰任務、正式加入雅典娜神殿，貢獻0。
- residual：`CLOSED`

## 三、未改動項

- CH116-E03【踢擊】完成度量化仍為合法延後殘留，等待第一個自然合法主身份【踢擊】窗口；不因本檔關閉。
- CH121 第二環【蒂姬的幫手】仍 ACTIVE。
- 【定點傳送卷軸】仍待蒂姬定位迦娜後才啟用。
- CH125_FORWARD 仍為下一正式來源窗。

## 四、覆蓋關係

涉及上述四個事件的「現行本線 disposition」，以本檔覆蓋 SOURCE45 原欄位；事件原文、數值與世界規則仍以 SOURCE45 為主。

`SOURCE45_CH122_123_STALE_DISPOSITION_COUNT = 0_AFTER_OVERLAY`
`CH64_SOURCE_ENTRY_CONSISTENCY_GATE = PASS`
