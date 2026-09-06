import Image from "next/image";
import type { FunProject } from "@/content/fun-projects";

/** The frame both variants share — soft radius, hairline and shadow, matching
 *  the ProfileWindow/FaqDetail chrome rather than a hard square border. */
function Media({ project, wide }: { project: FunProject; wide?: boolean }) {
  return (
    <div className="border-foreground/[0.08] bg-foreground/[0.03] relative aspect-[8/5] w-full overflow-hidden rounded-[14px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          quality={90}
          className="object-cover object-center"
          sizes={
            wide
              ? "(min-width: 640px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
        />
      ) : (
        <div className="bg-foreground/5 absolute inset-0" />
      )}
    </div>
  );
}

/**
 * @param wide Image beside the text rather than above it, for a card that has
 * the full measure to itself. A lone card in a three-column grid leaves two
 * empty tracks and reads as a missing item; given the width, the same content
 * lays out across it instead of sitting in a third of it.
 *
 * The wide variant is set editorially rather than as a stretched card: a
 * numbered plate caption under the image, a kicker naming the format, the
 * title at display size, and a rule separating the standfirst from it. Three
 * cards in a row are a list and are read by scanning; one card across the
 * measure is a spread, and a spread wants a reading order stated by type size
 * and small labels rather than by position alone.
 */
export function FunProjectCard({
  project,
  wide,
  index = 0,
}: {
  project: FunProject;
  wide?: boolean;
  index?: number;
}) {
  if (!wide) {
    return (
      <div className="flex flex-col gap-4">
        <Media project={project} />
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[17px]">{project.title}</h3>
          {/* Clamped so three cards in a row keep one height. */}
          <p className="text-foreground-light line-clamp-3 text-[15px] leading-[1.5]">
            {project.description}
          </p>
          <h4 className="text-foreground-light mt-1">{project.event}</h4>
        </div>
      </div>
    );
  }

  // `event` is authored as "Friends of Figma · Workshop" — venue and format in
  // one string. Split, the format becomes the kicker above the title and the
  // venue stays with the plate, which is where a caption belongs.
  const [venue, ...rest] = project.event.split("·").map((part) => part.trim());
  const format = rest.join(" · ");

  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-12">
      <figure className="flex flex-col gap-3">
        <Media project={project} wide />
        {/* Numbered plate caption: the figure number in accent, the venue
            beside it, both at label size. */}
        <figcaption className="text-foreground-light flex items-baseline gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase">
          <span className="text-primary tabular-nums">
            ({String(index + 1).padStart(2, "0")})
          </span>
          <span className="min-w-0">{venue}</span>
        </figcaption>
      </figure>

      <div className="flex flex-col gap-4 sm:pt-1">
        {format && (
          <span className="text-foreground-light font-mono text-[11px] tracking-[0.14em] uppercase">
            {format}
          </span>
        )}

        <h3 className="max-w-[28ch] text-[22px] leading-[1.25] tracking-[-0.02em] sm:text-[26px]">
          {project.title}
        </h3>

        {/* A rule, not a gap: it states where the heading stops and the
            standfirst begins, which a spread needs and a small card doesn't. */}
        <span className="bg-foreground/12 h-px w-full" />

        <p className="text-foreground-light max-w-[54ch] text-[15px] leading-[1.6]">
          {project.description}
        </p>
      </div>
    </div>
  );
}
