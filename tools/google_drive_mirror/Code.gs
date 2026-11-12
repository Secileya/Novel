/**
 * Secileya/Novel -> Stingray Google Drive, source-faithful, read-only GitHub mirror.
 * License: MIT. Runs in the Google account that owns MIRROR_FOLDER_ID.
 * One-time: paste into https://script.google.com, run installSync() and grant Drive,
 * Docs and external-request permissions. Then syncDrain() runs every 5 minutes
 * until complete; syncHourly() keeps checking GitHub changes indefinitely.
 * Optional installFastSync() adds one-minute change-only polling; no new Docs
 * are created by the fast lane, and existing mirror files are never erased.
 * Does not delete history or classify Canon.
 */
const MIRROR_CONFIG = Object.freeze({
  owner: 'Secileya',
  repository: 'Novel',
  branch: 'main',
  sourceIndexPath: 'tools/google_drive_mirror/source-index.json',
  prefix: '小說/巨構世界（法月懷造物）/',
  mirrorFolderId: '1-8xXZ98taJKK_Zpj65RjZtA4J5MzIXBY',
  manifestFileName: '_GITHUB_SYNC_STATE.json',
  statusDocName: '00_鏡像同步狀態與使用說明',
  fastHandoffName: '00_最新GitHub變更交接.txt',
  maxQuickFilesPerRun: 2,
  maxQuickBytes: 128000,
  maxQuickTimeMs: 45000,
  quickErrorRetryMs: 10 * 60 * 1000,
  maxFilesPerRun: 8,
  maxTimeMs: 135000,
  maxDocsChars: 12000,
  allowedExtensions: ['.md', '.json', '.mjs', '.svg', '.txt']
});
/** Run only once as the signed-in Stingray Google account. */
function installSync() {
  ensureTrigger_('syncHourly', 60);
  ensureTrigger_('syncDrain', 5);
  ensureTrigger_('syncQuick', 1);
  const result = syncCore_();
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}
function syncHourly() {
  const result = syncCore_();
  Logger.log(JSON.stringify(result));
  return result;
}
function syncDrain() {
  const result = syncCore_();
  Logger.log(JSON.stringify(result));
  return result;
}
/** Manual catch-up/test; never rewrites GitHub. */
function syncNow() { return syncHourly(); }

/**
 * Install alongside existing triggers. Run once after updating Code.gs in the
 * user's ACTUAL Apps Script project; changing GitHub alone does not deploy it.
 * Time-based triggers are approximate, not a push webhook or guaranteed SLA.
 */
function installFastSync() {
  ensureTrigger_('syncQuick', 1);
  return syncQuick();
}
function stopFastSync() {
  removeTrigger_('syncQuick');
  return {status:'FAST_LANE_DISABLED', fullMirrorUnchanged:true};
}
function quickSyncNow() { return syncQuick(); }

/**
 * One-minute lightweight fast lane: reads the pinned GitHub Actions source
 * index, reconciles missing/stale per-file Drive SHA state (including source
 * commits skipped during fast polling), then updates the stable handoff.
 * Files above maxQuickBytes remain pending and wake syncDrain/syncHourly.
 */
