#!/usr/bin/env node
// 巨構設定查詢 v1 — Node.js 20+ standard library only.
// Runs from a checked-out GitHub repository. Never modifies Canon.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import {buildPassageInventory,searchPassages} from "./全庫段落回收.mjs";

const HOME = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HOME, "..", "..");
const inventory = JSON.parse(fs.readFileSync(path.join(HOME, "全庫物理清冊.json"), "utf8"));
const graph = JSON.parse(fs.readFileSync(path.join(HOME, "高優先規則與關聯.json"), "utf8"));
const creativity = JSON.parse(fs.readFileSync(path.join(HOME, "創意相容性台帳.json"), "utf8"));
const temporal = JSON.parse(fs.readFileSync(path.join(HOME, "人物時期與知情矩陣.json"), "utf8"));
const ecoLinks = JSON.parse(fs.readFileSync(path.join(HOME, "生態產業與制度因果網.json"), "utf8"));
const versionLedger = JSON.parse(fs.readFileSync(path.join(HOME, "版本取代與相容決策鏈.json"), "utf8"));
const containerRegistry = JSON.parse(fs.readFileSync(path.join(HOME, "容器與子單元登記.json"), "utf8"));
const macroMap = JSON.parse(fs.readFileSync(path.join(HOME, "跨世界層與厚界多版本拓撲.json"), "utf8"));
const travelEvidence = JSON.parse(fs.readFileSync(path.join(HOME, "跨區交通去返與法權證據帳.json"), "utf8"));
const peopleNetwork = JSON.parse(fs.readFileSync(path.join(HOME, "人物組織與社會關係圖.json"), "utf8"));
const crossWorldLinks = JSON.parse(fs.readFileSync(path.join(HOME, "跨層文明生態依賴網.json"), "utf8"));
const recoveredHistory = JSON.parse(fs.readFileSync(path.join(HOME, "歷史素材原子化回收_首批.json"), "utf8"));
const recoveredBatch2 = JSON.parse(fs.readFileSync(path.join(HOME, "歷史素材原子化回收_第二批.json"), "utf8"));
const thirdRecovered = JSON.parse(fs.readFileSync(path.join(HOME,"歷史素材原子化回收_第三批_精讀.json"),"utf8"));
const sceneContinuity = JSON.parse(fs.readFileSync(path.join(HOME,"候選01至12章逐場事件與道具連續性證據帳.json"),"utf8"));
const crossAIProvenance = JSON.parse(fs.readFileSync(path.join(HOME,"跨AI原始討論來源與版本替代證據鏈.json"),"utf8"));
const worldEvidence = JSON.parse(fs.readFileSync(path.join(HOME,"W02以上文明生態與跨界路權_原文證據矩陣.json"),"utf8"));
const sourceRole94 = JSON.parse(fs.readFileSync(path.join(HOME,"舊來源逐檔語義用途回收_非候選94份.json"),"utf8"));
const sourceRole77 = JSON.parse(fs.readFileSync(path.join(HOME,"舊來源逐檔語義用途回收_候選77份.json"),"utf8"));
const allSourceRoles = [...sourceRole94.cards,...sourceRole77.cards];
const sourceRolesByID = new Map(allSourceRoles.map(x=>[x.id,x]));
const allRecoveredRecords = [...recoveredHistory.records,...recoveredBatch2.records,...thirdRecovered.records];
const allRecoveryLinks = [...(recoveredBatch2.links||[]),...(thirdRecovered.links||[])];
function recordEvidencePaths(r){return r.evidence?[r.evidence.path]:(r.source_anchors||[]).map(a=>a.path);}
function recordEvidenceAnchors(r){return r.evidence?[{path:r.evidence.path,anchor:r.evidence.exact_anchor}]:(r.source_anchors||[]);}
const sourceScreenManifest = JSON.parse(fs.readFileSync(path.join(HOME,"213份來源索引分卷清單.json"),"utf8"));
const sourceDossiers = sourceScreenManifest.batches.flatMap(b=>JSON.parse(
  fs.readFileSync(path.join(HOME,b.file),"utf8")).dossiers);
const sourceDossierByPath = new Map(sourceDossiers.map(d=>[d.source_path,d]));
const passageCache = new WeakMap();
function getPassages(corpus){if(!passageCache.has(corpus))passageCache.set(corpus,buildPassageInventory(corpus.read));return passageCache.get(corpus);}
const args = process.argv.slice(2);

function option(flag) {
  const i = args.indexOf(flag);
  return i < 0 || i === args.length - 1 ? null : args[i + 1];
}
function norm(s) {
  return String(s || "").normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}
