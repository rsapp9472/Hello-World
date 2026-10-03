# GitHub trending workflows — SOURCE PACK — Saturday 2026-10-03

Research only. This file records what was on GitHub trending and in a few targeted searches on Saturday 2026-10-03. It does not approve any install, clone, or connector. Nothing here was installed or executed.

Scan window: pages and API calls between about 08:00 and 08:20 ET (12:00–12:20 UTC). Star counts and `pushed_at` are from the GitHub REST repo API in that window. Trending-page star badges were within a few stars of those API figures. Times below are US Eastern Daylight Time (UTC−4).

Dedupe inputs read before ranking:

- 2026-09-26 recommended / review / skip list
- 2026-09-19 recommended / skip list

Rule used: a repo already on those lists is not re-ranked as a new top pick unless this week’s commits change what it does. Those cases are called out, not promoted back to #1.

## 1. Sources used

| Source | Result |
|---|---|
| https://github.com/trending?since=weekly | Worked. 18 repo cards (shorter than a full page of 25). |
| https://github.com/trending?since=daily | Worked. 19 repo cards. |
| https://github.com/trending/python?since=weekly | Worked. 11 cards. Mostly the same set as all-language weekly, plus `VectifyAI/PageIndex`. |
| https://github.com/trending/typescript?since=weekly | Worked. 16 cards. Best language slice for agent/ops tools. |
| https://github.com/trending/javascript?since=weekly | Worked. 11 cards. |
| Search: `freight mcp` in name or description | Worked, small result set. No high-star US LTL/brokerage workflow. |
| Search: `LTL freight` | Worked, almost all 0–1★ API profiles, demos, or Magento extensions. Not ranked. |
| Search: `n8n workflows` with stars > 1000 | Worked. Platform and template dumps are evergreen; `czlonkowski/n8n-mcp` is the useful MCP hit (pushed 2026-10-01). |
| Search: RSS digest / news triage | Thin. Named “rss digest agent” repos were 0–1★ and stale. The usable news-radar hit came from a GitHub Actions query (`LearnPrompt/ai-news-radar`). |
| Search: GitHub Actions automation bots | First query returned near-zero-star noise. A follow-up on Actions + digest/triage surfaced `github/gh-aw` and the news radar. |

What failed or misled:

- A broad query (`mcp` plus freight OR LTL OR brokerage OR logistics in name/description/readme) matched mega-lists and unrelated agent repos because “logistics” appears in ordinary READMEs. Those hits were not treated as freight tools. `NousResearch/hermes-agent` was one of those loose hits (see skip list).
- Several trending cards had an empty description (`pingdotgg/t3code`, `anthropics/claude-code-action`, `jamwithai/production-agentic-rag-course`, `meituan-longcat/LongCat-Video`). Descriptions below for repos that were actually opened come from the README or the API, not from the empty card.
- Promo / embroidery / print-shop ops: no repo on these pages or in the freight/n8n/RSS searches.

## 2. Week note

**Strong** on general agent tooling and CoS-shaped automation. The week is a skills-and-harness wave (ponytail, caveman, superpowers, mattpocock/skills, impeccable, taste-skill, plus already-known ECC / agent-skills / context-mode) sitting next to a few more operational finds: GitHub’s own agentic workflows (`github/gh-aw`), an n8n-building MCP, an MCP traffic inspector, a Cloudflare agent workspace, and an Actions-driven news radar.

**Thin** on PeyMak freight / LTL / brokerage. Nothing on the trending pages is a freight system. Search found only small or zero-star MCP servers, plus a real change on last week’s Warp repo (a `price_check` tool and a remote HTTP wrapper). Those stay in human review because they talk to live freight accounts.

**Thin** on investing ops. New charting (`LuxAlgo/Vela`) and document RAG (`VectifyAI/PageIndex`) fit research dashboards. No new paper-trading or holdings system outranked last week’s OpenBB / TradingAgents / financial-services picks. The news radar is AI/tech sources, not a markets feed.

**Thin** on promo / embroidery. Closest adjacent items are HTML-to-video (`heygen-com/hyperframes`), a design-skill pack (`pbakaus/impeccable`), and a local voice studio (`debpalash/VoiceStudio`, review bucket). No shop-floor, order, or decoration workflow.

