"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** Squares in the strip, and the gap between one lighting and the next. */
const CELLS = 12;
const STEP = 45;

/**
 * The contact block: a status line, the ask, and two buttons.
 *
 * It was a sentence with the address hanging off the end of it — the one thing
 * on the page a hiring reader is looking for, set as body copy in the middle of
 * a paragraph, with nothing to press. As a block it states the status first
 * ("open to work" is the fact, not the preamble), then the ask, then gives two
 * real targets.
 *
 * The email button fills a contribution strip before it hands over the
 * address: the same square, radius and accent as the activity graph two
 * columns away, so the page's one flourish is built from a shape it already
 * uses. Reduced motion skips it — nobody should wait through an animation for
 * contact details.
 */
export function ContactCTA({
  user,
  domain,
  linkedin,
  prompt,
}: {
  user: string;
  domain: string;
  linkedin: string;
  prompt: string;
}) {
  const [filled, setFilled] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    if (revealed || filled > 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    for (let i = 1; i <= CELLS; i++) {
      timers.current.push(setTimeout(() => setFilled(i), i * STEP));
    }
    timers.current.push(setTimeout(() => setRevealed(true), CELLS * STEP + 140));
  };

  // One shape for both states, so revealing the address doesn't resize or
  // restyle the control under the reader's cursor.
  const button =
    "group border-foreground/15 hover:border-primary inline-flex h-11 items-center gap-2.5 rounded-full border px-5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300";

  return (
    <div className="flex flex-col gap-5">
      {/* Status first. The dot is the only thing on this page that moves on
          its own, which is the point — it is the one fact with a deadline. */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
          <span className="bg-primary relative inline-flex h-[7px] w-[7px] rounded-full" />
        </span>
        <span className="text-primary font-mono text-[11px] tracking-[0.14em] uppercase">
          Open to work
        </span>
      </div>

      <p className="text-foreground-light max-w-[46ch] text-[15px] leading-[1.6]">{prompt}</p>

      <div className="flex flex-wrap items-center gap-3">
        {revealed ? (
          <a
            href={`mailto:${user}@${domain}`}
            data-cursor="pointer"
            className={`${button} text-primary border-primary/40 lowercase`}
          >
            {user}@{domain}
          </a>
        ) : (
          <button
            type="button"
            onClick={run}
            onMouseEnter={run}
            data-cursor="pointer"
            aria-label="Reveal email address"
            className={`${button} text-foreground-light group-hover:text-primary`}
          >
            <span className="flex items-center gap-[3px]" aria-hidden>
              {Array.from({ length: CELLS }, (_, i) => (
                <span
                  key={i}
                  className="h-[12px] w-[5px] rounded-[2px] transition-colors duration-200"
                  style={{
                    backgroundColor:
                      i < filled ? "var(--color-primary)" : "var(--color-foreground)",
                    opacity: i < filled ? 1 : 0.15,
                  }}
                />
              ))}
            </span>
            {filled > 0 ? "Loading" : "Show email"}
          </button>
        )}

        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          data-cursor="pointer"
          className={`${button} text-foreground-light hover:text-primary`}
        >
          LinkedIn
          <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
