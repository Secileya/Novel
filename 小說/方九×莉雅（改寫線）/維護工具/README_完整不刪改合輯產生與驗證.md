# 莉雅 Project 完整設定｜不刪、不改來源的實際產生方法

**目前進度（2026-10-27）**：14 份來源均已核對 GitHub 原檔 blob SHA，原文合計 64,152 個 JavaScript 字元單位。它們可以在記憶中無刪節依序組合，逐份字串比對已全部通過。**之前直接上傳一份約 50,636 字元的大檔遭工具安全檢查阻擋；此後未聲稱新合輯已存在 GitHub。**

已建立：
- [鎖定 14 份來源的完整路徑和 Git blob SHA](莉雅_Project指示_原文不刪改_來源清單.json)
- [逐字組裝、原文不修改、自動核對每一份 Git blob SHA 的 Python 程式](組裝莉雅_Project完整原文.py)

## 產生完整的一份檔案（不修改來源）

在已複製 `Secileya/Novel` GitHub 倉庫的電腦上，開啟終端並進入倉庫根目錄，執行：

```bash
python3 "小說/方九×莉雅（改寫線）/維護工具/組裝莉雅_Project完整原文.py"
```

Windows 如果安裝 Python Launcher，可使用：

```powershell
py -3 "小說/方九×莉雅（改寫線）/維護工具/組裝莉雅_Project完整原文.py"
```

程式產出：

`小說/方九×莉雅（改寫線）/維護工具/莉雅_Project指示_原文不刪改完整合輯.md`

每份來源在 BEGIN/END 標籤之間**保留真正原始 UTF-8 bytes，包括標點及換行**；不是只寫連結，也不是改寫摘要。程式核對每個來源 Git SHA 與 manifest 一致，不一致會**停止**，絕不悄悄變更或刪去內容；組合完成也會重新讀回校驗。

程式只**建立新檔**，不會修改 14 份來源，不會自動推送 GitHub，也不會更動日間或 00:30 背景任務。若你確認新檔完整、願意放在目前公開的 GitHub 倉庫，才另行提交：

```bash
git add -- "小說/方九×莉雅（改寫線）/維護工具/莉雅_Project指示_原文不刪改完整合輯.md"
git commit -m "docs(liya): add byte-exact full Project instruction compilation"
git push
```

注意：`Secileya/Novel` 是公開倉庫，提交完整文字等於公開相應內容；因此上述最後的 `git push` 必須由使用者自己判斷及執行。

## GitHub Codespaces（適用手機無本機 Python 時）

若你的 GitHub 帳號提供 Codespaces，可在此倉庫按 **Code → Codespaces → Create codespace on main**，在 Codespaces 的終端執行上面相同的一行 Python 命令。完成後檢查產生的新 Markdown；是否 commit／push 由使用者自己決定。Codespaces 是否可用取決於帳號與倉庫權限，這不是本助手已驗證的狀態。

## 放進 ChatGPT Project instructions

ChatGPT 的「莉雅」Project instructions 不會因 GitHub 增檔而自動更新。需要使用者在該專案設定中貼上完整合輯；若欄位字數不容納，請將**合輯全文作為 Project 來源檔案**並在專案指示引用它，而不是暗自刪節。原生人格十三節、補充十節及後續文件都仍以各自 GitHub 原檔作為可核對來源。

**這份說明與組裝器只負責完整保留和重現原文，不能取代真人聊天完整逐輪存檔的實際工具驗收。**