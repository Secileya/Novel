#!/usr/bin/env node
/** Required append-only process lessons, not fiction Canon. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const board=JSON.parse(fs.readFileSync(path.join(dir,'AI接手_工作板.json'),'utf8'));
const txt=fs.readFileSync(path.join(dir,'AI接手_經驗更新日誌.jsonl'),'utf8').trim();
const errors=[];
const logs=txt.split(/\r?\n/).map((x,i)=>{try{return JSON.parse(x)}catch{errors.push('bad JSONL at line '+(i+1));return {}}});
function validate(r){const e=[];
 for(const key of ['date','batch','stage','head_sha','scope','unfinished','next'])if(typeof r[key]!=='string'||!r[key].trim())e.push('missing '+key);
 for(const key of ['problems','root_causes','fixes','prevention'])if(!Array.isArray(r[key]))e.push('missing '+key+' array');
 if(!Number.isInteger(r.accepted)||!Number.isInteger(r.pending))e.push('missing source counts');
 if(!r.verification||!['success','failure','pending','not_run'].includes(r.verification.status))e.push('invalid verification');
 if(r.problems?.length>0&&!r.fixes?.length)e.push('problems without fixes');
 if(r.head_sha&&!/^[0-9a-f]{40}$/.test(r.head_sha))e.push('head SHA not 40 hex');
 return e;
}
for(let i=0;i<logs.length;i++)errors.push(...validate(logs[i]).map(x=>'entry '+(i+1)+': '+x));
if(new Set(logs.map(x=>x.batch)).size!==logs.length)errors.push('duplicate batch log key');
const last=logs.at(-1),stage=board.latest_progress?.stage;
if(last?.stage!==stage)errors.push('latest journal stage does not match workboard');
if(last?.accepted!==board.tasks.find(x=>x.id==='NEXT-009')?.progress?.verified_complete||last?.pending!==board.tasks.find(x=>x.id==='NEXT-009')?.progress?.pending)errors.push('journal source counts stale');
if(!fs.readFileSync(path.join(dir,'AI接手_經驗回寫與Git交易規範.md'),'utf8').includes('每批回寫'))errors.push('process runbook missing');
if(process.argv.includes('--negative-test')){
 const wrong={...last,stage:'SIMULATED_STALE_STAGE',fixes:[]};
 if(!validate({...wrong,problems:['failure']}).some(x=>x.includes('without fixes')))errors.push('negative missing-fix test not caught');
 if(wrong.stage===stage)errors.push('negative stale-stage test not caught');
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}
else console.log('AI experience journal valid: '+logs.length+' entries; latest '+last.batch+'; registered '+last.accepted+'/'+(last.accepted+last.pending));
