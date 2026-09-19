# 小說專案封存與 GPT 交接包

本目錄整理自 Codex 本機小說工作區，目的為安全匯入既有的 GitHub「英文小說」專案，作為長期保存與後續 GPT 建構的資料來源。

## 原則

- 原始檔案只複製，不移動、不刪除。
- 不把不同世界線合併成同一正史。
- 正文、設定、角色、場景／層級資料與規劃分開保存。
- 匯入既有倉庫時，建議保留在 `imports/chinese-fiction-archive/`，不要覆蓋現有英文小說正文。
- 後續 GPT 應先讀各專案的 `PROJECT_HANDOFF.md` 與原有總檔／索引，再進行續寫或重構。

## 專案目錄

1. `projects/backrooms-endless-levels/`：沈耀《Backrooms：無盡層級》重寫版，含 40 章正文、世界基準、神器、層級卡、路線與 Stiliya／Versiliya 痕跡線。
2. `projects/urban-main-and-branches/`：都市世界觀正史後段與非正史分支，保留分支標記。
3. `projects/yifeng-style-restart/`：易楓式爽文重啟線、世界觀、正文與連續性索引。
4. `projects/apocalypse-liyue/`：莉月超市統一企劃；同一大專案內分開保存正線 175 章、七十二年後分支 4 章、全民覺醒重置線 7 章，以及「末世重生無敵商店爽文」研究底稿。
5. `shared/four-oc-dossier/`：四人完整角色設定總檔與必要圖像參考，供多世界線共用。
6. `projects/wujiezong-sect/`：四人與璃安建立無界宗的獨立修仙宗門線，含第一至第二十章。
7. `projects/apocalypse-shop-player/`：由「尋找末世遊戲小說」發展出的塞希莉雅末世開店玩家線，含第一至第一百零二章。

## 使用順序

1. 先讀根目錄 `CATALOG.md`。
2. 選定一條世界線後，只讀該專案的 `PROJECT_HANDOFF.md` 與列出的權威檔案。
3. 續寫前確認正史／分支、最新有效章節、角色知情邊界。
4. 寫作完成後，同步更新該專案索引；不要只新增正文。

