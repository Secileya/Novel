# 檔案與事件欄位規格

## 穩定 ID

- `LT-0000`：Lunar Talk 來源序號。
- `CX-0000`：Codex 本串來源序號。
- ChatGPT：保留平台訊息 UUID。
- `SR-D03-E05`：佐伯理惠主線、故事 Day 03、事件 05。
- `HOOK-xxx`：尚未回收的伏筆或承諾。
- `ITEM-xxx`：服裝、物件或禮物。
- `SR-IMG-001`：佐伯理惠圖像素材；編號跟隨原圖庫，不是事件順序。

## 事件必要欄位

每個事件至少要能回答：

- `event_id`
- `story_day`
- `story_time`
- `source_ids`
- `canon_status`
- `supersedes / superseded_by`
- `state_before / state_after`
- `hooks_opened / hooks_closed`
- `affection_before / affection_after`

來源沒有顯示【內心】【好感度】【當下情緒】時，應寫「未顯示」，不得事後補造為原始紀錄。

## 正典狀態

- `canon`：目前有效主線。
- `compatible`：可與主線並存，但故事位置尚未核定。
- `superseded`：已被後期版本取代。
- `rejected`：使用者明確不要。
- `technical`：平台／模型／介面訊息，不是劇情。
- `source_gap`：已知存在但原文尚未取得。

## 回補規則

新增段落先定位它在角色世界中的前後事件，再決定檔案位置。`authored_at` 只用於追溯，不主導故事排序。若同一事件有多個版本，必須先做逐句差分；在沒有明確取代證據時，不得擅自把兩版混寫成第三版。

## 圖像 catalog 欄位

每張至少包括 `asset_id`、`number`、`original_filename`、`relative_path`、`analysis_path`、`sha256`、`bytes`、`width`、`height`、`content_rating`、`category`、`canon_status`、`story_event_ids`、`visible_record`、`interpretation_and_use`、`limitations`、`tags`、`filename_assessment`、`review_method`、`provenance_id`。

本批图像狀態為 `REFERENCE_ONLY_NOT_STORY_EVENT`，不加入事件時間線。`DIRECT_LOCAL_IMAGE_REVIEW` 表示本批直接開啟本機原圖；`INHERITED_REVIEW_WITH_NUMBER_CHECK` 表示沿用這次工作前段的解讀與編號核對。解讀版本與檔名不同時保留原檔名，不覆寫原圖。

正文顯示欄位：`github_image_url`、`github_analysis_url`、`markdown_embed_from_prose`、`markdown_embed_from_dialogue`、`markdown_embed_for_chat`。原圖與索引ID配對使用；`正文/IMAGE_USAGE.json`記錄文稿、asset_id、來源事件與引用用途，版面示範不改動正典。