**Already-known lane still hot, not re-ranked:** `paperclipai/paperclip` (12,825 stars this week on the weekly page), `vectorize-io/hindsight`, `dream-num/univer`, `Panniantong/Agent-Reach`, `TencentCloud/Octop`, `affaan-m/ECC`, `addyosmani/agent-skills`, `mksglu/context-mode`.

## 3. Soft-ranked candidates

Ordered by lens fit, not by stars. “Already-in-dedupe” is against the 2026-09-26 and 2026-09-19 lists. Security notes are from a README skim plus the license field, not from running anything.

### 1. github/gh-aw

- URL: https://github.com/github/gh-aw
- What it does: GitHub’s CLI extension that compiles Markdown agent workflows into GitHub Actions for triage, review, CI investigation, and repo reporting.
- 5,340★ · Go · last push 2026-10-03 08:02 ET
- License: MIT (API SPDX)
- Lenses: CoS productivity; GitHub Actions automation; general agent tooling
- Security: README says agent jobs are read-only and sandboxed by default, with writes through validated `safe-outputs`. It also says a vulnerability (GHSA-8h78-hpm7-29gg) caused versions `>= 0.83.3` and `< 0.85.4` to be retired. Install path in the README is `gh extension install`, not `curl|bash`. Workflows can still be given tools, network, and write permissions, so each workflow needs a human read before it runs.
- Already-in-dedupe: no
- Where seen: Actions search, not the trending pages

### 2. LearnPrompt/ai-news-radar

- URL: https://github.com/LearnPrompt/ai-news-radar
- What it does: 24-hour AI/tech news radar run with GitHub Actions, a live web UI, and a “Scout Skill” for AI sources.
- 1,745★ · Python · last push 2026-10-03 06:35 ET
- License: MIT
- Lenses: Investing ops (news-triage pattern only; sources are AI/tech, not markets); CoS digests; RSS-style intake
- Security: README says the public build does not need an API key, login, cookies, or an X API. Optional DeepSeek commentary uses `DEEPSEEK_API_KEY` via GitHub Secrets or a local env var. Recent commits on the default branch are snapshot updates (`chore: update ai news snapshot`), so the repo is a running digest, not a one-off dump. No `curl|bash` installer in the README skim.
- Already-in-dedupe: no
- Where seen: Actions/digest search

### 3. kerlenton/mcpsnoop

- URL: https://github.com/kerlenton/mcpsnoop
- What it does: Local transparent proxy between an MCP client and an MCP server so calls can be watched, failed in CI, or exported as OpenTelemetry spans.
- 359★ · Go · last push 2026-10-03 06:45 ET
- License: MIT
- Lenses: CoS / connector hardening; Botfoundry agent workflows
- Security: It is intentionally a man-in-the-middle for MCP traffic on the machine where it runs. README describes one binary / `npx mcpsnoop` wrapping a server command. That is useful for review and also a place where tool arguments and secrets in MCP payloads would be visible. No `curl|bash` line in the skim.
- Already-in-dedupe: no
- Where seen: Actions/digest search (pushed the same morning)

### 4. czlonkowski/n8n-mcp

- URL: https://github.com/czlonkowski/n8n-mcp
- What it does: MCP server that lets Claude Desktop, Claude Code, Windsurf, or Cursor build and inspect n8n workflows.
- 23,032★ · TypeScript · last push 2026-10-01 14:50 ET
- License: MIT
- Lenses: CoS automation; n8n templates / workflow builders; general agent tooling
- Security: Talks to an n8n instance with `N8N_API_KEY` and, separately, `N8N_MCP_ACCESS_TOKEN`. Cloudflare Access service-token headers are documented for instances behind Zero Trust. A codecov badge in the README contains the placeholder `token=YOUR_TOKEN` (badge template, not a live secret). Not a template dump; it can change a live n8n instance if credentials are attached.
- Already-in-dedupe: no
- Where seen: n8n search. `n8n-io/n8n` itself is still the evergreen platform and is not ranked.

### 5. cloudflare/cloudflare-os

- URL: https://github.com/cloudflare/cloudflare-os
- What it does: Agent workspace on Cloudflare Workers for documents, apps, and agents that run with a company’s context and systems.
- 10,386★ · TypeScript · last push 2026-10-02 21:23 ET
- License: Apache-2.0
- Lenses: CoS productivity; general agent tooling
- Security: README describes gatekeepers that authorize third-party services, including OAuth client credentials. That is a broad connector surface (company docs and systems), not a single-purpose skill. Different repo from the already-listed `cloudflare/security-audit-skill`.
- Already-in-dedupe: no
- Where seen: daily trending

