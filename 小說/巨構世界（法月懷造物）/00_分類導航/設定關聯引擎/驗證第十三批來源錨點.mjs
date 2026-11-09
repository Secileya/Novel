#!/usr/bin/env node
/** Batch13 original source SHA and quoted line checks, with corrupted evidence rejection. */
import fs from 'node:fs';import {createHash} from 'node:crypto';import {resolve,dirname,sep} from 'node:path';import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),audit=JSON.parse(fs.readFileSync(resolve(here,'20261109_第十三批六份_前史雙武裝白髮反例與五版試寫_v2.json'),'utf8')),bad=[],cache=new Map(),ids=new Set();let n=0;
function read(p){if(!p||p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe');const f=resolve(root,p);if(!f.startsWith(root+sep))throw Error('outside');if(!cache.has(p)){const buf=fs.readFileSync(f);cache.set(p,{sha:createHash('sha1').update(Buffer.from('blob '+buf.length+'\0')).update(buf).digest('hex'),lines:buf.toString('utf8').split(/\r?\n/)})}return cache.get(p)}
function valid(e){const s=read(e.source_path);return s.sha===e.git_blob_sha&&Number.isInteger(e.line)&&e.line>0&&typeof e.quote==='string'&&!!e.quote&&!!s.lines[e.line-1]?.includes(e.quote)}
for(const c of audit.records){if(ids.has(c.id))bad.push('duplicate '+c.id);ids.add(c.id);if(!c.guardrail||!c.authority)bad.push('missing scope '+c.id);for(const e of c.evidence||[]){n++;if(!valid(e))bad.push('invalid '+c.id+':'+e.line)}}
for(const m of audit.source_file_manifest)if(read(m.path).sha!==m.git_blob_sha)bad.push('source drift '+m.path);
if(audit.record_count!==ids.size||n!==audit.original_anchors_count||cache.size!==6)bad.push('counts mismatch');
if(process.argv.includes('--negative-test')){const e=audit.records[0].evidence[0];for(const x of [{...e,quote:'__NO_SUCH_QUOTE_8806__'},{...e,git_blob_sha:'0'.repeat(40)},{...e,line:0}])if(valid(x))bad.push('corrupt original evidence accepted')}
if(bad.length){console.error(bad.join('\n'));process.exitCode=2}else console.log('Batch13 six full sources, '+ids.size+' claims, '+n+' SHA+original line anchors PASS, no candidate-to-Canon promotion.');
