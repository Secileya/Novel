#!/usr/bin/env node
/** 第四批來源交叉語義台帳：精確原文行號與 Git blob SHA 驗證。只讀取，不改寫任何來源。 */
import { readFileSync } from 'node:fs';
import {readEffectiveJson} from './來源後修_證據覆核.mjs';
import { createHash } from 'node:crypto';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');
const ledgerPath = resolve(here, '20261109_171待深審_第四批跨源語義衝突與審核門檻.json');
const ledger = readEffectiveJson('20261109_171待深審_第四批跨源語義衝突與審核門檻.json',here);
const errors = [];
const readCache = new Map();
const seenIds = new Set();
let checkedAnchors = 0;

function sourceAt(relativePath) {
  if (typeof relativePath !== 'string' || !relativePath) throw new Error('missing source_path');
  const absolute = resolve(projectRoot, relativePath);
  if (!absolute.startsWith(projectRoot + sep)) throw new Error('source_path leaves project root');
  if (!readCache.has(absolute)) {
    const bytes = readFileSync(absolute);
    const sha = createHash('sha1')
      .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
      .update(bytes)
      .digest('hex');
    readCache.set(absolute, { sha, lines: bytes.toString('utf8').split('\n') });
  }
  return readCache.get(absolute);
}

if (!Array.isArray(ledger.records)) errors.push('records is not an array');
for (const record of ledger.records ?? []) {
  if (!record.id || seenIds.has(record.id)) errors.push(`missing/duplicate record id ${record.id}`);
  seenIds.add(record.id);
  if (!record.status || !record.guardrail || !record.authority) errors.push(`${record.id}: incomplete editorial status`);
  if (!Array.isArray(record.evidence) || record.evidence.length < 1) {
    errors.push(`${record.id}: missing evidence`);
    continue;
  }
  for (const ev of record.evidence) {
    try {
      const file = sourceAt(ev.source_path);
      if (!Number.isInteger(ev.line) || ev.line < 1 || ev.line > file.lines.length) {
        throw new Error(`line ${ev.line} outside 1–${file.lines.length}`);
      }
      if (file.sha !== ev.git_blob_sha) {
        throw new Error(`Git blob SHA mismatch: expected ${ev.git_blob_sha}, actual ${file.sha}`);
      }
      if (typeof ev.quote !== 'string' || !ev.quote.trim() || !file.lines[ev.line - 1].includes(ev.quote)) {
        throw new Error(`quote mismatch at line ${ev.line}`);
      }
      checkedAnchors++;
    } catch (err) {
      errors.push(`${record.id}: ${ev.source_path}:${ev.line} — ${err.message}`);
    }
  }
}
if (seenIds.size !== ledger.claims_count) errors.push(`claims_count ${ledger.claims_count} != ${seenIds.size}`);
if (checkedAnchors !== ledger.evidence_count) errors.push(`evidence_count ${ledger.evidence_count} != ${checkedAnchors}`);
if (readCache.size !== ledger.source_count) errors.push(`source_count ${ledger.source_count} != ${readCache.size}`);
if (Array.isArray(ledger.files_consulted)) {
  for (const source of ledger.files_consulted) {
    try {
      const file = sourceAt(source.path);
      if (file.sha !== source.git_blob_sha) errors.push(`file manifest SHA mismatch: ${source.path}`);
    } catch (err) { errors.push(`file manifest: ${source.path} — ${err.message}`); }
  }
} else errors.push('files_consulted is not an array');

if (errors.length) {
  console.error(`第四批錨點驗證失敗（${errors.length} 項）：\n` + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`第四批驗證通過：${seenIds.size} 項限定範圍的語義紀錄、${checkedAnchors} 處原文錨點、${readCache.size} 份 Git SHA 來源。未宣稱全文語義完成或 Canon 定案。`);
}
