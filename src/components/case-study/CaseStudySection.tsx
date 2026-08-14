import Image from "next/image";
import type { ReactNode } from "react";
import { AudioWaveform, PenTool, X } from "lucide-react";
import type { CaseStudySection as CaseStudySectionType } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { CaseStudyDiagramBlock, CaseStudyMockupBlock, CaseStudySlot } from "./EvidenceMockups";
import { CaseStudyVideos } from "./CaseStudyBanner";

/** Stable anchor id from a heading, shared with CaseStudyNav. */
export function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function CaseStudySection({
  section,
  trailing,
}: {
  section: CaseStudySectionType;
  /** Rendered on the heading's own row, pushed to the right — used for the
   *  outbound link pills on the first section. */
  trailing?: ReactNode;
}) {
  return (
    <div id={sectionId(section.heading)} className="flex w-full scroll-mt-24 flex-col gap-4">
      {trailing ? (
        // `items-baseline` rather than `items-center`: the heading is 21px
        // serif and the pills are 12px mono, so centring them makes the text
        // look misaligned even though the boxes are not.
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h3>{section.heading}</h3>
          {trailing}
        </div>
      ) : (
        <h3>{section.heading}</h3>
      )}
      {section.kicker && (
        <span className="text-primary -mt-2 font-mono text-[11px] tracking-[0.1em] uppercase">
          {section.kicker}
        </span>
      )}
      {section.body.map((paragraph, i) => (
        <p key={i} className="text-foreground-light max-w-[700px] leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.stats && (
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {section.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-foreground/10 bg-background flex flex-col gap-1.5 rounded-[11px] border p-4 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]"
            >
              <span className="text-[26px] leading-none font-semibold tracking-[-0.03em]">{stat.value}</span>
              <span className="text-foreground-light text-[12.5px] leading-[1.4]">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      {section.bullets && (
        <ul className="flex list-none flex-col gap-2">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="text-foreground-light relative max-w-[700px] pl-4 leading-relaxed">
              <span className="absolute left-0">–</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {section.grid && (
        // Three cards get their own three-column track rather than wrapping to
        // 2 + 1, which leaves a stranded card on the second row. Anything else
        // stays on the two-column default.
        <div
          className={cn(
            "mt-2 grid grid-cols-1 gap-3",
            section.grid.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {section.grid.map((item, i) => (
            <div
              key={item.title}
              className="border-foreground/10 bg-background flex flex-col gap-1.5 rounded-[11px] border p-4 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]"
            >
              <span className="text-primary font-mono text-[11px] tracking-[0.08em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4>{item.title}</h4>
              <p className="text-foreground-light text-[13px] leading-[1.55]">{item.body}</p>
              {/* Inside the card, the clip is evidence for the point the card
                  makes — so it drops the outer frame and caption the standalone
                  player carries, which would double the card's own border. */}
              {item.video && (
                <div
                  className="border-foreground/10 mt-1 w-full overflow-hidden rounded-[8px] border"
                  style={{ aspectRatio: `${item.video.width} / ${item.video.height}` }}
                >
                  <video
                    src={item.video.src}
                    poster={item.video.poster}
                    aria-label={item.video.alt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {section.blocks && (
        <div className="mt-2 flex flex-col gap-3">
          {section.blocks.map((block, i) => (
            <div
              key={block.title ?? i}
              className="border-foreground/10 bg-background flex flex-col gap-2.5 rounded-[11px] border p-5 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]"
            >
              {block.title && <h4 className="text-foreground!">{block.title}</h4>}
              {block.body.map((paragraph, i) => (
                <p key={i} className="text-foreground-light text-[13.5px] leading-[1.6]">
                  {paragraph}
                </p>
              ))}
              {block.stack && (
                <ul className="mt-1.5 grid list-none grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {block.stack.map((tool) => (
                    <li key={tool.name} className="flex flex-col gap-2">
                      <span
                        aria-hidden
                        className="flex h-9 w-9 items-center justify-center rounded-[9px]"
                        style={{ backgroundColor: `${tool.color}1F` }}
                      >
                        {tool.logo ? (
                          // Masked rather than <img>: the source files are
                          // single-colour, and a mask lets one file carry the
                          // brand tint instead of shipping a light and a dark
                          // variant of each.
                          <span
                            className="block h-[18px] w-[18px]"
                            style={{
                              backgroundColor: tool.color,
                              maskImage: `url(${tool.logo})`,
                              WebkitMaskImage: `url(${tool.logo})`,
                              maskSize: "contain",
                              WebkitMaskSize: "contain",
                              maskRepeat: "no-repeat",
                              WebkitMaskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskPosition: "center",
                            }}
                          />
                        ) : tool.glyph === "audio" ? (
                          <AudioWaveform size={18} strokeWidth={2} style={{ color: tool.color }} />
                        ) : (
                          <PenTool size={18} strokeWidth={2} style={{ color: tool.color }} />
                        )}
                      </span>
                      <span className="text-foreground text-[13.5px] font-medium">{tool.name}</span>
                      <span className="text-foreground-light text-[12.5px] leading-[1.55]">
                        {tool.body}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {block.exclusions && (
                <ul className="mt-1.5 grid list-none grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {block.exclusions.map((item) => (
                    <li
                      key={item.title}
                      className="border-foreground/10 flex flex-col gap-1.5 rounded-[9px] border p-3.5"
                    >
                      {/* The mark carries the meaning here — these are the
                          things deliberately not built — so it is labelled for
                          screen readers rather than left as decoration.

                          The tile is tinted with the icon's own blue rather
                          than the accent orange, which fought with it. A flat
                          rgba keeps the same tint on both themes — a
                          `foreground`-derived wash would invert in dark. */}
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-[8px]"
                        style={{ backgroundColor: "rgb(61 94 245 / 10%)" }}
                      >
                        <Image
                          src="/images/tech/cross.png"
                          alt=""
                          width={96}
                          height={96}
                          className="h-4 w-4"
                        />
                        <span className="sr-only">Out of scope:</span>
                      </span>
                      <span className="text-foreground text-[13px] font-medium">{item.title}</span>
                      <span className="text-foreground-light text-[12.5px] leading-[1.55]">
                        {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {section.images && (
        // Side by side once there is more than one, stacking on a phone where
        // two columns would leave each too small to read. `items-start` keeps a
        // shorter image at its own height instead of stretching to match.
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-4",
            section.images.length > 1 && "sm:grid-cols-2",
          )}
        >
          {section.images.map((img) => (
            <figure key={img.src} className="flex w-full flex-col gap-3">
              <div className="w-full overflow-hidden rounded-[14px] border border-[#E5E5EA] bg-white p-2 shadow-[0_1px_2px_rgb(0_0_0_/_5%),0_8px_24px_-12px_rgb(0_0_0_/_25%)] sm:p-3">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  quality={92}
                  sizes="(min-width: 640px) 380px, 100vw"
                  className="h-auto w-full rounded-[6px]"
                />
              </div>
              {img.caption && (
                <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {section.image && (
        <figure className="flex w-full flex-col gap-3">
          {/* Explicit light ground. These are light-mode product screens and
              ink-on-paper sketches — a transparent backing would let the dark
              page show through the artwork's own white and destroy it. The
              thin inset padding reads as a frame rather than a bleed. */}
          <div className="w-full overflow-hidden rounded-[14px] border border-[#E5E5EA] bg-white p-2 shadow-[0_1px_2px_rgb(0_0_0_/_5%),0_8px_24px_-12px_rgb(0_0_0_/_25%)] sm:p-3">
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width}
              height={section.image.height}
              quality={90}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full rounded-[6px]"
            />
          </div>
          {section.image.caption && (
            <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
              {section.image.caption}
            </figcaption>
          )}
        </figure>
      )}
      {section.videos && <CaseStudyVideos videos={section.videos} />}
      {section.diagram && <CaseStudyDiagramBlock id={section.diagram} caption={section.diagramCaption} />}
      {section.mockup && <CaseStudyMockupBlock id={section.mockup} caption={section.mockupCaption} />}
      {/* Annotations sit after whichever visual the section carries, so a real
          screenshot gets the same numbered callouts a rebuilt mockup does. */}
      {section.annotations && section.annotations.length > 0 && (
        <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {section.annotations.map((a, i) => (
            <li key={a.title} className="flex gap-2.5">
              <span
                className="border-primary/40 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[13px] font-medium">{a.title}</span>
                <span className="text-foreground-light text-[12.5px] leading-[1.5]">{a.body}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
      {section.slot && <CaseStudySlot label={section.slot.label} text={section.slot.text} />}
      {/* Closing takeaway. Ruled rather than boxed — it's a change of voice
          within the section, not a separate block of content. */}
      {section.note && (
        <p className="border-primary/40 text-foreground-light max-w-[700px] border-l-2 py-0.5 pl-4 leading-relaxed">
          <span className="text-foreground font-medium">{section.note.label}:</span>{" "}
          {section.note.body}
        </p>
      )}
    </div>
  );
}
