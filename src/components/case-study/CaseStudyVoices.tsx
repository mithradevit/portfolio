"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseStudyVoice } from "@/content/case-studies/types";
import { CAPTION, CONTENT_HEADING } from "./typography";

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
/**
 * All the voices at once: who said it on the left, what they said on the right.
 *
 * The rotator below shows one quote at a time, which suits a section where the
 * personas are the point and the quotes illustrate them. Here the quotes *are*
 * the finding — three roles inheriting the same evidence and each describing a
 * different failure — and an argument built on three quotes can't be read when
 * only one is on screen and the others are on a timer.
 *
 * Editorial, so: no rules, no boxes, no fills. Separation is done with space
 * and with the size gap between the small mono role and the serif quote under
 * it — the same devices a printed page would use. Ruled rows were the first
 * attempt and they turned three quotes into a table, which is the one thing a
 * pull-quote should never look like.
 *
 * A column each, side by side, because the three are meant to be *compared* —
 * one role per column puts them level with each other and lets the eye run
 * across all three at once. Stacked rows made the third quote an afterthought
 * simply by putting it last.
 */
function StackedVoices({ voices }: { voices: CaseStudyVoice[] }) {
  return (
    <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
      {voices.map((v) => (
        <li key={v.name} className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <h4 className={CONTENT_HEADING}>{v.name}</h4>
            {v.context && <span className={CAPTION}>{v.context}</span>}
          </div>
          <blockquote className="text-foreground! font-serif! text-[15px]! leading-[1.55]! italic">
            “{v.quote}”
          </blockquote>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyVoices({
  voices,
  stacked,
}: {
  voices: CaseStudyVoice[];
  /** Show every quote at once instead of rotating through them. */
  stacked?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const countRef = useRef(voices.length);
  countRef.current = voices.length;

  useEffect(() => {
    // The rotator's timer must not run in stacked mode — nothing reads `index`
    // there, but an interval ticking state every 6.5s would re-render the list
    // forever for no reason.
    if (stacked || paused || reduceMotion || countRef.current < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % countRef.current),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [stacked, paused, reduceMotion]);

  // After the hooks, never before — an early return above them would change
  // the hook order between renders.
  if (stacked) return <StackedVoices voices={voices} />;

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
