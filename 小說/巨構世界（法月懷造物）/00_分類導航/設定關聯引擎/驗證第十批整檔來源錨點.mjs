#!/usr/bin/env node
import fs from 'node:fs';import {createHash} from 'node:crypto';import {resolve,dirname,sep} from 'node:path';import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),a=JSON.parse(fs.readFileSync(resolve(here,'20261109_第十批四份_語氣權威與劇情引擎長評析_v2.json'),'utf8')),bad=[],seen=new Set(),cache=new Map();let n=0;
function read(p){if(!p||p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe');const f=resolve(root,p);if(!f.startsWith(root+sep))throw Error('outside');if(!cache.has(p)){const b=fs.readFileSync(f);cache.set(p,{sha:createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),lines:b.toString('utf8').split(/\r?\n/)})}return cache.get(p)}
function validAnchor(e){const x=read(e.source_path);return x.sha===e.git_blob_sha&&Number.isInteger(e.line)&&e.line>=1&&typeof e.quote==='string'&&e.quote.length>0&&!!x.lines[e.line-1]?.includes(e.quote)}
for(const r of a.records){if(seen.has(r.id))bad.push('duplicate '+r.id);seen.add(r.id);for(const e of r.evidence||[]){const s=read(e.source_path);n++;if(!validAnchor(e))bad.push('bad quote '+r.id+':'+e.line)}}
for(const f of a.source_file_manifest)if(read(f.path).sha!==f.git_blob_sha)bad.push('SHA drift '+f.path);
if(a.record_count!==seen.size||n!==a.original_anchors_count||cache.size!==a.source_files_targeted)bad.push('count mismatch');
if(process.argv.includes('--negative-test')){const e=a.records[0].evidence[0];const broken=[{...e,quote:'__DELIBERATELY_NOT_IN_SOURCE_72914__'},{...e,git_blob_sha:'0'.repeat(40)},{...e,line:0}];for(const x of broken)if(validAnchor(x))bad.push('negative fixture accepted corrupted quote/SHA/line')}
if(bad.length){console.error(bad.join('\n'));process.exitCode=2}else console.log('第十批原文 '+seen.size+'命題、'+n+'行錨點、'+cache.size+'來源驗證通過；非Canon。');
