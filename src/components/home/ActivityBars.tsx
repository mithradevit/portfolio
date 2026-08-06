"use client";

import { useEffect, useState } from "react";

export type Bucket = { date: string; count: number };

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Uniform-height bars where intensity is carried by colour, not height — the
 * same read as a contribution graph, where a taller bar would imply a
 * different axis than the one actually being encoded.
 *
 * Split from ActivityStrip because the entrance stagger and hover state need
 * the client, while the data fetch stays on the server.
 */
export function ActivityBars({ buckets }: { buckets: Bucket[] }) {
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const peak = Math.max(1, ...buckets.map((b) => b.count));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      setSettled(true);
      return;
    }
    const frame = requestAnimationFrame(() => setShown(true));
    // Once the staggered entrance is done, drop the per-bar delay — otherwise
    // it would also delay every hover transition and make them feel laggy.
    const timer = setTimeout(() => setSettled(true), 1100);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  const active = hovered === null ? null : buckets[hovered];

  return (
    <div className="relative" onMouseLeave={() => setHovered(null)}>
      {active && (
        <div
          className="bg-foreground text-background pointer-events-none absolute bottom-full z-10 mb-2 -translate-x-1/2 rounded-md px-2.5 py-1.5 font-mono text-[11px] tracking-wide whitespace-nowrap uppercase shadow-md"
          style={{ left: `${((hovered! + 0.5) / buckets.length) * 100}%` }}
        >
          {formatDay(active.date)}: {active.count} contribution
          {active.count === 1 ? "" : "s"}
        </div>
      )}

      <div className="flex h-8 items-stretch gap-[3px]">
        {buckets.map((b, i) => {
          const level = b.count === 0 ? 0 : Math.ceil((b.count / peak) * 4);
          const base = level === 0 ? 0.13 : 0.3 + level * 0.175;
          const isHovered = hovered === i;
          return (
            <div
              key={b.date}
              onMouseEnter={() => setHovered(i)}
              className="flex-1 origin-bottom rounded-[3px] transition-all ease-out"
              style={{
                backgroundColor: level === 0 ? "var(--color-foreground)" : "var(--color-primary)",
                opacity: shown ? (isHovered ? 1 : base) : 0,
                transform: shown
                  ? isHovered
                    ? "scaleY(1.18) scaleX(1.35)"
                    : "scaleY(1)"
                  : "scaleY(0.35)",
                transitionDuration: settled ? "200ms" : "460ms",
                transitionDelay: settled ? "0ms" : `${Math.min(i * 16, 480)}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
