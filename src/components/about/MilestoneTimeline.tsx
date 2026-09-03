"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { milestones } from "@/content/milestones";
import { certifications } from "@/content/skills";

/**
 * Draggable ruler of milestones.
 *
 * The ruler doesn't move — the *scale* under it does. `offset` is how far the
 * track has been pulled in px; the needle stays pinned at the centre and the
 * item nearest to it is the active one. Ticks are laid out in track space and
 * converted to screen space per frame, which is what lets the arc curve
 * respond to where a tick currently sits rather than where it lives.
 *
 * Items are evenly spaced rather than plotted on a date axis: the gaps carry
 * no meaning, so an even step keeps every label legible regardless of how
 * bunched the real dates are.
 *
 * Release snaps to the nearest item with an eased run rather than a CSS
 * transition, because the arc has to be recomputed on every frame of the snap
 * too — a transition would move the track without redrawing the curve.
 */

const STEP = 184; // px between items
const TICK_GAP = 23; // px between minor ticks
const TICK_MAX = 36; // px, tallest tick at dead centre
const ARC_DEPTH = 0.6; // 0 = flat ruler, 1 = strong curve
const SNAP_MS = 420;

/**
 * Vertical gap between the two label rows, in px.
 *
 * Must comfortably exceed a line of label text *plus* the arc's own vertical
 * drop, which differs between neighbours and so eats into the stagger toward
 * the edges. At 26 that margin ran out and adjacent labels grazed each other.
 */
const ROW_DROP = 42;

export type TimelineItem = {
  /** Sits under the ruler. */
  year: string;
  /** Sits above the ruler. */
  title: string;
  /** Animates in at the centre when the item becomes active. */
  description: string;
  /** Roles get a full-height tick and solid ink; certificates stay quieter. */
  kind: "role" | "certification";
  /** Optional line above the description — the issuer, for certificates. */
  meta?: string;
};

/** Ruler geometry at a given distance from the needle, normalised to 0..1. */
function arcAt(normalized: number) {
  const falloff = Math.min(1, Math.abs(normalized));
  const curve = falloff * falloff;
  return {
    height: TICK_MAX * (1 - 0.62 * curve),
    // Ticks drop away toward the edges, which is what reads as an arc.
    drop: ARC_DEPTH * 34 * curve,
    opacity: 1 - 0.75 * curve,
  };
}

