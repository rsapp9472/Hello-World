# SOURCE PACK — Saturday GitHub trending workflows

**Window:** 2026-10-03 through 2026-10-10 (scan run Saturday 2026-10-10)  
**Mode:** research only. Nothing was installed. No product code was changed. No email was sent.  
**Use:** recommend-research. A rank is a suggestion for a human pass, not an install order.

Lenses: **PeyMak freight**, **investing**, **promo-embroidery**, **CoS bot org**, **general agent tooling**.

---

## How this rank was built

Research priority follows lens fit, a push or trending appearance inside the window, and install-path risk. Star velocity is a signal. A repo that leads the daily chart can still sit low, or off the list, when the README’s install path is a remote script, a cert-intercepting proxy, a reseller API-key desk, or a live order tool.

Anything on the prior shortlist stays in the “still on the board” section. This pack does not re-assign those names to #1.

---

## Sources used

| Source | Result |
| --- | --- |
| `https://github.com/trending?since=weekly` | Worked via raw HTML. GitHub returned **13** rows, fewer than the old 25-row page. |
| `https://github.com/trending?since=daily` | Worked. **13** rows. |
| `https://github.com/trending/typescript?since=weekly` | Worked. **17** rows. This is where OpenRig, FounderOS, cursor/plugins, and billion-context showed up together. |
| `https://github.com/trending/typescript?since=daily` | Worked. **11** rows. |
| `https://github.com/trending/python?since=weekly` | Worked. **12** rows. |
| WebFetch of the same trending URLs | Partial. The converter stopped early and mixed sponsor links into repo names. The HTML parse above is the one used. |
| `https://gittrend.io/trending/mcp` | Worked. Page said updated **2026-10-09**. Star-velocity list, not GitHub’s own chart. |
| GitHub GraphQL `repository` via `gh` | Worked. Stars, language, `pushedAt`, SPDX license. |
| GitHub REST `search/repositories` | Worked after the query was passed on the URL. An earlier `gh api -f q=...` call with `+` returned an empty body. |
| GitHub README fetches | Worked for every ranked repo. Used for install-path and auth notes only. |
| `https://developers.cloudflare.com/changelog/post/2026-10-10-cloudflare-mcp-skills/` | Worked. Dated 2026-10-10. |
| Domain web search (freight MCP, RSS digest, embroidery/POD, trading MCP, skills) | Worked as a pointer list. Several hits were already on the dedupe list or were stale. |

**Failed or thin**

- No new **LTL quote-and-book** MCP appeared this week. The booking server already shortlisted (`warpfreight/warp-agent-mcp`) last pushed **2026-10-02** (`price_check` against lane history, release 0.21.0). That is the edge of this window, and it stays off the new list.
- Embroidery and promo search did not surface a trending repo. The two relevant MCPs are small and last moved in June–July.
- RSS search inside the window is mostly 0–3 star repos plus the already-large TrendRadar project.
- `alphaparkinc/genpark-voice-first-logistics-coordinator-skill` is an 8-line stub (last push 2026-07-22). Dropped.
- Botfoundry / Business-in-a-Bot was not searched.

---

## Still on the board (prior dedupe — do not re-#1)

These were visible again. Commit subjects were sampled only where a material product change was plausible. Routine pushes stay here.