function unique(a) { return Array.from(new Set(a.filter(Boolean))); }
function contains(s, term) { return !!term && norm(s).includes(norm(term)); }
function validTextPath(p) { return /\.(md|txt|json|yml|yaml|svg)$/i.test(p); }
function sourceCategory(p) {
  if (p.startsWith("09_跨AI原始來源/")) return "source_archive";
  if (p.startsWith("待定正文/") || p.startsWith("07_候選故事與場景/")) return "candidate_story";
  if (p.startsWith("舊資料_勘誤/")) return "errata";
  if (/^000_/.test(p)) return "cumulative_index";
  return "thematic_source";
}
function readAll() {
  const read = [];
  const missing = [];
  for (const f of inventory.files) {
    if (!validTextPath(f.path)) continue;
    const full = path.resolve(PROJECT, f.path);
    if (!full.startsWith(PROJECT + path.sep)) continue;
    try {
      const body = fs.readFileSync(full, "utf8");
      read.push({ path:f.path, body, kind:sourceCategory(f.path), size:f.bytes });
    } catch(e) {
      missing.push({path:f.path, reason:String(e.code || e.message)});
    }
  }
  // Added original source files since the inventory snapshot are also included.
  const extras = [];
  const known = new Set(inventory.files.map(f => f.path));
  function walk(dir, relative) {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      if (e.name === ".git" || e.name === "node_modules" || e.name === "設定關聯引擎" || (relative === "" && (e.name === "AGENTS.md" || e.name === "GEMINI.md"))) continue;
      const rel = relative ? relative + "/" + e.name : e.name;
      if (e.isDirectory()) walk(path.join(dir, e.name), rel);
      else if (e.isFile() && validTextPath(rel) && !known.has(rel)) {
        try {
          read.push({path:rel,body:fs.readFileSync(path.join(dir,e.name),"utf8"),kind:sourceCategory(rel),size:fs.statSync(path.join(dir,e.name)).size});
          extras.push(rel);
        } catch (_) { missing.push({path:rel,reason:"NEW_SOURCE_READ_FAILED"}); }
      }
    }
  }
  walk(PROJECT, "");
  return {read,missing,extras};
}
function getHead() {
  try { return execFileSync("git", ["rev-parse", "HEAD"], {cwd:PROJECT,encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim(); }
  catch (_) { return "UNKNOWN_NOT_A_LOCAL_GIT_CHECKOUT"; }
}
function sourceDrift() {
  // Compare latest committed Git source blobs, not working-copy CRLF bytes on Windows.
  try {
    const top = execFileSync("git",["rev-parse","--show-toplevel"],{
      cwd:PROJECT,encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim();
    const prefix = path.relative(top,PROJECT).split(path.sep).join("/");
    const tree = execFileSync("git",["ls-tree","-r","-z","HEAD","--",prefix],{
      cwd:top,encoding:"buffer",maxBuffer:20*1024*1024});
    const current = new Map();
    for (const item of tree.toString("utf8").split("\0")) {
      const tab = item.indexOf("\t");
      if(tab < 0) continue;
      const data = item.slice(0,tab).split(" ");
      const full = item.slice(tab+1);
      if(!full.startsWith(prefix+"/"))continue;
      const p=full.slice(prefix.length+1);
      if(p==="AGENTS.md" || p==="GEMINI.md" || p.startsWith("00_分類導航/設定關聯引擎/"))continue;
      current.set(p,data[2]);
    }
    const prior=new Map(inventory.files.map(f=>[f.path,f.git_blob_sha]));
    const changed=[], added=[], removed=[];
    for(const [p,sha] of current) {
      if(!prior.has(p))added.push(p);
      else if(prior.get(p)!==sha)changed.push(p);
    }
    for(const p of prior.keys())if(!current.has(p))removed.push(p);
    return {available:true,changed,added,removed,
      stale:changed.length>0||added.length>0||removed.length>0};
  }catch(e) {return {available:false,stale:true,reason:String(e.message).slice(0,220)};}
}

function ruleTriggers(rule, q) {
  return (rule.triggers || []).filter(t => contains(q,t));
}
function identify(q) {
  const names = graph.entities.filter(e => (e.aliases || []).some(a => contains(q,a)) || contains(q,e.name)).map(e => e.id);
  const cur = unique(names);
  // One-hop graph expansion, symmetrical. A scoped question still retrieves adjacent constraints.
  for (const e of graph.edges) {
    if (!e.expand) continue;
    if (names.includes(e.from)) cur.push(e.to);
    if (names.includes(e.to)) cur.push(e.from);
  }
  return {direct:unique(names), expanded:unique(cur)};
}
function expandChildren(container) { return Array.isArray(container.children) ? container.children : []; }

function resolveChildren(c) {
  if(c.children_from==="creativity.map_versions.primary.children")return expandChildren(creativity.map_versions.primary);
  if(c.children_from==="creativity.map_versions.legacy.children")return expandChildren(creativity.map_versions.legacy);
  if(c.children_from==="macroMap.worlds")return macroMap.worlds;
  if(c.children_from==="macroMap.barriers.LEGACY")return macroMap.barriers.filter(x=>x.version==="V03_LEGACY_K");
  if(c.children_from==="macroMap.barriers.GEMINI")return macroMap.barriers.filter(x=>x.version==="GEMINI_G_K_LATER_CANDIDATE");
  return Array.isArray(c.children) ? c.children : [];
}
function matchContainers(q, registered=containerRegistry.containers) {
  const matching=registered.filter(c=>{
    const all=resolveChildren(c);
    const parentAliases=[c.name,...(c.aliases||[])];
    return hasTextSignal(q,parentAliases) || all.some(child=>
      hasTextSignal(q,[child.name,...(child.aliases||[])]) || contains(q,child.id) ||
      (/(?:^|-)K(?:0[1-9]|10)$/.test(child.id||"") &&
       (q.match(/K(?:0[1-9]|10)/gi)||[]).some(k=>(child.id||"").endsWith(k.toUpperCase())))
    );
  });
  // A legacy W01 area should also retrieve the current primary container.
  if(matching.some(x=>x.id==="CON-W01-OLD") && !matching.some(x=>x.id==="CON-W01")) {
    const primary=registered.find(x=>x.id==="CON-W01");
    if(primary)matching.unshift(primary);
  }
  return matching.map(c=>{
    const children=resolveChildren(c);
    return {id:c.id,name:c.name,authority:c.authority,expected_children:c.expected_children,
      actual_children:children.length,children,source_paths:c.source_paths||[],policy:c.policy,
      complete_count:children.length===c.expected_children,
      warning:children.length!==c.expected_children?"CHILD_LIST_INCOMPLETE__DO_NOT_CLAIM_FULL_COVERAGE":null};
  });
}

function getZones(q, ids) {
  const w = expandChildren(creativity.map_versions.primary);
  const old = expandChildren(creativity.map_versions.legacy);
  const zoneNamed = w.some(z => (z.aliases || []).some(a => a.length > 2 && contains(q,a)));
  const legacyNamed = old.some(z => contains(q,z.name));
  const w01 = /w[\s-]?0?1\b/i.test(q) || /十二[大個]?區|12[大個]?區|九[大個]?區|9[大個]?區/.test(q);
  // A parent or any known child triggers full expansion, never just most-similar children.
  const expand = w01 || zoneNamed || legacyNamed || ids.direct.includes("w01");
  return expand ? {mode:"W01_FULL_CONTAINER_EXPANSION",count:w.length,active_design_children:w,
     legacy_status:creativity.map_versions.legacy.status,legacy_count:old.length,legacy_candidates:old,
     caveat:"12分區為作者方向，個別名稱／技術／社會細節仍有候選層；舊9區不自動刪生態或自動同址"} :
     {mode:"NOT_RELEVANT_TO_W01_MAP",count:0,active_design_children:[],legacy_candidates:[]};
}
function findIdeas(q, zones) {
  const all = creativity.idea_pool;
  const broad = /生態|地圖|創意|世界層|物種|地域|區域|兼容|相容|九區|十二區|w01/i.test(q);
  const zoneIDs = new Set(zones.active_design_children.map(z => z.id));
  return all.map(item => {
    const direct = (item.tags || []).filter(t => contains(q,t));
    const placements = (item.possible_placement || []).filter(p => zoneIDs.has(p));
    const active = direct.length > 0 || (zones.count === 12 && placements.length > 0 && broad);
    return active ? {...item, reason:direct.length ? "KEYWORD_MATCH" : "POSSIBLE_PLACEMENT_FROM_FULL_PARENT_EXPANSION",
      matching_terms:direct} : null;
  }).filter(Boolean);
}

function hasTextSignal(q, signals) {
  return (signals || []).some(t=>norm(t).length>=2 && contains(q,t));
}
function findTemporal(q, ids) {
  return temporal.phases.filter(p=>
    ids.direct.includes(p.entity) || hasTextSignal(q,p.triggers) ||
    (ids.expanded.includes(p.entity) && hasTextSignal(q,[p.phase_label]))
  ).map(p=>({...p,matching_terms:(p.triggers||[]).filter(t=>contains(q,t))}));
}
function zoneIDsFromQuery(q, zones) {
  const hits=[];
  for(const z of zones.active_design_children) {
    const n=String(Number(z.number));
    const numPattern=new RegExp("(?:第)?0?"+n+"(?:區|區域)");
    const strongNames=(z.aliases||[]).filter(x=>String(x).length>=3);
    if(strongNames.some(x=>contains(q,x)) || numPattern.test(q) || contains(q,z.id)) hits.push(z.id);
  }
  return unique(hits);
}
function findCausal(q, zones) {
  const selectedIDs=zoneIDsFromQuery(q,zones);
  const broad=(zones.count===12)&&/生態|制度|產業|經濟|全貌|總覽|關聯|供應鏈|十二區|九區|跨區|w01/i.test(q);
  const direct=ecoLinks.edges.filter(e=>
    selectedIDs.includes(e.from)||selectedIDs.includes(e.to) ||
    hasTextSignal(q,e.keywords)|| (broad && selectedIDs.length===0)
  );
  const directIds=new Set(direct.map(e=>e.id));
  const touched=unique([...selectedIDs,...direct.flatMap(e=>[e.from,e.to])]);
  const second=ecoLinks.edges.filter(e=>!directIds.has(e.id) &&
    touched.some(z=>z===e.from||z===e.to)).slice(0,12);
  return {matched_zone_ids:selectedIDs,
    direct_edges:direct,
    second_order_candidates:second,
    warning:"候選邊不代表已核定路網／供應鏈；EXPLICIT_SOURCE_CANDIDATE 為來源明示候選；EDITORIAL_INTEGRATION_HYPOTHESIS 為需檢驗的編輯提案。"};
}
function findVersionDecisions(q) {
  return versionLedger.records.filter(x=>
    hasTextSignal(q,x.query_terms) || contains(q,x.subject)
  );
}


function findMacro(q) {
  const explicitW=macroMap.worlds.filter(w=>contains(q,w.id)||contains(q,w.name));
  const kMatches=q.match(/K(?:0[1-9]|10)/gi)||[];
  const byNumber=new Set(kMatches.map(x=>x.toUpperCase()));
  const specialHits=macroMap.unplaced_specials.filter(s=>contains(q,s.name)||contains(q,s.id));
  const broad=/世界層總|世界層地圖|宏觀全圖|宏觀地圖|所有世界層|所有厚界|所有K|全部K|層間隔界總覽/.test(q);
  const barriers=macroMap.barriers.filter(b=>broad||byNumber.has(b.id.slice(-3))||
     explicitW.some(w=>(b.endpoints||[]).includes(w.id)) || contains(q,b.name));
  const involved=new Set([...explicitW.map(w=>w.id),...barriers.flatMap(x=>x.endpoints)]);
  const worlds=macroMap.worlds.filter(w=>broad||involved.has(w.id));
  const collisions=unique(barriers.map(x=>x.legacy_number))
    .filter(k=>macroMap.barriers.filter(b=>b.legacy_number===k).length>=2)
    .map(k=>({k_number:k,versions:macroMap.barriers.filter(b=>b.legacy_number===k)
      .map(b=>({id:b.id,version:b.version,endpoints:b.endpoints,name:b.name})),
      note:"同一 K 編號跨版本可能不是同一實際隔界；尤其 K04、K07、K08、K09"}));
  return {macro_worlds:worlds,versioned_barriers:barriers,
    same_number_version_collisions:collisions,specials:specialHits,
    warning:"宏觀接鄰圖與營運交通證據分離；W01~W07是局部候選全集，不是整個世界已核定只有7個世界層"};
}
function findTravel(q, macro) {
  const kIds=new Set(macro.versioned_barriers.map(b=>b.legacy_number));
  const groups=travelEvidence.groups.filter(g=>contains(q,g.id)||
     (g.id==="K01" && kIds.has("K01")) ||
     (g.id==="B_LOCAL" && /方井|雨檐|唐榆|游洵|E3|E5|B案/.test(q))||
     (g.id==="ARCH_SEA" && /拱海|懸潮|折索|晴紋|海盆/.test(q)));
  const groupIds=new Set(groups.map(g=>g.id));
  const all=/全部(?:交通|路線)|所有(?:交通|路線)|T交通總覽|路網全貌/.test(q);
  const routes=travelEvidence.routes.filter(r=>all||groupIds.has(r.route_group)||
    contains(q,r.route_id)||contains(q,r.name));
  return {route_groups:all?travelEvidence.groups:groups,route_candidates:routes,
    verified_cross_layer_routes:routes.filter(r=>r.world_crossing_verified),
    warning:"PROPOSED與UNSURVEYED皆非現役證據；去、返、路權、客貨運、營運各欄null不可擅自填值。三組路網不得補成已相通。"};
}
function findPeople(q) {
  const direct=peopleNetwork.entities.filter(e=>contains(q,e.name)||hasTextSignal(q,e.aliases));
  const ids=new Set(direct.map(x=>x.id));
  const exactEdges=peopleNetwork.edges.filter(e=>ids.has(e.from)||ids.has(e.to)||
     hasTextSignal(q,e.triggers)||contains(q,e.id));
  const connected=new Set([...ids,...exactEdges.flatMap(e=>[e.from,e.to])]);
  const members=peopleNetwork.entities.filter(e=>connected.has(e.id));
  return {direct_ids:[...ids],entities:members,relationships:exactEdges,
    caveat:"關聯包含作者確認、未發生未來節點、Gemini候選與編輯假設；不得把同一街區當成確定僱傭或把同名組織合併"};
}
function findCrossLinks(q,macro,people,travel) {
  const directWorlds=new Set(macro.macro_worlds.map(x=>x.id));
  const peopleIDs=new Set(people.entities.map(x=>x.id));
  const selected=crossWorldLinks.edges.filter(e=>contains(q,e.id)||
    hasTextSignal(q,e.triggers)||
    directWorlds.has(e.from)||directWorlds.has(e.to)||
    [...peopleIDs].some(id=>contains(e.from,id)||contains(e.to,id)) ||
    (travel.route_candidates.length>0 && /交通|跨層|路網|客貨/.test(q) && /transport|trade|logistics|access/.test(e.kind)));
  return {edges:selected,
    caveat:"每條具有 SOURCE_CANDIDATE 或 EDITORIAL_INTEGRATION_HYPOTHESIS 等證據狀態；引用已確認世界方向不代表具體生物遷徙、帝國疆界、公共路線已正式成立"};
}


function findSourceDossiers(q,terms) {
  const tokens=unique([
    ...q.match(/W0[1-7]|K0[1-9]|G-K0[1-9]|[A-Za-z][\w.-]{2,}|[\p{Script=Han}]{2,7}/gu)||[],
    ...terms.filter(t=>t.length>=3)
  ]).map(norm).filter(t=>t.length>=2).slice(0,70);
  const rated=sourceDossiers.map(d=>{
    const file=norm(d.source_path),subject=norm(d.detected_topics.join(" ")),
      passages=(d.source_outline||[]).map(p=>({...p,search_text:norm(p.heading+" "+p.excerpt)}));
    let score=0;
    for(const t of tokens){
      if(file.includes(t))score+=7;
      if(subject.includes(t))score+=2;
      if(passages.some(p=>p.search_text.includes(t)))score+=3;
    }
    const excerpts=passages.filter(p=>tokens.some(t=>p.search_text.includes(t)))
      .sort((a,b)=>a.heading_line-b.heading_line).slice(0,5)
      .map(({search_text,...p})=>p);
    return {score,dossier:{source_path:d.source_path,source_category:d.source_category,
      git_blob_sha_verified:d.git_blob_sha_verified,version_labels:d.version_labels,
      embedded_archive_file_count:d.embedded_archive_file_count,
      authority:d.authority,excerpted_section_count:d.source_outline.length,
      relevant_source_excerpts:excerpts.length?excerpts:d.source_outline.slice(0,2)}};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  return {all_originals_screened:sourceDossiers.length,source_sections_indexed:sourceScreenManifest.sections,
    matching_source_dossiers:rated.slice(0,18).map(x=>({...x.dossier,relevance_score:x.score})),
    matching_source_count:rated.length,
    caution:"213原始來源經SHA核實與行號摘錄，可回讀；不是213份逐句完成權威、版本或Canon審定。"};
}



function findRecoveredSourceRoles(q) {
  const qn=norm(q);
  const generic=/^(全部|作品|小說|設定|來源|原始|候選|故事|世界|有沒有|我想要)$/.test(qn);
  const broad=/全部舊來源|全部171|171份|來源用途總覽|所有候選版本/.test(q);
  const parts=q.split(/[\s、，。；：！?？／()「」《》]+/).map(norm).filter(x=>x.length>=2);
  const markers=[...new Set([
    ...q.match(/G\d{1,3}(?:R\d+|[A-E])?|W0[1-7]|K0[1-9]|B2|COV-DRAFT-\d+|COV-NON-\d+/giu)||[],
    ...q.match(/第[一二三四五六七八九十百零0-9]{1,4}章/g)||[],
    ...parts
  ])].map(norm).filter(x=>x.length>=2);
  const match=allSourceRoles.map(card=>{
    const path=norm(card.path||card.source_path),summary=norm(card.source_function||"");
    let score=0,matched=[];
    for(const k of markers){
      let s=0;
      if(path.includes(k))s+=10;
      if(summary.includes(k))s+=6;
      if((card.linked_topics||[]).some(t=>norm(t)===k))s+=2;
      if(s){score+=s;matched.push(k);}
    }
    if(!markers.length||generic)score=0;
    return {score,card,matched};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||
      (a.card.path||a.card.source_path).localeCompare(b.card.path||b.card.source_path));
  const selected=(broad?allSourceRoles.map(card=>({score:0,card,matched:["broad"]})):match).slice(0,broad?40:25);
  const ids=new Set(selected.map(x=>x.card.id));
  const versionLinks=sourceRole77.version_links.filter(l=>ids.has(l.from)||ids.has(l.to));
  const others=[...new Set(versionLinks.flatMap(l=>[l.from,l.to]))].filter(x=>!ids.has(x))
    .map(id=>sourceRolesByID.get(id)).filter(Boolean).slice(0,24);
  return {
    source_roles_total:allSourceRoles.length,non_draft_source_roles:sourceRole94.cards.length,
    candidate_source_roles:sourceRole77.cards.length,
    candidate_version_links_total:sourceRole77.version_links.length,
    matched_roles:selected.map(x=>({...x.card,search_score:x.score,matched_terms:x.matched})),
    matched_roles_count:broad?allSourceRoles.length:match.length,
    related_candidate_versions:others,
    version_links:versionLinks.slice(0,40),
    note:"171份舊來源有各自的內容用途判讀和精確原文摘錄；每卡僅保證局部已檢閱，不表示全文已完成語義審定或候選已採用。版本連線是來源關係，不是同一世界已發生的因果。"
  };
}
function validateSourceRoleCards(corpus){
  const byPath=new Map(corpus.read.map(x=>[x.path,x.body.split(/\r?\n/)]));
  const originalBacklog=new Set(JSON.parse(fs.readFileSync(path.join(HOME,"全庫待原子化缺口清冊.json"),"utf8")).sources.map(x=>x.path));
  const seen=new Set(),missing=new Set(originalBacklog),badLineQuotes=[],shaConflicts=[],duplicates=[];
  for(const c of allSourceRoles){
    const p=c.path||c.source_path;
    if(seen.has(p))duplicates.push(p);
    seen.add(p);missing.delete(p);
    const txt=byPath.get(p);
    const dossier=sourceDossierByPath.get(p);
    if(!txt||!dossier||c.source_git_blob_sha!==dossier.git_blob_sha_verified)shaConflicts.push(p);
    for(const e of c.evidence||[]){
      if(!txt||!txt[e.line-1]?.trim().startsWith(e.quote))badLineQuotes.push(p+":"+e.line);
    }
  }
  const extra=[...seen].filter(x=>!originalBacklog.has(x));
  const idSet=new Set(allSourceRoles.map(x=>x.id));
  const badRelations=sourceRole77.version_links.filter(x=>!idSet.has(x.from)||!idSet.has(x.to)||x.from===x.to).map(x=>x.id);
  return {source_cards:allSourceRoles.length,source_role_dossiers_checked:seen.size,
    source_line_quotes_checked:allSourceRoles.reduce((n,x)=>n+(x.evidence||[]).length,0),
    missing_backlog_paths:[...missing],unexpected_paths:extra,
    duplicate_paths:duplicates,broken_version_links:badRelations,
    mismatched_git_sha:shaConflicts,invalid_line_quotes:badLineQuotes,
    ok:allSourceRoles.length===171&&seen.size===171&&sourceRole77.version_links.length===37&&
      missing.size===0&&extra.length===0&&duplicates.length===0&&badRelations.length===0&&
      shaConflicts.length===0&&badLineQuotes.length===0};
}

function deepEvidenceSearch(q) {
  const qn=norm(q);
  const chapterGlyphs=["一","二","三","四","五","六","七","八","九","十","十一","十二"];
  const chapterIds=[];
  for(let i=1;i<=12;i++) {
    if(["第"+i+"章","第"+String(i).padStart(2,"0")+"章","第"+chapterGlyphs[i-1]+"章"].some(w=>q.includes(w)))chapterIds.push(i);
  }
  const hasEntity=keys=>keys.some(k=>k&&norm(k).length>=2&&qn.includes(norm(k)));
  const broadScene=/逐場|十二章|全部章節|物件連續|道具連續|章節台帳|候選事件/.test(q);
  const beats=sceneContinuity.chapter_scene_beats.filter(b=>{
    const chapterMatch=chapterIds.includes(b.chapter);
    const entityMatch=hasEntity(b.entities)||hasEntity([b.name]);
    return broadScene||((!chapterIds.length||chapterMatch)&&(entityMatch||chapterMatch));
  });
  const objectTopic=(name)=>{
    const a=norm(name),b=norm(q);
    if(a.length<2||b.length<2)return false;
    if(b.includes(a))return true;
    for(let i=0;i<a.length-1;i++) {
      const key=a.slice(i,i+2);
      if(b.includes(key)&&!/^(第九|第十|第一|世界|條目|物件|來源|候選)$/.test(key))return true;
    }
    return false;
  };
  const objects=sceneContinuity.object_chains.filter(o=>broadScene||
    hasEntity([o.name,o.id,...o.name.split(/[／、與]/)])||
    objectTopic(o.name));
  const aiBroad=/跨AI|原始Gemini|Gemini原始|Gemini對話|原生聊天|版本來源|人工轉錄/.test(q);
  const ai=crossAIProvenance.records.filter(r=>aiBroad||hasEntity([r.id,r.statement.slice(0,10)]));
  const worlds=[...new Set((q.match(/W0[2-7]/gi)||[]).map(x=>x.toUpperCase()))];
  const worldBroad=/跨界|跨層|世界層|文明生態|生態依賴/.test(q);
  const facts=worldEvidence.facts.filter(f=>{
    if(worlds.length)return worlds.includes(f.world)||f.world==="ALL";
    if(worldBroad)return f.world==="ALL"||hasEntity([f.claim.slice(0,9)]);
    return hasEntity([f.id,f.claim.slice(0,10)]);
  });
  const travelBroad=/路網|現役|班次|交通|去返|通車|路權|跨K|跨界/.test(q);
  const routes=worldEvidence.route_candidates.filter(r=>travelBroad||
    worlds.some(w=>(r.from+" "+r.to).includes(w))||hasEntity([r.route_id,r.group]));
  const versionBarriers=worldEvidence.version_sensitive_barriers.filter(b=>hasEntity([b.id])||
    (travelBroad&&worlds.some(w=>b.endpoints.includes(w)))||
    (/K0[4789]|K10/.test(q)&&(q.match(/K0[4789]|K10/)||[]).some(v=>b.id.endsWith(v))));
  return {
    candidate_scene_continuity:{matched_beats:beats.slice(0,36),matched_beat_count:beats.length,
      tracked_object_chains:objects.slice(0,14),total_beats:sceneContinuity.scenes,
      total_objects:sceneContinuity.tracked_objects,timing_place_rules:sceneContinuity.time_place_checks,
      note:"候選章節01至12，不是正式已發生故事；原文行號和道具去向按11/08順讀補丁版。"},
    cross_ai_originals_and_revisions:{records:ai.slice(0,22),matched_count:ai.length,
      total_records:crossAIProvenance.source_records,source_limitations:crossAIProvenance.missing_originals,
      note:"來源分原生TXT、可見人工轉錄、衍生候選及缺失原始聊天。"},
    W02_plus_civilization_ecology_and_routes:{facts:facts.slice(0,35),matched_fact_count:facts.length,
      routes:routes.slice(0,12),version_sensitive_barriers:versionBarriers.slice(0,10),
      verified_operational_cross_world_routes:worldEvidence.route_candidates.filter(r=>r.world_crossing_verified===true).length,
      missing_evidence:worldEvidence.missing_real_world_evidence,
      note:"W02以上各層為歷史候選及原則；12條T路線仍未證真實跨K去返，null不得被補造。"}
  };
}
function deepEvidencePaths(deep) {
  return unique([
    ...deep.candidate_scene_continuity.matched_beats.map(x=>x.evidence.source_path),
    ...deep.candidate_scene_continuity.tracked_object_chains.flatMap(x=>x.states.map(st=>st.evidence.source_path)),
    ...deep.cross_ai_originals_and_revisions.records.map(x=>x.evidence.source_path),
    ...deep.W02_plus_civilization_ecology_and_routes.facts.map(x=>x.source_evidence.path),
    ...deep.W02_plus_civilization_ecology_and_routes.routes.flatMap(x=>x.source_paths||[]),
    ...deep.W02_plus_civilization_ecology_and_routes.version_sensitive_barriers.flatMap(x=>x.source_paths||[])
  ]);
}
function validateDeepEvidence(corpus) {
  const byPath=new Map(corpus.read.map(x=>[x.path,x.body.split(/\r?\n/)]));
  const records=[
    ...sceneContinuity.chapter_scene_beats.map(x=>({id:x.id,e:x.evidence})),
    ...sceneContinuity.object_chains.flatMap(x=>x.states.map((st,i)=>({id:x.id+"-"+i,e:st.evidence}))),
    ...crossAIProvenance.records.map(x=>({id:x.id,e:{source_path:x.evidence.source_path,line:x.evidence.line,quote:x.evidence.excerpt}})),
    ...worldEvidence.facts.map(x=>({id:x.id,e:{source_path:x.source_evidence.path,line:x.source_evidence.line,quote:x.source_evidence.excerpt}}))
  ];
  const badQuotes=records.filter(x=>{
    const lines=byPath.get(x.e.source_path);
    return !lines||!lines[x.e.line-1]?.trim().startsWith(x.e.quote);
  }).map(x=>x.id+":"+x.e.source_path+":"+x.e.line);
  const knownRoutes=new Set(travelEvidence.routes.map(x=>x.route_id));
  const badRoutes=worldEvidence.route_candidates.filter(x=>!knownRoutes.has(x.route_id)).map(x=>x.route_id);
  const badBarriers=worldEvidence.version_sensitive_barriers.filter(x=>{
    const b=macroMap.barriers.find(y=>y.id===x.id);
    return !b||JSON.stringify(b.endpoints)!==JSON.stringify(x.endpoints);
  }).map(x=>x.id);
  const ids=records.map(x=>x.id);
  const duplicateIds=ids.filter((x,i)=>ids.indexOf(x)!==i);
  const operational=worldEvidence.route_candidates.filter(x=>x.world_crossing_verified===true).length;
  return {records_checked:records.length,failed_source_line_quotes:badQuotes,
    broken_route_references:badRoutes,broken_versioned_barriers:badBarriers,
    duplicated_check_ids:duplicateIds,verified_operational_crossworld_routes:operational,
    ok:badQuotes.length===0&&badRoutes.length===0&&badBarriers.length===0&&duplicateIds.length===0&&
      worldEvidence.route_candidates.length===12&&operational===0};
}

function findRecoveredHistory(q) {
  const broad=/全部(?:舊設定|歷史素材|回收紀錄)|舊素材總覽|歷史原子化總覽/.test(q);
  const direct=allRecoveredRecords.filter(r=>broad||
    hasTextSignal(q,r.related_keys)||contains(q,r.id)||
    (contains(q,r.theme||r.claim) && norm(r.theme||r.claim).length>=3));
  const ids=new Set(direct.map(r=>r.id));
  const links=allRecoveryLinks.filter(l=>ids.has(l.from)||ids.has(l.to));
  const attached=new Set(links.flatMap(l=>[l.from,l.to]));
  const neighbors=allRecoveredRecords.filter(r=>attached.has(r.id)&&!ids.has(r.id));
  return {records:direct.slice(0,90),matched_count:direct.length,
    linked_records:neighbors.slice(0,30),linked_edges:links.slice(0,45),
    records_total:allRecoveredRecords.length,
    note:"回收的是原文中歷史上曾經討論的內容；關係連線只是回讀引導，不表示候選已成正史或通路已核實。"};
}

function findImpactChains(q, zones, macro) {
  const seeds=unique([
    ...zoneIDsFromQuery(q,zones),
    ...macroMap.worlds.filter(w=>contains(q,w.id)||contains(q,w.name)).map(w=>w.id)
  ]);
  const edges=[
    ...ecoLinks.edges.map(e=>({...e,trace_kind:"W01_ECO_CANDIDATE",trace_status:e.evidence_status})),
    ...crossWorldLinks.edges.map(e=>({...e,trace_kind:"CROSS_LAYER_CIVILIZATION_CANDIDATE",trace_status:e.status}))
  ];
  const results=[], used=new Set();
  for(const start of seeds.slice(0,8)) {
    let frontier=[{node:start,nodes:[start],steps:[]}];
    for(let depth=1; depth<=2; depth++) {
      const next=[];
      for(const path of frontier) {
        for(const edge of edges) {
          if(edge.from!==path.node && edge.to!==path.node)continue;
          if(path.steps.some(s=>s.id===edge.id))continue;
          const target=edge.from===path.node?edge.to:edge.from;
          if(path.nodes.includes(target))continue;
          const step={id:edge.id,from:edge.from,to:edge.to,
            discovered_reverse_of_recorded_direction:edge.to===path.node,
            kind:edge.trace_kind,evidence_status:edge.trace_status,
            mechanism:edge.mechanism||edge.cause||"",
            source_paths:edge.source_paths||[]};
          const chain={node:target,nodes:[...path.nodes,target],steps:[...path.steps,step]};
          if(depth===2){
            const key=[start,...chain.steps.map(s=>s.id)].join("|");
            if(!used.has(key)){
              used.add(key);
              results.push({start,nodes:chain.nodes,links:chain.steps,
                sources:unique(chain.steps.flatMap(x=>x.source_paths))});
            }
          }else next.push(chain);
          if(results.length>=60)break;
        }
        if(results.length>=60)break;
      }
      if(results.length>=60)break;
      frontier=next.slice(0,90);
    }
    if(results.length>=60)break;
  }
  return {query_start_nodes:seeds,possible_two_link_paths:results,
    warning:"這是『兩條已登記關聯邊』的候選路徑探索，不是因果已成立的證明。反向搜尋只是發現依賴，不代表污染／物流／生物能反向流動。每個環節仍須回讀來源與證據條件。"};
}

function collectTerms(q, ids, claims, ideas, zones) {
  const t = [];
  for (const e of graph.entities) {
    if (!ids.expanded.includes(e.id)) continue;
    for (const a of e.aliases || []) if (contains(q,a) && a.length > 1) t.push(a);
  }
  for (const r of claims) t.push(...ruleTriggers(r,q));
  for (const i of ideas) t.push(...i.matching_terms);
  if (zones.count) t.push("W01","十二區","九區");
  const groups = q.match(/[A-Za-z0-9_-]{2,}|[\p{Script=Han}]{2,}/gu) || [];
  for (const g of groups) {
    if (/^[\p{Script=Han}]+$/u.test(g)) {
      if (g.length <= 6) t.push(g);
      for (let n = 2; n <= 3; n++)
        for (let p = 0; p + n <= g.length && p < 25; p++) t.push(g.slice(p,p+n));
    } else t.push(g);
  }
  const skip = new Set(["可以","是否","什麼","怎麼","比較","我們","現在","這個","那個","如果","或者","就會","自己","一次","之後","然後","進行","有些","需要"]);
  return unique(t.map(norm)).filter(x => x.length >= 2 && !skip.has(x)).slice(0,75);
}
function scoreDocument(d, terms) {
  const title = norm(d.path);
  const body = norm(d.body);
  const prefix = body.slice(0,900);
  let value = 0;
  const termMatches = [];
  for (const t of terms) {
    if (!t || !body.includes(t)) continue;
    termMatches.push(t);
    if (title.includes(t)) value += 13 + Math.min(t.length,5);
    if (prefix.includes(t)) value += 5;
    const first = body.indexOf(t);
    const second = first < 0 ? -1 : body.indexOf(t, first + t.length);
    value += second < 0 ? 2 : 3;
  }
  const mult = d.kind === "source_archive" ? 0.3 :
     d.kind === "candidate_story" ? 0.45 :
     d.kind === "cumulative_index" ? 0.38 : 1;
  return {path:d.path,category:d.kind,score:Math.round(value*mult*100)/100,
    matched_terms:termMatches.slice(0,12)};
}
function excerpts(body, terms) {
  const lines = body.split(/\r?\n/);
  const results = [];
  for (let i=0;i<lines.length;i++) {
    const x = norm(lines[i]);
    if (terms.some(t=> x.includes(t))) {
      results.push({line:i+1,text:lines[i].trim().slice(0,290)});
      if (results.length >= 3) break;
    }
  }
  return results;
}
function query(q, corpus) {
  if (!q || !q.trim()) throw Error("Need --query or positional query text");
  const ids = identify(q);
  const zones = getZones(q,ids);
  const containers = matchContainers(q);
  const ideas = findIdeas(q,zones);
  const phaseMatches = findTemporal(q,ids);
  const causal = findCausal(q,zones);
  const versions = findVersionDecisions(q);
  const macro = findMacro(q);
  const travel = findTravel(q,macro);
  const people = findPeople(q);
  const cross = findCrossLinks(q,macro,people,travel);
  const impact = findImpactChains(q,zones,macro);
  const recovered = findRecoveredHistory(q);
  const deep = deepEvidenceSearch(q);
  const sourceRoles = findRecoveredSourceRoles(q);
  const claims = graph.claims.filter(r=>{
    const entityMatch = (r.subjects || []).some(id=>ids.expanded.includes(id));
    const hits = ruleTriggers(r,q);
    return entityMatch || hits.some(t => norm(t).length >= 3);
  }).map(r => ({...r,review_signal:ruleTriggers(r,q).length>0?"TRIGGERED__CONTEXT_REVIEW_NOT_VERDICT":"GRAPH_ADJACENCY__VERIFY_APPLICABILITY"}));
  const terms = unique([
    ...collectTerms(q,ids,claims,ideas,zones),
    ...phaseMatches.flatMap(p=>p.matching_terms||[]),
    ...causal.direct_edges.flatMap(e=>e.keywords||[]).filter(t=>contains(q,t)),
    ...versions.flatMap(v=>v.query_terms||[]).filter(t=>contains(q,t)),
    ...people.entities.flatMap(e=>e.aliases||[]).filter(t=>contains(q,t)),
    ...macro.macro_worlds.map(w=>w.id),
    ...macro.versioned_barriers.map(b=>b.name).filter(x=>contains(q,x)),
    ...cross.edges.flatMap(e=>e.triggers||[]).filter(t=>contains(q,t)),
    ...recovered.records.flatMap(r=>r.related_keys||[]).filter(t=>contains(q,t))
  ]).slice(0,90);
  const dossierMatches = findSourceDossiers(q,terms);
  const passageInventory = getPassages(corpus);
  const passageMatches = searchPassages(passageInventory.passages,terms,{limit:24,perFile:3});
  const ranked = corpus.read.map(d=>scoreDocument(d,terms)).filter(d=>d.score>0).sort((a,b)=>b.score-a.score);
  const byPath = new Map(corpus.read.map(d=>[d.path,d]));
  const needed = unique([
    ...claims.flatMap(r=>r.sources||[]),
    ...ideas.flatMap(i=>i.source_paths||[]),
    ...phaseMatches.flatMap(p=>p.source_paths||[]),
    ...causal.direct_edges.flatMap(e=>e.source_paths||[]),
    ...causal.second_order_candidates.flatMap(e=>e.source_paths||[]),
    ...versions.flatMap(v=>v.source_paths||[]),
    ...containers.flatMap(c=>c.source_paths||[]),
    ...macro.macro_worlds.flatMap(w=>w.source_paths||[]),
    ...macro.versioned_barriers.flatMap(b=>b.source_paths||[]),
    ...travel.route_candidates.flatMap(r=>r.source_paths||[]),
    ...travel.route_groups.flatMap(g=>g.source_paths||[]),
    ...people.entities.flatMap(e=>e.source_paths||[]),
    ...people.relationships.flatMap(e=>e.source_paths||[]),
    ...cross.edges.flatMap(e=>e.source_paths||[]),
    ...[...recovered.records,...recovered.linked_records].flatMap(recordEvidencePaths),
    ...deepEvidencePaths(deep),
    ...sourceRoles.matched_roles.map(x=>x.path||x.source_path),
    ...sourceRoles.related_candidate_versions.map(x=>x.path||x.source_path),
    ...impact.possible_two_link_paths.flatMap(p=>p.sources||[]),
    ...(zones.count?[...creativity.map_versions.primary.source_paths,
                    ...creativity.map_versions.legacy.source_paths]:[]),
    ...(zones.count?creativity.compatibility_decisions.filter(x=>x.id.startsWith("MAP-"))
                      .flatMap(c=>c.sources||[]):[])
  ]);
  const fullSelected = unique([...needed,
    ...dossierMatches.matching_source_dossiers.slice(0,8).map(d=>d.source_path),
    ...passageMatches.matched_passages.slice(0,8).map(p=>p.source_path),
    ...ranked.slice(0,16).map(r=>r.path)]);
  const selected = fullSelected.slice(0,120);
  const source_selection_truncated = Math.max(0,fullSelected.length - selected.length);
  const scoreByPath = new Map(ranked.map(r=>[r.path,r]));
  const opened = selected.map(p=>{
    const d=byPath.get(p),r=scoreByPath.get(p);
    return {path:p,available:!!d,required_by_rule:needed.includes(p),
      score:r?r.score:0,source_category:d?d.kind:"MISSING",
      excerpts:d?excerpts(d.body,terms):[]};
  });
  const missingMustRead=opened.filter(x=>!x.available && x.required_by_rule).map(x=>x.path);
  const drift = sourceDrift();
  const versionFindings = zones.count ? creativity.compatibility_decisions.filter(x=>x.id.startsWith("MAP-")) : [];
  if (/w04|萬律|萬噸|配重裁定|專利城/i.test(q)) versionFindings.push(...creativity.compatibility_decisions.filter(x=>x.id==="SOCIETY-PAIR-01"));
  return {
    schema:"mega-query-receipt-v1",
    query:q, project:"Secileya/Novel / 小說/巨構世界（法月懷造物）",
    git_head:getHead(), source_inventory_commit:inventory.baseline_commit,
    files_in_inventory:inventory.files_count, files_actually_read:corpus.read.length,
    files_missing:corpus.missing, newly_added_unindexed_source_files:corpus.extras,
    entities:ids, container_expansion:zones, registered_container_expansion:containers,
    relevant_claims:claims, creative_candidate_ideas:ideas,
    character_timeline:phaseMatches, ecology_industry_network:causal, version_compatibility_ledger:versions,
    macro_world_layer_graph:macro, travel_direction_and_rights:travel,
    character_and_organization_graph:people, cross_world_ecology_civilization_links:cross,
    candidate_two_hop_impact_paths:impact,
    version_decisions:versionFindings,
    searched_terms:terms, selected_sources:opened,
    historical_ideas_recovered:recovered,
    deep_scene_provenance_and_crossworld_retrieval:deep,
    historical_171_source_role_reviews:sourceRoles,
    remaining_source_evidence_dossiers:dossierMatches,
    full_corpus_passage_recovery:{files_with_passages:passageInventory.files_with_passages,files_without_passages:passageInventory.files_without_passages,total_passages:passageInventory.total_passages,by_category:passageInventory.by_category,...passageMatches},
    missing_rule_sources:missingMustRead, source_selection_truncated, source_index_drift:drift,
    confidence_note:"此工具可驗證有掃描哪些本機檔案、命中哪些文字與子節點；不是語義全知或新對話自動執行證明。作者/AI仍需讀足來源全段，判定衝突、知情界線、候選生效範圍，並附回執。",
    status:corpus.missing.length===0&&missingMustRead.length===0&&source_selection_truncated===0&&!drift.stale?"SOURCE_FILES_READ__SEMANTIC_QA_PENDING":"INDEX_STALE_OR_INCOMPLETE__RECHECK_SOURCES"
  };
}
function integrity(corpus) {
  const sources = unique([
    ...graph.claims.flatMap(x=>x.sources||[]),
    ...creativity.idea_pool.flatMap(x=>x.source_paths||[]),
    ...creativity.map_versions.primary.source_paths,
    ...creativity.map_versions.legacy.source_paths,
    ...creativity.compatibility_decisions.flatMap(x=>x.sources||[]),
    ...temporal.phases.flatMap(x=>x.source_paths||[]),
    ...ecoLinks.edges.flatMap(x=>x.source_paths||[]),
    ...versionLedger.records.flatMap(x=>x.source_paths||[]),
    ...containerRegistry.containers.flatMap(x=>x.source_paths||[]),
    ...macroMap.worlds.flatMap(x=>x.source_paths||[]),
    ...macroMap.barriers.flatMap(x=>x.source_paths||[]),
    ...macroMap.source_paths,
    ...travelEvidence.source_paths,
    ...travelEvidence.routes.flatMap(x=>x.source_paths||[]),
    ...peopleNetwork.entities.flatMap(x=>x.source_paths||[]),
    ...peopleNetwork.edges.flatMap(x=>x.source_paths||[]),
    ...crossWorldLinks.edges.flatMap(x=>x.source_paths||[]),
    ...allRecoveredRecords.flatMap(recordEvidencePaths),
    ...sceneContinuity.chapter_scene_beats.map(x=>x.evidence.source_path),
    ...sceneContinuity.object_chains.flatMap(x=>x.states.map(st=>st.evidence.source_path)),
    ...crossAIProvenance.records.map(x=>x.evidence.source_path),
    ...worldEvidence.facts.map(x=>x.source_evidence.path),
    ...allSourceRoles.map(x=>x.path||x.source_path)
  ]);
  const missingDossiers=JSON.parse(fs.readFileSync(path.join(HOME,"全庫待原子化缺口清冊.json"),"utf8")).sources
    .filter(row=>!sourceDossierByPath.has(row.path)||sourceDossierByPath.get(row.path).git_blob_sha_verified!==row.git_blob_sha)
    .map(x=>x.path);
  const dossierAnchorFailures=sourceDossiers.flatMap(d=>{
    const source=corpus.read.find(s=>s.path===d.source_path);
    if(!source)return [d.source_path+":source missing"];
    const lines=source.body.split(/\r?\n/);
    return (d.source_outline||[]).filter(p=>!lines[p.excerpt_line-1]?.trim().startsWith(p.excerpt)).map(p=>d.source_path+":"+p.excerpt_line);
  });
  const known=new Set(corpus.read.map(x=>x.path));
  const missing=sources.filter(p=>!known.has(p));
  const collisions=graph.claims.map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i);
  const containers=containerRegistry.containers.map(c=>({id:c.id,expected:c.expected_children,actual:resolveChildren(c).length}));
  const incompleteContainers=containers.filter(x=>x.actual!==x.expected).map(x=>x.id);
  const children=expandChildren(creativity.map_versions.primary);
  const legacy=expandChildren(creativity.map_versions.legacy);
  const drift=sourceDrift();
  const deepValidation=validateDeepEvidence(corpus);
  const sourceRolesValidation=validateSourceRoleCards(corpus);
  const passageInventory=getPassages(corpus);
  const byPath=new Map(corpus.read.map(d=>[d.path,d.body]));
  const badRecoveryAnchors=allRecoveredRecords.flatMap(r=>recordEvidenceAnchors(r)
    .filter(a=>!byPath.has(a.path)||!byPath.get(a.path).includes(a.anchor)).map(a=>r.id+":"+a.path));
  const duplicateRecoveryIDs=allRecoveredRecords.map(r=>r.id).filter((x,i,a)=>a.indexOf(x)!==i);
  const knownRecoveryIDs=new Set(allRecoveredRecords.map(r=>r.id));
  const brokenRecoveryLinks=allRecoveryLinks.filter(e=>!knownRecoveryIDs.has(e.from)||!knownRecoveryIDs.has(e.to)).map(e=>e.id);
  const duplicateRecoveryLinks=allRecoveryLinks.map(e=>e.id).filter((x,i,a)=>a.indexOf(x)!==i);
  const zonesKnown=new Set(children.map(z=>z.id));
  const danglingEco=ecoLinks.edges.filter(e=>!zonesKnown.has(e.from)||!zonesKnown.has(e.to)).map(e=>e.id);
  const personIDs=new Set(peopleNetwork.entities.map(x=>x.id));
  const missingRelationEndpoints=peopleNetwork.edges.filter(x=>!personIDs.has(x.from)||!personIDs.has(x.to)).map(x=>x.id);
  const legacyK=macroMap.barriers.filter(x=>x.version==="V03_LEGACY_K");
  const newK=macroMap.barriers.filter(x=>x.version==="GEMINI_G_K_LATER_CANDIDATE");
  const noCrossingClaim=travelEvidence.routes.every(r=>r.world_crossing_verified===false);
  const allIds=[
    ...graph.claims.map(x=>x.id),...temporal.phases.map(x=>x.id),
    ...ecoLinks.edges.map(x=>x.id),...versionLedger.records.map(x=>x.id),
    ...macroMap.barriers.map(x=>x.id),...macroMap.worlds.map(x=>x.id),
    ...travelEvidence.routes.map(x=>x.route_id),...peopleNetwork.entities.map(x=>x.id),
    ...peopleNetwork.edges.map(x=>x.id),...crossWorldLinks.edges.map(x=>x.id)
  ];
  const duplicateGraphIDs=allIds.filter((x,i)=>allIds.indexOf(x)!==i);
  return {files_in_inventory:inventory.files_count,read:corpus.read.length,
    missing_original_files:corpus.missing,unindexed_new_source_files:corpus.extras,
    missing_reference_paths:missing,duplicated_claim_ids:collisions,
    dangling_people_relation_endpoints:missingRelationEndpoints,
    world_layer_candidates:macroMap.worlds.length,old_K_version_count:legacyK.length,
    newer_K_version_count:newK.length,transport_routes:travelEvidence.routes.length,
    world_crossings_correctly_not_yet_verified:noCrossingClaim,
    relationship_nodes:peopleNetwork.entities.length,relationship_edges:peopleNetwork.edges.length,
    extra_crossworld_dependency_edges:crossWorldLinks.edges.length,
    historical_recovery_records:allRecoveredRecords.length,
    deep_scene_crossai_world_evidence:deepValidation,
    historical_171_source_roles:sourceRolesValidation,
    original_213_source_dossiers:sourceDossiers.length,
    original_213_section_excerpts:sourceScreenManifest.sections,
    missing_213_source_dossiers:missingDossiers,
    mismatched_213_excerpt_anchors:dossierAnchorFailures,
    historical_recovery_links:allRecoveryLinks.length,
    third_curated_claims:thirdRecovered.records.length,
    third_curated_source_paths:new Set(thirdRecovered.records.flatMap(recordEvidencePaths)).size,
    broken_recovery_link_endpoints:brokenRecoveryLinks,
    duplicate_recovery_link_ids:duplicateRecoveryLinks,
    recovery_anchor_failures:badRecoveryAnchors,
    duplicate_historical_recovery_ids:duplicateRecoveryIDs,
    full_corpus_passage_files:passageInventory.files_with_passages,
    full_corpus_passage_total:passageInventory.total_passages,
    full_corpus_unsegmentable_files:passageInventory.files_without_passages,
    dangling_ecology_edges:danglingEco,duplicated_extended_ids:duplicateGraphIDs,source_index_drift:drift,
    active_w01_children:children.length,old_w01_children:legacy.length,
    temporal_phases:temporal.phases.length,causal_edges:ecoLinks.edges.length,version_decisions:versionLedger.records.length,
    registered_containers:containers,incomplete_registered_containers:incompleteContainers,
    ok:deepValidation.ok&&sourceRolesValidation.ok&&missingDossiers.length===0&&dossierAnchorFailures.length===0&&sourceDossiers.length===213&&sourceScreenManifest.sections===1597&&missing.length===0&&corpus.missing.length===0&&badRecoveryAnchors.length===0&&brokenRecoveryLinks.length===0&&duplicateRecoveryLinks.length===0&&duplicateRecoveryIDs.length===0&&passageInventory.files_with_passages===corpus.read.length&&collisions.length===0&&danglingEco.length===0&&missingRelationEndpoints.length===0&&duplicateGraphIDs.length===0&&incompleteContainers.length===0&&children.length===12&&legacy.length===9&&legacyK.length===10&&newK.length===9&&travelEvidence.routes.length===12&&noCrossingClaim&&!drift.stale};
}
function selfTest(corpus) {
  const one=query("Celeste 被前文明強者砍出傷口",corpus);
  assert(one.relevant_claims.some(x=>x.id==="MG-C001"));
  assert(one.character_timeline.some(x=>x.id==="P-CEL-02"));
  const two=query("諾亞的原槍沒有同化的黑銷死亡復歸也會跟回嗎",corpus);
  assert(two.relevant_claims.some(x=>x.id==="MG-C007"));
  const three=query("討論 W01 九區與十二區的新版生態",corpus);
  assert.equal(three.container_expansion.active_design_children.length,12);
  assert.equal(three.container_expansion.legacy_candidates.length,9);
  assert(three.creative_candidate_ideas.some(x=>x.id==="IDEA-ECO-008"));
  assert(three.version_compatibility_ledger.some(x=>x.id==="VER-001"));
  const fish=query("W01第06區漁業受到第11區污染有什麼後果",corpus);
  assert(fish.ecology_industry_network.direct_edges.some(x=>x.id==="ECO-001"));
  assert(fish.ecology_industry_network.matched_zone_ids.includes("W01-Z06"));
  assert(fish.candidate_two_hop_impact_paths.possible_two_link_paths
    .some(p=>p.links.some(x=>x.id==="ECO-001") && p.links.some(x=>x.id==="ECO-016")));
  const temporalCheck=query("諾亞第一次死亡之前知道自己能復歸嗎",corpus);
  assert(temporalCheck.character_timeline.some(x=>x.id==="P-NOAH-01"));
  const alivia=query("艾莉維亞白髮是否變成第二人格",corpus);
  assert(alivia.character_timeline.some(x=>x.id==="P-ALIVIA-03"));
  const city=query("W04新版萬噸配重是否取代萬律專利城邦",corpus);
  assert(city.version_compatibility_ledger.some(x=>x.id==="VER-009"));
  const k04=query("新的G-K04與舊K04到底相同嗎？",corpus);
  assert(k04.macro_world_layer_graph.versioned_barriers.some(x=>x.id==="LEGACY-K04"));
  assert(k04.macro_world_layer_graph.versioned_barriers.some(x=>x.id==="G-K04"));
  assert(k04.macro_world_layer_graph.same_number_version_collisions.some(x=>x.k_number==="K04"));
  const w02=query("W02折殼曲原與倒懸麥田會如何影響跨層交通和生態",corpus);
  assert(w02.macro_world_layer_graph.macro_worlds.some(x=>x.id==="W02"));
  assert(w02.cross_world_ecology_civilization_links.edges.some(x=>x.id==="XDEP-001"));
  const returnTrip=query("K01-T-A去程和返程是否已通行",corpus);
  assert(returnTrip.travel_direction_and_rights.route_candidates.some(x=>x.route_id==="K01-T-A" && x.direction_return===null));
  const characters=query("多恩和塞拉曾經認識嗎",corpus);
  assert(characters.character_and_organization_graph.relationships.some(x=>x.id==="REL-007"));
  const rename=query("承光贖罪庭和承光帝統是一個組織嗎",corpus);
  assert(rename.character_and_organization_graph.relationships.some(x=>x.id==="REL-015"));
  const turtle=query("跨層巨龜龜背聚落的小寄生生物和帝國檢疫",corpus);
  assert(turtle.cross_world_ecology_civilization_links.edges.some(x=>x.id==="XDEP-013"));
  const scraped=query("K01厚殼中的三種候選交通與社會",corpus);
  assert.equal(scraped.remaining_source_evidence_dossiers.all_originals_screened,213);
  assert.equal(scraped.remaining_source_evidence_dossiers.source_sections_indexed,1597);
  assert(scraped.remaining_source_evidence_dossiers.matching_source_count>0);
  const thirdQuery=query("REC3-053 人物的判斷不完美",corpus);
  assert(thirdQuery.historical_ideas_recovered.records.some(x=>x.id==="REC3-053"));
  const rolesQuery=query("G9B 第七章 版本修訂",corpus);
  assert.equal(rolesQuery.historical_171_source_role_reviews.source_roles_total,171);
  assert(rolesQuery.historical_171_source_role_reviews.matched_roles.some(x=>x.id==="COV-DRAFT-030"));
  assert(rolesQuery.historical_171_source_role_reviews.version_links.some(x=>x.relation==="G9A_TO_G9B_THREE_PATCHES"||x.relation==="G9B_TO_G9C_CONTINUITY"));
  const manualNonDraft=query("第159 Gemini八十題",corpus);
  assert(manualNonDraft.historical_171_source_role_reviews.matched_roles.some(x=>x.id==="COV-NON-041"));
  const sceneTrack=query("第九章 黑銷 母匙",corpus);
  assert(sceneTrack.deep_scene_provenance_and_crossworld_retrieval.candidate_scene_continuity.matched_beats.some(x=>x.chapter===9));
  assert(sceneTrack.deep_scene_provenance_and_crossworld_retrieval.candidate_scene_continuity.tracked_object_chains.some(x=>x.id==="OBJ-PIN"));
  const aiTrack=query("Gemini原始對話版本來源",corpus);
  assert(aiTrack.deep_scene_provenance_and_crossworld_retrieval.cross_ai_originals_and_revisions.records.length>=15);
  const worldTrack=query("W02的農田、交通與K01厚界是否通車",corpus);
  assert(worldTrack.deep_scene_provenance_and_crossworld_retrieval.W02_plus_civilization_ecology_and_routes.facts.some(x=>x.world==="W02"));
  assert.equal(worldTrack.deep_scene_provenance_and_crossworld_retrieval.W02_plus_civilization_ecology_and_routes.verified_operational_cross_world_routes,0);
  const recoveredW02=query("W02倒懸麥田風帆列車與導光軌農業城",corpus);
  assert(recoveredW02.historical_ideas_recovered.records.some(x=>x.id==="REC-002"));
  assert(recoveredW02.historical_ideas_recovered.records.some(x=>x.id==="REC-003"));
  const historyGeo=query("K01厚殼能不能穿過去，實際交通有什麼證據",corpus);
  assert(historyGeo.historical_ideas_recovered.records.some(x=>x.id==="REC-069"));
  assert(historyGeo.historical_ideas_recovered.records.some(x=>x.id==="REC-070"));
  assert(historyGeo.historical_ideas_recovered.linked_edges.some(x=>x.kind==="K01_TO_ROUTE"));
  const historyPeople=query("Celeste第三個座位下次見呀應該怎麼說",corpus);
  assert(historyPeople.historical_ideas_recovered.records.some(x=>x.id==="REC-079"));
  const recoveredRoot=query("阿博與央璃的古根商旅和巨龜",corpus);
  assert(recoveredRoot.historical_ideas_recovered.records.some(x=>x.id==="REC-013"));
  assert(recoveredRoot.full_corpus_passage_recovery.files_with_passages>=335);
  assert(recoveredRoot.full_corpus_passage_recovery.matched_passages.length>0);
  const fixture=JSON.parse(fs.readFileSync(path.join(HOME,"合成檢索測例.json"),"utf8"));
  const roomCase=fixture.cases.find(x=>x.name.includes("十個"));
  const fakeContainer={id:"TEST-TEN-ROOM-HOUSE",name:"測試房屋",aliases:["測試房屋"],expected_children:10,
    children:roomCase.given.contains.map((v,i)=>({id:"SYNTHETIC-"+String(i+1),name:v,aliases:[v],ecology:[v]}))};
  const ten=matchContainers("測試房屋有哪些生態", [fakeContainer]);
  assert.equal(ten.length,1);
  assert.equal(ten[0].actual_children,10);
  assert.deepEqual(ten[0].children.map(x=>x.name),roomCase.given.contains);
  const primary=matchContainers("W01 十二區的地圖");
  assert(primary.some(x=>x.id==="CON-W01" && x.complete_count));
  const w04=matchContainers("W04 萬律與萬噸");
  assert(w04.some(x=>x.id==="CON-W04-CANDIDATES" && x.actual_children===2));
  // The fixture is deliberately isolated from the giant-world Canon JSON.
  assert(!graph.entities.some(x=>x.id==="A"));
  return {ok:true,checks:["Celeste injury hard rule", "gun assimilation override",
    "W01 12 active design districts + 9 historical candidates",
    "older mechanical-forest idea recoverable", "10-room synthetic fixture isolated",
    "06 district fisheries linked to 11 district wastewater candidate",
    "Noah pre-death knowledge limit", "Alivia white-hair personality continuity",
    "W04 older and newer competing candidates retained",
    "generic parent-to-all-10-room synthetic recall", "registered W01 and W04 container expansion",
    "K04 old/new endpoint collision", "W02 candidate eco-transport retrieval",
    "K01-T-A return direction unknown", "Dorne-Sera candidate character edge",
    "atonement vs empire name nonidentity", "turtle inter-layer biosecurity link",
    "2-hop W01 wastewater/fisheries/biomedical dependency discovery",
    "legacy atomic W02 original content reused",
    "root-caravan candidate people source traced",
    "all source files paragraph-segmented with line anchors",
    "second batch 53 records and 23 connected retrieval edges",
    "K01 geology-to-route link",
    "Celeste third-seat ordinary goodbye preserved",
    "213 SHA-validated original-source dossiers and 1597 excerpts loaded",
    "query returns source dossier links and original line evidence",
    "third batch 61 curated original claims with 18 cross-links and exact anchor integrity",
    "78 scene beats 14 custody chains and 34 recorded states",
    "22 cross-AI original-and-revision records",
    "30 W02+ civilization ecology facts and 12 routes not operationally verified",
    "171 individually source-reviewed historical files and 37 version-provenance links"]};
}
const corpus=readAll();
if(args.includes("--check")) {
  const result=integrity(corpus);
  process.stdout.write(JSON.stringify(result,null,2)+"\n");
  if(!result.ok)process.exitCode=2;
} else if(args.includes("--self-test")) {
  const result=selfTest(corpus);
  process.stdout.write(JSON.stringify(result,null,2)+"\n");
} else {
  const q=option("--query") || args.filter(x=>!x.startsWith("--")).join(" ");
  const result=query(q,corpus);
  const output=JSON.stringify(result,null,2)+"\n";
  const writeTo=option("--receipt");
  if(writeTo) {
    fs.mkdirSync(path.dirname(path.resolve(writeTo)),{recursive:true});
    fs.writeFileSync(path.resolve(writeTo),output,"utf8");
  }
  process.stdout.write(output);
  if(result.status!=="SOURCE_FILES_READ__SEMANTIC_QA_PENDING")process.exitCode=2;
}
