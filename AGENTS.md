# 小說資料庫 AI 接手規則

## 2026-11-25 作者指定：Google Drive 全庫同步工作

使用者明確說：「最初就是把Google drive有github資料」，並要求將此提醒補入 GitHub。此資料庫維護任務的首要目的，是讓 Stingray Google Drive 完整持有 Secileya/Novel 的 GitHub 資料，供 Gemini 等 AI 讀取。不是逐章研究原著或改寫小說。

- 在此同步工作中收到「繼續」「做多點」，優先延續全庫原始檔同步、完整性、可讀性、索引及實際讀取驗收。不要自動切換成小說續寫或原著逐章研究。
- 每輪重新檢查 GitHub main 的完整 commit SHA、Drive 基礎快照及增量鏈的實際完成記錄；不以舊索引、檔名、已配置自動化或部分範圍零失敗冒充全庫已同步。
- 優先補齊新增、修改、改名及刪除清冊；保留歷史版本，核對原始路徑、Git blob SHA、檔案大小、原始位元組及可取得的 SHA256。不可用摘要、轉換成 Google Docs 的文字或連結代替原始檔。
- 全文閱讀分卷、章節導航、圖像及原著索引是衍生閱讀資料，須明確標示快照版本、增量來源及未更新處。為確認可讀性可抽讀原文，不必為同步逐章精讀每部小說。
- 使用者認為家庭互動文本的寫作品質對照可以做，作為適度補充；不應壓過同步主線。既有研究35–43保留，不自動繼續《賣裝備》原著剩餘454章。具體創作需要或使用者另行要求時才深入原著研究。
- 使用者指出以前及現在各部小說都可能寫錯或不符合其喜好，且問題各異。正式存檔、正文、POSTWRITE、原著或研究索引不等於正確及品質合格。分開標明客觀錯誤、作者已明確否定、研究者品質疑慮及尚未確認偏好；不要替錯誤硬找理由或把全部作品宣告作廢。同步忠實保存原件，品質研究和修訂另層，不擅自更改正式小說。
- 保留其他對話已在進行的獨立巨構研究、既有腳本及歷史備份；本規則限於同步任務，不取代各作品專屬工作流程及另行授權研究。
- 每批完成後報告實際核驗的 GitHub 來源 SHA、Drive 檔案／目錄、差異數量、驗證層級及未完成項。若連線、權限或傳輸受限，如實回報，不宣稱已部署或同步。

## 工作入口

- [小說總交接](小說/00_總索引與交接/PROJECT_HANDOFF_MASTER_v0.1.md)
- [Drive 同步維護工具](tools/google_drive_mirror/README.md)
- Drive 全庫入口：https://drive.google.com/drive/folders/1AwWosO_m36QNmSqsEgLMS6VHMi8jLt6_
- 全庫增量：https://drive.google.com/drive/folders/1eppxXt86PrH4Xd5vNS4q3EIzc4hdBURK
- 原始基礎備份：https://drive.google.com/drive/folders/1uUKmCnitOInp3CdUnhm2kKnw3jAHorZO
- 同步維護與驗收：https://drive.google.com/drive/folders/10kAkAtAcKA1mIDFGAhwSdVFJ6E4QFYwz
- 閱讀基礎快照：https://drive.google.com/drive/folders/1xXpdjQ04JaPfu58Hdzd1_v2Ns2dR1Vvu
- 額外研究及品質台帳：https://drive.google.com/drive/folders/1MnlMGvy4W-5lfmFhUpt9P_R_U8qeZE8d
- 全作品品質研究原則37：https://docs.google.com/document/d/1F1Qfgdv65pE5zpx4wfrax2LHh46TWBF1vsmcDB7Rlfk/edit

本檔為工作指示，非故事 Canon。新對話必須實際讀取本檔；GitHub 上存在指示文件不代表每個聊天模型必然自動載入。