function syncQuick() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(0)) return {status:'SKIPPED_LOCK_BUSY'};
  try {
    const cfg = MIRROR_CONFIG;
    const props = PropertiesService.getScriptProperties();
    const index = readSourceIndex_();
    const previouslySeen = props.getProperty('megaQuickCommit');
    const previousPending = props.getProperty('megaQuickHasPending');
    // One-time reconciliation after deploying new code, even at the same source commit.
    const quickRevision='2026-11-12-reconcile-v2';
    const revisionChanged=props.getProperty('megaQuickRevision')!==quickRevision;
    if (previouslySeen===index.sourceCommit && previousPending==='0' && !revisionChanged) {
      return {status:'NO_SOURCE_CHANGE',sourceCommit:index.sourceCommit};
    }
    const root = DriveApp.getFolderById(cfg.mirrorFolderId);
    const manifestFile = getOrCreateManifest_(root);
    const state = parseState_(manifestFile);
    const filesByPath = {};
    index.files.forEach(function(e) { filesByPath[e.path.slice(cfg.prefix.length)] = e; });
    const isNewIndex = state.quickLaneIndexCommit !== index.sourceCommit;
    let changes = (state.quickLaneChangedPaths || []).filter(function(p) {
      return Boolean(filesByPath[p]);
    });
    let pending = (state.quickLanePendingPaths || []).filter(function(p) {
      return Boolean(filesByPath[p]);
    });
    if (isNewIndex || revisionChanged) {
      // A GitHub Actions delta covers only ONE index publication. Several main
      // commits can land before the next minute poll, leaving earlier added files
      // absent from the last delta. Compare the *complete index metadata* with
      // Drive's manifest; do not re-download already matching files.
      const publishedDelta = isNewIndex && Array.isArray(index.changedFiles) ?
        index.changedFiles : [];
      const missedOrStale = index.files.filter(function(e) {
        const p=e.path.slice(cfg.prefix.length), old=state.files[p];
        if (!old) return true; // Never mirrored, even if absent from this delta.
        if (old.status==='CURRENT') return !old.driveId || old.blobSha!==e.sha;
        // Historical SYNC_FAILED and ARCHIVED items stay on full sync's queue.
        return false;
      });
      const newPaths = uniquePaths_(publishedDelta.concat(missedOrStale).map(function(e) {
        return e.path.slice(cfg.prefix.length);
      })).filter(function(p) { return Boolean(filesByPath[p]); });
      changes = isNewIndex ? newPaths : uniquePaths_(changes.concat(newPaths));
      pending = uniquePaths_(newPaths.concat(pending));
      state.quickLaneIndexCommit = index.sourceCommit;
      state.quickLaneChangedPaths = changes;
    }
    pending = uniquePaths_(pending).filter(function(p) {
      const e=filesByPath[p], old=state.files[p];
      return e && !(old && old.status==='CURRENT' && old.blobSha===e.sha && old.driveId);
    });
    const started=Date.now(), errors=[], applied=[], deferredLarge=[];
    const retryAt=Date.parse(state.quickLaneRetryAfter || '');
    const retryBlocked=Number.isFinite(retryAt) && Date.now()<retryAt;
    let attempted=0;
    const remaining=[];
    const folderCache={'':root};
    for (const p of pending) {
      const entry=filesByPath[p];
      // Huge files stay pending (visible in the handoff) and activate the
      // full-mirror drain; do not silently drop them from the quick queue.
      if (entry.size>cfg.maxQuickBytes) {
        deferredLarge.push(p);
        remaining.push(p);
        continue;
      }
      if (retryBlocked || attempted>=cfg.maxQuickFilesPerRun ||
          Date.now()-started>cfg.maxQuickTimeMs) {
        remaining.push(p);
        continue;
      }
      attempted++;
      try {
        const bytes=fetchPinnedBytes_(entry.path,index.sourceCommit);
        if (gitBlobSha_(bytes)!==entry.sha) throw Error('Fast-lane Git blob SHA mismatch: '+p);
        const raw=Utilities.newBlob(bytes).getDataAsString('UTF-8');
        const name=p.split('/').pop(), relative=p.slice(0,-name.length).replace(/\/$/,'');
        const folder=getOrCreateSubfolder_(root,relative,folderCache);
        const wrapped=makeMirrorText_(entry,index.sourceCommit,raw);
        const saved=writeMirrorFileFast_(state.files[p]||{},folder,name,wrapped);
        state.files[p]={driveId:saved.id,blobSha:entry.sha,commitSha:index.sourceCommit,
          bytes:bytes.length,mime:saved.mime,status:'CURRENT',updatedAt:new Date().toISOString()};
        applied.push(p);
      } catch(err) {
        errors.push(p+': '+String(err).slice(0,200));
        remaining.push(p);
        state.quickLaneRetryAfter=new Date(Date.now()+cfg.quickErrorRetryMs).toISOString();
      }
    }
    state.quickLanePendingPaths=remaining;
    state.quickLaneDeferredLargePaths=deferredLarge;
    if (deferredLarge.length) ensureTrigger_('syncDrain',5);
    state.quickLaneCheckedAt=new Date().toISOString();
    state.quickLaneErrors=errors.slice(0,8);
    const handoff=makeFastHandoff_(index,state,changes,remaining,applied,errors);
    state.quickLaneHandoffId=writeFastHandoff_(root,state.quickLaneHandoffId,
      cfg.fastHandoffName,handoff);
    saveState_(manifestFile,state);
    props.setProperty('megaQuickCommit',index.sourceCommit);
    props.setProperty('megaQuickHasPending',remaining.length?'1':'0');
    props.setProperty('megaQuickRevision',quickRevision);
    const stillDrivePending=changes.some(function(p) {
      const e=filesByPath[p],v=state.files[p];
      return Boolean(e && !(v && v.status==='CURRENT' && v.blobSha===e.sha));
    });
    return {status:errors.length?'PARTIAL_WITH_ERRORS':remaining.length?'PARTIAL':
      stillDrivePending?'HANDOFF_READY_SOME_DRIVE_PENDING':'CURRENT_CHANGES_READY',
      sourceCommit:index.sourceCommit,changed:changes.length,updated:applied.length,
      pending:remaining.length,deferredLarge:deferredLarge.length,
      handoffId:state.quickLaneHandoffId,errors:errors};
  } finally {
    lock.releaseLock();
  }
}
function uniquePaths_(arr) {
  const seen={};
  return arr.filter(function(p) {
    if (typeof p!=='string' || !p || seen[p]) return false;
    seen[p]=true; return true;
  });
}
function readSourceIndex_() {
  const cfg=MIRROR_CONFIG;
  const url='https://raw.githubusercontent.com/'+cfg.owner+'/'+cfg.repository+'/'+cfg.branch+
    '/'+cfg.sourceIndexPath+'?nocache='+Math.floor(Date.now()/60000);
  const index=getJson_(url);
  if (index.schema!==1 || index.repository!==cfg.owner+'/'+cfg.repository ||
      index.branch!==cfg.branch || index.sourcePrefix!==cfg.prefix ||
      !Array.isArray(index.files) || !index.files.length ||
      !/^[0-9a-f]{40}$/.test(index.sourceCommit||'') ||
      !/^[0-9a-f]{40}$/.test(index.sourceTreeSha||'')) {
    throw Error('Public source index invalid; cannot fast-sync uncertain content');
  }
  index.files.forEach(function(e) {
    if (!e.path || !e.path.startsWith(cfg.prefix) ||
        !/^[0-9a-f]{40}$/.test(e.sha||'') ||
        typeof e.size!=='number') throw Error('Source index entry invalid');
  });
  return index;
}
function gitPinnedUrl_(path,commit) {
  return 'https://github.com/'+MIRROR_CONFIG.owner+'/'+MIRROR_CONFIG.repository+
    '/blob/'+commit+'/'+path.split('/').map(encodeURIComponent).join('/');
}
function makeFastHandoff_(index,state,changes,remaining,applied,errors) {
  const cfg=MIRROR_CONFIG, known={};
  index.files.forEach(function(e) { known[e.path.slice(cfg.prefix.length)]=e; });
  const lines=[
    '[GITHUB FAST HANDOFF | AUTO-GENERATED | NON-CANON]',
    'Generated at: '+new Date().toISOString(),
    'Source index commit: '+index.sourceCommit,
    'Source tree SHA: '+index.sourceTreeSha,
    'GitHub public source index: https://github.com/'+cfg.owner+'/'+cfg.repository+
       '/blob/main/'+cfg.sourceIndexPath,
    'Changed/unmirrored sources reconciled: '+changes.length,
    'Fast lane pending: '+remaining.length,
    'Large files deferred to full drain: '+(state.quickLaneDeferredLargePaths||[]).length,
    'Fast lane updated this run: '+applied.length,
    'Mirror status is per file. CURRENT means only SHA-match, NOT author Canon.',
    'Gemini: for any DRIVE_PENDING/STALE source use the PINNED GitHub link below;',
    'do not infer source text or claim it was read unless opened in this session.',
    'IMPORTANT: this notice is only a transport index; author-confirmed/CANDIDATE,',
    'PREWRITE HOLD and original information boundaries remain separate.',
    '----- RECENT CHANGED SOURCES -----'
  ];
  changes.slice(0,40).forEach(function(p) {
    const e=known[p], v=state.files[p];
    if (!e) return;
    const current=Boolean(v && v.status==='CURRENT' && v.blobSha===e.sha);
    lines.push((current?'DRIVE_CURRENT ':'DRIVE_PENDING_OR_STALE ')+p);
    lines.push('Source Git blob SHA: '+e.sha);
    lines.push('Pinned source URL: '+gitPinnedUrl_(e.path,index.sourceCommit));
  });
  if (changes.length>40) lines.push('... plus '+(changes.length-40)+
    ' changed entries; read full source-index.json for all source SHAs.');
  if (errors.length) lines.push('Fast lane errors (not marked CURRENT): '+errors.join(' | '));
  return lines.join('\n')+'\n';
}
function writeFastHandoff_(root,savedId,name,content) {
  let file=null;
  if (savedId) {
    try {
      const candidate=DriveApp.getFileById(savedId);
      if (candidate.getName()===name &&
          candidate.getMimeType()===MimeType.PLAIN_TEXT &&
          candidate.getBlob().getDataAsString('UTF-8').startsWith('[GITHUB FAST HANDOFF')) {
        file=candidate;
      }
    } catch(e) { /* Recreate if the recorded file disappeared. */ }
  }
  if (!file) {
    const it=root.getFilesByName(name);
    while (it.hasNext()) {
      const candidate=it.next();
      if (candidate.getMimeType()!==MimeType.PLAIN_TEXT) continue;
      try {
        if (candidate.getBlob().getDataAsString('UTF-8').startsWith('[GITHUB FAST HANDOFF')) {
          file=candidate; break;
        }
      } catch(e) { /* Do not overwrite unrelated user content. */ }
    }
  }
  if (!file) file=root.createFile(name,content,MimeType.PLAIN_TEXT);
  else file.setContent(content);
  return file.getId();
}
/**
 * Update an existing mirrored Google Doc or plain text file in place.
 * If a new mirror is needed, create PLAIN TEXT, never DocumentApp.create().
 * This is also the quota-safe fallback for the slow full-mirror loop.
 */
