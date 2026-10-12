// 僅檢查文字與引用存在性；不讀圖片二進位、不比較圖片版本或大小。
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8' }).trim();
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const catalog = JSON.parse(read('圖庫/圖片資料索引.json'));
const journal = JSON.parse(read('來源與校對/成人圖像細節複核.json'));
assert.equal(catalog.length, 197);
assert.equal(new Set(catalog.map(e => e.asset_id)).size, 197);
assert.deepEqual(catalog.map(e => e.number), Array.from({ length: 197 }, (_, i) => i + 1));
assert.equal(journal.status, 'COMPLETE');
assert.equal(journal.reviewed_count, 89);
assert.equal(journal.total_count, 89);
assert.deepEqual(journal.reviews.map(r => r.number), Array.from({ length: 89 }, (_, i) => i + 109));
assert.equal(journal.additional_adult_below109.length, 0);
assert.equal(catalog.filter(e => e.number < 109 && e.content_rating.startsWith('ADULT_')).length, 0);
const tsv = read('圖庫/逐張圖片解讀資料.tsv').trimEnd().split(/\r?\n/).slice(1).map(l => l.split('\t'));
assert.equal(tsv.length, 197);
const index = read('圖庫/圖片索引.md');
const gallery = read('圖庫/全部圖片預覽.md');
const detailIndex = read('圖庫/成人圖像反應與姿態索引.md');
assert.equal((index.match(/^\| \d{3} \|/gm) ?? []).length, 197);
assert.equal((gallery.match(/<summary>\d{3} ·/g) ?? []).length, 197);
assert.equal((detailIndex.match(/^\| \d{3} \|/gm) ?? []).length, 89);
for (const entry of catalog) {
  const row = tsv.find(r => Number(r[0]) === entry.number);
  assert.equal(entry.visible_record, row[1], `visible ${entry.number}`);
  assert.equal(entry.interpretation_and_use, row[2], `interpretation ${entry.number}`);
  assert.equal(entry.limitations, row[3], `limits ${entry.number}`);
  assert.equal(entry.canon_status, 'REFERENCE_ONLY_NOT_STORY_EVENT');
  assert.deepEqual(entry.story_event_ids, []);
  assert.ok(fs.existsSync(path.join(root, entry.relative_path)), `圖片路徑不存在：${entry.asset_id}`);
  const analysis = read(entry.analysis_path);
  assert.ok(analysis.includes(entry.visible_record), `簡述未同步：${entry.asset_id}`);
  assert.ok(index.split(/\r?\n/).find(l => l.startsWith(`| ${String(entry.number).padStart(3, '0')} |`)).includes(entry.visible_record));
  if (entry.number < 109) continue;
  const review = journal.reviews.find(r => r.number === entry.number);
  assert.equal(review.review_method, 'DIRECT_LOCAL_IMAGE_REVIEW');
  assert.equal(review.asset_id, entry.asset_id);
  assert.equal(entry.detailed_review.provenance_id, 'IMG-DETAIL-20261012');
  for (const [key, value] of Object.entries(review)) {
    assert.equal(entry.detailed_review[key], value, `${entry.asset_id} ${key}`);
  }
  for (const key of ['visible_reaction', 'pose_and_object_detail', 'contextual_reading', 'additional_limits']) {
    assert.ok(review[key].length > 0);
    assert.ok(analysis.includes(review[key]), `細節未同步：${entry.asset_id} ${key}`);
  }
  assert.equal((analysis.match(/## 可見反應與姿態細節（2026-10-12複核）/g) ?? []).length, 1);
  assert.ok(detailIndex.includes(review.visible_reaction));
  assert.ok(detailIndex.includes(review.pose_and_object_detail));
  // 只查Markdown相對引用的存在性，不開啟其目標圖片。
  const renderedText = analysis.replace(/```[\s\S]*?```/g, '');
  for (const match of renderedText.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^[a-z]+:/i.test(target)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(path.join(root, entry.analysis_path)), decodeURIComponent(target.split('#')[0]))), `引用失效：${entry.asset_id} ${target}`);
  }
}
assert.ok(catalog[167].visible_record.includes('枕頭'));
assert.ok(!catalog[167].visible_record.includes('女性前臂支撐，從後方接觸構圖'));
assert.ok(catalog[151].limitations.includes('不能'));
assert.ok(catalog[151].interpretation_and_use.includes('可能是毛髮'));
for (const name of ['人物設定/寫作規則.md', '人物設定/零上下文人物還原提示詞.md']) {
  const text = read(name);
  assert.ok(text.includes('雙方同時高潮'));
  assert.ok(text.includes('不自動改') || text.includes('不自動回補'));
}

// 預設比較當前提交中的文字索引，確認舊圖像中繼資料完全沿用。
const reference = process.env.RIE_REFERENCE_COMMIT || 'HEAD';
const previous = JSON.parse(execFileSync('git', ['show', `${reference}:小說/理惠/圖庫/圖片資料索引.json`], { cwd: repo, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 }));
for (const entry of catalog) {
  const old = previous.find(e => e.number === entry.number);
  for (const key of ['asset_id', 'original_filename', 'stored_filename', 'relative_path', 'analysis_path', 'sha256', 'bytes', 'width', 'height', 'content_rating', 'canon_status', 'story_event_ids']) {
    assert.deepEqual(entry[key], old[key], `歷史中繼資料被改：${entry.asset_id} ${key}`);
  }
  if (entry.number < 109) assert.deepEqual(entry, old, `未授權範圍被改：${entry.asset_id}`);
}
console.log(JSON.stringify({ ok: true, catalog: 197, detailed_reviews: 89, analysis_sections: 89, index_rows: 197, detail_index_rows: 89, image_binary_reads: 0, historical_metadata_preserved: true, canon_status_unchanged: true }));
