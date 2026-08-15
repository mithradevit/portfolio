import Image from "next/image";
import type { CaseStudySection } from "@/content/case-studies";

type Pin = NonNullable<CaseStudySection["pins"]>[number];

/**
 * A pin wall, in the Pinterest sense: a masonry of finished work laid out by
 * column rather than by row.
 *
 * CSS `columns` rather than grid, because that is what actually produces the
 * stagger — a grid would align every row and give back the uniform tiling the
 * masonry exists to avoid. The tradeoff is reading order: columns flow top to
 * bottom, so the DOM order is the visual order down each column, not across.
 * That is fine for a gallery where no pin depends on the one before it.
 *
 * Each pin keeps its own height. Nothing is stretched or cropped to fit a row,
 * which is the whole point — a wall of identical squares is a grid wearing a
 * masonry's clothes.
 */
export function CaseStudyPins({ pins }: { pins: Pin[] }) {
  return (
    <div className="mt-2 columns-2 gap-1.5 sm:columns-3 sm:gap-2">
      {pins.map((pin) => (
        <figure
          key={pin.src}
          // `break-inside-avoid` is load-bearing: without it a pin splits
          // across a column boundary and renders as two halves.
          className="mb-1.5 break-inside-avoid sm:mb-2"
        >
          <Image
            src={pin.src}
            alt={pin.alt}
            width={pin.width}
            height={pin.height}
            quality={88}
            sizes="(min-width: 640px) 250px, 45vw"
            className="h-auto w-full shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_18%)]"
          />
          {pin.brand && (
            <figcaption className="text-foreground-light mt-2 font-mono text-[10.5px] tracking-[0.08em] uppercase">
              {pin.brand}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