### 6. LuxAlgo/Vela

- URL: https://github.com/LuxAlgo/Vela
- What it does: Open-source web financial charting library (the core of LuxAlgo’s Vela charts), with a UI kit and design tokens.
- 800★ · TypeScript · last push 2026-10-02 23:33 ET
- License: Apache-2.0
- Lenses: Investing ops (dashboards / charts only; not a broker or order router)
- Security: No installer-pipe, credential harvest, or trading-key pattern in the README skim. Chart library, not an execution system.
- Already-in-dedupe: no
- Where seen: TypeScript weekly (+377 stars this week on the trending card)

### 7. VectifyAI/PageIndex

- URL: https://github.com/VectifyAI/PageIndex
- What it does: Document index for vectorless, reasoning-based RAG over long documents.
- 38,540★ · Python · last push 2026-10-01 11:24 ET
- License: MIT
- Lenses: Investing ops (research packets / filings); CoS document workflows
- Security: README examples assign `OPENAI_API_KEY` and `PAGEINDEX_API_KEY` in Python (`os.environ[...] = "your-...-key"`). Those are placeholders, not leaked keys. Cloud mode needs their API. No `curl|bash` in the skim.
- Already-in-dedupe: no
- Where seen: Python weekly (+2,715 stars this week)

### 8. thedotmack/claude-mem

- URL: https://github.com/thedotmack/claude-mem
- What it does: Cross-session memory for coding agents: captures a session, compresses it, and injects context into later sessions (Claude Code, Codex, Gemini, OpenCode, and others named in the README).
- 95,245★ · TypeScript · last push 2026-10-03 02:33 ET
- License: Apache-2.0
- Lenses: Botfoundry / agent workflows; CoS (memory across sessions)
- Security: Primary install path is `npx claude-mem install`. A separate OpenClaw path is `curl -fsSL https://install.cmem.ai/openclaw.sh | bash`. Memory retention is the product: it stores what the agent did. Overlaps the job of already-listed `vectorize-io/hindsight` but is a different repo. Not a re-rank of hindsight.
- Already-in-dedupe: no
- Where seen: daily trending

### 9. heygen-com/hyperframes

- URL: https://github.com/heygen-com/hyperframes
- What it does: Write HTML, render video, with skills aimed at agents (HeyGen).
- 56,118★ · TypeScript · last push 2026-10-03 08:03 ET
- License: Apache-2.0
- Lenses: Promo / content production (not embroidery ops); general agent tooling
- Security: Install path shown is `npx skills add` / `npx hyperframes`. No `curl|bash` in the skim. Renders video from HTML an agent writes; review any skill that can pull external media.
- Already-in-dedupe: no
- Where seen: weekly + TypeScript weekly

### 10. pbakaus/impeccable

- URL: https://github.com/pbakaus/impeccable
- What it does: Design-language skill and detector rules that push an AI coding harness toward a specific visual system.
- 74,663★ · JavaScript · last push 2026-10-03 03:35 ET
- License: Apache-2.0
- Lenses: Promo / creative production; general agent tooling
- Security: `npx impeccable install` plus in-tool `/impeccable` commands. README says the deterministic rules run with no LLM and no API key. No `curl|bash` in the skim.
- Already-in-dedupe: no
- Where seen: weekly, daily, JavaScript weekly

### 11. inkeep/agents

- URL: https://github.com/inkeep/agents
- What it does: Visual no-code builder and TypeScript SDK for agents, with two-way sync between the canvas and code.
- 1,448★ · TypeScript · last push 2026-10-03 01:54 ET
- License: Elastic License 2.0 plus supplemental terms (`LICENSE.md`). API SPDX was `NOASSERTION`. ELv2 limits offering the software as a hosted service and tampering with license-key checks.
- Lenses: Botfoundry / agent workflows; CoS (non-engineers editing agents)
- Security: No `curl|bash` in the short README. License is not a permissive OSI license. Docker compose files are in the repo; not reviewed line by line.
- Already-in-dedupe: no
- Where seen: topic/MCP search, pushed this morning (not on the trending cards)

### 12. earendil-works/pi

