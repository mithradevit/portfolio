"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Selected work as an editorial rail.
 *
 * One row running left to right, starting flush with the page's left margin and
 * bleeding off the right edge. The bleed is the whole point: a row that ended
 * neatly inside the container would look like a grid that ran out of items,
 * whereas one cut by the edge of the screen reads as a list that continues, and
 * that is what invites the scroll.
 *
 * Each entry is picture over caption, the caption set as a masthead: rule,
 * number and year on the rule, then the title beneath it. It is the same
 * information the stacked cards carried, re-set so it can be read in a column
 * narrow enough that several fit across a screen.
 *
 * Scroll-snap is `proximity`, not `mandatory` — a reader flicking through a row
 * should be able to stop between two entries to compare them. Mandatory would
 * yank the row to the nearest card every time they let go.
 */
export function ProjectRail({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Which card is nearest the scroller's left edge. Measured from the DOM
  // rather than divided out of `scrollLeft`, because the cards are clamped and
  // the gap changes at lg — any arithmetic on a nominal card width goes wrong
  // at exactly the widths where it matters.
  const syncActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll("li"));
    const edge = el.getBoundingClientRect().left;
    let nearest = 0;
    let best = Infinity;
    items.forEach((item, i) => {
      const distance = Math.abs(item.getBoundingClientRect().left - edge);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncActive();
    el.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      el.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive]);

  function goTo(index: number) {
    const el = scrollerRef.current;
    const item = el?.querySelectorAll("li")[index];
    if (!el || !item) return;
    // Scroll the container, not the page: `scrollIntoView` on a horizontal
    // child drags the whole document sideways in some browsers.
    el.scrollTo({ left: (item as HTMLElement).offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {/* The negative right margin cancels the page shell's own padding (24px,
          40px from lg) so the row runs to the actual edge of the window. The
          matching positive padding puts that space back *inside* the scroller,
          so the last card can still be scrolled clear of the edge. */}
      <div
        ref={scrollerRef}
        className={cn(
          "no-scrollbar -mr-6 overflow-x-auto overflow-y-hidden pr-6 lg:-mr-10 lg:pr-10",
          "snap-x snap-proximity scroll-pl-6 lg:scroll-pl-10",
        )}
      >
        <ul className="flex w-max gap-6 lg:gap-10">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            // Clamped rather than a fixed width: at 340px two still fit a
            // laptop with the titles holding two lines; at 600px the pictures
            // are large enough to actually read a screenshot on a wide
            // monitor, which is the point of showing them at all.
            className="w-[clamp(340px,38vw,600px)] shrink-0 snap-start"
          >
            <Link
              href={`/projects/${project.slug}`}
              data-cursor={project.cursorLabel}
              className="group flex flex-col gap-5"
            >
              <div
                className={cn(
                  "border-foreground/10 relative w-full overflow-hidden border",
                  project.aspect,
                )}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundColor: project.thumbnailColor, opacity: 0.35 }}
                  />
                )}
                <div className="bg-background/0 group-hover:bg-background/15 absolute inset-0 transition-colors duration-300" />
              </div>

              <div className="flex flex-col gap-3">
                {/* Geist, not the serif the bare `h3` rule sets — the `!` is
                    required because that rule is unlayered. Stepped down from
                    the stacked card's size to suit a 30vw column. */}
                <h3 className="text-foreground group-hover:text-primary text-[20px]! leading-[1.25]! font-sans! tracking-[-0.03em]! transition-colors duration-300">
                  {project.title}
                  {/* Set as an index on the headline rather than a line of its
                      own — raised to the cap line and tucked against the last
                      word, like a footnote mark. It reads as belonging to this
                      title instead of being a third piece of metadata
                      competing with the year and the tags. The non-breaking
                      space keeps it from wrapping onto a line by itself;
                      `leading-[0]` stops the raised mark opening up the line
                      it sits on. */}
                  {" "}
                  <span className="text-primary align-super font-mono text-[10px] leading-[0] tracking-[0.1em] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </h3>

                {/* Its own line directly under the headline — close enough to
                    read as the headline's dateline, not as part of the tag
                    row below it. */}
                <span className="text-foreground-light -mt-1 font-mono text-[11px] tracking-[0.12em] tabular-nums">
                  {project.year}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {/* The lock alone, no wording. It still carries the accent
                      and is still the first pill in the row, so it reads as
                      the same flag — the words were the longest thing in a
                      caption that had to fit a 30vw column. The label is kept
                      for anyone not seeing the icon. */}
                  {project.nda && (
                    <span
                      className="border-primary/30 text-primary flex items-center justify-center rounded-full border px-2 py-1"
                      style={{ height: 22, minWidth: 22 }}
                    >
                      <Lock size={10} strokeWidth={2.5} aria-hidden />
                      <span className="sr-only">Under NDA</span>
                    </span>
                  )}
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-foreground/10 text-foreground-light rounded-full border px-2.5 py-1 font-mono tracking-[0.08em] uppercase"
                      style={{ fontSize: "10px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
        </ul>
      </div>

      {/* The scrollbar is hidden, so this is the only thing saying the row
          moves — and it says more than a bar did: how many projects there are,
          and which one you are on. Buttons rather than dots you can only look
          at, since a reader who can see the count will try to click it. */}
      <div className="flex items-center gap-2.5">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            data-cursor="pointer"
            onClick={() => goTo(index)}
            aria-label={`Show ${project.title}`}
            aria-current={index === active}
            // The hit area is 24px square; the dot inside it is 7px. A 7px
            // button is not a target anyone can reliably hit.
            className="group flex h-6 w-6 items-center justify-center"
          >
            <span
              className={cn(
                "block h-[7px] w-[7px] rounded-full transition-all duration-300",
                index === active
                  ? "bg-primary scale-125"
                  : "bg-foreground/20 group-hover:bg-foreground/40",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
