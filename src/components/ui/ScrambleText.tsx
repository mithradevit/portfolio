"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Decode-on-load text. Characters resolve left to right, cycling through
 * random glyphs until each settles on its final letter.
 *
 * The finished string is what renders on the server and on first paint, so
 * the markup is correct before any JS runs — the scramble is layered on after
 * mount. Search engines and reduced-motion visitors just see the real text.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@*+=-<>/";

export function ScrambleText({
  text,
  as: Tag = "span",
  className,
  /** Seconds before the effect starts — used to stagger sibling headings. */
  delay = 0,
  /** Re-run the scramble when the element (or its group) is hovered. */
  scrambleOnHover = false,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  delay?: number;
  scrambleOnHover?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useRef(false);

  const run = useCallback(() => {
    if (reduced.current) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);

    const chars = [...text];
    // Whitespace is never scrambled, so word shapes stay put and the line
    // doesn't reflow while it resolves.
    const start = performance.now();
    const perChar = 26;
    const settleAfter = 220;

    const step = (now: number) => {
      const elapsed = now - start;
      let done = true;
      const out = chars.map((ch, i) => {
        if (ch === " " || ch === "\n") return ch;
        if (elapsed > i * perChar + settleAfter) return ch;
        done = false;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      setDisplay(out.join(""));
      if (done) {
        setDisplay(text);
        frame.current = null;
        return;
      }
      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
  }, [text]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    timer.current = setTimeout(run, delay * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [run, delay]);

  return (
    <Tag
      className={className}
      onMouseEnter={scrambleOnHover ? run : undefined}
      // The real string stays available to assistive tech while glyphs churn.
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