function Timeline({ items, hint, label }: { items: TimelineItem[]; hint: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const maxOffset = (items.length - 1) * STEP;
  const active = Math.max(0, Math.min(items.length - 1, Math.round(offset / STEP)));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.clientWidth));
    observer.observe(el);
    setWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  // Eased run to a target offset. Held in a ref so a new snap cancels the one
  // in flight instead of the two fighting over `offset`.
  const raf = useRef<number | null>(null);
  const snapTo = useCallback((target: number) => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    const start = performance.now();
    let from = 0;
    setOffset((current) => {
      from = current;
      return current;
    });

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SNAP_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setOffset(from + (target - from) * eased);
      if (t < 1) raf.current = requestAnimationFrame(step);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      snapTo(Math.max(0, Math.min(items.length - 1, index)) * STEP);
    },
    [items.length, snapTo],
  );

  // Drag.
  const drag = useRef<{ x: number; from: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent) => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    drag.current = { x: event.clientX, from: offset };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current) return;
    const next = drag.current.from - (event.clientX - drag.current.x);
    // Rubber-banding past the ends, so the ruler feels bounded without
    // stopping dead against an invisible wall.
    const clamped =
      next < 0 ? next * 0.35 : next > maxOffset ? maxOffset + (next - maxOffset) * 0.35 : next;
    setOffset(clamped);
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    goTo(Math.round(offset / STEP));
  };

  // Wheel. Horizontal intent wins when a trackpad reports both axes.
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onWheel = (event: React.WheelEvent) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 1) return;
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    setOffset((current) => Math.max(-40, Math.min(maxOffset + 40, current + delta)));
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      setOffset((current) => {
        goTo(Math.round(current / STEP));
        return current;
      });
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, []);

  const center = width / 2;
  const half = center || 1;

  // Minor ticks, laid out in track space and culled to what's on screen.
  const ticks: { x: number; normalized: number }[] = [];
  if (width > 0) {
    const first = Math.floor((offset - center) / TICK_GAP);
    const last = Math.ceil((offset + center) / TICK_GAP);
    for (let i = first; i <= last; i++) {
      const x = i * TICK_GAP - offset + center;
      ticks.push({ x, normalized: (x - center) / half });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* The 32px label row every other labelled section on the site uses. A
          bare h4 here sat ~9px higher than "The roles" directly above it, so
          two stacked rulers didn't start on the same line. */}
      <div className="flex h-8 items-center">
        <h4>{hint}</h4>
      </div>

      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        role="group"
        aria-label={label}
        // overflow-hidden, not just the mask: the mask hides off-track items
        // visually but they still occupy layout and widen the page.
        className={`relative h-[320px] touch-pan-y overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          // Edge vignette — the ruler should dissolve rather than being cut.
          maskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
        }}
      >
        {/* Minor ticks. */}
        <div className="absolute inset-x-0 top-[146px]" aria-hidden>
          {ticks.map((tick, i) => {
            const { height, drop, opacity } = arcAt(tick.normalized);
            return (
              <span
                key={i}
                className="bg-foreground absolute w-px"
                style={{
                  left: tick.x,
                  top: drop,
                  height: height * 0.45,
                  opacity: opacity * 0.35,
                }}
              />
            );
          })}
        </div>

        {/* Items: taller tick, title above, year below. */}
        {width > 0 &&
          items.map((item, i) => {
            const x = i * STEP - offset + center;
            const normalized = (x - center) / half;
            if (Math.abs(x - center) > half + 200) return null;
            const { height, drop, opacity } = arcAt(normalized);
            const isActive = i === active;

            return (
              <button
                key={`${item.year}-${item.title}`}
                type="button"
                onClick={() => goTo(i)}
                aria-current={isActive ? "true" : undefined}
                data-cursor="pointer"
                className="absolute top-[146px] -translate-x-1/2 cursor-pointer bg-transparent"
                style={{ left: x, opacity: Math.max(0.15, opacity) }}
              >
                <span className="sr-only">
                  {item.title}, {item.year}
                </span>

                {/* Labels alternate between two rows. A single row can only
                    hold STEP-worth of text before neighbours collide, and
                    certificate names are far longer than that; staggering
                    gives each label two steps of clear width. */}
                <span
                  aria-hidden
                  className="absolute bottom-[26px] left-1/2 block max-w-[320px] truncate"
                  style={{
                    transform: `translate(-50%, ${drop - (i % 2 === 0 ? ROW_DROP : 0)}px)`,
                  }}
                >
                  <span
                    className={`text-[13px] transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : item.kind === "role"
                          ? "text-foreground/70"
                          : "text-foreground-light"
                    }`}
                  >
                    {item.title}
                  </span>
                </span>

                {/* Leader line down to the ruler, so a staggered label still
                    reads as belonging to its own tick. */}
                {i % 2 === 0 ? (
                  <span
                    aria-hidden
                    className="bg-foreground/15 absolute left-1/2 w-px -translate-x-1/2"
                    style={{ top: drop - ROW_DROP + 4, height: ROW_DROP - 2 }}
                  />
                ) : null}

                <span
                  aria-hidden
                  className={`absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${
                    isActive
                      ? "bg-primary"
                      : item.kind === "role"
                        ? "bg-foreground/60"
                        : "bg-foreground/30"
                  }`}
                  style={{ top: drop, height: item.kind === "role" ? height : height * 0.55 }}
                />

                <span
                  aria-hidden
                  className="absolute top-[52px] left-1/2 font-mono text-[12px] whitespace-nowrap"
                  style={{ transform: `translate(-50%, ${drop}px)` }}
                >
                  <span className={isActive ? "text-primary" : "text-foreground-light"}>
                    {item.year}
                  </span>
                </span>
              </button>
            );
          })}

        {/* Needle. Pinned to the centre — the scale moves under it. */}
        <div
          aria-hidden
          className="bg-primary absolute top-[136px] left-1/2 h-[56px] w-[2px] -translate-x-1/2"
          style={{ boxShadow: "0 0 12px 1px var(--primary)" }}
        />

        {/* Description, swapped as the active item changes. */}
        <div className="absolute inset-x-0 top-[248px] flex justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex max-w-[52ch] flex-col items-center gap-2 text-center"
            >
              {items[active].meta ? (
                <h4 className="text-primary!">{items[active].meta}</h4>
              ) : null}
              <p>{items[active].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* The visible ruler is aria-hidden fragments; this is the same story as
          a plain list for anyone not using a pointer. */}
      <ol className="sr-only">
        {items.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            {item.year} — {item.title}. {item.description}
          </li>
        ))}
      </ol>
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04" → "Apr 2026". */
function formatIssued(issued: string) {
  const [year, month] = issued.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function MilestoneTimeline() {
  const items: TimelineItem[] = milestones.map((m) => ({
    year: m.year,
    title: m.title,
    description: m.description,
    kind: "role" as const,
  }));

  return <Timeline items={items} hint="The roles" label="Career timeline" />;
}

export function CertificationTimeline() {
  // Oldest first, so both rulers run the same direction and the two can be
  // read against each other.
  const items: TimelineItem[] = [...certifications]
    .sort((a, b) => a.issued.localeCompare(b.issued))
    .map((cert) => ({
      year: formatIssued(cert.issued),
      title: cert.name,
      description: cert.note,
      kind: "certification" as const,
      meta: cert.issuer,
    }));

  return <Timeline items={items} hint="The upskilling" label="Certifications timeline" />;
}
