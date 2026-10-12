"""Read-only checks for actual Markdown embeds and all 197 reusable snippets."""

import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse


def main():
    root = Path(__file__).resolve().parent.parent
    catalog = json.loads((root / "圖庫/圖片資料索引.json").read_text(encoding="utf-8-sig"))
    lookup = {entry["asset_id"]: entry for entry in catalog}
    assert len(lookup) == 197
    prefix = "https://raw.githubusercontent.com/Secileya/Novel/main/"
    for entry in catalog:
        assert entry["github_image_url"].startswith(prefix)
        remote_path = unquote(urlparse(entry["github_image_url"]).path)
        assert remote_path.endswith("/小說/理惠/" + entry["relative_path"])
        for key, parent in (
            ("markdown_embed_from_prose", root / "正文"),
            ("markdown_embed_from_dialogue", root / "分日對話/第一天"),
        ):
            match = re.fullmatch(r"!\[[^\]]+\]\(([^)]+)\)", entry[key])
            assert match, f"Invalid embed syntax: {entry['asset_id']} {key}"
            target = (parent / unquote(match[1])).resolve()
            assert target == (root / entry["relative_path"]).resolve(), f"Wrong embed target: {entry['asset_id']}"
            assert target.is_file()
    actual_embeds = 0
    files = list((root / "正文").rglob("*.md")) + list((root / "圖庫").rglob("*.md")) + list((root / "分日對話").rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8-sig")
        text = re.sub(r"```[^\n]*\n.*?```", "", text, flags=re.S)
        for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
            target = match[1]
            if urlparse(target).scheme:
                continue
            assert (path.parent / unquote(target)).resolve().is_file(), f"Broken inline image: {path} {target}"
            actual_embeds += 1
    usage = json.loads((root / "正文/正文配圖紀錄.json").read_text(encoding="utf-8-sig"))
    expected_prose_embeds = 0
    for item in usage:
        entry = lookup[item["asset_id"]]
        for document in [item["document"], *item.get("mirror_documents", [])]:
            text = (root / document).read_text(encoding="utf-8-sig")
            targets = re.findall(r"!\[[^\]]*\]\(([^)]+)\)", text)
            matches = [target for target in targets if (root / document).parent.joinpath(unquote(target)).resolve() == (root / entry["relative_path"]).resolve()]
            assert len(matches) == 1, f"Missing or duplicate logged image: {document} {item['asset_id']}"
            expected_prose_embeds += 1
        assert item["canon_effect"] == "NONE"
    latest_path = "第五天/13_實驗獎勵與明天繼續習慣.md"
    for section in ("正文", "分日對話"):
        text = (root / section / latest_path).read_text(encoding="utf-8-sig")
        ids = re.findall(r"!\[理惠｜(SR-IMG-\d{3})[^\]]*\]", text)
        assert ids == ["SR-IMG-011", "SR-IMG-031", "SR-IMG-030"], f"Latest source-image sequence lost: {section} {ids}"
        assert re.search(r"只是緊緊貼著。\s+!\[理惠｜SR-IMG-030", text), "030 placement differs from source screenshot"
    expected_total = 197 * 2 + expected_prose_embeds
    assert actual_embeds == expected_total, f"Expected {expected_total} catalog and logged prose images, got {actual_embeds}"
    print(f"OK: 197 snippet targets verified; {actual_embeds} actual Markdown image links exist; prose usage IDs match.")


if __name__ == "__main__":
    main()
