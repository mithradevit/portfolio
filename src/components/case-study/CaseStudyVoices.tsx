"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseStudyVoice } from "@/content/case-studies/types";

const INTERVAL = 6500;

/**
 * The personas and their words, as one block rather than two.
 *
 * Cards and quotes were separate before, which meant the quote rotated while
 * the cards sat inert and the reader had to match a name to a card by reading.
 * Here the cards are the control: the active one is lit, its quote sits beneath,
 * and the rotation moves the highlight so the pairing is never in question.
 *
 * Rotation pauses on hover and focus so a line never moves mid-read, and does
 * not run at all under reduced motion — the cards remain clickable either way.
 */
export function CaseStudyVoices({ voices }: { voices: CaseStudyVoice[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const countRef = useRef(voices.length);
  countRef.current = voices.length;

  useEffect(() => {
    if (paused || reduceMotion || countRef.current < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % countRef.current),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const current = voices[index];

  return (
    <div
      className="flex flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {voices.map((v, i) => {
          const active = i === index;
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="pointer"
              aria-pressed={active}
              className={[
                "flex flex-col gap-1.5 rounded-[11px] border p-4 text-left transition-colors duration-300",
                active
                  ? "border-primary/40 bg-primary/[0.06]"
                  : "border-foreground/10 bg-background hover:border-foreground/25",
              ].join(" ")}
            >
              <span
                className={[
                  "font-mono text-[11px] tracking-[0.08em]",
                  active ? "text-primary" : "text-foreground-light/50",
                ].join(" ")}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground text-[13px] font-medium">{v.name}</span>
              {v.context && (
                <span className="text-foreground-light text-[12.5px] leading-[1.55]">
                  {v.context}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Min-height holds the box steady as quotes of different lengths swap. */}
      <div className="border-foreground/10 bg-foreground/[0.02] relative min-h-[150px] rounded-[12px] border p-5 sm:min-h-[122px] sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <blockquote
              className="text-foreground text-[16px] leading-[1.6] sm:text-[17px]"
              aria-live="polite"
            >
              “{current.quote}”
            </blockquote>
            <figcaption className="text-primary font-mono text-[11px] tracking-[0.08em] uppercase">
              {current.name}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}
