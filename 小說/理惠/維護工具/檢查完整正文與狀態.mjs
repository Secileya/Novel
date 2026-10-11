// Read-only verification of source identity, effective segments and state retention.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
const json=p=>JSON.parse(read(p));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const rows=json('原始對話/ChatGPT對話/逐則原始訊息.json');
const stats=json('來源與校對/完整擷取統計.json');
const proof=json('來源與校對/完整擷取查核證據.json');
const order=json('正文/事件閱讀順序.json');
const trace=json('來源與校對/正文來源對照.json');
const states=json('人物設定/逐段內心與狀態.json');
const ledger=json('來源與校對/逐則採用與排除對照.json');
assert.equal(rows.length,1000);assert.equal(new Set(rows.map(x=>x.message_id)).size,1000);
assert.equal(new Set(rows.map(x=>x.source_id)).size,1000);
assert.equal(rows.filter(x=>x.role==='user').length,507);
assert.equal(rows.filter(x=>x.role==='assistant').length,493);
assert.equal(rows.reduce((n,x)=>n+x.text.length,0),stats.total_text_characters);
assert.equal(stats.folded_messages,0);assert.equal(stats.batches,46);
assert.equal(ledger.length,1000);assert.equal(new Set(ledger.map(x=>x.source_id)).size,1000);
for(const x of rows)assert.equal(sha(x.text),x.sha256,'Raw text hash: '+x.source_id);
for(let i=0;i<=506;i++)assert(rows.some(x=>x.turn_index===i&&x.role==='user'),'Missing user position '+i);
assert.deepEqual(Array.from({length:507},(_,i)=>i).filter(i=>!rows.some(x=>x.turn_index===i&&x.role==='assistant')),stats.missing_assistant_turns);
assert.deepEqual(proof.missing_assistant_checks.map(x=>x.turn).sort((a,b)=>a-b),stats.missing_assistant_turns);
const source=new Map(rows.map(x=>[x.source_id,x]));
const luna=json('原始對話/LunarTalk對話/逐則原始訊息.json');
const lunaById=new Map(luna.map(x=>[x.source_id,x]));
const whole=read('原始對話/ChatGPT對話/完整對話文字.md');
for(const x of rows)assert(whole.includes(`<a id="${x.source_id.toLowerCase()}"></a>`),'Missing complete-source anchor '+x.source_id);
assert.equal(order.length,38);
assert.equal(new Set(order.map(x=>x.path)).size,38);
const days=['第一天','第二天','第三天','第四天','第五天'];
for(let i=1;i<order.length;i++)assert(days.indexOf(order[i].day)>=days.indexOf(order[i-1].day),'Backwards day in reading order');
const parts=new Map();
for(const ev of order){
 const text=read('正文/'+ev.path);
 const matches=[...text.matchAll(/^### ((?:GPT-\d{4}-[AU]\d+)|(?:LT-\d{4})|(?:CX-\d{4}))｜([^\n]*)\n/gm)];
 for(let i=0;i<matches.length;i++){
  const m=matches[i];if(m[1].startsWith('CX-'))continue;
  let body=text.slice(m.index+m[0].length,matches[i+1]?.index??text.length).trim().replace(/\n\n---\s*$/,'').trim();
  body=body.replace(/\n\n!\[理惠｜SR-IMG-\d{3}[^\n]*\n\n\[SR-IMG-\d{3} 解讀\][^\n]*/g,'');
  body=body.replace(/\n\n\[回查原句\]\([^\n]*\)\s*$/,'').trim();
  if(m[1].startsWith('LT-')){
   // A platform refusal prefix is not character dialogue. Her actual anger stays.
   let original=lunaById.get(m[1]).text
    .replace(/^(?:我沒辦法繼續這個方向。|這個場景我沒辦法繼續展開。)\s*/,'')
    .replace(/\s*已停止生成\s*·\s*你中斷了這次生成\s*$/,'')
    .replace(/\s*回覆已中斷，已保留目前內容\s*·\s*回覆未完成，訊息已保留，可再試一次\s*$/,'')
    .replace(/\s*重說\s*改寫\s*這則回覆的組成\s*$/,'');
   // The user-supplied a217800a screenshot says 你的手; keep both observations.
   if(m[1]==='LT-0436')original=original.replace('拍掉妳的手','拍掉你的手');
   assert.equal(body.replace(/\s+/g,''),original.replace(/\s+/g,''),'LunarTalk prose mutation '+m[1]);
   continue;
  }
  const segment=Number((m[2].match(/同一則第(\d+)段/)||[])[1]||0);
  const key=[ev.path,m[1],segment].join('|');assert(!parts.has(key),'Duplicated prose source key '+key);
  parts.set(key,body);
  if(source.get(m[1]).role==='user'){
   const original=source.get(m[1]).text.trim();
   assert(body===original||body===original.replaceAll('雜魚妹妹','雜魚惠惠'),'Unexpected user input mutation '+key);
  }
 }
}
const stateKeys=['內心','好感度','當下情緒'];
for(const tr of trace){
 const key=[tr.event,tr.source_id,tr.segment||0].join('|');
 assert(parts.has(key),'Missing effective prose segment '+key);
 const s=parts.get(key);assert.equal(sha(s),tr.effective_text_sha256,'Effective text changed '+key);
 assert.equal(source.get(tr.source_id).sha256,tr.source_sha256,'Original source changed '+key);
 const st=states.find(x=>[x.event,x.source_id,x.segment||0].join('|')===key);assert(st,'Missing state row '+key);
 for(const k of stateKeys){
  const v=(s.match(new RegExp(`【${k}】\\s*([\\s\\S]*?)(?=\\n【|$)`))||[])[1]?.trim()??null;
  assert.equal(st[k],v,'State extraction mismatch '+key+' '+k);
 }
 assert(!/【(?:內心|好感度|當下情緒)】\n\s*\n/.test(s),'Blank line after state header '+key);
}
// Cross-event source 212 and split source 215 retain their original state fields once.
for(const id of new Set(trace.map(x=>x.source_id))){
 const original=source.get(id).text.match(/【(?:內心|好感度|當下情緒)】/g)||[];
 const effective=trace.filter(x=>x.source_id===id).flatMap(x=>x.effective_state_headers);
 assert.deepEqual(effective,original,'Lost or duplicated state headers '+id);
}
const ltLedger=json('來源與校對/LunarTalk逐則採用與排除對照.json');assert.equal(ltLedger.length,437);
for(const x of ltLedger)assert.equal(x.text_sha256,sha(luna.find(y=>y.source_id===x.source_id).text));
const latest=read('正文/第五天/13_實驗獎勵與明天繼續習慣.md');
assert(latest.includes('明天再繼續習慣啊♡'));assert(latest.includes('110／110'));
const special=read('特殊/01_最新床上安慰與晚安.md');
assert(special.includes('不計入正文'));for(const k of stateKeys)assert(special.includes(`【${k}】`));
assert(!order.some(x=>x.path.startsWith('特殊/')));
const capture=json('原始對話/對話擷取紀錄.json');
assert.equal(capture.chatgpt_complete.source_sha256,sha(read(capture.chatgpt_complete.source)));
assert.equal(capture.canonical_events,order.length);
console.log(`OK: 1000 source identities and hashes; 46 batches; 38 whole events; ${trace.length} effective segments and state records; special excluded from main timeline.`);
