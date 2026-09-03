import Image from "next/image";
import { cn } from "@/lib/cn";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/**
 * An artefact presented on a grey mat, centred, with its caption underneath.
 *
 * Opt-in per case study (`mattedImages` on the `CaseStudy`), not a global
 * replacement for the standard figure: this is a deliberate photo-essay
 * presentation, and forcing it onto a prose-first case study would just frame
 * an already column-width image in empty grey for no reason.
 *
 * The mat gives every image the same silhouette regardless of its own aspect
 * ratio — a wide diagram, a tall sketch, a square screen all read as one
 * family. The white card inside the mat is not decoration: these are
 * light-mode product screens and ink-on-paper scans, which need their own
 * white ground rather than borrowing the mat's grey through their margins.
 * `bare` opts a single image out of that card for artwork that already
 * carries its own edge.
 */
export function CaseStudyFigure({
  image,
  bare,
  compact,
  sizes = "(min-width: 1024px) 820px, 100vw",
  className,
}: {
  image: Img;
  bare?: boolean;
  /** Tighter inset for a half-column placement, where the full mat would
   *  starve the image of width. */
  compact?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cn("flex w-full flex-col gap-4", className)}>
      <div
        className={cn(
          "bg-foreground/[0.045] flex w-full justify-center rounded-[14px]",
          compact ? "p-4 sm:p-6" : "px-4 py-8 sm:px-10 sm:py-12",
        )}
      >
        <div
          className={cn(
            "w-full overflow-hidden",
            bare
              ? "rounded-[6px]"
              : "rounded-[8px] border border-[#EDEDF0] bg-white p-1.5 shadow-[0_1px_3px_rgb(0_0_0/0.05),0_10px_28px_-10px_rgb(0_0_0/0.12)] sm:p-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            quality={90}
            sizes={sizes}
            className={cn("h-auto w-full", bare ? "" : "rounded-[5px]")}
          />
        </div>
      </div>

      {image.caption && (
        <figcaption className="text-foreground-light mx-auto max-w-[62ch] text-center text-[13px] leading-[1.6]">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
