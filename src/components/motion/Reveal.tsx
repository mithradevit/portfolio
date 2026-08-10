"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Matches rachelchen.tech's actual motion language (reverse-engineered from
 * its production JS bundles): a plain opacity fade, easeOut, ~0.2-0.3s — no
 * slides, no bounce. Nav uses the faster duration, page content the slower
 * one. Respects prefers-reduced-motion via MotionConfig in the root layout.
 */
export function Reveal({
  children,
  duration = 0.3,
  delay = 0,
  className,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A slightly richer variant for grid items: fade + a small upward drift,
 * staggered by index. Still restrained — 12px of movement, capped delay — in
 * keeping with the source site's minimal motion language.
 *
 * Triggered on scroll rather than on mount: most grids sit below the fold, so
 * an entrance that fires at page load has already finished by the time anyone
 * scrolls to it. The stagger is by *row* — items sharing a row should arrive
 * together, not chase each other across the page.
 */
export function RevealItem({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(Math.floor(index / 2) * 0.08, 0.24),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
