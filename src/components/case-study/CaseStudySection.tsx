import Image from "next/image";
import type { ReactNode } from "react";
import {
  AudioWaveform,
  Check,
  Database,
  Eye,
  FileText,
  ListChecks,
  PenTool,
  Route,
  X,
} from "lucide-react";
import type { CaseStudySection as CaseStudySectionType } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { CaseStudyDiagramBlock, CaseStudyMockupBlock, CaseStudySlot } from "./EvidenceMockups";
import { CaseStudyVideos } from "./CaseStudyBanner";
import { CaseStudyFlow } from "./CaseStudyFlow";
import { CaseStudyInlineVideo } from "./CaseStudyInlineVideo";
import { CaseStudyPins } from "./CaseStudyPins";
import { CaseStudyEmbed } from "./CaseStudyEmbed";
import { CaseStudyVoices } from "./CaseStudyVoices";
import { CaseStudyAccordion } from "./CaseStudyAccordion";
import { CaseStudyFindings } from "./CaseStudyFindings";

/** Card icons, named by idea rather than glyph so the drawing can change
 *  without the content having to. */
const gridIcons = {
  records: Database,
  protocol: FileText,
  criteria: ListChecks,
  imaging: Eye,
  status: Route,
} as const;

/**
 * The opening spread: the sentence that says what the work was, and the facts
 * of the engagement beside it.
 *
 * The lead is set in the display serif rather than the body face. That serif is
 * otherwise used only for section headings, and giving it one full sentence per
 * case study is what makes it read as part of the type system rather than as a
 * leftover from the headings.
 *
 * The facts sit in a column of ruled cards on the right. Each card is a label
 * and a value and nothing else — an accent rule on the leading edge does the
 * work a box outline would otherwise do, without drawing four sides.
 */
