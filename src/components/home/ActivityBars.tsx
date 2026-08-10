"use client";

import { useEffect, useState } from "react";
import type { ActivityLogEntry } from "@/content/activityLog";

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

/** Where the pill anchors relative to its bar, so wider content never runs past the container's edge. */
function anchorFor(index: number, total: number): "start" | "center" | "end" {
  const position = index / (total - 1);
  if (position < 0.22) return "start";
  if (position > 0.78) return "end";
  return "center";
}

/**
 * Uniform-height bars where intensity is carried by colour, not height — the
 * same read as a contribution graph, where a taller bar would imply a
 * different axis than the one actually being encoded.
 *
 * Split from ActivityStrip because the entrance stagger and hover state need
 * the client, while the data fetch stays on the server.
 */
export function ActivityBars({
  buckets,
  log = null,
  compact = false,
}: {
  buckets: Bucket[];
  /** Per-day detail, aligned by index with `buckets`. Falls back to the plain
   *  date/count pill when absent — the GitHub-events path has no log. */
  log?: (ActivityLogEntry | null)[] | null;
  /** Shorter bars for tight spaces — same data, same behaviour, less height. */
  compact?: boolean;
}) {
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
  const activeEntry = hovered === null || !log ? null : log[hovered];
  const anchor = hovered === null ? "center" : anchorFor(hovered, buckets.length);

  // Same pill on every path — dark fill, mono, rounded, shadow — just longer
  // and wrapping instead of a fixed one-liner once there's a sentence in it.
  // text-[11px]! : globals.css sets `h4, p { font-size: 15px }` unlayered,
  // which beats a plain Tailwind size utility the same way it beat colour
  // above — every text-size utility in this pill needs the same suffix.
  const pillClass = `pointer-events-none absolute bottom-full z-10 mb-1.5 rounded-md bg-foreground text-background px-2 py-1 font-mono text-[10px]! shadow-md ${
    anchor === "start" ? "left-0" : anchor === "end" ? "right-0" : "left-1/2 -translate-x-1/2"
  }`;

  return (
    <div className="relative" onMouseLeave={() => setHovered(null)}>
      {active &&
        (log ? (
          // `!` on every colour AND size utility on these <p> tags: the
          // parent's own `!important` doesn't inherit down — each <p> is a
          // direct match for globals.css's unlayered `p { color; font-size }`
          // rule, so each one needs to out-rank that rule for itself.
          <div className={`${pillClass} w-[190px] leading-snug normal-case`}>
            {activeEntry ? (
              <>
                <p className="text-background/60! text-[10px]! tracking-wide uppercase">
                  Day {String(activeEntry.day).padStart(2, "0")} · {activeEntry.type}
                </p>
                <p className="text-background! text-[11px]! mt-0.5">{activeEntry.activity}</p>
              </>
            ) : (
              <p className="text-background/60! text-[10px]! tracking-wide uppercase">
                Nothing logged
              </p>
            )}
          </div>
        ) : (
          <div className={`${pillClass} tracking-wide whitespace-nowrap uppercase`}>
            {formatDay(active.date)}: {active.count} contribution
            {active.count === 1 ? "" : "s"}
          </div>
        ))}

      <div className={`flex items-stretch gap-[3px] ${compact ? "h-5" : "h-8"}`}>
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
