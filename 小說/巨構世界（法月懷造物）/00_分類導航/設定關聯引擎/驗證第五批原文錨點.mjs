#!/usr/bin/env node
/**
 * 第五批語義台帳：每筆原始出處須有 Git blob SHA、準確行號和實際原文片語。
 * 僅檢查可追溯性與資料完整性，不把版本候選自動升成正式 Canon。
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');
const ledger = JSON.parse(readFileSync(resolve(here,
  '20261109_171待深審_第五批首篇版本與敘事權威仲裁.json'), 'utf8'));
const errors = [], checked = new Set(), cache = new Map();
let checkedAnchors = 0;
function readSource(relative) {
  if (typeof relative !== 'string' || !relative.trim()) throw Error('invalid source_path');
  const absolute = resolve(projectRoot, relative);
  if (!absolute.startsWith(projectRoot + sep)) throw Error('unsafe path outside project');
  if (!cache.has(relative)) {
    const bytes = readFileSync(absolute);
    const gitSha = createHash('sha1')
      .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
      .update(bytes).digest('hex');
    cache.set(relative, { sha:gitSha, lines:bytes.toString('utf8').split(/\r?\n/) });
  }
  return cache.get(relative);
}
if (!Array.isArray(ledger.records)) errors.push('records must be an array');
for (const record of ledger.records || []) {
  if (!record.id || checked.has(record.id)) errors.push(`duplicate or missing ID ${record.id}`);
  checked.add(record.id);
  if (!record.status || !record.authority || !record.guardrail || !record.next_action)
    errors.push(`${record.id}: incomplete status/authority/guardrail/action`);
  if (!Array.isArray(record.evidence) || !record.evidence.length) errors.push(`${record.id}: no anchors`);
  for (const ev of record.evidence || []) {
    try {
      const original = readSource(ev.source_path);
      if (!Number.isInteger(ev.line) || ev.line < 1 || ev.line > original.lines.length)
        throw Error(`invalid line ${ev.line}`);
      if (original.sha !== ev.git_blob_sha)
        throw Error(`blob SHA mismatch: expected ${ev.git_blob_sha}, current ${original.sha}`);
      if (typeof ev.quote !== 'string' || !ev.quote.trim() ||
          !original.lines[ev.line-1].includes(ev.quote))
        throw Error(`line ${ev.line} does not contain the quoted original`);
      checkedAnchors++;
    } catch (e) { errors.push(`${record.id} ${ev.source_path}:${ev.line} — ${e.message}`); }
  }
}
for (const f of ledger.source_file_manifest || []) {
  try {
    if (readSource(f.path).sha !== f.git_blob_sha) errors.push(`manifest mismatch ${f.path}`);
  } catch (e) { errors.push(`manifest ${f.path}: ${e.message}`); }
}
if (checked.size !== ledger.record_count) errors.push(`record_count ${ledger.record_count} != ${checked.size}`);
if (checkedAnchors !== ledger.original_anchors_count)
  errors.push(`original_anchors_count ${ledger.original_anchors_count} != ${checkedAnchors}`);
if (cache.size !== ledger.source_files_targeted)
  errors.push(`source_files_targeted ${ledger.source_files_targeted} != ${cache.size}`);
if (!Array.isArray(ledger.source_file_manifest) || ledger.source_file_manifest.length !== cache.size)
  errors.push('manifest length mismatch');
if (errors.length) {
  console.error('第五批引用驗證失敗：\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`第五批錨點驗證成功：${checked.size} 項、${checkedAnchors} 處、${cache.size} 份來源；未宣稱全文審核完成或任何候選正式採案。`);
}