function CaseStudyIntro({
  intro,
  body,
}: {
  intro: NonNullable<CaseStudySectionType["intro"]>;
  body: string[];
}) {
  return (
    <div className="mt-2 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
      <div className="flex flex-col gap-5">
        {/* `text-foreground` and a size well above the body: this is the one
            sentence a reader who reads nothing else should come away with. */}
        <p className="text-foreground max-w-[24ch] text-[clamp(1.375rem,2.2vw,1.75rem)]! leading-[1.3] font-serif!">
          {markLead(intro.lead)}
        </p>

        <div className="flex max-w-[560px] flex-col gap-4">
          {body.map((paragraph, i) => (
            <p key={i} className="text-foreground-light leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {intro.facts.map((fact) => (
          <div
            key={fact.label}
            className="border-primary/40 bg-foreground/[0.025] flex flex-col gap-1.5 border-l-2 py-3.5 pr-4 pl-4"
          >
            <span className="text-foreground-light/80 font-mono text-[10px] tracking-[0.12em] uppercase">
              {fact.label}
            </span>
            <span className="text-foreground text-[15px] leading-snug">{fact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Splits a lead on `**marked**` runs and rules the marked ones.
 *
 * A drawn underline rather than a highlighter fill: a filled block behind text
 * costs contrast at exactly the size where the sentence is meant to be easiest
 * to read, and it is the effect that most reads as a template. The rule sits
 * clear of the descenders and takes the accent, so the phrase is marked without
 * the words themselves changing colour.
 */
function markLead(lead: string) {
  return lead.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="decoration-primary/60 underline decoration-[2px] underline-offset-[6px]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * A case-study section heading.
 *
 * 32px on a 1.2 line, measured off the reference rather than guessed — its
 * section headlines set at 32px/38.4px against the same 15px body, and the bare
 * `h3` rule here was producing 21.2px. At that size a heading is barely a step
 * above the prose under it, which is why the page read as flat next to the
 * reference even though the column width and body type already matched.
 *
 * The `!` is required throughout: the bare `h3` rule in globals.css is
 * unlayered and beats plain utilities. Only case-study sections take this size
 * — `h3` elsewhere (the Fun cards) is a card title and stays where it is.
 */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-foreground text-[32px]! leading-[1.2]! tracking-[-0.01em]!">{children}</h3>
  );
}

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
  // The grid moves into the aside row instead of sitting under it — so the row
  // itself carries the cards and the standalone grid block below is skipped.
  const asideSpansGrid = Boolean(section.bodyAsideSpan && section.bodyAside && section.grid);

  return (
    <div id={sectionId(section.heading)} className="flex w-full scroll-mt-24 flex-col gap-4">
      {trailing ? (
        // `items-baseline` rather than `items-center`: the heading is 21px
        // serif and the pills are 12px mono, so centring them makes the text
        // look misaligned even though the boxes are not.
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <SectionHeading>{section.heading}</SectionHeading>
          {trailing}
        </div>
      ) : (
        <SectionHeading>{section.heading}</SectionHeading>
      )}
      {section.kicker && (
        <span className="text-primary -mt-2 font-mono text-[11px] tracking-[0.1em] uppercase">
          {section.kicker}
        </span>
      )}
      {section.imageLead && section.image && (
        // Leading full-width image: the section opens on the thing itself and
        // the prose reads as its explanation rather than its introduction.
        <figure className="flex w-full flex-col gap-3">
          <div
            className={cn(
              "w-full overflow-hidden rounded-[14px]",
              section.imageBare
                ? "border-foreground/10 border"
                : "border border-[#EDEDF0] bg-white p-2 sm:p-3",
            )}
          >
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width}
              height={section.image.height}
              quality={90}
              sizes="(min-width: 1024px) 760px, 100vw"
              className={cn("h-auto w-full", section.imageBare ? "" : "rounded-[6px]")}
            />
          </div>
          {section.image.caption && (
            <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
              {section.image.caption}
            </figcaption>
          )}
        </figure>
      )}
      {section.intro ? (
        <CaseStudyIntro intro={section.intro} body={section.body} />
      ) : section.bodyAside ? (
        // Prose and photograph as one row: the picture is the setting the words
        // describe, so it sits beside them rather than under them. Stacks on a
        // phone, where side-by-side would leave both halves too narrow to read.
        //
        // `bodyAsideSpan` pulls the section's grid into the left column as one
        // ruled list, so the row has equal weight on both sides and the photo is
        // held by content rather than floating beside a single line.
        <div
          className={cn(
            "grid grid-cols-1 gap-5 lg:gap-8",
            asideSpansGrid
              ? "items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              : "items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]",
          )}
        >
          <div className="flex flex-col gap-4">
            {section.body.map((paragraph, i) => (
              <p key={i} className="text-foreground-light leading-relaxed">
                {paragraph}
              </p>
            ))}
            {asideSpansGrid && section.grid && (
              <div className="border-foreground/10 bg-background overflow-hidden rounded-[12px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]">
                {section.grid.map((item, i) => (
                  <div
                    key={item.title}
                    className={cn(
                      "flex flex-col gap-1 p-3.5",
                      i === 0 ? "" : "border-foreground/10 border-t",
                    )}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-primary font-mono text-[11px] tracking-[0.08em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4>{item.title}</h4>
                    </div>
                    <p className="text-foreground-light text-[13px] leading-[1.55]">{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* The photo tracks the column's full height so the two halves end
              together, and crops from the centre rather than letterboxing. */}
          <div
            className={cn(
              "border-foreground/10 relative overflow-hidden rounded-[12px] border",
              asideSpansGrid ? "min-h-[240px] lg:h-full" : "aspect-[3/2]",
            )}
          >
            <Image
              src={section.bodyAside.src}
              alt={section.bodyAside.alt}
              fill
              quality={88}
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        section.body.map((paragraph, i) => (
          <p key={i} className="text-foreground-light max-w-[700px] leading-relaxed">
            {paragraph}
          </p>
        ))
      )}
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
      {section.findings && <CaseStudyFindings items={section.findings} />}
      {section.grid && !asideSpansGrid && (
        // Three cards get their own three-column track rather than wrapping to
        // 2 + 1, which leaves a stranded card on the second row. Anything else
        // stays on the two-column default.
        <div
          className={cn(
            "mt-2 grid grid-cols-1 gap-3",
            // `gridRows` keeps one card per row at every width: titles and
            // bodies of this length are unreadable in a narrow column track.
            section.gridRows
              ? ""
              : section.grid.length === 3
                ? "sm:grid-cols-3"
                : section.grid.length === 5
                  ? "sm:grid-cols-2 lg:grid-cols-5"
                  : "sm:grid-cols-2",
          )}
        >
          {section.grid.map((item, i) => {
            const Icon = item.icon ? gridIcons[item.icon] : null;
            return (
            <div
              key={item.title}
              className={cn(
                "border-foreground/10 bg-background flex rounded-[11px] border p-4 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]",
                section.gridRows
                  ? "flex-row items-start gap-3.5"
                  : "flex-col gap-1.5",
              )}
            >
              {section.gridRows ? (
                <>
                  {Icon && (
                    <span className="border-primary/25 bg-primary/[0.06] flex size-8 shrink-0 items-center justify-center rounded-[9px] border">
                      <Icon size={15} strokeWidth={1.75} aria-hidden className="text-primary" />
                    </span>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h4>{item.title}</h4>
                    <p className="text-foreground-light text-[13px] leading-[1.55]">{item.body}</p>
                  </div>
                  <span className="text-foreground-light/40 shrink-0 font-mono text-[11px] tracking-[0.08em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </>
              ) : (
              <>
              {Icon ? (
                // Icon and number share a row: the glyph carries the idea at a
                // glance, the number keeps the set countable.
                <span className="flex items-center justify-between gap-2">
                  <span className="border-primary/25 bg-primary/[0.06] flex size-7 items-center justify-center rounded-[8px] border">
                    <Icon size={14} strokeWidth={1.75} aria-hidden className="text-primary" />
                  </span>
                  <span className="text-foreground-light/50 font-mono text-[11px] tracking-[0.08em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              ) : (
              <span className="text-primary font-mono text-[11px] tracking-[0.08em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              )}
              <h4>{item.title}</h4>
              <p className="text-foreground-light text-[13px] leading-[1.55]">{item.body}</p>
              {item.video && <CaseStudyInlineVideo video={item.video} />}
              </>
              )}
            </div>
            );
          })}
        </div>
      )}
      {section.accordion && (
        <CaseStudyAccordion
          label={section.accordion.label}
          bullets={section.accordion.bullets}
        />
      )}
      {section.voices && <CaseStudyVoices voices={section.voices} />}
      {section.measures && (
        // Before → after, ticked. Green rather than the accent orange: a tick
        // reads as "confirmed" in green almost universally, and the accent is
        // already carrying navigation and emphasis elsewhere on the page.
        <div className="border-foreground/10 bg-background overflow-hidden rounded-[12px] border">
          {section.measures.map((m, i) => (
            <div
              key={m.label}
              className={cn(
                "flex items-start gap-3 p-3.5 sm:items-center sm:gap-4",
                i > 0 && "border-foreground/10 border-t",
              )}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 sm:mt-0">
                <Check size={12} strokeWidth={3} className="text-emerald-600 dark:text-emerald-400" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-foreground shrink-0 text-[13px] font-medium sm:w-[168px]">
                  {m.label}
                </span>
                <span className="text-foreground-light min-w-0 text-[13px] leading-[1.55]">
                  {m.body}
                </span>
              </div>
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
      {section.pins && <CaseStudyPins pins={section.pins} />}
      {section.flows && (
        <div className="flex flex-col gap-3">
          {section.flows.map((flow) => (
            <CaseStudyFlow key={flow.title} flow={flow} />
          ))}
        </div>
      )}
      {section.images && (
        // Side by side once there is more than one, stacking on a phone where
        // two columns would leave each too small to read. `items-start` keeps a
        // shorter image at its own height instead of stretching to match.
        //
        // `imagesCols` overrides the default two-up for sets that are meant to
        // be read as one strip — four portrait notebook pages, say, where the
        // point is the run of them rather than any single page's detail.
        //
        // `imagesSurface` sets the whole set on the same iOS grouped ground the
        // diagrams use, so a set of artefacts reads as one exhibit instead of
        // loose pictures dropped between paragraphs. Pinned light for the same
        // reason those are: the artefacts are ink on white paper.
        <div
          className={cn(
            section.imagesSurface &&
              "border-foreground/10 bg-foreground/[0.02] overflow-hidden rounded-[12px] border p-4",
          )}
        >
          {section.imagesSurface && section.imagesLabel && (
            <span className="text-primary mb-3 block font-mono text-[11px] tracking-[0.08em] uppercase">
              {section.imagesLabel}
            </span>
          )}
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-2",
            section.images.length > 1 &&
              (section.imagesCols === 4
                ? "grid-cols-2 lg:grid-cols-4"
                : section.imagesCols === 3
                  ? "sm:grid-cols-3"
                  : // 1 keeps the single-column default: for scans carrying
                    // handwriting, half a column is too narrow to read.
                    section.imagesCols === 1
                    ? ""
                    : "sm:grid-cols-2"),
          )}
          // Caps the set's width so a run of tall artefacts does not dominate
          // the column it sits in. A fraction of the available width rather than
          // a fixed pixel size, so it scales with the page.
          style={section.imagesScale ? { maxWidth: `${section.imagesScale * 100}%` } : undefined}
        >
          {section.images.map((img) => {
            const sizes =
              section.imagesCols === 4
                ? "(min-width: 1024px) 200px, (min-width: 640px) 45vw, 50vw"
                : section.imagesCols === 1
                  ? "(min-width: 1024px) 760px, 100vw"
                  : "(min-width: 640px) 380px, 100vw";
            return (
            <figure key={img.src} className="flex w-full flex-col gap-3">
              {section.imagesBare ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  quality={92}
                  sizes={sizes}
                  className="h-auto w-full"
                />
              ) : (
                // Inside a grouped surface the set already sits on its own
                // ground, so each page needs only a hairline mat — the full
                // frame and drop shadow read as a border on a border.
                <div
                  className={cn(
                    "w-full overflow-hidden rounded-[10px] border border-[#EDEDF0] bg-white",
                    section.imagesSurface
                      ? "p-1 shadow-[0_1px_2px_rgb(0_0_0_/_4%)] sm:p-1.5"
                      : "rounded-[14px] p-2 shadow-[0_1px_2px_rgb(0_0_0_/_5%),0_8px_24px_-12px_rgb(0_0_0_/_25%)] sm:p-3",
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    quality={92}
                    sizes={sizes}
                    className="h-auto w-full rounded-[6px]"
                  />
                </div>
              )}
              {img.caption && (
                <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
                  {img.caption}
                </figcaption>
              )}
            </figure>
            );
          })}
        </div>
        </div>
      )}
      {section.image && !section.imageLead && (
        <figure className="flex w-full flex-col gap-3">
          {/* Explicit light ground. These are light-mode product screens and
              ink-on-paper sketches — a transparent backing would let the dark
              page show through the artwork's own white and destroy it. The
              thin inset padding reads as a frame rather than a bleed. */}
          <div className="w-full overflow-hidden rounded-[14px] border border-[#EDEDF0] bg-white p-2 sm:p-3">
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
      {section.embed && <CaseStudyEmbed embed={section.embed} />}
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
