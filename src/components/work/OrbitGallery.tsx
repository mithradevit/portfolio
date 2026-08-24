"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * A 3D carousel: images orbit a tilted ellipse, continuously, with depth.
 *
 * The maths is one function — `frameFor` — evaluated per image per frame:
 *
 *   depth  = sin(angle)      how far toward or away from the viewer it sits
 *   x      = r·cos(angle) + r·depth·xTilt   the ellipse, sheared by depth
 *   y      = r·depth·yTilt                  which is what tilts it in 3D
 *
 * Everything else is derived from `depth`, so the ordering never contradicts
 * itself: the nearest image is simultaneously the largest, the sharpest, the
 * most opaque and the one on top. Deriving all four from a single term is the
 * reason this reads as depth rather than as four unrelated animations.
 *
 * Positions are written straight to the DOM inside the rAF loop, never through
 * React state. A state update per frame would re-render sixty times a second
 * and reset each element to its declared pose, which shows up as a stutter.
 */

export type OrbitImage = {
  src: string;
  alt: string;
  /** Optional — turns the image into a link, keyboard-reachable. */
  href?: string;
};

/** Below this, a press counts as a click rather than a drag. */
const DRAG_THRESHOLD = 5;
/** Per-frame multiplier applied to leftover velocity after release. */
const MOMENTUM_DECAY = 0.94;
/** Coasting stops here rather than crawling toward zero forever. */
const MOMENTUM_FLOOR = 0.0005;
const DEG = Math.PI / 180;

/** How many blocks fit across a dimension at the requested block size. */
function blockCount(size: number, pixelSize: number) {
  return Math.max(1, Math.round(size / Math.max(2, pixelSize)));
}

/**
 * Draws `src` cover-cropped into the canvas's own tiny pixel buffer.
 *
 * The canvas is only `blocksX × blocksY` pixels and is then stretched to full
 * size by CSS. That is what actually produces hard blocks: scaling a normal
 * <img> up with a transform gets smoothed by the compositor no matter what
 * `image-rendering` says, because the source still has all its detail.
 */
