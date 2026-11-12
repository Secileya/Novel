> **2026-11-12 17:26（台灣）實際鏡像驗收快照**：在本次 GitHub 修補程式尚未部署進既有 Apps Script 的情況下，原有**完整同步通道**後來自行補齊原先缺失的4份。讀取 Stingray Drive `_GITHUB_SYNC_STATE.json` 對照索引 `85131b28601ac8814d87597c66c78ac0abcdf64d`：`615/615 CURRENT`、`pending=0`，四份目標檔的 SHA 均與 source-index 匹配；逐份 Drive 實讀亦已確認。這**不代表新快速同步 v2 已線上部署**。線上快通道要取得本次補漏能力仍需手動覆蓋原 Apps Script `程式碼.gs`，再執行 `quickSyncNow` 驗證。

> **2026-11-12｜快速同步補漏 v2（GitHub 程式修復，待使用者 Apps Script 部署）**：`Code.gs` 的 `syncQuick` 改成在來源索引變更（或首次安裝修補）時，**以整份 source-index 的 SHA 清單對照 Drive manifest**，找出連續提交時已不在最後一批 `changedFiles` 裡的漏同步檔案。只比較索引/manifest metadata，不重新下載已 `CURRENT` 的來源；原有 `SYNC_FAILED` 歷史欠帳仍交完整同步。快速單檔容量從 **64,000 Bytes 提升至 128,000 Bytes**（因此本次 67–88 KB 的第十九章正文和128題 JSON 索引可走快速通道）；更大的來源保留在待處理清單，且自動啟動 `syncDrain`，不再靜默丟棄。新增一次性的 `megaQuickRevision` 記號，**即使 GitHub source commit 沒再改**，首次換新版也會重新檢查遺漏來源。新增 [離線回歸測試](test_quick_sync.mjs) 和 [GitHub Actions 測試](../../.github/workflows/check-drive-mirror-quick.yml)。**GitHub 修改不會自動部署到既有 Apps Script 專案。** 要讓線上每分鐘任務使用新版：開啟[既有 Apps Script 專案](https://script.google.com/home/projects/1DPDrliDG1EXJVNfzunHmD7j_G9pVAHqHvI2rABnSHZRQrVvbCI4dXZUm/edit)，將最新版 [Code.gs](Code.gs) **完整貼到原有 `程式碼.gs` 並儲存**（不可只複製新增的函式），手動執行一次 `quickSyncNow`；既有觸發器可沿用，不必重建專案或重跑 `installSync`。看執行回傳 `updated`／`pending` 與 [Drive 同步狀態](https://drive.google.com/file/d/1s9GM0w-zHkhwlQAy3hopKPy-0sDdOzN0/view) 再比對 SHA；若資料量大，`quickSyncNow` 可在每分鐘排程繼續處理。切記 `pending=0` 只代表快通道當前隊列清空；全庫完成要以最新 `sourceCommit` 下逐檔 SHA 和完整同步 manifest 驗收。

> **2026-11-10｜作者後出每輪來源刷新／跨 AI 交接規則**：鏡像只負責**同步變動檔案**，不會自動把它們注入 Gemini 對話。ChatGPT／Gemini 需要按[跨 AI 每輪讀取、候選正文前置與完整 Gemini 回貼保存 SOP](../../小說/巨構世界（法月懷造物）/00_分類導航/設定關聯引擎/跨AI每輪來源刷新_Gemini回貼原文全量保存與寫作前置SOP.md)判斷要查哪些檔案。GPT 每次修改 GitHub 要附本題變更清單（路徑＋SHA＋相關正文／語氣／物件證據）；Gemini 新對話先看 `00_最新GitHub變更交接.txt` 和 manifest，再讀與本題相關的鏡像原文，不能只看一份列表就宣稱讀過。提交後還需等待／驗證鏡像同 SHA，`syncQuick` 不等於保證即時送達。作者 PO Gemini 原文先歸檔，QA／Canon 另層保存。

# 《巨構世界》GitHub main → Stingray Google Drive 原文鏡像
> **2026-11-10｜Gemini 隔日完整接手**：請優先閱讀 [HANDOFF_GEMINI_DRIVE_20261110.md](HANDOFF_GEMINI_DRIVE_20261110.md)，其中含 Apps Script v3 執行／鎖定／逾時處理、明天可直接傳給 Gemini 更新 Skill 的完整指令、跨對話讀檔測試及 NON-CANON 候選小說測試。GitHub 的修補**不會自動寫入使用者 Apps Script 編輯區**。

**性質**：資料鏡像與工具，不是小說 Canon，亦非新故事設定。預設僅讀取 GitHub 公開倉庫，僅寫入 Stingray Drive 的專用鏡像資料夾。
## 新增：GPT／Gemini 近即時同步（快速通道，2026-11-10）

**不是只能每 5 分鐘同步。** 現行完整鏡像保留 `syncDrain`（每五分鐘補漏）與 `syncHourly`（每小時巡查）；新增可選 `syncQuick`（每一分鐘輕量查詢 GitHub SHA 差異）。觸發器由 Google 排程，**不是保證每分鐘準點執行的 webhook**。在新 GitHub commit 推送之後，Actions 仍須先成功更新 `source-index.json`，Drive 與 Google Workspace 的搜尋也可能有自然延遲。

### 已有 Apps Script 專案的最短啟用步驟

1. 開啟**原本已授權的** Apps Script 專案：<https://script.google.com/home/projects/1DPDrliDG1EXJVNfzunHmD7j_G9pVAHqHvI2rABnSHZRQrVvbCI4dXZUm/edit>，登入 Stingray 帳號。**不要另建新腳本，不要重跑 `installSync`**。
2. 從 [Code.gs（GitHub main）](https://github.com/Secileya/Novel/blob/main/tools/google_drive_mirror/Code.gs) 複製完整內容覆蓋 Apps Script 的 `程式碼.gs` 並儲存。**GitHub 更新不會自動部署到這個專案**。
3. 在 Apps Script 的函式下拉選擇 `installFastSync`，執行**一次**（同意新增授權提示，如有）。程式會新增唯一一個每分鐘 `syncQuick` 觸發器，立即做一輪輕量同步；原本 `syncDrain`／`syncHourly` 保留。
4. 檢查 Apps Script「觸發條件」確實存在 `syncQuick` 的時間觸發器，再看「執行項目」是否成功，Drive 鏡像根目錄應出現 `00_最新GitHub變更交接.txt`。也可手動執行 `quickSyncNow`。如要停用快速通道，執行 `stopFastSync`，不影響舊鏡像。

### 快速通道如何運作

- GitHub Action 對每次原始來源變動產生 `changedFiles`（新增／修改）、`removedFiles` 和釘選的 `sourceCommit`／Git Blob SHA；只根據**來源實際變動**更新，不反覆搬運整個檔案庫。
- `syncQuick` 每輪最多更新 **2 份、每份最多 128,000 Bytes（2026-11-12 v2；先前版本 64,000 Bytes）** 的改動來源；已存在的鏡像原地更新，新鏡像建立為普通 `text/plain`，**不新增 Google Docs**。超過快速上限的大檔會保留於 `quickLanePendingPaths`、列入 `quickLaneDeferredLargePaths` 並啟動 `syncDrain` 完整鏡像，同時在快速交接中提供釘選原文 URL；連續來源提交造成的先前漏同步檔，也會由整份來源索引與 manifest 的 SHA 差異補回。
- 鏡像根目錄的一份固定檔案 `00_最新GitHub變更交接.txt` 記錄 GitHub commit、變動路徑、原始 SHA、`DRIVE_CURRENT` 或 `DRIVE_PENDING_OR_STALE`，以及該次 commit 的原文固定連結。Gemini 不需要猜「五分鐘何時到」。
- 原本 `syncDrain` 遇到 Google Docs 的 `docs create` 每日額度時，改試**純文字鏡像**，成功才記為 `CURRENT`；遇到來源下載或 SHA 錯誤仍記 `SYNC_FAILED`，不掩蓋失敗。Google Workspace 對純文字鏡像的搜尋可能晚於 Drive 檔案寫入。
- `00_最新GitHub變更交接.txt` 不是完整設定摘要，不代表 Gemini 已讀到原文，更不是 Canon 權威來源；真正的內容、後出修訂和作者決議仍須到對應原檔核對。

### 可直接貼給現有 Gemini Skill 的規則

> 每次 GPT 說「已更新設定」或我要你研究最新內容時，先讀 Stingray 鏡像根目錄的 `00_最新GitHub變更交接.txt`。核對 `Source index commit` 和被修改檔的 `Source Git blob SHA`。若對應鏡像標示 `DRIVE_CURRENT`，請實際讀取該 Drive 文件的原文；若標示 `DRIVE_PENDING_OR_STALE`，優先嘗試打開交接內的 **Pinned source URL** 取得 GitHub 該版本全文。若沒有權限讀 GitHub 或檢索不到 Drive 原文，就明確回報 `MIRROR_PENDING`，不要拿舊快照當新版本，更不要自行猜新決議內容。永遠區分作者已確認、AI 候選、舊版本與正式0章 PREWRITE HOLD。

### 故障與配額

- 若五分鐘和每小時排程仍存在但看不到 `syncQuick`：說明**尚未在使用者的 Apps Script 專案執行 `installFastSync`**。
- `SKIPPED_LOCK_BUSY`：另一個同步正在使用 ScriptLock，本輪跳過，非成功。
- `NO_SOURCE_CHANGE`：公開 GitHub source index 還沒有變（或已處理），不能據此假稱剛提交的資料已經進 Drive。
- `HANDOFF_READY_SOME_DRIVE_PENDING`：快速交接已更新，但部分來源過大或待背景鏡像，Gemini 可用固定來源 URL。
- `docs create` 額度不足：快速通道不新建 Docs；背景通道會優先建立純文字副本，仍可能受 Drive、Apps Script 執行時間與查詢額度限制，不能承諾每次在固定秒數內完成。
- 快速通道的上次來源提交、已處理檔、待處理檔與錯誤另記於 `_GITHUB_SYNC_STATE.json` 的 `quickLane*` 欄位。不要擅自清除原始同步紀錄或人工原文。

## 目的與配置
- **GitHub**：`https://github.com/Secileya/Novel`，`main` 分支，`小說/巨構世界（法月懷造物）/` 路徑。
- **鏡像 Drive**：`https://drive.google.com/drive/folders/1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY`。
- **保留原文**：複製 `.md`、`.json`、`.mjs`、`.svg`、`.txt`，沿用原始相對子目錄；原始文字前加上來源 Git blob SHA、commit SHA、GitHub 路徑與權威提醒。
- **適合 Gemini**：一般大小文字檔鏡像為 Google Docs；超過 12,000 字元的檔案採普通 UTF-8 純文字鏡像（v3，避免大型 Google Docs 操作逾時）。`.svg` 是文字原始碼，不是圖像預覽。二進位圖像不在本腳本範圍。
- **增量（2026-11-09 403 修正版）**：GitHub Actions 追蹤專案原文目錄的變動，將每檔 blob SHA 與釘選 commit 寫入 `tools/google_drive_mirror/source-index.json`；Apps Script 改由 `raw.githubusercontent.com` 取得這份公開索引及來源，不再呼叫共用 IP 容易耗盡限額的 `api.github.com`。只更新 SHA 不同的來源，下載後另以 Git blob SHA 驗證實際內容。
- **無損歷史**：GitHub 刪除的來源移至鏡像內的 `_99_GitHub已刪除_歷史封存`，不永久刪除；舊 Drive `GEMINI_KNOWLEDGE`、舊原始 .md、00～06 版本裁決不會被覆蓋。
- **權威**：此同步只保證來源與版本，不做語義裁決；`GitHub main` 內的 `CANDIDATE`、`NON-CANON`、`PREWRITE HOLD` 不會因此變成正式 Canon。
## 僅需一次授權的設定（Google Apps Script）
1. 確認目前登入 **Stingray** Google 帳號（`xw4761645@gmail.com`），開啟 https://script.google.com/home/projects/create 。
2. 把本目錄 `Code.gs` 全文貼到新專案的 `程式碼.gs`，取代預設空白函式。專案可命名「巨構世界 GitHub Drive 增量鏡像」。
3. 儲存後，上方函式下拉選單選 `installSync`，按「執行」。Google 會要求授權本專案使用 Google Drive / Google Docs / 外部 GitHub HTTP 查詢與排程；這是腳本修改你自己 Drive 檔案所必需，授權前可以先閱讀全部原始碼。**不需要 GitHub token，也不用把個人密碼貼進程式。**
4. **已有 `syncDrain` 與 `syncHourly` 的使用者，不必重新執行 `installSync`**：貼上更新版完整 Code.gs、儲存後既有觸發器即可沿用；`syncNow` 是選擇性的立即測試，不是必須。不可只按 Ctrl+A、Ctrl+S 而漏掉 Ctrl+V 貼上新版。第一次執行會同步一批，並建立兩種時鐘觸發器：每 5 分鐘繼續補齊尚未同步的原檔（補齊後自動移除），每 1 小時檢查 GitHub 是否出現更新。Google 的觸發時間存在自然延遲，並非 push 時即時 webhook。
5. 回到鏡像資料夾，打開 `00_鏡像同步狀態與使用說明`。等它顯示 `CURRENT=total`、`pending=0`、`已完整同步 HEAD` 已更新，就代表該次 commit 完整同步成功。詳細來源 SHA、Drive 文件 ID 見 `_GITHUB_SYNC_STATE.json`。
6. 需要立即檢查修改時，從 Apps Script 手動執行 `syncNow`。不需要重建專案、重新上傳全部設定。
## 出錯時如何排查
- `GitHub API HTTP 403`：表示 Apps Script 還在執行 **舊版** `Code.gs`。用本版程式完整覆蓋並儲存，再執行 `syncNow`，新版不會呼叫 GitHub REST API。若使用新版仍有 HTTP 錯誤，查看實際是 `GitHub public index HTTP` 還是 `GitHub raw HTTP`，不可一律當成 API 額度。\n- `GitHub public source index missing or invalid`：核對 `https://raw.githubusercontent.com/Secileya/Novel/main/tools/google_drive_mirror/source-index.json` 是否有原文及 GitHub Actions 的 `Publish 巨構世界 Drive source index` 是否成功。GitHub Actions 需有 `contents: write` 權限；若組織／倉庫禁止 Actions 寫回 main，須由倉庫擁有者調整權限。\n- 索引仍舊：如果 GitHub source 已變更，但公開索引的 `sourceTreeSha` 未更新，代表 Actions 還沒成功發佈；**不應宣稱已同步最新 HEAD**。GitHub 的 `sourceCommit` 是公開索引所對應的最後來源快照，不一定等於 GitHub main 包含工具變更後的最新 commit。
- `GitHub source index entry invalid`：來源索引格式錯誤；腳本拒絕使用不完整清單判斷刪除或封存。
- `Blob SHA mismatch`：下載到的內容與所選 commit 的 GitHub SHA 不同，該筆設為 `SYNC_FAILED`，不得標為現行。
- `Exception: Service invoked too many times`、`Exceeded maximum execution time`：Google 配額或執行時間；v3 程式每批最多嘗試 8 筆、每 2 筆保存進度，並在各檔案之間核對 135 秒軟性時間閥值；若單次 Google API 呼叫本身卡住仍可能逾時。批次過大可以調低 `maxFilesPerRun`。
- **2026-11-10 `docs create` 每日額度冷卻補丁（GitHub helper，尚非實際部署）**：一旦 Google Apps Script 回報 `docs create` 每日建立額度，立刻停下同批餘下的檔案嘗試，將 `docsCreateQuotaPauseUntil` 記入 `_GITHUB_SYNC_STATE.json`，保守冷卻 25 小時；既有 `syncDrain` 每 5 分鐘排程仍可執行，但冷卻期間不會繼續建立文件，解除冷卻後可自動繼續重試。已成功的 SHA 不重新建立，失敗仍保持 `SYNC_FAILED`，不製造假完成。**GitHub 修改 Code.gs 不會自動更新使用者自己的 Apps Script 專案**；必須將最新完整 `Code.gs` 複製到既有 Apps Script 的 `程式碼.gs` 並儲存（原觸發器繼續沿用），才能真正啟用本補丁。若未安裝，本來的自動重試仍會於 Google 配額恢復後繼續，但每輪仍可能反覆觸及配額。
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