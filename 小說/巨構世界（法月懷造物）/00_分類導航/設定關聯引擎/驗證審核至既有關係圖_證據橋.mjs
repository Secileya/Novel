#!/usr/bin/env node
/** Verify scoped source-audit ↔ existing domain graph references. No Canon write. */
import fs from "node:fs";
import path from "node:path";
import {createHash} from "node:crypto";
import {fileURLToPath} from "node:url";
const HOME=path.dirname(fileURLToPath(import.meta.url)),PROJECT=path.resolve(HOME,"../..");
const read=(n)=>JSON.parse(fs.readFileSync(path.join(HOME,n),"utf8"));
const bridge=read("審核命題至既有關係圖_雙向證據橋.json");
const board=read("AI接手_工作板.json");
const g=read("高優先規則與關聯.json");
const v=read("版本取代與相容決策鏈.json");
const t=read("人物時期與知情矩陣.json");
const p=read("人物組織與社會關係圖.json");
const c=read("容器與子單元登記.json");
const eco=read("生態產業與制度因果網.json");
const cross=read("跨層文明生態依賴網.json");
const allAudits=board.audited_batch_paths.map(ref=>{
 if(!ref.startsWith("00_分類導航/設定關聯引擎/")||ref.split("/").includes(".."))throw Error("unsafe audit path");
 return JSON.parse(fs.readFileSync(path.join(PROJECT,ref),"utf8"));
});
const actual=new Map(allAudits.flatMap(a=>a.records).map(a=>[a.id,a]));
const targets={
 entity:new Set(g.entities.map(x=>x.id)),
 claim:new Set(g.claims.map(x=>x.id)),
 version:new Set(v.records.map(x=>x.id)),
 temporal_phase:new Set(t.phases.map(x=>x.id)),
 social_entity:new Set(p.entities.map(x=>x.id)),
 social_relation:new Set(p.edges.map(x=>x.id)),
 container:new Set(c.containers.map(x=>x.id)),
 ecology_dependency:new Set(eco.edges.map(x=>x.id)),
 crosslayer_dependency:new Set(cross.edges.map(x=>x.id))
};
const bad=[],seenRecords=new Set(),seenLinks=new Set(),sourceCache=new Map();
function source(loc){
 if(!loc||typeof loc!=="string"||loc.startsWith("/")||loc.includes("\\")||loc.split("/").includes(".."))throw Error("unsafe source path");
 if(!sourceCache.has(loc)){
   const buf=fs.readFileSync(path.join(PROJECT,loc));
   const hash=createHash("sha1").update(Buffer.from("blob "+buf.length+"\0")).update(buf).digest("hex");
   sourceCache.set(loc,{hash,lines:buf.toString("utf8").split(/\r?\n/)});
 }
 return sourceCache.get(loc);
}
function verify(r){
 const errors=[],a=actual.get(r.audit_id);
 if(!a)errors.push("missing audit "+r.audit_id);
 if(seenRecords.has(r.audit_id))errors.push("duplicate audit "+r.audit_id);
 seenRecords.add(r.audit_id);
 if(!a)return errors;
 if(r.summary!==a.title||r.reviewed_status!==a.status)errors.push("stale audit summary/status "+r.audit_id);
 if(r.authority!=="SCOPE_LIMITED_CROSS_REFERENCE_ONLY__SEE_ORIGINAL_AUDIT_FOR_ACTUAL_AUTHORITY")errors.push("authority promotion "+r.audit_id);
 const first=a.evidence[0],anchor=r.primary_source_anchor;
 if(!anchor||anchor.path!==first.source_path||anchor.git_blob_sha!==first.git_blob_sha||anchor.line!==first.line)errors.push("primary evidence drift "+r.audit_id);
 try{const s=source(first.source_path);
    if(s.hash!==first.git_blob_sha||!s.lines[first.line-1]?.includes(first.quote))errors.push("Git SHA/line quote drift "+r.audit_id);
 }catch(err){errors.push(r.audit_id+" source: "+err.message)}
 if(!Array.isArray(r.relations)||r.relations.length<1)errors.push("no existing-graph endpoints "+r.audit_id);
 const local=new Set();
 for(const link of r.relations||[]){
   if(!targets[link.target_type]?.has(link.target_id))errors.push("dangling "+r.audit_id+" -> "+link.target_type+":"+link.target_id);
   if(link.connection!=="EVIDENCE_SCOPED_DOMAIN_RELEVANCE__NOT_CANON_PROMOTION")errors.push("unsafe promotion "+link.link_id);
   const key=link.target_type+":"+link.target_id;
   if(local.has(key))errors.push("duplicated endpoint "+r.audit_id+" "+key);
   local.add(key);
   if(seenLinks.has(link.link_id))errors.push("duplicated bridge ID "+link.link_id);
   seenLinks.add(link.link_id);
 }
 return errors;
}
for(const r of bridge.records)bad.push(...verify(r));
for(const k of actual.keys())if(!seenRecords.has(k))bad.push("unmapped original audit "+k);
if(bridge.audit_record_count!==actual.size||bridge.mapped_review_count!==seenRecords.size)bad.push("audit/bridge coverage mismatch");
if(bridge.links_count!==seenLinks.size)bad.push("link-count mismatch");
if(bridge.unmapped_review_ids.length)bad.push("nonempty unmapped list");
if(bridge.no_new_canon_or_hard_dependency_edges!==true)bad.push("scope guarantee missing");
if(process.argv.includes("--negative-test")){
 const broken=structuredClone(bridge.records[0]);
 broken.relations[0].target_id="DELIBERATELY_MISSING_TARGET";
 // isolate mutable seen-sets to avoid false duplicate in the fake fixture
 const pre=seenLinks.size, ids=seenRecords.size;
 if(!verify(broken).some(x=>x.includes("dangling")))bad.push("negative dangling edge was not rejected");
 const wrong=structuredClone(bridge.records[1]);wrong.authority="AUTHOR_CONFIRMED";
 if(!verify(wrong).some(x=>x.includes("authority promotion")))bad.push("negative authority upgrade was not rejected");
 if(pre>seenLinks.size||ids>seenRecords.size)bad.push("fixture corrupted state");
}
if(bad.length){console.error("證據橋失敗:\n"+bad.join("\n"));process.exitCode=1;}
else console.log("審核→既有關係圖："+actual.size+"／"+actual.size+"條定向命題均連到有效節點；"+bridge.links_count+"條非Canon證據關聯；無斷鏈、無整檔結案推定");
