# Gemini｜家庭《01》最新版閱讀分卷（自動生成）

這個目錄不是新的家庭設定，更不是舊版 01A～01E 的續寫。**唯一正式權威仍是上一層的 `01_家庭完整角色設定總檔.md`。**

GitHub Actions 每當該主檔更新，會由 `tools/google_drive_mirror/build_family_reading_volumes.py` 自動生成：

- `00_最新版閱讀導航.md`：列出來源 Git blob SHA、各冊的原文章節範圍與位元組區間。
- `01_最新版閱讀分卷_001.md` 等：逐字複製主檔的連續原文片段，每冊完整檔案不超過 80,000 Bytes。
- 每冊起點標記 `GEMINI_LATEST_FAMILY_EXACT_SOURCE_START` 之前是版本說明；之後是未經改寫的原始片段。按序拼接全部片段能逐 byte 重建完整主檔。

原始歷史五冊：`04_Gemini_01總檔五冊_2026-11-07/`，只保留做稽核，不同步重寫。互動素材 `03_互動文案/` 與 `家人生活/` 仍由原始索引另外同步，不會憑空混入這些閱讀卷。

**Gemini 請從 Google Drive 的家庭總檔鏡像讀取**：
https://drive.google.com/drive/folders/11ui-zviN5uhgY6iGm6Og5bPUOsBWIUEM

每次只讀同一版 SHA 的分卷；若同名閱讀檔案尚未全部 `CURRENT`，不要把歷史五冊當補丁。GitHub 檔案已提交不代表 Google Drive 已完成鏡像，需核對 Drive `_GITHUB_SYNC_STATE.json` 才能宣稱交付。
