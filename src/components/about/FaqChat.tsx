"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faq, faqIntro } from "@/content/faq";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * FAQ as a chat thread: questions are incoming bubbles, answers slide in as
 * outgoing replies.
 *
 * The accordion is single-open. Two questions expanded at once breaks the
 * conversation metaphor — a thread has one reply in view at a time — and it
 * also stops the column from growing taller than the screen.
 */
export function FaqChat() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
      <div className="flex flex-col gap-5">
        <h2 className="max-w-[420px] leading-tight">
          <ScrambleText text={faqIntro.headingLead} />
          <br />
          <ScrambleText text={faqIntro.headingTail} delay={0.2} />
        </h2>
        <p className="max-w-[380px]">{faqIntro.blurb}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="pl-1">{faqIntro.meta}</h4>

        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="flex flex-col gap-3">
              {/* Question — incoming bubble, hugs the left edge. */}
              <div className="flex items-center gap-2 self-start">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="pointer"
                  aria-expanded={isOpen}
                  className="bubble bubble-in bg-foreground text-background hover:bg-primary max-w-[min(420px,84%)] px-[15px] py-[9px] text-left text-[15px] leading-[1.35] transition-colors duration-300 active:scale-[0.97]"
                >
                  {item.question}
                </button>
                <Plus
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                  className={`text-foreground-light shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </div>

              {/* Answer — outgoing reply.
                  Height opens on a spring while the bubble scales up from its
                  own tail corner, which is how iOS lands a sent message: the
                  bubble grows out of the point it's anchored to, rather than
                  fading in place. The right padding gives the tail room to
                  render inside the clipped box. */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.9 }}
                    className="flex w-full justify-end overflow-hidden pr-[26px]"
                  >
                    <motion.p
                      initial={{ scale: 0.82 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.7 }}
                      style={{ originX: 1, originY: 1, maxWidth: "min(440px, 88%)" }}
                      className="bubble bubble-out bg-primary mt-1 px-[15px] py-[9px] text-[15px] leading-[1.35] text-white!"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
