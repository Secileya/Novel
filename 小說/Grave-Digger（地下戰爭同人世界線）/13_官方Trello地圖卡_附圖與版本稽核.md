# 13｜官方 Trello 地圖卡、封面圖片、版本與社群地圖稽核
> 日期：2026-10-31｜來源：**開發者管理的公開 Trello 實際 JSON 卡片資料**，不是猜測或單靠社群 Wiki 轉述。  
> 官方面板：[Grave/Digger Official Trello](https://trello.com/b/PtRtvsCj/grave-digger-official-trello)｜[Map - Compounds 原始列表](https://api.trello.com/1/lists/6851c90e8c1f1754c4a92028/cards?fields=name,shortUrl,desc)｜[Map - Objectives](https://api.trello.com/1/lists/67b0e919f71fad1806ff429d/cards?fields=name,shortUrl,desc)｜[Map - Community Compounds](https://api.trello.com/1/lists/68a0d183e7ebaac7a8c2063e/cards?fields=name,shortUrl,desc)。
> **實際查證方式**：Trello 前端因 JavaScript／CDN 不易讀取，這次用公開 `trello.com/c/...json`、`api.trello.com/1/lists/.../cards` 和附件資料端點直接讀卡。**部分圖片由瀏覽器成功開啟並檢視，部分只能讀到圖片附件元資料**，見第五節。卡片封面可能是舊版本截圖，不能當 2026 現行遊戲地形的唯一依據。

## 一、這三種清單不能混成「全部官方正史地圖」
| Trello 官方分類 | 2026-10-31 實際查到 | 如何看待 |
|---|---|---|
| **Map - Objectives** | 8 張卡片，含旗幟、控制點、Forward Operating Base（FOB）、補給站與分隔卡 | 遊戲目標與規則；不是 8 張可選據點 |
| **Map - Compounds** | **34 張卡片＝25 張具名基礎據點＋8 張 Collapsed 坍塌版本＋1 張分隔卡** | 官方主要遊戲 Compound 紀錄，但不保證每張在當前投票池或每種模式可選 |
| **Map - Community Compounds** | **135 張卡片（含說明、分隔、測試、重做、趣味、一般社群地圖）** | 有作者、測試與部分可用地圖，但**不能全部視為主線已發生過的實際地理地點**，不要把測試台、迷因地圖寫成「國家城市」 |

### 另一層重要來源界線
**官方 Trello 記載了一名玩家／地圖作者寫的背景介紹，代表其作品說明被納入官方資料板，不自動保證其中所有劇情細節已被遊戲總編確認為不可變動的正史。** 特別是同一張卡片收錄多個互有矛盾的起源版本。需區分：
- **BOARD-FIXED**：地圖名稱、Point ID、上線／重做版本、分類、截圖與製作署名。
- **DEV-WORDING**：開發者 Archeximus／NOVATALITY 明確署名的場景描述，可作較高可信背景，但仍應核版本。
- **CREATOR-LORE**：地圖設計者提供的故事、角色及歷史，具有可吸收價值；若和全域正史或另一段卡片衝突，**先保留多版本、不自行硬定**。
- **VISUAL-CONFIRMED**：實際看見的圖片內容；圖片只證明當時場景視覺，不證明政治歷史／人物身分。
- **FANON**：普通社群提案和沒有落在正式主名單的自製地圖，不冒稱正式地理。

## 二、25 張具名主要 Compound，逐張官方來源
| 正式卡名 | 原卡 | 卡片描述中的設施與社會用途（摘要） |
|---|---|---|
| Assembly | [官方卡](https://trello.com/c/kZCtr1L1) | Solace 組裝武器／裝備的工業據點；v0.54 加入，v0.73 重做 |
| Barracks | [官方卡](https://trello.com/c/QuorgJVk) | Solace 休息、貨物與**快遞／轉運**樞紐；v0.34 加入，v0.73 重做 |
| Basin | [官方卡](https://trello.com/c/Gk34wUTa) | 水道入口，Solace 工人清垃圾、維修水管，控制可通往受保護的地下通路 |
| Bastion | [官方卡](https://trello.com/c/S9Fz6ZLI) | 堡壘與支援陣地，但卡片同時有「昔日帝國堡壘」與「原 Solace FOB」兩版本歷史，**不可硬合為已定唯一史實** |
| Church | [官方卡](https://trello.com/c/WCiCGXrd) | Solace 未完工便荒廢的教堂；作為近／中距交戰地形 |
| Cobble | [官方卡](https://trello.com/c/CeMiwQnJ) | 舊 Rook 前線基地；工兵換班、重鎬、開礦爆彈、重彈藥維修及臨時俘虜收容 |
| Columbarium | [官方卡](https://trello.com/c/5oyOI90R) | 火化設施，地圖作者另提精英火化區；不是普通軍營 |
| Communications | [官方卡](https://trello.com/c/9JpdpC1g) | 舊稱 Radio Station／Station 17；救難、無線電信號及居住區 |
| Depot | [官方卡](https://trello.com/c/aTRPiRRR) | 車輛與軍需轉運，卡片提一輛從地表回收、部分拆解的 **Fiat 2000** 坦克 |
| Estate | [官方卡](https://trello.com/c/MECnM3WE) | 帝國豪華舊宅／倉庫的地圖創作背景；涉及徵用勞工，細節屬地圖作者敘事 |
| Greenhouse | [官方卡](https://trello.com/c/aDmmC0W6) | Solace 作物／植物健康生產場所與園丁棚屋，卡片寫可能培養食用菌類 |
| Hideout | [官方卡](https://trello.com/c/wgZPMt54) | 表面空曠、地底有無法直接進入的貯存室；戰術上暴露，不保證已有社會居住功能 |
| Manor | [官方卡](https://trello.com/c/48XGjlPd) | 未完工宅院與臨時傷患區；卡片同時有帝國貪婪領主／Solace 高層宿舍兩版本，**來源衝突** |
| Manufacturing | [官方卡](https://trello.com/c/MyfGxh4y) | Solace 物資整理和製造、兩側二層工廠與中央雙橋，具立體交火環境 |
| Medical | [官方卡](https://trello.com/c/8DkLKTZj) | 原 Solace 主管行政樓，祕密轉為野戰醫院，可收容並照護傷患 |
| Mortuary | [官方卡](https://trello.com/c/rbw7Ow6C) | 屍體保存、棺木與殯葬；作者寫雙方 Mortician 部門與 Solace 合作處理死者 |
| Office | [官方卡](https://trello.com/c/i7NV29tc) | 前線命令、書信、電報與補給通知中繼；房屋曾受塌頂 |
| Outpost | [官方卡](https://trello.com/c/9vBStDDa) | Solace 防 Bandits 的高塔／碉堡據點；v0.34 加入、v0.73 重做 |
| Processing | [官方卡](https://trello.com/c/3633an5b) | 不明勢力遺留的通電礦物處理廠、立體空間與升降機 |
| Renewal | [官方卡](https://trello.com/c/QHrLNNmz) | Solace 舊軍服再生／洗滌修補設施，作者描述包含從亡者身上回收軍服 |
| Sabbath | [官方卡](https://trello.com/c/SgUTv8yx) | 禮拜、簡易床鋪與休息用途的宗教空間，戰爭使它成為防守要點 |
| Shanty | [官方卡](https://trello.com/c/dyYW1Ktg) | Solace 較老舊的前期基地，因疾病和惡劣生活條件荒棄、封板 |
| Stockpile | [官方卡](https://trello.com/c/CCIavtoQ) | 食物、武器、裝備及其他資源倉庫；饑荒使其戰略價值極高，有高低位置差 |
| Transmission | [官方卡](https://trello.com/c/Er3qFMPc) | Officer Watch 使用的通訊核心，可發布命令與截聽敵方消息；因未知原因急撤 |
| Warehouse | [官方卡](https://trello.com/c/f59U7jrf) | 三層樓建材與補給倉，曾被 Stockpile 取代後又回歸，不代表真實倉庫被另一棟物理取代 |

**別把「上線時間」等於故事年代；它是 Roblox 遊戲版本紀錄。** 部分新地圖先在社群地圖欄「非正式」出現，之後才正式列入主要 Compound；這恰好證明「社群原型 → 官方收錄」和「原本就是官方主線」不是一回事。

## 三、8 個坍塌版本（特殊地形，不是 8 個新都市）
| 坍塌版本 | 官方卡 | 敘事效用 |
|---|---|---|
| Collapsed Assembly | [卡片](https://trello.com/c/5jr0mGVp) | 同一組裝設施的受損版本，能追蹤失去設備與停工 |
| Collapsed Barracks | [卡片](https://trello.com/c/PmBzFE41) | 兵營與運輸停擺、傷兵安置和災後搬遷 |
| Collapsed Church | [卡片](https://trello.com/c/Q1p1DLJ5) | 宗教空間被毀與群體反應 |
| Collapsed Greenhouse | [卡片](https://trello.com/c/IjAGu60U) | 糧食供應與農工家庭面臨的長期損害 |
| Collapsed Manufacturing | [卡片](https://trello.com/c/iAZDJnLX) | 工業設備損毀、橋梁倒塌及重新開路 |
| Collapsed Outpost | [卡片](https://trello.com/c/TmAvCYmo) | 失去防線後 Bandits 活動及撤退路線問題 |
| Collapsed Processing | [卡片](https://trello.com/c/rSGf8j6r) | 礦廠斷電、升降機及回收難題 |
| Collapsed Shanty | [卡片](https://trello.com/c/YBOGOmkN) | 破舊貧民居住環境的進一步崩毀 |

**小說化的重要修正：**Collapsed 是遊戲的替代構型，**不代表每個基礎地圖在劇情上必然依照某次固定戰鬥坍塌**。若作者選擇同一地點隨戰爭變廢墟，必須建立事件與時間線，不可無根據將遊戲變體當已發生正史。

## 四、Community Compounds 是巨大的同人素材庫，不能全當正史
公開資料的 **135 張卡**混合說明、標題、重做試驗、Special、Large、Fun 和 Regular：
- **Special／測試**：Trial、Novatesting、Origin、airpartclear、node 等；除非小說確立世界內真實用途，測試場不是軍方真正領地。
- **Large／大型非主線**：city、district、citygarden、seaside、spacestation；**即使官方 Trello 有截圖，也不自動確定現有地下世界有大型太空站**。
- **Fun／遊戲娛樂**：2fort、Freddy Fazbear's、Wafflehouse、Water、Derby、Spleef 等；某些是迷因或惡搞，不能拿當本線世界地理。
- **Regular／可供吸收的普通場所**：Market（民間交易站）、Inn（舊旅館）、Apartments（住宅）、Canning（裝罐場）、Purity／Purification（水處理）、Quarry（採石）、Oilwell（油井）、Textile（織品）等；**在社群欄有卡並不等於已在現行公開地圖輪換**。可依作者與遊戲玩法作相容小說擴展，並標示〔FANON／CANDIDATE〕。

## 五、官方圖片附件與「真的有看過」紀錄
### (A) 由 Trello 附件 API 讀到的圖片存在證據
| 地圖卡 | 檔案／原圖尺寸（附件記錄） | 實際檢視狀態 |
|---|---|---|
| [Greenhouse](https://trello.com/c/aDmmC0W6) | image.png，約 **1900×885**，1 張 | **已由瀏覽器開圖觀察** |
| [Barracks](https://trello.com/c/QuorgJVk) | image.png，約 **1903×895**，1 張 | **已由瀏覽器開圖觀察** |
| [Manufacturing](https://trello.com/c/MyfGxh4y) | image.png，約 **1898×891**，1 張 | **已由瀏覽器開圖觀察** |
| [Assembly](https://trello.com/c/kZCtr1L1) | image.png，約 **1904×891**，1 張 | **僅確認附件元資料，未逐圖細看** |
| [Outpost](https://trello.com/c/9vBStDDa) | image.png，約 **1904×896**，1 張 | **僅確認附件元資料，未逐圖細看** |
| [Medical](https://trello.com/c/8DkLKTZj) | image.png，約 **1919×1079**，1 張 | **嘗試開圖失敗；Trello CDN 金鑰／Cookie 存取問題** |
| [Market](https://trello.com/c/B4Crzj3f) | image.png，約 **1919×1079**，1 張，屬社群地圖 | **僅確認附件元資料** |
| [Church](https://trello.com/c/WCiCGXrd) | image.png，約 **1844×1007**，1 張 | **僅確認附件元資料** |
| [Stockpile](https://trello.com/c/CCIavtoQ) | 「newmap」及 image.png（其中約 1753×874），共 **2 張** | **只確認雙版本附件，未逐圖細看** |
| [Basin](https://trello.com/c/Gk34wUTa) | image.png，約 **1919×1079**，1 張 | **僅確認附件元資料** |

**已確認「有附件」≠已確認圖片裡每個物件**。原始圖片有 Trello 附件授權與來源權屬，**GitHub 只保存卡片連結、尺寸、狀態與文字觀察，不盲目把所有官方圖片複製上公開儲存庫**。Trello 的 CDN 簽名 URL 可能失效，應連到原卡，不把短效簽名網址寫成永久圖片位址。

### (B) 已開啟的 3 張圖，僅記錄可見影像（2026-10-31）
**Greenhouse〔VISUAL-CONFIRMED，瀏覽器〕**：岩洞內光線昏暗、木板平台與梯子、橫向小通道、箱子和暖色燈具，側邊有深綠色棚布與少量可見植物；沒有在當次截圖中看見大規模整齊農田，也**看不到可確認的完整水處理廠、確切植物品種或產量**。官方文字另證實確是作物設施；圖中少量可見綠色不等於只有少量總產量。

**Barracks〔VISUAL-CONFIRMED，瀏覽器〕**：昏暗木結構、堆放物／桶和疑似礦車、不同入口、燈具，橫向通行空間較突出，少量可能有閣樓／上層；可見工具意象的旗號。**無法只由單張圖確定每條暗道、真正貨運吞吐量及所有床鋪數**。官方卡文字指出休息與快遞物流中心。

**Manufacturing〔VISUAL-CONFIRMED，瀏覽器〕**：木製梁柱／牆面、桌椅與工作台、暖色稀疏燈、左側樓梯和至少兩層空間、部分沙袋掩體與幟旗；可見昏暗門洞。官方卡描述兩側雙層工廠及兩條中央橋梁；**圖片視角未必同時把兩橋全部拍到，不能因看不全就否定文字，也不能自行補出所有走道尺寸**。

**Medical〔IMAGE-BLOCKED〕**：卡片與 1919×1079 圖片附件存在，可讀到行政樓改野戰醫院的文字；但瀏覽器開圖遭 CDN 存取限制，**不可宣稱已確認床位佈局、病房顏色、樓梯位置或照片內具體醫療儀器**。

## 六、對小說最有價值的「地圖之間不是單一戰役房間」
以 **Greenhouse、Barracks、Assembly、Manufacturing、Basin、Medical、Mortuary、Outpost** 作功能性節點，便能構思糧食／水／裝備／傷患／遺體／治安的長期因果鏈；**這只是作者層的功能網，尚無證據證明這八張地圖在實際地下空間中是物理相鄰或同屬單一城市**。真正的章節應先決定距離、貫通坑道、交通時間、運輸班次、誰負責接駁，不能只因同在投票池就說步行五分鐘可到達。

原則：**場景兼具工作、日常、軍事與政治作用；戰爭損害留下真正後果；不同人有自己的時間線。** 完整功能網創作方法見 [14](14_地下據點_交通網_生活與戰役設計.md)。

## 七、後續待補：圖像與地形研究工作表
- 重新逐圖核對其他 22 張主地圖的封面／附圖，記錄可見視角和是否屬舊版。
- 將可能有多張圖片的 Compound（例如 Stockpile）**分開標日期／檔名**，不要默認最新一張是唯一設計。
- 較新版的重做地圖如 Barracks／Outpost／Manufacturing，先以實際遊戲現行版本確認通道，單靠 2025 截圖不能推斷 2026 某個可挖牆面。
- 對 Basil／Cobble／Manor／Mortuary 等地圖作者提供的世界觀，查有沒有同頁互斥描述或後來開發者澄清；**在衝突消失前只列候選／不同角色的認知**。
- 官方開發者地圖與 Map - Community Compounds 的作者權屬不可混同，引用他人圖像／同人角色時須尊重來源與授權。
