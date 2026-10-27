import assert from "node:assert/strict";
import {appendTurnBatch} from "./逐輪存檔合併器.mjs";
const ctx={session_key:"TEST-LIYA-20261027",local_date:"2026-10-27"};
const m=(key,role,text,reply_to_id=null)=>({
 message_key:key,role,text,source_kind:role==="liya"?"automation":"chat",source_ref:"synthetic_test_only",
 reply_to_id,origin_time:null,record_status:role==="liya"?"prepared_not_delivery_verified":"observed_user"
});
const transcript=[
 m("t1-a","liya","方九，剛才找到個怪數據。"),
 m("t1-u","user","你又把參數看錯了嗎？","t1-a"),
 m("t1-b","liya","……我就知道你會這麼說！","t1-u"),
 m("t2-u","user","\n這次我真的想看看。\n","t1-b"),
 m("t2-b","liya","那你過來瞧瞧。","t2-u"),
 m("t3-u","user","好，繼續。","t2-b")
];
const first=appendTurnBatch(null,transcript.slice(0,3),ctx);
assert.equal(first.added,3);
const second=appendTurnBatch(first.archive,transcript.slice(3),ctx);
assert.equal(second.added,3);assert.equal(second.archive.messages.length,6);
assert.equal(second.archive.messages[3].text,"\n這次我真的想看看。\n");
const repeat=appendTurnBatch(second.archive,transcript.slice(3),ctx);
assert.equal(repeat.added,0);assert.equal(repeat.skipped,3);assert.equal(repeat.archive.messages.length,6);
assert.throws(()=>appendTurnBatch(second.archive,[m("t3-u","user","同鍵卻改了文字")],ctx),/MESSAGE_KEY_COLLISION/);
assert.throws(()=>appendTurnBatch(second.archive,[m("t4-b","dragon","錯誤角色")],ctx),/INVALID_ROLE/);
assert.throws(()=>appendTurnBatch(second.archive,[{...m("t4-u","user","測試"),record_status:"prepared_not_delivery_verified"}],ctx),/UNVERIFIED_USER_TEXT/);
assert.throws(()=>appendTurnBatch(second.archive,[m("t4-b","liya","一則")],{session_key:"wrong",local_date:"2026-10-27"}),/SESSION_OR_SCHEMA_MISMATCH/);
const identical=appendTurnBatch(second.archive,[m("t4-u","user","好，繼續。")],ctx);
assert.equal(identical.archive.messages.length,7); // true second user occurrence must not be erased by text comparison
console.log("PASS: 3 rounds/6 ordered verbatim messages; multiline; idempotent retry; key collision; schema; role; verified user; legitimate identical text");
