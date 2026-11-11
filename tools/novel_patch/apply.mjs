#!/usr/bin/env node
/** Exact-match, non-destructive candidate chapter patcher. No dependencies. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { TextDecoder } from 'node:util';

function fail(message) { throw new Error(message); }
const usage = 'Usage: node tools/novel_patch/apply.mjs <patch.json> --check|--apply [--root <project-folder>]';
function options(argv) {
  if (argv.length < 2) fail(usage);
  const [specFile, mode, ...rest] = argv;
  if (!['--check', '--apply'].includes(mode)) fail(usage);
  let root = process.cwd();
  if (rest.length) {
    if (rest.length !== 2 || rest[0] !== '--root') fail(usage);
    root = rest[1];
  }
  return { specFile, mode, root: path.resolve(root) };
}
function inside(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || relative.includes('\\')) fail('Paths must be nonempty forward-slash relative paths');
  const full = path.resolve(root, relative);
  const rel = path.relative(root, full);
  if (!rel || rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel)) fail('Unsafe path outside project root: ' + relative);
  return full;
}
function sha1GitBlob(buf) {
  return crypto.createHash('sha1').update(Buffer.from('blob ' + buf.byteLength + '\0', 'utf8')).update(buf).digest('hex');
}
function readUtf8(file) { return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(fs.readFileSync(file)); }
function count(haystack, needle) { let n = 0, at = 0; while ((at = haystack.indexOf(needle, at)) !== -1) { n++; at += needle.length; } return n; }
function verify(spec, root) {
  if (spec.schemaVersion !== 1 || !Array.isArray(spec.edits) || !spec.edits.length) fail('Expected schemaVersion 1 and nonempty edits array');
  if (!/^[0-9a-f]{40}$/i.test(spec.baseBlobSha || '')) fail('baseBlobSha must be the exact 40-digit Git blob SHA');
  if (!spec.base?.endsWith('.md') || !spec.output?.endsWith('.md') || spec.base === spec.output) fail('Base and output must be distinct markdown paths');
  if (!/(候選|非正史)/.test(spec.output)) fail('Output must be explicitly named as a candidate/non-Canon file');
  const baseFile = inside(root, spec.base), outFile = inside(root, spec.output);
  if (fs.existsSync(outFile)) fail('Refusing to overwrite an existing candidate: ' + spec.output);
  const raw = fs.readFileSync(baseFile);
  const hash = sha1GitBlob(raw);
  if (hash !== spec.baseBlobSha.toLowerCase()) fail('Source changed: expected ' + spec.baseBlobSha + ', got ' + hash + '; rebase the patch, do not guess');
  const original = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(raw);
  const intervals = [], ids = new Set();
  for (const [i, edit] of spec.edits.entries()) {
    if (!edit || typeof edit.id !== 'string' || !edit.id || ids.has(edit.id)) fail('Each edit must have a unique nonempty id (' + i + ')');
    ids.add(edit.id);
    if (typeof edit.old !== 'string' || edit.old.length < 8 || typeof edit.new !== 'string' || edit.old === edit.new) fail('Edit must have old (8+ chars) and a different new string: ' + edit.id);
    const hits = count(original, edit.old);
    if (hits !== 1) fail('Edit ' + edit.id + ': old text occurs ' + hits + ' times; exact unique match required');
    const from = original.indexOf(edit.old);
    intervals.push({ id: edit.id, from, to: from + edit.old.length, replacement: edit.new });
  }
  intervals.sort((a,b) => a.from - b.from);
  for (let i = 1; i < intervals.length; i++) if (intervals[i].from < intervals[i-1].to) fail('Overlapping edits: ' + intervals[i-1].id + ', ' + intervals[i].id);
  let result = original;
  for (const e of [...intervals].reverse()) result = result.slice(0,e.from) + e.replacement + result.slice(e.to);
  if (spec.protectedTexts !== undefined && (!Array.isArray(spec.protectedTexts) || spec.protectedTexts.some(x => typeof x !== 'string' || !x))) fail('protectedTexts must be an array of nonempty strings');
  for (const phrase of spec.protectedTexts || []) {
    if (!original.includes(phrase)) fail('Protected phrase missing from source: ' + phrase.slice(0,50));
    if (!result.includes(phrase)) fail('Protected phrase changed/removed: ' + phrase.slice(0,50));
  }
  const outputBuf = Buffer.from(result, 'utf8');
  return { outFile, outputBuf, info: { source: spec.base, baseBlobSha: hash, output: spec.output, outputBlobSha: sha1GitBlob(outputBuf), edits: intervals.map(x=>x.id), editCount: intervals.length, sourceBytes: raw.byteLength, outputBytes: outputBuf.byteLength, protectedTextCount: (spec.protectedTexts||[]).length } };
}
try {
  const args = options(process.argv.slice(2));
  const spec = JSON.parse(readUtf8(path.resolve(args.specFile)));
  const outcome = verify(spec, args.root);
  if (args.mode === '--apply') {
    fs.mkdirSync(path.dirname(outcome.outFile), { recursive: true });
    fs.writeFileSync(outcome.outFile, outcome.outputBuf, { flag: 'wx' });
    if (!fs.readFileSync(outcome.outFile).equals(outcome.outputBuf)) fail('Post-write readback mismatch');
  }
  process.stdout.write(JSON.stringify({ status: args.mode === '--check' ? 'VALIDATED_ONLY' : 'APPLIED_READBACK_OK', ...outcome.info }, null, 2) + '\n');
} catch (e) {
  process.stderr.write('PATCH_REJECTED: ' + e.message + '\n');
  process.exitCode = 1;
}
