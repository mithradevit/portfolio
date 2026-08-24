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
  /**
   * Wait until the text is actually on screen before decoding it.
   *
   * Without this the effect fires on mount, so anything below the fold has
   * finished resolving long before it is scrolled to and the reader only ever
   * sees the settled string. `delay` still applies, measured from the moment
   * the element enters view rather than from page load, so a group of labels
   * can stagger as it arrives.
   */
  scrambleInView = false,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  delay?: number;
  scrambleOnHover?: boolean;
  scrambleInView?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const hostRef = useRef<HTMLElement>(null);
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

    const cleanup = () => {
      if (timer.current) clearTimeout(timer.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };

    if (!scrambleInView) {
      timer.current = setTimeout(run, delay * 1000);
      return cleanup;
    }

    const el = hostRef.current;
    if (!el) return cleanup;

    // Fires once. A label that re-scrambled every time it crossed the edge of
    // the screen would be a flicker on the way back up, not an entrance.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer.current = setTimeout(run, delay * 1000);
      },
      // A small margin so the decode starts just before the line clears the
      // bottom edge, rather than after the reader is already looking at it.
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [run, delay, scrambleInView]);

  return (
    <Tag
      ref={hostRef as React.Ref<HTMLHeadingElement>}
      className={className}
      onMouseEnter={scrambleOnHover ? run : undefined}
      // The real string stays available to assistive tech while glyphs churn.
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
