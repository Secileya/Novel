# 候選正文局部補丁｜只輸出修改，不重貼全文

**用途**：第十五章起以及第十四章 R1 都適用。Gemini／GPT 先讀整章，但局部修訂時只交付精確 `old → new` 差異；接手工具把補丁無損套用到 GitHub 原稿的**新候選檔**。這份工具規則不是小說 Canon，正式章數仍為 0／PREWRITE HOLD。

## 使用方式（Node 20+，無套件依賴）

在 `小說/巨構世界（法月懷造物）` 根目錄執行：

```bash
node ../../../tools/novel_patch/apply.mjs /path/to/ch15_patch.json --check
node ../../../tools/novel_patch/apply.mjs /path/to/ch15_patch.json --apply
```

或在儲存庫根目錄執行：

```bash
node tools/novel_patch/apply.mjs /path/to/ch15_patch.json --check --root '小說/巨構世界（法月懷造物）'
node tools/novel_patch/apply.mjs /path/to/ch15_patch.json --apply --root '小說/巨構世界（法月懷造物）'
```

`--check` 僅驗證，完全不寫檔；`--apply` 只建立**新候選檔**，不覆蓋原稿，寫後再次驗證 bytes。

## Gemini 只需交付的 JSON（例示，不是實際章節修改）

```json
{
  "schemaVersion": 1,
  "base": "待定正文/純正文_Gemini/第十五章_R0_非正史.md",
  "baseBlobSha": "<從 GitHub 實際查得之 40 位 blob SHA>",
  "output": "待定正文/純正文_Gemini/第十五章_R1_局部修訂候選_非正史.md",
  "protectedTexts": ["<作者要求逐字保留的原稿台詞或段落>"],
  "edits": [
    {"id": "CH15-TIME-01", "old": "<來源原句或連續段落，原字引用且只命中一次>", "new": "<完整替換文字>"},
    {"id": "CH15-FACT-02", "old": "<第二處原文>", "new": "<第二處修訂>"}
  ]
}
```

`base`／`output` 相對於巨構專案根目錄，`baseBlobSha` 是未加鏡像標頭的 **Git 原文 blob SHA**，不可使用 Drive 鏡像檔本身的 SHA。

工具驗證 SHA、精確唯一錨點、修訂區段不重疊、保護文字沒有被改掉、目標不得覆蓋、輸出明確標候選。若其中一項失敗，**拒絕套用**，不要靜默猜字或全章重生。

## 回覆與交付預設

- **Gemini：**僅回傳一份精簡補丁 JSON，以及數行必要 QA（修改理由／依據／未核）；不要再重貼長篇正文、不再次分上下半部；補丁超長應先按優先級壓縮 `old` 的上下文但維持唯一命中。
- **GPT 或 CLI：**取得原文後執行檢查→套用→存為新的 R1 檔→GitHub commit→讀回 blob SHA／CI→必要時檢查 Drive 鏡像。不得把「補丁已產出」說成「R1 已儲存」。
- **有 GitHub 連接器但沒有 Node：**同樣可按照原文 blob SHA 與唯一片段定向替換，由連接器建立新檔；聊天只輸出補丁及版本回執，不重印整章。
- **第一次寫新章：**仍需產出一份完整初稿，但可直接寫入可操作的雲端檔案（如工具允許），不要同時在聊天再印同一份全文。**後續修改**預設永遠採補丁，除非作者要求大改結構、前版無法修補，或明確要求全文。

這是工作流程優化，**不降低實際讀稿、時間／人物／道具核對與正式 Canon HOLD 標準**。
