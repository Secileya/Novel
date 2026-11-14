#!/usr/bin/env python3
"""Regression tests for lossless Gemini current-master reading volumes."""
import importlib.util
import hashlib
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name('build_family_reading_volumes.py')
spec = importlib.util.spec_from_file_location('family_reading_volumes', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class ReadingVolumeTests(unittest.TestCase):
    def assert_lossless(self, data):
        rendered, parts = mod.render(data)
        names = sorted(k for k in rendered if k.startswith('01_最新版閱讀分卷_'))
        self.assertEqual(len(names), len(parts))
        self.assertGreater(len(names), 0)
        self.assertEqual(b''.join(p.encode('utf-8') for p in parts), data)
        self.assertEqual(
            ''.join(rendered[k].split(mod.MARKER, 1)[1] for k in names).encode('utf-8'),
            data,
        )
        self.assertTrue(all(len(rendered[k].encode('utf-8')) <= mod.MAX_FILE_BYTES for k in names))
        sha = mod.git_blob_sha(data)
        self.assertIn(sha, rendered['00_最新版閱讀導航.md'])
        for name in names:
            self.assertIn(sha, rendered[name])
            self.assertIn('歷史快照', rendered[name])
        self.assertEqual(rendered, mod.render(data)[0], 'Output should be deterministic')
        return rendered

    def test_utf8_chapters_and_crlf(self):
        body = ('## 一、第一章\r\n' + ('法月懷與塞希莉雅🐉。\r\n' * 3000)
                + '## 二、第二章\r\n' + ('絲蒂莉雅與薇絲莉雅。\r\n' * 4000)
                + '## 三、第三章\r\n' + ('第三章繼續。\r\n' * 2500))
        rendered = self.assert_lossless(body.encode('utf-8'))
        self.assertGreaterEqual(len(rendered), 3)

    def test_unbroken_huge_line_and_unusual_line_endings(self):
        source = ('雙字🐉' * 40000 + '\r\n' + '保留空白  \n\n' + '尾端') .encode('utf-8')
        self.assert_lossless(source)

    def test_short_source_and_empty_source(self):
        self.assert_lossless('## 一、簡短一章\n內容。\n'.encode())
        with self.assertRaises(ValueError):
            mod.render(b'')

    def test_changed_source_produces_different_sha(self):
        a = self.assert_lossless('## 一、正文\n不同版本A\n'.encode())
        b = self.assert_lossless('## 一、正文\n不同版本B\n'.encode())
        self.assertNotEqual(a['00_最新版閱讀導航.md'], b['00_最新版閱讀導航.md'])

    def test_real_repository_master_when_available(self):
        if mod.SOURCE.is_file():
            raw = mod.SOURCE.read_bytes()
            rendered = self.assert_lossless(raw)
            self.assertGreater(len(rendered), 2)
            self.assertEqual(
                mod.git_blob_sha(raw),
                hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest(),
            )


if __name__ == '__main__':
    unittest.main()
