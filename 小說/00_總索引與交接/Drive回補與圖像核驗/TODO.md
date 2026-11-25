# 全庫雙向完整性｜正式待辦與驗收台帳
作者指示 2026-11-25：把待辦補進 GitHub，為目標繼續做到完。此文件是維護工作台帳，不是故事 Canon。
目標：GitHub 與 Google Drive 均持有全部實質專案內容，圖片可按原圖與作者補充準確使用，ZIP 與原件可恢復，Gemini 可直接查讀。持續新增資料使用固定快照＋增量；不以會移動的 main 作為已完成證明。
狀態：TODO／PARTIAL／BLOCKED／VERIFIED；只有實際證據達標才勾選。每輪先看本檔與最新 main，再做未完成工作，更新證據及停點；不重做已驗證資料，不無限擴張研究範圍。
起始固定快照 249ce02e3d95108d48a8877addcbb2d2aae9b52f（4171 blobs）；Drive原始備份已確認3234d9e。前輪36份Drive獨有成果已回補（23文字、8圖索引、4維護、1原著報告），不重傳。

## P0 雙向完整性
- [ ] D01 列舉整個指定Drive專案樹（完整分頁，保留id/path/mime/size），比對最新固定Git tree；區分實質原件、原生Docs、歷史版、衍生閱讀品、恢復清冊及非專案私密資料。不得以同名或同檔數判定相同。
- [ ] D02 逐項回補Drive獨有實質內容（正文、設定、作者修正、原圖、分析、重要導航、程式與候選資料）；以原件bytes或原生Docs完整文字及必要格式保存，記錄來源、權威、SHA及讀回。衝突不覆蓋。PDF／ZIP若有獨有內容也要保存，不以能重建為未驗證的藉口。
- [ ] D03 Git→Drive原始恢復鏈接到本輪固定快照；最新35份舊手動增量及新差異均有可直接讀的原件／清冊；每個blob路徑、bytes、SHA可查，刪除只記歷史，不刪原檔。
- [ ] D04 全庫最終雙向差異報告：每一項已對應、已回補或有具體可驗證例外。新提交不混入舊快照驗收。

## P1 圖像
- [ ] I01 原圖261份（家庭56、理惠197、巨構8）逐一比對路徑、大小、Git SHA1、SHA256；資料庫新圖同步納入。前輪僅全部定位與4張家庭原件重驗，不等於全量雜湊重驗。
- [ ] I02 家庭56張按原圖詳細視讀，與作者原文、最新主檔、採用與排除、情緒／氣質、畫面不一致之處對照。保留V3，不將圖案偶然細節升格DNA；已重驗4張不重做。
- [ ] I03 理惠一般情境依實際圖像、眼神、眉眼、口型、紅暈、淚汗、姿勢、光線、關係、情境，多種可能用途與限制細讀；V3 77張中43張曾重看，34張待精讀。其餘120張未納入V3；先區分一般情境與其他圖，不一律視為需同類分析。其他圖保持原始資料，不需要生成不適當的內容。
- [ ] I04 巨構8張地圖實際內容、版本、交通與候選／正式界線核對，不能從圖推出未確認世界規則。
- [ ] I05 家庭缺件11組：杏、懷髮型其餘圖、凜月6圖、凜月道具參考、璃安17圖、小曦3圖、芙蘭13附件（12有效）、芙蘭動畫1–34、洛琪5幀、思媞熊圖、城市6截圖。組別可能重疊；從可取得原始資料追查，沒有原件列BLOCKED，保留文字證據，不能重畫冒充。
- [ ] I06 修正V1/V2/V3舊矛盾與索引查詢，實際測試可根據情緒與關係而非檔名選圖。作者未確認的推論保持非Canon。新索引與完整分析雙庫保存。

## P2 ZIP／展開
- [ ] Z01 清點所有ZIP及內部項目：七卷原始基線＋清冊、五閱讀PACK、五圖包、各增量、原著索引、內嵌ZIP。逐包校驗並識別唯一內容。
- [ ] Z02 逐檔驗證展開資料與原件／ZIP一致；能直接讀，保留來源路徑；閱讀合冊不是逐檔原件。832卷既有閱讀快照、207原著閱讀卷及其他正文合冊另做覆蓋清冊，保留版本。
- [ ] Z03 清理建議表（必要保留、可重建重複、待核）：沒有驗證完整恢復鏈或作者明確刪除決定前不刪任何ZIP。至少一套基線＋必要增量＋清冊。

## P3 維護及可用性
- [ ] M01 驗收真實正向AUTO完成標記與恢復鏈；不僅模擬。不得擅改現行Apps Script或觸發器；若需使用者執行，明列確切阻礙。
- [ ] M02 建立可重複的反向差異檢查、分類、衝突及安全回補流程；先只讀稽核，實際寫入須可追溯、避免憑證或私密資料、避免衍生品循環。
- [ ] M03 更新雙庫導航、來源定位與版本指示，Gemini實際查找測試（家庭DNA、原圖修正、小說停點、原著段落、跨文件、最新增量）。不能代替Gemini聲稱已測；如無可用Gemini介面，列BLOCKED並提供可重複測試。
- [ ] M04 針對確切需求做既有作品品質研究，不把完整備份與每部小說逐字研究混為一談；非Canon成果雙庫保全。
- [ ] M05 最終驗收：列出全部已完成、可驗證例外／需作者協助的阻礙、證據與固定版本，才可說完成。此台帳與進度同步至雙庫，保留舊版本。

