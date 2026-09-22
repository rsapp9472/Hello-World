/**
 * x-crc-flash-trip
 * PATH B ONLY. Do not merge into x-crc-bridge or x-crc-bridge-mining.
 * Do not add these fetches to the Path A Workers. Do not change Path A crons.
 *
 * Immediate silent tripwire. No LLM. No OpenRouter. No Grok. No Flash Triage.
 * Do not read or set FLASH_TRIAGE_WEBHOOK_URL / FLASH_TRIAGE_AUTH_HEADER.
 * A fire POSTs once to CURSOR_WEBHOOK_URL with CURSOR_AUTH_HEADER.
 *
 * Cloudflare cron is UTC. crons = ["*\/5 * * * *"] is every 5 minutes, 24/7,
 * which is 24/7 America/New_York. Daily post cap and fetched_at use ET.
 */

export const LIMITS = {
  maxOutbound: 20,
  waveSize: 6,
  maxBytes: 16 * 1024,
  maxItems: 8,
  maxFeeds: 12,
  maxAgeMs: 20 * 60 * 1000,
  futureSkewMs: 5 * 60 * 1000,
  maxPostsPerEtDay: 3,
  maxNewHashesPerEtDay: 24,
  hashTtlSec: 24 * 60 * 60,
  dayTtlSec: 48 * 60 * 60,
  fetchTimeoutMs: 8000,
  textChars: 300,
  cron: "*/5 * * * *",
  invocationsPerDay: 288,
};

// Official/wire only. Unused slots stay empty. Not the Path A 42 or the mining 6.
// URLs verified 200 + XML + zero redirects on 2026-09-22. AP RSS and UKMTO
// returned 403. Classic Reuters RSS returned 401. CENTCOM had no verified
// command-only RSS (DoD releases cover that slot). EIA Today in Energy is a
// Path A URL and is not an emergency feed.
export const FEEDS = [
  {
    name: "Reuters Wire",
    url: "https://www.reuters.com/arc/outboundfeeds/news-sitemap/?outputType=xml",
  },
  {
    name: "DOE Press",
    url: "https://www.energy.gov/rss/energygov/2193718",
  },
  {
    name: "USGS Significant Earthquakes",
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.atom",
  },
  {
    name: "USCG Houston-Galveston BNM",
    url: "https://public.govdelivery.com/topics/USDHSCG_420/feed.rss",
  },
  {
    name: "DoD Releases",
    url: "https://www.war.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=945&max=8",
  },
  {
    name: "Federal Register Presidential Documents",
    url: "https://www.federalregister.gov/api/v1/documents.rss?conditions[type][]=PRESDOCU&order=newest",
  },
  {
    name: "White House Presidential Actions",
    url: "https://www.whitehouse.gov/presidential-actions/feed/",
  },
  {
    name: "MSHA",
    url: "https://www.msha.gov/rss.xml",
  },
];

// Source AND phrase. Do not add generic oil / Trump / war risk / markets.
const PHRASES = [
  "force majeure declared",
  "declaration of war",
  "chokepoint closed",
  "evacuation ordered",
  "hurricane landfall",
  "national emergency",
  "emergency facility",
  "halted operations",
  "operations halted",
  "production halted",
  "strike authorized",
  "loading halted",
  "force majeure",
  "strait closed",
  "canal closed",
  "port closed",
  "shutdown",
  "explosion",
  "ruptured",
  "rupture",
  "collapse",
  "missile",
  "blockade",
  "earthquake",
  "nuclear",
  "pipeline",
  "fire at",
  "blast at",
];

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const SEVERITY_RE = new RegExp(
  "\\b(?:" +
    [...PHRASES].sort((a, b) => b.length - a.length).map(escapeReg).join("|") +
    ")\\b",
  "i"
);

const FEED_HEADERS = {
  "user-agent": "x-crc-flash-trip/1.0 (+rss-poll)",
  accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
};

