/**
 * One-time unpacker for the five Novel reading ZIPs already in Stingray Drive.
 * Does not create native Google Docs, modify GitHub, or delete anything.
 * Sign in to Stingray, paste into an independent Apps Script project,
 * run startNovelReadingImport once, authorize Drive access.
 * The time trigger resumes in bounded batches and is removed at completion.
 */
const NOVEL_READING = {
  folderName: 'GitHub_MAIN_Novel_Gemini全文閱讀資料庫',
  prefix: 'Novel-reading-14a38e1-PACK_',
  commit: '14a38e10bb7aa2f6b63566d9d8169c12f4010ede',
  packCount: 5, expectedVolumes: 832,
  stateKey: 'novelReadingImport14a38e1', handler: 'continueNovelReadingImport',
  limitMs: 230000, maxPerRun: 100
};
function getOnly_(it, label) {
  if (!it.hasNext()) throw Error('Missing '+label);
  const item=it.next();
  if(it.hasNext()) throw Error('Ambiguous '+label);
  return item;
}
function getReadingRoot_() {
  return getOnly_(DriveApp.getRootFolder().getFoldersByName(NOVEL_READING.folderName), NOVEL_READING.folderName);
}
function ensureChild_(parent,name) {
  const it=parent.getFoldersByName(name);
  if(it.hasNext()) return getOnly_(it,name);
  return parent.createFolder(name);
}
function sha256_(bytes) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,bytes).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('');
}
function stopNovelReadingImport() {
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()===NOVEL_READING.handler).forEach(t=>ScriptApp.deleteTrigger(t));
}
function startNovelReadingImport() {
  getReadingRoot_();
  const props=PropertiesService.getScriptProperties();
  if(!props.getProperty(NOVEL_READING.stateKey)) props.setProperty(NOVEL_READING.stateKey,JSON.stringify({pack:1,offset:0,processed:0,volumes:0}));
  if(!ScriptApp.getProjectTriggers().some(t=>t.getHandlerFunction()===NOVEL_READING.handler))
    ScriptApp.newTrigger(NOVEL_READING.handler).timeBased().everyMinutes(5).create();
  return continueNovelReadingImport();
}
function continueNovelReadingImport() {
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(0)) return 'BUSY';
  const cfg=NOVEL_READING, started=Date.now(), props=PropertiesService.getScriptProperties();
  let s=JSON.parse(props.getProperty(cfg.stateKey)||'{"pack":1,"offset":0,"processed":0,"volumes":0}');
  const save=()=>props.setProperty(cfg.stateKey,JSON.stringify(s));
  try {
    const root=getReadingRoot_(), out=ensureChild_(root,'01_已展開_全文資料庫_14a38e1');
    const cache={'':out};
    let count=0;
    while(s.pack<=cfg.packCount && Date.now()-started<cfg.limitMs && count<cfg.maxPerRun) {
      const filename=cfg.prefix+String(s.pack).padStart(2,'0')+'.zip';
      const zip=getOnly_(root.getFilesByName(filename),filename);
      const entries=Utilities.unzip(zip.getBlob()).filter(b=>!b.getName().endsWith('/')).sort((a,b)=>a.getName()<b.getName()?-1:a.getName()>b.getName()?1:0);
      while(s.offset<entries.length && Date.now()-started<cfg.limitMs && count<cfg.maxPerRun) {
        const blob=entries[s.offset], parts=blob.getName().split('/');
        if(parts.some(p=>!p||p==='.'||p==='..'||p.includes('\\'))) throw Error('Unsafe path: '+blob.getName());
        const name=parts.pop();
        if(!/\.(txt|json)$/i.test(name)) throw Error('Unexpected file type: '+name);
        let folder=out, key='';
        for(const part of parts) {
          key=key?key+'/'+part:part;
          if(!cache[key]) cache[key]=ensureChild_(folder,part);
          folder=cache[key];
        }
        const bytes=blob.getBytes(), expected=sha256_(bytes), it=folder.getFilesByName(name);
        let file;
        if(it.hasNext()) file=getOnly_(it,name);
        else file=folder.createFile(blob.setName(name).setContentType(name.endsWith('.json')?'application/json':'text/plain'));
        if(file.getSize()!==bytes.length || sha256_(file.getBlob().getBytes())!==expected) throw Error('Drive verification failed: '+blob.getName());
        s.offset++;s.processed++;count++;
        if(/^VOL_\d+\.txt$/.test(name)) s.volumes++;
        delete s.error;save();
      }
      if(s.offset===entries.length){s.pack++;s.offset=0;save();}
    }
    if(s.pack>cfg.packCount) {
      if(s.volumes!==cfg.expectedVolumes) throw Error('Volume count mismatch '+s.volumes);
      const idx=getOnly_(out.getFoldersByName('00_全域索引'),'00_全域索引');
      const man=JSON.parse(getOnly_(idx.getFilesByName('MANIFEST.json'),'MANIFEST.json').getBlob().getDataAsString('UTF-8'));
      if(man.commit!==cfg.commit||man.volume_count!==cfg.expectedVolumes||man.text_files!==3789) throw Error('Manifest mismatch');
      s.complete=true;save();stopNovelReadingImport();
    }
    Logger.log(JSON.stringify(s));return s;
  } catch(e) {
    s.error=String(e);save();stopNovelReadingImport();throw e;
  } finally {lock.releaseLock();}
}
function novelReadingImportStatus(){return JSON.parse(PropertiesService.getScriptProperties().getProperty(NOVEL_READING.stateKey)||'{}');}
