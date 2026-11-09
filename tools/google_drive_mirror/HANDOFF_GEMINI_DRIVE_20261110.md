# 《巨構世界》｜GitHub → Stingray Google Drive 同步與 Gemini Skill 隔日接手（2026-11-10）

> **狀態：可操作交接／非小說 Canon。** 本文件供 Gemini（網頁版 Skill）、ChatGPT、Gemini CLI 及其他 AI 接手。不要把此文件或 GitHub `main` 視為小說正式正史。沒有實際讀取工具時，不得宣稱已核實同步狀態。

## 0. 一眼看懂現在要做什麼

**目標**：GitHub `Secileya/Novel` 的 `main`、`小說/巨構世界（法月懷造物）/` 下文字來源，定期增量鏡像至 **Stingray** Google Drive，讓 Gemini 在新對話可透過 Workspace 按需要找原文。這是單向來源鏡像；Drive 不是第二個 Canon 裁決者。

- GitHub 倉庫：https://github.com/Secileya/Novel
- 公開 SHA 清單：https://github.com/Secileya/Novel/blob/main/tools/google_drive_mirror/source-index.json
- 同步程式唯一現行來源：https://github.com/Secileya/Novel/blob/main/tools/google_drive_mirror/Code.gs
- Apps Script **原有、已建觸發器**的專案：https://script.google.com/home/projects/1DPDrliDG1EXJVNfzunHmD7j_G9pVAHqHvI2rABnSHZRQrVvbCI4dXZUm/edit
- Stingray 鏡像根資料夾：https://drive.google.com/drive/folders/1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY
- 鏡像狀態 Google Doc：https://docs.google.com/document/d/18eYp79stmjF0vhTwWwRllwTQHyVGH09ELk8wpQl4j-0/edit
- 鏡像根資料夾原始機器狀態：`_GITHUB_SYNC_STATE.json`（以它的逐檔 `CURRENT` / `SYNC_FAILED` 和 SHA 為準）
- 現行 Gemini 入口：https://drive.google.com/drive/folders/1-oh1WxrfJ7DxhLUJP3S0O0aGe1oehFsg
- Gemini Skill 名稱：`巨構世界｜小說創作與設定管理`，內部名稱 `structural-world-novel-management`。

**2026-11-10 交接時的有限觀察**：來源索引列出 450 份文字來源（不含圖片、二進位檔）；Drive 狀態檔在最近一次讀取有 50 筆 `CURRENT`、2 筆 `SYNC_FAILED`，尚未全庫同步。Google Docs 摘要可能落後機器清單。該數字是歷史快照，不得當作隔日即時進度。**正式小說 0 章／PREWRITE HOLD；Gemini 第 01–12 章僅候選。**

## 1. 使用者現在要做什麼？不必重新建專案

前一版 Apps Script 同時出現 GitHub REST API HTTP 403（未授權的共享 IP 速率限制）、Google Docs 大檔卡住、`syncDrain` 與 `syncHourly` 執行約 360 秒逾時、以及 `SKIPPED_LOCK_BUSY`。

已完成的 GitHub `main` 修補：
1. v2 不再用 `api.github.com` 取 HEAD/tree；改由 GitHub Actions 維護公開 `source-index.json`，Apps Script 透過 `raw.githubusercontent.com` 下載釘選 commit 的內容，逐檔驗算 Git blob SHA。
2. **v3 最新**程式參數：`maxFilesPerRun: 8`（每輪最多嘗試 8 份）、`maxTimeMs: 135000`（檔案之間檢查時間，並非絕對取消單次長時間 Google API 操作）、`maxDocsChars: 12000`（大檔改為 Drive 純文字）、每嘗試 2 份保存一次 manifest。這些是上限／策略，**不保證每 5 分鐘成功 8 份**。

### 使用者目前尚須完成的唯一程式更新操作

