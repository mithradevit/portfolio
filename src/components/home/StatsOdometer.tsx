"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { projectsShipped, countries, domains } from "@/content/stats";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * Proof strip: a rolling count, the countries behind it, and the sectors the
 * work sits in — the client-logo row's job, without borrowed marks.
 *
 * Each digit is a 0–9 strip inside a one-line window, so rolling it is a single
 * translateY. Later digits are delayed slightly so the number settles left to
 * right, and each strip blurs while it travels — the blur is what reads as
 * speed, since a digit landing instantly just looks like a text swap.
 */

const DIGIT_STAGGER = 0.09;
const ROLL_DURATION = 1.15;

function Digit({ digit, index, play }: { digit: number; index: number; play: boolean }) {
  const delay = index * DIGIT_STAGGER;

  return (
    // 1em window with line-height 1 so the strip's steps are exactly one glyph.
    <span className="inline-block h-[1em] overflow-hidden leading-none" aria-hidden>
      <motion.span
        className="flex flex-col leading-none"
        initial={{ y: "0%", filter: "blur(6px)" }}
        animate={play ? { y: `-${digit * 10}%`, filter: "blur(0px)" } : undefined}
        transition={{
          y: { duration: ROLL_DURATION, delay, ease: [0.16, 1, 0.3, 1] },
          // Clears just before the roll settles, so the number sharpens into
          // place rather than arriving already crisp.
          filter: { duration: ROLL_DURATION * 0.7, delay, ease: "easeOut" },
        }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="h-[1em] leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** The reference's overlapping avatar stack, carrying flags instead of faces. */
function CountryStack({ play }: { play: boolean }) {
  return (
    <ul className="flex list-none items-center pl-2">
      {countries.map((country, i) => (
        <motion.li
          key={country.code}
          title={country.name}
          initial={{ opacity: 0, scale: 0.6, x: -6 }}
          animate={play ? { opacity: 1, scale: 1, x: 0 } : undefined}
          transition={{ type: "spring", stiffness: 480, damping: 26, delay: i * 0.06 }}
          // Ring in the page colour, not a border: it's what cuts the gap
          // between overlapping discs at any background.
          className="border-foreground/15 bg-background ring-background -ml-2 h-9 w-9 overflow-hidden rounded-full border ring-2"
        >
          {/* Plain img, not next/image: these are tiny local SVGs that the
              optimiser would pass through untouched anyway. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={country.flag} alt={country.name} className="h-full w-full object-cover" />
        </motion.li>
      ))}
    </ul>
  );
}

function Capsule({ label }: { label: string }) {
  return (
    <li className="border-foreground/10 shrink-0 rounded-full border px-4 py-1.5">
      <h4 className="whitespace-nowrap">{label}</h4>
    </li>
  );
}

export function StatsOdometer() {
  const ref = useRef<HTMLDivElement>(null);
  // once: the number should land as you arrive, not re-roll on every scroll past.
  const play = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const digits = String(projectsShipped.value).split("").map(Number);

  return (
    <div
      ref={ref}
      className="border-foreground/10 flex flex-col gap-6 border-y py-6 lg:flex-row lg:items-center lg:gap-10"
    >
      <div className="flex shrink-0 items-center gap-4">
        <CountryStack play={play} />

        {/* Number over label, both flush left. The mono label sat on the serif
            baseline before, which cramped both — they need their own lines to
            hold their own leading. */}
        <div className="flex flex-col gap-1.5">
          {/* Digits are aria-hidden strips, so the whole claim is announced
              once in the sr-only span instead of as a 0–9 run per column. */}
          <span className="sr-only">
            {projectsShipped.value}
            {projectsShipped.suffix} projects shipped across {countries.length}+ countries
          </span>

          <div
            aria-hidden
            className="text-foreground flex items-end font-serif text-[2.5rem] leading-none tracking-[-0.03em]"
          >
            {digits.map((digit, i) => (
              <Digit key={i} digit={digit} index={i} play={play} />
            ))}
            {projectsShipped.suffix ? (
              <motion.span
                className="text-primary leading-none"
                initial={{ opacity: 0, y: "0.15em" }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: digits.length * DIGIT_STAGGER + 0.3 }}
              >
                {projectsShipped.suffix}
              </motion.span>
            ) : null}
          </div>

          <motion.h4
            aria-hidden
            initial={{ opacity: 0, y: 6 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="whitespace-nowrap"
          >
            {/* Two runs rather than one so the country half keeps its colour;
                mounted only once `play` flips, or the decode would finish
                somewhere above the fold before anyone saw it. */}
            {play ? (
              <>
                <ScrambleText text="Projects shipped · " delay={0.6} />
                <ScrambleText
                  text={`${countries.length}+ countries`}
                  delay={0.75}
                  className="text-primary!"
                />
              </>
            ) : (
              <span>Projects shipped · {countries.length}+ countries</span>
            )}
          </motion.h4>
        </div>
      </div>

      {/* Drifting capsules. The mask fades them out on the left so they
          dissolve into the flag stack rather than colliding with it. */}
      <div
        className="marquee min-w-0 flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 14%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 14%, #000 92%, transparent)",
        }}
      >
        <ul className="marquee-track flex w-max list-none items-center gap-3">
          {/* Duplicated once: the track translates -50%, so the copy is what
              occupies the gap the original leaves behind. */}
          {[...domains, ...domains].map((domain, i) => (
            <Capsule key={i} label={domain} />
          ))}
        </ul>
      </div>
    </div>
  );
}
