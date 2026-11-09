#!/usr/bin/env node
/** Non-prescriptive post-writing voice library reference and candidate source-drift check. */
import fs from 'node:fs';import {resolve,dirname,sep} from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),rec=JSON.parse(fs.readFileSync(resolve(here,'候選正文語氣庫_查閱與非強制用詞稽核.json'),'utf8'));const issues=[];
function read(path){if(typeof path!=='string'||!path||path.startsWith('/')||path.includes('\\')||path.split('/').includes('..'))throw Error('unsafe source path');const f=resolve(root,path);if(!f.startsWith(root+sep))throw Error('source path escaped');const b=fs.readFileSync(f);return{sha:createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),source:b.toString('utf8')}}
function countStr(s,term){return s.split(term).length-1}
function dialogue(source){return [...source.matchAll(/「([^」]*)」/gs)].map(m=>m[1]).join('\n')}
function interjectionCount(s){return [...s.matchAll(/(?:^|[，。？！!?：:；;\s])我去(?=$|[，。？！!?,，；;～~…—])/gmu)].length}
const all=rec.source_files.map(row=>{const r=read(row.path);const texts=dialogue(r.source);const counts=Object.fromEntries(rec.term_keys.filter(t=>countStr(texts,t)>0).map(t=>[t,countStr(texts,t)]));if(r.sha!==row.git_blob_sha)issues.push('UNREVIEWED_CANDIDATE_SOURCE_CHANGED '+row.path);if(JSON.stringify(counts)!==JSON.stringify(row.dialogue_term_counts))issues.push('REVIEW_TERM_COUNTS_STALE '+row.path);return{chapter:row.path,dialogue_term_counts:counts}});
for(const r of rec.reference_corpus){if(read(r.path).sha!==r.git_blob_sha)issues.push('VOICE_LIBRARY_SOURCE_CHANGED '+r.path)}
if(rec.source_files.length!==12||rec.manual_interpretation.mandatory_phrases!==false||rec.manual_interpretation.earlier_authoring_consultation_evidence!=='NOT_RECORDED_OR_NOT_VERIFIED')issues.push('RECEIPT_GUARDRAIL_MISSING');
if(process.argv.includes('--self-test')){if(interjectionCount('「我去問工坊。」\n「我去買東西。」')!==0||interjectionCount('「我去！」\n「我去，這也行？」')!==2)issues.push('INTERJECTION_TEST_FAILED')}
if(process.argv.includes('--report'))console.log(JSON.stringify({terms_are_optional:true,retrospective_not_original_authoring_proof:true,chapters:all},null,2));
if(issues.length){console.error(issues.join('\n'));process.exitCode=2}else console.log('12 current candidate chapters and 105/059 voice references checked; no mandatory word quotas; original authoring consultation NOT VERIFIED.');