function writeMirrorFileFast_(prev,folder,name,text) {
  let file=null;
  if (prev.driveId) {
    try {
      const candidate=DriveApp.getFileById(prev.driveId);
      if (candidate.getName()===name) file=candidate;
    } catch(e) { /* Existing ID missing; recover by exact mirror marker. */ }
  }
  if (!file) {
    const it=folder.getFilesByName(name);
    while (it.hasNext()) {
      const candidate=it.next(), mime=candidate.getMimeType();
      if (mime!==MimeType.PLAIN_TEXT && mime!==MimeType.GOOGLE_DOCS) continue;
      try {
        const existing=mime===MimeType.GOOGLE_DOCS ?
          DocumentApp.openById(candidate.getId()).getBody().getText() :
          candidate.getBlob().getDataAsString('UTF-8');
        if (existing.startsWith('[GITHUB MIRROR｜AUTO-GENERATED｜DO NOT EDIT HERE]')) {
          file=candidate; break;
        }
      } catch(e) { /* Never adopt an unrelated or unreadable file. */ }
    }
  }
  if (!file) {
    file=folder.createFile(name,text,MimeType.PLAIN_TEXT);
    return {id:file.getId(),mime:MimeType.PLAIN_TEXT};
  }
  const mime=file.getMimeType();
  if (mime===MimeType.GOOGLE_DOCS) {
    const doc=DocumentApp.openById(file.getId());
    doc.getBody().setText(text);
    doc.saveAndClose();
  } else if (mime===MimeType.PLAIN_TEXT) {
    file.setContent(text);
  } else {
    throw Error('Unsupported existing mirror MIME: '+mime);
  }
  return {id:file.getId(),mime:mime};
}

