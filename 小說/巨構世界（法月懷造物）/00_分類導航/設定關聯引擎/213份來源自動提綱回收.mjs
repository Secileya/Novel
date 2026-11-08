#!/usr/bin/env node
// Verifiable original-source dossier index; NOT Canon, nor human semantic review.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,"../..");
const BACKLOG=path.join(HERE,"全庫待原子化缺口清冊.json");
const OUT=path.join(HERE,"213份歷史來源逐檔證據索引.json");
const TERMS=["W01","W02","W03","W04","W05","W06","W07","W_TOP","K01","K02","K03","K04","K05","K06","K07","K08","K09","K10","Celeste","瑟莉思媞","諾亞","艾莉維亞","法月懷","Gemini","前文明","帝國","公會","商隊","醫療","宗教","農田","生態","工坊","遺跡","野生","跨層","交接","候選","非正史","復歸","世界層","靜謐迴廊","終焉迴廊","第三個座位","主角","航道","列車","城市","人口","物權"];
const topics=s=>TERMS.filter(t=>s.includes(t));
const clip=(s,n=300)=>s.trim().slice(0,n);
function hash(body){return crypto.createHash("sha1").update("blob "+body.length+"\0").update(body).digest("hex");}
function pick(arr,max){
 if(arr.length<=max)return arr;
 const found=new Map();
 for(const x of arr.slice(0,3))found.set(x.i,x);
 for(let k=1;k<=max-6;k++){const x=arr[Math.floor(k*(arr.length-1)/(max-5))];if(x)found.set(x.i,x);}
 for(const x of arr.slice(-3))found.set(x.i,x);
 return [...found.values()].sort((a,b)=>a.i-b.i);
}
function headers(lines,ext){
 let all=lines.map((s,i)=>({i,title:s.trim()}));
 if(ext===".json")return all.filter(x=>/^"[^"]{1,100}"\s*:/.test(x.title));
 if(ext===".svg")return all.filter(x=>/<title|<desc|<text|<g\s|<path\s/.test(x.title));
 const h=all.filter(x=>/^#{1,6}\s/.test(x.title));
 if(h.length)return h;
 return all.filter(x=>/^第[一二三四五六七八九十百千0-9]+[章節]|^【.{1,65}】|^卷[一二三四五六七八九十]/.test(x.title));
}
function passage(lines,h,end,ext){
 const opts=[];
 for(let j=h.i+1;j<Math.min(lines.length,end,h.i+100);j++){
  const s=lines[j].trim();
  if(s.length<26||/^#{1,6}\s|^\x60{3}|^\|[- :|]+\|$|^<!--|^<\/?(?:svg|g|path)/.test(s))continue;
  const score=(/(已確認|後出|使用者|作者|不得|不能|未定|候選|因果|取代|世界層|車站|文明|戰鬥|人物|K0[1-9]|W0[1-7])/.test(s)?3:0)+(s.length>50?1:0)+(s.length<1100?1:0);
  opts.push({i:j,text:s,score});
 }
 opts.sort((a,b)=>b.score-a.score||a.i-b.i);
 return opts[0]??{i:h.i,text:h.title};
}
function dossier(f,ordinal){
 const file=path.resolve(ROOT,f.path);
 if(!file.startsWith(ROOT+path.sep))throw Error("Path escape: "+f.path);
 if(!fs.existsSync(file))throw Error("Missing source: "+f.path);
 const body=fs.readFileSync(file),sha=hash(body);
 if(sha!==f.git_blob_sha)throw Error("Git SHA source drift: "+f.path);
 const raw=body.toString("utf8"),lines=raw.split(/\r?\n/),ext=path.extname(f.path).toLowerCase();
 const hs=headers(lines,ext);
 let selected=pick(hs,16);
 if(!selected.length)selected=pick(lines.map((s,i)=>({i,title:s.trim()})).filter(x=>x.title.length>=20),8);
 const outline=selected.map(h=>{
  const next=hs.find(x=>x.i>h.i)?.i??lines.length,p=passage(lines,h,next,ext);
  return {heading_line:h.i+1,heading:clip(h.title,155),excerpt_line:p.i+1,excerpt:clip(p.text),terms:topics(h.title+" "+p.text).slice(0,14)};
 });
 const embedded=[...raw.matchAll(/SOURCE_ARCHIVE_BEGIN\s+filename=([^\s>]+)/g)].map(x=>x[1]);
 const variants=path.basename(f.path).match(/(?:G\d{1,2}[A-Z]?\d*|V\d+(?:[._]\d+)*|第[零一二三四五六七八九十百0-9]+章|2026[-_]?\d{2}[-_]?\d{2})/gi)||[];
 return {doc_id:"R213-"+String(ordinal).padStart(3,"0"),source_path:f.path,source_category:f.category,
  source_bytes:body.length,git_blob_sha_verified:sha,source_lines:lines.length,type:ext,
  headings_found:hs.length,source_outline:outline,embedded_archive_file_count:embedded.length,
  embedded_archive_file_examples:embedded.slice(0,18),version_labels:variants.slice(0,18),
  detected_topics:topics(raw),first_text_excerpt:clip(lines.find(s=>s.trim().length>20)||"",180),
  authority:"MACHINE_SCREENED__SOURCE_CONTENT_UNADJUDICATED",semantic_claims_reviewed:0};
}
export function buildSourceDossiers(){
 const list=JSON.parse(fs.readFileSync(BACKLOG,"utf8")).sources;
 if(list.length!==213)throw Error("Expected 213 sources, found "+list.length);
 const docs=list.map((f,i)=>dossier(f,i+1));
 if(new Set(docs.map(d=>d.source_path)).size!==213)throw Error("Duplicate paths");
 const filemap=new Map(docs.map(d=>[d.source_path,fs.readFileSync(path.join(ROOT,d.source_path),"utf8").split(/\r?\n/)]));
 for(const d of docs)for(const p of d.source_outline){
  if(!filemap.get(d.source_path)[p.excerpt_line-1]?.trim().startsWith(p.excerpt))throw Error("Invalid quote anchor "+d.source_path+":"+p.excerpt_line);
 }
 const categories={};for(const d of docs)categories[d.source_category]=(categories[d.source_category]||0)+1;
 return {schema:"mega-213-source-dossiers-v1",files_count:docs.length,source_categories:categories,
  source_sections_indexed:docs.reduce((n,d)=>n+d.source_outline.length,0),
  coverage_definition:"213 physical originals read, source blobs checked, sections line-quoted. Not full semantic adjudication, Canon selection or chronology.",
  semantic_review_complete_files:0,dossiers:docs};
}
function main(){
 const result=buildSourceDossiers();
 if(process.argv.includes("--check")){
  if(fs.existsSync(OUT)){
   const saved=JSON.parse(fs.readFileSync(OUT,"utf8"));
   if(saved.files_count!==213||saved.source_sections_indexed!==result.source_sections_indexed)throw Error("Generated index drift");
   if(JSON.stringify(saved.dossiers.map(d=>d.git_blob_sha_verified))!==JSON.stringify(result.dossiers.map(d=>d.git_blob_sha_verified)))throw Error("Index SHA drift");
  }
  console.log(JSON.stringify({ok:true,files:213,sections:result.source_sections_indexed}));return;
 }
 fs.writeFileSync(OUT,JSON.stringify(result,null,2)+"\n");
 const batchSize=16;
 const manifest={schema:"mega-213-batch-manifest-v1",files:213,sections:result.source_sections_indexed,batches:[]};
 for(let from=0;from<result.dossiers.length;from+=batchSize){
  const part=result.dossiers.slice(from,from+batchSize),to=from+part.length;
  const fmt=n=>String(n).padStart(3,"0");
  const file="213證據索引_"+fmt(from+1)+"-"+fmt(to)+".json";
  const payload={schema:"mega-213-evidence-chunk-v1",range:[from+1,to],files:part.length,dossiers:part,
   warning:"源文摘錄與關鍵字未做人物、版本和權威的完整語義審核，不可視為Canon。"};
  fs.writeFileSync(path.join(HERE,file),JSON.stringify(payload,null,2)+"\n");
  manifest.batches.push({file,range:[from+1,to],sources:part.length,sections:part.reduce((n,d)=>n+d.source_outline.length,0)});
 }
 fs.writeFileSync(path.join(HERE,"213份來源索引分卷清單.json"),JSON.stringify(manifest,null,2)+"\n");
 console.log(JSON.stringify({file:OUT,files:213,sections:result.source_sections_indexed,batches:manifest.batches.length}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
