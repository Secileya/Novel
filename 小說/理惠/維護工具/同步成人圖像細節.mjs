// 只同步已人工記錄的文字；不開啟、解碼、比較或雜湊任何圖像。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const normalize = value => value.replace(/\r\n/g, '\n');
const changed = [];
function write(relative, value) {
  const target = path.join(root, relative);
  const previous = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  const eol = previous.includes('\r\n') ? '\r\n' : '\n';
  const next = normalize(value).replace(/\n/g, eol);
  if (previous !== next) {
    fs.writeFileSync(target, next, 'utf8');
    changed.push(relative);
  }
}

const journalPath = '來源與校對/成人圖像細節複核.json';
const journal = JSON.parse(read(journalPath));
const reviews = new Map(journal.reviews.map(review => [review.number, review]));
if (reviews.size !== 89 || journal.reviewed_count !== 89 ||
    !Array.from({ length: 89 }, (_, i) => i + 109).every(n => reviews.has(n))) {
  throw new Error('須先完整保存109–197的89份直接複核記錄；不能補造未讀圖的解讀。');
}
const catalogPath = '圖庫/圖片資料索引.json';
const catalog = JSON.parse(read(catalogPath));
if (catalog.length !== 197) throw new Error('既有圖庫應為197筆。');

// 修正與本次實際可見手位、物件或目光不符的簡述；不改原檔名或故事。
const correctedVisible = new Map([
  [142, '男性頭部位於女性腿間，口部接觸構圖；女性靠躺，一手抓住枕頭布料，有愛心。'],
  [165, '女性仰躺、張口，一手抓住枕頭布料，男性骨盆於前方；接觸部位被白色區域遮住。'],
  [168, '女性屈臂伏靠床面及枕頭，臉靠近枕邊，姿態更接近把枕頭攏在胸前；側面回頭張口、臉頰泛紅，肩背有汗滴。手掌部分受遮，不是清楚可見的雙掌撐床。'],
  [181, '兩人面對面，女性手臂向前，一手貼在男性背／身側，另一手受遮；男性手支撐其腰側，接觸附近有淺色液體。'],
  [191, '淋浴間女性側身回頭，一手屈曲靠近淋浴設備，另一手抬起而手指彎曲；男性手在腰／臀側，接觸區有遮罩。'],
  [194, '兩人近距離相貼側躺，女性靠在男性上側，半睜眼而帶收斂微笑；男性閉眼、嘴略張開，兩人有汗滴。'],
  [196, '床上兩人近距離靠近，女性半睜眼、微笑，男性閉眼靠枕頭；嘴未完全貼合，暖光。'],
]);

function detailSection(review) {
  return [
    '## 可見反應與姿態細節（2026-10-12複核）', '',
    `- 可見反應：${review.visible_reaction}`,
    `- 姿態與物件：${review.pose_and_object_detail}`,
    `- 條件式解讀：${review.contextual_reading}`,
    `- 補充限制：${review.additional_limits}`,
    '- 來源：本輪依使用者另行授權直接查看此編號本機圖像；不驗證歷史尺寸、大小或雜湊。',
    '- [本輪複核記錄](../../來源與校對/成人圖像細節複核.json) · [反應與姿態索引](../成人圖像反應與姿態索引.md)', '',
  ].join('\n');
}

