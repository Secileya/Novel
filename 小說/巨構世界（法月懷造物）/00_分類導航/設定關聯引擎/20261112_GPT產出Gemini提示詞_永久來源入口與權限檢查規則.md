# 《巨構世界》｜GPT 產出 Gemini 提示詞的永久來源入口／權限門禁

> 2026-11-12 作者反覆明確確認的**長期實際工作限制**，非故事設定，適用每次 GPT→Gemini 研究、世界觀創意、寫作、修訂、來源追查與檔案交接。不得再要求作者重複說明。本檔僅改操作流程，不變更 Canon／候選正文。

## 不可混淆的權限分工

- **GPT／GitHub**：GPT 可以用已連接的 GitHub `Secileya/Novel` 查檔、核對真實 Git blob SHA、更新檔案及進行 QA。GitHub `main` 為版本原始來源，不代表內容就是小說 Canon。
- **Gemini／Google Drive**：**作者目前使用的 Gemini 不具備已確認可用的 GitHub 直接搜尋、讀取、寫入／提交權限。** 對 Gemini 指定文件，只能預設在它**已連接的 Google Drive《巨構世界（法月懷造物）》專案鏡像**中搜尋並實際閱讀；可附相對路徑／文件標題／可正常開啟的 Drive 連結，不能將 GitHub 路徑當成它能直接讀到的檔案。
- **資料交接與存檔**：GPT 先把原始／修正資料存至 GitHub，讓既有同步通道更新 Drive。Gemini 根據 Drive 的實際可讀內容作答。Gemini 無 GitHub 寫入權限時，只交付完整內容與 `SAVE_PENDING`；GPT 接手寫入 GitHub 並驗證版本，之後另核對 Drive 鏡像，不得假裝同步已完成。
- **版本／來源**：Gemini 可以引用 Drive 鏡像內**實際讀到**的 Source Git blob SHA／文件版本標頭，但不能憑檔名、聊天、猜測或虛構來源生成 SHA。Drive 找不到／檔案舊版／鏡像尚未同步時：**列出缺失與待核，交 GPT 查 GitHub 修復或提供可用 Drive 鏡像**；Gemini 不得自行假設擁有 GitHub fallback。
- **以後功能變動**：其他 Gemini 產品或版本可能存在手動 GitHub 快照匯入，但**作者未親自確認且未在現有 Gemini 工作流完成實測前，不得推定已接通或用它取代 Drive**。GitHub 靜態快照匯入 ≠ GitHub 實時連接、更新、歷史或寫入能力。

## GPT 每次按下「送給 Gemini」之前的四項檢查

1. **來源入口**：提示詞是否寫的是「在已連接的 Google Drive 專案鏡像搜尋／閱讀」？不能寫「在 GitHub 找檔」「先去 GitHub 讀」「Drive 不能用就去 GitHub」。
2. **交付依賴**：若有已知 Drive 文件連結，優先提供；只有 GitHub 路徑時，要明說那是**來源相對路徑，供 Drive 內檢索定位**，不暗示 Gemini 有 GitHub 權限。
3. **無權限降級**：無法實讀時應回報「未讀取」，交 GPT 補充；無寫入時應 `SAVE_PENDING`，交 GPT 保存。不能任意生成 Git SHA、commit 或 Drive 讀取成功聲明。
4. **對話消耗**：不為提示詞格式要求使用者重新講述已明確確認的限制；不要浪費 Gemini 額度讓它嘗試已知不可用的 GitHub 讀寫工作。

## 每份給 Gemini 的任務提示詞應使用的短句

> **資料來源與權限（本任務必須遵守）**：你現在只能透過已連接的 Google Drive《巨構世界（法月懷造物）》專案鏡像搜尋和實讀設定；請勿嘗試直接讀取、搜尋或寫入 GitHub。指定的檔名、GitHub 相對路徑只供辨認對應的 Drive 鏡像，不代表你有 GitHub 權限。鏡像找不到或版本不明時，回報「未讀取／待 GPT 查證」，不能編造來源 SHA。完成後交付全文，標記 `SAVE_PENDING`，由 GPT 寫入 GitHub，並透過現有單向同步供你在 Drive 讀取。

## 不能破壞的其他既有規則

本規則只改變**能力分工與提示詞措辭**：不覆蓋世界設定、舊版創意、候選章與作者決議；不降低 Gemini 實讀完整必要來源的要求；不取消人工+索引雙軌查證；不把索引存在視為全文實讀或 Canon。正式 Canon 0章／PREWRITE HOLD 不變。
