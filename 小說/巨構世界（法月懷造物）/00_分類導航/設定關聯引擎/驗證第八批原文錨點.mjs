#!/usr/bin/env node
/** 第八批171來源：逐條驗證真正Git blob SHA、原始行號與逐字引文。 */
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const HERE=dirname(fileURLToPath(import.meta.url)),ROOT=resolve(HERE,'../..');
const ledger=JSON.parse(fs.readFileSync(resolve(HERE,'20261109_全庫第八批_164與171混合_外部研究權威與主角互識仲裁.json'),'utf8'));
const bad=[],seen=new Set(),cached=new Map();let anchors=0;
function source(path){
 if(typeof path!=='string'||!path||path.startsWith('/')||path.includes('\\')||path.split('/').includes('..'))throw Error('unsafe path');
 const file=resolve(ROOT,path);
 if(!file.startsWith(ROOT+sep))throw Error('path escapes project');
 if(!cached.has(path)){
  const bytes=fs.readFileSync(file);
  const sha=createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
  cached.set(path,{sha,lines:bytes.toString('utf8').split(/\r?\n/)});
 }
 return cached.get(path);
}
for(const rec of ledger.records||[]){
 if(!rec.id||seen.has(rec.id))bad.push('duplicate/invalid ID: '+rec.id);
 seen.add(rec.id);
 if(!rec.authority||!rec.status||!rec.guardrail)bad.push(rec.id+' missing authority/status/guardrail');
 if(!Array.isArray(rec.evidence)||!rec.evidence.length)bad.push(rec.id+' missing anchors');
 for(const e of rec.evidence||[])try{
  const src=source(e.source_path);
  if(src.sha!==e.git_blob_sha)throw Error('Git SHA mismatch');
  if(!Number.isInteger(e.line)||e.line<1||e.line>src.lines.length)throw Error('out of bounds line');
  if(!e.quote||!src.lines[e.line-1].includes(e.quote))throw Error('quote absent at line '+e.line);
  anchors++;
 }catch(err){bad.push(rec.id+' '+e.source_path+': '+err.message)}
}
for(const m of ledger.source_file_manifest||[])try{
 if(source(m.path).sha!==m.git_blob_sha)bad.push('manifest Git SHA mismatch '+m.path);
}catch(err){bad.push('manifest '+m.path+': '+err.message)}
if(seen.size!==ledger.record_count)bad.push('record_count mismatch');
if(anchors!==ledger.original_anchors_count)bad.push('anchor count mismatch');
if(cached.size!==ledger.source_files_targeted)bad.push('source file count mismatch');
if((ledger.source_file_manifest||[]).length!==cached.size)bad.push('manifest count mismatch');
if(bad.length){console.error('第八批證據失敗:\n'+bad.join('\n'));process.exitCode=1;}
else console.log('第八批引文通過：'+seen.size+'判讀，'+anchors+'錨點，'+cached.size+'份來源；四份歷史164/171來源均另由獨立整檔驗收台帳簽核；局部命題本身不是整檔證明');
