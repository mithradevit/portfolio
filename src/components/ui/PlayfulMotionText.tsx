"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Text whose letters shift, tilt and swell as the cursor passes over them.
 *
 * Positions are measured once against the container's own box (offsetLeft, not
 * getBoundingClientRect) so scrolling never invalidates them — only a resize
 * or a font swap does. The pointer is sampled into a rAF-batched state update,
 * so a fast sweep across the line costs one render per frame rather than one
 * per mousemove event.
 *
 * Per-letter variation is hashed from the letter's index rather than
 * Math.random: a random direction chosen at render time would differ between
 * the server and client pass and trip a hydration mismatch.
 */

type Direction = "random" | "up-down" | "left-right";
type ReturnStyle = "smooth" | "snap" | "bounce";

export type Segment = { text: string; className?: string };

const RETURN_TRANSITIONS: Record<ReturnStyle, object> = {
  smooth: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
  snap: { type: "spring", stiffness: 700, damping: 40, mass: 0.5 },
  bounce: { type: "spring", stiffness: 320, damping: 11, mass: 0.9 },
};

/** Deterministic −1..1 from an integer seed. */
function jitter(seed: number) {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

type Char = { char: string; className?: string; seed: number };

export function PlayfulMotionText({
  segments,
  className,
  /** How far from a letter the cursor starts affecting it, in px. */
  radius = 90,
  /** Peak displacement in px. */
  move = 22,
  /** Peak rotation in degrees. */
  rotate = 14,
  /** Peak scale multiplier. */
  scale = 1.12,
  direction = "random",
  returnStyle = "smooth",
  /** Seconds of delay added per letter of distance from the cursor. */
  stagger = 0.012,
}: {
  segments: Segment[];
  className?: string;
  radius?: number;
  move?: number;
  rotate?: number;
  scale?: number;
  direction?: Direction;
  returnStyle?: ReturnStyle;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [centers, setCenters] = useState<{ x: number; y: number }[]>([]);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);

  // Flatten to characters, remembering which segment each came from so the
  // accent word keeps its own styling while still animating per letter.
  const chars: Char[] = [];
  segments.forEach((segment) => {
    for (const char of segment.text) {
      chars.push({ char, className: segment.className, seed: chars.length });
    }
  });

  useEffect(() => {
    // Coarse pointers have no hover, and reduced-motion users opted out.
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const letters = el.querySelectorAll<HTMLElement>("[data-letter]");
      setCenters(
        Array.from(letters, (letter) => ({
          x: letter.offsetLeft + letter.offsetWidth / 2,
          y: letter.offsetTop + letter.offsetHeight / 2,
        })),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    // Web fonts land after first paint and reflow every letter.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [enabled, segments]);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let frame: number | null = null;
    let latest: { x: number; y: number } | null = null;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      latest = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setPointer(latest);
      });
    };

    const onLeave = () => setPointer(null);

    // Listening on the window rather than the element gives the proximity
    // mode its reach — the effect should start before the cursor arrives.
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  const renderLetter = (item: Char, i: number) => {
    if (item.char === " ") {
      return (
        <span key={i} data-letter aria-hidden className="inline-block">
          &nbsp;
        </span>
      );
    }

    const center = centers[i];
    let strength = 0;
    let dx = 0;
    let dy = 0;

    if (enabled && pointer && center) {
      const distX = pointer.x - center.x;
      const distY = pointer.y - center.y;
      const distance = Math.hypot(distX, distY);
      if (distance < radius) {
        // Falls off smoothly to nothing at the radius edge, so letters
        // settle rather than snapping back when the cursor leaves range.
        strength = 1 - distance / radius;
        const away = distance === 0 ? 1 : -1 / distance;
        dx = distX * away;
        dy = distY * away;
      }
    }

    if (direction === "up-down") dx = 0;
    if (direction === "left-right") dy = 0;

    const wobble = jitter(item.seed);
    const eased = strength * strength;

    return (
      <motion.span
        key={i}
        data-letter
        aria-hidden
        className={`inline-block will-change-transform ${item.className ?? ""}`}
        animate={{
          x: dx * move * eased,
          y: dy * move * eased,
          rotate: wobble * rotate * eased,
          scale: 1 + (scale - 1) * eased,
        }}
        transition={{
          ...RETURN_TRANSITIONS[returnStyle],
          delay: strength > 0 ? (1 - strength) * stagger : 0,
        }}
      >
        {item.char}
      </motion.span>
    );
  };

  // Each letter is its own inline-block box, which gives the browser a line-
  // break opportunity between every pair of letters — not just at spaces —
  // and it takes those opportunities, splitting words mid-letter. Grouping
  // consecutive non-space letters into a `whitespace-nowrap` word wrapper
  // keeps the per-letter animation exactly as it was, but confines line
  // breaks to the spaces between words, same as ordinary text.
  const words: Char[][] = [[]];
  chars.forEach((item) => {
    if (item.char === " ") words.push([]);
    else words[words.length - 1].push(item);
  });

  let cursor = 0;
  const rendered = words.map((word, w) => {
    const startsAt = cursor;
    cursor += word.length;
    const isLast = w === words.length - 1;
    const space = isLast ? null : chars[cursor++];
    return (
      <span key={w} className="inline-block whitespace-nowrap">
        {word.map((item, j) => renderLetter(item, startsAt + j))}
        {space && renderLetter(space, cursor - 1)}
      </span>
    );
  });

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {rendered}

      {/* The visible letters are aria-hidden fragments; this carries the real
          sentence for assistive tech and for text selection fallbacks. */}
      <span className="sr-only">{segments.map((s) => s.text).join("")}</span>
    </span>
  );
}
