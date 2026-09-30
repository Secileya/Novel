# 折光外觀與家庭白髮巧思 RETRO 修復 v1.0

> 日期：2026-09-30
> 狀態：`RETRO_APPLIED / CLOSED`

## 本輪修正
- 折光：淺栗長髮 → 白色長髮。
- 折光：灰綠瞳 → 璀璨金瞳。
- 五官：系統另行調整 → 與Franiya主身份相同。
- 精靈耳：保留。
- 白髮選擇動機精修：家人中不少白髮，Franiya覺得好看，也會因熟悉的家人聯想而感到安心，所以想試試看；非模仿特定家人。
- 精靈長耳選擇動機補入：薇薇姐姐與希雅姐都有類似精靈的細長耳型，Franiya因此對這種耳型熟悉、親近且安心。
- 「近乎神性」只為外觀／氣質描述，不是神性身份或生命層級。

## 正文回改
- 第49章：首次建立折光外觀與選色動機。
- 第50章：首次實際切換、行動中外觀、切回主身份。
- 第59章：再次切換與旁觀者視線。

## 同步
SOURCE 24、Current State、知識矩陣04L、索引06H、有效性稽核、Active Queue、專案交接、角色設定13均同步。

## 下游影響
`SAME_FACIAL_FEATURES_ONLY = TRUE`：兩身份相同的只是五官底子。
`OVERALL_PRESENTATION_DIFFERENT = TRUE`：對外帳號／角色ID、種族、職業、髮色、瞳色、耳型、氣質與氣息均不同。
`FACIAL_SIMILARITY = WEAK_LOCAL_CLUE_ONLY`：只有刻意並排高品質正臉時才可能注意到局部相似。
`FACIAL_SIMILARITY_ALONE != IDENTITY_LINK`：113～115等價觀察／媒體線不再被要求必須以外貌相似作主線索。

## VOID
本輪未使用VOID_WITH_CAUSE。

## Git驗證
- RETRO正文／同步 commit：`b68f3f42cced0197376364e9fde7befa5a59d745`
- 臨時workflow均已刪除；cleanup鏈截至`b5e5cff4939d5ca38b8edf135a4daf9cf6de0b5c`。
- `f17d5e8... -> b68f3f4...`：ahead 1，RETRO一次性commit包含12個專案檔變更。
- `b68f3f4... -> b5e5cff...`：ahead 2／behind 0，兩筆僅為臨時workflow刪除。

`ZHEGUANG_APPEARANCE_RETRO = PASS`
`TEMP_WORKFLOW_CLEANUP = PASS`
