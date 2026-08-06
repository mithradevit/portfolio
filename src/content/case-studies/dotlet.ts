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
        "I built it solo in 10 days for Config Makeathon 2026, entirely inside Figma Make, and later used it as the live case study for a Friends of Figma workshop on AI-native design workflows.",
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
      heading: "The Solution",
      body: [
        "Dots on a grid, merged automatically. Place two overlapping marks and they flow into one continuous form; pull them apart and the form separates. The skill the tool asks for is placement, which everyone already has.",
        "The gooey filter engine is the whole product: an SVG feGaussianBlur and feColorMatrix pipeline running live in the browser, turning separate dots into one organic shape as you draw, with no rasterisation until export.",
      ],
    },
    {
      heading: "Exploring the Interaction",
      body: [
        "Before any spec was written, I used the Figma design agent to explore what the tool should feel like — comparing a side panel against floating controls, and testing name, colour, and identity directions ahead of any code.",
        "The floating palette won: the canvas stays clear and controls surface when needed. Doing this first meant the requirements document was grounded in layouts already tested visually, rather than decisions made in the abstract.",
      ],
    },
    {
      heading: "Specification Before Code",
      body: [
        "Most AI-assisted builds open with a vague prompt and iterate until something looks right. I did the opposite — a full functional requirements document before touching Figma Make, defining what the tool is, how it behaves, and what it will never do.",
        "Scope widened deliberately along the way, from an icon tool to anything that would otherwise need a path editor. The vocabulary was rewritten so every term in the spec, the UI labels, and the code matched — no gap between what the document said and what Make built.",
      ],
      bullets: [
        "Governing principle, written before any code: the product must not reintroduce a technical skill requirement at any stage.",
        "Prompts were rewritten from descriptions to exact values — corner-radius ratios, curve formulas, namespace declarations — which measurably cut the correction rounds per feature.",
      ],
    },
    {
      heading: "Design Decisions",
      body: [
        "The out-of-scope list carried the reasoning, not just the exclusions, and that reasoning became the test every later feature idea had to pass.",
      ],
      bullets: [
        "No freeform bezier editing — it reintroduces the exact barrier the product exists to remove. If someone needs a pen tool, they already have one.",
        "No AI-generated shapes — the tool should respond to what you place, not generate for you. Skill-free is not the same as hands-off.",
        "No raster import — Dotlet creates from scratch rather than converting.",
        "No motion export — it would need a second rendering pipeline with no connection to the gooey engine.",
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
