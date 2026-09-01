# Handoff — portfolio (as of 25 Aug 2026)

## ⚠️ FIRST THING: the dev server is wedged

Port 3000 is held by a `node.exe` that **accepts TCP connections but never
answers** — `/`, `/about`, `/manifest.json` and even static `.webp` files all
hang for 20s+ then `ECONNRESET`. It is not a code fault: static assets do not
touch React, so a wedged process is the only explanation. It has now happened
to two separate PIDs (29580, then 18752), so expect it to recur.

**Fix:**

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
200 to Node's client) — use the Node probe.

**Because of this, nothing below marked "unverified" has been seen rendering.**

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
3. **MithraLLM has never run.** No `.env.local`; the endpoint opens a stream then errors. Mithra must create her own `ANTHROPIC_API_KEY`. Also: the system prompt only reads `sections[0].body[0]` per case study, and errors are masked as "An error occurred."
4. **`npx next build` has never been run** this session — only `tsc --noEmit`, and the last one was interrupted.
5. Pre-existing **OrbitGallery hydration mismatch** on `/` (offered, never accepted).
6. Open `TODO(Mithra)` markers: NDA flags on projects, the 5+ interview stat, "Currently Building" naming, FIESTAA/SYNECTICS placeholder year.
7. Unused leftovers: `MilestoneTimeline` export, `servicesIntro` in `content/services.ts`, `.marquee-track-reverse` CSS.

## Last changes — unverified in browser (server was hung)

Both verified at source level only. Neither has been seen rendering.

1. **Client product name redacted.** `MView DEMS` → `Digital Evidence
   Management` in `content/milestones.ts`; the MithraLLM suggestion chip now
   reads "Tell me about the digital evidence work" (it previously named the
   redacted product *and* pointed at a project no longer in `projects.ts`, so
   the bot answered "I don't know" to its own suggestion). Confirmed by grep:
   **zero occurrences of "MView"** in `src/` or `public/`. "Altitude" was never
   present anywhere in the codebase.

2. **First case study cover replaced.** `Downloads/Inspo/Frame 10.png`
   (1600×900) → `public/images/projects/frontline-safety-cover.webp` (88 KB),
   and `projects.ts` now points at it. The old `frontline-safety.png` is still
   on disk and now unreferenced — delete when confirmed.

   Note the naming: a **new filename**, not an overwrite. Overwriting keeps
   serving stale bytes from Next's optimizer cache. Same reason
   `dotlet-cover-v2.webp` exists.

## Next session should

1. Kill the wedged PID, restart, and **verify both changes above render** —
   `/` (first card shows the new cover) and `/about` (milestone reads
   "Digital Evidence Management").
2. Ask Mithra whether the leftover `frontline-safety.png` and the three unused
   components (`ProjectRail`, `ProjectBento`, `ProjectTabs`) should be deleted.
