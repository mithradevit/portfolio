"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/content/about";

/**
 * A 3D arc carousel.
 *
 * Cards sit on a parabola rather than a straight line: horizontal position is
 * linear in the distance from centre, vertical position is that distance
 * squared, and each card is rotated to the arc's tangent at its own point.
 * Doing the rotation from the tangent — rather than picking angles by eye — is
 * what stops the fan looking hand-placed.
 *
 * The index is a float, not an integer, so dragging moves the whole arc
 * continuously and settling is just a transition on the same value.
 */

const CARD_W = 190;
const CARD_H = 250;
const GAP = 118; // horizontal step between neighbours
const CURVE = 26; // how far the arc drops per unit of distance²
const TANGENT = 9; // degrees of rotation per unit of distance
const VISIBLE = 4; // cards drawn either side of centre

/** Shortest signed distance from `i` to `active` on a ring of `n`. */
function ringDelta(i: number, active: number, n: number) {
  let d = i - active;
  while (d > n / 2) d -= n;
  while (d < -n / 2) d += n;
  return d;
}

export function ArcCarousel() {
  const items = about.gallery;
  const n = items.length;

  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startActive: number } | null>(null);

  // Wrap to a positive index so the slider and the ring maths agree.
  const wrapped = ((active % n) + n) % n;

  useEffect(() => {
    if (!dragging) return;

    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.startX;
      setActive(drag.current.startActive - dx / GAP);
    };
    const up = () => {
      setDragging(false);
      drag.current = null;
      // Snap to the nearest card once the finger lifts.
      setActive((a) => Math.round(a));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          drag.current = { startX: e.clientX, startActive: active };
          setDragging(true);
        }}
        className="relative w-full touch-pan-y overflow-hidden select-none"
        style={{
          height: CARD_H + CURVE * 6,
          perspective: 1200,
          // Wing cards run past the viewport on a phone; fade them out at the
          // edges rather than letting them cause a horizontal scrollbar.
          maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
        role="group"
        aria-label="Photo carousel"
      >
        {items.map((item, i) => {
          const d = ringDelta(i, active, n);
          const dist = Math.abs(d);
          if (dist > VISIBLE) return null;

          const x = d * GAP;
          const y = CURVE * d * d;
          const rotate = d * TANGENT;
          const scale = Math.max(0.6, 1 - dist * 0.11);
          const isCentre = dist < 0.5;

          return (
            <div
              key={`${item.label}-${i}`}
              aria-hidden={!isCentre}
              className="absolute top-1/2 left-1/2"
              style={{
                width: CARD_W,
                height: CARD_H,
                // Centre the card first, then place it on the arc.
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${-dist * 60}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex: 100 - Math.round(dist * 10),
                opacity: Math.max(0, 1 - dist * 0.18),
                // No transition while dragging — the pointer is the clock.
                transition: dragging
                  ? "none"
                  : "transform 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 620ms ease-out",
              }}
            >
              <div
                className="border-foreground/10 bg-foreground/5 relative h-full w-full overflow-hidden rounded-2xl border"
                style={{
                  boxShadow: isCentre
                    ? "0 18px 50px -12px rgb(50 64 79 / 28%)"
                    : "0 8px 24px -14px rgb(50 64 79 / 22%)",
                }}
              >
                {item.src ? (
                  // Inner scale gives the parallax: the image drifts against
                  // its frame as the card moves off-centre.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt || item.label}
                    className="h-full w-full object-cover"
                    style={{
                      transform: `scale(1.12) translateX(${d * -14}px)`,
                      transition: dragging ? "none" : "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    draggable={false}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <h4 className="text-center">{item.label}</h4>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider doubles as the keyboard control — dragging a 3D arc is not
          something you can do without a pointer. */}
      <label className="flex w-full max-w-[320px] items-center gap-3">
        <span className="sr-only">Move through the carousel</span>
        <input
          type="range"
          min={0}
          max={n - 1}
          step={1}
          value={Math.round(wrapped)}
          onChange={(e) => setActive(Number(e.target.value))}
          data-cursor="pointer"
          className="accent-primary bg-foreground/10 h-1 w-full cursor-pointer appearance-none rounded-full"
        />
      </label>
    </div>
  );
}