function syncCore_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return { status: 'SKIPPED_LOCK_BUSY' };
  const cfg = MIRROR_CONFIG;
  const started = Date.now();
  try {
    const root = DriveApp.getFolderById(cfg.mirrorFolderId);
    const manifestFile = getOrCreateManifest_(root);
    const state = parseState_(manifestFile);
    // Public SHA index is generated by GitHub Actions, not the rate-limited REST API.
    // Google Apps Script uses shared IPs and can exhaust GitHub's 60/h unauthenticated limit.
    const indexUrl = 'https://raw.githubusercontent.com/' + cfg.owner + '/' + cfg.repository +
      '/' + cfg.branch + '/' + cfg.sourceIndexPath + '?nocache=' + Math.floor(Date.now() / 60000);
    const index = getJson_(indexUrl);
    if (index.schema !== 1 || index.repository !== cfg.owner + '/' + cfg.repository ||
        index.branch !== cfg.branch || index.sourcePrefix !== cfg.prefix ||
        !Array.isArray(index.files) || index.files.length === 0 ||
        !/^[0-9a-f]{40}$/.test(index.sourceCommit || '') ||
        !/^[0-9a-f]{40}$/.test(index.sourceTreeSha || '')) {
      throw Error('GitHub public source index missing or invalid; check Actions index publication.');
    }
    const head = {sha:index.sourceCommit};
    const tree = {sha:index.sourceTreeSha, truncated:false, tree:index.files.map(function(e) {
      if (!e.path || !e.path.startsWith(cfg.prefix) || !/^[0-9a-f]{40}$/.test(e.sha || '') ||
          typeof e.size !== 'number') throw Error('GitHub source index entry invalid');
      return {type:'blob', path:e.path, sha:e.sha, size:e.size};
    })};
    const matching = tree.tree.filter(function(entry) {
      return entry.type === 'blob' && entry.path.startsWith(cfg.prefix) &&
        cfg.allowedExtensions.some(function(ext) { return entry.path.toLowerCase().endsWith(ext); });
    }).sort(function(a,b) { return a.path.localeCompare(b.path); });
    const pathsNow = new Set(matching.map(function(entry) { return entry.path.slice(cfg.prefix.length); }));
    const folderCache = { '': root };
    const pending = matching.filter(function(entry) {
      const rel = entry.path.slice(cfg.prefix.length);
      const prev = state.files[rel];
      return !(prev && prev.blobSha === entry.sha && prev.driveId && prev.status === 'CURRENT');
    }).sort(function(a,b) {
      // Never let one repeatedly failing source block all untried files.
      const av=state.files[a.path.slice(cfg.prefix.length)];
      const bv=state.files[b.path.slice(cfg.prefix.length)];
      return Number(Boolean(av && av.status==='SYNC_FAILED')) - Number(Boolean(bv && bv.status==='SYNC_FAILED')) || a.path.localeCompare(b.path);
    });
    let updated = 0;
    let failed = 0;
    let bytes = 0;
    const errors = [];
    // A docs.create daily quota error is not an individual-file defect.
    // Save one shared cooldown so the 5-minute trigger does not burn through
    // eight identical failures every run. No manifest entry is marked CURRENT.
    const pauseUntilMs = Date.parse(state.docsCreateQuotaPauseUntil || '');
    const coolingDown = Number.isFinite(pauseUntilMs) && Date.now() < pauseUntilMs;
    let docsCreationPaused = coolingDown;
    let pausedForDocsQuotaThisRun = false;
    for (const entry of pending) {
      if (updated + failed >= cfg.maxFilesPerRun || Date.now() - started > cfg.maxTimeMs) break;
      const rel = entry.path.slice(cfg.prefix.length);
      try {
        const contentBytes = fetchPinnedBytes_(entry.path, head.sha);
        const observedSha = gitBlobSha_(contentBytes);
        if (observedSha !== entry.sha) throw Error('Blob SHA mismatch; expected '+entry.sha+' got '+observedSha);
        const raw = Utilities.newBlob(contentBytes).getDataAsString('UTF-8');
        const dir = rel.lastIndexOf('/') < 0 ? '' : rel.slice(0,rel.lastIndexOf('/'));
        const name = rel.slice(dir ? dir.length + 1 : 0);
        const dest = getOrCreateSubfolder_(root, dir, folderCache);
        const prev = state.files[rel] || {};
        const wrapped = makeMirrorText_(entry, head.sha, raw);
        let saved;
        if (docsCreationPaused) saved = writeMirrorFileFast_(prev,dest,name,wrapped);
        else {
          try { saved = writeMirrorFile_(prev,dest,name,wrapped,cfg.maxDocsChars); }
          catch(writeErr) {
            if (!isDailyDocsCreateQuotaError_(writeErr)) throw writeErr;
            docsCreationPaused=true;
            pausedForDocsQuotaThisRun=true;
            state.docsCreateQuotaPauseUntil = new Date(Date.now()+25*60*60*1000).toISOString();
            // Under Docs daily CREATE quota, do not retry create; mirror this
            // source as plain text or update an existing document instead.
            saved = writeMirrorFileFast_(prev,dest,name,wrapped);
          }
        }
        state.files[rel] = {
          driveId: saved.id,
          blobSha: entry.sha,
          commitSha: head.sha,
          bytes: contentBytes.length,
          mime: saved.mime,
          status: 'CURRENT',
          updatedAt: new Date().toISOString()
        };
        bytes += contentBytes.length;
        updated++;
      } catch (err) {
        failed++;
        errors.push(rel + ': ' + String(err).slice(0,250));
        // Don't mislabel old content as current on failures.
        const prev = state.files[rel] || {};
        state.files[rel] = Object.assign({}, prev, { status:'SYNC_FAILED', error:String(err).slice(0,300) });
        if (isDailyDocsCreateQuotaError_(err)) {
          // Conservative 25h from the observed limit: Google daily quotas
          // are not guaranteed to reset at a local midnight boundary.
          state.docsCreateQuotaPauseUntil = new Date(Date.now() + 25*60*60*1000).toISOString();
          pausedForDocsQuotaThisRun = true;
        }
      }
      // Resumable progress: survive a provider timeout after each attempted file.
      if ((updated + failed) % 2 === 0) saveState_(manifestFile,state);
    }
    // Preserve deleted sources as explicitly archived historical data; never erase.
    let archived = 0;
    let unfinished = 0;
    for (const entry of matching) {
      const p = entry.path.slice(cfg.prefix.length);
      const v = state.files[p];
      if (!(v && v.status === 'CURRENT' && v.blobSha === entry.sha)) unfinished++;
    }
    if (unfinished === 0) {
      for (const rel of Object.keys(state.files)) {
        if (pathsNow.has(rel) || state.files[rel].status === 'ARCHIVED') continue;
        try {
          const v = state.files[rel];
          if (v.driveId) {
            const archive = getOrCreateSubfolder_(root, '_99_GitHub已刪除_歷史封存', folderCache);
            DriveApp.getFileById(v.driveId).moveTo(archive);
          }
          v.status = 'ARCHIVED';
          v.archivedAt = new Date().toISOString();
          archived++;
        } catch(err) { errors.push('ARCHIVE '+rel+': '+String(err).slice(0,250)); }
      }
    }
    state.repo = `${cfg.owner}/${cfg.repository}`;
    state.branch = cfg.branch;
    state.sourcePrefix = cfg.prefix;
    state.latestCheckedCommit = head.sha;
    state.latestTreeSha = tree.sha || '';
    state.latestCheckedAt = new Date().toISOString();
    state.totalInTree = matching.length;
    state.pending = unfinished;
    state.successfulThisRun = updated;
    state.failedThisRun = failed;
    state.lastErrors = errors.slice(0,15);
    state.completeCommit = unfinished===0 && errors.length===0 ? head.sha : (state.completeCommit || null);
    saveState_(manifestFile,state);
    updateStatusDoc_(root,state);
    if (unfinished===0) removeTrigger_('syncDrain');
    else ensureTrigger_('syncDrain',5);
    return {status: unfinished===0 ? 'COMPLETE' :
      (coolingDown || pausedForDocsQuotaThisRun ? 'PARTIAL_PLAIN_TEXT_FALLBACK' : 'PARTIAL'), head:head.sha,
      total: matching.length, current:matching.length-unfinished, pending:unfinished,
      updated, failed, archived, bytes, errors:errors.slice(0,8),
      docsCreateQuotaPauseUntil:state.docsCreateQuotaPauseUntil || null};
  } finally { lock.releaseLock(); }
}
function isDailyDocsCreateQuotaError_(err) {
  const s = String(err || '').toLowerCase();
  return (s.includes('docs create') || s.includes('documentapp.create')) &&
    (s.includes('單日') || s.includes('for one day') || s.includes('per day') ||
     s.includes('daily') || s.includes('too many times') || s.includes('quota'));
}
function getJson_(url) {
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions:true,
    headers:{ 'Accept':'application/vnd.github+json', 'User-Agent':'StingrayNovelDriveMirror/1.0' },
    followRedirects:true });
  if (res.getResponseCode() !== 200) throw Error('GitHub public index HTTP '+res.getResponseCode()+' '+res.getContentText().slice(0,200));
  return JSON.parse(res.getContentText('UTF-8'));
}
function fetchPinnedBytes_(path,commit) {
  const pieces = path.split('/').map(encodeURIComponent).join('/');
  const url = 'https://raw.githubusercontent.com/'+MIRROR_CONFIG.owner+'/'+MIRROR_CONFIG.repository+'/'+commit+'/'+pieces;
  const res = UrlFetchApp.fetch(url,{muteHttpExceptions:true,headers:{'User-Agent':'StingrayNovelDriveMirror/1.0'}});
  if (res.getResponseCode() !== 200) throw Error('GitHub raw HTTP '+res.getResponseCode());
  return res.getContent();
}
function gitBlobSha_(bytes) {
  const hdr = Utilities.newBlob('blob '+bytes.length+'\0').getBytes();
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1,hdr.concat(bytes));
  return digest.map(function(b){ return ('0'+((b+256)%256).toString(16)).slice(-2); }).join('');
}
function makeMirrorText_(entry,commit,source) {
  return '[GITHUB MIRROR｜AUTO-GENERATED｜DO NOT EDIT HERE]\n'+
    'Repository: '+MIRROR_CONFIG.owner+'/'+MIRROR_CONFIG.repository+'\n'+
    'Original path: '+entry.path+'\n'+
    'Source Git blob SHA: '+entry.sha+'\n'+
    'Source commit SHA: '+commit+'\n'+
    'Source URL: https://github.com/'+MIRROR_CONFIG.owner+'/'+MIRROR_CONFIG.repository+'/blob/'+commit+'/'+entry.path.split('/').map(encodeURIComponent).join('/')+'\n'+
    'Authority: Mirrored source only; GitHub main inclusion DOES NOT imply approved novel Canon. Respect original CANDIDATE/NON-CANON labels.\n'+
    '----- BEGIN EXACT UTF-8 SOURCE TEXT -----\n'+source;
}
function writeMirrorFile_(prev,folder,name,text,maxChars) {
  // Use Google Docs only for small texts. Large Docs can hang for >360 seconds
  // in DocumentApp.setText/openById; mirror large files verbatim as text/plain.
  // GitHub SHA verification protects original bytes before text conversion.
  const isDoc = text.length <= maxChars;
  let file, id;
  if (prev.driveId) {
    try {
      file = DriveApp.getFileById(prev.driveId);
      id = file.getId();
      const prevIsDoc = file.getMimeType() === MimeType.GOOGLE_DOCS;
      if (isDoc !== prevIsDoc) {
        file.moveTo(getOrCreateSubfolder_(DriveApp.getFolderById(MIRROR_CONFIG.mirrorFolderId),'_98_檔案格式變更封存', {'':DriveApp.getFolderById(MIRROR_CONFIG.mirrorFolderId)}));
        id = null;
      }
    } catch(e) { id = null; }
  }
  if (!id) {
    // Adopt a pre-seeded source mirror doc, but never claim a random same-name
    // user file. This also recovers an orphan from an interrupted sync.
    const existing = folder.getFilesByName(name);
    while (existing.hasNext()) {
      const candidate=existing.next();
      try {
        // Skip an orphan of the opposite format: large sources are now
        // mirrored as plain UTF-8 text, never opened as enormous Google Docs.
        if ((candidate.getMimeType() === MimeType.GOOGLE_DOCS) !== isDoc) continue;
        const content=candidate.getMimeType()===MimeType.GOOGLE_DOCS
          ? DocumentApp.openById(candidate.getId()).getBody().getText()
          : candidate.getBlob().getDataAsString('UTF-8');
        if (content.startsWith('[GITHUB MIRROR｜AUTO-GENERATED｜DO NOT EDIT HERE]')) {
          file=candidate; id=candidate.getId(); break;
        }
      } catch(e) { /* Skip an unreadable unrelated file. */ }
    }
  }
  if (isDoc) {
    if (!id) {
      const document = DocumentApp.create(name);
      id = document.getId();
      file = DriveApp.getFileById(id);
      file.moveTo(folder);
    }
    const document = DocumentApp.openById(id);
    document.getBody().setText(text);
    document.saveAndClose();
    file = DriveApp.getFileById(id);
  } else {
    if (id) file.setContent(text);
    else { file = folder.createFile(name,text,MimeType.PLAIN_TEXT); id=file.getId(); }
  }
  if (file.getName() !== name) file.setName(name);
  file.moveTo(folder);
  return {id:id,mime:isDoc?MimeType.GOOGLE_DOCS:MimeType.PLAIN_TEXT};
}
function getOrCreateManifest_(root) {
  const it = root.getFilesByName(MIRROR_CONFIG.manifestFileName);
  if (it.hasNext()) return it.next();
  return root.createFile(MIRROR_CONFIG.manifestFileName,JSON.stringify({schema:1,files:{}},null,2),MimeType.PLAIN_TEXT);
}
function parseState_(file) {
  const data = JSON.parse(file.getBlob().getDataAsString('UTF-8'));
  if (data.schema !== 1 || typeof data.files !== 'object' || data.files === null) throw Error('Invalid manifest; refusing to overwrite');
  return data;
}
function saveState_(file,state) { file.setContent(JSON.stringify(state,null,2)); }
function getOrCreateSubfolder_(root,relative,cache) {
  if (!relative) return root;
  if (cache[relative]) return cache[relative];
  const items = relative.split('/');
  let parent=root, p='';
  for (const segment of items) {
    p = p ? p+'/'+segment : segment;
    if (cache[p]) { parent=cache[p]; continue; }
    const list = parent.getFoldersByName(segment);
    const next=list.hasNext()?list.next():parent.createFolder(segment);
    cache[p]=next;
    parent=next;
  }
  return parent;
}
function updateStatusDoc_(root,state) {
  let doc;
  const it=root.getFilesByName(MIRROR_CONFIG.statusDocName);
  if (it.hasNext()) doc=DocumentApp.openById(it.next().getId());
  else {
    doc=DocumentApp.create(MIRROR_CONFIG.statusDocName);
    DriveApp.getFileById(doc.getId()).moveTo(root);
  }
  const current=Object.values(state.files).filter(x=>x.status==='CURRENT').length;
  const body=[
    'GitHub MAIN → Stingray Drive｜自動同步狀態',
    '來源：'+state.repo+' @ '+state.branch,
    '原始路徑：'+state.sourcePrefix,
    '最後檢查：'+state.latestCheckedAt,
    '最新檢查 HEAD：'+state.latestCheckedCommit,
    '已完整同步 HEAD：'+(state.completeCommit||'尚未完成首次完整同步'),
    'GitHub 範圍內檔案數：'+state.totalInTree,
    'CURRENT：'+current+'｜未完成/失敗：'+state.pending,
    '本輪成功：'+state.successfulThisRun+'｜本輪失敗：'+state.failedThisRun,
    'Google Docs 每日建立額度冷卻至：'+
      (Date.parse(state.docsCreateQuotaPauseUntil||'') > Date.now() ? state.docsCreateQuotaPauseUntil : '目前無冷卻'),
    '失敗（若有）：'+(state.lastErrors||[]).join(' | '),
    '注意：這是來源鏡像，不是新 Canon。Gemini 應按需讀取原文及後出修訂；不能把 CANDIDATE、PREWRITE HOLD 當正式正文。',
    '鏡像僅由 Apps Script 維護。不要在鏡像內編輯原文；請在 GitHub main 修改。已刪除來源會移入封存，不會永久刪除。',
    '完整檔案級 Git blob SHA/Drive ID 清冊：_GITHUB_SYNC_STATE.json。'
  ].join('\n\n');
  doc.getBody().setText(body);
  doc.saveAndClose();
}
function ensureTrigger_(functionName, intervalMin) {
  const existing=ScriptApp.getProjectTriggers().some(function(t){return t.getHandlerFunction()===functionName;});
  if (existing) return;
  const b=ScriptApp.newTrigger(functionName).timeBased();
  if (intervalMin>=60) b.everyHours(1).create();
  else b.everyMinutes(intervalMin).create();
}
function removeTrigger_(fn) {
  for (const t of ScriptApp.getProjectTriggers()) if (t.getHandlerFunction()===fn) ScriptApp.deleteTrigger(t);
}