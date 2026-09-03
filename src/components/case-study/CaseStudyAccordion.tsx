"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

/**
 * A collapsed list, opened on demand.
 *
 * Used where a section's evidence is long enough to bury the point that follows
 * it — seven findings read as a wall on first scroll, and the reader who wants
 * them can ask. Collapsed by default for the same reason the FAQ window hides
 * its full answer: the detail was always here, reading it is now optional.
 *
 * Height is animated rather than toggled so the page does not jump under the
 * reader's cursor, and the spring matches the one FaqDetail uses.
 */
export function CaseStudyAccordion({
  label,
  bullets,
}: {
  label: string;
  bullets: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-foreground/10 bg-background overflow-hidden rounded-[11px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="pointer"
        aria-expanded={open}
        className="hover:bg-foreground/[0.02] flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors duration-200"
      >
        <span className="text-foreground text-[13px] font-medium">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-foreground-light/60 font-mono text-[11px] tracking-[0.08em]">
            {String(bullets.length).padStart(2, "0")}
          </span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            aria-hidden
            className={`text-foreground-light transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.9 }}
            className="overflow-hidden"
          >
            <ul className="border-foreground/10 flex flex-col gap-2.5 border-t px-4 py-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-baseline gap-2.5">
                  <span aria-hidden className="text-primary shrink-0 text-[13px] leading-none">
                    –
                  </span>
                  <span className="text-foreground-light text-[14px]! leading-[1.65]!">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
