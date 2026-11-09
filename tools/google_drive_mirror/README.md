# 《巨構世界》GitHub main → Stingray Google Drive 原文鏡像
**性質**：資料鏡像與工具，不是小說 Canon，亦非新故事設定。預設僅讀取 GitHub 公開倉庫，僅寫入 Stingray Drive 的專用鏡像資料夾。
## 目的與配置
- **GitHub**：`https://github.com/Secileya/Novel`，`main` 分支，`小說/巨構世界（法月懷造物）/` 路徑。
- **鏡像 Drive**：`https://drive.google.com/drive/folders/1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY`。
- **保留原文**：複製 `.md`、`.json`、`.mjs`、`.svg`、`.txt`，沿用原始相對子目錄；原始文字前加上來源 Git blob SHA、commit SHA、GitHub 路徑與權威提醒。
- **適合 Gemini**：一般大小文字檔鏡像為 Google Docs；超過 75 萬字元的極大檔採普通 UTF-8 純文字檔。`.svg` 是文字原始碼，不是圖像預覽。二進位圖像不在本腳本範圍。
- **增量（2026-11-09 403 修正版）**：GitHub Actions 追蹤專案原文目錄的變動，將每檔 blob SHA 與釘選 commit 寫入 `tools/google_drive_mirror/source-index.json`；Apps Script 改由 `raw.githubusercontent.com` 取得這份公開索引及來源，不再呼叫共用 IP 容易耗盡限額的 `api.github.com`。只更新 SHA 不同的來源，下載後另以 Git blob SHA 驗證實際內容。
- **無損歷史**：GitHub 刪除的來源移至鏡像內的 `_99_GitHub已刪除_歷史封存`，不永久刪除；舊 Drive `GEMINI_KNOWLEDGE`、舊原始 .md、00～06 版本裁決不會被覆蓋。
- **權威**：此同步只保證來源與版本，不做語義裁決；`GitHub main` 內的 `CANDIDATE`、`NON-CANON`、`PREWRITE HOLD` 不會因此變成正式 Canon。
## 僅需一次授權的設定（Google Apps Script）
1. 確認目前登入 **Stingray** Google 帳號（`xw4761645@gmail.com`），開啟 https://script.google.com/home/projects/create 。
2. 把本目錄 `Code.gs` 全文貼到新專案的 `程式碼.gs`，取代預設空白函式。專案可命名「巨構世界 GitHub Drive 增量鏡像」。
3. 儲存後，上方函式下拉選單選 `installSync`，按「執行」。Google 會要求授權本專案使用 Google Drive / Google Docs / 外部 GitHub HTTP 查詢與排程；這是腳本修改你自己 Drive 檔案所必需，授權前可以先閱讀全部原始碼。**不需要 GitHub token，也不用把個人密碼貼進程式。**
4. **已有 `syncDrain` 與 `syncHourly` 的使用者，不必重新執行 `installSync`**：貼上更新版完整 Code.gs、儲存，再選 `syncNow` 測試一次，觸發器沿用。第一次執行會同步一批，並建立兩種時鐘觸發器：每 5 分鐘繼續補齊尚未同步的原檔（補齊後自動移除），每 1 小時檢查 GitHub 是否出現更新。Google 的觸發時間存在自然延遲，並非 push 時即時 webhook。
5. 回到鏡像資料夾，打開 `00_鏡像同步狀態與使用說明`。等它顯示 `CURRENT=total`、`pending=0`、`已完整同步 HEAD` 已更新，就代表該次 commit 完整同步成功。詳細來源 SHA、Drive 文件 ID 見 `_GITHUB_SYNC_STATE.json`。
6. 需要立即檢查修改時，從 Apps Script 手動執行 `syncNow`。不需要重建專案、重新上傳全部設定。
## 出錯時如何排查
- `GitHub API HTTP 403`：表示 Apps Script 還在執行 **舊版** `Code.gs`。用本版程式完整覆蓋並儲存，再執行 `syncNow`，新版不會呼叫 GitHub REST API。若使用新版仍有 HTTP 錯誤，查看實際是 `GitHub public index HTTP` 還是 `GitHub raw HTTP`，不可一律當成 API 額度。\n- `GitHub public source index missing or invalid`：核對 `https://raw.githubusercontent.com/Secileya/Novel/main/tools/google_drive_mirror/source-index.json` 是否有原文及 GitHub Actions 的 `Publish 巨構世界 Drive source index` 是否成功。GitHub Actions 需有 `contents: write` 權限；若組織／倉庫禁止 Actions 寫回 main，須由倉庫擁有者調整權限。\n- 索引仍舊：如果 GitHub source 已變更，但公開索引的 `sourceTreeSha` 未更新，代表 Actions 還沒成功發佈；**不應宣稱已同步最新 HEAD**。GitHub 的 `sourceCommit` 是公開索引所對應的最後來源快照，不一定等於 GitHub main 包含工具變更後的最新 commit。
- `GitHub source index entry invalid`：來源索引格式錯誤；腳本拒絕使用不完整清單判斷刪除或封存。
- `Blob SHA mismatch`：下載到的內容與所選 commit 的 GitHub SHA 不同，該筆設為 `SYNC_FAILED`，不得標為現行。
- `Exception: Service invoked too many times`、`Exceeded maximum execution time`：Google 配額或執行時間；腳本採每批最多 25 筆並每 5 筆保存進度，下次觸發繼續。批次過大可以調低 `maxFilesPerRun`。
- 部分檔案持續失敗：看 `00_鏡像同步狀態與使用說明` 中的失敗清單、Apps Script 執行紀錄與 manifest；不得說全庫同步完成。
- Google Drive 搜尋延遲：Google 索引不一定立即更新。可先依鏡像分類資料夾及 `GitHub SHA`/文件連結讀取，避免只看檔名或搜尋摘要。
## 安全與限制
- 程式碼公開可稽核，**沒有硬編任何密碼／OAuth token**。Drive folder ID 不是存取授權；持有 ID 不代表有權讀寫。
- Apps Script 使用者必須授權其 Google 帳號的檔案操作權限；程式本身只將檔案新增／更新於上述專用鏡像資料夾，**不要把整個使用者 Drive 設成公開**。
- 若你想取消定時同步，可以在 Apps Script 的「觸發條件」頁刪除 `syncHourly` 和 `syncDrain`，或直接刪除腳本專案；既有 Drive 鏡像保留。
- Google Apps Script 有執行時間、UrlFetch 與 Google Docs 等額度限制；大量檔案的首次匯入必須分批，不能保證固定分鐘數內完成。GitHub `main` 之外的分支不會同步。
- 初次授權必須由本人完成，ChatGPT 對話沒有權限代替使用者批准 OAuth。**未完成此步驟之前不代表自動觸發器已上線。**
## Gemini Skill 使用
將 `00_鏡像同步狀態與使用說明` 和鏡像根資料夾網址加入 `structural-world-novel-management` 技能指示；需要某個角色、設定或章節時，先依原始相對路徑找對應原文，再核對最新 Git blob SHA、後出版本與作者權威。鏡像檔首段的 GitHub SHA 只代表來源版本，**不代表作者批准為 Canon**。沒有讀到原文時標記 `SOURCE_NOT_FULLY_READ`，不得憑舊快照或僅憑檔名推定。
## GitHub Actions 自動更新來源索引\n\n- 發佈工作流程：`.github/workflows/publish-giant-world-drive-index.yml`。當 `main` 的 `小說/巨構世界（法月懷造物）/**` 有更新時自動執行；此外提供每日一次校正與手動 `workflow_dispatch`。\n- 產生器：`tools/google_drive_mirror/build_source_index.py`，從 Git 追蹤的原始檔案與 Git blob SHA 產生靜態索引。若來源子樹未改變，不會產生不必要的索引提交。\n- `source-index.json` 已先建立 450 筆來源；此索引**不是 Drive 450 份已同步**的證明，實際進度以 Drive 鏡像的 `_GITHUB_SYNC_STATE.json` 為準。\n- 不需要建立 GitHub Personal Access Token，也不應把任何 GitHub 密碼加入 Apps Script。\n\n## 目前狀態
此 README 和 `Code.gs` 是可執行的安裝包；是否已授權與啟動觸發器，需要看使用者實際 Apps Script 執行結果及鏡像狀態檔，**不能只因檔案存在就宣稱 450 份都已同步。**