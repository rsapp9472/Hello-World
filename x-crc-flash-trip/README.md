# x-crc-flash-trip

Path B only. Do not merge this Worker into `x-crc-bridge` or `x-crc-bridge-mining`. Do not add these fetches to those Workers. Do not change their `*/30` crons.

Immediate silent tripwire. No LLM. No OpenRouter. No Grok. No Flash Triage.

A run with no severity match returns quietly. A match POSTs once to the existing World flash webhook.

## Schedule

Cloudflare cron is UTC. `*/5 * * * *` is every 5 minutes, all day, which is 24/7 `America/New_York`.

This is the third cron on the account. Path A already uses two. Do not add another cron here.

`fetched_at` and the 3-post daily cap use the America/New_York calendar date.

## Allowlist

Eight official feeds. Unused slots are empty. AP public RSS and UKMTO did not return a stable feed from this network (403). Classic Reuters RSS returned 401; the Reuters slot is Reuters' public news sitemap. CENTCOM had no verified command-only RSS, so the defense slot is DoD releases. EIA Today in Energy is a Path A URL and is not used.

| Source | URL |
| --- | --- |
| Reuters Wire | `https://www.reuters.com/arc/outboundfeeds/news-sitemap/?outputType=xml` |
| DOE Press | `https://www.energy.gov/rss/energygov/2193718` |
| USGS Significant Earthquakes | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.atom` |
| USCG Houston-Galveston BNM | `https://public.govdelivery.com/topics/USDHSCG_420/feed.rss` |
| DoD Releases | `https://www.war.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=945&max=8` |
| Federal Register Presidential Documents | `https://www.federalregister.gov/api/v1/documents.rss?conditions[type][]=PRESDOCU&order=newest` |
| White House Presidential Actions | `https://www.whitehouse.gov/presidential-actions/feed/` |
| MSHA | `https://www.msha.gov/rss.xml` |

Each run reads at most 16 KB and 8 items per feed, in waves of 6 connections. Hard cap 20 outbound subrequests. Titles and short text only.

## Fire rule

The source must be on the allowlist and the title or snippet must match a severity phrase: force majeure, halted operations, operations halted, shutdown, explosion, ruptured, rupture, collapse, declaration of war, missile, blockade, strait closed, chokepoint closed, canal closed, port closed, evacuation ordered, earthquake, hurricane landfall, strike authorized, national emergency, emergency facility, nuclear, pipeline, force majeure declared, production halted, loading halted, fire at, blast at.

Items without a date, or older than 20 minutes, are ignored.

One POST per hash per 24 hours. At most 3 POSTs per ET calendar day. Further hits stay silent.

KV is written only when a fresh severity hash is new, or that hash is a fire. A run with no match does zero KV reads and zero KV writes. New hashes stop after 24 per ET day so a phrase storm cannot spend the 1,000 write/day cap.

## Payload

```json
{
  "source": "Reuters Wire",
  "title": "...",
  "link": "https://...",
  "text": "first 300 characters",
  "hash": "sha256 of normalized url + title",
  "fetched_at": "2026-09-22T12:00:00-04:00",
  "label": "PATH_B_TRIP"
}
```

## Secrets

Not in this repo. Do not guess them. Do not log them.

Path B fire uses the same names as the Path A World flash forward:

- `CURSOR_WEBHOOK_URL`
- `CURSOR_AUTH_HEADER`

Do not set `FLASH_TRIAGE_WEBHOOK_URL` or `FLASH_TRIAGE_AUTH_HEADER` on this Worker. Those are Path A RSS to Flash Triage only.

Until both `CURSOR_WEBHOOK_URL` and `CURSOR_AUTH_HEADER` are set, and `TRIP_KV` is bound, the cron does not fetch. `GET /` reports whether the webhook secrets are present. It does not show the values.

## Dry-run

```bash
cd x-crc-flash-trip
npm i
npm test
npm run dry-run
```

`npm run dry-run` writes `DRY-RUN.md`. It does not POST and it does not deploy.

Numbers from the measurement run are in `DRY-RUN.md`. Do not production-deploy if that file is missing or says FAIL.

## Deploy

Whoever holds the Cloudflare API token for account `00b61c4e0209341831de0e235984fabf` deploys this. Do not deploy until the dry-run passes and the two webhook secrets are pasted.

```bash
cd x-crc-flash-trip
npm i
npx wrangler login
npx wrangler kv namespace create TRIP_KV
```

Paste the namespace id over `PASTE_TRIP_KV_NAMESPACE_ID` in `wrangler.toml`.

```bash
npx wrangler secret put CURSOR_WEBHOOK_URL
npx wrangler secret put CURSOR_AUTH_HEADER
npx wrangler deploy
```

`GET /trip-run?dry=1` on the workers.dev URL runs one measurement and does not POST. `GET /trip-run` runs for real.

Workers Free budget this design stays inside: 288 invocations/day, 8 subrequests on a quiet run, KV writes only for new severity hashes (ceiling 48/day), 0 KV writes on a miss.
