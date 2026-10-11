"""Read-only full WebP decode check. Requires Pillow; never modifies images."""

import json
from pathlib import Path

from PIL import Image


def main():
    root = Path(__file__).resolve().parent.parent
    entries = json.loads((root / "圖庫/圖片資料索引.json").read_text(encoding="utf-8-sig"))
    assert len(entries) == 197, "Expected exactly 197 catalog entries"
    decoded = 0
    for entry in entries:
        path = root / entry["relative_path"]
        with Image.open(path) as img:
            assert img.format == "WEBP", f"Unexpected format: {path.name}"
            assert img.size == (entry["width"], entry["height"]), f"Dimension mismatch: {path.name}"
            img.load()
            assert img.n_frames == 1, f"Unexpected animated file: {path.name}"
            decoded += 1
    print(f"OK: {decoded}/197 original WebP files fully decoded; all dimensions match the catalog.")


if __name__ == "__main__":
    main()
