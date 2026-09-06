import Image from "next/image";
import type { CaseStudySection } from "@/content/case-studies/types";
import { CaseStudyImageZoom } from "./CaseStudyImageZoom";
import { CONTENT_HEADING } from "./typography";
import { StepVideo } from "./StepVideo";

type Step = NonNullable<CaseStudySection["steps"]>[number];

/**
 * The parts of a solution, numbered, with the artefact beside each one.
 *
 * Image left, prose right, alternating nothing — every row reads the same way,
 * because the point is comparison between parts, not variety. On a phone the
 * image sits above its text.
 *
 * A row with no image runs full width instead. The left column used to hold a
 * marked placeholder, on the reasoning that a visible gap is honest about work
 * still to come — but these steps now sit inside the Mobile and Web sections,
 * directly under runs of real screens, and a dashed empty box beneath actual
 * product shots reads as something failing to load rather than as a note to
 * self. The prose stands on its own until a file arrives.
 */
export function CaseStudySteps({ steps, matted }: { steps: Step[]; matted?: boolean }) {
  return (
    <ol className="flex list-none flex-col gap-10">
      {steps.map((step, i) => {
        const media = step.video ? (
          <StepVideo video={step.video} className={matted ? "max-w-[260px]" : undefined} />
        ) : step.image ? (
          <CaseStudyImageZoom image={step.image} className={matted ? "max-w-[260px]" : undefined} />
        ) : null;

        const notes = (
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2.5">
              <span className="text-foreground-light/50 font-mono text-[11px] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className={CONTENT_HEADING}>{step.title}</h4>
            </div>

            {step.body && (
              <p className="text-foreground-light text-[13.5px]! leading-[1.6]!">{step.body}</p>
            )}

            <ul className="border-foreground/10 flex list-none flex-col border-t">
              {step.bullets.map((bullet) => (
                <li key={bullet.title} className="border-foreground/10 border-b py-3">
                  <span className="text-foreground block text-[13.5px]! leading-[1.4]! font-medium">
                    {bullet.title}
                  </span>
                  <span className="text-foreground-light mt-1 block text-[13.5px]! leading-[1.55]!">
                    {bullet.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

        return (
          <li key={step.title}>
            {matted ? (
              // One grey mat holding both halves — the artefact and the notes
              // that explain it read as one exhibit rather than an image with
              // a caption floating beside it. The image is capped narrow
              // (these are phone-shaped captures) so it doesn't fight the
              // notes column for width the way a full-bleed screenshot would.
              // Single column when there is no artefact yet: a two-track grid
              // with one empty track leaves the notes stranded in a narrow
              // column beside nothing.
              <div
                className={`bg-foreground/[0.045] grid grid-cols-1 items-start gap-6 rounded-[14px] p-4 sm:gap-8 sm:p-6 ${
                  media ? "sm:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]" : ""
                }`}
              >
                {media}
                {notes}
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 items-start gap-6 lg:gap-10 ${
                  media ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]" : ""
                }`}
              >
                {media}
                {notes}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Kept alongside the zoomable path so a supplied image can opt out of the
 *  modal later without a second component. */
export function StepImage({ image }: { image: NonNullable<Step["image"]> }) {
  return (
    <div className="border-foreground/10 w-full overflow-hidden border">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={90}
        sizes="(min-width: 1024px) 400px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
