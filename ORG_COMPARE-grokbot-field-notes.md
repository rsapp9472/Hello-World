# Org compare: grokbot-field-notes vs Robert's CoS org

Source: [unicodef1wn/grokbot-field-notes](https://github.com/unicodef1wn/grokbot-field-notes) @ `02780c04` (2026-09-20). Skimmed README, `AGENTS.md`, `ANTIPATTERNS.md` (40 items), playbooks (9), `agents/` (orchestration / verification / skills / prompts), `reference/` (economics / product), roster README + sample roles (CoS, playbook owner, bot factory, self-improvement, source of truth, KB, triage, inbox, voice, bookkeeper, commitment tracker, misc, prioritizer). Not a 72h launch sprint. We are ops + investing + freight. Coding grunt → Cursor Cloud Agents. Judgment stays on Grok Bot. Cap Grok ≤~14.3%/day.

Two lanes in every item:

- **CoS org** — Boss front door, Flash (paper), CIO (holdings targets), PeyMak/LTL, CB Swing, World briefs, IMPACT. Human gates: money, live trading, Brokers/TMS, installs.
- **BiB factory** — BiB CEO / Pack Builder. The only place the stream's software-factory habits are even in-scope.

---

## KEEP (already aligned — do not change)

**CoS as the only ping to Boss.** Field notes: Steve/Cora/Gus/Simon-bot — one bot the human talks to; specialists report to it; "I manage a team of one." Matches. Do not add a middle layer or let juniors light up Boss's sidebar.

**One named junior, one job.** Stream's most-repeated rule. Flash / CIO / PeyMak / CB / BiB are already expertise lanes, not task clones. Do not grow toward the 69-role catalogue.

**Code on Cursor; judgment on Grok.** Ling's model: Craig routes, IC bots spin cloud agents, playbook stays off the chief. We already split this. Do not pull repo work back onto Grok context (that's how you blow 14.3%).

**Human gates harder than the stream.** They keep humans on migrations, deploys, money, permissions — and still took prod down with an autopilot SQL. We already ban live trading (paper only for Flash), Brokers/TMS by bots, money moves, and installs without Boss. Keep these stricter than their launch-day ladder.

**Drafts before any external send.** Blake/David/Josh: writes are earned; "drafts only, never send." Already policy. Do not relax for "just this World reply."

**World briefs CoS-gated.** Same as Blake's notification discipline: Frankie/Wally/Harbor never ping the human. World → CoS pack → Boss. Keep.

**IMPACT triage ≠ fix.** Same shape as Crumble/Josh: classify, reproduce if it's a bug, file or discard. Does not set direction, does not patch, treats inbound as hostile. Keep the human priority call.

**Burn Cursor for grunt; starve Grok frequency.** `ECONOMICS.md`: 15-min routines are "100 times a day"; group chats talk over each other. Our 14.3% cap is the same lever they discovered the expensive way. Keep the cap; do not add standing polls to "feel in control."

**Named autonomy already pulled back on money.** Autopilot ladder is investigate → draft → autopilot → full; they used full only on a throwaway game and flinched on launch day. Flash/CIO are already investigate/draft. Keep. Full autopilot is not a goal.

**Auth / installs are a Boss step.** Stream: GitHub connector died mid-run; "auth is a workflow step." Boss-approves-installs already matches. Keep; bots ask, they do not "just connect it."

---

## ADOPT (high-value, low-drama — concrete next steps for CoS/BiB)

**1. Playbook Owner, not CoS-as-wiki.** Ling's Jenny owns the living standards doc; other bots read, cannot edit; CoS context stays small. Copy-pasting a rule into every junior "won't scale at 10 or 15."  
*CoS:* create one Playbook Owner junior (or a CoS-owned doc + broadcast skill). Dump into it once: paper-only, TMS-never, drafts-only, IMPACT classes, 14.3% cap, P0 definition, Cursor-vs-Grok split. Broadcast; juniors may not edit.  
*BiB:* same doc is the merge/proof policy BiB cites. Do not let Pack Builder invent a second standard.