export function matchSeverity(title, text) {
  const hay = `${title || ""} ${text || ""}`;
  return SEVERITY_RE.test(hay);
}

export function normalizeTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeUrl(link) {
  const raw = String(link || "").trim();
  try {
    const u = new URL(raw);
    u.hash = "";
    let s = u.toString();
    if (s.endsWith("/")) s = s.slice(0, -1);
    return s;
  } catch {
    return raw;
  }
}

export async function hashId(url, title) {
  const material = `${normalizeUrl(url)}\n${normalizeTitle(title)}`;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(material)
  );
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

export function etParts(date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "longOffset",
  });
  const bag = {};
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== "literal") bag[p.type] = p.value;
  }
  if (bag.hour === "24") bag.hour = "00";
  return bag;
}

export function etDateKey(date) {
  const bag = etParts(date);
  return `${bag.year}-${bag.month}-${bag.day}`;
}

export function formatFetchedAt(date) {
  const bag = etParts(date);
  const name = bag.timeZoneName || "GMT";
  let off = "+00:00";
  const m = /GMT([+-])(\d{1,2})(?::?(\d{2}))?/.exec(name);
  if (m) off = `${m[1]}${m[2].padStart(2, "0")}:${m[3] || "00"}`;
  return `${bag.year}-${bag.month}-${bag.day}T${bag.hour}:${bag.minute}:${bag.second}${off}`;
}

export function buildPayload(fields) {
  return {
    source: fields.source,
    title: fields.title,
    link: fields.link,
    text: String(fields.text || "").slice(0, LIMITS.textChars),
    hash: fields.hash,
    fetched_at: fields.fetchedAt,
    label: "PATH_B_TRIP",
  };
}

export function processFeedXml(xml, source, nowMs) {
  const kind = detectKind(xml);
  if (!kind) return { items: 0, matches: [] };
  const blocks = sliceBlocks(xml, kind, LIMITS.maxItems);
  const matches = [];
  let items = 0;
  for (const chunk of blocks) {
    const title = clean(textOf(chunk, "news:title") || textOf(chunk, "title"));
    const link = linkOf(chunk, kind);
    if (!title && !link) continue;
    items++;
    const publishedMs = publishedOf(chunk);
    if (!Number.isFinite(publishedMs) || publishedMs <= 0) continue;
    if (publishedMs > nowMs + LIMITS.futureSkewMs) continue;
    if (nowMs - publishedMs > LIMITS.maxAgeMs) continue;
    const text = snippet(
      textOf(chunk, "description") || textOf(chunk, "summary") || ""
    );
    if (!matchSeverity(title, text)) continue;
    matches.push({
      source,
      title,
      link,
      text: text.slice(0, LIMITS.textChars),
      publishedMs,
    });
  }
  return { items, matches };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/trip-run") {
      const dry = url.searchParams.get("dry") === "1";
      try {
        const result = await runTrip(env, { dryRun: dry });
        return json(result);
      } catch (e) {
        return json(
          { error: "trip_run_threw", message: String(e && e.message || e) },
          500
        );
      }
    }
    if (request.method === "GET") {
      return json({
        ok: true,
        service: "x-crc-flash-trip",
        path: "B",
        note: "Path B only. Do not merge into x-crc-bridge or x-crc-bridge-mining.",
        cron: LIMITS.cron,
        tz: "America/New_York",
        feeds: FEEDS.length,
        webhook_configured: Boolean(
          env.CURSOR_WEBHOOK_URL && env.CURSOR_AUTH_HEADER
        ),
      });
    }
    return new Response("Method Not Allowed", { status: 405 });
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runTrip(env, {}));
  },
};

