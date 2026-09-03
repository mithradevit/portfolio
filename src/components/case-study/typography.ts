/**
 * The case study's type system. Every heading and every run of prose on a case
 * study uses one of these constants — nothing sets its own size inline.
 *
 * Measured before writing it: a case study was carrying thirteen distinct type
 * appearances across ~120 elements, seven of them different header treatments.
 * Two headers of the same rank looked different from each other, and headers of
 * different rank looked the same, so the hierarchy communicated nothing.
 *
 * Three voices:
 *   - HEADING — mono, uppercase. Every header, at both levels. The level is
 *     carried by weight and ink, not by size or family, so a section name and a
 *     card title read as the same kind of object at different strengths.
 *   - BODY / CAPTION — sans, two sizes, for everything that is read as prose.
 *   - LEAD / INSIGHT — the serif, used twice per section at most. Its scarcity
 *     is what makes it register as emphasis.
 *
 * `!` on every property: the bare-tag rules in globals.css for
 * `h1 h2 h3 h4 p li a` are unlayered, so they beat plain Tailwind utilities.
 * A size written without `!` is silently ignored and renders at 15px — the
 * single most common bug in this component tree.
 */

/**
 * The site's own label appearance, taken from the bare `h4` rule in globals.css
 * — mono, uppercase, 400, 15px — which is what the eyebrow above the title
 * already wears. Headers match it rather than inventing sizes beside it, so a
 * header and a label read as the same object at different strengths. No added
 * letter-spacing: the native rule has none, and adding it here would make a
 * header visibly *not* the site's label.
 */
const MONO = "font-mono! text-[15px]! leading-[1.4]! uppercase!";

/** Section names — the top-level header opening each section. Full ink and a
 *  little more weight is the whole difference from a plain label. */
export const SECTION_HEADING = `text-foreground! ${MONO} font-medium!`;

/** Headers inside a section: card titles, column titles, step titles. The
 *  site's label exactly — muted and regular weight, one rank down. */
export const CONTENT_HEADING = `text-foreground-light! ${MONO} font-normal!`;

/** Prose. One size for body copy everywhere on a case study. */
export const BODY = "text-foreground-light! text-[15px]! leading-[1.65]!";

/** Captions, deliverable lists, and secondary detail under a header. */
export const CAPTION = "text-foreground-light! text-[13px]! leading-[1.55]!";

/** The display sentence that can open a section. Serif, once per section. */
export const LEAD = "text-foreground! font-serif! text-[28px]! leading-[1.25]! font-normal!";

/** The conclusion a section draws, behind an accent rule. Serif italic. */
export const INSIGHT = "text-foreground! font-serif! text-[19px]! leading-[1.45]! italic";
