import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  FEEDS,
  LIMITS,
  buildPayload,
  etDateKey,
  formatFetchedAt,
  hashId,
  matchSeverity,
  normalizeTitle,
  processFeedXml,
  runTrip,
} from "../src/worker.js";
import worker from "../src/worker.js";

const NOW = new Date("2026-09-22T16:00:00Z");

function pub(msAgo) {
  return new Date(NOW.getTime() - msAgo).toUTCString();
}

function rss(items) {
  const body = items
    .map((it) => {
      const when = Object.prototype.hasOwnProperty.call(it, "pub") ? it.pub : pub(60 * 1000);
      const pubTag = when ? `<pubDate>${when}</pubDate>` : "";
      return `<item>
        <title>${it.title}</title>
        <link>${it.link}</link>
        ${pubTag}
        <description>${it.description || ""}</description>
      </item>`;
    })
    .join("");
  return `<?xml version="1.0"?><rss version="2.0"><channel><title>channel</title>${body}</channel></rss>`;
}

class MemKV {
  constructor(seed) {
    this.map = new Map(seed || []);
    this.reads = 0;
    this.writes = 0;
  }
  async get(key) {
    this.reads += 1;
    return this.map.has(key) ? this.map.get(key) : null;
  }
  async put(key, value) {
    this.writes += 1;
    this.map.set(key, value);
  }
}

function envWith(kv, extra = {}) {
  return {
    TRIP_KV: kv,
    CURSOR_WEBHOOK_URL: "https://example.test/world-flash",
    CURSOR_AUTH_HEADER: "Authorization: Bearer test-token",
    ...extra,
  };
}

function mockFeeds(xml, hooks = {}) {
  const calls = [];
  let inflight = 0;
  let maxInflight = 0;
  const fetchFn = async (url, init) => {
    const method = (init && init.method) || "GET";
    calls.push({ url: String(url), method, init });
    if (method === "POST") {
      if (hooks.postStatus) {
        return new Response("no", { status: hooks.postStatus });
      }
      return new Response("ok", { status: 200 });
    }
    if (hooks.redirect && String(url) === FEEDS[0].url) {
      return new Response(null, {
        status: 302,
        headers: { location: "https://example.test/redirected.xml" },
      });
    }
    inflight += 1;
    maxInflight = Math.max(maxInflight, inflight);
    if (hooks.delayMs) await new Promise((r) => setTimeout(r, hooks.delayMs));
    inflight -= 1;
    const body = typeof xml === "function" ? xml(String(url)) : xml;
    return new Response(body, {
      status: 200,
      headers: { "content-type": "application/rss+xml" },
    });
  };
  return {
    fetchFn,
    calls,
    maxInflight: () => maxInflight,
    posts: () => calls.filter((c) => c.method === "POST"),
  };
}

test("allowlist size, caps, and Path A feeds stay out", () => {
  assert.ok(FEEDS.length >= 8 && FEEDS.length <= LIMITS.maxFeeds);
  assert.equal(LIMITS.maxOutbound, 20);
  assert.equal(LIMITS.waveSize, 6);
  assert.equal(LIMITS.maxPostsPerEtDay, 3);
  assert.equal(LIMITS.invocationsPerDay, 288);
  assert.equal(LIMITS.cron, "*/5 * * * *");
  const urls = FEEDS.map((f) => f.url).join("\n");
  assert.equal(urls.includes("bbci.co.uk"), false);
  assert.equal(urls.includes("Miningcom"), false);
  assert.equal(urls.includes("todayinenergy"), false);
  assert.equal(urls.includes("/news/feed/"), false);
  const toml = fs.readFileSync(new URL("../wrangler.toml", import.meta.url), "utf8");
  assert.match(toml, /crons = \["\*\/5 \* \* \* \*"\]/);
  assert.equal(toml.includes("*/30"), false);
  const src = fs.readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.equal(code.includes("FLASH_TRIAGE"), false);
  assert.equal(/openrouter|chat\.completions/i.test(code), false);
});

test("severity phrases are exact and generics do not match", () => {
  assert.equal(matchSeverity("Force majeure declared at the terminal", ""), true);
  assert.equal(matchSeverity("Port closed", "loading halted overnight"), true);
  assert.equal(matchSeverity("Fire at refinery", ""), true);
  assert.equal(matchSeverity("M 6.2", "shallow earthquake"), true);
  assert.equal(matchSeverity("oil prices rise", ""), false);
  assert.equal(matchSeverity("Trump speaks on markets", "war risk"), false);
  assert.equal(matchSeverity("ceasefire talks", ""), false);
  assert.equal(matchSeverity("pipelines", ""), false);
});