使用 **原本已有觸發器的** Apps Script 專案：
1. 點 `程式碼.gs` 的編輯區 → `Ctrl + A` 全選原程式。
2. 從 https://raw.githubusercontent.com/Secileya/Novel/main/tools/google_drive_mirror/Code.gs **複製完整現行程式碼** → `Ctrl + V` 覆蓋全部原碼。
3. `Ctrl + S` 儲存；確認頂部能選 `syncNow`。**不是只按 Ctrl+A 再 Ctrl+S。**
4. 既有 `syncDrain`（約每 5 分鐘）和 `syncHourly`（約每 1 小時）可自行使用新版程式，**不必再按 `installSync`，也不用「部署」**。`syncNow` 非必要；如果想即時驗證且沒有其他執行在跑，**可選擇**手動執行一次，查執行紀錄。出現 `SKIPPED_LOCK_BUSY` 表示本輪跳過，不代表成功；有紅色錯誤或逾時應追蹤。
5. 電腦可關機：觸發器在 Google 伺服器執行。完成初次同步後 `syncDrain` 自行移除，`syncHourly` 持續檢查；GitHub push 並非立刻透過 Drive 更新。

**重要：**ChatGPT/GitHub 連接器能更新 GitHub `Code.gs`，但**不會自動更新使用者 Apps Script 專案內已貼的程式碼**。任何 AI 不得將「GitHub v3 已更新」說成「Apps Script v3 已部署」。

### 檢查同步是否正常

先看 Apps Script 左側 `執行項目` 裡最近的 `syncDrain`、`syncHourly`：`已完成` 不等於寫入了檔案，可能是 `SKIPPED_LOCK_BUSY`；`逾時` 是實際故障。再到 Drive 的 `_GITHUB_SYNC_STATE.json` 計算本輪當前 `CURRENT` 筆數、檢查 `latestCheckedAt`、`latestCheckedCommit`、`lastErrors`，對照 Google Doc 狀態快照。首批文件有過兩份 JSON Google Docs 讀寫失敗；v3 會嘗試改用純文字鏡像，但修補是否真正奏效仍需觀察執行紀錄。

如果整輪定時觸發仍持續逾時、沒有新 `CURRENT`，就停止宣稱「持續正常同步」，查 Google Apps Script 實際錯誤與對應行號；必要時修 GitHub `Code.gs`，再告知使用者將新程式碼貼回**同一專案**。修改 GitHub 本身不能代替使用者的 Apps Script 更新。不要擅自清除清單或刪除來源、鏡像、觸發器。

## 2. 其他 AI 接手時，先查什麼？

GitHub 來源檔：
- `tools/google_drive_mirror/README.md`（安裝流程，部分歷史統計與參數可能過期；以現行 `Code.gs` 為準）
- `tools/google_drive_mirror/Code.gs`（目前同步實作與單輪上限）
- `tools/google_drive_mirror/source-index.json`（公開 Git blob SHA 清單，並非 Drive 完成紀錄）
- `tools/google_drive_mirror/build_source_index.py` 及 `.github/workflows/publish-giant-world-drive-index.yml`（GitHub Actions 建立/發佈 SHA 索引，須查 Actions 是否成功；不能由工作流程檔案存在推定執行成功）
- 本文件；巨構專案中的 `GEMINI.md`、`AGENTS.md`、`000_現行決策與主題索引.md`、`00_分類導航/設定關聯引擎/AI接手_工作板.json`。

要回答「現在完成幾份」：實際讀取 **Stingray** Drive 鏡像根目錄 `_GITHUB_SYNC_STATE.json`，按 `files[relativePath].status` 計數；不能用索引 450 或 Google Doc 過時摘要替代。確認 `CURRENT` 的 `blobSha` 對應來源索引，不是只有狀態字樣。禁止使用與 Stingray 無關的另一個 Drive 帳號。

要回答「Gemini 會不會已讀全部」：Drive 同步、Workspace 檢索、Skill 指示、實際讀取原文是四件分開的事。Gemini 不會因已寫入指示或資料夾名稱，便自動完整閱讀所有鏡像檔。

## 3. 明天 Gemini 額度恢復：貼上這段訊息，直接更新**現有 Skill**

