// 只讀，Node.js 20+：每個故事日／篇號僅允許一份正式正文。
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const arg=process.argv.indexOf('--root');
if(arg>=0&&!process.argv[arg+1])throw Error('缺少 --root 路徑');
const root=arg<0?path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'):path.resolve(process.argv[arg+1]);
const days=['第一天','第二天','第三天','第四天','第五天'];
const aliases=new Map([
['第二天/07_進房與第一夜留白.md','同一事件已整合'],
['第三天/01_翌晨稱呼與伴侶日常.md','同一事件已整合'],
['第五天/17_從背後抱住的害羞惠惠.md','轉址導覽']]);
const fail=s=>{throw Error('正式篇章防重複檢查失敗：'+s)};
const exists=s=>fs.existsSync(path.join(root,s));
const read=s=>fs.readFileSync(path.join(root,s),'utf8').replace(/^\uFEFF/,'');
const slot=s=>s.match(/^(\d{2}(?:之[一二三四五六七八九十]+)?)_/u)?.[1]||null;
const order=JSON.parse(read('正文/事件閱讀順序.json'));
if(!Array.isArray(order)||!order.length)fail('事件索引為空或格式錯誤');
const occupied=new Map(),listed=new Set();
for(let i=0;i<order.length;i++){
 const e=order[i],parts=e?.path?.split('/')||[];
 if(parts.length!==2||!days.includes(e.day)||parts[0]!==e.day||!parts[1].endsWith('.md')||!slot(parts[1]))fail('索引路徑不合法：'+i);
 const k=e.day+'/'+slot(parts[1]);
 if(occupied.has(k))fail('同日同號索引衝突：'+k);
 if(listed.has(e.path))fail('重複索引路徑：'+e.path);
 if(!exists('正文/'+e.path))fail('索引缺正文：'+e.path);
 if(aliases.has(e.path))fail('導覽誤列正式索引：'+e.path);
 occupied.set(k,e.path);listed.add(e.path);
}
let count=0;
for(const day of days){
 const dir=path.join(root,'正文',day);
 if(!fs.existsSync(dir))continue;
 for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
  if(!ent.isFile()||!ent.name.endsWith('.md')||!slot(ent.name))continue;
  const name=day+'/'+ent.name,text=read('正文/'+name);
  if(aliases.has(name)){
   if(!text.includes(aliases.get(name))||text.includes('【日期時間】'))fail('導覽已成為另一份正文：'+name);
   continue;
  }
  if(!listed.has(name))fail('未列入索引的編號正文（疑似重複提交）：'+name);
  if(occupied.get(day+'/'+slot(ent.name))!==name)fail('同號正文衝突：'+name);
  count++;
 }
}
if(count!==order.length)fail('正文數量與索引不同：'+count+'/'+order.length);
const latest=order.at(-1),base=path.basename(latest.path),mirrorDir=path.join(root,'分日對話',latest.day);
if(!fs.existsSync(mirrorDir))fail('找不到最新分日鏡像');
const matches=fs.readdirSync(mirrorDir).filter(s=>s.endsWith('.md')&&slot(s)===slot(base));
if(matches.length!==1||matches[0]!==base)fail('最新篇號的分日鏡像重複或錯名：'+JSON.stringify(matches));
if(read('分日對話/'+latest.path)!==read('正文/'+latest.path))fail('最新正文與分日鏡像內容不一致');
if(!read('人物設定/目前人物狀態.md').includes(base))fail('最新人物狀態沒有指向：'+base);
console.log('OK：'+count+'件正式事件，章號唯一，最新分日鏡像與人物狀態一致。');
