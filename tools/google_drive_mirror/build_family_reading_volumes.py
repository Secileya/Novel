#!/usr/bin/env python3
"""Generate lossless, bounded Gemini reading volumes from the authoritative family master.

The family master and the original historical 01A–01E are never edited.
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / '小說/家庭總檔/01_家庭完整角色設定總檔.md'
OUTPUT = ROOT / '小說/家庭總檔/05_Gemini_最新版閱讀分卷'
MAX_SLICE_BYTES = 72_000
MAX_FILE_BYTES = 80_000
TARGET_BYTES = 56_000
MIN_PREFERRED_BYTES = 36_000
MARKER = '<!-- GEMINI_LATEST_FAMILY_EXACT_SOURCE_START -->\n'
CHAPTER = re.compile(r'^##\s+([一二三四五六七八九十百零〇]+)[、.．]\s*(.*?)\s*$')


def git_blob_sha(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def split_very_long_lines(text):
    """Split huge individual lines on Unicode scalar boundaries without losing bytes."""
    parts = []
    for line in text.splitlines(keepends=True):
        if len(line.encode('utf-8')) <= MAX_SLICE_BYTES:
            parts.append(line)
            continue
        current = []
        size = 0
        for ch in line:
            amount = len(ch.encode('utf-8'))
            if current and size + amount > MAX_SLICE_BYTES:
                parts.append(''.join(current))
                current, size = [], 0
            current.append(ch)
            size += amount
        if current:
            parts.append(''.join(current))
    return parts


def cut_source(text):
    """Prefer chapter, heading, then paragraph boundaries; preserve original text."""
    lines = split_very_long_lines(text)
    assert ''.join(lines) == text, 'Line splitting damaged source'
    sizes = [len(line.encode('utf-8')) for line in lines]
    cuts = []
    start = 0
    while start < len(lines):
        if sum(sizes[start:]) <= MAX_SLICE_BYTES:
            cuts.append(''.join(lines[start:]))
            break
        size = 0
        choices = []
        for end in range(start + 1, len(lines) + 1):
            size += sizes[end - 1]
            if size > MAX_SLICE_BYTES:
                break
            if size < MIN_PREFERRED_BYTES:
                continue
            next_line = lines[end] if end < len(lines) else ''
            if CHAPTER.match(next_line):
                rank = 0
            elif re.match(r'^#{2,6}\s+', next_line):
                rank = 1
            elif lines[end - 1].strip() == '' or next_line.strip() == '':
                rank = 2
            else:
                rank = 3
            choices.append((rank, abs(size - TARGET_BYTES), end))
        if not choices:
            raise ValueError('Unable to split source within limit')
        _, _, end = min(choices)
        cuts.append(''.join(lines[start:end]))
        start = end
    if ''.join(cuts) != text:
        raise AssertionError('Slices do not reconstruct the original')
    if any(len(part.encode('utf-8')) > MAX_SLICE_BYTES for part in cuts):
        raise AssertionError('Slice exceeds byte limit')
    return cuts


def chapter_positions(text):
    found = []
    offset = 0
    for line in text.splitlines(keepends=True):
        match = CHAPTER.match(line.rstrip('\r\n'))
        if match:
            found.append((offset, match.group(1) + '、' + match.group(2)))
        offset += len(line.encode('utf-8'))
    return found


def chapter_at(headings, byte_offset):
    label = '前言／索引'
    for position, chapter in headings:
        if position > byte_offset:
            break
        label = chapter
    return label


def render(source_bytes):
    original = source_bytes.decode('utf-8')
    pieces = cut_source(original)
    whole_sha = git_blob_sha(source_bytes)
    headings = chapter_positions(original)
    count = len(pieces)
    outputs = {}
    rows = []
    offset = 0
    for number, piece in enumerate(pieces, 1):
        chunk_bytes = piece.encode('utf-8')
        end = offset + len(chunk_bytes)
        start_chapter = chapter_at(headings, offset)
        end_chapter = chapter_at(headings, max(0, end - 1))
        coverage = start_chapter if start_chapter == end_chapter else start_chapter + ' → ' + end_chapter
        filename = '01_最新版閱讀分卷_{:03d}.md'.format(number)
        header = (
            '# 家庭《01》最新版閱讀分卷 {:03d} / {:03d}\n\n'.format(number, count)
            + '> **自動生成的原文切片／非另一份 Canon。** 本冊內容由當前家庭《01》主總檔逐字切出，並不重寫、摘要或調整任何角色規則。\n'
            + '> **正式權威：** 家庭總檔/01_家庭完整角色設定總檔.md。若有新的修訂，請先核對本冊 SHA 是否對應最新主檔。\n'
            + '> **舊的 01A～01E 五冊是歷史快照，禁止誤當最新版。**\n'
            + '> **原檔 Git blob SHA：** ' + whole_sha + '\n'
            + '> **原文 UTF-8 位元組區間：** [' + str(offset) + ', ' + str(end) + ') / ' + str(len(source_bytes)) + '\n'
            + '> **涵蓋章節：** ' + coverage + '\n'
            + '> **閱讀順序：** 按 001 → {:03d} 依序閱讀；本冊首尾可能接續上一／下一冊。\n\n'.format(count)
            + '---\n\n'
            + MARKER
        )
        rendered = header + piece
        if len(rendered.encode('utf-8')) > MAX_FILE_BYTES:
            raise ValueError('Reading volume exceeds limit: ' + filename)
        outputs[filename] = rendered
        rows.append('| [{:03d}](./{}) | {} | {:,} | {:,}–{:,} | {} |'.format(
            number, filename, coverage.replace('|', r'\|'), len(chunk_bytes), offset, end,
            hashlib.sha256(chunk_bytes).hexdigest()[:16]))
        offset = end
    if offset != len(source_bytes):
        raise AssertionError('Slices do not cover the source')
    navigation = (
        '# 家庭《01》最新版閱讀分卷｜Gemini 閱讀導航\n\n'
        + '> **本目錄自動由正式主總檔生成，不是新設定，也不是舊五冊的更新。** 這些分卷只是方便分批讀取的逐字複本。\n\n'
        + '**正式主檔（Stingray Drive 鏡像）**：https://drive.google.com/file/d/1xUF7VBAAWbI3VIGHg1IFWbXvcfIGLMFP/view\n\n'
        + '**Gemini 鏡像資料夾**：https://drive.google.com/drive/folders/11ui-zviN5uhgY6iGm6Og5bPUOsBWIUEM\n\n'
        + '- 正式來源：小說/家庭總檔/01_家庭完整角色設定總檔.md\n'
        + '- **原始 Git blob SHA：** ' + whole_sha + '\n'
        + '- 原文 UTF-8 位元組數：**{:,}**\n'.format(len(source_bytes))
        + '- 原文字元數：**{:,}**\n'.format(len(original))
        + '- 閱讀分卷數：**{}**；各冊原文最多 {:,} Bytes，每份完整分卷最多 {:,} Bytes。\n'.format(count, MAX_SLICE_BYTES, MAX_FILE_BYTES)
        + '- 完整性：依順序取出每冊原文起點標記後的全部文字，逐字串接即為主總檔原文（包含原空白與換行）。不同 SHA 不可混讀。\n'
        + '- 舊的 04_Gemini_01總檔五冊_2026-11-07/ 僅供**歷史比對**，不會隨新版本更新。\n'
        + '- 03_互動文案/ 與 家人生活/ **另外獨立鏡像**，不會重複加入本次《01》分卷；主檔本來就有的部分仍原樣保留。\n'
        + '- 若 Drive 同步狀態非 CURRENT 或各冊原檔 SHA 不一致，請回報 MIRROR_PENDING，不得拿舊五冊冒充最新版。\n\n'
        + '| 分卷 | 原文章節位置 | 原文 Bytes | 位元組區間（左含右不含） | SHA-256 前16碼 |\n'
        + '|---|---|---:|---:|---|\n'
        + '\n'.join(rows) + '\n\n'
        + '## Gemini 的正確讀法\n\n'
        + '先看導航、核對整份來源的 Git blob SHA，再按分卷順序實際打開內容；需要指定章節時可以查表跳讀。沒有讀到的分卷不能宣稱已讀。各冊原文起點標記之前的資訊只是版本導航，並非角色設定。閱讀分卷不是第二套正典。\n'
    )
    outputs['00_最新版閱讀導航.md'] = navigation
    return outputs, pieces


def publish():
    if not SOURCE.is_file():
        raise FileNotFoundError('Missing authoritative family master: ' + str(SOURCE))
    data = SOURCE.read_bytes()
    outputs, pieces = render(data)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for stale in OUTPUT.glob('01_最新版閱讀分卷_*.md'):
        if stale.name not in outputs:
            stale.unlink()
    for name, content in outputs.items():
        target = OUTPUT / name
        encoded = content.encode('utf-8')
        if not target.is_file() or target.read_bytes() != encoded:
            target.write_bytes(encoded)
    if b''.join(piece.encode('utf-8') for piece in pieces) != data:
        raise AssertionError('Read volumes do not reconstruct exact source bytes')
    print('FAMILY_READING_VOLUMES_READY', len(pieces), git_blob_sha(data), len(data))


if __name__ == '__main__':
    publish()
