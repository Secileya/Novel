#!/usr/bin/env node
/** Provisional audit anchors: readable source evidence, deliberately NOT full-file sign-off. */
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(dir,'../..');
const q=JSON.parse(fs.readFileSync(path.join(dir,'20261109_第九批六份原文實讀與防漏複核_未簽核.json'),'utf8'));
let err=[],count=0;
function verify(p,sha,rows,n){if(p.startsWith('/')||p.includes('\\')||p.split('/').includes('..'))throw Error('unsafe path');const b=fs.readFileSync(path.join(root,p)),now=createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),lines=b.toString('utf8').split(/\r?\n/);
if(now!==sha)err.push('SHA drift '+p);if(n!=null&&lines.length!==n)err.push('line count drift '+p);
for(const a of rows||[]){count++;if(!lines[a.line-1]?.includes(a.quote)||!a.editorial_finding||!a.review_kind)err.push('bad anchor '+p+':'+a.line)}}
for(const x of q.source_files)verify(x.source_path,x.git_blob_sha,x.evidence,x.all_source_lines_read);
for(const x of q.cross_reference_sources)verify(x.path,x.git_blob_sha,[],null);
if(q.completed_editorial_attestations_added!==0)err.push('premature success');
if(count!==q.anchor_count||q.source_line_total!==q.source_files.reduce((n,x)=>n+x.all_source_lines_read,0))err.push('count mismatch');
if(err.length){console.error(err.join('\n'));process.exitCode=2}else console.log('batch9 evidence checked: '+q.source_files.length+' source files, '+q.anchor_count+' anchors, status=NOT_YET_SIGNED');
