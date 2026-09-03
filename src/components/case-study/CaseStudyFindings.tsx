"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { CaseStudySection } from "@/content/case-studies/types";

type Item = NonNullable<CaseStudySection["findings"]>[number];

/**
 * Findings as a list of rows you open one at a time.
 *
 * Distinct from CaseStudyAccordion, which hides one long list behind a single
 * label. Here every point has its own row: the title is the finding stated
 * flat, the body is the evidence for it. Collapsed, the titles read as a
 * summary you can take in at a glance — which a stack of full paragraphs
 * never allowed.
 *
 * Rows open independently rather than closing each other. Someone comparing
 * two findings should be able to hold both open; an accordion that snaps shut
 * behind you only earns that when the list is too long to scroll.
 */
export function CaseStudyFindings({ items }: { items: Item[] }) {
  // The first is open on arrival so the pattern is legible without a click —
  // a stack of closed rows reads as a table of contents, not as content.
  const [open, setOpen] = useState<number[]>([0]);

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    // No max-width: 820px was tuned against the old 760px content measure and
    // now sits 76px inside it, which read as a stray indent — and the row's own
    // children overflowed that cap by 3px.
    <div className="border-foreground/10 flex w-full flex-col border-t">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.title} className="border-foreground/10 border-b">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              data-cursor="pointer"
              className="group flex w-full items-start gap-4 py-4 text-left"
            >
              <span className="text-foreground-light/70 shrink-0 pt-0.5 font-mono text-[11px] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={`min-w-0 flex-1 leading-relaxed transition-colors duration-200 ${
                  isOpen ? "text-foreground" : "text-foreground-light group-hover:text-foreground"
                }`}
              >
                {item.title}
              </span>

              {/* One glyph rotated, not a swap between plus and minus: the
                  quarter-turn is what reads as the row opening. */}
              {/* Fixed box around the glyph: a rotated element's bounding box
                  grows by √2, so the open row's plus was 21px wide in a slot
                  sized for 15 and pushed the article 3px past its measure. */}
              <span className="grid h-[22px] w-[22px] shrink-0 place-items-center">
                <Plus
                  size={15}
                  aria-hidden
                  className={`text-foreground-light transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            {/* `height: auto` on an AnimatePresence child animates properly in
                Motion — no measuring the content by hand, and it stays correct
                when the text reflows at a different width. */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.9 }}
                  className="overflow-hidden"
                >
                  {/* Indented past the number column — its glyph width plus
                      the row's own gap, so the body lines up under the title. */}
                  <p className="text-foreground-light pb-5 pl-[calc(1rem+2ch)] text-[14px]! leading-[1.65]!">
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
