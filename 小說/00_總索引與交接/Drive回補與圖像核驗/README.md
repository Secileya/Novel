# Drive 回補與圖像核驗｜2026-11-25

非故事 Canon；依作者最新指示建立雙向資料完整性台帳。原文與舊版未改動。GitHub 原正式版本仍為權威。見 [根目錄 AGENTS](../../../AGENTS.md)。

## 已實際回補
- 研究原件：21B、22–43 共23份 Google Docs 全文文字匯出（BOM／原匯出換行保留）。來源均在 https://drive.google.com/drive/folders/1MnlMGvy4W-5lfmFhUpt9P_R_U8qeZE8d 。23/23 已逐份用 Drive 正文重新取得與 GitHub 固定提交 19a159452244ca0d999e836378155513c2b1659c 讀回字串完全相同。原生 Docs、版面、版本歷史保留於 Drive；Git保存可讀正文，非原生Docs二進位副本。
- 圖像：8份原始 TXT/JSON（V1逐圖視覺索引兩份、V2理惠基本表情、V3家庭56張、理惠77張、未入庫導航、V3機器索引、圖像總索引）。全部已取Drive原始 bytes，重算Git blob SHA1與提交樹8/8一致。V3 https://drive.google.com/drive/folders/14ZHbpyNqCfCU8RQMO1dS3QrtPqDMxpnG ；V1/V2及巨構地圖PDF https://drive.google.com/drive/folders/1vittpYg-AmLHLLpq_eWtkoahcCOl0dYz ；原始圖 https://drive.google.com/drive/folders/1nsDQvxujChGIuAMS4ZI7DdfZAi-rKPEf 。PDF是衍生閱讀版，原始資料與其獨有文字索引已分開；不稱PDF檔案本身已回補或完全可重製。
- 同步維護原件：全庫增量Addon、測試JS、測試報告、安裝驗收指南。原始 bytes 入庫、歷史實作證據，不啟用、不覆寫現行Code.gs或修改Apps Script觸發器。原測試記錄不等於本次執行。
- 原著完整性總報告：原始TXT逐字保存，重生BUG的原著章序異常不能因位元組完整性而認定來源原著無缺。

## 圖像驗收（不要混算）
固定本輪起始main 3234d9e 有261圖：56 PNG家庭、197 WEBP理惠、8 SVG巨構，Drive對應資料夾實際197（已查完分頁）／56／8。總數與索引一致；此輪未逐張重算261原圖。家庭V3 56張有逐圖整體觀察、作者確認用途與排除；第27號後續獨立重驗4張，52張未在該輪重視讀。理惠V3 77張含20張V2直接細讀、23張V3原圖預覽、34張沿用舊解讀；其餘120張不在V3，非零舊分析，也不宣稱本次精細分析完成。巨構8張已建立地圖索引與PDF，不將候選升正史。作者明確補充詳見AGENTS與V3：畫面證據、可能情緒、作者確認採用與排除、固定DNA各自分開；檔名不是情緒唯一答案。家庭11組待追查缺件，含杏、懷髮型、凜月、璃安17圖、小曦3圖、芙蘭13附件／動畫1–34、洛琪五幀、思媞熊圖及城市6截圖等，組別可能重疊；原圖未找到前保留文字，不能生成替代假原圖。

## ZIP、直接閱讀與未完成
- f02ec20原始完整基線：七卷原始ZIP另附MANIFEST.zip，歷史核驗4042 blobs；保留原始路徑與位元組，作恢復鏈。不能把基線全檔案已逐份在Drive獨立展開當事實。
- 14a38e1閱讀快照清冊：4043來源、3789文字（153876826 bytes）、254非文字（197 WEBP＋56 PNG＋Backrooms內嵌ZIP）；832閱讀分卷，SVG已屬文字層且另有獨立圖像。5個閱讀PACK ZIP有對應已展開閱讀庫，清冊 https://drive.google.com/file/d/1KUe1Bj11FVX0sqBwH6Cr7s_YyWm9znsw/view 。本輪重讀清冊，沒有逐一重新下載832卷驗證。Backrooms內嵌ZIP旁有五份完整文字，ZIP內部逐檔再比對待做。
- 5個圖像ZIP有261原圖的獨立資料夾，原始備份ZIP、增量ZIP及原著／索引ZIP各有不同用途。最新手動增量5b223ad→3234d9e 35份，原始ZIP與5卷閱讀已驗；本輪尚未新增35個分離的Drive原始路徑。舊AUTO增量有原檔資料夾；全庫所有ZIP內部與獨立展開狀態尚未全量重核。不得刪ZIP直到確定無唯一資料且原始恢復鏈完整。至少留一套經驗證基線、必要增量與清冊；讀用副本可重建的ZIP待另行整理。不要把ZIP和展開版再反向互相製造副本。
- 原著：70卷異常大舞台及其他137卷已具獨立閱讀入口；其他三部報告記載位元組重建已驗。重生BUG源1822標頭、1791唯一章號、最大1804，有跳號重號，來源是否完整尚未確認；不可自行補寫。
- 待辦順序：①全庫反向差分（其他Drive導航、獨有文案、候選、未收圖、同步維護文件；先分類和核對，非自動重複所有衍生品）；②圖像分析品質補完和缺件回收；③ZIP唯一內容／展開清冊與逐檔驗收；④全庫閱讀版本與自動增量運行驗收（自動正向不代表自動反向）；⑤在具體需求時進行小說品質研究。已回補的成果不重做。
- 此輪未宣稱全庫雙向零差異，沒有重建全部歷史ZIP或部署新腳本，也沒有新增小說正文、圖像分析或刪除使用者原件。

## 來源
全庫Drive入口：https://drive.google.com/drive/folders/1AwWosO_m36QNmSqsEgLMS6VHMi8jLt6_  
原始基線：https://drive.google.com/drive/folders/1uUKmCnitOInp3CdUnhm2kKnw3jAHorZO  
增量：https://drive.google.com/drive/folders/1eppxXt86PrH4Xd5vNS4q3EIzc4hdBURK  
最近手動增量紀錄：https://drive.google.com/file/d/1zdeN_Wpnp5OKCCPjAfAwjpgJvro8vYFu/view  
原著完整性來源：https://drive.google.com/file/d/1W-m-7SaWh3C_Lad7LUpoSTmzCT9DrUS_/view  
同步維護原件：https://drive.google.com/drive/folders/10kAkAtAcKA1mIDFGAhwSdVFJ6E4QFYwz
