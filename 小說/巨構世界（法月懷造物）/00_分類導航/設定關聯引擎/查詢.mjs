#!/usr/bin/env node
// 巨構設定查詢 v1 — Node.js 20+ standard library only.
// Runs from a checked-out GitHub repository. Never modifies Canon.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

const HOME = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HOME, "..", "..");
const inventory = JSON.parse(fs.readFileSync(path.join(HOME, "全庫物理清冊.json"), "utf8"));
const graph = JSON.parse(fs.readFileSync(path.join(HOME, "高優先規則與關聯.json"), "utf8"));
const creativity = JSON.parse(fs.readFileSync(path.join(HOME, "創意相容性台帳.json"), "utf8"));
const temporal = JSON.parse(fs.readFileSync(path.join(HOME, "人物時期與知情矩陣.json"), "utf8"));
const ecoLinks = JSON.parse(fs.readFileSync(path.join(HOME, "生態產業與制度因果網.json"), "utf8"));
const versionLedger = JSON.parse(fs.readFileSync(path.join(HOME, "版本取代與相容決策鏈.json"), "utf8"));
const containerRegistry = JSON.parse(fs.readFileSync(path.join(HOME, "容器與子單元登記.json"), "utf8"));
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
  return Array.isArray(c.children) ? c.children : [];
}
function matchContainers(q, registered=containerRegistry.containers) {
  const matching=registered.filter(c=>{
    const all=resolveChildren(c);
    const parentAliases=[c.name,...(c.aliases||[])];
    return hasTextSignal(q,parentAliases) || all.some(child=>
      hasTextSignal(q,[child.name,...(child.aliases||[])]) || contains(q,child.id)
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
  const claims = graph.claims.filter(r=>{
    const entityMatch = (r.subjects || []).some(id=>ids.expanded.includes(id));
    const hits = ruleTriggers(r,q);
    return entityMatch || hits.some(t => norm(t).length >= 3);
  }).map(r => ({...r,review_signal:ruleTriggers(r,q).length>0?"TRIGGERED__CONTEXT_REVIEW_NOT_VERDICT":"GRAPH_ADJACENCY__VERIFY_APPLICABILITY"}));
  const terms = unique([
    ...collectTerms(q,ids,claims,ideas,zones),
    ...phaseMatches.flatMap(p=>p.matching_terms||[]),
    ...causal.direct_edges.flatMap(e=>e.keywords||[]).filter(t=>contains(q,t)),
    ...versions.flatMap(v=>v.query_terms||[]).filter(t=>contains(q,t))
  ]).slice(0,90);
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
    ...(zones.count?[...creativity.map_versions.primary.source_paths,
                    ...creativity.map_versions.legacy.source_paths]:[]),
    ...(zones.count?creativity.compatibility_decisions.filter(x=>x.id.startsWith("MAP-"))
                      .flatMap(c=>c.sources||[]):[])
  ]);
  const fullSelected = unique([...needed,...ranked.slice(0,16).map(r=>r.path)]);
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
    version_decisions:versionFindings,
    searched_terms:terms, selected_sources:opened,
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
    ...containerRegistry.containers.flatMap(x=>x.source_paths||[])
  ]);
  const known=new Set(corpus.read.map(x=>x.path));
  const missing=sources.filter(p=>!known.has(p));
  const collisions=graph.claims.map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i);
  const containers=containerRegistry.containers.map(c=>({id:c.id,expected:c.expected_children,actual:resolveChildren(c).length}));
  const incompleteContainers=containers.filter(x=>x.actual!==x.expected).map(x=>x.id);
  const children=expandChildren(creativity.map_versions.primary);
  const legacy=expandChildren(creativity.map_versions.legacy);
  const drift=sourceDrift();
  const zonesKnown=new Set(children.map(z=>z.id));
  const danglingEco=ecoLinks.edges.filter(e=>!zonesKnown.has(e.from)||!zonesKnown.has(e.to)).map(e=>e.id);
  const allIds=[
    ...graph.claims.map(x=>x.id),...temporal.phases.map(x=>x.id),
    ...ecoLinks.edges.map(x=>x.id),...versionLedger.records.map(x=>x.id)
  ];
  const duplicateGraphIDs=allIds.filter((x,i)=>allIds.indexOf(x)!==i);
  return {files_in_inventory:inventory.files_count,read:corpus.read.length,
    missing_original_files:corpus.missing,unindexed_new_source_files:corpus.extras,
    missing_reference_paths:missing,duplicated_claim_ids:collisions,
    dangling_ecology_edges:danglingEco,duplicated_extended_ids:duplicateGraphIDs,source_index_drift:drift,
    active_w01_children:children.length,old_w01_children:legacy.length,
    temporal_phases:temporal.phases.length,causal_edges:ecoLinks.edges.length,version_decisions:versionLedger.records.length,
    registered_containers:containers,incomplete_registered_containers:incompleteContainers,
    ok:missing.length===0&&corpus.missing.length===0&&collisions.length===0&&danglingEco.length===0&&duplicateGraphIDs.length===0&&incompleteContainers.length===0&&children.length===12&&legacy.length===9&&!drift.stale};
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
  const temporalCheck=query("諾亞第一次死亡之前知道自己能復歸嗎",corpus);
  assert(temporalCheck.character_timeline.some(x=>x.id==="P-NOAH-01"));
  const alivia=query("艾莉維亞白髮是否變成第二人格",corpus);
  assert(alivia.character_timeline.some(x=>x.id==="P-ALIVIA-03"));
  const city=query("W04新版萬噸配重是否取代萬律專利城邦",corpus);
  assert(city.version_compatibility_ledger.some(x=>x.id==="VER-009"));
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
    "generic parent-to-all-10-room synthetic recall", "registered W01 and W04 container expansion"]};
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
