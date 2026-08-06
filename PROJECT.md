# Mithradevi T — Portfolio

Context prompt for resuming work in a fresh session. Keep this updated.

## Who / what

Personal portfolio for **Mithradevi Thayumanasamy** ("Mithra"), Senior Product
Designer, Bangalore. Modelled on `rachelchen.tech` (structure + restraint),
with pieces borrowed from `abstract.systems` (live time, tag pills, activity
strip, CV button, scramble headings) and two Framer components (pixel-reveal
hero, focus-card carousel — carousel was built then reverted).

Working dir: `C:\Users\Dell\dotlet casestudy\portfolio`

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
`motion` (Framer Motion) · Vercel AI SDK + `@ai-sdk/anthropic` · `geist` +
Source Serif 4 · `lucide-react` · `simple-icons`.

**Read `node_modules/next/dist/docs/` before writing Next.js code** — v16 has
breaking changes vs. training data (see `AGENTS.md`).

## Design system

Tokens in `src/app/globals.css`:
`--background #fafcfd` · `--foreground #32404f` · `--foreground-light` 60% ·
`--primary #e65f2e`

Typography follows Rachel's trick: `h1`/`h3` are **serif display**, and `h4` is
redefined site-wide as an **uppercase mono "label"** role (nav, dates,
metadata) — not a heading level. Body is Geist Sans.

Custom cursor: any element with `data-cursor="Label"` morphs the cursor into a
labelled pill. `cursor: none` globally on fine pointers.

## Architecture

**All copy lives in `src/content/*.ts` — zero JSX.** Adding a project means
adding one file; the grid, the `/projects/[slug]` route and the chat's
knowledge base all pick it up automatically. Keep it that way.

```
src/
  app/            page.tsx (Work) · about/ · fun/ · projects/[slug]/ · api/chat/
  components/     home/ work/ fun/ about/ case-study/ chat/ cursor/ layout/ motion/ ui/
  content/        profile experience projects skills tools writing fun-projects about audio
                  case-studies/*.ts (8, one per project)
  lib/            fonts cn chat/systemPrompt chat/rateLimit
```

## Pages

- **`/` Work** — scrambling hero tagline, IntroBlock (bio + tag pills + live
  Bangalore clock), ExperienceTimeline (+ CV button), 8-project grid, ToolsRow,
  SkillsGraph.
- **`/about`** — tagline, bio, interests, **ActivityStrip**, 4-category photo grid.
- **`/fun`** — PixelHero, hackathons/workshop grid, Writing list (Substack).
- **`/projects/[slug]`** — case-study template, 8 SSG pages.

## Notable components

- **`ui/ScrambleText`** — decode-on-load heading animation, re-fires on hover.
  Renders final text server-side (SEO + reduced-motion safe); scramble layers on
  after mount.
- **`fun/PixelHero`** — artwork behind a grid of paper tiles that clear under the
  cursor. Tiles are *sized* (~46px) not counted, so a ResizeObserver re-derives
  the grid and they stay square. Opacity written straight to the DOM from a rAF
  loop — ~500 tiles through React state would re-render on every mouse move.
  Type carries a halo in the opposite tone (colour-flipping alone fails when
  half a line sits on paper and half on paint).
- **`home/SkillsGraph`** — Obsidian-style cluster graph, 6 clusters / 36 skills.
  Deterministic seeded layout + a damped force solver that guarantees no
  overlapping labels. **Coordinates are rounded to 2dp** because `Math.cos/sin/
  hypot` aren't bit-identical between Node and Chrome → hydration mismatch.
- **`home/ActivityStrip` + `ActivityBars`** — 30-day strip. Uniform-height pill
  bars where **colour** carries intensity. Staggered entrance; hover zooms a bar
  and shows a styled tooltip. Entrance delay is cleared once settled or it makes
  hover feel laggy.
- **`home/VinylPlayer`** — spinning disc + tonearm, click to play.

## MithraLLM (AI chat)

`lib/chat/systemPrompt.ts` concatenates everything in `content/` into one system
prompt (context-stuffed RAG — no vector DB needed at this scale). `app/api/chat/
route.ts` streams via Claude Haiku with a per-IP in-memory rate limit.
**`convertToModelMessages` is async in this SDK version — must be awaited.**

⚠️ **Needs `ANTHROPIC_API_KEY` in `.env.local`** — errors gracefully without it.

## Deploy

Netlify CLI, site `mithradevi-portfolio`. GitHub remote:
`github.com/mithradevit/portfolio`.

⚠️ **Stop the dev server before `netlify deploy`.** It holds a lock on `.next`;
Windows then fails the rename with EPERM and the build dies at "Failed
publishing static content." This wasted a lot of time — it is not a CLI
limitation.

## Honesty constraints (do not quietly break)

- The **activity strip shows "Placeholder", not a contribution count**, because
  `profile.socials.github` is empty. Set that to a GitHub **username** and it
  fetches real public-event data. Never invent contribution numbers.
- Söhne and Tiempos (from the reference sites) are **paid fonts** — substituted,
  not bundled.
- Adobe/OpenAI marks aren't redistributable via simple-icons → brand-coloured
  monogram fallback in `ui/ToolIcon`.

## Still open

- `ANTHROPIC_API_KEY` for the chat.
- GitHub username → real activity data.
- Audio track at `public/audio/track.mp3` for the vinyl player.
- Project thumbnails (`public/images/projects/`) — currently colour blocks.
- About photo grid: 12 images across Designer / Builder / Writer / Photographer.
- About page copy is still partly placeholder.

## Working preferences

- **Never commit or deploy unless asked.**
- The in-app Browser pane is unreliable here — verify via `curl` / DOM queries,
  and tell her to open `localhost:3000` in her own Chrome.
- Console/preview logs go stale; confirm suspected errors in a **fresh tab**
  before believing them.
