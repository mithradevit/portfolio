"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { about } from "@/content/about";

/**
 * About hero: a macOS-style window holding the photo, with the bio beside it.
 *
 * The window frame is drawn from the theme tokens rather than fixed greys, so
 * it reads as a pane of the page in both light and dark. Only the traffic
 * lights keep their literal colours — that's the one part the metaphor needs.
 *
 * An empty `src` renders a placeholder tile instead of a broken image, so the
 * layout is finished and reviewable before the photos exist.
 */

const { hero } = about;

/** How long each photo holds before the strip moves on, and the crossfade. */
const HOLD_MS = 4000;
const FADE_S = 0.6;

export function ProfileWindow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const photo = hero.photos[active];
  const count = hero.photos.length;

  // A timeout keyed on `active` rather than one long-lived interval: clicking
  // a thumbnail changes `active`, which tears this down and starts a fresh
  // full-length hold. With an interval the click could land a moment before
  // the next tick and the chosen photo would flash past.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => setActive((i) => (i + 1) % count), HOLD_MS);
    return () => clearTimeout(id);
  }, [active, paused, count]);

  return (
    // Centred composition, not a full-bleed row. The page shell is 1800px
    // wide; letting this fold use all of it pushes the two halves apart and
    // stretches the body copy past a readable measure. 1040px with a 100px
    // gutter is the proportion the reference holds.
    <div className="mx-auto grid w-full max-w-[1040px] grid-cols-1 items-center gap-10 lg:grid-cols-[460px_1fr] lg:gap-[100px]">
      {/* Window.
          Hovering or tabbing into the window holds the current photo. Someone
          reaching for a thumbnail is looking at this one, and having it swap
          out from under the cursor is the whole reason auto-advancing
          carousels feel hostile. */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="border-foreground/[0.08] bg-background flex h-[460px] w-full flex-col overflow-hidden rounded-[14px] border shadow-[inset_0_1px_0_rgb(255_255_255_/_80%),0_2px_6px_rgb(50_64_79_/_6%),0_8px_20px_rgb(50_64_79_/_8%)]"
      >
        {/* Chrome. */}
        <div className="border-foreground/[0.08] bg-foreground/[0.04] flex shrink-0 items-center gap-2 border-b px-3.5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/60" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/60" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/60" />
        </div>

        {/* Photo. Every source is pre-cropped to the same 4:3, then centred
            with `object-position: center` explicitly — the earlier version
            let sharp's attention heuristic pick the crop per-photo, which
            put a different part of each image at centre and read as
            inconsistent switching between them. A plain centre crop, aligned
            the same way every time, is what makes six different photos feel
            like one steady frame. */}
        {/* Crossfade rather than a cut. `AnimatePresence` without `mode` keeps
            both frames mounted through the transition, so the outgoing photo
            fades under the incoming one and the window is never briefly empty.
            `initial={false}` suppresses the fade on first paint — the photo
            should already be there when the page arrives. */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center p-3">
          <AnimatePresence initial={false}>
            <motion.div
              key={photo?.src || `placeholder-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_S, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {photo?.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="rounded object-cover object-center"
                />
              ) : (
                <div className="border-foreground/10 text-foreground-light flex h-full w-full items-center justify-center rounded border border-dashed">
                  <h4>Photo {active + 1}</h4>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip. */}
        <div className="border-foreground/10 flex shrink-0 justify-center gap-2 border-t px-4 pt-2.5 pb-3.5">
          {hero.photos.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.alt || `Photo ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              data-cursor="pointer"
              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded border-2 transition-all duration-200 ${
                i === active
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              {item.src ? (
                <Image src={item.src} alt="" fill sizes="48px" className="object-cover" />
              ) : (
                <span className="bg-foreground/[0.06] block h-full w-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bio. */}
      <div className="flex flex-col">
        <h1 className="mb-5 italic">{hero.heading}</h1>

        {/* 1.65 leading and a ~62ch measure — the reference's body settings.
            Longer lines at tighter leading are most of why a wall of text
            reads as unpolished. */}
        <div className="flex flex-col gap-4">
          {hero.intro.map((paragraph) => (
            <p key={paragraph} className="max-w-[62ch] leading-[1.65]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {hero.facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              // Solid surface with a soft lift, not a hairline border: on a
              // near-white page a 10%-alpha outline all but disappears, which
              // is why these read as unfinished next to the reference's cards.
              className="bg-background flex flex-col gap-1.5 rounded-[10px] p-4 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]"
            >
              <div className="flex items-baseline gap-1.5">
                <span aria-hidden className="text-[14px] leading-none">
                  {fact.emoji}
                </span>
                <h4>{fact.label}</h4>
              </div>
              <p>{fact.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
