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
 * staggered by index. Still restrained — 8px of movement, capped delay — in
 * keeping with the source site's minimal motion language.
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.05, 0.3) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
