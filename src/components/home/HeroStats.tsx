"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";
import { projectsShipped, countries } from "@/content/stats";

/**
 * The proof block, in the hero's bottom-right corner opposite the title.
 *
 * A compressed version of what used to be its own full-width band: the flag
 * stack, the count, and the tag pills. The rolling-digit odometer and the
 * domain marquee are deliberately not here — both need horizontal room and a
 * scroll-triggered entrance, and this sits above the fold where everything
 * arrives at once.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function CountryStack() {
  return (
    <ul className="flex list-none items-center pl-2">
      {countries.map((country, i) => (
        <motion.li
          key={country.code}
          title={country.name}
          initial={{ opacity: 0, scale: 0.6, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 480, damping: 26, delay: 0.3 + i * 0.06 }}
          // Ring in the page colour rather than a border: it's what cuts the
          // gap between overlapping discs at any background.
          className="border-foreground/15 bg-background ring-background -ml-1 h-5 w-5 overflow-hidden rounded-[5px] border ring-2"
        >
          {/* Plain img: tiny local SVGs the optimiser would pass through. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={country.flag} alt={country.name} className="h-full w-full object-cover" />
        </motion.li>
      ))}
    </ul>
  );
}

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      className="flex flex-col items-start gap-4 lg:items-end"
    >
      <div className="flex items-center gap-3">
        <CountryStack />
        {/* One line, one size. The count used to be set large against a small
            label; in the corner beside the h1 that read as a second headline,
            so it now sits at the label's own size and the colour does the
            emphasis instead. */}
        {/* A span, not an <h4>: the bare h4 rule in globals.css is unlayered
            and pins 15px, so a phone can't step below it. `role="heading"` is
            deliberately not added — this is a stat line, not a section title. */}
        <span
          aria-label={`${projectsShipped.value}${projectsShipped.suffix} projects across ${countries.length}+ countries`}
          className="text-foreground-light block font-mono tracking-wide whitespace-nowrap uppercase"
          style={{ fontSize: "clamp(11px, 0.55rem + 1.1vw, 15px)" }}
        >
          {/* Colour splits on numbers, not on phrases: both figures carry the
              accent and both words stay in the label colour. Before, the "+"
              and the whole "5+ countries" were accented while "30" and
              "Projects" weren't, which put the emphasis in three places. */}
          <span className="text-primary">
            {projectsShipped.value}
            {projectsShipped.suffix}
          </span>{" "}
          Projects · <span className="text-primary">{countries.length}+</span> countries
        </span>
      </div>

      {/* Glass pills: a translucent fill over a backdrop blur, with a light
          top edge. `backdrop-filter` needs something behind it to sample —
          over the flat page background it reads as a plain tint, which is why
          these sit under the orbit rather than in dead space. */}
      <ul className="flex list-none flex-wrap gap-2 lg:justify-end">
        {profile.tags.map((tag, i) => (
          <motion.li
            key={tag}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 + i * 0.05, ease: EASE }}
            // Fill is the page's own background, not an ink tint. A
            // `foreground/4%` wash is grey by construction — it drags the label
            // toward the surface it sits on and costs contrast at this size,
            // which is the one thing these can't afford.
            className="border-foreground/20 bg-background/70 rounded-full border px-2.5 py-1 backdrop-blur-md"
            style={{ boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)" }}
          >
            {/* A span carrying the h4 label styling by hand, not an <h4>: the
                bare h4 rule in globals.css is unlayered and fixes the size at
                12px, which a utility can't step down from. */}
            <span
              className="text-foreground block font-mono tracking-wide whitespace-nowrap uppercase"
              // Was the golden-ratio step below the stat line (6.8→9.27px);
              // now that ramp plus 10%. Full-strength ink rather than
              // `foreground-light`: at this size the lighter tone reads as
              // blur, not as hierarchy — the pill already sets these apart.
              style={{ fontSize: "clamp(7.5px, 0.374rem + 0.748vw, 10.2px)" }}
            >
              {tag}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
