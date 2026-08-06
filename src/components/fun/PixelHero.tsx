"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Editorial hero with a pixel reveal, after Framer's "Premium Pixel Hero".
 *
 * An image sits underneath a grid of background-coloured tiles. Moving the
 * cursor clears the tiles nearest it, so the picture surfaces in a blocky
 * trail and re-covers itself a moment later. Each tile carries a fixed random
 * offset on its clear radius, which is what makes the edge read as jagged
 * pixels rather than a soft circle.
 *
 * The grid is ~500 nodes redrawn every frame, so opacity is written straight
 * to the DOM from a requestAnimationFrame loop. Routing that through React
 * state would re-render the whole grid on every mouse move.
 */

/**
 * Tiles are sized rather than counted, so they stay roughly square as the hero
 * changes shape. A fixed 32x18 grid would stretch into tall thin slivers on a
 * narrow phone.
 */
const TILE_PX = 46;
const MIN_COLS = 8;
const MAX_COLS = 44;
const MIN_ROWS = 6;
const MAX_ROWS = 28;

/** Matches the server-rendered grid until the first measurement lands. */
const INITIAL = { cols: 32, rows: 18 };

/** Clear radius as a fraction of hero height. */
const RADIUS = 0.3;
/** Per-frame easing — tiles clear fast and creep back slowly. */
const EASE_CLEAR = 0.34;
const EASE_COVER = 0.045;
/**
 * Veil for pointers that can't hover. Heavier than the hover reveal so the ink
 * headline stays legible without the contrast-flip logic, which only runs
 * while a cursor is actually tracking.
 */
const STATIC_COVER = 0.62;

/** Light-theme ink and paper. These are only the starting values — the real
 *  pair is read from the CSS tokens at runtime so the hero follows the theme
 *  toggle instead of assuming a white page. */
const INK = "#32404f";
const PAPER = "#fafcfd";

/** Channels out of any computed colour string. */
function rgbOf(value: string): [number, number, number] {
  const m = value.match(/\d+(\.\d+)?/g);
  return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : [0, 0, 0];
}

/** WCAG relative luminance from 0-255 sRGB channels. */
function luminance(r: number, g: number, b: number) {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

const L_INK = luminance(0x32, 0x40, 0x4f);
const L_PAPER = luminance(0xfa, 0xfc, 0xfd);
const contrast = (a: number, b: number) =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** The two type colours available, sorted by luminance rather than by name:
 *  in dark mode the *background* is the dark one, so "ink" and "paper" swap
 *  roles and the contrast maths has to follow. */
type Palette = {
  lBg: number;
  light: string;
  dark: string;
  lLight: number;
  lDark: number;
  lightRgb: string;
  darkRgb: string;
};

const LIGHT_PALETTE: Palette = {
  lBg: L_PAPER,
  light: PAPER,
  dark: INK,
  lLight: L_PAPER,
  lDark: L_INK,
  lightRgb: "250, 252, 253",
  darkRgb: "10, 14, 18",
};

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const bg = rgbOf(cs.getPropertyValue("--background"));
  const fg = rgbOf(cs.getPropertyValue("--foreground"));
  const lBg = luminance(...bg);
  const lFg = luminance(...fg);
  const bgIsLighter = lBg >= lFg;
  const str = (c: [number, number, number]) => c.join(", ");
  const hex = (c: [number, number, number]) => `rgb(${c.join(",")})`;

  return {
    lBg,
    light: hex(bgIsLighter ? bg : fg),
    dark: hex(bgIsLighter ? fg : bg),
    lLight: Math.max(lBg, lFg),
    lDark: Math.min(lBg, lFg),
    lightRgb: str(bgIsLighter ? bg : fg),
    darkRgb: str(bgIsLighter ? fg : bg),
  };
}

