#!/usr/bin/env node
/** Batch 12 SHA and line evidence; check anonymized scene for exact-name leaks. */
import fs from 'node:fs';import {createHash} from 'node:crypto';import {resolve,dirname,sep} from 'node:path';import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),a=JSON.parse(fs.readFileSync(resolve(here,'20261109_第十二批六份_匿名記憶視覺與升級_全文v2審核.json'),'utf8')),errors=[],cached=new Map(),ids=new Set();let count=0;
function read(p){if(typeof p!=='string'||!p||p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe source');const f=resolve(root,p);if(!f.startsWith(root+sep))throw Error('outside');if(!cached.has(p)){const b=fs.readFileSync(f);cached.set(p,{sha:createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),lines:b.toString('utf8').split(/\r?\n/)})}return cached.get(p)}
function valid(e){const s=read(e.source_path);return s.sha===e.git_blob_sha&&Number.isInteger(e.line)&&e.line>0&&typeof e.quote==='string'&&e.quote.length>0&&!!s.lines[e.line-1]?.includes(e.quote)}
for(const r of a.records){if(!r.id||ids.has(r.id))errors.push('duplicate '+r.id);ids.add(r.id);if(!r.guardrail||!r.authority||!r.evidence?.length)errors.push('incomplete claim '+r.id);for(const e of r.evidence||[]){count++;if(!valid(e))errors.push('bad quote '+r.id+':'+e.line)}}
for(const m of a.source_file_manifest)if(read(m.path).sha!==m.git_blob_sha)errors.push('source SHA drift '+m.path);
if(a.record_count!==ids.size||a.original_anchors_count!==count||cached.size!==a.source_files_targeted)errors.push('count mismatch');
const anon=a.source_file_manifest.find(x=>x.path.includes('/139_'));
if(!anon)errors.push('missing 139 source');else{const lines=read(anon.path).lines;for(let i=14;i<611;i++)if(/法月懷|瑟莉思媞|Celeste|Hozuki/.test(lines[i]))errors.push('reader-scene identity leak at line '+(i+1))}
if(process.argv.includes('--negative-test')){const e=a.records[0].evidence[0];for(const broken of [{...e,quote:'THIS_MUST_NOT_EXIST_198002'},{...e,git_blob_sha:'0'.repeat(40)},{...e,line:0}])if(valid(broken))errors.push('invalid fixture accepted')}
if(errors.length){console.error(errors.join('\n'));process.exitCode=2}else console.log('Batch12 '+ids.size+' source claims, '+count+' SHA+line anchors, '+cached.size+' files; anonymous scene identity leakage check passed. NON-CANON.');
