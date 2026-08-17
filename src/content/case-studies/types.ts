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
  | "evaluation-matrix";

export type CaseStudySection = {
  heading: string;
  /** Small mono label under the heading — names the tool or method used. */
  kicker?: string;
  body: string[];
  /** A closing takeaway, rendered as a ruled callout after everything else. */
  note?: { label: string; body: string };
  /** Core flows: a written point with the clip that shows it, side by side. */
  flows?: {
    title: string;
    body: string;
    video: { src: string; width: number; height: number; alt: string };
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
  /** Before → after outcomes, ticked. `label` is the measure, `body` the change. */
  measures?: { label: string; body: string }[];
  imagesBare?: boolean;
  /** Columns for `images` at desktop width. Defaults to 2. Use 4 for a strip
   *  meant to be read as a run rather than page by page. */
  imagesCols?: 2 | 3 | 4;
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
  };
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
  sections: CaseStudySection[];
  /** Live product, full write-up, repo — rendered as buttons under the header. */
  links?: { label: string; href: string }[];
  /** Confidentiality notice shown directly under the header, before the first section. */
  nda?: string;
};