## 進度紀錄
- 2026-11-25：建立正式待辦。前次完成證據見 README.md。下一步 D01、D02、D03；先核對增量、導航與圖庫清冊，勿把目錄掃描或存放備份當作完整分析。

### 2026-11-25｜第02輪實作驗收
- [x] D02-A 導航原件：Drive全域00、01–20各線接手、21家庭DNA、20261124總入口，共23份（714017 bytes）全部回補 Git `導航原件/`，取原始Drive bytes獨立重算Git SHA-1，23/23與固定提交751ef9a550bff7faade40a40277703b73148e594樹完全一致。歷史導航保留，不當作即時main。
- [x] D03-A／Z01-A／Z02-A 手動增量5b223ad→3234d9e：原ZIP 304333 bytes，SHA256 1aec569a8f145f603353f272ee6865a0e4c2606afba2334c37b142d2653bae2d；36個ZIP項目＝35原檔＋1清冊，無額外／重複名稱，CRC通過；35/35 Git SHA1、SHA256、bytes吻合。35份870041 bytes已逐檔展開、上傳Drive、下載讀回重算35/35一致；5卷原文按來源byte offsets重建35/35一致。
- [x] D03-B 該批逐檔恢復定位：Drive https://drive.google.com/drive/folders/1MYwGzOV8BZkdwa24qSqcpHJnOenWTWSX ，清冊 https://drive.google.com/file/d/1Vvd9bDHO0FIS2TucVZGWSCFXt-v1Gjg3/view ，Git [3234d9e_獨立原件核驗清冊](核驗清冊/3234d9e_獨立原件核驗清冊.json)。檔名採6位序號＋原始basename＋.txt（原始副檔名與完整Git路徑記於清冊，未轉Google Docs；原件bytes不變）；這是可逆獨立原件映射，非原始階層目錄的實體複本。舊ZIP保留，未改AUTO狀態。
- D01/D02 PARTIAL：已核對導航23份及前輪36份回補；指定Drive根、研究導航、同步維護、正文閱讀、增量及圖鑑等資料夾已有直接清單，尚未完成整樹遞迴及所有其他獨有文稿核驗。維護目錄待核Code.gs防損壞完整版Docs、操作指南、歷史入口／清冊，以及衍生PDF是否有獨有資訊；不能只用檔名判斷。
- D03 PARTIAL：固定751ef9a相對Drive原始備份3234d9e：4134→4203 blobs，69新增、6修改、0移除，75個差異。62在本回補專區，另13含根AGENTS、source-index及巨構並行研究更新。這是固定快照清冊計數，未宣稱75份已備份。後續先將已存在Drive的回補源建立Git路徑與SHA映射，再補新增／修改的未對應檔；與同步完成標記核對。main並行變更，不能強推舊樹。
- I01–I06、M01–M05及其他ZIP尚未全量驗收；沒有新增視讀分析，未回收缺件，未刪任何ZIP，未改故事Canon或部署自動同步。本輪工具曾達單次呼叫上限及GitHub update_ref暫時性錯誤，改用逐檔提交，最終23份導航全部核驗成功。
- 下一個最短路徑：完成新差異的映射與反向剩餘導航/維護文稿、原始備份與讀用卷分類清冊；再批次細讀家庭和理惠一般情境，按I05回收缺圖。每次進度在此追加證據，必要時將子項標記BLOCKED，不假裝全部完成。

