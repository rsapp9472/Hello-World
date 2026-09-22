# Path B dry-run

Measured: 2026-09-22T17:53:11.460Z
Host: local Node. cpu_ms is synchronous decode + parse + phrase match time. Network wait is not included. This is a proxy for the Workers Free 10 ms CPU cap, with a fail line of 8 ms.
No webhook POST was sent. No wrangler deploy was run.

Result: PASS

## This invocation

- Feeds configured: 8
- Feeds fetched OK: 8
- Outbound subrequests: 8
- Items parsed: 47
- Phrase matches (fresh + severity): 0
- Would POST: 0
- KV reads this run: 0
- KV writes this run: 0 (dry-run does not put)
- Would KV-write if hashes were new: 0
- cpu_ms this run: 3.166
- cpu_ms median of 10 re-parses: 0.918
- cpu_ms max of 10 re-parses: 1.282

## Free-tier arithmetic

- Cron: `*/5 * * * *` UTC = every 5 minutes, 24/7 America/New_York
- Invocations/day: 288 (cap 100000)
- Typical outbound subrequests: 8 feed GETs, 0 posts on a miss (cap 50, hard cap in code 20)
- Worst outbound if every feed redirects once and 3 posts fire: 19
- Quiet KV reads: 0
- Quiet KV writes: 0 when nothing matches. This run phrase_matches=0, measured kv_writes=0
- KV writes happen only when a fresh severity hash is new, or that new hash is a fire. A full miss does not read or write KV.
- Write ceiling: at most 24 new hashes/ET day, each one hash put, plus one day-counter put on a run that records a hash. Ceiling 48/day (cap 1000).
- Read ceiling if every run has 8 fresh matches: 2592/day (cap 100000). A quiet run is 0.
- Waves: 6 connections. Bytes/feed cap: 16384. Items/feed cap: 8.

## Feeds

- Reuters Wire: ok=true bytes=16384 items=8 subrequests=1 error=
- DOE Press: ok=true bytes=7448 items=8 subrequests=1 error=
- USGS Significant Earthquakes: ok=true bytes=559 items=0 subrequests=1 error=
- USCG Houston-Galveston BNM: ok=true bytes=16384 items=8 subrequests=1 error=
- DoD Releases: ok=true bytes=7926 items=8 subrequests=1 error=
- Federal Register Presidential Documents: ok=true bytes=16384 items=8 subrequests=1 error=
- White House Presidential Actions: ok=true bytes=16384 items=1 subrequests=1 error=
- MSHA: ok=true bytes=16384 items=6 subrequests=1 error=

## Earlier pass

2026-09-22T17:52:57Z: cpu_ms 3.713, reparse median 0.916, 8 subrequests, 0 phrase matches, 0 KV reads, 0 KV writes.