- URL: https://github.com/earendil-works/pi
- What it does: Agent toolkit with a unified LLM API, agent loop, terminal UI, and a coding-agent CLI. Also named as a built-in engine in `github/gh-aw`.
- 111,945★ · TypeScript · last push 2026-10-03 07:54 ET
- License: MIT
- Lenses: General agent tooling; Botfoundry
- Security: README install is `curl -fsSL https://pi.dev/install.sh | sh` and a PowerShell `irm | iex` equivalent. `/login` connects a subscription or API key inside the tool.
- Already-in-dedupe: no
- Where seen: daily trending

### 13. oblien/openship

- URL: https://github.com/oblien/openship
- What it does: Self-hosted deployment platform with CI/CD: point it at a repo and it builds, ships, routes, and terminates TLS. Desktop app, server, or their cloud.
- 14,403★ · TypeScript · last push 2026-10-03 07:43 ET
- License: Apache-2.0
- Lenses: CoS / small-team deploy automation
- Security: README quick start includes `curl -fsSL https://get.openship.io | sh` (and a `/dev` variant). Alternate path noted: `npm i -g openship`. Holds deploy credentials and SSH access to servers if used that way.
- Already-in-dedupe: no
- Where seen: TypeScript weekly (+1,902 stars this week)

### 14. androoAGI/starnet

- URL: https://github.com/androoAGI/starnet
- What it does: Local-first desktop agent harness with a pixel-art “station”; bring-your-own-key, agents run on the machine.
- 987★ · JavaScript · last push 2026-09-28 17:02 ET
- License: MIT
- Lenses: Botfoundry / agent workflows
- Security: README describes pasting an OpenRouter key or OAuth sign-in (Anthropic, OpenAI, Google), with keys claimed to stay in the OS keychain. MCP connectors are “paste-a-key/OAuth”. Provider traffic leaves the machine when an agent runs. No `curl|bash` in the skim.
- Already-in-dedupe: no
- Where seen: JavaScript weekly (+618 stars this week)

### 15. codespar/mcp-dev-latam

- URL: https://github.com/codespar/mcp-dev-latam
- What it does: MCP servers for Latin American commerce: Pix, NF-e, banking, fiscal, messaging, and multi-carrier shipping (`@codespar/mcp-melhor-envio`).
- 271★ · TypeScript · last push 2026-09-27 03:38 ET
- License: MIT
- Lenses: Adjacent to freight / brokerage ops. This is Brazil/LATAM fiscal and parcel shipping, not US LTL.
- Security: README examples include placeholder payment keys (`STRIPE_API_KEY`, `ASAAS_API_KEY`). Several servers are invoked with `npx`. Live payment and tax credentials if connected. Not a PeyMak LTL tool.
- Already-in-dedupe: no
- Where seen: MCP/logistics topic search

### 16. obra/superpowers

- URL: https://github.com/obra/superpowers
- What it does: Agentic skills framework and a software-development methodology for coding agents.
- 294,687★ · Shell · last push 2026-09-26 22:37 ET
- License: MIT
- Lenses: General agent tooling (coding methodology, not an ops connector)
- Security: No `curl|bash` hit in the README skim. Last push is the evening before this scan’s calendar date; it is on today’s daily trending list anyway (+578 stars today on the card).
- Already-in-dedupe: no
- Where seen: daily trending

### 17. mattpocock/skills

- URL: https://github.com/mattpocock/skills
- What it does: Engineering skills exported from the author’s agent setup, added into a repo as files you can edit.
- 275,024★ · Shell · last push 2026-09-29 08:38 ET
- License: MIT
- Lenses: General agent tooling; CoS coding-agent hygiene
- Security: `npx skills@latest add mattpocock/skills` writes files into the repo. README says nothing updates behind your back until you pull again. No `curl|bash` in the skim.
- Already-in-dedupe: no
- Where seen: daily trending (+750 stars today on the card)

### 18. DietrichGebert/ponytail

- URL: https://github.com/DietrichGebert/ponytail
- What it does: Skill/plugin that steers coding agents toward less code (“the best code is the code you never wrote”).
- 152,384★ · JavaScript · last push 2026-10-03 01:12 ET
- License: MIT
- Lenses: General agent tooling
- Security: Install is in-tool plugin install (`/plugin install`, Copilot, pi, Gemini extensions), not a piped shell script. Hooks need Node on PATH. Low ops fit; included because it is #1 on the daily page and is an agent-behavior change, not a library.
- Already-in-dedupe: no
- Where seen: daily trending (+1,289 stars today)

