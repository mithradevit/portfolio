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
  | "artefacts";

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
  mockup?: CaseStudyMockup;
  mockupCaption?: string;
  diagram?: CaseStudyDiagram;
  diagramCaption?: string;
  /** A real image (sketch, photo, exported artefact) rendered above the diagram/mockup. */
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  /** Several stills, stacked full width in order. Use for diagrams that were
   *  captured in parts and read top to bottom. */
  images?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  /** Renders `images` edge-to-edge with no matting, border, or corner radius —
   *  for photographs that are already the finished artefact, as opposed to a
   *  screenshot that needs a frame to read as UI. */
  imagesBare?: boolean;
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
  /** Numbered callouts rendered beside the mockup — the design decision and the
   *  micro-interaction behind each part of the screen. */
  annotations?: { title: string; body: string }[];
  /** Big numbers rendered as a stat-tile row, e.g. research volume or an outcome metric. */
  stats?: { value: string; label: string }[];
  /** A numbered/titled card grid — used for authored, ordered sets like design principles. */
  /** Numbered cards. Each may carry its own clip, shown inside the card. */
  grid?: {
    title: string;
    body: string;
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

export type CaseStudy = {
  slug: string; // must match a slug in content/projects.ts
  role: string;
  timeline: string;
  team: string;
  skills: string[];
  sections: CaseStudySection[];
  /** Live product, full write-up, repo — rendered as buttons under the header. */
  links?: { label: string; href: string }[];
  /** Confidentiality notice shown directly under the header, before the first section. */
  nda?: string;
};
