// 方九×莉雅逐輪原文純資料合併器 v1 — no GitHub credentials or network.
// Usage: read remote JSON + SHA, call appendTurnBatch(...), update GitHub with old SHA, fetch again.
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(
    Object.keys(value).sort().map(key => [key, stable(value[key])])
  );
  return value;
}
function equal(a, b) { return JSON.stringify(stable(a)) === JSON.stringify(stable(b)); }
function assertMessage(m) {
  if (!m || typeof m !== "object") throw Error("INVALID_MESSAGE");
  if (typeof m.message_key !== "string" || !m.message_key.trim()) throw Error("MISSING_STABLE_MESSAGE_KEY");
  if (!["user", "liya"].includes(m.role)) throw Error("INVALID_ROLE");
  if (typeof m.text !== "string" || m.text.length === 0) throw Error("MISSING_VERBATIM_TEXT");
  if (!["automation", "chat", "imported_verified"].includes(m.source_kind)) throw Error("INVALID_SOURCE_KIND");
  if (!["observed_user", "prepared_not_delivery_verified", "delivery_confirmed_by_user"].includes(m.record_status)) throw Error("INVALID_RECORD_STATUS");
  if (m.role === "user" && m.record_status !== "observed_user") throw Error("UNVERIFIED_USER_TEXT");
  if (m.role === "liya" && m.record_status === "observed_user") throw Error("INVALID_ASSISTANT_STATUS");
}
export function appendTurnBatch(original, incoming, context) {
  if (!context || typeof context.session_key !== "string" || !context.session_key.trim()) throw Error("SESSION_REQUIRED");
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(context.local_date || "")) throw Error("DATE_REQUIRED");
  const base = original == null ? {
    schema_version: 1, session_key: context.session_key, local_date: context.local_date,
    timezone: "Asia/Taipei", messages: []
  } : structuredClone(original);
  if (base.schema_version !== 1 || base.session_key !== context.session_key ||
      base.local_date !== context.local_date || base.timezone !== "Asia/Taipei" ||
      !Array.isArray(base.messages)) throw Error("SESSION_OR_SCHEMA_MISMATCH");
  const byKey = new Map();
  for (const msg of base.messages) {
    assertMessage(msg);
    if (byKey.has(msg.message_key)) throw Error("EXISTING_DUPLICATE_KEYS");
    byKey.set(msg.message_key, msg);
  }
  const seenIncoming = new Set(); let added = 0, skipped = 0;
  for (const msg of incoming) {
    assertMessage(msg);
    if (seenIncoming.has(msg.message_key)) throw Error("DUPLICATE_INCOMING_KEYS");
    seenIncoming.add(msg.message_key);
    const existing = byKey.get(msg.message_key);
    if (existing) {
      if (!equal(existing, msg)) throw Error("MESSAGE_KEY_COLLISION");
      skipped++; continue;
    }
    const immutable = structuredClone(msg);
    base.messages.push(immutable); byKey.set(immutable.message_key, immutable); added++;
  }
  return {archive:base, added, skipped, changed:added>0};
}
// Never change message_key on a retry; re-read remote blob and reapply exactly the same batch after a SHA conflict.
