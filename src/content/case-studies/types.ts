/** A named, pre-built UI recreation rendered under a section — see
 *  components/case-study/EvidenceMockups.tsx for the implementations. */
export type CaseStudyMockup =
  | "sessions"
  | "session-tabs"
  | "transcript"
  | "editor"
  | "audit"
  | "case-file"
  | "live"
  | "devices"
  | "usage";

/** A named system/flow/IA diagram — same file, rendered instead of a screen recreation. */
export type CaseStudyDiagram =
  | "ecosystem"
  | "ia"
  | "data-model"
  | "flow"
  | "user-flows"
  | "artefacts"
  /* Clinical trial matching — see components/case-study/TrialDiagrams.tsx.
     Diagrams rather than screen recreations: there are no shipped screens to
     rebuild from, and inventing UI would assert an appearance the product may
     never have had. These describe the reasoning, which is documented. */
  | "trial-chain"
  | "matching-modes"
  | "design-constraints"
  | "eligibility-loop"
  | "criteria-logic"
  | "evaluation-matrix"
  /* Pet collar — see components/case-study/CollarDiagrams.tsx. */
  | "collar-architecture";

export type CaseStudySection = {
  heading: string;
  /**
   * Short one-line stand-in for `heading` in the side rail only — the article
   * itself always shows the full heading. Falls back to `heading` when unset,
   * so it's only worth adding once a heading is long enough that the rail
   * needs to wrap it.
   */
  navLabel?: string;
  /** Small mono label under the heading — names the tool or method used. */
  kicker?: string;
  body: string[];
  /** A closing takeaway, rendered as a ruled callout after everything else. */
  note?: { label: string; body: string };
  /** Core flows: a written point with the clip that shows it, side by side. */
  flows?: {
    title: string;
    body: string;
    /**
     * The clip. An `.mp4` plays as a muted looping `<video>`; a `.gif` renders
     * as an `<img>`, since a GIF can't go in a video element.
     *
     * `poster` is the still shown *instead of* a GIF under reduced motion —
     * that format has no pause, so the only way to honour the preference is to
     * serve a different file. Unused for video, which can simply be paused.
     */
    video: { src: string; width: number; height: number; alt: string; poster?: string };
  }[];
  /**
   * Full-width stacked cards, for material too long for the two-up `grid`.
   * `exclusions` renders inside a card as a marked list of things ruled out,
   * each with the reason it was ruled out.
   */
  blocks?: {
    /** Omit when the section heading already names the card. */
    title?: string;
    body: string[];
    exclusions?: { title: string; body: string }[];
    /**
     * A tools grid. `logo` points at a monochrome SVG in /public/images/tech/,
     * tinted with `color` through a CSS mask so one file serves both themes.
     * `glyph` is the fallback for anything with no brand mark of its own.
     */
    stack?: {
      name: string;
      body: string;
      color: string;
      logo?: string;
      glyph?: "audio" | "vector";
    }[];
  }[];
  bullets?: string[];
  /**
   * The same material as `bullets`, but each point split into the claim and
   * the evidence for it, and rendered as rows that open individually. Use when
   * the points are long enough that a plain bulleted list becomes a wall — the
   * titles alone then read as a summary.
   *
   * Not the same as `accordion`, which hides one whole list behind a single
   * label. This gives every point its own row.
   */
  findings?: { title: string; body: string }[];
  /**
   * Small uppercase label above the findings list — names what the rows are.
   * Without it a set of collapsed rows arrives unannounced, which is fine when
   * the section heading already says what they are and confusing when it
   * doesn't (a severity scale sitting under a heading about method, say).
   */
  findingsLabel?: string;
  /** Every finding row starts collapsed; the reader opens what they want. */
  findingsStartClosed?: boolean;
  mockup?: CaseStudyMockup;
  mockupCaption?: string;
  diagram?: CaseStudyDiagram;
  diagramCaption?: string;
  /**
   * A photograph set beside the section's prose rather than under it — text on
   * the left, image on the right, stacking on a phone. For a photograph of the
   * setting the product runs in, where the picture is context for the words
   * rather than an artefact the words explain.
   */
  /**
   * Opening spread: one large sentence plus the facts of the engagement,
   * side by side. For the section that introduces the work — it answers
   * "what was this" and "what was my part in it" before the prose starts.
   *
   * `lead` is set in the display serif. Wrap a phrase in `**double asterisks**`
   * to mark it; the marked run gets an accent rule under it, so the sentence
   * has one thing the eye lands on. Only the lead supports the marker — body
   * paragraphs are plain text on purpose.
   *
   * When `intro` is present the section's `body` paragraphs render underneath
   * the lead in the same column, so a section keeps one list of prose.
   */
  intro?: {
    /**
     * Optional. Without it the section opens straight on its `columns` — for a
     * block like Pain Points, where the points themselves are the statement and
     * a display sentence above them would only introduce a list that already
     * introduces itself.
     */
    lead?: string;
    /**
     * A single line pulled out between the columns and the closing paragraph —
     * the thing the points add up to. Set in the display serif, italic, behind
     * an accent rule, so it reads as the conclusion rather than another point.
     */
    insight?: string;
    /**
     * An illustration set between the columns and the `insight` — the picture
     * of the problem the points have just described, placed before the line
     * that draws the conclusion from it.
     */
    image?: { src: string; alt: string; width: number; height: number };
    /** Optional. Omit and the lead takes the full measure — no empty track. */
    facts?: { label: string; value: string }[];
    /**
     * Three (or two) strands of the work, side by side under the lead. Plain
     * columns, not cards — they continue the opening statement rather than
     * standing apart from it. Keep bodies to a sentence or two.
     */
    columns?: { title: string; body: string }[];
  };
  bodyAside?: { src: string; alt: string; width: number; height: number };
  /**
   * Lets `bodyAside` stand beside the prose *and* the section's `grid`, with the
   * grid becoming one ruled list in the left column. Use when the prose alone is
   * too short to hold up its half of the row — a lone sentence against a tall
   * photograph reads as an accident rather than a pairing.
   */
  bodyAsideSpan?: boolean;
  /** Puts `image` at the top of the section, above the prose and any cards —
   *  for a photograph or screen that sets the scene the section then explains. */
  imageLead?: boolean;
  /**
   * Sets `image` beside the prose as a two-column row instead of under it.
   *
   * For an artefact the words are about rather than an exhibit they lead up to.
   * Unlike `bodyAside` this uses the section's own `image`, so the caption
   * survives. Stacks on a phone.
   */
  imageAside?: boolean;
  /** Drops the white mat around `image`. Photographs are already their own
   *  edge; the mat exists for ink-on-paper and light-mode screens. */
  imageBare?: boolean;
  /** A real image (sketch, photo, exported artefact) rendered above the diagram/mockup. */
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  /** Several stills, stacked full width in order. Use for diagrams that were
   *  captured in parts and read top to bottom. */
  images?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  /** Renders `images` edge-to-edge with no matting, border, or corner radius —
   *  for photographs that are already the finished artefact, as opposed to a
   *  screenshot that needs a frame to read as UI. */
  /** A collapsed list, opened on demand — for evidence long enough to bury
   *  what follows it. */
  accordion?: { label: string; bullets: string[] };
  /** Users quoted in their own words, rotated one at a time. */
  voices?: CaseStudyVoice[];
  /**
   * Show every voice at once — role on the left, quote on the right — instead
   * of rotating through them one at a time. For a section where the quotes
   * themselves are the finding and have to be read against each other, rather
   * than one where the personas are the point.
   */
  voicesStacked?: boolean;
  /** Before → after outcomes, ticked. `label` is the measure, `body` the change. */
  measures?: { label: string; body: string }[];
  imagesBare?: boolean;
  /**
   * Lays `images` out as a horizontal rail of 300px cards instead of a grid.
   *
   * For a run of pages from one working session, where the set is the point and
   * no single page has to be read in place. Each card opens full size on click,
   * since at that width a scan is a thumbnail.
   */
  imagesScroll?: boolean;
  /**
   * Fixes the rail's card height in pixels and lets each card take its own
   * width from the image's aspect. For a run of wide plates that have to be
   * compared at a consistent scale rather than fitted to a common column.
   */
  imagesRailHeight?: number;
  /** Columns for `images` at desktop width. Defaults to 2. Use 4 for a strip
   *  meant to be read as a run rather than page by page, and 1 for scans
   *  carrying handwriting, where half a column is too narrow to read. */
  imagesCols?: 1 | 2 | 3 | 4;
  /** Sets the image set on the same iOS grouped surface the diagrams use, so a
   *  set of artefacts reads as one exhibit rather than loose pictures. */
  imagesSurface?: boolean;
  /** Small uppercase label on that surface. Only used with `imagesSurface`. */
  imagesLabel?: string;
  /** Fraction of the column the image set may occupy, e.g. 0.7 for 70%. Use
   *  when tall artefacts would otherwise outweigh the prose around them. */
  imagesScale?: number;
  /**
   * Silent looping videos, rendered under this section's prose. One entry runs
   * full width; two or more sit side by side, stacking on a phone.
   *
   * `span: "full"` takes both columns, so a set can mix full-width clips with
   * paired ones instead of forcing everything into equal halves.
   *
   * `width`/`height` are each video's intrinsic pixels — they reserve the right
   * aspect box so the page doesn't jump when the file loads. Give a `poster`
   * frame if there is one; without it the box is blank until the first frame
   * decodes.
   */
  videos?: {
    src: string;
    width: number;
    height: number;
    poster?: string;
    alt: string;
    span?: "full";
  }[];
  /**
   * The live product, running in the page.
   *
   * Only for something we control — this hands the reader a real interactive
   * app rather than a recording of one, so it has to be a URL that will still
   * be there and still be the same thing. `ratio` sets the box's aspect so the
   * page reserves the right height before the frame loads.
   */
  embed?: {
    src: string;
    /** The iframe's accessible name — announced in place of its contents. */
    title: string;
    ratio: string; // Tailwind aspect class, e.g. "aspect-[16/10]"
    caption?: string;
    /**
     * Load the frame with the page instead of behind a click. Only for a static
     * same-origin document we ship ourselves — the click gate exists to stop a
     * third-party app booting unasked and setting its cookies, and neither risk
     * applies to a file out of /public.
     */
    eager?: boolean;
    /** Replaces the host in the address pill. A `/public` path is a filename,
     *  not an address, and reads as one. */
    label?: string;
    /**
     * A still of the tool, shown inside the frame before it is launched.
     *
     * Without one the resting state is an empty panel with a play button on it,
     * which reads as a broken embed rather than as one waiting to be started.
     */
    poster?: string;
    /**
     * Render the frame at the column's own width instead of scaling a 1280px
     * viewport down into it.
     *
     * The scaling exists for a fixed-layout app that has to be seen whole. A
     * long responsive *document* is the opposite case: scaled to fit this
     * column its 14px body type lands at ~8px, which is not reading size. Fluid
     * lets the page use its own breakpoints at true size — narrower, but
     * legible, which is the point of showing it at all.
     */
    fluid?: boolean;
  };
  /**
   * The working process as a sequence of stages — what happens in each and what
   * comes out of it. Rendered as a map, so the order is visible; a two-column
   * list of artefacts says what exists but not what follows what.
   *
   * Keep `body` to one sentence and `deliverables` to three items: the stages
   * sit three across, and anything longer turns the row into a wall.
   */
  process?: {
    icon: "discover" | "define" | "architect" | "validate" | "systemise" | "handoff";
    title: string;
    body: string;
    deliverables: string[];
  }[];
  /** Small uppercase label above the process map. */
  processLabel?: string;
  /**
   * Numbered parts of a solution, each with its own artefact beside it.
   *
   * Image left, prose right. Until an `image` is supplied the left column holds
   * a marked placeholder rather than collapsing — the row keeps its shape, and
   * the gap is visible instead of silently absent.
   */
  steps?: {
    title: string;
    /** One line under the title, before the list. */
    body?: string;
    bullets: { title: string; body: string }[];
    image?: { src: string; alt: string; width: number; height: number };
  }[];
  /**
   * Sets the section's `embed` beside its prose as a two-column row.
   *
   * Only worth it for a frame that survives half the measure — a fixed-layout
   * app scaled into 440px is a thumbnail of an interface, not an interface.
   */
  embedAside?: boolean;
  /** Numbered callouts rendered beside the mockup — the design decision and the
   *  micro-interaction behind each part of the screen. */
  annotations?: { title: string; body: string }[];
  /** Big numbers rendered as a stat-tile row, e.g. research volume or an outcome metric. */
  stats?: { value: string; label: string }[];
  /** A numbered/titled card grid — used for authored, ordered sets like design principles. */
  /** Stacks `grid` as one card per row, full width, instead of a column track —
   *  for a set whose titles and bodies are too long to survive narrow columns. */
  gridRows?: boolean;
  /** Numbered cards. Each may carry its own clip, shown inside the card. */
  grid?: {
    title: string;
    body: string;
    /** A line icon for the card, drawn from the site's lucide set. Names map in
     *  CaseStudySection — keep them descriptive of the idea, not the glyph. */
    icon?: "records" | "protocol" | "criteria" | "imaging" | "status";
    video?: { src: string; width: number; height: number; poster?: string; alt: string };
  }[];
  /**
   * A masonry wall of finished work — laid out by column, so pins of different
   * heights stagger instead of aligning into rows. `brand` labels the pin.
   */
  pins?: { src: string; width: number; height: number; alt: string; brand?: string }[];
  /** A clearly-marked placeholder for content that needs real data/clearance before publishing. */
  slot?: { label: string; text: string };
};