export async function runTrip(env, opts = {}) {
  const now = opts.now instanceof Date ? opts.now : new Date();
  const nowMs = now.getTime();
  const dryRun = Boolean(opts.dryRun);
  const fetchFn = opts.fetch || env.__fetch || fetch;
  const secretsReady = Boolean(env.CURSOR_WEBHOOK_URL && env.CURSOR_AUTH_HEADER);
  if (!dryRun && !secretsReady) {
    return baseResult({
      dry_run: false,
      ok: false,
      error: "missing_cursor_secrets",
    });
  }
  if (!dryRun && !env.TRIP_KV) {
    return baseResult({
      dry_run: false,
      ok: false,
      error: "kv_unbound",
    });
  }
  const cpu = { ms: 0 };
  const budget = { left: LIMITS.maxOutbound, used: 0 };
  const feeds = FEEDS.slice(0, LIMITS.maxFeeds);
  const fetched = await fetchAll(feeds, budget, fetchFn, cpu, nowMs);
  const matches = [];
  let itemsParsed = 0;
  const feedStats = [];
  for (const row of fetched) {
    feedStats.push({
      source: row.source,
      ok: row.ok,
      error: row.error || null,
      bytes: row.bytes || 0,
      items: row.items || 0,
      subrequests: row.subrequests || 0,
    });
    itemsParsed += row.items || 0;
    if (row.matches) matches.push(...row.matches);
  }
  matches.sort((a, b) => b.publishedMs - a.publishedMs);

  const dispatched = await dispatchMatches(env, matches, now, {
    dryRun,
    fetchFn,
    budget,
    cpu,
  });

  const posts = dispatched.posts || 0;
  return {
    ok: !dispatched.error,
    silent: posts === 0,
    path: "B",
    label: "PATH_B_TRIP",
    cron: LIMITS.cron,
    tz: "America/New_York",
    dry_run: dryRun,
    error: dispatched.error || null,
    feeds_configured: feeds.length,
    feeds_fetched: feedStats.filter((f) => f.ok).length,
    outbound_subrequests: budget.used,
    items_parsed: itemsParsed,
    phrase_matches: matches.length,
    posts,
    would_post: dispatched.would_post || 0,
    kv_reads: dispatched.kv_reads || 0,
    kv_writes: dispatched.kv_writes || 0,
    would_kv_writes: dispatched.would_kv_writes || 0,
    cpu_ms: roundMs(cpu.ms),
    titles: dispatched.titles || [],
    feeds: feedStats,
    captured: opts.capture ? fetched.map((r) => ({ source: r.source, bytes: r.raw || null })) : undefined,
  };
}

async function fetchAll(feeds, budget, fetchFn, cpu, nowMs) {
  const out = [];
  for (let i = 0; i < feeds.length; i += LIMITS.waveSize) {
    const wave = feeds.slice(i, i + LIMITS.waveSize);
    const part = await Promise.all(
      wave.map((feed) => fetchOne(feed, budget, fetchFn, cpu, nowMs))
    );
    out.push(...part);
  }
  return out;
}

async function fetchOne(feed, budget, fetchFn, cpu, nowMs) {
  const empty = {
    source: feed.name,
    ok: false,
    items: 0,
    matches: [],
    bytes: 0,
    subrequests: 0,
    raw: null,
  };
  if (budget.left <= 0) return { ...empty, error: "subrequest_cap" };
  budget.left -= 1;
  budget.used += 1;
  empty.subrequests = 1;
  let res;
  try {
    res = await fetchTimed(fetchFn, feed.url);
  } catch {
    return { ...empty, error: "fetch_failed" };
  }
  if (isRedirect(res.status)) {
    const loc = res.headers.get("location");
    await cancelBody(res);
    if (!loc || budget.left <= 0) return { ...empty, error: "redirect_cap" };
    budget.left -= 1;
    budget.used += 1;
    empty.subrequests = 2;
    try {
      res = await fetchTimed(fetchFn, new URL(loc, feed.url).toString());
    } catch {
      return { ...empty, error: "fetch_failed" };
    }
    if (isRedirect(res.status)) {
      await cancelBody(res);
      return { ...empty, error: "redirect_chain" };
    }
  }
  if (!res.ok) {
    await cancelBody(res);
    return { ...empty, error: `http_${res.status}` };
  }
  const raw = await readCapped(res, LIMITS.maxBytes);
  const t0 = performance.now();
  const xml = new TextDecoder("utf-8", { fatal: false }).decode(raw);
  let processed = { items: 0, matches: [] };
  try {
    processed = processFeedXml(xml, feed.name, nowMs);
  } catch {
    cpu.ms += performance.now() - t0;
    return { ...empty, error: "parse_failed", bytes: raw.byteLength, raw };
  }
  cpu.ms += performance.now() - t0;
  if (!detectKind(xml)) {
    return { ...empty, ok: false, error: "not_xml", bytes: raw.byteLength, raw };
  }
  return {
    source: feed.name,
    ok: true,
    error: null,
    items: processed.items,
    matches: processed.matches,
    bytes: raw.byteLength,
    subrequests: empty.subrequests,
    raw,
  };
}