**2. Principle, not incident — on every correction.** ANTIPATTERNS #1: Dr. Eggbot baked "potato mode / Cupcake Eng / today's session" into a permanent description. Useless next week.  
*CoS:* after any Boss correction, Playbook Owner writes the general rule and strips ticker/date/lane names. Test: would it make sense to a junior who wasn't in the thread?  
*BiB:* same for pack/review rules. No "when the checkout modal z-index…" equivalents.

**3. Name the autopilot rung on every handoff.** `ORCHESTRATION.md` table. "Urgent" is not a rung.  
*CoS:* tag Flash/CIO/PeyMak `investigate` or `draft` in the first line of the delegation. Never imply merge/send.  
*BiB:* default `draft` (PR + proof, wait). `autopilot` only on disposable pack scratch. Never `full`.

**4. Weekly self-improvement, hard cap of one.** Blake unbounded → "ten new bots to build." Cap is the product.  
*CoS:* Wednesday, one suggestion: automate a proven manual step *or* cut a routine. If the idea is "new junior," reject and ask for a skill/cadence cut instead.  
*BiB:* one pack-loop improvement per week (verify command, not a new engineer bot).

**5. Audit routines against the 14.3% budget.** Default 1–2×/day; prefer webhook/inbound; silence on no-op; three 15-min routines = hundreds of messages.  
*CoS:* list every routine + cadence this week. Kill or merge until Grok stays under cap. World/IMPACT event-triggered, not polled. "If nothing, say nothing."  
*BiB:* no nightly Grok babysit of Cursor unless a job is actually running (then watch that job, not the universe).