### 19. vercel-labs/agent-skills

- URL: https://github.com/vercel-labs/agent-skills
- What it does: Vercel’s published collection of agent skills.
- 31,873★ · JavaScript · last push 2026-08-28 09:36 ET
- License: GitHub API returned no license (`license: null`). Not verified from a LICENSE file this scan.
- Lenses: General agent tooling
- Security: Install line is `npx skills add vercel-labs/agent-skills`. Code has not been pushed since 2026-08-28; it is still on JavaScript weekly (+340 stars this week on the card). Treat the missing license field as unresolved.
- Already-in-dedupe: no (distinct from `addyosmani/agent-skills`, which is already listed)
- Where seen: JavaScript weekly

### 20. Leonxlnx/taste-skill

- URL: https://github.com/Leonxlnx/taste-skill
- What it does: Skill that tries to stop coding agents from producing generic visual design.
- 92,190★ · JavaScript · last push 2026-09-26 05:01 ET
- License: MIT
- Lenses: Promo / creative; general agent tooling
- Security: No `curl|bash` hit in the pattern skim. Last push is Saturday morning of the prior scan, so this is carry-over heat on this week’s JavaScript list (+2,037 stars this week on the card), not a new commit cycle.
- Already-in-dedupe: no
- Where seen: JavaScript weekly

## 4. Needs-human-review bucket

Not ranked as picks. Each one is either a live freight/credential surface, a broad agent with a piped installer, a device or traffic proxy, or a trending repo with a clear abuse or consent issue.

### Freight / LTL lane (thin, and sensitive)

**warpfreight/warp-agent-mcp** — https://github.com/warpfreight/warp-agent-mcp  
Already-in-dedupe: **yes** (2026-09-26 recommended, quote-only caution).  
5★ · TypeScript · MIT · last push 2026-10-02 14:59 ET.  
Material change this week, so it is noted rather than ignored: commits on 2026-10-02 add `price_check` (0.21.0, “judge a price against the account’s own lane history”), plus earlier `report_issue` and a booking-path fix (`book: reference reaches the pickup stop`). README still shows OAuth sign-in that writes a `wak_live_*` token into `~/.warp/config.json`, and `npx -y warp-agent-mcp`. This remains a live Warp freight API (quote, book, track). Do not treat `price_check` as paper trading.

**warpfreight/warp-mcp-remote** — https://github.com/warpfreight/warp-mcp-remote  
Already-in-dedupe: no. 0★ · TypeScript · API license: none · last push 2026-10-02 15:07 ET.  
Remote Streamable-HTTP wrapper around the same Warp tools, pinned to 0.21.0. README reads the API key from the `Authorization` header, env, `?warpApiKey=` / `?api_key=` query string, or a base64 `?config=` blob. A key in a URL is a leak risk (logs, history, referrers). Zero stars, no LICENSE file reported by the API.

**SoapyRED/freightutils-mcp** — https://github.com/SoapyRED/freightutils-mcp  
Already-in-dedupe: no. 6★ · TypeScript · MIT · last push 2026-10-03 07:12 ET (v2.20.0).  
Reference MCP (ADR, HS codes, UK duty, LDM/CBM, UN/LOCODE). README says it does not book freight and that results are not legal or filing advice. It also has `get_subscribe_link` for a paid tier and calls out to freightutils.com (`npx freightutils-mcp`). Low stars and a commercial upsell; human should confirm what the hosted lookups send before any agent is pointed at it. Best *new* freight-shaped repo this week, still not a brokerage system.

**AlexGorbatov/ai-workflow-agent** — https://github.com/AlexGorbatov/ai-workflow-agent  
Already-in-dedupe: no. 0★ · Java · API license: none · created 2026-09-27 · last push 2026-10-02 17:06 ET.  
Described as email → human-approved freight quote, with the model not allowed to set price. Brand-new, zero stars, no license file. Review only; do not install from this scan.

**plainfreight-com/plainfreight-mcp** — https://github.com/plainfreight-com/plainfreight-mcp  
Already-in-dedupe: no. 0★ · language unset · MIT · last push 2026-09-27 10:51 ET.  
Hosted MCP for China–USA quotes. README: no API key and no signup. `generate_offer` can email an offer if an address is passed. Tracking uses the link/token as the credential (“anyone holding the link can read that shipment”). Booking is a prefilled form on their site, outside the repo.

