/** Append-only, SHA-pinned source revalidation. Historical ledgers stay immutable. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const HOME=path.dirname(fileURLToPath(import.meta.url));
const sha=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const cache=new Map();
// Reconstruct the old bytes from the current source and reviewed insertions.
// Checking the original Git blob SHA is stronger than normalized line equality
// and works in Actions' default shallow checkout without fetching repo history.
function revisionBytes(loc,target,migrations,home){
 let b=fs.readFileSync(path.resolve(home,'../..',loc));
 if(sha(b)===target)return b;
 for(const m of migrations.slice().reverse())if(m.path===loc&&sha(b)===m.to_sha){
  const lines=b.toString('utf8').split('\n');
  if(Array.isArray(m.changes)){
   for(const c of m.changes){
    if(!Number.isInteger(c.line)||lines[c.line-1]!==c.new_line)throw Error('line replacement does not match reviewed current line '+loc+':'+c.line);
    lines[c.line-1]=c.old_line;
   }
  }else lines.splice(m.insert_before-1,m.insert_count);
  b=Buffer.from(lines.join('\n'));
  if(sha(b)!==m.from_sha)throw Error('migration/replacement is not the reviewed exact change '+loc);
  if(sha(b)===target)return b;
 }
 throw Error('revalidated source changed again '+loc);
}
export function readRevalidations(home=HOME){
 if(cache.has(home))return cache.get(home);
 const manifest=JSON.parse(fs.readFileSync(path.join(home,'AI接手_增量分片清單.json'),'utf8'));
 const patches=[],seen=new Set();
 for(const e of manifest.revalidations||[]){
  if(!/^202\d{5}_[^/\\]+\.json$/.test(e.path)||e.path.includes('..')||seen.has(e.path))throw Error('unsafe/duplicate revalidation path');
  seen.add(e.path);const b=fs.readFileSync(path.join(home,e.path));
  if(sha(b)!==e.git_blob_sha)throw Error('revalidation SHA drift '+e.path);
  const p=JSON.parse(b);
  if(p.schema!=='mega-source-revalidation-v1'||p.newly_accepted_source_count!==0||!p.editorial_not_canon)throw Error('invalid revalidation scope');
  patches.push(p);
 }
 const allMigrations=patches.flatMap(p=>[...(p.anchor_migrations||[]),...(p.line_replacements||[])]),migrationKeys=new Set();
 for(const p of patches){
  for(const m of p.anchor_migrations){
   if(!m.path||m.path.includes('..')||m.path.includes('\\')||path.isAbsolute(m.path)||!Number.isInteger(m.insert_before)||!Number.isInteger(m.insert_count)||m.insert_count<1)throw Error('invalid anchor migration');
   if(!/^[a-f0-9]{40}$/.test(m.from_sha)||!/^[a-f0-9]{40}$/.test(m.to_sha))throw Error('invalid migration SHA');
   const key=m.path+'@'+m.from_sha;if(migrationKeys.has(key))throw Error('duplicate/forked source revision');migrationKeys.add(key);
   const current=revisionBytes(m.path,m.to_sha,allMigrations,home),newLines=current.toString('utf8').split(/\r?\n/);
   const restored=current.toString('utf8').split('\n');restored.splice(m.insert_before-1,m.insert_count);
   if(sha(Buffer.from(restored.join('\n')))!==m.from_sha)throw Error('migration is not the reviewed exact insertion '+m.path);
   if(m.decision_line<m.insert_before||m.decision_line>=m.insert_before+m.insert_count||!newLines[m.decision_line-1]?.includes(m.decision_quote)||m.meaning.length<30)throw Error('missing substantive revision evidence');
  }
  for(const m of p.line_replacements||[]){
   if(!m.path||m.path.includes('..')||m.path.includes('\\')||path.isAbsolute(m.path)||!/^[a-f0-9]{40}$/.test(m.from_sha)||!/^[a-f0-9]{40}$/.test(m.to_sha)||m.meaning?.length<30||!Array.isArray(m.changes)||m.changes.length<1)throw Error('invalid SHA-pinned same-line replacement');
   const key=m.path+'@'+m.from_sha;if(migrationKeys.has(key))throw Error('duplicate/forked source revision');migrationKeys.add(key);
   const current=revisionBytes(m.path,m.to_sha,allMigrations,home);
   const lines=current.toString('utf8').split('\n'),used=new Set();
   for(const c of m.changes){
    if(!Number.isInteger(c.line)||c.line<1||c.line>lines.length||used.has(c.line)||typeof c.old_line!=='string'||typeof c.new_line!=='string'||c.old_line===c.new_line||lines[c.line-1]!==c.new_line)throw Error('same-line replacement mismatch '+m.path+':'+c.line);
    used.add(c.line);
   }
   const restored=lines.slice();for(const c of m.changes)restored[c.line-1]=c.old_line;
   if(sha(Buffer.from(restored.join('\n')))!==m.from_sha)throw Error('same-line replacement does not restore source SHA '+m.path);
  }
  const seenSources=new Set();
  for(const r of p.attestation_replacements){
   const kinds=['AUTHORITY_BOUNDARY','VERSION_OR_LATER_REVISION','MISSED_MATERIAL_CLAIM','CROSS_FILE_IMPACT'];
   if(!r.previous_sha||r.record?.source_path!==r.path||r.semantic_impact.length<25||r.counterchecks?.length!==4||!kinds.every(k=>r.counterchecks.some(c=>c.kind===k&&c.question?.length>=8&&c.finding?.length>=15))||seenSources.has(r.path))throw Error('incomplete/duplicate individual revalidation '+r.path);
   seenSources.add(r.path);
   if(r.record.status!=='FULL_FILE_EDITORIAL_ATTESTED')throw Error('revalidation cannot invent a new acceptance');
  }
 }
 cache.set(home,patches);return patches;
}
export function pinnedSourceVersion(loc,target,home=HOME){
 if(!loc||loc.includes('..')||loc.includes('\\')||path.isAbsolute(loc)||!/^[0-9a-f]{40}$/.test(target))throw Error('unsafe pinned source request');
 const patches=readRevalidations(home);
 return revisionBytes(loc,target,patches.flatMap(p=>[...(p.anchor_migrations||[]),...(p.line_replacements||[])]),home);
}
export function applyEvidenceRevalidations(data,home=HOME){
 const patches=readRevalidations(home);
 // Replay the append-only SHA chain in manifest order. Historical insertions
 // can precede later same-line replacements on the very same source.
 const revisions=patches.flatMap(p=>[...(p.anchor_migrations||[]),...(p.line_replacements||[])]);
 function walk(x){
  if(!x||typeof x!=='object')return;
  if(Array.isArray(x)){for(const y of x)walk(y);return;}
  const loc=x.source_path||x.path;
  for(const m of revisions)if(m.path===loc){
   if(Number.isInteger(m.insert_before)){
    // Full-file attestations are section- and line-pinned. A verified prefix
    // insertion shifts the original anchors, while the FIRST reviewed section
    // must also account for the newly added lines (not silently drop them).
    if(x.status==='FULL_FILE_EDITORIAL_ATTESTED'&&x.source_path===m.path&&x.git_blob_sha===m.from_sha){
     x.source_line_count+=m.insert_count;
     for(const [i,s] of (x.reviewed_sections||[]).entries()){
      if(i>0)s.from+=m.insert_count;
      s.to+=m.insert_count;
      s.anchor_line+=m.insert_count;
      if(i===0)s.meaning=(s.meaning||'')+'【後出前綴】'+m.meaning;
     }
     for(const u of x.semantic_quality_v2?.material_units||[])u.line+=m.insert_count;
     for(const c of x.semantic_quality_v2?.countercheck_questions||[])c.line+=m.insert_count;
    }
    if(x.git_blob_sha===m.from_sha){
     x.git_blob_sha=m.to_sha;
     if(Number.isInteger(x.line)&&x.line>=m.insert_before)x.line+=m.insert_count;
    }
    if(x.git_blob_sha_verified===m.from_sha){
     x.git_blob_sha_verified=m.to_sha;
     if(Number.isInteger(x.source_lines))x.source_lines+=m.insert_count;
     for(const a of x.source_outline||[]){
      if(a.heading_line>=m.insert_before)a.heading_line+=m.insert_count;
      if(a.excerpt_line>=m.insert_before)a.excerpt_line+=m.insert_count;
     }
    }
    if(x.source_git_blob_sha===m.from_sha){
     x.source_git_blob_sha=m.to_sha;x.current_source_role_revision=m.meaning;
     for(const a of x.evidence||[])if(a.line>=m.insert_before)a.line+=m.insert_count;
    }
   }else{
    if(x.git_blob_sha===m.from_sha){
     const c=m.changes.find(c=>c.line===x.line);
     if(c&&typeof x.quote==='string'&&c.old_line.includes(x.quote)&&!c.new_line.includes(x.quote))x.quote=c.new_line;
     x.git_blob_sha=m.to_sha;
    }
    if(x.git_blob_sha_verified===m.from_sha)x.git_blob_sha_verified=m.to_sha;
    if(x.source_git_blob_sha===m.from_sha){
     x.source_git_blob_sha=m.to_sha;x.current_source_role_revision=m.meaning;
    }
   }
  }
  for(const y of Object.values(x))walk(y);
 }
 walk(data);
 for(const p of patches)for(const a of Array.isArray(data.records)?data.records:[]){
  const note=p.claim_interpretations?.[a.id];
  if(note){a.current_revision_interpretation=note;a.analysis=(a.analysis||'')+'【後出覆核】'+note;}
 }
 return data;
}
export function applyAttestationRevalidations(data,home=HOME){
 for(const p of readRevalidations(home))for(const replacement of p.attestation_replacements){
  const ix=data.records.findIndex(r=>r.source_path===replacement.path);
  if(ix<0)continue;
  const r=data.records[ix];
  if(r.git_blob_sha!==replacement.previous_sha||r.status!=='FULL_FILE_EDITORIAL_ATTESTED'||r.source_role_id!==replacement.record.source_role_id||JSON.stringify(r.related_claim_ids)!==JSON.stringify(replacement.record.related_claim_ids))throw Error('revalidation base does not match '+replacement.path);
  data.records[ix]=structuredClone(replacement.record); // defer all SHA forward-migrations until the entire ordered replacement chain has applied
 }
 return data;
}
export function readEffectiveJson(filename,home=HOME){
 const full=path.resolve(home,filename);
 if(!full.startsWith(path.resolve(home)+path.sep))throw Error('effective JSON escapes engine');
 const data=applyEvidenceRevalidations(JSON.parse(fs.readFileSync(full,'utf8')),home);
 for(const p of readRevalidations(home))for(const a of p.specific_legacy_anchors||[]){
  if(path.basename(full)!==a.file)continue;
  const e=data.records?.find(r=>r.id===a.record_id)?.evidence;
  const m=p.anchor_migrations.find(m=>m.path===a.source_path);
  if(!e||!m||e.source_path!==a.source_path||e.line!==a.from_line||e.excerpt!==a.quote)throw Error('legacy anchor base mismatch');
  const all=readRevalidations(home).flatMap(p=>p.anchor_migrations);
  const old=revisionBytes(a.source_path,m.from_sha,all,home).toString('utf8').split(/\r?\n/);
  const now=revisionBytes(a.source_path,m.to_sha,all,home).toString('utf8').split(/\r?\n/);
  if(!old[a.from_line-1]?.startsWith(a.quote)||!now[a.to_line-1]?.startsWith(a.quote))throw Error('legacy anchor quote drift');
  e.line=a.to_line;e.git_blob_sha=m.to_sha;applyEvidenceRevalidations(e,home);
 }
 return data;
}