> **傳給 Gemini 的指令（不要另外建立第二個 Skill）**
>
> 請直接修改並保存我已存在的 Skill「巨構世界｜小說創作與設定管理」（`structural-world-novel-management`），保留原本人物 DNA、世界觀、版本衝突、候選隔離、語氣庫與連續性規則，補上正式 GitHub → Google Drive 鏡像使用流程。
>
> **現行 Drive 鏡像根目錄：**
> https://drive.google.com/drive/folders/1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY
>
> **同步狀態：**
> https://docs.google.com/document/d/18eYp79stmjF0vhTwWwRllwTQHyVGH09ELk8wpQl4j-0/edit
>
> **原本 00–06 入口及裁決仍保留：**
> https://drive.google.com/drive/folders/1-oh1WxrfJ7DxhLUJP3S0O0aGe1oehFsg
>
> 新增並實際保存以下規則：
> 1. 每輪創作／校核，先用 00／01 入口或鏡像的 `000_現行決策與主題索引.md` 定位主題，按需查 `AGENTS.md`、`GEMINI.md`、勘誤與相關人物／時間／能力／地點／候選章檔案。不得盲目把 450 份塞入上下文，也不能只看搜尋摘要。
> 2. 每份鏡像檔首部附 GitHub 原始相對路徑與 `Source Git blob SHA`，**這只是來源版本證據，不代表已批准為正式小說 Canon**。要保留 AUTHOR_CONFIRMED、已選未發生、CANDIDATE、LEGACY、角色主觀、UNKNOWN，遇後出修訂按證據裁決。
> 3. Drive 鏡像尚未補齊時，無檔案記為 `MIRROR_PENDING`，不等於 GitHub 不存在。來源有版本衝突但未取全必要原文，記為 `UNVERIFIED`；不得重演舊第 059 份的黑霧認知錯誤。
> 4. 續寫 Gemini 既有第 01–12 章**只能作為候選連續性**；先核對最新候選原文的真實末段、`候選01至12章逐場事件與道具連續性證據帳.json`、當前傷勢、位置、道具、關係、知情邊界與時間，不自動升格正式 Canon。獨立開篇和候選續寫必須分清。
> 5. 角色台詞／場景起稿前實際讀第 105 對話語庫、第 059 後出語氣規則，並視主題查 058、093、104；特殊嘆詞完全可不出現，絕無次數配額，不為合規硬塞「我去」。
> 6. 寫作時保持人物完整、多向關係、生活感、因果與視角資訊差；不把 QA、出處紀錄插入小說敘述。完成後用簡短附註列本輪真正讀到的來源連結與 SHA、仍無法讀取之處、候選狀態。
> 7. Google Workspace 可在新對話重新檢索 Drive，但不得聲稱已建立「整個資料夾自動常駐腦中」或「已完整讀完全部檔案」。必須逐任務依需查取。
>
> **請直接更新這個既有 Skill 並保存，回報是否真正保存、如何在新對話啟用以及是否需要手動操作。不要把指示只當作本次聊天的臨時承諾。**

## 4. 明天新開 Gemini 對話：先執行讀取驗收（不是先寫正式小說）

> **新對話測試提示詞（不要預先給它關鍵答案）**
>
> 請使用已更新的 Skill「巨構世界｜小說創作與設定管理」，只做 Google Drive 原文來源檢索驗收，不開始小說寫作。
>
> 先開鏡像根目錄：https://drive.google.com/drive/folders/1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY
> 再找到目前已同步的 `AGENTS.md`、`03_人物關係與語感/059_...`、`03_人物關係與語感/105_...` 及 `00_分類導航/設定關聯引擎/候選01至12章逐場事件與道具連續性證據帳.json`。
>
> 對每份實際找到的文件，提供 Google Drive URL、文件文頭的 GitHub 原始相對路徑、`Source Git blob SHA`，以及你從原文取得的**一小段與該檔相關且不在 Skill 指示裡的資訊**；標明是完整原文、片段或搜尋摘要。不可從本提示詞、Skill 記憶或其他彙總文件推測出處。
>
> 說明哪份檔案是工作指令、哪份是語氣規範、哪份是候選正文的連續性證據；指出任何來源缺失或衝突。最後只回答：你能否在這個**新對話**用 Workspace 真正讀到以上原文？哪些未成功？**不得宣稱讀完全部450份。**

