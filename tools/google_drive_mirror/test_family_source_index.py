#!/usr/bin/env python3
"""Regression tests for source-index SHA deltas (local temporary Git repo)."""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SOURCE = Path(__file__).with_name("build_family_source_index.py")
SUBDIR = Path("小說/家庭總檔")


def git(root, *args):
    return subprocess.check_output(["git", *args], cwd=root, text=True).strip()


def run_builder(root):
    proc = subprocess.run(
        [sys.executable, "tools/google_drive_mirror/build_family_source_index.py"],
        cwd=root, capture_output=True, text=True, check=True,
    )
    index = root / "tools/google_drive_mirror/family-source-index.json"
    return json.loads(index.read_text(encoding="utf-8")), proc.stdout


with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp)
    target = root / "tools/google_drive_mirror"
    target.mkdir(parents=True)
    shutil.copyfile(SOURCE, target / "build_family_source_index.py")
    src = root / SUBDIR
    src.mkdir(parents=True)
    (src / "old.md").write_text("original\n", encoding="utf-8")
    (src / "delete.md").write_text("retire\n", encoding="utf-8")

    git(root, "init", "-q")
    git(root, "config", "user.email", "test@example.test")
    git(root, "config", "user.name", "Test")
    git(root, "add", ".")
    git(root, "commit", "-qm", "initial sources")

    initial, output = run_builder(root)
    assert initial["schema"] == 1
    assert len(initial["changedFiles"]) == 2
    assert all(x["change"] == "added" for x in initial["changedFiles"])
    assert initial["removedFiles"] == []
    git(root, "add", ".")
    git(root, "commit", "-qm", "publish first index")

    (src / "old.md").write_text("revised\n", encoding="utf-8")
    (src / "delete.md").unlink()
    (src / "new.md").write_text("added\n", encoding="utf-8")
    git(root, "add", "-A")
    git(root, "commit", "-qm", "modify add remove sources")

    changed, output = run_builder(root)
    assert changed["previousSourceCommit"] == initial["sourceCommit"]
    deltas = {Path(x["path"]).name: x["change"] for x in changed["changedFiles"]}
    assert deltas == {"old.md": "modified", "new.md": "added"}, deltas
    assert [Path(x).name for x in changed["removedFiles"]] == ["delete.md"]
    assert changed["sourceCommit"] == git(root, "rev-parse", "HEAD")

    # Running with no source change must not create a new commit or new delta.
    unchanged, log = run_builder(root)
    assert unchanged == changed
    assert "SOURCE_INDEX_UNCHANGED" in log
    print("PASS: initial index, SHA-based modified+added+removed delta, unchanged no-op")