let index = normalize(read('圖庫/圖片索引.md'));
let gallery = normalize(read('圖庫/全部圖片預覽.md'));
const tsvPath = '圖庫/逐張圖片解讀資料.tsv';
const tsv = normalize(read(tsvPath)).trimEnd().split('\n').map(line => line.split('\t'));
if (tsv.length !== 198 || tsv[0].join('\t') !== 'number\tvisible\tinterpretation\tlimits\ttags\tfilename_assessment') {
  throw new Error('逐張解讀編輯來源的欄位或筆數不符。');
}
for (const entry of catalog) {
  const review = reviews.get(entry.number);
  if (!review) continue;
  if (entry.asset_id !== review.asset_id) throw new Error(`ID不符：${entry.number}`);
  const oldVisible = entry.visible_record;
  const visible = correctedVisible.get(entry.number) ?? oldVisible;
  entry.visible_record = visible;
  entry.detailed_review = { ...review, provenance_id: 'IMG-DETAIL-20261012' };
  const row = tsv.find(item => Number(item[0]) === entry.number);
  if (!row) throw new Error(`TSV缺號：${entry.number}`);
  row[1] = visible;
  if (entry.interpretation_and_use !== row[2] || entry.limitations !== row[3]) {
    throw new Error(`既有索引與編輯來源不同，先處理重疊改動：${entry.number}`);
  }
  let analysis = normalize(read(entry.analysis_path));
  if (oldVisible !== visible) analysis = analysis.replace(oldVisible, visible);
  analysis = analysis.replace(/## 可見反應與姿態細節（2026-10-12複核）\n[\s\S]*?(?=## 可用解讀／選圖用途)/, '');
  if (!analysis.includes('## 可用解讀／選圖用途')) throw new Error(`解讀頁缺章節：${entry.asset_id}`);
  analysis = analysis.replace('## 可用解讀／選圖用途', detailSection(review) + '## 可用解讀／選圖用途');
  write(entry.analysis_path, analysis);
  if (oldVisible !== visible) {
    const indexRows = index.split('\n');
    const padded = String(entry.number).padStart(3, '0');
    const lineIndex = indexRows.findIndex(line => line.startsWith(`| ${padded} |`));
    if (lineIndex < 0 || !indexRows[lineIndex].includes(oldVisible)) throw new Error(`索引簡述不符：${entry.asset_id}`);
    indexRows[lineIndex] = indexRows[lineIndex].replace(oldVisible, visible);
    index = indexRows.join('\n');
    const marker = `<summary>${padded} ·`;
    const start = gallery.indexOf(marker);
    const end = gallery.indexOf('</details>', start);
    if (start < 0 || end < 0) throw new Error(`預覽文字區塊缺號：${entry.asset_id}`);
    const fragment = gallery.slice(start, end);
    if (!fragment.includes(oldVisible)) throw new Error(`預覽文字簡述不符：${entry.asset_id}`);
    gallery = gallery.slice(0, start) + fragment.replace(oldVisible, visible) + gallery.slice(end);
  }
}
const detailLink = '[成人反應與姿態細節](成人圖像反應與姿態索引.md)';
if (!index.includes(detailLink)) index = index.replace('[使用規則](閱讀指南.md)', detailLink + ' · [使用規則](閱讀指南.md)');
if (!gallery.includes(detailLink)) gallery = gallery.replace('[索引](圖片索引.md)', detailLink + ' · [索引](圖片索引.md)');

const guide = [
  '# 成人圖像反應與姿態索引', '',
  '2026-10-12，依使用者另行授權，逐張直接查看109–197，共89張。既有索引中沒有109以前的ADULT_*項目；此輪未重新看001–108。', '',
  '本頁補可見反應與手臂／物件關係，完整條件式解讀與限制在每張解讀頁。圖片仍是素材，不是事件順序或角色內心；未遮擋或有液體，也不能直接證明雙方同步高潮。', '',
  '作者另指定：後續創作中明確寫到「射精」的段落，設定為雙方同時高潮。這是往後創作約定，不是本頁的視覺結論；不倒改既有正文或事件。詳見[寫作規則](../人物設定/寫作規則.md)。', '',
  '168已修正為屈臂伏靠、攏抱枕頭，不再簡化成双掌撐床；142、165的抓握物件為枕頭布料。一般配圖仍按[圖像輸出規則](圖像輸出規則.md)只讀既有解讀，不重開圖片。', '',
  '| 編號 | 可見反應 | 姿態與物件 | 完整解讀 |',
  '|---|---|---|---|',
];
for (const entry of catalog) {
  const review = reviews.get(entry.number);
  if (!review) continue;
  const link = '逐張解讀/' + encodeURIComponent(path.basename(entry.analysis_path));
  guide.push(`| ${String(entry.number).padStart(3, '0')} | ${review.visible_reaction} | ${review.pose_and_object_detail} | [${entry.asset_id}](${link}) |`);
}
guide.push('', '[全部圖像索引](圖片索引.md) · [本輪89份複核記錄](../來源與校對/成人圖像細節複核.json)', '');
write('圖庫/成人圖像反應與姿態索引.md', guide.join('\n').replace('双掌', '雙掌'));
write(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
write(tsvPath, tsv.map(row => row.join('\t')).join('\n') + '\n');
write('圖庫/圖片索引.md', index);
write('圖庫/全部圖片預覽.md', gallery);
journal.status = 'COMPLETE';
journal.provenance_id = 'IMG-DETAIL-20261012';
journal.metadata_verification = 'NOT_REHASHED_OR_REDECODED_HISTORICAL_IMAGE_METADATA_PRESERVED';
write(journalPath, JSON.stringify(journal, null, 2) + '\n');
console.log(JSON.stringify({ reviewed: reviews.size, catalog: catalog.length, changed_text_files: changed.length, image_binary_reads: 0, changed }, null, 2));
