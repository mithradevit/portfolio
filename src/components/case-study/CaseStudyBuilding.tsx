"use client";

import { motion } from "motion/react";

/**
 * The end of a case study that isn't finished yet.
 *
 * A short case study with no closing note reads as one that ran out of things
 * to say. This says the opposite — the writing is in progress — and it does it
 * with a small animation rather than a banner, because a heavy "under
 * construction" bar would be a bigger interruption than the missing content.
 *
 * `MotionConfig reducedMotion="user"` wraps the whole app, so the loops below
 * are held at their first frame for anyone who asked the OS for less motion;
 * the note still reads exactly the same standing still.
 */
export function CaseStudyBuilding({ note }: { note?: string }) {
  return (
    <div className="border-foreground/10 flex flex-col items-center gap-4 rounded-[14px] border border-dashed px-6 py-12 text-center">
      {/* Three blocks stacking themselves, on a loop. The delays are a third
          of the cycle apart, so at any moment one is rising, one is settling
          and one is waiting — the shape reads as being assembled rather than
          as three things blinking. */}
      <div aria-hidden className="flex items-end gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="bg-primary/70 block h-2.5 w-2.5 rounded-[3px]"
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: [-6, 0, 0, -6], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.1,
              times: [0, 0.25, 0.75, 1],
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <span className="text-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
          Still building
          {/* The trailing dots are their own element so they can keep moving
              while the words stay put — animating the whole line would make
              the label itself twitch. */}
          <motion.span
            aria-hidden
            className="inline-block"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            …
          </motion.span>
        </span>
        <p className="text-foreground-light max-w-[46ch] text-[13px] leading-[1.6]">
          {note ?? "This one is still being written up. The work shipped — the story is catching up."}
        </p>
      </div>
    </div>
  );
}
