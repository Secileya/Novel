#!/usr/bin/env node
/** Check Gemini CLI wiring, actual presence of referenced sources, and no quota coercion. This is NOT proof of Gemini execution. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(here,'../../../..'),project=path.resolve(here,'../..');
const cmd=fs.readFileSync(path.join(repo,'.gemini/commands/mega/voice.toml'),'utf8');
const gem=fs.readFileSync(path.join(project,'GEMINI.md'),'utf8');
const doc=fs.readFileSync(path.join(here,'Gemini_原生語氣庫執行接線.md'),'utf8');
const failures=[];
const sources=[
'小說/巨構世界（法月懷造物）/03_人物關係與語感/105_對話語庫_莉雅口語素材_標點節奏咬字與情境演出.md',
'小說/巨構世界（法月懷造物）/03_人物關係與語感/059_最新確認_雙主角語氣頻率_靜謐迴廊巨幅雙提升_全庫稽核要求.md',
'小說/巨構世界（法月懷造物）/00_分類導航/設定關聯引擎/語氣語庫_寫作前後查閱與非強制QA.md'];
for(const s of sources){if(!fs.existsSync(path.join(repo,s)))failures.push('Missing real source '+s);if(!cmd.includes('@{'+s+'}'))failures.push('Gemini custom prompt does not inject source '+s);}
for(const s of ['description =','prompt = """','{{args}}','NON-CANON','不改檔'])if(!cmd.includes(s))failures.push('Gemini .toml missing '+s);
for(const s of ['第105','第059','沒有強制次數','PREWRITE HOLD'])if(!gem.includes(s))failures.push('Gemini md missing '+s);
for(const s of ['Gemini 網頁版','Gemini CLI','NOT_VERIFIED','快照'])if(!doc.includes(s))failures.push('Web/CLI guidance missing '+s);
if(/每章至少.+(我去|嘆詞)|強制插入我去|每章必須使用/.test(cmd))failures.push('Prohibited mandatory phrase quota');
if(process.argv.includes('--self-test')){const altered=cmd.replace('@{'+sources[0]+'}','@{NO_SUCH_FILE.md}');if(altered.includes('@{'+sources[0]+'}'))failures.push('broken-reference fixture undetected');}
if(failures.length){console.error(failures.join('\n'));process.exitCode=2}else console.log('Gemini web guide, CLI voice command and actual 105/059 injection wiring PASS. Does NOT prove Gemini model has executed.');
