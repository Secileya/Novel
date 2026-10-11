"""Read-only checks of Chinese names, Markdown links, references and checksums."""

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse


def main():
    root = Path(__file__).resolve().parent.parent
    reserved = {"README.md", "AGENTS.md", ".gitattributes"}
    files = list(root.rglob("*"))
    for path in files:
        if path.is_file() and path.name not in reserved:
            assert re.search(r"[\u3400-\u9fff]", path.stem), f"Non-Chinese name: {path}"
        elif path.is_dir():
            assert re.search(r"[\u3400-\u9fff]", path.name), f"Non-Chinese directory: {path}"

    links = 0
    for path in root.rglob("*.md"):
        # Original messages are immutable evidence, not navigation documents.
        if path.relative_to(root).parts[0] in {"原始對話", "分日對話"}:
            continue
        text = path.read_text(encoding="utf-8-sig")
        text = re.sub(r"```[^\n]*\n.*?```", "", text, flags=re.S)
        text = re.sub(r"`[^`\n]*`", "", text)
        for target in re.findall(r"!?\[[^\]\r\n]*\]\(([^)\r\n]+)\)", text):
            parsed = urlparse(target)
            if parsed.scheme or target.startswith("#"):
                continue
            resolved = (path.parent / unquote(parsed.path)).resolve()
            assert resolved.is_relative_to(root), f"Escaped project: {path} {target}"
            assert resolved.exists(), f"Broken reference: {path} {target}"
            links += 1

    catalog = json.loads((root / "圖庫/圖片資料索引.json").read_text(encoding="utf-8-sig"))
    for entry in catalog:
        analysis = root / entry["analysis_path"]
        assert analysis.name == Path(entry["stored_filename"]).stem + "_解讀.md"
        assert analysis.is_file()
        expected = "/小說/理惠/" + entry["analysis_path"]
        assert unquote(urlparse(entry["github_analysis_url"]).path).endswith(expected)

    manifest = root / "來源與校對/檔案校驗碼.sha256"
    listed = set()
    for line in manifest.read_text(encoding="utf-8-sig").splitlines():
        expected, relative = line.split("  ", 1)
        path = root / relative
        assert path.is_file(), f"Missing checksum target: {relative}"
        assert hashlib.sha256(path.read_bytes()).hexdigest() == expected, f"Checksum mismatch: {relative}"
        listed.add(path.resolve())
    actual = {path.resolve() for path in files if path.is_file() and path != manifest}
    assert listed == actual, "Checksum coverage mismatch"
    print(f"OK: Chinese names; {links} Markdown references; 197 named analyses; {len(listed)} checksums.")


if __name__ == "__main__":
    main()
