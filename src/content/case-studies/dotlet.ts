// Written from Mithradevi's own full write-up at dotlet.netlify.app (Config
// Makeathon 2026). Portfolio-length cut — the long version lives at that link.
//
// Section headings double as the sticky nav on /projects/[slug], so they should
// read as a table of contents: what a reader would scan to decide where to
// jump. Aim for 8–10.
import type { CaseStudy } from "./types";

export const dotlet: CaseStudy = {
  slug: "dotlet",
  role: "Founder & Designer",
  timeline: "June 2026 — 10 days, concept to release",
  team: "Solo — product strategy, UX, interaction design, AI-assisted build",
  skills: ["0→1 Product Design", "AI-Assisted Development", "Interaction Design", "Scoping"],
  links: [
    { label: "Full case study", href: "https://dotlet.netlify.app" },
    // TODO: the live tool's own URL — the write-up links to it as "Try Dotlet
    // live", but that's a different address from the case study itself.
  ],
  sections: [
    {
      heading: "Overview",
      body: [
        "Dotlet is a browser-based vector tool. You place dots on a grid, they merge into smooth organic shapes in real time, and you export a clean SVG or PNG. No pen tool, no anchor points, no prior experience.",
        "The gooey filter engine is the whole product: an SVG feGaussianBlur and feColorMatrix pipeline running live in the browser, turning separate dots into one organic shape as you draw, with no rasterisation until export. The skill the tool asks for is placement, which everyone already has.",
        "I built it solo in 10 days for Config Makeathon 2026, entirely inside Figma Make, and later used it as the live case study for a Friends of Figma workshop on AI-native design workflows.",
      ],
      embed: {
        src: "https://halo-cool-93973682.figma.site/",
        title: "Dotlet — the live vector tool",
        // 16:10 rather than 16:9: the tool is one screen with a fixed right
        // sidebar, and at 16:9 the canvas between the header and the palette
        // gets squeezed to a strip.
        ratio: "aspect-[16/10]",
        caption:
          "The real tool, running here. Place dots on the grid and they merge as you go — or open it full screen, which is the better window for drawing anything you want to keep.",
      },
      videos: [
        {
          src: "/videos/dotlet.mp4",
          width: 1350,
          height: 872,
          // TODO: confirm this describes what the clip actually shows — it is
          // both the caption under the video and the player's accessible name.
          alt: "Dotlet in use: dots placed on the grid merge into a single smooth shape.",
        },
      ],
    },
    {
      heading: "The Problem",
      body: [
        "Most vector tools were built for people who already know how to design. Bezier curves, anchor points, node editing — weeks of skill before you can make something that looks intentional. That curve quietly keeps out people who aren't missing creativity, only the tool that meets them where they are.",
      ],
      bullets: [
        "Students building a first portfolio with no design background and no budget for a designer.",
        "Small business owners who need a simple mark but can't justify an agency for it.",
        "Community organisers who want a symbol for a cause, with no time and no training.",
        "Self-taught designers who have the visual sense but not yet a vector tool's interface.",
      ],
    },
    {
      heading: "Ideation and Concept Exploration",
      kicker: "Figma Agent",
      body: [
        "Before any spec was written, the Figma design agent was used to explore what this tool could feel like.",
      ],
      grid: [
        {
          title: "Layout testing",
          body: "Side panel vs floating controls were compared visually. The floating palette direction was chosen — the canvas stays clear, controls appear when needed.",
          video: {
            src: "/videos/dotlet-layout-testing.mp4",
            width: 842,
            height: 318,
            // TODO: written from the card's own text, not from watching the
            // file — this is the player's accessible name.
            alt: "Side panel and floating control layouts compared side by side.",
          },
        },
        {
          title: "Branding exploration",
          body: "Name, colour, and identity were explored with the Figma agent. The sticker-sheet theme — blue #4A7FD4 on soft sky — came from a reference image.",
          video: {
            src: "/videos/dotlet-colour-palette.mp4",
            width: 1600,
            height: 900,
            // TODO: written from the card's own text, not from watching the
            // file — this is the player's accessible name.
            alt: "The colour palette being pulled from a reference image.",
          },
        },
      ],
      note: {
        label: "Learning",
        body: "Doing this before locking a requirements document meant the FRD was grounded in layout decisions that had already been visually tested — not made in the abstract.",
      },
      // TODO: both captions are written from the section's own description of
      // this exploration, not from watching the files. Correct them if the
      // clips show something else — each is the caption AND the accessible
      // name for that player.
      videos: [
        {
          src: "/videos/dotlet-explore-1.mp4",
          width: 486,
          height: 500,
          alt: "Exploration one: the side-panel layout, with controls docked beside the canvas.",
        },
        {
          src: "/videos/dotlet-explore-2.mp4",
          width: 500,
          height: 526,
          alt: "Exploration two: the floating palette, which kept the canvas clear and won out.",
        },
      ],
    },
    {
      heading: "IA + Features",
      body: [
        "The whole tool is one screen: a fixed header, an infinite canvas, a draggable palette for the tools you reach for constantly, and a fixed right sidebar for everything you set once and adjust. Nothing is nested more than three levels deep, and there is no navigation to learn.",
      ],
      images: [
        {
          src: "/images/projects/dotlet/ia-1.webp",
          width: 1392,
          height: 1240,
          alt: "Information architecture, top half: DOTLET splits into a fixed header (logo, Icon/Font mode toggle, account menu with file list), the centre canvas (infinite pan and zoom, snap-to-grid nodes, grid overlay, artwork and background layers), and a draggable floating palette (pen, eraser, move and hand tools, undo/redo, clear, export, zoom level).",
          caption: "Header, canvas, and floating palette — the surfaces in constant use during drawing.",
        },
        {
          src: "/images/projects/dotlet/ia-2.webp",
          width: 1228,
          height: 1238,
          alt: "Information architecture, bottom half: the fixed right sidebar holds Image to Shape, Layers (artwork and background visibility, add layer), Shapes (8 dot types), Effects (smoothness, sharpness, roughness, shadow opacity, outline mode), Colour (dot, background, recent swatches), Grid (size presets, show toggle), and Export (SVG, copy SVG for Figma, PNG at 3x, copy PNG).",
          caption: "The right sidebar — settings and export, grouped by how often each one is touched.",
        },
      ],
    },
    {
      heading: "Core Flows",
      body: [],
      flows: [
        {
          title: "Shapes & colour",
          body: "Shape and colour get chosen once and then left alone, which is why they sit in the sidebar rather than over the canvas. Recent colours are kept because most people are making a set, not a single icon, and the second one has to match the first.",
          video: {
            src: "/videos/dotlet-shapes-colour.mp4",
            width: 304,
            height: 352,
            // TODO: written from the IA tree, not from watching the file.
            alt: "The shape grid and colour controls being used in the sidebar.",
          },
        },
        {
          title: "Pen, eraser & move",
          body: "Dots that land close enough join on their own. That is the whole trick — you decide where the marks go, and the joining is handled for you. Nothing here asks anyone to control a curve, which is the skill that keeps people out of vector tools in the first place.",
          video: {
            src: "/videos/dotlet-pen-merge.mp4",
            width: 554,
            height: 506,
            // TODO: written from the tools list and the geometry note in
            // "What Broke", not from watching the file.
            alt: "The pen tool placing dots on the grid, which merge into a single shape.",
          },
        },
        {
          title: "Effects",
          body: "Every one of these changes the finished look without touching the dots underneath, so anything can be tried and taken back. That mattered more than adding options: someone who is not sure they can undo a change will not risk making one.",
          video: {
            src: "/videos/dotlet-effects.mp4",
            width: 1322,
            height: 808,
            // TODO: written from the effects list in the IA, not from watching
            // the file — the source is named "Effects for text and font".
            alt: "The effects sliders being adjusted, changing a shape from soft to crisp.",
          },
        },
        {
          title: "Image to shape",
          body: "Starting from a picture is easier than starting from nothing, and a blank canvas is where most people give up. What comes back is dots rather than the picture itself, so it stays yours to change — and the original never ends up buried in the file.",
          video: {
            src: "/videos/dotlet-image-to-shape.mp4",
            width: 410,
            height: 484,
            // TODO: written from the "Image to Shape → Upload image" branch of
            // the IA, not from watching the file.
            alt: "An uploaded image being turned into dots on the Dotlet grid.",
          },
        },
        {
          title: "Tour guide",
          body: "Shown once, skippable, and before any sign-up is asked for. Anyone made to create an account before they understand what a tool is for usually never finds out, so the walkthrough comes first and the first thing anyone does is draw.",
          video: {
            src: "/videos/dotlet-tour-guide.mp4",
            width: 1894,
            height: 876,
            // TODO: written from your note that this is the onboarding tour,
            // not from watching the file.
            alt: "The first-run walkthrough pointing out the canvas and tools.",
          },
        },
      ],
    },
    {
      heading: "Made in Dotlet",
      body: [
        "Everything below was drawn in the tool itself, with no other software involved at any point. They are here because a feature list only describes what a tool can do, and the marks are what it actually does.",
        "None of them needed a curve to be adjusted by hand. The dots decide where the edges fall, so the person drawing is choosing placement rather than steering geometry — which is the whole reason someone with no vector training can finish one of these at all.",
      ],
      videos: [
        {
          src: "/videos/dotlet-make-muffi.mp4",
          width: 1892,
          height: 870,
          // TODO: written from the frames, not from watching the file end to end.
          alt: "A MUFFI wordmark drawn from an empty canvas, letter by letter.",
        },
        {
          src: "/videos/dotlet-make-mark.mp4",
          width: 1892,
          height: 866,
          // TODO: written from the frames, not from watching the file end to end.
          alt: "An abstract monogram taking shape, with the effect sliders adjusted as it goes.",
        },
        {
          src: "/videos/dotlet-marks.mp4",
          width: 1896,
          height: 876,
          // TODO: written from the frames, not from watching the file end to end.
          alt: "Several finished marks opened one after another in the editor.",
        },
        {
          src: "/videos/dotlet-mail-club.mp4",
          width: 870,
          height: 590,
          // TODO: written from the frames, not from watching the file end to end.
          alt: "Close on the canvas as the MAIL CLUB mark is drawn, with the dot grid visible underneath.",
        },
      ],
    },
    {
      heading: "What people created with Dotlet",
      body: [
        "Four identities, each one a wordmark drawn on the grid and then put straight onto packaging, posters and social. Ideation to execution ran 50% faster than the same work done conventionally.",
      ],
      pins: [
        {
          src: "/images/projects/dotlet/gallery/club-martini.webp",
          width: 800,
          height: 800,
          alt: "The Club wordmark in mustard over a photograph of a hand holding a martini against green velvet.",
        },
        {
          src: "/images/projects/dotlet/gallery/club-lockup-v2.webp",
          width: 800,
          height: 800,
          alt: "The Club wordmark in mustard on olive green, with the line 'for the social butterflies' beneath it.",
        },
        {
          src: "/images/projects/dotlet/gallery/sour-pickle-jar.webp",
          width: 800,
          height: 800,
          alt: "The Sour Pickle wordmark in pink over a photograph of gherkins stacked above an open jar.",
        },
        {
          src: "/images/projects/dotlet/gallery/sour-pickle-lockup-v2.webp",
          width: 800,
          height: 800,
          alt: "The Sour Pickle wordmark in pink on dark green.",
        },
        {
          src: "/images/projects/dotlet/gallery/muffi-oven.webp",
          width: 800,
          height: 800,
          alt: "The Muffi wordmark in white over a photograph of cookies on a tray in an oven.",
        },
        {
          src: "/images/projects/dotlet/gallery/muffi-lockup-v2.webp",
          width: 800,
          height: 800,
          alt: "The Muffi wordmark in white on deep brown, with the line 'baked with love & love'.",
        },
      ],
      imagesBare: true,
      images: [
        {
          src: "/images/projects/dotlet/gallery/mail-club-street.webp",
          width: 800,
          height: 800,
          alt: "The Mail Club wordmark in yellow over a photograph of a brownstone street, with the line 'a small club for big feelings'.",
        },
        {
          src: "/images/projects/dotlet/gallery/mail-club-boxes.webp",
          width: 800,
          height: 800,
          alt: "'You've got a MAIL' in yellow over a photograph of a New York street corner, with the mailboxes outlined in the same yellow.",
        },
      ],
    },
    {
      heading: "How It Did It",
      body: [
        "Writing a full Functional Requirements Document before opening Figma Make was the single decision that made everything else go more smoothly.",
      ],
      blocks: [
        {
          title: "Why the FRD mattered",
          body: [
            "Most AI-assisted builds start with a vague prompt and iterate until something looks right. The FRD forced the opposite: define what the tool is, what it does, how it behaves, and what it will never do — before writing any code. Every Figma Make prompt that followed was specific because the spec was specific. The tool built what was actually meant, not what was accidentally implied.",
          ],
        },
        {
          title: "What changed",
          body: [
            "The scope was widened deliberately: from “icon tool” to “icons, logos, custom shapes, symbols, and decorative marks — anything that would otherwise require a path editor.” The grid expanded from 3 presets to 5. The shape palette doubled from 4 types to 8. The entire vocabulary was replaced so that every term in the spec, the UI labels, and the code matched — no ambiguity between what the FRD said and what Figma Make built.",
          ],
        },
        {
          title: "The out-of-scope list as product reasoning",
          body: [
            "Most specs list what to build. This one also listed what not to build — and crucially, why. Every exclusion was written with a reason tied to the product's core premise. That reasoning became the test for every new feature idea that came up during the build.",
          ],
          exclusions: [
            {
              title: "Freeform path / bezier editing",
              body: "Reintroduces the exact precision barrier the product exists to remove. If users need a pen tool, they already have a pen tool.",
            },
            {
              title: "AI-generated shape input",
              body: "Conflicts with a hands-on, skill-free creation model. The tool should respond to what the user places, not generate for them.",
            },
            {
              title: "Raster image import",
              body: "Outside the defined vector-first workflow. Dotlet creates from scratch — it doesn't convert or embed.",
            },
            {
              title: "Animation / motion export",
              body: "Dotlet is a static vector tool. Motion would require a second rendering pipeline with no connection to the gooey filter engine.",
            },
          ],
        },
      ],
      note: {
        label: "Governing principle",
        body: "the product must not reintroduce a technical skill requirement at any stage of the workflow. This rule was written in the FRD before any code was written. It was used again when the Font Builder was evaluated — and it's why the Font Builder was eventually cut.",
      },
    },
    {
      heading: "Tech stack — what was actually used and why",
      body: [],
      blocks: [
        {
          body: [],
          stack: [
            {
              name: "Figma Make",
              color: "#F24E1E",
              logo: "/images/tech/figma.svg",
              body: "The entire app was built inside Figma Make — not scaffolded locally then imported. Every feature shipped as a structured, isolated prompt, from first line to final export.",
            },
            {
              name: "Figma Agent",
              color: "#A259FF",
              logo: "/images/tech/figma.svg",
              body: "Ran alongside Make for ideation — layout variations, design decisions, exploratory directions — without spending Make credits on non-code questions.",
            },
            {
              name: "React + TypeScript",
              color: "#3178C6",
              logo: "/images/tech/typescript.svg",
              body: "The default Make project base. Strict typing earned its place across the dot data model, cluster IDs, tool types, and history stack — it caught real bugs in the per-dot colour override added midway.",
            },
            {
              name: "Vite + Tailwind CSS",
              color: "#646CFF",
              logo: "/images/tech/vite.svg",
              body: "Vite's HMR made iterative canvas work practical: dot geometry, filter values, and export logic reflected instantly. Tailwind handled all UI layout and palette styling.",
            },
            {
              name: "Web Audio API — custom sound engine",
              color: "#E8A33D",
              glyph: "audio",
              body: "No sound library — every sound is hand-built synthesis. Draw is pink noise through a bandpass tuned to graphite on paper; erase, a short sine squeak; save, a C5–E5–G5 arpeggio with a long decay. Mute persists via localStorage.",
            },
            {
              name: "SVG filters + Canvas API",
              color: "#5B7C99",
              glyph: "vector",
              body: "The gooey engine is pure SVG — feGaussianBlur and feColorMatrix applied live, with no canvas rasterisation while drawing. Canvas is used only at export, to rasterise into a high-resolution PNG.",
            },
          ],
        },
      ],
    },
    {
      heading: "Building It",
      body: [
        "Every feature was a scoped, isolated prompt rather than one large request. The first canvas was a fixed 1000×1000 viewBox; it worked but felt bounded, so it was rewritten around a fixed logical cell with infinite pan and zoom, zoom-toward-cursor, and no bounds check at all.",
        "The detail I'd defend hardest is the sound. Every effect is synthesised from scratch with the Web Audio API — the draw sound is pink noise through a bandpass filter, sitting where graphite on paper sits; the eraser is a short sine squeak; saving is a three-note arpeggio with a long decay. It was too loud on the first pass, and the mute preference persists between visits.",
      ],
    },
    {
      heading: "What Broke",
      body: [
        "The export pipeline was the most error-prone part of the build, and every failure was the same failure wearing a different mask: code that worked in the live canvas making different assumptions once it ran in the export context.",
        "Exports came out empty because dimensions were locked to a fixed square while the canvas panned infinitely. The output canvas sized itself to 0×0 because SVG blob URLs report a naturalWidth of zero. The gooey effect appeared in PNG but vanished in SVG because browsers default standalone files to linearRGB, so the colour matrix fired at the wrong level.",
      ],
      bullets: [
        "The fix was structural, not incremental: stop duplicating logic and make export reuse the same source of truth as the canvas — one spread calculation, one crispness calculation, called from both paths.",
        "An earlier bug was pure geometry. Shapes showed gaps at adjacent nodes because the dot radius was 0.36× the cell size, leaving a 28% gap. The filter was blurring empty space — there was nothing to merge.",
      ],
    },
    {
      heading: "Built, Then Removed",
      body: [
        "A Font Builder — marching-squares tracing into editable bezier paths, exporting a working .ttf — worked in principle but never reached a working state in the time available. Shipping it would have been dishonest about what Dotlet does, so it came out of the app and the documentation, and stayed only as a documented future direction.",
        "An account system with Supabase went the same way, but for a better reason than the configuration problems that surfaced mid-build: requiring a login worked against the premise that anyone can open Dotlet and start creating with nothing in the way.",
      ],
    },
    {
      heading: "Reflection",
      body: [
        "Every stage that went well shared one property — the intent was made specific before the AI was asked to act on it. Every stage that went badly shared the opposite: something left vague, or something that worked in one context and was copied rather than shared into another.",
        "Both cut features reflect the same instinct that shaped the product. Dotlet does one thing: it lets anyone make a vector graphic without knowing what a bezier curve is. That part works, and it was worth more than the two features that would have diluted it.",
      ],
    },
  ],
};
