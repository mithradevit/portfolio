import type { CaseStudySection } from "@/content/case-studies/types";
import { CONTENT_HEADING } from "./typography";

type Stage = NonNullable<CaseStudySection["process"]>[number];

/**
 * The process as six notes on one grouped surface.
 *
 * A two-column ruled table said what each phase produced but flattened the work
 * into rows of a spreadsheet. Notes on a board is what the work actually looked
 * like — and it lets a stage carry its name, what happens in it, and what came
 * out of it without three type treatments fighting inside a cell.
 *
 * Set in the site's own tokens rather than Apple Notes yellow, and then in
 * neutrals rather than the accent: paper stock was a fifth colour on a page
 * that runs on one accent, and an accent wash across six tiles made a reference
 * block louder than the prose it summarises. Grey cards on a grey ground carry
 * the grouping; the ink does the rest. Tokens, not hex, so it follows the theme.
 *
 * Three across: six notes in this measure would give each about 130px, which
 * turns every line into two words.
 */
export function CaseStudyProcessMap({ stages, label }: { stages: Stage[]; label?: string }) {
  return (
    <figure className="border-foreground/10 bg-foreground/[0.02] flex w-full flex-col gap-3 overflow-hidden border p-3 sm:p-4">
      {label && (
        <figcaption className="text-foreground-light/60 font-mono text-[9.5px] tracking-[0.14em] uppercase">
          {label}
        </figcaption>
      )}

      <ol className="grid list-none grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <li
            key={stage.title}
            // Square, grey, and hairline-separated rather than six floating
            // cards: at this size the radius and drop shadow were most of what
            // the eye had to get past to reach three short lines of text.
            className="border-foreground/10 bg-background flex flex-col gap-1.5 border p-3"
          >
            {/* The stage name in the site's label voice — mono, uppercase,
                letterspaced — so the note reads as a header over its contents
                rather than as a sentence with a bold first line. */}
            <h4 className={CONTENT_HEADING}>
              {stage.title}
            </h4>

            <p className="text-foreground-light text-[12.5px] leading-[1.45]!">{stage.body}</p>

            {/* No bullet glyphs: three short lines under a rule are already a
                list, and a marker in front of each was punctuation doing a job
                the line breaks had done. */}
            {stage.deliverables.length > 0 && (
              <ul className="border-foreground/10 mt-auto flex list-none flex-col gap-0.5 border-t pt-2">
                {stage.deliverables.map((item) => (
                  <li
                    key={item}
                    // `!` on the size: the bare `li` rule in globals.css is
                    // unlayered and was pinning these at 15px — the same size
                    // as the description they sit under, which is why the
                    // deliverables never read as a subordinate list.
                    className="text-foreground-light/70 font-mono text-[10.5px]! leading-[1.5]! tracking-[0.02em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