test("quiet fresh headlines do not touch KV", async () => {
  const kv = new MemKV();
  const xml = rss([
    { title: "Cabinet meets", link: "https://example.com/1", description: "routine remarks" },
  ]);
  const mock = mockFeeds(xml);
  const result = await runTrip(envWith(kv), {
    now: NOW,
    dryRun: false,
    fetch: mock.fetchFn,
  });
  assert.equal(result.ok, true);
  assert.equal(result.silent, true);
  assert.equal(result.posts, 0);
  assert.equal(result.phrase_matches, 0);
  assert.equal(result.kv_reads, 0);
  assert.equal(result.kv_writes, 0);
  assert.equal(kv.reads, 0);
  assert.equal(kv.writes, 0);
  assert.equal(result.outbound_subrequests, FEEDS.length);
  assert.equal(mock.posts().length, 0);
});

test("fetches in waves of at most 6", async () => {
  const xml = rss([]);
  const mock = mockFeeds(xml, { delayMs: 40 });
  await runTrip(envWith(new MemKV()), {
    now: NOW,
    fetch: mock.fetchFn,
  });
  assert.ok(mock.maxInflight() <= LIMITS.waveSize);
  assert.ok(mock.maxInflight() >= 2);
});

test("one redirect counts as a second subrequest and stays under 20", async () => {
  const xml = rss([
    { title: "Port closed", link: "https://example.com/port", description: "terminal" },
  ]);
  const kv = new MemKV();
  const mock = mockFeeds(xml, { redirect: true });
  const result = await runTrip(envWith(kv), { now: NOW, fetch: mock.fetchFn });
  assert.equal(result.outbound_subrequests, FEEDS.length + 1 + 1);
  assert.ok(result.outbound_subrequests <= LIMITS.maxOutbound);
  assert.equal(result.posts, 1);
  const post = mock.posts()[0];
  assert.equal(post.url, "https://example.test/world-flash");
  assert.equal(post.init.headers.authorization, "Bearer test-token");
  const payload = JSON.parse(post.init.body);
  assert.equal(payload.label, "PATH_B_TRIP");
  assert.equal(payload.source, "Reuters Wire");
  assert.equal(payload.title, "Port closed");
  assert.equal(payload.link, "https://example.com/port");
  assert.equal(payload.text.length <= 300, true);
  assert.equal(payload.hash.length, 64);
  assert.match(payload.fetched_at, /^2026-09-22T12:00:00-04:00$/);
});

test("same hash does not post or write twice inside 24h", async () => {
  const xml = rss([
    { title: "Explosion at terminal", link: "https://example.com/boom" },
  ]);
  const kv = new MemKV();
  const firstMock = mockFeeds(xml);
  const first = await runTrip(envWith(kv), { now: NOW, fetch: firstMock.fetchFn });
  assert.equal(first.posts, 1);
  const writesAfterFirst = kv.writes;
  assert.ok(writesAfterFirst >= 2);
  const secondMock = mockFeeds(xml);
  const second = await runTrip(envWith(kv), { now: NOW, fetch: secondMock.fetchFn });
  assert.equal(second.posts, 0);
  assert.equal(second.kv_writes, 0);
  assert.equal(kv.writes, writesAfterFirst);
  assert.equal(secondMock.posts().length, 0);
});

test("failed POST does not consume the hash or the daily cap", async () => {
  const xml = rss([
    { title: "Pipeline rupture", link: "https://example.com/pipe" },
  ]);
  const kv = new MemKV();
  const fail = mockFeeds(xml, { postStatus: 500 });
  const failed = await runTrip(envWith(kv), { now: NOW, fetch: fail.fetchFn });
  assert.equal(failed.posts, 0);
  assert.equal(failed.kv_writes, 0);
  assert.equal(failed.error, "post_failed");
  const ok = mockFeeds(xml);
  const retried = await runTrip(envWith(kv), { now: NOW, fetch: ok.fetchFn });
  assert.equal(retried.posts, 1);
});

test("fourth fresh match stays silent after 3 posts", async () => {
  const items = [1, 2, 3, 4].map((n) => ({
    title: `Port closed ${n}`,
    link: `https://example.com/p${n}`,
  }));
  const kv = new MemKV();
  const mock = mockFeeds(rss(items));
  const result = await runTrip(envWith(kv), { now: NOW, fetch: mock.fetchFn });
  assert.equal(result.posts, 3);
  assert.equal(mock.posts().length, 3);
  const day = JSON.parse(kv.map.get(`d:${etDateKey(NOW)}`));
  assert.equal(day.posts, 3);
  assert.equal(day.writes, 4);
});

test("hash write fuse stops further KV writes", async () => {
  const kv = new MemKV([
    [`d:${etDateKey(NOW)}`, JSON.stringify({ posts: 3, writes: LIMITS.maxNewHashesPerEtDay })],
  ]);
  const xml = rss([{ title: "National emergency declared", link: "https://example.com/ne" }]);
  const mock = mockFeeds(xml);
  const result = await runTrip(envWith(kv), { now: NOW, fetch: mock.fetchFn });
  assert.equal(result.posts, 0);
  assert.equal(result.kv_writes, 0);
  assert.equal(mock.posts().length, 0);
  assert.equal(kv.writes, 0);
});

