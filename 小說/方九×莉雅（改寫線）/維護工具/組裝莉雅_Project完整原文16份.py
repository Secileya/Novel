#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build updated 16-source unabridged Liya Project instructions: original source bytes are never modified.

Run at the root of a local checkout:
python3 "小說/方九×莉雅（改寫線）/維護工具/組裝莉雅_Project完整原文16份.py"

The generated .md is uncommitted until the owner chooses to publish it.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path


HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parents[2]
MANIFEST = HERE / "莉雅_Project指示_16份原文來源清單_20261027.json"


def blob_hash(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()


def assemble():
    meta = json.loads(MANIFEST.read_text(encoding="utf-8"))
    sources = meta["sources"]
    if len(sources) != meta["source_count"] or len(sources) != 16:
        raise ValueError("Manifest source count mismatch")
    parts = []
    sizes = []
    header = (
        "# 莉雅 Project instructions｜完整來源逐字合輯（原檔不刪不改）\n\n"
        "> 本檔由鎖定的 Git Blob SHA 組裝：每份來源在其標籤內原封不動。"
        "本16份版本包含原始14份及2026-10-27兩份後修。此檔本身不是額外建立的生活事件，原文內舊版敘述若與後出的明確使用者修正衝突，"
        "依原來源的後修規則處理。ChatGPT 原生 Project instructions 仍須由使用者貼入；"
        "背景自動化 prompt 獨立存在。\n\n"
        "> 注意：原始 GitHub 倉庫為 public；將全文提交即可能讓所有人查看。\n\n"
    ).encode("utf-8")
    parts.append(header)
    for index, item in enumerate(sources, 1):
        if item["order"] != index:
            raise ValueError("Source order mismatch")
        source_path = REPO_ROOT / item["path"]
        resolved = source_path.resolve()
        if not resolved.is_relative_to(REPO_ROOT):
            raise ValueError("Unsafe source path")
        data = resolved.read_bytes()
        actual = blob_hash(data)
        if actual != item["sha1_git_blob"]:
            raise ValueError(
                f"Source changed; refuse silent alterations: {item['path']} "
                f"expected={item['sha1_git_blob']} actual={actual}"
            )
        if len(data.decode("utf-8").encode("utf-16-le")) // 2 != item["characters"]:
            raise ValueError(f"Source character count changed: {item['path']}")
        start = (
            f"\n\n---\n\n"
            f"<!-- ORIGINAL_SOURCE_{index:02d}_BEGIN path={item['path']} "
            f"sha={actual} -->\n\n"
        ).encode("utf-8")
        end = (f"\n\n<!-- ORIGINAL_SOURCE_{index:02d}_END -->\n").encode("utf-8")
        parts.extend((start, data, end))
        sizes.append((start, data, end))
    rendered = b"".join(parts)
    # Validate every source byte window and unchanged Git blob SHA inside assembled output.
    cursor = len(header)
    for item, (start, original, end) in zip(sources, sizes):
        assert rendered[cursor:cursor + len(start)] == start
        cursor += len(start)
        extracted = rendered[cursor:cursor + len(original)]
        if extracted != original or blob_hash(extracted) != item["sha1_git_blob"]:
            raise AssertionError(f"Original byte mismatch: {item['path']}")
        cursor += len(original)
        assert rendered[cursor:cursor + len(end)] == end
        cursor += len(end)
    assert cursor == len(rendered)
    output_path = REPO_ROOT / meta["output"]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(rendered)
    # Byte-for-byte readback after writing.
    if output_path.read_bytes() != rendered:
        raise AssertionError("Output write/readback mismatch")
    print(
        f"SUCCESS: {len(sources)} original files unchanged; "
        f"{len(rendered)} bytes merged; "
        f"SHA256={hashlib.sha256(rendered).hexdigest()}"
    )
    print(f"Output: {output_path}")
    print("No source files edited. This does not push to GitHub.")


if __name__ == "__main__":
    assemble()