| Repo | Why it reappeared | This week’s note |
| --- | --- | --- |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Weekly + daily trending. ~8,156 stars this week. 283,616 stars, pushed 2026-10-09. | Already shortlisted 2026-10-03. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | Weekly trending. ~3,850 stars this week. 99,104 stars, pushed 2026-10-09. | Already shortlisted 2026-10-03. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Weekly trending and gittrend MCP. ~4,003 stars this week. 60,092 stars, pushed 2026-10-10. | Already shortlisted 2026-10-03. |
| [pingdotgg/t3code](https://github.com/pingdotgg/t3code) | Weekly trending. ~2,379 stars this week. 26,728 stars, pushed 2026-10-10. | On the 2026-10-03 review list. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | Daily trending. 26,049 stars, pushed 2026-10-10. | Recent commits are CI install-stat bumps. Shortlisted 2026-09-19. |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Daily + Python weekly. 28,578 stars, pushed 2026-10-10. ~626 stars today on the daily page. | Shortlisted 2026-09-19. |
| [cloudflare/cloudflare-os](https://github.com/cloudflare/cloudflare-os) | TypeScript weekly. 11,328 stars, Apache-2.0, pushed 2026-10-10. | **Material delta, still not a new #1.** This week’s commits add Google Docs, Sheets, and Slides creation in the approver’s account, plus reading slide images/tables. Separate from the repo: the Cloudflare API MCP changelog of **2026-10-10** says `https://mcp.cloudflare.com/mcp` now serves Cloudflare skills through the Skills-over-MCP extension (`skills/list`, `skill://` URIs). |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python weekly. 95,284 stars, pushed 2026-10-08. | Shortlisted 2026-09-19. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | gittrend MCP velocity list. 276,227 stars, pushed 2026-10-10. | Shortlisted 2026-09-19. |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | Search hit for multi-agent orgs. 99,460 stars, pushed 2026-10-10. | Today’s commits are adapter, workspace, and editor fixes. Shortlisted 2026-09-26. OpenRig below is the new trending org harness. |
| [warpfreight/warp-agent-mcp](https://github.com/warpfreight/warp-agent-mcp) | Still the freight-booking MCP that search returns first. 5 stars, MIT, pushed 2026-10-02. | `price_check` vs lane history landed 2026-10-02. Shortlisted 2026-09-26. |
| [anthropics/skills](https://github.com/anthropics/skills) | Skills search, 180,257 stars, pushed 2026-10-09. License field empty in the API. | Canonical Anthropic skills repo. It is **not** on the named dedupe list (`knowledge-work-plugins` is a different repo). Treated as established infrastructure, not a new find. |

Also still named on the dedupe list and **not** re-reviewed this pass: `github/github-mcp-server`, `jrcasey/RSS_Agent`, `alirezarezvani/claude-skills`, `obra/superpowers`, `JuliusBrussee/caveman`, `eloylp/agents`, `openclaw/openclaw`, `earendil-works/pi`, `HarrisHan/ai-daily-digest`, `jaypetez/glean`, `anthropics/financial-services`, `OpenBB-finance/OpenBB`, `dream-num/univer`, `vectorize-io/hindsight`, `anthropics/claude-code-action`, `TauricResearch/TradingAgents`, `openbao/openbao`, `Ali-Cheikh/nosey-agent`, `TencentCloud/Octop`, `cloudflare/security-audit-skill`, `stablyai/orca`, `addyosmani/agent-skills`, `Open-Dev-Society/OpenStock`, `microsoft/markitdown`, `max-sixty/worktrunk`, `trycua/cua`.

`obra/superpowers` (297k, pushed 2026-10-10) and `addyosmani/agent-skills` (104k, pushed 2026-10-10) still lead skills search. Both are already shortlisted.

---

## Seen this week and left off the rank

| Repo | Why it is off the list |
| --- | --- |
| [morluto/rea](https://github.com/morluto/rea) | Daily #1 and gittrend MCP #1. 60,576 stars, TypeScript, MIT, pushed 2026-10-10. “Reverse engineer anything,” binaries through runtime, `npx rea-agents setup`. Research the phenomenon on the chart. The install is a remote npm package aimed at disassembly. |
| [tester-army/e2e](https://github.com/tester-army/e2e) | ~6,566 stars this week, the largest in-scope weekly gain after console and gym repos. 8,563 stars, TypeScript, Apache-2.0, pushed 2026-10-10. Agent steps are optional; `npx e2e init`; telemetry. A test runner, not a freight, investing, promo, or CoS workflow. |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | Daily trending, ~279 stars today, 217,862 stars. Last push **2026-04-20**. README curls `CLAUDE.md` from `forrestchang/andrej-karpathy-skills` while the trending repo is `multica-ai`. Supply-chain mismatch. |
| [storytold/artcraft](https://github.com/storytold/artcraft) | Daily trending. 12,905 stars, Rust, Apache-2.0, pushed 2026-10-10. Artist IDE. README has no agent, MCP, or skill install path. |
| [goodnight000/api-anything](https://github.com/goodnight000/api-anything) | gittrend, 405 stars, TypeScript, MIT, pushed 2026-10-09. Learns a site’s own frontend requests and replays them as an API. |
| [bulutarkan/mac-mcp](https://github.com/bulutarkan/mac-mcp) | 80 stars, Python, MIT, pushed 2026-10-10. Local Mac control: shell, files, browser, UI automation. |
| [nanobrowser/nanobrowser](https://github.com/nanobrowser/nanobrowser) | TypeScript weekly, 14,038 stars, Apache-2.0, last push **2026-10-02** (just outside the window). Multi-agent Chrome automation with the user’s own model keys. |
| [visterion/agora](https://github.com/visterion/agora) | 1 star, Java, MIT, pushed 2026-10-10. Market data plus **trade execution**. Docker tag `ghcr.io/visterion/agora:main`. OAuth app secrets for Saxo. |
| [johnamcruz/futures-trading-harness](https://github.com/johnamcruz/futures-trading-harness) | 1 star, JavaScript, MIT, pushed 2026-10-10. Scheduled futures orders through a broker MCP. |
| [jeffbai996/ibkr-mcp](https://github.com/jeffbai996/ibkr-mcp) | 4 stars, Python, license “Other”, pushed 2026-10-10. README calls it a teardown: the 43 tool implementations are not in the public tree. OAuth on `/mcp` is described as read/propose. |
| [wsp-labs/wsp](https://github.com/wsp-labs/wsp) | 9 stars, TypeScript, AGPL-3.0, pushed 2026-10-10. Runs coding agents on the user’s machines. Install is a downloaded Mac app / AppImage or `npm i -g @wsp-labs/wsp`. |
| [KeyValet/KeyValet](https://github.com/KeyValet/KeyValet) | 1 star, Rust, Apache-2.0, pushed 2026-10-10. Local credential broker. Install is `curl \| sh` from `keyvalet.dev`. Interesting control idea, hostile install path. |
| [reconurge/flowsint](https://github.com/reconurge/flowsint) | TypeScript weekly, 9,594 stars, Apache-2.0, pushed 2026-10-03. Graph investigations for analysts. Left off as investigation tooling. |
| [HunxByts/GhostTrack](https://github.com/HunxByts/GhostTrack) | Python weekly. Phone/people-tracker class. Skipped entirely. |
| [hicccc77/WeFlow](https://github.com/hicccc77/WeFlow) | TypeScript weekly, 14,919 stars, license “Other”, pushed 2026-10-09. Local WeChat history export. Out of lens. |
| [p-e-w/heretic](https://github.com/p-e-w/heretic) | Python weekly, 34,426 stars, AGPL-3.0, pushed 2026-10-07. Automatic censorship removal for language models. Out of lens. |
| [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5), [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym), [EpicGames/raddebugger](https://github.com/EpicGames/raddebugger), Flutter, TensorFlow, PyTorch, Transformers | On the all-language charts. Outside the five lenses. |
| [pablostanley/yoinks](https://github.com/pablostanley/yoinks) | TypeScript weekly, last push 2026-07-17. “Yoink any video.” Out of lens. |
| [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | TypeScript weekly, 32,743 stars, MIT, pushed 2026-10-09. One endpoint in front of many free model providers. Prompt routing to third parties. Infra, not a workflow. |
| [cargofy/ATLAS](https://github.com/cargofy/ATLAS) | 19 stars, no SPDX license, last push **2026-03-06**. Self-hosted logistics MCP. Stale. |
| [DCS-Premium-Freight-SRL/claude-for-freight](https://github.com/DCS-Premium-Freight-SRL/claude-for-freight) | 9 stars, Apache-2.0, last push **2026-05-14**. EU forwarder plugin patterns, including an authority matrix for unattended RFQ watchers. Stale relative to this week. |
| [hafrey1/TrendRadar](https://github.com/hafrey1/TrendRadar) | 3-star fork. The upstream is ranked below. |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python weekly, 40,417 stars, MIT, last push **2026-04-13**. Financial foundation model, not an ops tool, and stale. |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python weekly, 77,593 stars, AGPL-3.0, pushed 2026-10-01 (just outside the window). Swarm prediction engine. |
| n8n | Not re-opened. No material n8n change was part of this scan. |

---

## Soft-ranked candidates

Prior-list column is **no** for every row below.

### 1. [mvschwarz/openrig](https://github.com/mvschwarz/openrig) — CoS bot org

Persistent local teams of Claude Code, Codex, and Pi: YAML topology, tmux seats, shared context, an MCP so agents can manage the rig.

- **6,613** stars · TypeScript · pushed **2026-10-10** · Apache-2.0 · ~2,338 stars this week (weekly chart)
- **Security:** `curl -fsSL https://raw.githubusercontent.com/mvschwarz/openrig/v0.6.8/scripts/install.sh | sh` then `npm install -g @openrig/cli`. `rig setup` can install missing harnesses and Herdr. YOLO / full-bypass is described as off by default; an explicit full-bypass seat selects Claude’s bypass flag and Pi’s `--approve`. Agents also run on the user’s existing Claude/Codex logins.

### 2. [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) — CoS bot org

Teams-style multi-agent orchestration for Claude Code (plan, execute, QA), with a path aimed at OpenClaw-class runtimes.

- **39,757** stars · TypeScript · pushed **2026-10-08** · MIT · TypeScript daily chart
- **Security:** `npm i -g oh-my-claude-sisyphus@latest` (package name differs from the repo). README says it keeps Claude OAuth as-is. Global npm install from a package whose name is not the repo name.

### 3. [Bennettxai/FounderOS](https://github.com/Bennettxai/FounderOS) — CoS bot org

Single-operator command center: comms, funnel, social, finances, a knowledge graph, and named agents as departments. v2 sits on BusinessOS.

- **1,020** stars · Go · pushed **2026-10-10** · MIT · TypeScript weekly chart (the repo’s primary language is Go)
- **Security:** Local `brew install` of Node, Go, Postgres, pgvector, Redis, Elixir, Python, then `make dev-local`. Depends on [Miosa-osa/BusinessOS](https://github.com/Miosa-osa/BusinessOS) and Optimal Engine. Operator routes include a unified inbox (email, Slack, WhatsApp, calendar). Cohort funnel at founderos.sh. Broad connector surface if those lanes are turned on.

### 4. [ugorur/orka](https://github.com/ugorur/orka) — CoS bot org

One strong coding agent acts as CTO (plan, review, merge); cheaper CLIs implement in parallel git worktrees.

- **11** stars · Shell · pushed **2026-10-10** · MIT · search, not the trending chart
- **Security:** `npx skills add ugorur/orka` pulls a remote skill pack. Workers run logged-in CLIs. README says worker reports are pattern-masked for obvious secrets and calls that a seatbelt, not DLP. Small and new; read the shell before anyone runs it.

### 5. [cursor/plugins](https://github.com/cursor/plugins) — general agent tooling

Official Cursor plugin spec and the first-party plugin directory (team kit, continual learning, CLI-for-agents, and others).

- **10,682** stars · TypeScript · pushed **2026-10-10** · **no license in the GitHub API** · ~1,125 stars this week
- **Security:** Repo of plugin folders, not a curl installer. Missing license is the flag. Read each plugin’s own tools before enabling it.

### 6. [microsoft/skills](https://github.com/microsoft/skills) — general agent tooling

Skills, custom agents, AGENTS.md templates, and MCP configs for Azure SDKs and Microsoft AI Foundry. README cites on the order of 170 skills.

- **3,097** stars · TypeScript · pushed **2026-10-09** · MIT
- **Security:** `npx skills add microsoft/skills` (remote skill install). Includes an Entra Agent ID skill that talks about OAuth2 agent identities via Microsoft Graph beta. Azure account scope if those skills are used against a real tenant.

### 7. [tt-a1i/archify](https://github.com/tt-a1i/archify) — general agent tooling (also promo decks / explainers)

Agent skill that turns a repo, plan, or idea into an interactive HTML diagram.

- **81,503** stars · JavaScript · pushed **2026-10-10** · MIT
- **Security:** `npx skills add tt-a1i/archify -g`. README is packed with sponsor blocks for third-party API relays (one key, many models). Those sponsors are ads in the README, and they are the same pattern as several other viral skill repos this week.

### 8. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — general agent tooling

Editorial HTML+SVG diagrams for Claude Code, Codex, Copilot, Cursor, and Pi. 44 diagram types.

- **48,453** stars · HTML · pushed **2026-10-10** · MIT · ~1,189 stars today on the daily chart
- **Security:** `npx skills add cathrynlavery/diagram-design`. Same remote skill-installer class as archify. Output is self-contained HTML.

### 9. [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) — general agent tooling, adjacent to promo product design

CAD tools for agents (`cadgen`), plus a skills.sh install.

- **18,891** stars · Python · pushed **2026-10-10** · MIT · ~2,125 stars this week
- **Security:** `uvx` to run cadgen; `npx skills add earthtojake/text-to-cad#latest`. README describes telemetry that can be turned off with `uvx cadgen telemetry off`. uvx pulls a package at run time.

### 10. [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) — promo-embroidery (video / small-biz marketing)

Open agentic video production: pipelines, tools, and a large skill/knowledge pack. Python weekly chart.

- **65,987** stars · Python · pushed **2026-10-03** · AGPL-3.0
- **Security:** Clone, venv, `pip install`, Remotion/`npm install`, ffmpeg. AGPL if anyone ships a service on it. README addresses OpenClaw agents directly. Paid model/tool costs sit outside the repo.

### 11. [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) — promo-embroidery (product video)

Claude Code / Codex skill for cinematic product videos on Remotion: shot recipes and motion previews.

- **11,113** stars · TypeScript · pushed **2026-10-05** · Apache-2.0 · TypeScript daily chart
- **Security:** `npx skills add Vincentwei1021/video-shotcraft`. Render path can download a chrome-headless-shell binary. Sits on Remotion (62,969 stars, license “Other”, pushed 2026-10-10), which was on the TypeScript daily chart and is not ranked on its own.

### 12. [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — promo-embroidery (sales/marketing decks)

Turns documents or topics into native PowerPoint (shapes, transitions, charts, templates).

- **58,982** stars · Python · pushed **2026-10-08** · MIT · ~372 stars today
- **Security:** `pip install -r requirements.txt` after a local download. README sponsor strip is API-relay affiliates (Kimi, Packy, RunAPI, APIKEY.FAN). Same “one cheap key for every model” pattern as cc-switch and archify.

### 13. [GreerBK/InkStitchMCP](https://github.com/GreerBK/InkStitchMCP) — promo-embroidery

MCP bridge to Ink/Stitch: SVG in, machine embroidery files out (DST, PES, JEF, and others), plus lettering and stitch validation. **Not on this week’s trending chart.**

- **0** stars · Python · pushed **2026-07-28** · license “Other”
- **Security:** Local venv and `pip install` of Ink/Stitch. No curl-pipe and no hosted key in the README snippet. Stale and unused by star count. It is still the only machine-file embroidery MCP this search found. Treat as a research lead, and expect bitrot.

### 14. [Dynamic-Mockups/mcp](https://github.com/Dynamic-Mockups/mcp) — promo-embroidery

Official MCP for the Dynamic Mockups API: catalogs, renders, print-file export, and `tool_create_embroidery_effect` (image to a stitched look). **Not on trending.**

- **1** star · JavaScript · pushed **2026-06-23** · MIT
- **Security:** Hosted API key (`DYNAMIC_MOCKUPS_API_KEY`). Paid credits per render. Embroidery here is a visual effect, not a stitch file. Stale repo, live vendor.

### 15. [SoapyRED/freightutils-mcp](https://github.com/SoapyRED/freightutils-mcp) — PeyMak freight

Neutral freight **reference** MCP: LDM, CBM, chargeable weight, ADR, HS codes, UN/LOCODE, airline prefixes, ICS2 description checks. Citations on each answer. It does not quote, book, or file.

- **6** stars · TypeScript · pushed **2026-10-08** · MIT
- **Security:** Hosted connector at freightutils.com, or `npx freightutils-mcp`. Anonymous tier is 25 requests/day per IP; a key raises that. Pro is listed at £19/month for 50,000 calls (`get_subscribe_link`). Data leaves the machine when the hosted API is used. Useful next to the already-shortlisted Warp booking server, and it is not a replacement for it.

### 16. [osauer/canary](https://github.com/osauer/canary) — investing

Local risk desk on an Interactive Brokers Gateway/TWS session: daily brief, portfolio and market evidence, read-only MCP, CLI, paired app.

- **8** stars · Go · pushed **2026-10-10** · MIT
- **Security:** README says the standard binary and every MCP tool are structurally read-only, and that a separate experimental trading binary exists for constrained broker actions. Install text says to inspect the script first. IBKR login is a live brokerage session even when the tools are read-only. Tiny project, pushed today, and the cleanest new investing ops lead in this scan.

### 17. [sansan0/TrendRadar](https://github.com/sansan0/TrendRadar) — general agent tooling (RSS / digest)

Hot-list and RSS monitor with keyword groups, MCP client, and Docker images `wantcat/trendradar` and `wantcat/trendradar-mcp`. Chinese platforms plus RSS. Pushed today, so it is in the window even though the project is already large.

- **62,784** stars · Python · pushed **2026-10-10** · GPL-3.0
- **Security:** Docker images and an MCP server that can call an AI API (`AI_API_KEY`). Public-opinion / trend product, not a phone tracker. GPL if it is wrapped into a service. Optional remote storage (S3-compatible) is in the changelog. Rank the upstream, not the `hafrey1` fork.

### 18. [TakashiAihara/tsuzuri](https://github.com/TakashiAihara/tsuzuri) — general agent tooling (RSS / digest)

Self-hosted feed reader whose primary UI is a CLI and an MCP server. Subscribes to sites that publish no RSS, via declarative scrape rules. Status line says ingest, search, MCP, and clustering work; summarization is still ahead.

- **1** star · TypeScript · pushed **2026-10-10** · MIT
- **Security:** `docker compose` for Postgres. Optional OpenAI-compatible embeddings key. Non-RSS subscriptions are scrapers. Early. The interesting digest shape for a private Saturday brief, with almost no adoption yet.

### 19. [crunchtools/mcp-feed-reader](https://github.com/crunchtools/mcp-feed-reader) — general agent tooling (RSS / digest)

Small RSS/Atom MCP with a SQLite file of feeds.

- **0** stars · Python · pushed **2026-10-10** · AGPL-3.0
- **Security:** `uvx mcp-feed-reader-crunchtools` or `pip install`. uvx is a remote package fetch at runtime. AGPL. A systemd unit in the README uses `sudo`. Narrow tool, brand new, no users.

### 20. [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) — general agent tooling

Context-compression plugin aimed at long coding sessions and smaller windows. On the weekly and TypeScript weekly charts (~246 stars this week).

- **736** stars · TypeScript · pushed **2026-10-10** · license **Other** (SPDX `NOASSERTION`)
- **Security:** Several hosts are wired by a launcher that does **certificate MITM** (`bili copilot`, `bili amp`, `bili crush`, `bili jcode`) so the plugin can see model traffic. That is an intercepting proxy on the agent’s API calls. Research the compression idea from the README. Do not run the launcher on a machine that holds real keys.

### 21. [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — general agent tooling

Desktop manager (Tauri) for Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, Hermes, Pi, and others: switch providers, MCP, skills, and prompts.

- **142,297** stars · Rust · pushed **2026-10-10** · MIT · gittrend velocity list
- **Security:** Install is a GitHub release binary (opaque build relative to reading the repo). The app is an API-key and provider switchboard. The README is a directory of reseller / relay sponsors (one key, discounted Claude/GPT/Gemini, affiliate links). A key pasted into a relay is a broad credential. Useful as a map of how the agent-desktop scene is packaging itself. A poor place to put a primary API key.

### 22. [bytedance/deer-flow](https://github.com/bytedance/deer-flow) — general agent tooling

Long-horizon super-agent harness: sub-agents, memory, skills, sandboxes. Already famous after the February 2026 trending spike. Pushed today and absent from the dedupe list, so it is recorded once, low.

- **83,636** stars · Python · pushed **2026-10-10** · MIT
- **Security:** Docker or `make setup`, which writes provider keys to `.env`. Sandbox and bash/file-write choices are part of the wizard. README tells users to keep `auto_approve_permissions` off for untrusted tasks. Delegated fetch backends (Browserless, Crawl4AI, Firecrawl) need network isolation. Established project, not a Saturday discovery.

### 23. [AtomicBot-ai/atomic-agent](https://github.com/AtomicBot-ai/atomic-agent) — general agent tooling

Local-first agent on llama.cpp or cloud providers. Browser, files, approved shell, memory. TypeScript weekly chart.

- **3,216** stars · TypeScript · pushed **2026-10-09** · MIT
- **Security:** Installer downloads a release archive, checks a checksum, and installs a binary plus native prebuilds. High local privilege (shell, filesystem, browser). Can import sessions from OpenClaw, Claude Code, Codex, Hermes, and Pi. Release binary rather than a from-source run.

### 24. [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) — general agent tooling

Toolkit for building AI SRE agents against the tools a team already runs. Python weekly chart.

- **11,724** stars · Python · pushed **2026-10-10** · Apache-2.0
- **Security:** `curl -fsSL https://install.opensre.com | bash` (Windows: `irm` into `Invoke-Expression`). Installer pulls the latest build from `main`. Optional OpenSRE Cloud gateway and a self-hosted container that takes `LLM_PROVIDER` plus an API key. Remote install script plus a vendor cloud path.

### 25. [microsoft/mxc](https://github.com/microsoft/mxc) — general agent tooling

Microsoft eXecution Container: sandboxed execution for untrusted code (model output, plugins, tools) on Windows, Linux, and macOS, with filesystem policy.

- **2,508** stars · Rust · pushed **2026-10-10** · MIT · gittrend velocity list
- **Security:** This one is the containment primitive the other rows keep needing. It is not a business workflow. Ranked last because it is infrastructure for running the others more safely, and the README did not show a curl-pipe installer in the scanned lines.

---

## Lens gaps after this pass

**PeyMak freight.** Booking and tracking still point at the already-shortlisted Warp MCP. The new name worth reading is FreightUtils, and it is a cited calculator/reference layer (ADR, HS, LDM/CBM), with a paid API tier and no booking. ATLAS and Claude-for-Freight are stale. No fresh multi-carrier LTL desk showed up on trending.

**Investing.** Canary is the new read-only IBKR brief. Agora and the futures harness can place orders and stay off the adopt list. OpenBB, TradingAgents, and anthropics/financial-services stay on the September shortlist.

**Promo / embroidery.** Trending energy is video and decks (OpenMontage, video-shotcraft, ppt-master, and the diagram skills), plus HeyGen Hyperframes already shortlisted. Machine embroidery is InkStitchMCP (July, 0 stars). Stitched-look mockups are Dynamic Mockups (June, paid API). Printify MCPs found in search (`Tunbi313/printify_mcp`, 0 stars, August; `TSavo/printify-mcp`, last push 2025) were too stale to rank.

**CoS / multi-agent org.** OpenRig is the chart’s answer this week. oh-my-claudecode and FounderOS are the other two shapes (Claude-Code teams, and a solopreneur operating system). Orka is the small CTO-and-worktrees pattern. Paperclip kept shipping fixes and stays on the old list.

**RSS / digest.** TrendRadar is the mature MCP+RSS system and it moved today. tsuzuri and mcp-feed-reader are the small self-hosted experiments from today. `jrcasey/RSS_Agent` and `HarrisHan/ai-daily-digest` stay on the October 3 list.

---

## Soft-ranked list

1. **mvschwarz/openrig** — CoS bot org — local multi-agent rig — curl-pipe + optional permission bypass  
2. **Yeachan-Heo/oh-my-claudecode** — CoS bot org — Claude Code teams — global npm, package name ≠ repo  
3. **Bennettxai/FounderOS** — CoS bot org — solopreneur departments — depends on BusinessOS; inbox connectors  
4. **ugorur/orka** — CoS bot org — CTO agent plus worker worktrees — `npx skills add`, 11 stars  
5. **cursor/plugins** — general — official Cursor plugins — no license in the API  
6. **microsoft/skills** — general — Azure/Foundry skills pack — `npx skills add`, Entra OAuth skill  
7. **tt-a1i/archify** — general / promo explainers — interactive diagram skill — `npx skills add`, relay sponsors  
8. **cathrynlavery/diagram-design** — general — editorial diagram skill — `npx skills add`  
9. **earthtojake/text-to-cad** — general / product design — agent CAD — `uvx` + telemetry  
10. **calesthio/OpenMontage** — promo video — agentic video studio — AGPL, pip/npm  
11. **Vincentwei1021/video-shotcraft** — promo video — Remotion product-video skill — `npx skills add`, headless Chrome  
12. **hugohe3/ppt-master** — promo decks — native PowerPoint — pip, API-relay sponsors  
13. **GreerBK/InkStitchMCP** — embroidery — stitch-file MCP — stale July, 0 stars, local pip  
14. **Dynamic-Mockups/mcp** — promo mockups — embroidery *effect* + print files — stale June, paid API key  
15. **SoapyRED/freightutils-mcp** — PeyMak freight — cited freight math and ADR/HS lookup, no booking — `npx` + freemium hosted API  
16. **osauer/canary** — investing — read-only IBKR risk desk — separate experimental trading binary  
17. **sansan0/TrendRadar** — RSS/digest — hot lists + RSS + MCP — GPL, Docker, AI key  
18. **TakashiAihara/tsuzuri** — RSS/digest — self-hosted reader and MCP, including sites without RSS — early, scrape rules  
19. **crunchtools/mcp-feed-reader** — RSS/digest — SQLite feed MCP — `uvx`, AGPL, 0 stars  
20. **ranxianglei/billion-context** — general — context compression — **cert MITM launcher**, license Other  
21. **farion1231/cc-switch** — general — desktop agent/provider switcher — release binary, API-key desk, relay sponsors  
22. **bytedance/deer-flow** — general — super-agent harness — keys in `.env`, sandbox flags; already well known  
23. **AtomicBot-ai/atomic-agent** — general — local agent with shell and browser — release binary  
24. **Tracer-Cloud/opensre** — general — AI SRE agent toolkit — `curl \| bash` from install.opensre.com  
25. **microsoft/mxc** — general — sandbox for untrusted tool/model code — containment primitive  

**First reads if the time is short:** OpenRig (CoS, with the install script read and not executed), FounderOS (solopreneur board), FreightUtils (PeyMak reference, beside Warp), Canary (investing, read-only), InkStitchMCP plus Dynamic Mockups (embroidery, both stale), TrendRadar or tsuzuri (digest). Leave billion-context’s launcher, cc-switch’s relay sponsors, rea, mac-mcp, and any order-placing trading harness for a security pass before any machine runs them.