function drawPixelated(canvas: HTMLCanvasElement, src: string, blocksX: number, blocksY: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const img = new Image();
  img.onload = () => {
    canvas.width = blocksX;
    canvas.height = blocksY;
    // Cover-crop by hand — `object-fit` has no equivalent on a canvas draw.
    const srcAspect = img.naturalWidth / img.naturalHeight;
    const dstAspect = blocksX / blocksY;
    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;
    if (srcAspect > dstAspect) {
      sw = img.naturalHeight * dstAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / dstAspect;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };
  img.src = src;
}

function frameFor(
  angleDeg: number,
  radius: number,
  xTilt: number,
  yTilt: number,
  curved: boolean,
) {
  const rad = angleDeg * DEG;
  const depth = Math.sin(rad);
  // 0 at the far side of the orbit, 1 at the near side.
  const nearness = (depth + 1) / 2;

  return {
    x: radius * Math.cos(rad) + radius * depth * xTilt * 0.6,
    y: radius * depth * yTilt * 0.6,
    scale: curved ? 0.55 + nearness * 0.8 : 1,
    zIndex: Math.round(depth * 1000) + 1000,
    blurAmount: 1 - nearness,
    opacity: 0.82 + nearness * 0.18,
  };
}

export function OrbitGallery({
  images,
  itemWidth = 150,
  itemHeight = 150,
  /** Degrees per second at speed 1; the ambient drift. */
  speed = 3,
  direction = "anticlockwise",
  /** Orbit diameter as a percentage of the container's width. */
  orbitWidth = 60,
  /** Tilt of the ellipse, in degrees, on each axis. */
  xCurve = -90,
  yCurve = -90,
  curved = true,
  depthEffect = "pixelate",
  maxBlur = 6,
  pixelSize = 14,
  rounded = 3,
  referenceWidth = 840,
  referenceHeight = 360,
  maxFit = 1,
  className,
}: {
  images: OrbitImage[];
  itemWidth?: number;
  itemHeight?: number;
  speed?: number;
  direction?: "clockwise" | "anticlockwise";
  orbitWidth?: number;
  xCurve?: number;
  yCurve?: number;
  curved?: boolean;
  /** How distance is expressed: softened, blocky, or not at all. */
  depthEffect?: "none" | "blur" | "pixelate";
  maxBlur?: number;
  /** Block size in px for the pixelate effect — larger is blockier. */
  pixelSize?: number;
  /** 0–20, applied as a percentage radius so it scales with the item. */
  rounded?: number;
  /** Width at which `itemWidth`/`itemHeight` are taken literally; below it
   *  they scale down in proportion. */
  referenceWidth?: number;
  /** Height at which the item sizes are taken literally. Below it they scale
   *  down in proportion, the same way `referenceWidth` handles narrow
   *  containers. */
  referenceHeight?: number;
  /** Ceiling on the scale factor. 1 means the reference size is also the
   *  maximum; above 1 the composition grows on large displays instead of
   *  sitting at a fixed size in the middle of an empty canvas. */
  maxFit?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [containerWidth, setContainerWidth] = useState(600);
  const [containerHeight, setContainerHeight] = useState(360);

  // Refs, not state — see the component note above.
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  /** Set by the animation effect so the pointer handler can repaint mid-drag. */
  const layoutRef = useRef<((angle: number) => void) | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const count = images.length;
  const radius = (containerWidth * orbitWidth) / 100 / 2;
  // The orbit radius is a percentage of the container, but item sizes are px.
  // Left alone, a phone gets a small orbit carrying full-size tiles, which
  // overlap into a pile. Scaling the tiles by the same factor keeps the
  // composition identical at every width instead of merely smaller.
  // Height counts as well as width. Width alone meant a short viewport kept
  // full-size tiles inside a squat box, and since the nearest tile is scaled
  // up past 1 it overhung the top of the box and ran under the header. Taking
  // the smaller of the two factors keeps the whole composition in proportion
  // rather than only its horizontal spread.
  const fit = Math.min(
    maxFit,
    containerWidth / referenceWidth,
    containerHeight / referenceHeight,
  );
  const itemW = itemWidth * fit;
  const itemH = itemHeight * fit;
  const spin = direction === "clockwise" ? 1 : -1;
  const xTilt = Math.sin(xCurve * DEG);
  const yTilt = Math.sin(yCurve * DEG);
  // Block grid from the scaled size, so the blocks stay the same visual size
  // on a phone rather than getting finer as the tiles shrink.
  const blocksX = blockCount(itemW, pixelSize);
  const blocksY = blockCount(itemH, pixelSize);
  // Percentage rather than px, so the corner keeps its proportion whatever
  // size the items are set to.
  const borderRadius = `${Math.min(Math.max(rounded, 0), 20) * 2.5}%`;

  // Render each image once into its low-res buffer. Re-runs only if the block
  // grid or the sources change — not every frame, where it would be ruinous.
  useEffect(() => {
    if (depthEffect !== "pixelate") return;
    images.forEach((image, i) => {
      const canvas = canvasRefs.current[i];
      if (canvas) drawPixelated(canvas, image.src, blocksX, blocksY);
    });
  }, [depthEffect, blocksX, blocksY, images]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setContainerWidth(entry.contentRect.width);
      setContainerHeight(entry.contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Off-screen, the loop keeps running but skips the per-item maths and style
  // writes. Cheaper than tearing the loop down and rebuilding it on re-entry.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) visibleRef.current = entry.isIntersecting;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedRef.current = media.matches;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const layout = (angle: number) => {
      for (let i = 0; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const frame = frameFor((360 / count) * i + angle, radius, xTilt, yTilt, curved);
        el.style.transform = `translate3d(${frame.x}px, ${frame.y}px, 0) scale(${frame.scale})`;
        el.style.zIndex = String(frame.zIndex);
        el.style.opacity = String(frame.opacity);

        if (depthEffect === "blur") {
          const blur = frame.blurAmount * maxBlur;
          el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
        } else {
          el.style.filter = "none";
        }

        if (depthEffect === "pixelate") {
          // Cross-fade the blocky copy over the sharp one: fully opaque at the
          // back of the orbit, gone by the time the image reaches the front.
          const canvas = canvasRefs.current[i];
          if (canvas) canvas.style.opacity = String(frame.blurAmount);
        }
      }
    };

    layout(angleRef.current);
    layoutRef.current = layout;

    let last: number | null = null;
    let raf = requestAnimationFrame(function tick(time) {
      if (last === null) last = time;
      const delta = (time - last) / 1000;
      last = time;

      const coasting = Math.abs(momentumRef.current) > MOMENTUM_FLOOR;
      if (!visibleRef.current && !draggingRef.current && !coasting) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (draggingRef.current) {
        // Already advanced by the pointer handler.
      } else if (coasting) {
        angleRef.current += momentumRef.current * 1000 * delta;
        // Normalised to 60fps so the glide feels the same on any refresh rate.
        momentumRef.current *= Math.pow(MOMENTUM_DECAY, Math.max(delta, 0.001) * 60);
      } else if (speed !== 0 && !reducedRef.current) {
        // Ambient drift only. Drag and its momentum stay available under
        // reduced motion, because that motion is the visitor's own doing.
        angleRef.current += spin * speed * 12 * delta;
      }

      layout(angleRef.current);
      raf = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(raf);
  }, [count, radius, xTilt, yTilt, curved, depthEffect, maxBlur, speed, spin]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    momentumRef.current = 0;
    velocityRef.current = 0;
    dragDistanceRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(now - lastTimeRef.current, 1);
    // Convert a horizontal drag into rotation: how far the pointer travelled
    // relative to the orbit's radius is the angle swept, so the image under
    // the finger keeps pace with it rather than sliding out from under.
    const dTheta = (dx / Math.max(radius, 1)) * (180 / Math.PI);

    angleRef.current += dTheta;
    velocityRef.current = dTheta / dt;
    dragDistanceRef.current += Math.abs(dx);
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    layoutRef.current?.(angleRef.current);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    momentumRef.current = velocityRef.current;
  };

  // A drag that ends over a link should not also open it.
  const activate = (href?: string) => {
    if (!href) return;
    if (dragDistanceRef.current > DRAG_THRESHOLD) {
      dragDistanceRef.current = 0;
      return;
    }
    window.location.href = href;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      className={className}
      // `isolation: isolate` is the whole fix for the tiles covering the header
      // and the chat panel. Each tile carries a computed z-index in the 1000–2000
      // range — that is how the orbit decides which tile is in front of which —
      // and without a stacking context of its own those numbers competed with
      // the rest of the page, where the header is z-50 and the chat panel z-70.
      // Isolating turns them into a private scale: they still order each other
      // exactly as before, but the whole gallery now sits at z-0 against
      // everything outside it.
      style={{
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
        touchAction: "none",
        cursor: "grab",
      }}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
        {images.map((image, i) => {
          const initial = frameFor((360 / count) * i, radius, xTilt, yTilt, curved);
          const blur = depthEffect === "blur" ? initial.blurAmount * maxBlur : 0;
          return (
            <div
              key={image.src}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              role={image.href ? "link" : undefined}
              tabIndex={image.href ? 0 : undefined}
              onClick={image.href ? () => activate(image.href) : undefined}
              onKeyDown={
                image.href
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        activate(image.href);
                      }
                    }
                  : undefined
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: itemW,
                height: itemH,
                marginLeft: -itemW / 2,
                marginTop: -itemH / 2,
                borderRadius,
                overflow: "hidden",
                willChange: "transform, filter, opacity",
                cursor: image.href ? "pointer" : "grab",
                transform: `translate3d(${initial.x}px, ${initial.y}px, 0) scale(${initial.scale})`,
                zIndex: initial.zIndex,
                opacity: initial.opacity,
                filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none",
              }}
            >
              {/* A plain <img>, deliberately: next/image wraps the element in
                  its own positioned span, which fights the absolute layout
                  this component applies, and these are already small,
                  pre-optimised WebP files. */}
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              {depthEffect === "pixelate" && (
                <canvas
                  ref={(node) => {
                    canvasRefs.current[i] = node;
                  }}
                  width={blocksX}
                  height={blocksY}
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    // Without this the browser smooths the upscale and the
                    // blocks turn back into a blur.
                    imageRendering: "pixelated",
                    pointerEvents: "none",
                    opacity: initial.blurAmount,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