### Agent control, proxies, and piped installers

**pingdotgg/t3code** — https://github.com/pingdotgg/t3code  
Already-in-dedupe: no. 24,422★ · TypeScript · MIT · last push 2026-10-03 07:08 ET.  
Remote/mobile/desktop control surface for local coding agents (Claude Code, Codex, Cursor, Grok, OpenCode, Antigravity). README install is `curl -fsSL https://t3.codes/install.sh | sh` (PowerShell `irm | iex` as well), plus desktop binaries. Empty description on the trending card. Remote control of a logged-in agent session is the review item. Daily and TypeScript weekly.

**JuliusBrussee/caveman** — https://github.com/JuliusBrussee/caveman  
Already-in-dedupe: no. 109,307★ · Go · Apache-2.0 · last push 2026-10-03 04:07 ET.  
Skill plus a local proxy that compresses tool output before it reaches the model provider, with auth passed through. README says originals stay in local SQLite. Telemetry (random install ID and IP) is on by default (`caveman telemetry off`). Skill-only path is `npx skills add`. Daily trending. Review the proxy before wrapping a client that holds provider keys.

**openclaw/openclaw** — https://github.com/openclaw/openclaw  
Already-in-dedupe: no. 391,214★ · TypeScript · MIT · last push 2026-10-03 08:02 ET.  
Personal/team agent that sits in Discord, Slack, Telegram, WhatsApp, iMessage, and other chats, with optional camera, screen, and device actions. Install is `curl -fsSL https://openclaw.ai/install.sh | bash`. README says tools run on the host for the main session unless sandboxed, and inbound DMs should be treated as untrusted. TypeScript weekly (+1,170 stars this week). Several other repos this week tell you to install OpenClaw-related scripts.

**mobile-next/mobile-mcp** — https://github.com/mobile-next/mobile-mcp  
Already-in-dedupe: no. 8,578★ · TypeScript · Apache-2.0 · last push 2026-10-02 09:55 ET.  
MCP that drives iOS/Android simulators and real devices and is also described as scraping. `npx @mobilenext/mobile-mcp`. Device control plus scraping needs a named device and a policy before use. TypeScript weekly.

**debpalash/VoiceStudio** — https://github.com/debpalash/VoiceStudio  
Already-in-dedupe: no. 52,221★ · Python · AGPL-3.0 · last push 2026-10-03 06:09 ET.  
Local ElevenLabs-style studio: voice cloning, dubbing, transcription. Install is `curl -fsSL https://voicestudio.sh/install | sh` (and `irm | iex` on Windows). Voice cloning is a consent problem even when the code is local. Weekly + Python weekly (largest star gain on the weekly page: +16,475). Not an embroidery tool.

**alirezarezvani/claude-skills** — https://github.com/alirezarezvani/claude-skills  
Already-in-dedupe: no. 27,401★ · Python · MIT · last push 2026-08-30 05:46 ET.  
Large third-party skills/plugins pack (engineering, marketing, finance, ops claims in the description). Still on weekly trending (+832 this week) with no push since August. README includes `bash <(curl -s https://raw.githubusercontent.com/alirezarezvani/claude-skills/main/scripts/openclaw-install.sh)`. Same neighborhood as already-listed skill packs; the piped installer is why it is here instead of the ranked list.

**richarvey/OmniMem** — https://github.com/richarvey/OmniMem  
Already-in-dedupe: no. 61★ · Python · MIT · last push 2026-10-02 18:14 ET.  
Self-hosted agent memory fed by RSS, exposed as MCP. Install line is `curl -fsSL https://code.squarecows.com/ric/omnimem/raw/branch/main/install.sh | bash` (not a github.com raw URL), pulling pre-built Docker Hub images. Small, and the installer host is a review item.

**TencentCloud/Octop** — https://github.com/TencentCloud/Octop  
Already-in-dedupe: **yes** (2026-09-26 needs-human-review).  
6,494★ · Python · MIT · last push 2026-10-03 08:01 ET.  
Still on weekly trending (+1,425 this week). README installer is still `curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/octop/install.sh | bash` (Tencent COS, not GitHub). Prior flag stands. Not re-ranked.

