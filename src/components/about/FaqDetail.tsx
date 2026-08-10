"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/**
 * Detail window for a FAQ question — same macOS chrome as ProfileWindow and
 * FunProjectDetail, reused a third time here.
 *
 * Leads with `tldr`: one sentence, readable in the time it takes a recruiter
 * to glance at a tab. Everything else — the real paragraphs, the bullets, the
 * closing line — sits behind a "More context" toggle, collapsed by default.
 * The full answer was always here; the point of the toggle is that reading it
 * is now optional instead of mandatory.
 */
export function FaqDetail({
  item,
  index,
  onClose,
}: {
  item: FaqItem | null;
  index: number;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  return (
    <AnimatePresence onExitComplete={() => setExpanded(false)}>
      {item ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="bg-foreground/20 absolute inset-0 backdrop-blur-[2px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.question}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            // max-h + overflow: even the expanded answers run well past a
            // screen's height on some questions, and this window has no
            // outer scaffold to scroll within — it has to scroll itself.
            className="border-foreground/[0.08] bg-background relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-[14px] border shadow-[inset_0_1px_0_rgb(255_255_255_/_80%),0_2px_6px_rgb(50_64_79_/_6%),0_20px_48px_rgb(50_64_79_/_18%)]"
            style={{ maxHeight: "min(640px, 84vh)" }}
          >
            <div className="border-foreground/[0.08] bg-foreground/[0.04] relative flex shrink-0 items-center gap-2 px-3.5 py-3">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-cursor="pointer"
                className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity duration-150 hover:opacity-80"
              />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]/60" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]/60" />
              <span className="text-foreground-light absolute left-1/2 -translate-x-1/2 text-[13px]">
                faq-{String(index + 1).padStart(2, "0")}.txt
              </span>
            </div>

            <div className="thin-scroll flex flex-col gap-4 overflow-y-auto p-6">
              {/* font-editorial, not the site's usual font-serif (Source
                  Serif): this window is standing in for cindyly.design's own
                  heading font, and Source Serif reads too even-weighted next
                  to that reference's dramatic, high-contrast italic. */}
              <h1 className="font-editorial! text-[28px]! leading-[1.1] font-normal! italic">
                {item.question}
              </h1>

              <p className="text-foreground-light! text-[15px]! leading-[1.55] font-normal!">
                {item.tldr}
              </p>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                data-cursor="pointer"
                aria-expanded={expanded}
                className="text-primary flex w-fit items-center gap-1.5 self-start"
              >
                <h4 className="text-primary!">{expanded ? "Less" : "More context"}</h4>
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  aria-hidden
                  className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.9 }}
                    className="overflow-hidden"
                  >
                    <div className="border-foreground/10 flex flex-col gap-4 border-t pt-4">
                      {item.paragraphs.map((paragraph, i) => (
                        <p key={i} className="leading-[1.65]">
                          {paragraph}
                        </p>
                      ))}

                      {item.bullets ? (
                        <ul className="flex flex-col gap-2">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-baseline gap-2.5">
                              <span aria-hidden className="text-primary text-[15px] leading-none">
                                —
                              </span>
                              <span className="leading-[1.5]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.closing ? (
                        // Set apart with a left rule rather than italics —
                        // italic is already spoken for by the question heading.
                        <p className="border-primary/40 text-foreground-light border-l-2 py-0.5 pl-4 leading-[1.65]">
                          {item.closing}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