test("old and undated items do not fire", async () => {
  const xml = rss([
    { title: "Earthquake", link: "https://example.com/old", pub: pub(3 * 60 * 60 * 1000) },
    { title: "Shutdown", link: "https://example.com/nodate", pub: "" },
  ]);
  const kv = new MemKV();
  const mock = mockFeeds(xml);
  const result = await runTrip(envWith(kv), { now: NOW, fetch: mock.fetchFn });
  assert.equal(result.phrase_matches, 0);
  assert.equal(result.kv_reads, 0);
  assert.equal(result.kv_writes, 0);
});

test("bytes past the cap are not parsed", async () => {
  const late = rss([
    { title: "quiet item", link: "https://example.com/q", description: "x".repeat(20000) },
    { title: "port closed", link: "https://example.com/late" },
  ]);
  const kv = new MemKV();
  const mock = mockFeeds(late);
  const result = await runTrip(envWith(kv), { now: NOW, fetch: mock.fetchFn });
  assert.equal(result.phrase_matches, 0);
  assert.ok(result.feeds.every((f) => f.bytes <= LIMITS.maxBytes));
});

test("sitemap and atom snippets match without full HTML", () => {
  const iso = new Date(NOW.getTime() - 60 * 1000).toISOString();
  const site = `<?xml version="1.0"?><urlset><url><loc>https://www.reuters.com/world/port-closed</loc><news:news><news:title><![CDATA[Strait closed after blast]]></news:title><news:publication_date>${iso}</news:publication_date></news:news></url></urlset>`;
  const parsed = processFeedXml(site, "Reuters Wire", NOW.getTime());
  assert.equal(parsed.matches.length, 1);
  assert.equal(parsed.matches[0].title, "Strait closed after blast");
  const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><title>feed</title><entry><title>M 6.4 - region</title><published>${iso}</published><link rel="alternate" href="https://earthquake.usgs.gov/q/1"/><summary>magnitude earthquake felt locally</summary></entry></feed>`;
  const quake = processFeedXml(atom, "USGS Significant Earthquakes", NOW.getTime());
  assert.equal(quake.matches.length, 1);
  assert.equal(quake.matches[0].link, "https://earthquake.usgs.gov/q/1");
  assert.match(quake.matches[0].text, /earthquake/);
  assert.equal(quake.matches[0].text.includes("<"), false);
});

test("payload text is 300 chars and label is fixed", () => {
  const payload = buildPayload({
    source: "DOE Press",
    title: "Pipeline shutdown",
    link: "https://www.energy.gov/a",
    text: "y".repeat(500),
    hash: "abc",
    fetchedAt: "2026-09-22T12:00:00-04:00",
  });
  assert.equal(payload.text.length, 300);
  assert.equal(payload.label, "PATH_B_TRIP");
  assert.equal(Object.keys(payload).join(","), "source,title,link,text,hash,fetched_at,label");
});

test("ET stamp uses the daylight-saving offset", () => {
  assert.equal(formatFetchedAt(new Date("2026-01-15T17:00:00Z")), "2026-01-15T12:00:00-05:00");
  assert.equal(formatFetchedAt(new Date("2026-07-15T16:00:00Z")), "2026-07-15T12:00:00-04:00");
  assert.equal(etDateKey(new Date("2026-01-15T03:30:00Z")), "2026-01-14");
});

test("title normalization and hash stability", async () => {
  assert.equal(normalizeTitle("Port  CLOSED!!!"), "port closed");
  const a = await hashId("https://example.com/a/", "Port CLOSED");
  const b = await hashId("https://example.com/a", "port closed");
  const c = await hashId("https://example.com/b", "port closed");
  assert.equal(a, b);
  assert.notEqual(a, c);
});

test("missing secrets or KV do not fetch or post", async () => {
  let calls = 0;
  const fetchFn = async () => {
    calls += 1;
    return new Response("no");
  };
  const noSecrets = await runTrip({}, { now: NOW, fetch: fetchFn });
  assert.equal(noSecrets.error, "missing_cursor_secrets");
  assert.equal(noSecrets.outbound_subrequests, 0);
  assert.equal(calls, 0);
  const noKv = await runTrip(
    { CURSOR_WEBHOOK_URL: "https://example.test/h", CURSOR_AUTH_HEADER: "Bearer z" },
    { now: NOW, fetch: fetchFn }
  );
  assert.equal(noKv.error, "kv_unbound");
  assert.equal(calls, 0);
});

test("HTTP surface stays silent and does not accept posted bodies", async () => {
  const health = await worker.fetch(new Request("https://x.test/"), {});
  assert.equal(health.status, 200);
  const healthBody = await health.json();
  assert.equal(healthBody.service, "x-crc-flash-trip");
  assert.equal(healthBody.webhook_configured, false);
  const blocked = await worker.fetch(new Request("https://x.test/trip-run"), {});
  const blockedBody = await blocked.json();
  assert.equal(blocked.status, 200);
  assert.equal(blockedBody.error, "missing_cursor_secrets");
  assert.equal(blockedBody.outbound_subrequests, 0);
  const posted = await worker.fetch(new Request("https://x.test/", { method: "POST", body: "{}" }), {});
  assert.equal(posted.status, 405);
});