async function fetchTimed(fetchFn, url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), LIMITS.fetchTimeoutMs);
  try {
    return await fetchFn(url, {
      method: "GET",
      redirect: "manual",
      headers: FEED_HEADERS,
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function readCapped(res, maxBytes) {
  if (!res.body || typeof res.body.getReader !== "function") {
    const text = await res.text();
    return new TextEncoder().encode(text.slice(0, maxBytes));
  }
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;
  try {
    while (got < maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value || !value.byteLength) continue;
      const room = maxBytes - got;
      if (value.byteLength > room) {
        chunks.push(value.subarray(0, room));
        got += room;
        break;
      }
      chunks.push(value);
      got += value.byteLength;
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      /* ignore */
    }
  }
  const buf = new Uint8Array(got);
  let offset = 0;
  for (const chunk of chunks) {
    buf.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buf;
}

async function dispatchMatches(env, matches, now, opts) {
  const stats = {
    posts: 0,
    would_post: 0,
    kv_reads: 0,
    kv_writes: 0,
    would_kv_writes: 0,
    titles: [],
    error: null,
  };
  if (!matches.length) return stats;

  const secretsReady = Boolean(env.CURSOR_WEBHOOK_URL && env.CURSOR_AUTH_HEADER);
  if (!opts.dryRun && !secretsReady) {
    stats.error = "missing_cursor_secrets";
    return stats;
  }
  if (!env.TRIP_KV) {
    stats.error = "kv_unbound";
    return stats;
  }

  const dayKey = `d:${etDateKey(now)}`;
  let day;
  try {
    day = await readDay(env.TRIP_KV, dayKey, stats);
  } catch {
    stats.error = "kv_read_failed";
    return stats;
  }
  if (day.writes >= LIMITS.maxNewHashesPerEtDay) return stats;

  let posts = day.posts;
  let writes = day.writes;
  let dirty = false;
  const fetchedAt = formatFetchedAt(now);
  const seenThisRun = new Set();

  for (const match of matches) {
    if (!match.link) continue;
    if (writes >= LIMITS.maxNewHashesPerEtDay) break;
    const tHash = performance.now();
    const hash = await hashId(match.link, match.title);
    opts.cpu.ms += performance.now() - tHash;
    if (seenThisRun.has(hash)) continue;
    seenThisRun.add(hash);
    const seenKey = `h:${hash}`;
    let seen = null;
    try {
      stats.kv_reads += 1;
      seen = await env.TRIP_KV.get(seenKey);
    } catch {
      stats.error = "kv_read_failed";
      break;
    }
    if (seen) continue;

    const payload = buildPayload({
      source: match.source,
      title: match.title,
      link: match.link,
      text: match.text,
      hash,
      fetchedAt,
    });

    if (posts >= LIMITS.maxPostsPerEtDay) {
      if (opts.dryRun) {
        stats.would_kv_writes += 1;
      } else {
        try {
          await env.TRIP_KV.put(seenKey, "1", {
            expirationTtl: LIMITS.hashTtlSec,
          });
          stats.kv_writes += 1;
        } catch {
          stats.error = "kv_write_failed";
          break;
        }
      }
      writes += 1;
      dirty = true;
      continue;
    }

    if (opts.dryRun) {
      stats.would_post += 1;
      stats.would_kv_writes += 1;
      stats.titles.push(match.title);
      posts += 1;
      writes += 1;
      dirty = true;
      continue;
    }

    if (opts.budget.left <= 0) {
      stats.error = "subrequest_cap";
      break;
    }
    const posted = await postTrip(env, payload, opts);
    if (!posted.ok) {
      stats.error = posted.error || "post_failed";
      break;
    }
    try {
      await env.TRIP_KV.put(seenKey, "1", { expirationTtl: LIMITS.hashTtlSec });
      stats.kv_writes += 1;
    } catch {
      stats.error = "kv_write_failed";
      stats.posts += 1;
      stats.titles.push(match.title);
      break;
    }
    posts += 1;
    writes += 1;
    dirty = true;
    stats.posts += 1;
    stats.titles.push(match.title);
  }

  if (dirty) {
    const body = JSON.stringify({
      posts: Math.min(posts, LIMITS.maxPostsPerEtDay),
      writes,
    });
    if (opts.dryRun) {
      stats.would_kv_writes += 1;
    } else {
      try {
        await env.TRIP_KV.put(dayKey, body, { expirationTtl: LIMITS.dayTtlSec });
        stats.kv_writes += 1;
      } catch {
        stats.error = stats.error || "kv_write_failed";
      }
    }
  }
  return stats;
}

async function readDay(kv, key, stats) {
  stats.kv_reads += 1;
  const raw = await kv.get(key);
  if (!raw) return { posts: 0, writes: 0 };
  try {
    const o = JSON.parse(raw);
    const posts = Number(o.posts);
    const writes = Number(o.writes);
    return {
      posts: Number.isFinite(posts) && posts > 0 ? posts : 0,
      writes: Number.isFinite(writes) && writes > 0 ? writes : 0,
    };
  } catch {
    return { posts: 0, writes: 0 };
  }
}

async function postTrip(env, payload, opts) {
  opts.budget.left -= 1;
  opts.budget.used += 1;
  let res;
  try {
    res = await opts.fetchFn(env.CURSOR_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: normalizeAuthHeader(env.CURSOR_AUTH_HEADER),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "post_failed" };
  }
  await cancelBody(res);
  if (res.status < 200 || res.status >= 300) return { ok: false, error: "post_failed" };
  return { ok: true };
}

function normalizeAuthHeader(h) {
  let v = String(h || "").trim();
  if (/^authorization\s*:/i.test(v)) v = v.split(":").slice(1).join(":").trim();
  return v;
}

function isRedirect(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function cancelBody(res) {
  try {
    if (res && res.body && typeof res.body.cancel === "function") await res.body.cancel();
  } catch {
    /* ignore */
  }
}

function detectKind(xml) {
  const head = String(xml || "").slice(0, 500).toLowerCase();
  if (head.includes("<urlset")) return "sitemap";
  if (head.includes("<feed") && !head.includes("<rss")) return "atom";
  if (head.includes("<rss") || head.includes("<item")) return "rss";
  return "";
}

function sliceBlocks(xml, kind, max) {
  const open = kind === "sitemap" ? "url" : kind === "atom" ? "entry" : "item";
  const low = xml.toLowerCase();
  const blocks = [];
  let from = 0;
  while (blocks.length < max) {
    const i = findOpen(low, open, from);
    if (i < 0) break;
    const close = `</${open}>`;
    const j = low.indexOf(close, i);
    const end = j < 0 ? xml.length : j + close.length;
    blocks.push(xml.slice(i, end));
    if (j < 0) break;
    from = end;
  }
  return blocks;
}

function findOpen(low, tag, from) {
  const key = `<${tag}`;
  let i = from;
  while (i < low.length) {
    const j = low.indexOf(key, i);
    if (j < 0) return -1;
    const n = low[j + key.length];
    if (n === ">" || n === " " || n === "/" || n === "\n" || n === "\r" || n === "\t") {
      return j;
    }
    i = j + key.length;
  }
  return -1;
}

function textOf(chunk, tag) {
  const low = chunk.toLowerCase();
  const key = `<${tag.toLowerCase()}`;
  const i = findOpen(low, tag.toLowerCase(), 0);
  if (i < 0) return "";
  const gt = low.indexOf(">", i);
  if (gt < 0) return "";
  const close = `</${tag.toLowerCase()}>`;
  const j = low.indexOf(close, gt);
  if (j < 0) return "";
  return chunk.slice(gt + 1, j);
}

function linkOf(chunk, kind) {
  if (kind === "sitemap") {
    const loc = clean(textOf(chunk, "loc"));
    if (loc) return loc;
  }
  const inner = clean(textOf(chunk, "link"));
  if (/^https?:\/\//i.test(inner)) return inner;
  const low = chunk.toLowerCase();
  let from = 0;
  let fallback = "";
  while (from < low.length) {
    const i = low.indexOf("<link", from);
    if (i < 0) break;
    const n = low[i + 5];
    if (n !== ">" && n !== " " && n !== "/" && n !== "\n" && n !== "\t") {
      from = i + 5;
      continue;
    }
    const gt = low.indexOf(">", i);
    if (gt < 0) break;
    const tag = chunk.slice(i, gt + 1);
    const href = /href\s*=\s*["']([^"']+)["']/i.exec(tag);
    if (href) {
      const rel = /rel\s*=\s*["']([^"']+)["']/i.exec(tag);
      const decoded = clean(href[1]);
      if (!rel || rel[1].toLowerCase() === "alternate") return decoded;
      if (!fallback) fallback = decoded;
    }
    from = gt + 1;
  }
  return fallback;
}

function publishedOf(chunk) {
  const raw =
    textOf(chunk, "published") ||
    textOf(chunk, "pubDate") ||
    textOf(chunk, "dc:date") ||
    textOf(chunk, "news:publication_date") ||
    textOf(chunk, "updated") ||
    "";
  const ms = Date.parse(clean(raw));
  return Number.isFinite(ms) ? ms : 0;
}

function snippet(raw) {
  const cut = clean(raw).slice(0, 800);
  let out = "";
  let inTag = false;
  for (let i = 0; i < cut.length; i++) {
    const c = cut[i];
    if (c === "<") {
      inTag = true;
      continue;
    }
    if (c === ">") {
      inTag = false;
      out += " ";
      continue;
    }
    if (!inTag) out += c;
  }
  return out.replace(/\s+/g, " ").trim();
}

function clean(s) {
  return decodeXml(stripCdata(s)).replace(/\s+/g, " ").trim();
}

function stripCdata(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .trim();
}

function decodeXml(s) {
  return String(s || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => fromCodePoint(parseInt(n, 16)));
}

function fromCodePoint(c) {
  if (!Number.isFinite(c) || c <= 0 || c > 0x10ffff) return "";
  try {
    return String.fromCodePoint(c);
  } catch {
    return "";
  }
}

function roundMs(n) {
  return Math.round(n * 1000) / 1000;
}

function baseResult(extra) {
  return {
    ok: true,
    silent: true,
    path: "B",
    label: "PATH_B_TRIP",
    cron: LIMITS.cron,
    tz: "America/New_York",
    dry_run: false,
    error: null,
    feeds_configured: Math.min(FEEDS.length, LIMITS.maxFeeds),
    feeds_fetched: 0,
    outbound_subrequests: 0,
    items_parsed: 0,
    phrase_matches: 0,
    posts: 0,
    would_post: 0,
    kv_reads: 0,
    kv_writes: 0,
    would_kv_writes: 0,
    cpu_ms: 0,
    titles: [],
    feeds: [],
    ...extra,
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}
