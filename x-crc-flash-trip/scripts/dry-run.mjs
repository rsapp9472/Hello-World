/**
 * Local Free-tier measurement. Does not POST and does not call wrangler deploy.
 * Network time is excluded from cpu_ms. Re-parses captured bytes for a median.
 */
import fs from "node:fs";
import { FEEDS, LIMITS, processFeedXml, runTrip } from "../src/worker.js";

class MemKV {
  constructor() {
    this.map = new Map();
  }
  async get(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  async put(key, value) {
    this.map.set(key, value);
  }
}

const allowed = new Set(FEEDS.map((f) => f.url));

async function guardedFetch(url, init) {
  const method = (init && init.method) || "GET";
  if (method !== "GET") throw new Error("dry-run blocked non-GET");
  const u = String(url);
  if (!allowed.has(u)) throw new Error(`dry-run blocked non-allowlist URL: ${u}`);
  return fetch(u, init);
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  if (s.length % 2) return s[mid];
  return (s[mid - 1] + s[mid]) / 2;
}

function bench(captured, nowMs) {
  const times = [];
  for (let i = 0; i < 11; i++) {
    const t0 = performance.now();
    for (const row of captured) {
      if (!row.bytes) continue;
      const xml = new TextDecoder("utf-8", { fatal: false }).decode(row.bytes);
      processFeedXml(xml, row.source, nowMs);
    }
    const dt = performance.now() - t0;
    if (i > 0) times.push(dt);
  }
  return { median: median(times), max: Math.max(...times) };
}

const now = new Date();
const kv = new MemKV();
const result = await runTrip(
  { TRIP_KV: kv, CURSOR_WEBHOOK_URL: "", CURSOR_AUTH_HEADER: "" },
  { dryRun: true, now, fetch: guardedFetch, capture: true }
);

const cpuBench = bench(result.captured || [], now.getTime());
const hashWritesCeiling = LIMITS.maxNewHashesPerEtDay;
const dayWritesCeiling = LIMITS.maxNewHashesPerEtDay;
const writeCeiling = hashWritesCeiling + dayWritesCeiling;
const matchReadsPerRunUpper = 1 + LIMITS.maxItems;
const readsPerDayUpper = matchReadsPerRunUpper * LIMITS.invocationsPerDay;
const typicalSubrequests = FEEDS.length;
const redirectWorst = FEEDS.length * 2 + LIMITS.maxPostsPerEtDay;

const cpuFail = Math.max(result.cpu_ms, cpuBench.median) > 8;
const subFail = result.outbound_subrequests > LIMITS.maxOutbound;
const writeFail = writeCeiling > 1000;
const readFail = readsPerDayUpper > 100000;
const invokeFail = LIMITS.invocationsPerDay > 100000;
const feedFail = FEEDS.length > LIMITS.maxFeeds || FEEDS.length < 8;
const pass = !cpuFail && !subFail && !writeFail && !readFail && !invokeFail && !feedFail;

const lines = [];
lines.push("# Path B dry-run");
lines.push("");
lines.push(`Measured: ${now.toISOString()}`);
lines.push("Host: local Node. cpu_ms is synchronous decode + parse + phrase match time. Network wait is not included. This is a proxy for the Workers Free 10 ms CPU cap, with a fail line of 8 ms.");
lines.push("No webhook POST was sent. No wrangler deploy was run.");
lines.push("");
lines.push(`Result: ${pass ? "PASS" : "FAIL"}`);
lines.push("");
lines.push("## This invocation");
lines.push("");
lines.push(`- Feeds configured: ${result.feeds_configured}`);
lines.push(`- Feeds fetched OK: ${result.feeds_fetched}`);
lines.push(`- Outbound subrequests: ${result.outbound_subrequests}`);
lines.push(`- Items parsed: ${result.items_parsed}`);
lines.push(`- Phrase matches (fresh + severity): ${result.phrase_matches}`);
lines.push(`- Would POST: ${result.would_post}`);
lines.push(`- KV reads this run: ${result.kv_reads}`);
lines.push(`- KV writes this run: ${result.kv_writes} (dry-run does not put)`);
lines.push(`- Would KV-write if hashes were new: ${result.would_kv_writes}`);
lines.push(`- cpu_ms this run: ${result.cpu_ms}`);
lines.push(`- cpu_ms median of 10 re-parses: ${cpuBench.median.toFixed(3)}`);
lines.push(`- cpu_ms max of 10 re-parses: ${cpuBench.max.toFixed(3)}`);
lines.push("");
lines.push("## Free-tier arithmetic");
lines.push("");
lines.push(`- Cron: \`${LIMITS.cron}\` UTC = every 5 minutes, 24/7 America/New_York`);
lines.push(`- Invocations/day: ${LIMITS.invocationsPerDay} (cap 100000)`);
lines.push(`- Typical outbound subrequests: ${typicalSubrequests} feed GETs, 0 posts on a miss (cap 50, hard cap in code ${LIMITS.maxOutbound})`);
lines.push(`- Worst outbound if every feed redirects once and 3 posts fire: ${redirectWorst}`);
lines.push(`- Quiet KV reads: ${result.phrase_matches === 0 ? 0 : "not this run"}`);
lines.push(`- Quiet KV writes: 0 when nothing matches. This run phrase_matches=${result.phrase_matches}, measured kv_writes=${result.kv_writes}`);
lines.push(`- KV writes happen only when a fresh severity hash is new, or that new hash is a fire. A full miss does not read or write KV.`);
lines.push(`- Write ceiling: at most ${LIMITS.maxNewHashesPerEtDay} new hashes/ET day, each one hash put, plus one day-counter put on a run that records a hash. Ceiling ${writeCeiling}/day (cap 1000).`);
lines.push(`- Read ceiling if every run has ${LIMITS.maxItems} fresh matches: ${readsPerDayUpper}/day (cap 100000). A quiet run is 0.`);
lines.push(`- Waves: ${LIMITS.waveSize} connections. Bytes/feed cap: ${LIMITS.maxBytes}. Items/feed cap: ${LIMITS.maxItems}.`);
lines.push("");
lines.push("## Feeds");
lines.push("");
for (const feed of result.feeds || []) {
  lines.push(`- ${feed.source}: ok=${feed.ok} bytes=${feed.bytes} items=${feed.items} subrequests=${feed.subrequests} error=${feed.error || ""}`);
}
lines.push("");
if (!pass) {
  lines.push("## Failures");
  lines.push("");
  if (cpuFail) lines.push("- CPU proxy over 8 ms");
  if (subFail) lines.push("- Subrequests over 20");
  if (writeFail) lines.push("- KV write ceiling over 1000/day");
  if (readFail) lines.push("- KV read ceiling over 100000/day");
  if (invokeFail) lines.push("- Invocations over 100000/day");
  if (feedFail) lines.push("- Feed count outside 8–12");
  lines.push("");
}

const report = lines.join("\n");
const outPath = new URL("../DRY-RUN.md", import.meta.url);
fs.writeFileSync(outPath, report);
console.log(report);
if (!pass) process.exit(1);