**Panniantong/Agent-Reach** — https://github.com/Panniantong/Agent-Reach  
Already-in-dedupe: **yes** (2026-09-19 needs-human-review: cookies / ToS).  
89,353★ · Python · MIT · last push 2026-09-15 12:16 ET.  
Still on weekly and daily trending (+3,959 this week, +1,683 today on the cards) with no push since 2026-09-15. Prior cookies/ToS flag was not re-cleared this scan. Not re-ranked.

### Trending, but the behavior is the problem

**pablostanley/yoinks** — https://github.com/pablostanley/yoinks  
Already-in-dedupe: no. 3,696★ · TypeScript · MIT · last push 2026-07-17 02:40 ET.  
“Yoink any video from your terminal.” On first run it downloads a standalone yt-dlp binary into `~/.yoinks/bin`. A `curl yoinks.sh | sh` installer is listed as not done yet. Stale code, still +1,415 stars this week. Rights/ToS issue plus an unexplained binary fetch.

**yikart/AiToEarn** — https://github.com/yikart/AiToEarn  
Already-in-dedupe: no. 26,266★ · TypeScript · MIT · last push 2026-09-18 03:18 ET.  
Agent that publishes and monetizes content across TikTok, YouTube, X, Instagram, WeChat, and others. README is heavy with sponsor signup links and affiliate-style offers. No push in this scan week, but it is still on TypeScript weekly (+423 stars this week). “AI to earn” plus broad social posting is a review item, not a CoS tool.

**areyoubugcoder/Mp2RSS** — https://github.com/areyoubugcoder/Mp2RSS  
Already-in-dedupe: no. 31★ · TypeScript · API license: none · last push 2026-10-02 21:14 ET.  
Scrapes WeChat official-account articles into RSS/JSON for monitoring and research. README says GitHub/Google OAuth, no WeChat account attached, and a resettable feed token that is also the API bearer. Platform ToS and the missing license file need a human. Not ranked.

## 5. Skip / thin list

### Off-lens or hostile on the trending pages

- **HunxByts/GhostTrack** — https://github.com/HunxByts/GhostTrack — on weekly trending (+1,536 stars this week) described as a tool to track a location or mobile number. 16,760★ · Python · API license: none · last push 2024-01-11 (the star burst is not new code). Surveillance tooling. Not a candidate.
- **Neet-Nestor/Telegram-Media-Downloader** — script to download media from Telegram web when the group restricts downloading. JavaScript weekly. Rights/ToS. Not reviewed further.
- **qist/tvbox** — media box config collection. JavaScript weekly. Not an ops workflow.
- **mnfst/awesome-free-llm-apis** — CC0 list of permanent free-tier LLM APIs, linking to provider key pages, with a sponsor CTA to manifest.build. JavaScript weekly, pushed 2026-10-03. A directory, not a workflow. Skim did not show pasted live keys in the intro; still not a CoS system.
- **harry0703/MoneyPrinterTurbo** — known one-click short-video generator. 128,173★ · MIT · pushed 2026-10-03. Weekly trending again. Not a discovery.
- **moeru-ai/airi** — self-hosted companion/waifu app. TypeScript weekly. Not ops.
- **byoungd/up** — personal “life upgrade” guide. JavaScript weekly.
- **Comfy-Org/workflow_templates**, **vercel-labs/scriptc**, **meituan-longcat/LongCat-Video**, **OpenCut-app/OpenCut**, **jamwithai/production-agentic-rag-course** — image workflows, a compiler, a video model, a video editor, a course. Daily or TypeScript weekly. No ops lens.
- **tile-ai/tilelang**, **longbridge/gpui-kit** — GPU kernel DSL, and a Rust GUI kit (Apache-2.0 text in `LICENSE-APACHE`; API SPDX was `NOASSERTION`). Longbridge is a broker, but this repo is desktop widgets, not brokerage ops. Both on weekly trending.
- **Effect-TS/effect**, **vercel/next.js**, **flutter/flutter**, **pytorch/pytorch**, **getsentry/sentry**, **nodejs/node**, **mrdoob/three.js**, **anthropics/claude-code** — platforms and frameworks on the trending pages. Not workflow discoveries.

### Evergreen automation, not a discovery

