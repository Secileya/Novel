#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""依既有分卷 SHA256 清單，將合法取得的本機 1030 章原始 TXT 無損拆成 70 卷。
保留原始位元組（包括 BOM、換行、空白及原作第565/566章標頭異常）。
僅建立本機檔案，不呼叫 GitHub/網路，不會修改或刪除原檔。
"""
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
import tempfile
from pathlib import Path


def checksum(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def split(source: Path, manifest_path: Path, destination: Path, verify_only: bool) -> int:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    expected_size = int(manifest["source_bytes"])
    expected_sha = str(manifest["source_sha256"]).lower()
    segments = manifest["volumes"]

    if len(segments) != 70 or int(manifest["volume_count"]) != 70:
        raise ValueError("來源清單不是預期的 70 卷。")
    if int(manifest["source_chapter_headings"]) != 1030:
        raise ValueError("來源清單不是預期的 1030 個章節標頭。")

    original = source.read_bytes()
    actual_sha = checksum(original)
    if len(original) != expected_size or actual_sha != expected_sha:
        raise ValueError(
            "原小說檔未通過來源校驗。可能是不同版本、下載不完整、"
            "或 Windows/Git 轉換了換行。請使用原始 TXT 的 Raw/下載版本。"
            f" 預期 {expected_size} bytes / {expected_sha}；"
            f" 目前 {len(original)} bytes / {actual_sha}"
        )

    checked: list[tuple[str, bytes]] = []
    position = 0
    chapter_total = 0
    for index, segment in enumerate(segments, 1):
        if int(segment["分卷"]) != index:
            raise ValueError(f"分卷順序異常：第 {index} 筆")
        name = str(segment["檔名"])
        if Path(name).name != name or not name.endswith(".txt"):
            raise ValueError(f"不安全或不正確的卷檔名稱：{name}")
        length = int(segment["UTF8位元組"])
        piece = original[position:position + length]
        if len(piece) != length or checksum(piece) != str(segment["SHA256"]).lower():
            raise ValueError(f"{name} 的長度或 SHA256 不符合原始分卷清單。")
        chapter_total += int(segment["章數"])
        checked.append((name, piece))
        position += length

    if position != len(original) or chapter_total != 1030:
        raise ValueError("無損重組檢查失敗：總位元組數或章節數不一致。")

    print(f"校驗成功：1030 章、70 卷、{position:,} bytes")
    print(f"全書 SHA256：{actual_sha}")
    if verify_only:
        print("僅驗證模式：未建立任何檔案。")
        return 0

    if destination.exists():
        raise FileExistsError(
            f"目標路徑已存在，為保護舊資料拒絕覆蓋：{destination}"
        )

    destination.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=".volumes_staging_", dir=destination.parent))
    try:
        for name, piece in checked:
            (staging / name).write_bytes(piece)
        if destination.exists():
            raise FileExistsError(f"另有程序建立了目標路徑：{destination}")
        staging.rename(destination)
    finally:
        if staging.exists():
            shutil.rmtree(staging)

    print(f"已建立 {len(checked)} 個卷檔：{destination}")
    print("原始小說 TXT 完全未修改；將 70 卷依卷號串接會與原始檔逐位元組相同。")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="以 SHA256 分割原著為 70 卷，保留原檔")
    ap.add_argument("--source", required=True, type=Path, help="本機完整1030章TXT")
    ap.add_argument(
        "--manifest", type=Path,
        default=Path(__file__).resolve().with_name("70卷分割完整性原件.json"),
        help="70卷分割完整性原件.json 的本機路徑",
    )
    ap.add_argument("--output", required=True, type=Path, help="新的70卷目標資料夾")
    ap.add_argument("--verify-only", action="store_true", help="只做SHA256驗證，不寫檔")
    args = ap.parse_args()
    try:
        return split(
            args.source.expanduser().resolve(),
            args.manifest.expanduser().resolve(),
            args.output.expanduser().resolve(),
            args.verify_only,
        )
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print(f"錯誤：{exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
