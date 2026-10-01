# 第六十四章 PREWRITE｜魚人守護者低偏移RETRO覆蓋 v1.0

> 日期：2026-10-01  
> 狀態：`RETRO_OVERRIDE / FINAL`  
> 被覆蓋檔：`223_第六十四章PREWRITE執行確認_v1.0.md`  
> 覆蓋範圍：原223中所有「玩家群體擊殺魚人守護者→圖紙進公開交易→折光購買」相關規劃與判定。

## 一、覆蓋原因

原223錯誤地將：

1. 沈雲因大夢初曉／前世私人關係測試而到翡翠湖；
2. 主角親自擊殺【魚人守護者】並於CH126從屍體採集【魚人寶庫圖紙】；

綁成同一條不可拆因果。

第一手SOURCE與後續CANON MASTER重建已確認：魚人守護者本來就是翡翠湖獨立客觀BOSS，不因沈雲私人關係才生成；私人原因可以VOID，但BOSS存在、擊殺、屍體採集節點不能因此一併消失。

固定：

`PRIVATE_CAUSE_VOID != OBJECTIVE_EVENT_VOID`

`VOID_WITH_CAUSE_MUST_NOT_DELETE_ADJACENT_OBJECTIVE_EVENTS = TRUE`

## 二、CH125～126修正施工方案

### CH125
- E01 殺大夢初曉反情報：仍`VOID_WITH_CAUSE`。
- E02 天痕AI動作分析能力：`WORLD_BACKGROUND_LOCKED`。
- E03 魚人守護者：改回`PRESERVE_BY_DEFAULT / ACTOR_AND_MOTIVE_RECALC`。
  - Franiya因自己早已持有【魚人寶庫鑰匙】＋公開出現【魚人守護者】這一獨立魚人線索，自主前往翡翠湖。
  - 不以救大夢初曉或破解私人關係測試為動機。
  - 以【折光】身份親自接手並完成BOSS單人擊殺。
  - 面板保留：Lv10、白銀、HP11000、火抗41%、雷抗12%、水抗52%；技能【集中猛擊／水流術／橫掃】。
- E04 沈雲身體／記憶異常：仍`VOID_WITH_CAUSE`。

### CH126
- 私人強制下線／再登入：仍VOID。
- 不因該時間斷點作廢而刪掉BOSS屍體採集節點。
- 魚人守護者已確認兄弟結果必須逐項落地：
  - 【青銅布袍×1】：防禦+4、精神+8。
  - 【未鑑定白銀法杖×1】。
  - 對BOSS屍體執行採集，取得【魚人寶庫圖紙×1】。
- SOURCE只以「等」概括其他未列名掉落，不自行補造。
- 圖紙與早期【魚人寶庫鑰匙】閉環。
- 折光由圖紙得知約500米水下位置與75顆【疾風狼優質晶核】供能需求。
- 因當下未證明已有75顆，正常返回智慧之城材料市場購足，再回翡翠湖使用【避水珠】下潛開門。

## 三、明確撤回

以下全部撤回，不得被後續施工或稽核引用為現行正典：

- `PLAYER_GROUP_KILLS_FISHMAN_GUARDIAN`
- `FISHMAN_TREASURY_MAP_ENTERS_PUBLIC_TRADE`
- `ZHEGUANG_ANONYMOUSLY_BUYS_FISHMAN_TREASURY_MAP`
- 「圖紙交易精確價格」相關施工責任
- 「公開玩家知道圖紙曾掛交易行」的知識流

## 四、其餘223內容

除上述魚人守護者／圖紙取得鏈與其直接下游外，原223其餘不衝突內容繼續有效，包括：

- 第64章目標13000～18000中文字；
- 完整消耗CH125～129共5章；
- 75晶核開門、【避水珠】、哈姆空間門、1200+玩家、前區低收益；
- 折光用固有作用感知取代不能跨身份使用的【雷電磁場】；
- 折光本已ACTIVE，不重演第二身份切換；
- 兩隻後續白銀BOSS、巨大寶箱、30名盜賊、3死風刃、魚人王子釋放；
- 原著沈雲【海潮】堵出口群殺依私人戰術原因VOID。

## 五、最終權威

第64章施工相關權威順序：

1. 正文064最新RETRO版本；
2. SOURCE48（若尚未升格則作重建候選證據）＋SOURCE45／SOURCE47現行結果；
3. 本223A覆蓋原223衝突部分；
4. POSTWRITE224最新RETRO；
5. Closure225最新RETRO。

`CH64_PREWRITE_GUARDIAN_ROUTE_STALE_COUNT = 0_AFTER_THIS_OVERRIDE`
