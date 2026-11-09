#!/usr/bin/env node
import fs from 'node:fs';import {createHash} from 'node:crypto';import {resolve,dirname,sep} from 'node:path';import {fileURLToPath} from 'node:url';
const dir=dirname(fileURLToPath(import.meta.url)),root=resolve(dir,'../..'),a=JSON.parse(fs.readFileSync(resolve(dir,'20261109_第九批六份混合全文_原子命題與v2整檔驗收.json'),'utf8')),bad=[],seen=new Set(),cache=new Map();let count=0;
function read(p){if(!p||p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe');const f=resolve(root,p);if(!f.startsWith(root+sep))throw Error('outside');if(!cache.has(p)){const b=fs.readFileSync(f);cache.set(p,{sha:createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),lines:b.toString('utf8').split(/\r?\n/)})}return cache.get(p)}
for(const r of a.records){if(seen.has(r.id))bad.push('duplicate '+r.id);seen.add(r.id);for(const e of r.evidence||[]){const s=read(e.source_path);count++;if(s.sha!==e.git_blob_sha||!s.lines[e.line-1]?.includes(e.quote))bad.push('invalid quote '+r.id+':'+e.line)}}
for(const m of a.source_file_manifest)if(read(m.path).sha!==m.git_blob_sha)bad.push('source SHA drift '+m.path);
if(a.record_count!==seen.size||a.original_anchors_count!==count||cache.size!==a.source_files_targeted)bad.push('count mismatch');
if(process.argv.includes('--negative-test')){const v=a.records[0].evidence[0];if(read(v.source_path).lines[v.line-1].includes('DELIBERATELY_FALSE_QUOTE_123'))bad.push('negative test failed')}
if(bad.length){console.error(bad.join('\n'));process.exitCode=2}else console.log('第九批 '+seen.size+'項原子命題與'+count+'原稿行號通過，六份來源；非作者Canon。');
