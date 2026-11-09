#!/usr/bin/env python3
"""Build a public SHA-index for the tracked 巨構世界 source files."""
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SUBDIR = '小說/巨構世界（法月懷造物）'
INDEX = ROOT / 'tools/google_drive_mirror/source-index.json'
ALLOWED = ('.md', '.json', '.mjs', '.svg', '.txt')

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT).decode('utf-8').strip()

def main():
    sha = git('rev-parse', 'HEAD')
    subtree_sha = git('rev-parse', 'HEAD:' + SUBDIR)
    paths = subprocess.check_output(['git', 'ls-files', '-z', '--', SUBDIR], cwd=ROOT).split(b'\0')
    entries = []
    for raw in paths:
        if not raw:
            continue
        path = raw.decode('utf-8')
        if not path.lower().endswith(ALLOWED):
            continue
        absolute = ROOT / path
        if not absolute.is_file() or absolute.is_symlink():
            raise ValueError('Missing or symlink source: ' + path)
        data = absolute.read_bytes()
        blob_sha = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        if git('rev-parse', 'HEAD:' + path) != blob_sha:
            raise ValueError('Source changed during build: ' + path)
        entries.append({'path': path, 'sha': blob_sha, 'size': len(data)})
    entries.sort(key=lambda e: e['path'])
    if not entries:
        raise ValueError('Empty source inventory; refusing to publish')
    if INDEX.is_file():
        old = json.loads(INDEX.read_text(encoding='utf-8'))
        if old.get('sourceTreeSha') == subtree_sha and old.get('files') == entries:
            print('SOURCE_INDEX_UNCHANGED', subtree_sha, len(entries))
            return
    payload = {
        'schema': 1,
        'repository': 'Secileya/Novel',
        'branch': 'main',
        'sourcePrefix': SUBDIR + '/',
        'sourceCommit': sha,
        'sourceTreeSha': subtree_sha,
        'files': entries,
    }
    INDEX.parent.mkdir(parents=True, exist_ok=True)
    INDEX.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('SOURCE_INDEX_UPDATED', subtree_sha, len(entries), sha)

if __name__ == '__main__':
    main()