**通過標準**：返回正確的實際 Drive 檔案網址、原始路徑和 Git blob SHA；內容節錄可與獨立原文核對。不能只靠 06 裁決或 Skill 固定文字「猜中」答案。找不到明確標 `MIRROR_PENDING` / `SOURCE_NOT_FULLY_READ`；失敗時不自動否定設定。

## 5. 新對話讀檔驗收過關後，再測候選小說寫作

> **獨立寫作驗收提示詞**
>
> 請使用「巨構世界｜小說創作與設定管理」Skill，這次不是批准正式正文，而是進行一個 **NON-CANON 候選場景測試**。請先從 Stingray Drive 的 GitHub 原文鏡像實際讀取與諾亞、艾莉維亞、人物對話、目前時段相關的 059、105、至少一份人物/能力來源和勘誤；若要承接第 12 章，還要取得候選第12章完整原文末段及逐場連續性證據帳。若無法取得，**不要假裝接續，改成獨立不入史的場景試寫**。
>
> 試寫一段有實際互動、自然感情與生活細節的非正史短場景；可以包含日常、好笑、分歧或細小衝突，不必製造重大宇宙危機。不能強迫加入「我去」等語庫詞句；角色知情、現有武器/傷勢/地點不得憑空更動。
>
> 正文後另附短小檢核：讀取的原文 Drive URL + SHA、人物關係與視角資訊、時間/道具連續性、哪些仍是候選／未核驗；不要把這份檢核混進小說正文。明確標 `CANDIDATE / NON-CANON`，維持正式0章／PREWRITE HOLD。

通過寫作測試後，才能比較可靠地讓 Gemini 擴大候選創作。即使讀檔成功，也不能保證低額度的 Flash Lite 具有高階長篇人物/因果推理品質；可讓較強模型完成關鍵情緒對話、劇情重大轉折與整章 QA。

## 6. 給其他 AI 的未完成事項與精確下一步

1. **第一優先：確認使用者原 Apps Script 專案已貼入 v3**，檢查程式上方參數 `maxFilesPerRun: 8`、`maxTimeMs: 135000`、`maxDocsChars: 12000`，並核對現有 trigger；不能靠 GitHub v3 存在推定現地已更新。
2. 重新讀 Drive manifest，對比真實 `CURRENT`、`SYNC_FAILED`、每檔 SHA 與最近 update time；不要引用本文件舊「50份」數字。若仍逾時查最近 Executions；可修程式但記得 Apps Script 仍須手動貼新原碼。
3. 確認 GitHub Actions source index 對新 GitHub 原文提交有成功重建、推送；然後在 Drive manifest 看到相同新 blob SHA，這才是**端到端**更新成功。
4. 完成全庫 450 份 mirror 及兩份失敗來源處理；清冊中 `CURRENT` 必須覆蓋最新來源清單全部檔案，`pending=0`。鏡像成功不等於逐檔語義審核完成（現行 34/335 仍是另一路工作的歷史進度）。
5. 將這份交接保留於 GitHub `main`；後續修改時以來源重讀與版本變更更新本文件。新增 Gem Skill 指示只能由具有 Gemini 帳號操作權限的使用者或其 Gemini 服務修改；ChatGPT 無法單憑 GitHub push 把 Skill 改好。
6. 每次交棒報告：本次完成、未完成、下一步第一個行動、GitHub main commit、GitHub Actions CI 狀態（若無當輪證據請寫未驗證）、Drive manifest 檔案數、是否修改正式小說 Canon。

**避免錯誤承諾**：自動同步是 Google Apps Script 定時執行，ChatGPT 不會在這段對話背後持續自行監看。Google Drive 中原始 Google Docs 可能因轉換而有空白行格式差異；需要 byte-perfect 證據時，以 GitHub blob SHA 的原始 bytes 為依據，不得把 Docs 文本重排當 GitHub bytes 相同。

---
本件僅記錄跨平台同步／Gemini 使用的操作與驗收，不更動《巨構世界》任何正式小說 Canon。
