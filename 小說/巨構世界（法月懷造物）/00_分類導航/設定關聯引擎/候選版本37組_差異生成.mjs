#!/usr/bin/env node
// Candidate-version literal line comparison, NOT a human semantic ruling.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";
const HOME=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.resolve(HOME,"../..");
const INPUT=path.join(HOME,"舊來源逐檔語義用途回收_候選77份.json");
const OUT=path.join(HOME,"候選版本37組_逐行文字差異證據.json");
const gitBlob=b=>crypto.createHash("sha1").update("blob "+b.length+"\0").update(b).digest("hex");
const norm=s=>s.replace(/[\u200b-\u200d\ufeff]/g,"").replace(/[ \t\r]+/g,"").trim();
function good(s){
 const t=s.trim();
 if(t.length<22||t.length>1900)return false;
 if(/^(?:[#>]|-{3,}|\|[:|-]+\||\x60{3}|<path|<rect|<g)/.test(t))return false;
 return true;
}
function read(c){
 const p=path.resolve(ROOT,c.source_path);
 if(!p.startsWith(ROOT+path.sep))throw Error("Path escape: "+c.id);
 const bytes=fs.readFileSync(p);
 const sha=gitBlob(bytes);
 if(sha!==c.source_git_blob_sha)throw Error("SHA drift: "+c.id);
 const lines=bytes.toString("utf8").split(/\r?\n/);
 const items=lines.map((quote,i)=>({line:i+1,quote:quote.trim(),key:norm(quote)})).filter(x=>good(x.quote));
 const map=new Map();
 for(const v of items){const existing=map.get(v.key)||[];existing.push(v);map.set(v.key,existing);}
 return {id:c.id,path:c.source_path,sha,lines:lines.length,items,map,largeLines:lines.filter(s=>s.length>1900).length};
}
function compare(a,b,e){
 const shared=a.items.filter(x=>b.map.has(x.key)).length;
 const added=b.items.filter(x=>!a.map.has(x.key));
 const removed=a.items.filter(x=>!b.map.has(x.key));
 const ratio=shared/Math.max(a.items.length,b.items.length,1);
 const preview=arr=>arr.filter(x=>x.quote.length>=30).slice(0,9).map(x=>({line:x.line,excerpt:x.quote.slice(0,330)}));
 const comparable=a.items.length>=4&&b.items.length>=4;
 return {id:e.id,from:e.from,to:e.to,relation:e.relation,
   from_source:a.path,to_source:b.path,from_blob_sha:a.sha,to_blob_sha:b.sha,
   original_lines:{from:a.lines,to:b.lines},text_rows:{from:a.items.length,to:b.items.length},
   shared_literal_lines:shared,shared_ratio:Math.round(ratio*10000)/10000,
   text_overlap_status:!comparable?"UNCOMPARABLE_SOURCE_LINE_BREAKS":ratio>=.93?"HIGH_LITERAL_OVERLAP":ratio>=.60?"PARTIAL_LITERAL_OVERLAP":"LOW_LITERAL_OVERLAP_OR_DIFFERENT_SCOPE",
   added_count:added.length,removed_count:removed.length,
   added_line_evidence:preview(added),removed_line_evidence:preview(removed),
   large_lines_skipped:{from:a.largeLines,to:b.largeLines},
   caveat:"本項只是逐行字面重用與差異證據，不能由新增/刪除行自動推論敘事版本採納、角色知情及世界Canon。"};
}
export function buildVersionDifferences(){
 const roles=JSON.parse(fs.readFileSync(INPUT,"utf8"));
 if(roles.cards.length!==77||roles.version_links.length!==37)throw Error("Version role data count differs");
 const readMap=new Map(roles.cards.map(c=>[c.id,read(c)]));
 const comparisons=roles.version_links.map(e=>{
  if(!readMap.has(e.from)||!readMap.has(e.to))throw Error("Unknown endpoint: "+e.id);
  return compare(readMap.get(e.from),readMap.get(e.to),e);
 });
 const data={schema:"mega-candidate-37-verifiable-literal-diffs-v1",original_sources:77,version_edges:comparisons.length,
   method:"GIT_SHA_VERIFIED_EXACT_NORMALIZED_TEXT_LINE_COMPARISON",
   note:"保存真實行號供後續版本語義核對，不能把全部文本差異視為已由作者定案。",
   comparisons};
 for(const x of comparisons){
  for(const side of ["added","removed"]){
   const p=path.join(ROOT,side==="added"?x.to_source:x.from_source);
   const original=fs.readFileSync(p,"utf8").split(/\r?\n/);
   for(const e of x[side+"_line_evidence"]){
    if(!original[e.line-1]?.trim().startsWith(e.excerpt))throw Error("Line quote mismatch: "+x.id);
   }
  }
 }
 return data;
}
function main(){
 const data=buildVersionDifferences();
 if(process.argv.includes("--check")){
  if(fs.existsSync(OUT)){
   const old=JSON.parse(fs.readFileSync(OUT,"utf8"));
   if(JSON.stringify(old)!==JSON.stringify(data))throw Error("Generated historical version index drift");
  }
  console.log(JSON.stringify({ok:true,version_edges:37,sources:77}));return;
 }
 fs.writeFileSync(OUT,JSON.stringify(data,null,2)+"\n");
 console.log(JSON.stringify({written:OUT,version_edges:37,sources:77}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main();
