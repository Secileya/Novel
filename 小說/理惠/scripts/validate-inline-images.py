"""Read-only checks for actual Markdown embeds and all 197 reusable snippets."""

import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse


def main():
    root = Path(__file__).resolve().parent.parent
    catalog = json.loads((root / "assets/images/catalog.json").read_text(encoding="utf-8-sig"))
    lookup = {entry["asset_id"]: entry for entry in catalog}
    assert len(lookup) == 197
    prefix = "https://raw.githubusercontent.com/Secileya/Novel/main/"
    for entry in catalog:
        assert entry["github_image_url"].startswith(prefix)
        remote_path = unquote(urlparse(entry["github_image_url"]).path)
        assert remote_path.endswith("/小說/理惠/" + entry["relative_path"])
        for key, parent in (
            ("markdown_embed_from_prose", root / "正文"),
            ("markdown_embed_from_dialogue", root / "dialogue/day-01"),
        ):
            match = re.fullmatch(r"!\[[^\]]+\]\(([^)]+)\)", entry[key])
            assert match, f"Invalid embed syntax: {entry['asset_id']} {key}"
            target = (parent / unquote(match[1])).resolve()
            assert target == (root / entry["relative_path"]).resolve(), f"Wrong embed target: {entry['asset_id']}"
            assert target.is_file()
    actual_embeds = 0
    files = list((root / "正文").glob("*.md")) + list((root / "assets/images").rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8-sig")
        text = re.sub(r"```[^\n]*\n.*?```", "", text, flags=re.S)
        for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
            target = match[1]
            if urlparse(target).scheme:
                continue
            assert (path.parent / unquote(target)).resolve().is_file(), f"Broken inline image: {path} {target}"
            actual_embeds += 1
    usage = json.loads((root / "正文/IMAGE_USAGE.json").read_text(encoding="utf-8-sig"))
    for item in usage:
        entry = lookup[item["asset_id"]]
        text = (root / item["document"]).read_text(encoding="utf-8-sig")
        assert entry["markdown_embed_from_prose"] in text
        assert item["canon_effect"] == "NONE"
    assert actual_embeds == 395, f"Expected 197 gallery + 197 analysis + 1 prose embed, got {actual_embeds}"
    print(f"OK: 197 snippet targets verified; {actual_embeds} actual Markdown image links exist; prose usage IDs match.")


if __name__ == "__main__":
    main()
