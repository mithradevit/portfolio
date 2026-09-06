import Image from "next/image";

type UseCase = {
  title: string;
  points: string[];
  span?: 1 | 2;
  image?: { src: string; alt: string; width: number; height: number };
};

/**
 * A bento board of the product's capabilities.
 *
 * A real grid, not a masonry column flow. Columns would let each card be its
 * own height and fill whichever column had room, which reads as a Pinterest
 * board: nothing lines up across the page and the eye has no rows to travel
 * along. A grid gives the opposite — cards of deliberately different widths
 * sitting on shared baselines, which is what makes a bento read as a composed
 * layout rather than as packed content.
 *
 * Rows size to their tallest card and every card stretches to fill its cell, so
 * a row is always flush. The points sit in a block that can grow and the image
 * is pinned under it, so the slack in a short card lands between the two rather
 * than under the last line of text.
 */
export function CaseStudyUseCases({ items }: { items: UseCase[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className={`bg-foreground/[0.045] flex flex-col overflow-hidden rounded-[14px] ${
            // Full width on a phone regardless: `col-span-2` on a
            // single-column grid is ignored anyway.
            item.span === 2 ? "sm:col-span-2" : ""
          }`}
        >
          <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
            <h4 className="text-foreground text-[17px] leading-[1.3] font-medium">{item.title}</h4>
            <ul className="flex list-none flex-col gap-2 pl-0">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="text-foreground-light flex gap-2 text-[13.5px] leading-[1.55]"
                >
                  {/* An en dash. A bullet would compete with the dotted lists
                      used elsewhere in the case study; the dash reads as a spec
                      sheet, which is what this board is. */}
                  <span aria-hidden className="shrink-0 select-none">
                    –
                  </span>
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {item.image && (
            // Shown whole, not cropped to a band or bled off a corner. These
            // exports are already framed as the crop they are meant to be, so
            // clipping them again would cut content that was deliberately kept.
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                // Lossless: these are vector exports, and Next's optimizer
                // rasterises and re-encodes whatever it is handed.
                unoptimized={item.image.src.toLowerCase().endsWith(".svg")}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 45vw, 90vw"
                // Capped by height, then centred. Filling the card's width is
                // right for a wide crop and wrong for a squarish one — a
                // 401x400 export at full card width is taller than the copy
                // above it and takes over the card. The wide crops come in
                // under this cap already, so it only bites where it should.
                className="mx-auto block h-auto max-h-[260px] w-auto max-w-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