- **n8n-io/n8n** — still the platform (206,551★, pushed 2026-10-03). Same call as the last two weeks.
- **Zie619/n8n-workflows** and **enescingoz/awesome-n8n-templates** — large template dumps. Last pushes 2026-06-24 and 2026-09-12, outside this week’s commit window.
- **huginn/huginn** — classic self-hosted agent monitor, pushed 2026-10-03, not on these trending pages. Already well known.

### Search noise

- **NousResearch/hermes-agent** — 250,882★ · Python · MIT · pushed 2026-10-03 07:53 ET. “The agent that grows with you.” README install is `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`, and it can import OpenClaw settings and API keys. It showed up only because a loose logistics/readme query matched it. Not on this week’s trending pages. Not ranked.
- LTL name search also returned 0★ profiles (`api-evangelist/arcbest`, `api-evangelist/xpo`, `aadityapatil350/freightclassfinder`, and similar). Catalog pages and demos, not reviewed as candidates.

### Already in the 2026-09-26 or 2026-09-19 lists (not re-#1)

| Repo | This week | Why it stays off the new ranking |
|---|---|---|
| paperclipai/paperclip | Weekly #1, 96,512★, TS, MIT, push 2026-10-03 08:03 ET, +12,825 stars this week | Still the same “manage agents at work” app. This week’s README quick start is `npx paperclipai@latest onboard`, not a `curl\|bash` line. Active bugfix commits. No new job to do. |
| vectorize-io/hindsight | Weekly #2, 44,881★, Python, MIT, push 2026-10-02 13:43 ET | Memory product. `curl -fsSL https://hindsight.vectorize.io/get-cli \| bash` is still in the README. Same caution as 2026-09-26. |
| dream-num/univer | TS weekly, 22,320★, Apache-2.0, push 2026-10-03 04:07 ET, +4,208 stars this week | Office harness for agents. Sheet/docs fixes, not a new system. |
| anthropics/claude-code-action | TS weekly, 9,401★, MIT, push 2026-10-02 16:30 ET, +417 stars this week | API description empty. Not re-skimmed. Prior recommendation stands without a new #1. |
| jaypetez/glean | 7★, Python, MIT, push 2026-09-29 18:25 ET | Patch release 1.4.11 and dependency bumps, including a pyjwt advisory bump. Still the same RSS/digest daemon. Early/low-star caution unchanged. |
| anthropics/financial-services | 38,603★, Python, Apache-2.0, push 2026-09-21 17:10 ET | No push in this scan week. |
| openbq-org/OpenBB (was OpenBB-finance/OpenBB) | 73,788★, Python, push 2026-10-02 00:55 ET | Org move: API redirects `OpenBB-finance/OpenBB` to https://github.com/openbq-org/OpenBB. LICENSE file text says Apache-2.0 (copyright OpenBB Inc.); API `license.spdx_id` is still `NOASSERTION`. Metadata change only. Not a new discovery. |
| TauricResearch/TradingAgents | 109,577★, Python, Apache-2.0, push 2026-09-29 02:15 ET | Still the multi-agent trading framework. Prior “paper/sim only” note stands. Not re-ranked. |
| openbao/openbao | 8,291★, Go, MPL-2.0, push 2026-10-03 03:41 ET | Hardening lane already recommended. Still active. Not a new workflow. |
| affaan-m/ECC | Daily trending, 271,757★, JS, push 2026-10-02 | 2026-09-19 list. Still hot. |
| addyosmani/agent-skills | Daily, 100,661★ on the card | 2026-09-19 list. |
| mksglu/context-mode | Daily, 25,157★, TS | 2026-09-19 list (ELv2 caution). |
| anthropics/knowledge-work-plugins, cloudflare/security-audit-skill, stablyai/orca, max-sixty/worktrunk, trycua/cua, microsoft/markitdown | Not on this week’s trending cards | Left on the prior lists. Not re-opened. |

### Stale star heat

- **adewaskar/jarvis** — https://github.com/adewaskar/jarvis — 346★ · TypeScript · MIT · last push 2026-08-05. “Daily tasks using Claude Code.” On TypeScript weekly (+119 stars this week) with no commit since August. Not ranked.

## Promo / embroidery

No embroidery, print, decoration, or shop-order repo appeared on the trending pages or in the freight, n8n, RSS, or Actions searches. Promo-adjacent only: hyperframes (ranked), impeccable (ranked), taste-skill (ranked, stale push), VoiceStudio and AiToEarn (review).