**6. Named source of truth per junior.** Trudy: answer from the docs or say "not documented." Invented marketplace bots shipped to a real landing page (#20).  
*CoS:* CIO → holdings-policy doc; Flash → paper-trade rules; PeyMak → tariff/quote source; CB → swing constraints. "Not in the doc" beats a plausible number.  
*BiB:* pack spec + `AGENTS.md` + feature map. Name the library; don't hand-roll.

**7. Proof-gated Cursor PRs (copy their form).** `AGENTS.md` + `.github/PULL_REQUEST_TEMPLATE.md`: reproduce, proof, scope, needs-a-human. A PR with no proof is a draft.  
*CoS:* does not review diffs. Escalates only the "needs a human" box (money, permissions, deploy, install).  
*BiB:* paste the template into pack repos. UI = screenshot/recording; bug = repro then pass. No proof → do not ask Boss to look.

**8. Restate + done-when before the first tool call.** Stream's favorite prompt: "restate in your own words"; "it is correct when [criteria]."  
*CoS:* require that two-liner from every junior on non-trivial work. Wrong restatement is free; wrong quote/target is not.  
*BiB:* same, plus the verification command that will prove it.

**9. New juniors only through CoS.** Simon: build everything through the chief so routing context exists. Bot Factory overfits descriptions unless corrected.  
*CoS:* no side-door creates. CoS writes the description as principles, records the lane, onboards the playbook. Before create: "why can't an existing junior or a routine do this?"  
*BiB:* Pack Builder is the engineer. Do not spawn UI/DevX/Infra/EM clones.

**10. Voice from sent mail; critique until it stops templating.** Shakespeare averaged the corpus; every draft looked the same. Fix: in-territory, positive-response, recency-weighted, then "this is why this email sucks" until it breaks.  
*CoS:* one Voice skill (not a 10th junior if CoS can hold it). Drafts only. Weekly draft-vs-sent delta.  
*BiB:* user-facing pack copy gets a de-slop pass against real brand assets. No invented logos/names.

**11. Hard IDs, not "reply to Alex."** #37: name-search blew a support ticket into a full inbox scan.  
*CoS:* IMPACT / Flash / PeyMak / World must carry ticket #, ticker, quote ID, or URL in the first hop.  
*BiB:* issue/PR URL, not "the button bug."

**12. Connectors first; browser is fallback.** Karen/Mimi: VM sessions expire independently; mid-demo logout.  
*CoS:* mail/calendar/World via connectors. Keep a "Boss takes the screen" path for login/CAPTCHA. Do not store secrets in chat.  
*BiB:* GitHub connector health is a preflight, not a surprise.

**13. Misc trash-can so specialists stay clean.** Shub: random questions pollute the bot you actually need.  
*CoS:* one Misc under CoS. Recurring Misc asks → skill or existing junior, not a new hire.  
*BiB:* curiosity/prototypes stay off Pack Builder's thread.

**14. Write the norm where the bots read it.** Steve opened a PR because "we ship to main" lived in humans' heads (#2).  
*CoS:* paper-only, TMS-never, drafts-only, 14.3%, Boss-installs — in the playbook the same day we adopt them. Slack folklore is invisible.  
*BiB:* PR-required is a written norm, not a vibe.

**15. P0 defined once; never shout "urgent."** #3: repeating "urgent" made the coding agent skip verification. Their P0 = check running cloud agents every 5 min and interrupt sleep/drift.  
*CoS:* P0 = "a Cursor job is live — watch *that* job; interrupt long sleep/drift." Do not stand up 5-min Grok polls 24/7 (that is a budget leak). Phrase: "treat this as P0."  
*BiB:* P0 does not mean skip `/verify`.

**16. Teach each junior how to say no.** #4: engineering bots accepted every X feature request because nothing defined what the product is *not*.  
*CoS:* Flash: no live. CIO: no unsolicited realloc. PeyMak: no bind without Boss. World: no send. IMPACT: no patch. Put the *why* in the playbook so it generalizes.  
*BiB:* Pack Builder rejects IMPACT items that are not a pack defect.

**17. Hand-run once, then skill, then routine.** `SKILLS-AND-ROUTINES.md` order. Automating an unvalidated quote/trade/pack path encodes fiction.  
*CoS:* refuse to skill a flow nobody has executed.  
*BiB:* no verify-CLI until a human has clicked the happy path.

**18. Two failed same-approach = stop and report.** `AGENTS.md`. Third try is how Grok burn dies and Flash papers a wrong model.  
*CoS + BiB:* return what was tried. Do not loop.

**19. Read-only spend watcher (not a CFO bot that pays).** Bookkeeper role: receipts, categories, alerts; cannot move money.  
*CoS:* weekly Grok% vs 14.3% and Cursor-model spend vs budget. Alert only.  
*BiB:* same numbers; no payment tools attached.

**20. Promises/asks as a CoS skill, not a new junior.** Blake's two lists: what Boss said he'd do; what he asked others for.  
*CoS:* fold into the morning brief. Nudge drafts only. 1–2×/day max.  
*BiB:* N/A unless a pack promised an external deliverable — then it goes through CoS.

---

## SKIP / ADAPT (wrong fit for investing/freight ops, or BiB-only)

**72h ship-to-main, 433 PRs, "I didn't look at the code."** Honest caveat in `VERIFICATION.md`: throwaway game; on the real product the same team reads every PR.  
*CoS:* skip.  
*BiB:* adapt — PRs + proof + human on anything that can leak into money/quotes/TMS-adjacent tooling. Auto-merge only on disposable scratch.

**Full autopilot / CI auto-fix merge after 10 minutes.** #29: autonomous bad SQL killed sign-ups mid-sentence about restraint.  
*CoS:* skip.  
*BiB:* investigate/draft only once a pack is used by anyone but BiB.

**The 69-role menu, SDR army, 15–20 specialists.** Simon/Blake: "too many," "you don't need 45." We are not a GTM SaaS motion.  
*CoS:* skip prospector, enrichment, battle cards, demo scripter, live deck, CRM updater, usage-signals, ICP researcher, per-account CS bots. PeyMak quotes freight; it is not an SDR.  
*BiB:* skip the five IC + EM pod. One Pack Builder + Cursor is the factory.

**Marketing six-bot campaign (ads, landing-page-to-prod, performance marketer).** Josh's launch-day stack. Revenue agent the same day made $0 (#40).  
*CoS:* skip.  
*BiB:* adapt only if a pack needs a public page: research + copy drafts; Boss is the spend/publish gate.

**Venue / permit / event / negotiator / pop-up roster.** Day 1's four-pivot graveyard (#39): they automated before they understood the domain.  
*CoS + BiB:* skip. We already know the domains (investing, paper trade, LTL). Do not import their unsolved problem.

**Meeting-attendee bot in live calls.** Blake: "be protective."  
*CoS:* skip broker, TMS, counterparty, and anything with credentials on screen (#28 token-on-stream). Adapt: CoS notes from a transcript Boss already captured.  
*BiB:* skip.

**Nightly audit engineer opening PRs across the monorepo.** Fine at 3 a.m. on a prototype with proof-gated merge.  
*CoS:* skip on anything that can touch trading/quotes.  
*BiB:* adapt on scratch packs; still proof-gated; no money paths.

**Feedback→PR autopilot and fuzz swarms on live.** Swarm "does real work" — they say point it at disposable only.  
*CoS:* IMPACT stays classify-not-fix.  
*BiB:* fuzz only disposable pack envs.

**"Make money" / monetization bot.** #40.  
*CoS:* skip. CIO/Flash exist because we already know how the money works. A loose revenue agent is not a strategy.  
*BiB:* skip.

**Group-chat staff meetings as the default.** Eager, overlapping, expensive (#35). Use when you *want* a debate.  
*CoS:* 1:1 CoS→junior. Convene only for a named conflict (e.g. holdings vs freight capacity). Instruct disagreement, then CoS synthesizes.  
*BiB:* no EngPod/War-room standing chats.

**Standing 5-minute cloud-agent watchdog.** Right on a launch day; wrong as a 24/7 Grok routine (that's the 14.3% killer).  
*CoS:* adapt — start the watcher only while a Cursor job is running; tear it down after.  
*BiB:* same.

**Ship-to-main, no PRs.** Matt's prototype norm; they also paid in rebases and collisions (#33).  
*CoS + BiB:* skip. Parallel agents get parallel branches/envs.

**Auto-send sequences, credits, activation mail (CloseBot).**  
*CoS:* skip. Drafts stay drafts even when the "wow moment" fires.  
*BiB:* skip.

**Support-ticket factory / evals tables / $0.20 bucket scripts.** Real if you have a product inbox. We don't.  
*CoS:* IMPACT is enough.  
*BiB:* skip until a pack has users who file tickets.

**Competitive intel that signs up for third-party products with our credentials.**  
*CoS:* skip broker/TMS/vendor portals (TOS + secrets). World can read public sources.  
*BiB:* adapt for public marketing sites only.

**Recruiter / designer / creative director / merch / grind-the-leaderboard.** Stream color.  
*CoS:* skip.  
*BiB:* a visual for a pack is one Cursor task, not a Grok junior.

**EM bot coached never to write code, plus a designer+PM+data-science pod.** Kevin/Roshan's internal xAI shape.  
*CoS:* CoS is not an EM. Prioritization stays Boss via IMPACT.  
*BiB:* if needed, a spec skill on Pack Builder — not four new bots.

---

## Top 5 antipatterns we should avoid

**1. Anxiety cadence (#34, #36).** Routines every 15 minutes because the book "feels important" is how Grok blows 14.3% and how you train yourself to ignore alerts. Default 1–2×/day or on an event. Watch running Cursor jobs; do not poll the ocean. Silence on no-op.

**2. Roster sprawl (#6, #7).** The repo is a menu of 69 roles. Creating a bot is fun and cheap; each one is a forever tax on context, threads, and tokens. Before any new junior: existing bot, or a skill, or a routine. Self-improvement may propose at most one change a week, and "new bot" is usually the wrong one.

**3. Autonomy from recent success, not blast radius (#29, #38).** Their factory landed 400+ PRs on a toy, then the same lane killed production. Flash paper ≠ license to live-trade. A green BiB loop ≠ Brokers/TMS. Set the rung from the cost of being wrong. Boss stays the interrupt bus on money, installs, and anything that leaves the building.

**4. Invented facts / unnamed source of truth (#10, #20, #23).** Plausible holdings numbers, LTL rates, or pack copy that "looks right" are worse than an error. Name the doc, the feed, the library. If it isn't there, say so. Check every external string for internal slang.

**5. "Urgent" that skips the loop (#3, #18).** Repeating "urgent" made their coding agent guess. Symptom-fix PRs hid the real matchmaking bug. P0 is a written policy (watch the live Cursor job; don't sleep 300). Reproduce and diagnose before anyone opens a PR or a quote. Two failed identical approaches → stop.

---

## Explicit non-actions

No email to Boss. No hierarchy change. No new juniors created by this note. Playbook Owner / Voice / Misc / spend-watcher are *recommendations* for CoS to sequence under the 14.3% cap, not an install list.
