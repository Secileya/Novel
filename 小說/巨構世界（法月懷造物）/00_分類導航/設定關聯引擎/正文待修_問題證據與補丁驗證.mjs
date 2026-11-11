#!/usr/bin/env node
/** Fail-closed body continuity source/patch checker. Never writes source files. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pinnedSourceVersion} from './來源後修_證據覆核.mjs';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..');
const sha=b=>createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
const safe=(loc)=>{if(typeof loc!=='string'||!loc||path.isAbsolute(loc)||loc.includes('\\')||loc.split('/').includes('..'))throw Error('unsafe path: '+loc);const f=path.resolve(root,loc);if(!f.startsWith(root+path.sep))throw Error('path escapes project: '+loc);return f;};
const read=loc=>fs.readFileSync(safe(loc));
const readPinned=(loc,expected)=>{const bytes=read(loc);return sha(bytes)===expected?bytes:pinnedSourceVersion(loc,expected,here);};
const load=()=>({board:JSON.parse(fs.readFileSync(path.join(here,'正文待修_統一問題台帳.json'),'utf8')),patchset:JSON.parse(fs.readFileSync(path.join(here,'正文待修_精確修訂補丁候選.json'),'utf8'))});
function verify(board,patchset){
 if(board.schema!=='mega-body-repair-issues/v1'||patchset.schema!=='mega-body-repair-exact-patches/v1'||board.authority!=='EDITORIAL_NON_CANON_NOT_AUTHOR_ADOPTION')throw Error('schema or authority mismatch');
 if(!Array.isArray(board.issues)||board.issues.length<9||!Array.isArray(patchset.patches)||!patchset.patches.length)throw Error('missing issue/patch');
 const allowed=new Set(['OPEN_FIX','OPEN_REVIEW','RESOLVED_DERIVED','PATCHED_CANDIDATE','WATCH','DONE_VERIFIED']);
 const ids=new Set(),sourceVersions=new Map();let evidence=0;const count={};
 for(const issue of board.issues){
  if(ids.has(issue.id)||!/^BODY-QA-\d{3,}$/.test(issue.id)||!allowed.has(issue.status))throw Error('invalid/duplicate issue '+issue.id);
  ids.add(issue.id);count[issue.status]=(count[issue.status]||0)+1;
  if(!Array.isArray(issue.sources)||!issue.sources.length)throw Error('issue has no source '+issue.id);
  if(issue.status==='DONE_VERIFIED'&&(!issue.resolution?.author_approved||!issue.resolution?.accepted_source_sha||!issue.resolution?.successful_ci_url))throw Error('forged done without author and CI evidence '+issue.id);
  if(issue.status==='RESOLVED_DERIVED'){
   const r=issue.resolution;if(r?.kind!=='EDITORIAL_DERIVED_CORRECTION_ONLY'||r.original_source_changed!==false||r.canon_approved!==false||!/^[a-f0-9]{40}$/.test(r.artifact_blob_sha))throw Error('invalid derivative-only resolution '+issue.id);
   if(sha(read(r.artifact_path))!==r.artifact_blob_sha)throw Error('editorial derivative proof SHA drift '+issue.id);
  }
  for(const ev of issue.sources){
   if(!Number.isInteger(ev.line)||ev.line<1||!ev.quote||ev.quote.length<3||!/^([a-f0-9]{40})$/.test(ev.git_blob_sha))throw Error('malformed evidence '+issue.id);
   const k=ev.path,bytes=readPinned(k,ev.git_blob_sha),current=sha(bytes);if(current!==ev.git_blob_sha)throw Error('STALE_SOURCE_SHA: '+issue.id+' '+k);
   const lines=bytes.toString('utf8').split(/\r?\n/);
   if(!lines[ev.line-1]?.includes(ev.quote))throw Error('STALE_QUOTE_OR_LINE: '+issue.id+' '+k+':'+ev.line);
   sourceVersions.set(k,current);evidence++;
  }
 }
 if(board.stats.total!==board.issues.length||Object.keys(count).some(k=>board.stats[k]!==count[k])||Object.keys(board.stats).some(k=>k!=='total'&&!count[k]))throw Error('issue count/status snapshot drift');
 if(board.currency?.copper_value_out!==30||board.currency?.copper_value_in!==9||board.currency?.copper_value_net!==-21||board.currency?.original_unpatched_net!==-26||board.currency?.post_patch_conditional_net_copper!==-21||board.currency?.opening_balance!==null||board.currency?.chapter10_refund!==5)throw Error('candidate currency facts drift from three SHA-pinned repairs');
 const patchIds=new Set(),editsByFile=new Map();
 for(const patch of patchset.patches){
  if(patchIds.has(patch.id)||!ids.has(patch.issue_id)||patch.author_approved!==false||patch.scope!=='FULL_LINE_REPLACEMENT_IN_NONCANON_REVIEW_COPY_ONLY')throw Error('invalid patch identity/authority');
  patchIds.add(patch.id);
  if(!Number.isInteger(patch.line)||patch.line<1||!patch.original_line||!patch.replacement_line||patch.original_line===patch.replacement_line)throw Error('empty/bad patch '+patch.id);
  if(!patch.source_path.startsWith('待定正文/')||patch.source_path.includes('Gemini原稿')||patch.source_path.includes('ChatGPT原稿'))throw Error('cannot modify archived original '+patch.id);
  const bytes=readPinned(patch.source_path,patch.source_blob_sha),current=sha(bytes);
  if(current!==patch.source_blob_sha)throw Error('STALE_PATCH_SOURCE_SHA: '+patch.id);
  const lines=bytes.toString('utf8').split(/\r?\n/);
  if(lines[patch.line-1]!==patch.original_line)throw Error('STALE_PATCH_LINE: '+patch.id);
  const live=read(patch.source_path);
  if(sha(live)!==patch.source_blob_sha&&live.toString('utf8').split(/\r?\n/)[patch.line-1]!==patch.replacement_line)throw Error('LIVE_PATCH_MISMATCH: '+patch.id);
  const key=patch.source_path+':'+patch.line;
  if(editsByFile.has(key))throw Error('patch conflict '+key);
  editsByFile.set(key,patch);
 }
 for(const x of board.issues)for(const p of x.proposed_patch_ids||[])if(!patchIds.has(p)||!patchset.patches.some(z=>z.id===p&&z.issue_id===x.id))throw Error('dangling patch reference: '+x.id);
 return {schema:'mega-body-repair-report/v1',current_source_count:JSON.parse(fs.readFileSync(path.join(here,'AI接手_工作板.json'),'utf8')).fact_snapshot.raw_source_files,issue_count:board.issues.length,status_counts:count,evidence_count:evidence,exact_patches:patchset.patches.length,verified_source_versions:sourceVersions.size,derived_corrections_count:count.RESOLVED_DERIVED||0,source_files_modified:new Set(patchset.patches.filter(p=>sha(read(p.source_path))!==p.source_blob_sha).map(p=>p.source_path)).size,canon_approved:0,base_copper_out:30,base_copper_in:4,base_copper_net:-26,conditional_net_if_refund_patch_adopted:-21};
}
function render(patchset,loc){
 const ops=patchset.patches.filter(p=>p.source_path===loc).sort((a,b)=>a.line-b.line);
 if(!ops.length)throw Error('no patches for requested source');
 const lines=readPinned(loc,ops[0].source_blob_sha).toString('utf8').split(/\r?\n/);
 for(const p of ops){if(lines[p.line-1]!==p.original_line)throw Error('patch mismatch at '+p.line);lines[p.line-1]=p.replacement_line;}
 return lines.join('\n');
}
function negatives(board,patchset){
 const clone=x=>structuredClone(x),bad=(b,p)=>{let failed=false;try{verify(b,p);}catch{failed=true;}if(!failed)throw Error('NEGATIVE_FIXTURE_ACCEPTED');};
 let b=clone(board);b.issues[0].sources[0].git_blob_sha='0'.repeat(40);bad(b,patchset);
 b=clone(board);b.issues[0].sources[0].line=99999;bad(b,patchset);
 b=clone(board);b.issues.push(clone(b.issues[0]));b.stats.total++;bad(b,patchset);
 b=clone(board);b.issues[1].status='DONE_VERIFIED';b.stats.OPEN_REVIEW--;b.stats.DONE_VERIFIED=1;bad(b,patchset);
 let p=clone(patchset);p.patches[0].original_line+='X';bad(board,p);
 p=clone(patchset);p.patches[0].source_path='../private';bad(board,p);
 p=clone(patchset);p.patches[0].author_approved=true;bad(board,p);
}
const args=process.argv.slice(2),{board,patchset}=load(),report=verify(board,patchset);
if(args.includes('--negative-test'))negatives(board,patchset);
if(args.includes('--preview'))for(const p of patchset.patches)process.stderr.write('@@ '+p.id+' '+p.source_path+':'+p.line+' @@\n-'+p.original_line+'\n+'+p.replacement_line+'\n');
const i=args.indexOf('--render-source');
if(i!==-1){if(!args[i+1])throw Error('--render-source needs relative project path');process.stdout.write(render(patchset,args[i+1]));}
else process.stdout.write(JSON.stringify(report,null,2)+'\n');