### 2026-11-25｜第03輪實作驗收
- [x] D03-C／M01-A：AUTO 5b223ad→e6f3b21 計畫105份。最新實查只有原件與000000–000015共16份導航，沒有完成標記。沿用前8份收據，本輪重下載第9–16份並核對 Git SHA-1、SHA-256、大小，合計16/105份、676264 bytes通過；其餘89份在此AUTO批次尚未驗證，並非證明其他Drive區域皆無。收據 [Git](核驗清冊/e6f3b21_AUTO前16份原檔核驗.json)／[Drive](https://drive.google.com/file/d/1o_923BvrBWX_vHv-Cxb8esvW-cDkpZZb/view)。未改AUTO游標、觸發器。
- [x] D03-D／Z01-B／Z02-B：固定 e6f3b21cb2f666cc58ab23495fbb2ce95a63d8bd→9d6721e08609a14205b32250ead9eba469620165（4211 blobs），17次提交的16份變更（8新增、8修改、0刪除）全部擷取，1244427原始bytes，逐份核對Git SHA1；獨立原件16/16上傳Drive並重新下載核對SHA256、Git SHA1及大小。ZIP 400343 bytes、17項（16原件+清冊）CRC通過、SHA256 056b220f581aea6712878efbc2454b3e2c43a1eca7f0aee41648aba05af1cf04，Drive重新下載一致。原始檔使用可逆序號+basename+.txt，未轉Docs。 [獨立原件](https://drive.google.com/drive/folders/1fLs9sl_DWPtTp-Gy1wRwOJEQ32B2qvFj)／[ZIP](https://drive.google.com/file/d/1wgx5HT4gW6vZCdOfiec21QWly9zXNk4h/view)／[Drive清冊](https://drive.google.com/file/d/179HaStEJ1gN-kCmY-XQIjWx5SfZRGUVo/view)／[Git清冊](核驗清冊/9d6721e_獨立原件核驗清冊.json)。
- D03仍PARTIAL：上批e6f3b21的105份AUTO未閉環，因此本次16份增量不能宣稱全庫恢復鏈至9d6721e已完整。最新Git差異另已包含5份Drive回補（維護操作指南、Code.gs歷史完整替換版、圖像總索引TXT、舊入口、3234d9e增量接續）；此次不重建或啟用它們，不修改巨構原文。前一輪回補59份，這5份屬已出現在本次起始Git的後續回補，不算本輪新作。
- 下一輪優先把AUTO計畫剩餘89份以原Drive來源及3234d9e既有已驗證原件的blob SHA建立對應（有證據就沿用），真正缺失者補實體檔；保留各快照歷史，不盲目重傳。新增清冊與待辦本身另列維護增量。圖片、缺件、全樹差分及Gemini仍未完成。沒有刪除任何原始檔或ZIP，未新增小說研究。

### 2026-11-25｜第04輪接續：固定快照跨批次恢復映射
- D03 PARTIAL：重新比較 5b223ad→e6f3b21 完整未截斷 Git trees，確認105個變更blob。原AUTO已驗16份；其餘89份中29份（590453 bytes）與3234d9e舊獨立原件核驗收據的Git SHA1及bytes完全匹配，並以Drive原件資料夾完整清單確認29個ID及大小仍一致。沿用舊逐檔下載雜湊核驗，非本輪重新下載重算。跨批恢復覆蓋45/105，待映射60；AUTO本身仍16/105，無完成標記。逐項映射及60份未對應清單：[核驗清冊](核驗清冊/e6f3b21_跨批次恢復映射第01輪.json)。未改AUTO、未刪原件、未改Canon。下一步核對60份的Drive原始導航/研究/維護來源及新版原件，僅補真正缺失者；本輪新清冊與台帳的Drive回補仍待處理。

### 2026-11-25｜第05輪接續：導航、研究、圖像索引與清冊映射
- D03 PARTIAL：本輪新增49份來源映射，跨批覆蓋由45/105增至94/105，剩11份均屬巨構研究。具體證據：第02輪映射清冊3份導航現讀文字一致；第03輪2份（圖像V1 TXT及3234d9e清冊）現讀文字一致；第04輪20份導航沿用751ef9a固定樹與前次原始bytes驗證、23份研究原件沿用19a1594固定樹與前次Google Docs文字驗證，均核對同一Git SHA及bytes、現存Drive來源；另圖像V1 JSON重新下載57163 bytes，獨立重算Git SHA1 15361569033fab22537f6548c1db8bccfab56158、SHA256 8340733ce128ab11595bea2cf003ddfa45137909faeee43d34cc46a68f33636a。三份新清冊均Git讀回一致：[02](核驗清冊/e6f3b21_跨批次恢復映射第02輪.json)、[03](核驗清冊/e6f3b21_跨批次恢復映射第03輪.json)、[04](核驗清冊/e6f3b21_跨批次恢復映射第04輪.json)。94是含歷史驗證的來源覆蓋，不是本輪94份重新雜湊；23份原生Docs可能已修訂，當前內容未逐一重讀，不算原始二進位副本。AUTO本身仍16/105，未宣稱完成。下一步依第04輪剩餘清單核對巨構11份的固定版本；再查原生Docs版本或補原件，以及本輪維護清冊/台帳的Drive副本。未改Canon、AUTO或刪除資料。
- 第05輪附查：巨構剩餘11份中7個非README檔名均找到Drive候選（含9d6721e獨立增量），但所有已列候選大小均與e6f3b21舊版不同，例如I5導航778142 vs 777986 bytes、I3第五組5685 vs 7000 bytes。不得以同名或新版替代舊版核驗。原研究目錄ID：整合1xgq9a5VfYAGEKrRIDBYZnZQ-P_J1LVP8、逐筆核驗1l71RJQoHTrl-V4dpontWuO47eqIJeFXv。後續查歷史版本或從固定Git提交另補原件；94/105來源映射數不變。

### 2026-11-25｜第06輪接續：巨構鏡像標頭及歷史版本核驗
- D03 PARTIAL：固定e6f3b21的105份由94增至102份已建立原文來源映射（含此前歷史證據）。本輪4份現存Drive鏡像去除明示BEGIN標頭後，逐字與固定Git全文完全一致，並核對原路徑、blob SHA；4份歷史revision同樣全文一致（3 README、1 I5指引），尚未keepForever，不等於永久獨立原件。另1份上層README原生Docs revision 4的來源路徑、SHA標頭吻合，但匯出有CRLF、重複空行及尾端空白差異，僅規範化文字一致，不計入102。剩2份TSV精確舊版未找到（I3 309條、I5 1830鍵），Stingray全名搜尋只返回9d6721e新版原件。證據清冊[05](核驗清冊/e6f3b21_跨批次恢復映射第05輪.json)、[06](核驗清冊/e6f3b21_跨批次恢復映射第06輪.json)、[07](核驗清冊/e6f3b21_跨批次恢復映射第07輪.json)、[08](核驗清冊/e6f3b21_跨批次恢復映射第08輪.json)、[09](核驗清冊/e6f3b21_跨批次恢復映射第09輪.json)，均Git讀回一致。AUTO本身仍16/105未完成；未改觸發器、未刪檔、未改Canon。本輪未取得可直接跨連接器上傳的Git原始檔案參照；待補2 TSV、1 README精確原件及4歷史revision永久保存，另23 Docs現行文本核對、清冊及台帳Drive回補仍待做。

### 2026-11-25｜第07輪接續：七份獨立原件實際補齊
- [x] D03-E 固定e6f3b21剩餘3份精確原件（I3 309條TSV、I5 1830鍵TSV、上層README）及4份原僅歷史revision可讀原件（3 README、I5指引）已由固定Git base64經原生Docs中轉、匯出解碼，獨立計算Git SHA1、SHA256、大小後上傳Drive，並逐份再次下載重算7/7一致，共887746 bytes。原件 [Drive資料夾](https://drive.google.com/drive/folders/13D0AVh4v6_rQF2XNXi98JDOUEGNuUrlb)／[Drive驗收清冊](https://drive.google.com/file/d/1GQ5yGSIZJ8i2Bzu8YV7hqhOryX76nZ1R/view)／[Git驗收清冊](核驗清冊/e6f3b21_7份獨立原件驗收清冊.json)。7份是真實獨立原始bytes（檔名加SHA及.txt，原路徑見清冊）。中轉4份Docs另保留，不算原件，不刪除。舊105份來源映射由102增為105/105，含先前23份原生Docs歷史文字證據及其他先前收據，非全105份此輪逐檔重新雜湊，不代表全庫閉環。AUTO實際仍16/105；未改腳本、觸發器、Canon，未刪檔。下一步23 Docs現行完整文字驗證／必要原始bytes保存，核驗清冊及TODO的固定版本Drive回補，全庫與圖像待辦繼續。

### 2026-11-25｜第08輪接續：23份原生Docs現行全文重驗
- [x] D03-F：依e6f3b21第04輪來源映射重新讀取23份原生Google Docs與固定Git全文，23/23逐字完全一致（565651 UTF-16文字單位；Git原件818848 bytes），無需覆寫現有Docs。四批收據及[總清冊](核驗清冊/e6f3b21_Docs現行核驗_總清冊.json)已Git讀回一致，逐份記錄SHA、Drive ID與全文相等結果。屬現行可讀文字核驗，不是原生Docs格式、修訂歷史或原始bytes獨立備份。105/105來源映射保持；AUTO仍16/105；未改Canon及同步程式。下一步固定本輪台帳及清冊版本回補Drive，避免維護增量無限循環；再處理全庫差分與圖像待辦。
- [x] D03-G／Z01-C：維護固定快照bd9666343f4d01405016496794436c77001bd16c，TODO＋第01–09輪恢復映射＋第01–04批Docs收據及總清冊＋7份原件清冊共16份，130803 bytes，由固定Git base64中轉還原，逐份Git SHA1、SHA256、bytes驗證，ZIP17項含MANIFEST、CRC及逐項驗證通過，44490 bytes／SHA256 b434eb97bdcb01a9f7000aa241dddf88e349fb31be4060465984889373ab7720。Drive重新下載後獨立重算並解壓16/16一致：[ZIP](https://drive.google.com/file/d/1vWafAfhVUrpwiH4MGd6HDdofaF_hpWVf/view)。另獨立可直接讀取[固定TODO](https://drive.google.com/file/d/1xrZMrucrQgVAz4EmDeaKenZHlAO3le4H/view)與[Docs總清冊](https://drive.google.com/file/d/1-2Idc6AXEJoSazGvW4YQ3_9klViPsiA4/view)，下載原始bytes均一致。其餘14份已在ZIP可逐檔恢復，尚未逐份上傳獨立Drive檔；中轉Docs保留。此行為快照完成回執，非快照自身內容；不為回執建立遞迴快照。下一步全庫雙向差分、圖像與缺件，並區分歷史快照與最新main；AUTO仍16/105，未改同步程式或Canon。

### 2026-11-25｜第09輪：全庫目錄列舉與原圖核驗
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329完整Git tree未截斷，4246 blobs；家庭56 PNG、理惠197 WEBP、巨構8 SVG共261張／280098259 bytes，現行Drive直接圖庫261/261逐項檔名與大小相符，無額外。普通搜尋會漏圖，image搜尋又漏SVG，已改用明確分頁／直接資料夾列舉並修正初始收據。[完整對應清冊](核驗清冊/63af291_圖像雙庫現行清單.json)。8張SVG本輪實際下載原始bytes與固定Git Base64逐字相同，獨立Git SHA1與SHA256全數通過，175838 bytes，[核驗](核驗清冊/63af291_巨構8地圖原件核驗.json)。不把其餘253張大小相符當雜湊驗收；尚未新增視讀，I02–I06與缺件未完成。
- D01 PARTIAL：由指定專案根1AwWosO_m36QNmSqsEgLMS6VHMi8jLt6_以list_folder_page完整分頁逐層列舉；舊一般搜尋漏列ZIP與其他類型（根10→16項），改用不依類型搜尋的資料夾清單。三批38資料夾、913直接子項（含資料夾／衍生品／原件，非913獨立實質檔），80已發現待列舉資料夾，無已查資料夾剩餘頁；[01](核驗清冊/63af291_Drive整樹列舉第01批.json)、[02](核驗清冊/63af291_Drive整樹列舉第02批.json)、[03及續查佇列](核驗清冊/63af291_Drive整樹列舉第03批.json)。尚未全樹掃完或全量內容差分。新收據Git讀回一致，Drive維護補件待納入下一固定快照；不改Canon、AUTO、刪除資料。下一步從第03批pending續掃，並分批原圖原始SHA驗證、缺件查找。

### 2026-11-25｜第10輪：指定Drive根遞迴清冊閉合與新Git差異
- [x] D01-A 指定根1AwWosO_m36QNmSqsEgLMS6VHMi8jLt6_：由第03批續掃至第21批，新增220個資料夾；21批清冊逐一讀回並聚合，258個唯一資料夾（含根）、1975個唯一檔案ID、2232直接子項（含257子資料夾），0重複ID、0未列舉子資料夾、0未讀頁、0錯誤、pending空。[總驗收](核驗清冊/63af291_Drive整樹列舉總驗收.json)含21份收據SHA及分類統計；A/B彙總保留全部資料夾與檔案ID。此為跨多次讀取的指定根metadata普查，非原子Drive快照或內容一致性結論。原始基線根1uUKmCnitOInp3CdUnhm2kKnw3jAHorZO另完整盤點8 ZIP／335225033 bytes（7卷+MANIFEST）；指定根24 ZIP，兩根合計32個外部ZIP，[基線清冊](核驗清冊/63af291_獨立原始基線目錄盤點.json)，內部項目未全驗。另已確認獨立巨構原文鏡像根1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY（不在本次指定根統計），應另盤點並核對source-index；不掃無關私人資料。
- D01/D03 PARTIAL：本輪開始Git固定694adcb82b96f883abe32bbb4b408a44e0914c70，相對63af291完整樹4246→4253 blobs，7新增、7修改、0刪除，共14差異；[固定差異清冊](核驗清冊/63af291至694adcb_Git固定差異.json)。7巨構研究變更已找現行鏡像，6份原路徑與SHA標頭正確且原文完全一致，1份上層README原生Docs僅規範化文字一致，待精確原件；[逐份核驗](核驗清冊/694adcb_巨構增量七份鏡像核驗.json)。另7項維護類（含source-index）仍須按固定快照補備份。本輪只處理metadata及上述七份文字，不重做105映射、不改AUTO、Canon、不刪資料；新清冊已Git讀回，Drive尚待回補。下一步獨立巨構鏡像樹及全量分類／內容差分、精確README補件，再推進原圖雜湊及缺件。I01目前仍8巨構及前4家庭獨立雜湊，261/261定位；未新增圖像視讀。

### 2026-11-25｜第11輪：獨立巨構／家庭鏡像閉合與同步索引實際邊界
- [x] D01-B：確認第10輪指定根258資料夾／1975檔案的清冊已保存，不重掃。另固定c6fbe2d5371750b787f19378bf0ae67a46127c32（4279 blobs），指定獨立巨構及家庭鏡像根1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY，9批完整原始資料夾分頁列舉，60唯一資料夾（含根）、1151唯一檔案、1210子項，0未掃、0未讀頁、0錯誤、0重複檔案ID。每批Git讀回一致，[整樹與狀態總驗收](核驗清冊/c6fbe2d_獨立鏡像整樹與狀態總驗收.json)含9批清冊SHA、19份索引外Drive檔案逐筆定位（3運作文件、1雲端交接、14歷史／空白封存、1 Sheets候選素材索引）。仍需比對實質文字／Sheet內容，不能依名稱決定是否重複或刪除。
- M01-B PARTIAL：獨立鏡像非全庫AUTO。實際讀取Drive _GITHUB_SYNC_STATE.json（501358 bytes），completeCommit=d246d67bf056120253f9329802de479e9cfef2e6|831f07538ac645b9bf7103e90982efeec8b6b5ae，pending=0、failed=0；巨構913、家庭210共1123筆source-index路徑／SHA／size與固定Git樹一致；1123/1123狀態CURRENT、blobSha、driveId一致且在本輪完整列舉中實際存在，9筆ARCHIVED亦存在。這是同步器狀態與現存ID驗收，不是1123份逐件重下載原始bytes；全庫AUTO仍16/105。[狀態逐筆](核驗清冊/c6fbe2d_鏡像同步狀態逐筆核對.json)／[索引差異](核驗清冊/c6fbe2d_雙來源索引固定樹比對.json)。實查兩build_source_index腳本ALLOWED僅md/json/mjs/svg/txt，故巨構939檔排除26（tsv/csv/py/html/jsonl），家庭266檔排除56 PNG；56 PNG已獨立圖庫定位，26份須按固定SHA查其他Drive原始備份或補件，非自動認定遺失。不得擅改同步程式、允許副檔名或觸發器。下輪優先處理26份索引外原件及19份Drive獨有候選的內容與歷史版本分類；694adcb待補README、維護快照及圖像雜湊未完成。未改Canon、未刪除原件。本輪新清冊已Git讀回，Drive待納入後續固定快照。

### 2026-11-25｜第12輪：26份巨構索引外原件交叉核驗
- D03 PARTIAL：固定c6fbe2d的26份巨構同步索引外原件，對指定Drive根的21批完整列舉清冊交叉查找（2232子項），20份找到同名／SHA候選，18份容量吻合並實際下載完整原件，比對固定Git Base64、獨立Git SHA1、SHA256、bytes全部通過，881832 bytes；[總清冊](核驗清冊/c6fbe2d_26索引外原件驗收總清冊.json)。18份是既有Drive副本，不重複上傳。剩8份共1840036 bytes（實際總量見清冊），其中2份有舊版本但不能冒充新版本，其餘6份未在本次檔名匹配找到；不等同確認所有ZIP均缺失。下一步補足8份固定原件或找到精確既存備份，19份鏡像外候選內容分類、維護清冊回補、圖像核驗仍待。未改Canon、AUTO或刪除任何資料。本輪清冊Git讀回一致；未新增Drive副本。

### 2026-11-25｜第13輪：26份巨構索引外原件精確閉合
- [x] D03-H：固定c6fbe2d5371750b787f19378bf0ae67a46127c32的26份巨構同步索引外檔案中，前輪18份既有Drive原件已驗證881832 bytes；本輪8份剩餘原件共1840036 bytes，以固定Git Base64中轉（大型I5分3段）還原原始bytes，逐件獨立計算Git SHA1、SHA256與大小，全部獨立上傳Drive；先移開本地待上傳檔，再逐件重新下載並與原始bytes及雜湊比對，8/8通過。合計26/26，2721868 bytes，固定快照索引外原件無未映射項。[Drive原件資料夾](https://drive.google.com/drive/folders/1HOhuQjfuuIoqXo8_HWVblM_iKqMzPhqm)／[Drive清冊](https://drive.google.com/file/d/1sjB14wsECRL6HNPbzZxjaM9NSqbqmdyp/view)／[Git清冊](核驗清冊/c6fbe2d_8份獨立原件驗收清冊.json)。清冊4845 bytes、SHA256 afbcf03cb715f6ddf34cd5b4b95546b81974b7acb6fdfd0ccae57db97b75dc74，Drive下載及Git讀回一致。原件檔名加版本、SHA前綴及.txt，原路徑見清冊；7份中轉Docs保留，不算原件。未改Canon、AUTO、舊原件或刪除資料。不是最新main全部增量驗收、不是全庫AUTO實際完成。下一步19份獨立鏡像索引外候選內容分類／回補，694adcb README精確原件、維護固定快照回補、原圖雜湊及缺件等仍待辦。

### 2026-11-25｜第14輪：19份獨立鏡像索引外Drive候選反向核驗
- [x] D02-B：依第11輪固定c6fbe2d清冊逐一核對19個Drive ID的現行內容，起始Git參照4297b23dcf6f3eac876b6945f86e6abc7966822b。9份歷史封存均找到標頭所指固定Git版本與相同blob SHA，4份去標頭後全文完全一致、5份BOM／換行及首尾空白規範化後全文一致；另20261122 Gemini雲端交接與現有Git完整非正史提示詞規範化全文一致。5份空白封存現行可讀文字為空（未核歷史revision）。3份屬自動運作產物，實讀同步說明與變更交接及下載解析508192 bytes同步狀態JSON，鏡像報1136、pending=0，非全庫AUTO驗收。696條Sheet原生表格逐格比對固定TSV：697列含表頭×12欄8364格零差異；額外第13欄696筆均為同一正式主庫URL，既有README及HTML已有此URL；其餘網格無回傳值。未驗證原生格式／公式／歷史revision，未將規範化文本當原始bytes。19/19現行內容分類完成，未發現需另回補的獨有實質內容，保留全部Drive原件，不重傳。逐項來源與限制見[反向核驗清冊](核驗清冊/c6fbe2d_19份Drive索引外候選反向核驗.json)，Git讀回一致（983c83998d892bfc1c2e56d8dc5c214e59c982a3）。本輪未改Canon、AUTO或刪除資料；新清冊及TODO的Drive固定快照備份待處理。D01/D02整體仍PARTIAL，下一步優先處理694adcb README精確原件、維護固定快照補件、家庭及理惠圖像原始雜湊、空白封存歷史修訂可用性與全庫差分。全庫AUTO仍16/105（前輪證據，未重驗）。

### 2026-11-25｜第15輪：694adcb精確README與空白封存修訂閉合
- [x] D03-I：固定694adcb82b96f883abe32bbb4b408a44e0914c70上層研究README精確原件，8844 bytes，Git SHA1 93be78d7142908bb319814ab99d7b6e7de429c2c，SHA256 3a28b7c47355ffd5c3497567688c0ec078c547d561b4d44a6e747d8a2a6491ca。固定Git Base64經獨立中轉Docs還原，獨立計算雜湊、上傳Drive、移開本地原件後重新下載逐位元組一致。[Drive原件](https://drive.google.com/file/d/1h7sZz8mikoqx931s5qAeOS8nso7rVBWI/view)。原生舊Docs保留，中轉Docs保留不算原件。
- [x] D02-C：第14輪5份空白封存實查全部可列修訂，各僅revision 1，無上一版；逐一實讀該修訂皆只有空白，沒有可回收文字。未證明過去從未有已不可用修訂；保留原件。[Git驗收清冊](核驗清冊/694adcb_README精確補件與空白封存修訂核驗.json)已讀回一致（0ba6ccf132e4efefa6911fe998afba2b42e19e99）。

### 2026-11-25｜第16輪：理惠原圖001–020首批雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，理惠001–020共20原始WEBP從Drive實際完整下載，獨立重算Git blob SHA1及SHA256，與固定Git tree SHA1與bytes逐件20/20吻合，3144452 bytes。[Git逐檔清冊](核驗清冊/63af291_理惠原圖001-020雜湊驗收.json)已讀回一致（ec5caa589c5d7583596cde30c55a52195e9aa74d），[Drive原始雜湊資料](https://drive.google.com/file/d/1R-EoqCp4PHdFVeXtAS4BvwAioq0fyRil/view)。未另下載Git二進位計算獨立SHA256，未新增視讀、未改Canon、AUTO、未刪檔。累積理惠20/197、家庭4/56、巨構8/8；剩229張未雜湊（177理惠+52家庭）。下一步固定維護清冊備份、續批原圖及缺件；全庫AUTO仍16/105前輪證據。

### 2026-11-25｜第17輪：維護固定快照增量第01包（32/53）
- D03/M05 PARTIAL：固定4e63f7ea5207e080aded64684db88c2d29cd3db5對比bd9666343f4d01405016496794436c77001bd16c，限定維護README、TODO及核驗清冊目錄，53個新增/修改檔共2553717 bytes；先完成32份≤30000 bytes原件共397154 bytes，4個中轉Docs無損還原並逐檔核對固定Git blob SHA、bytes及SHA256。ZIP含32原件及MANIFEST共33項，119936 bytes，SHA256 92d15aa1251f8b35020d958a50fae69c05036eb7aaba235db66095ae9ff0dacc；上傳後移開本地原件、重新下載ZIP及獨立MANIFEST、TODO，三者逐位元組一致，ZIP CRC及全部32原件解壓雜湊驗證通過。[Drive固定快照資料夾](https://drive.google.com/drive/folders/1pZMTVzfSytHhpDt91j7PK0WQxBWDL9zV)／[第01包ZIP](https://drive.google.com/file/d/1qFwJMv6Q3MhyQu2c27lBmQ8Au5_6LolB/view)／[MANIFEST](https://drive.google.com/file/d/1zlGfJAe7lNqr3i5POmSlLFzu6zDKoxS-/view)／[固定TODO](https://drive.google.com/file/d/1-FuB--GNJhSYNhfaTa2tU-mOG-nDnZe9/view)／[Git回執](核驗清冊/4e63f7e_維護增量第01包驗收.json)已讀回一致（55d6656e08fa0dddb5aabb232c3d48f33f748a5f）。剩21份較大型清冊2156563 bytes尚待補，不宣稱固定增量閉合；本輪回執不遞迴納入本固定快照。保留全部舊版本及中轉文件；未修改Canon、AUTO或刪檔。

### 2026-11-25｜第18輪：固定維護增量第02包與53份閉合
- [x] D03-J：承第17輪，同一固定4e63f7ea5207e080aded64684db88c2d29cd3db5對比bd9666343f4d01405016496794436c77001bd16c，剩21份>30000 bytes維護原件共2156563 bytes（19中大型+2大型索引），13份中轉Docs分段還原，逐件重算Git blob SHA1、SHA256及bytes。第02包ZIP含21原件+MANIFEST共22項，479342 bytes，SHA256 5ad1294d458aa3a9a8fc8a55510794ad64f8dcd8ed92067ef0338aebdda75b8c，CRC通過；上傳後移開本地ZIP及清冊，再下載逐位元組一致並逐項解壓雜湊驗證21/21。[Drive第02包ZIP](https://drive.google.com/file/d/1I_Eyqr1Jn8tuAL_nLP459tBc78j0a8Pk/view)／[MANIFEST](https://drive.google.com/file/d/1yeDprvoSiX3ub_M0q2dJtTZE-Z4aXLvR/view)。合併兩包清冊與兩固定Git樹重新計算53個差異路徑、blob SHA及bytes，53/53，2553717 bytes，0重複/缺失/多餘/雜湊容量不符；[Git總驗收](核驗清冊/4e63f7e_維護增量第02包及總驗收.json)讀回一致（2875fb5d18d24c379e0b85794832beae3ebcae9d）。只代表該固定範圍增量閉合（README、TODO、核驗清冊目錄），不是全部Git最新文件或全庫恢復鏈；回執不遞迴加入該快照。中轉與舊版本保留，未改Canon、AUTO或刪除資料。下一步家庭及理惠原圖批量雜湊、缺件、ZIP其他包及全庫雙向差分。

### 2026-11-25｜第19輪：理惠原圖021–040第二批雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，理惠021–040共20原始WEBP從Drive實際完整下載，獨立重算Git blob SHA1及SHA256，與固定Git tree SHA1及bytes逐件20/20吻合，3501614 bytes。[Git逐檔清冊](核驗清冊/63af291_理惠原圖021-040雜湊驗收.json)已讀回一致（14fa512356e7fc530402a6bab820c4e08b5b9822），[Drive原始雜湊資料](https://drive.google.com/file/d/1V3eQ4fz7JYNhRqh7SA_v_0bUXmEnICch/view)已回讀後比對。未另下載Git二進位重算獨立雙側SHA256；未新增視讀。理惠累計001–040共40/197，6646066 bytes，家庭4/56、巨構8/8；其餘209張待雜湊（理惠157+家庭52）。未改Canon、AUTO、未刪檔；下一步理惠041起及家庭未核原圖，缺件回收、其餘ZIP與全庫AUTO驗收仍待辦。

### 2026-11-25｜第20輪：理惠原圖041–060第三批雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，理惠041–060原始WEBP 20張完整下載Drive，獨立重算Git blob SHA1及SHA256，與固定Git tree SHA1及bytes逐件20/20吻合，3620556 bytes。[Git逐檔清冊](核驗清冊/63af291_理惠原圖041-060雜湊驗收.json)已讀回一致（7a9408f1c9c470328526b61b4d6422886ae56689），[Drive原始雜湊資料](https://drive.google.com/file/d/1rquRbE7t2oRMQ8fMJJxsySmYzYJ4kOGS/view)已回讀後比對。未另下載Git二進位重算獨立雙側SHA256，未新增視讀。理惠累計60/197，10266622 bytes，家庭4/56、巨構8/8；剩189張（理惠137+家庭52）。未改Canon、AUTO、未刪檔。

### 2026-11-25｜第21輪：理惠原圖061–080第四批雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，理惠061–080原始WEBP 20張完整下載Drive，獨立重算Git blob SHA1及SHA256，與固定Git tree SHA1及bytes逐件20/20吻合，10638250 bytes。[Git逐檔清冊](核驗清冊/63af291_理惠原圖061-080雜湊驗收.json)已讀回一致（ed8bc7342e02ba687467390f637a7aec4a99f216），[Drive原始雜湊資料](https://drive.google.com/file/d/1Mw1Sx9X3FUoS7jnyURk2_oUYFnBu7z-r/view)已回讀後比對。未另下載Git二進位重算獨立雙側SHA256，未新增視讀。理惠累計80/197，20904872 bytes，家庭4/56、巨構8/8；剩169張（理惠117+家庭52）。未改Canon、AUTO、未刪檔。

### 2026-11-25｜第22輪：家庭原圖F001–F015雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，回讀第27號家庭研究原件及V3逐圖SHA256，確認前輪已獨立核驗F002/F004/F012/F015四張，原件不重下載。其餘11張PNG完整下載Drive，獨立重算Git blob SHA1、SHA256及bytes，11/11與固定Git tree及V3 SHA256吻合，28520719 bytes。[Git逐檔清冊](核驗清冊/63af291_家庭原圖F001-F015雜湊驗收.json)已讀回一致（0120cc3d03bd325ae91007bd5c4da7b4f2940055），[Drive原始雜湊資料](https://drive.google.com/file/d/13K5puNbb10Ib95QBv5rv-2mI1KFLDRG1/view)已回讀核對。舊四張具來源證據，不重複計數；家庭累計15/56、理惠80/197、巨構8/8，共103/261，剩158張（家庭41+理惠117）。未獨立下載Git二進位重算SHA256，未新增正式視讀、未改Canon、AUTO、未刪檔。

### 2026-11-25｜第23輪：家庭原圖F016–F033雙人圖18張雜湊驗收
- I01 PARTIAL：固定63af291d3c16576774c7a183e832254952e57329，家庭F016–F033雙人PNG 18張完整下載Drive，獨立重算Git blob SHA1、SHA256及bytes，18/18與固定Git tree及V3 SHA256吻合，42769076 bytes。[Git逐檔清冊](核驗清冊/63af291_家庭原圖F016-F033雜湊驗收.json)已讀回一致（ea718604fbc09a326d3d135ed5a68430dacb411a），[Drive原始雜湊資料](https://drive.google.com/file/d/1deJ8GyqbUw_p9eqNtG00YyTODACocuuL/view)已回讀核對。家庭累計33/56、理惠80/197、巨構8/8，共121/261，剩140張（家庭23+理惠117）。未獨立下載Git二進位重算SHA256，未新增正式視讀、未改Canon、AUTO、未刪檔。
