# Handoff — portfolio (as of 1 Sep 2026)

## The dev server wedges periodically

Port 3000 gets held by a `node.exe` that **accepts TCP connections but never
answers** — `/`, `/about`, `/manifest.json` and even static `.webp` files hang
for 20s+ then `ECONNRESET`. It is not a code fault: static assets do not touch
React, so a wedged process is the only explanation. It has happened to three
PIDs so far (29580, 18752, and one before that), so expect it again.

Resolved on 1 Sep — 18752 was killed and the restart is healthy — but the fix
is worth keeping:

```bash
netstat -ano | grep ":3000.*LISTENING"   # get the PID
taskkill //PID <pid> //F
```

then `preview_start` with the `portfolio` config. If a *healthy* server is
already on 3000, use `portfolio-attach` instead — see the note in
`.claude/launch.json`. Probe health with a real client before assuming, e.g.

```bash
node -e "require('http').get({host:'127.0.0.1',port:3000,path:'/',timeout:15000},r=>console.log(r.statusCode)).on('timeout',function(){console.log('HUNG');this.destroy()})"
```

`curl` is unreliable in this shell (returns 000 against a server that answers
200 to Node's client) — use the Node probe. Note the **first probe after a
cold start hangs** while Turbopack compiles; retry before concluding it is
wedged.

## Read this first

- **Nothing is committed.** Mithra batches her own edits and commits herself. Never run `git commit` unless she explicitly says so.
- **Another session also edits this repo.** `content/projects.ts` dropped from 8 projects to 5 without us touching it. Re-read files before assuming their contents.
- **Copy voice:** shipped text states things directly. Sourcing, caveats and uncertainty belong in code comments / TODOs, never in rendered copy.

## Environment gotchas

- **A dev server is usually already running on port 3000, started outside the session.** Next 16 holds a *per-directory* lock — a second `next dev` on this folder exits regardless of port, so `autoPort` cannot help. Use the `portfolio-attach` entry in `.claude/launch.json` (listed first for this reason). Do not kill the other PID.
- **Verify by DOM measurement, not screenshots.** The Browser pane frequently fails to composite, and its coordinates go stale after `resize_window` (values stop matching `clientWidth`). Reload after resizing, and distrust mobile numbers taken right after a resize.
- **`getBoundingClientRect` right after a React click is stale** — measure in a *separate* tool call so the re-render has happened.
- **React synthesises `onMouseEnter` from bubbling `mouseover`.** Dispatching `mouseenter` in a test does nothing.
- Python is not installed — use `node -e` for scripting. `ffprobe` is not bundled with `ffmpeg-static`; use `ffmpeg -i` and grep stderr. `sharp` needs `.rotate()` to honour EXIF.
- **Unlayered bare-tag rules in `globals.css`** (`h1 h2 h3 h4 p li a`) beat plain Tailwind utilities. Override needs `!` or an inline `style`.
- **New image files need new filenames.** Overwriting a path keeps serving the old bytes from Next's optimizer cache.

## Layout system (as it stands)

| Token | Value |
|---|---|
| Page margin | `p-6 lg:p-10` |
| Band gap (Work, About, Fun) | `gap-40 lg:gap-60` → 160 / **240px** |
| Section label row | fixed `h-8` (32px) |
| Label → content | `gap-4` (16px) |
| Case-study section gap | **48px** (`gap-12`) |
| Case-study section heading | **32px / 38.4px** serif |
| Body | 15px — the site's one body size |

Case-study spacing and heading size were reverse-engineered from `rachelchen.tech/projects/openai` and match it at 1400px.

**Full-height folds** (`min-h-[calc(100dvh-12rem)]` + centred + `snap-section`) are a **Work-page device only** — About and Fun deliberately do not use them.

## Page state

**Work (`/`):** hero → About+Experience fold → Services → Tools fold → Selected Work.
- Selected Work is `ProjectGrid`/`ProjectCard` (stacked full-width cards) — reverted to this after trying tabs, an editorial rail and a bento. `ProjectRail.tsx`, `ProjectBento.tsx`, `ProjectTabs.tsx` are on disk but **unused**.
- Tools is static and always categorised. The marquee, the Categorize toggle and the scroll-to-sort were all removed. `ToolsRow` no longer needs `"use client"`.
- Tools category labels decode on scroll via `ScrambleText`'s new `scrambleInView` prop (fires once, staggered).

**About (`/about`):** hero → interests+activity → roles + certifications → Skills graph → FAQ.
- Photo grid and arc carousel are **hidden behind flags** in `src/lib/flags.ts` — hidden, not deleted. Flip to `true` to restore.
- "The roles" is `CareerTimeline.tsx`, a static grid reading `content/career-timeline.ts`. **Mithra still owes the project entries** to slot between the three Alchi roles; date spans are derived, not typed.
- Skills graph was reverted to its original UI (framed, straight `<line>` edges).

**Case studies:** optional `intro` block (serif lead with `**marked**` phrase + fact cards) exists on the type and is used **only on frontline-safety**. Dotlet has an `embed` (`dotlet.site`) and a `hero` video in the header.

- `embed` gained three optional fields on 1 Sep: `eager` (load with the page
  instead of behind the click gate — only for a static same-origin file we
  ship), `label` (replaces the host in the address pill, since a `/public`
  path is a filename not an address), and `fluid` (render at the column's own
  width instead of scaling a 1280px viewport down into it).
- **`fluid` exists because scaling ruins a long document.** The component was
  built for Dotlet, a fixed-layout canvas app that has to be seen whole. Fitting
  a 1280px viewport into the 758px column scales to 0.59, which puts 14px body
  text at **8.3px** and shows ~13% of a 6800px page. `fluid` drops the
  transform so the framed page uses its own breakpoints at true size.
- frontline-safety's "Building the System" section embeds the design system at
  `public/design-system/evidence-design-system.html` — `eager` + `fluid`, in an
  `h-[72vh] min-h-[540px]` frame rather than an aspect box, because a ratio
  derived from column width just picks an arbitrary peephole into a document
  that tall.

## Open / unfinished

0. **⚠️ The client product name is still visible in seven screenshots.** The
   frontline-safety case study's shipped screens carry an orange
   "VAULT / Evidence management" wordmark baked into the top-left sidebar:
   `custody`, `detail-pattern`, `fleet`, `live`, `storage`, `transcript`,
   `triage` (all in `public/images/projects/frontline-safety/`). Every
   *text* reference has been redacted — the rendered HTML for
   `/projects/frontline-safety` greps clean — but the pixels have not.
   Mithra chose to leave them for now (1 Sep 2026); she has not ruled on
   whether to re-export, retouch or crop. **Do not deploy without raising
   this**, since it undoes the same redaction "MView" got.
   Two code comments still say "Vault" (`EvidenceMockups.tsx:7`,
   `frontline-safety.ts:1`) — not rendered, harmless, but they are the
   reason a grep of `src/` is not zero.

1. **`h3` renders in three typefaces site-wide** — serif on Fun, Geist Sans on Work cards, 32px serif in case studies. Flagged in a font audit; Mithra has not decided.
2. **Seven mono label sizes** (9, 9.27, 10, 11, 12, 13, 15px) doing one job.
3. **MithraLLM has still never run** — there is no `.env.local`, so nothing
   below has been exercised against the real API. Mithra must create her own
   `ANTHROPIC_API_KEY` (console.anthropic.com → Settings → Keys) and put it in
   `portfolio/.env.local`; `.env.local.example` is the template.

   Reworked on 1 Sep, typechecks clean, **untested end to end**:
   - The system prompt no longer reads only `sections[0].body[0]`. It now emits
     role/timeline/team/scope/skills plus every section's heading, body,
     bullets, findings, measures and note per project — roughly 10K tokens.
     It still loops over `content/projects.ts`, not `caseStudies`, which is
     what keeps the unpublished drafts (`crm-remediation`, `health-ring`,
     `maternity-clinical-suite`) out of the bot's mouth as well as off the page.
   - Prompt caching is on (`providerOptions.anthropic.cacheControl`). The
     system prompt is byte-identical per request, so follow-up questions are
     ~10x cheaper on the repeated part. **Check `cache_read_input_tokens` is
     non-zero once a key exists** — if it's zero, something is varying in the
     prefix.
   - Errors are no longer masked. `toUIMessageStreamResponse({ onError })`
     logs the real cause server-side; `readableError()` in `ChatPanel.tsx`
     surfaces the API's own `error` string for things a visitor can act on
     (rate limit, not configured) and stays generic otherwise.
   - A missing key now returns **503 with a readable reason** instead of
     failing deep inside the stream, where it looked identical to an outage.
   - The prompt carries NDA instructions: describe the work, never name the
     client or product, and don't confirm a visitor's guess. **This is the
     only thing standing between the expanded knowledge base and the same
     leak item 0 describes** — the case-study prose is now fed to the model in
     full, so verify this holds before the chat goes live.
   - Model is `claude-haiku-4-5` — a deliberate cost choice for a public
     endpoint, not an oversight. Revisit only if answer quality disappoints.
4. **`npx next build` has never been run** this session — only `tsc --noEmit`, and the last one was interrupted.
5. Pre-existing **OrbitGallery hydration mismatch** on `/` (offered, never accepted).
6. Open `TODO(Mithra)` markers: NDA flags on projects, the 5+ interview stat, "Currently Building" naming, FIESTAA/SYNECTICS placeholder year.
7. Unused leftovers: `MilestoneTimeline` export, `servicesIntro` in `content/services.ts`, `.marquee-track-reverse` CSS.

## Verified rendering (1 Sep)

- **New first-case-study cover** — `Downloads/Inspo/Frame 10.png` (1600×900) →
  `public/images/projects/frontline-safety-cover.webp` (88 KB). Confirmed as
  the image actually served for the first card on `/`. A **new filename, not an
  overwrite** — overwriting keeps serving stale bytes from Next's optimizer
  cache, same reason `dotlet-cover-v2.webp` exists. The old
  `frontline-safety.png` is unreferenced; delete when confirmed.
- **MView redaction** — zero matches for "mview" or "altitude" in the rendered
  text of `/` and `/about`. Note `/about` does **not** show "Digital Evidence
  Management": `about/page.tsx` imports only `CertificationTimeline` from
  `MilestoneTimeline.tsx`, so `content/milestones.ts` renders nowhere. The
  redaction is correct but the data is currently dead. If that ruler is meant
  to be visible, it isn't — a separate decision from the redaction.
- **Design system embed** — loads eagerly at true 14px, no transform, no
  horizontal overflow, product name stripped (0 refs in the served file).

## Next session should

1. **Get MithraLLM running** — it is the one feature that has never executed.
   Needs Mithra's key in `.env.local`, then exercise the NDA guardrail and
   confirm cache hits (item 3).
2. Raise the **screenshot redaction** (item 0) before any deploy.
3. Ask about the leftover `frontline-safety.png` and the three unused
   components (`ProjectRail`, `ProjectBento`, `ProjectTabs`).
4. Run `npx next build` — still never done this session (item 4).
