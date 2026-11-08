// Recover text-level evidence passages from ALL existing project sources.
// Source-preserving mechanical segmentation, NOT semantic Canon verification.
// Node.js 20+ standard library, no persistence and no dependency.
function normalized(s) {
  return String(s || "").normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}
export function extractPassages(doc) {
  const text=String(doc.body || "");
  const lines=text.split(/\r?\n/);
  const result=[];
  let heading="",archive=null,buffer=[],start=1;
  const flush=()=>{
    if (!buffer.length)return;
    const raw=buffer.join("\n").trim();
    if (!raw){buffer=[];return;}
    const maximum=1300;
    for(let offset=0;offset<raw.length;offset+=maximum){
      const segment=raw.slice(offset,offset+maximum);
      if(!segment.trim())continue;
      result.push({source_path:doc.path,line_start:start,line_end:start+buffer.length-1,
        heading,embedded_archive_filename:archive,text:segment,
        extraction_status:"AUTOMATIC_PASSAGE__AUTHORITY_NOT_REVIEWED"});
    }
    buffer=[];
  };
  for(let i=0;i<lines.length;i++){
    const line=lines[i],t=line.trim();
    const opening=t.match(/SOURCE_ARCHIVE_BEGIN\s+filename=([^\s>]+)/);
    const closing=t.includes("SOURCE_ARCHIVE_END");
    if(opening){flush();archive=opening[1];continue;}
    if(closing){flush();archive=null;continue;}
    if(/^#{1,6}\s/.test(t)){
      flush();heading=t.replace(/^#{1,6}\s*/,"");start=i+1;
      buffer.push(t);flush();continue;
    }
    if(!t){flush();continue;}
    if(!buffer.length)start=i+1;
    buffer.push(line);
    if(buffer.join("\n").length>3600)flush();
  }
  flush();
  return result;
}
export function buildPassageInventory(documents){
  const passages=[],fileCounts={},byCategory={};
  for(const d of documents){
    const items=extractPassages(d);
    fileCounts[d.path]=items.length;
    byCategory[d.kind]=(byCategory[d.kind]||0)+items.length;
    passages.push(...items);
  }
  return {files_with_passages:Object.keys(fileCounts).filter(x=>fileCounts[x]>0).length,
    files_without_passages:Object.keys(fileCounts).filter(x=>fileCounts[x]===0),
    total_passages:passages.length,by_category:byCategory,passages};
}
export function searchPassages(passages,terms,options={}){
  const limit=options.limit||24,perFile=options.perFile||3;
  const words=[...new Set(terms.map(normalized).filter(w=>w.length>=2))].slice(0,100);
  const ranked=[];
  for(const p of passages){
    const body=normalized(p.text),head=normalized(p.heading),fname=normalized(p.source_path);
    const matching=words.filter(w=>body.includes(w)||head.includes(w)||fname.includes(w));
    if(!matching.length)continue;
    let score=0;
    for(const w of matching){
      if(body.includes(w))score+=3+Math.min(5,w.length);
      if(head.includes(w))score+=7;
      if(fname.includes(w))score+=3;
    }
    if(p.embedded_archive_filename && /w02|w03|w04|交通|候選|生態|人物/i.test(words.join(" ")))score+=1;
    ranked.push({p,score,matched_terms:matching.slice(0,12)});
  }
  ranked.sort((a,b)=>b.score-a.score||a.p.source_path.localeCompare(b.p.source_path)||a.p.line_start-b.p.line_start);
  const counts=new Map(),hits=[];
  for(const r of ranked){
    const file=r.p.source_path;
    if((counts.get(file)||0)>=perFile)continue;
    counts.set(file,(counts.get(file)||0)+1);
    hits.push({...r.p,score:r.score,matched_terms:r.matched_terms,
      source_text_excerpt:r.p.text.slice(0,900)});
    delete hits[hits.length-1].text;
    if(hits.length>=limit)break;
  }
  return {matched_passages:hits,matched_passages_total:ranked.length,
    note:"逐段原文抽取，按現有檔案行號定位；未逐條語義審查，不能依此宣布Canon或候選已採用。SOURCE_ARCHIVE來源在合冊內且保留封存原名。"};
}