export function PixelHero({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cover = useRef<Float32Array | null>(null);
  const painted = useRef<Float32Array | null>(null);
  const jitter = useRef<Float32Array | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const frame = useRef<number | null>(null);

  /** Full-bleed layer that carries the colour. */
  const textRef = useRef<HTMLDivElement>(null);
  /** The type itself — what we actually sample behind. */
  const boundsRef = useRef<HTMLDivElement>(null);
  /** Mean luminance of the artwork behind each tile. */
  const tileLum = useRef<Float32Array | null>(null);
  /** Which tiles sit behind the headline block. */
  const textTiles = useRef<number[]>([]);
  const isLightText = useRef(false);
  /** Theme colours, refreshed whenever the toggle flips `data-theme`. */
  const palette = useRef<Palette>(LIGHT_PALETTE);

  const [grid, setGrid] = useState(INITIAL);
  const { cols: COLS, rows: ROWS } = grid;
  const TILES = COLS * ROWS;

  // Track the theme tokens. The tiles themselves are `bg-background` so they
  // recolour on their own; this is only for the contrast maths, which needs
  // the numeric luminances.
  useEffect(() => {
    const sync = () => {
      palette.current = readPalette();
      isLightText.current = false;
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  // Keep tiles square-ish across breakpoints and on resize.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const { width, height } = root.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const cols = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.round(width / TILE_PX)));
      const rows = Math.min(MAX_ROWS, Math.max(MIN_ROWS, Math.round(height / TILE_PX)));
      setGrid((prev) => (prev.cols === cols && prev.rows === rows ? prev : { cols, rows }));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  // Sample the artwork's luminance once per grid size. Drawing it into a
  // canvas exactly COLS x ROWS means each pixel is already the average of one
  // tile's worth of image, so no manual averaging is needed.
  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    const sample = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = COLS;
      canvas.height = ROWS;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Match object-cover so the sampled tiles line up with what's on screen.
      const scale = Math.max(COLS / img.width, ROWS / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (COLS - w) / 2, (ROWS - h) / 2, w, h);

      try {
        const { data } = ctx.getImageData(0, 0, COLS, ROWS);
        const lum = new Float32Array(TILES);
        for (let i = 0; i < TILES; i++) {
          lum[i] = luminance(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
        }
        tileLum.current = lum;
      } catch {
        // Tainted canvas — leave text at its default colour rather than guess.
        tileLum.current = null;
      }
    };

    if (img.complete && img.naturalWidth > 0) sample();
    else img.onload = sample;

    return () => {
      cancelled = true;
    };
  }, [image, COLS, ROWS, TILES]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const interactive =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Touch and reduced-motion visitors get the image at a fixed veil rather
    // than a blank panel they can never reveal.
    if (!interactive) {
      for (let i = 0; i < TILES; i++) {
        const tile = tileRefs.current[i];
        if (tile) tile.style.opacity = String(STATIC_COVER);
      }
      return;
    }

    cover.current = new Float32Array(TILES).fill(1);
    painted.current = new Float32Array(TILES).fill(1);

    // Random per tile, but only ever set on the client after mount, so the
    // server and client markup still agree.
    const j = new Float32Array(TILES);
    for (let i = 0; i < TILES; i++) j[i] = Math.random();
    jitter.current = j;

    // Which tiles sit behind the headline. Recomputed periodically because the
    // text reflows with the viewport even when the tile count doesn't change.
    const mapTextTiles = (rect: DOMRect) => {
      const el = boundsRef.current;
      if (!el || rect.width === 0 || rect.height === 0) return;
      const t = el.getBoundingClientRect();
      const x0 = (t.left - rect.left) / rect.width;
      const x1 = (t.right - rect.left) / rect.width;
      const y0 = (t.top - rect.top) / rect.height;
      const y1 = (t.bottom - rect.top) / rect.height;

      const hits: number[] = [];
      for (let r = 0; r < ROWS; r++) {
        const cy = (r + 0.5) / ROWS;
        if (cy < y0 || cy > y1) continue;
        for (let col = 0; col < COLS; col++) {
          const cx = (col + 0.5) / COLS;
          if (cx >= x0 && cx <= x1) hits.push(r * COLS + col);
        }
      }
      textTiles.current = hits;
    };

    // Keep the headline legible as the artwork surfaces.
    //
    // Colour alone can't do this: mid-reveal, one half of a line sits on paper
    // and the other on paint, and any single colour fails somewhere. So the
    // main mechanism is a halo in the *opposite* tone, faded in with the
    // reveal — invisible against paper, and a clean separator against paint.
    // The colour flip still happens, but only once the area behind the type is
    // genuinely dark overall.
    const updateTextColour = () => {
      const lum = tileLum.current;
      const c = cover.current;
      const el = textRef.current;
      const tiles = textTiles.current;
      if (!lum || !c || !el || tiles.length === 0) return;

      const p = palette.current;
      let sumLum = 0;
      let sumCover = 0;
      for (const i of tiles) {
        sumLum += c[i] * p.lBg + (1 - c[i]) * lum[i];
        sumCover += c[i];
      }
      const avg = sumLum / tiles.length;
      const reveal = 1 - sumCover / tiles.length;

      const cLight = contrast(p.lLight, avg);
      const cDark = contrast(p.lDark, avg);
      // Dead zone stops the colour flickering when the two are close.
      const want = isLightText.current ? !(cDark > cLight * 1.3) : cLight > cDark * 1.3;

      if (want !== isLightText.current) {
        isLightText.current = want;
        el.style.color = want ? p.light : p.dark;
      }

      // Ramp the halo in quickly — even a little exposed paint hurts legibility.
      const halo = Math.min(1, reveal * 2.6);
      if (halo < 0.02) {
        el.style.textShadow = "none";
        return;
      }
      const tone = want ? p.darkRgb : p.lightRgb;
      const a1 = (halo * 0.95).toFixed(2);
      const a2 = (halo * 0.75).toFixed(2);
      el.style.textShadow =
        `0 0 ${(3 + halo * 5).toFixed(1)}px rgba(${tone}, ${a1}), ` +
        `0 0 ${(10 + halo * 16).toFixed(1)}px rgba(${tone}, ${a2})`;
    };

    let ticks = 0;

    const tick = () => {
      const c = cover.current!;
      const p = painted.current!;
      const jt = jitter.current!;
      const ptr = pointer.current;
      const rect = root.getBoundingClientRect();
      const aspect = rect.height > 0 ? rect.width / rect.height : 1;

      if (ticks % 20 === 0) mapTextTiles(rect);
      ticks++;

      let settled = true;

      for (let r = 0; r < ROWS; r++) {
        for (let col = 0; col < COLS; col++) {
          const i = r * COLS + col;

          let target = 1;
          if (ptr.active) {
            // Work in height-normalised space so the cleared area stays round
            // regardless of the hero's aspect ratio.
            const dx = ((col + 0.5) / COLS - ptr.x) * aspect;
            const dy = (r + 0.5) / ROWS - ptr.y;
            const threshold = RADIUS * (0.45 + jt[i] * 0.85);
            if (Math.hypot(dx, dy) < threshold) target = 0;
          }

          const next =
            c[i] + (target - c[i]) * (target < c[i] ? EASE_CLEAR : EASE_COVER);
          c[i] = next;

          if (Math.abs(next - p[i]) > 0.004) {
            const tile = tileRefs.current[i];
            if (tile) tile.style.opacity = next.toFixed(3);
            p[i] = next;
            settled = false;
          }
        }
      }

      updateTextColour();

      // Idle when nothing is moving; the next pointer event restarts the loop.
      if (settled && !ptr.active) {
        frame.current = null;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
      start();
    };

    const onLeave = () => {
      pointer.current.active = false;
      start();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
    // Re-arm whenever the grid is re-measured; the buffers are sized to it.
  }, [COLS, ROWS, TILES]);

  return (
    <div
      ref={rootRef}
      className="border-foreground/10 relative w-full overflow-hidden border"
      style={{ height: "clamp(440px, 80vh, 880px)" }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Tile grid — background-coloured squares that clear to reveal the image. */}
      <div
        aria-hidden
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TILES }).map((_, i) => (
          <div
            key={`${COLS}x${ROWS}-${i}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="bg-background"
            style={{ opacity: 1 }}
          />
        ))}
      </div>

      {/* Editorial type, sitting above the grid. */}
      <div
        ref={textRef}
        className="pointer-events-none absolute inset-0 flex flex-col justify-center p-6 lg:p-12"
        style={{
          color: "var(--foreground)",
          transition: "color 0.25s ease-out, text-shadow 0.25s ease-out",
        }}
      >
        <div ref={boundsRef} className="max-w-[760px]">
          {children}
        </div>
      </div>
    </div>
  );
}