/** One user, quoted in their own words. Rendered on a rotation, one at a time. */
export type CaseStudyVoice = {
  /** Who is speaking — the persona, not a real name. */
  name: string;
  /** What they do, and what breaks for them today. Shown on their card. */
  context?: string;
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
};

export type CaseStudy = {
  slug: string; // must match a slug in content/projects.ts
  /**
   * The paragraphs beside the title — what the engagement was, in the reader's
   * first ten seconds. Sits opposite the title rather than under it so the
   * opening spread answers "what is this" and "what did she do" at once.
   * Optional: without it the title takes the full measure as before.
   */
  summary?: string[];
  /**
   * Opts this case study alone into the grey-mat image treatment — a centred
   * photo essay presentation (mat, floating card, centred caption) instead of
   * the site's default full-bleed bordered card. Per-study rather than global:
   * every other case study is prose-first and the mat would just add empty
   * grey around images that are already the right width for their column.
   */
  mattedImages?: boolean;
  role: string;
  timeline: string;
  /** Where the work happened. Optional — the header drops the column when it
   *  is absent rather than leaving a labelled blank. */
  location?: string;
  /** What was actually shipped, in counts. Sits in the header rather than as a
   *  stat row inside a section — it is a fact about the engagement, like role
   *  and timeline, not a finding the prose has to earn. */
  scope?: string;
  team: string;
  skills: string[];
  /**
   * A still directly under the title, before the meta grid — the reference's
   * opening image. Use when there is no `hero` clip; if both are set the clip
   * runs and this is ignored, since two openers is one too many.
   */
  cover?: { src: string; alt: string; width: number; height: number };
  /** One looping clip directly under the title, before the meta grid — the
   *  thing itself, shown before it is described. Same shape as a section's
   *  `videos` entry, so a clip can be moved up here by cutting and pasting. */
  hero?: { src: string; width: number; height: number; poster?: string; alt: string };
  sections: CaseStudySection[];
  /** Live product, full write-up, repo — rendered as buttons under the header. */
  links?: { label: string; href: string }[];
  /** Confidentiality notice shown directly under the header, before the first section. */
  nda?: string;
};
