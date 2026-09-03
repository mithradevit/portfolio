"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/cn";

type Flow = NonNullable<CaseStudy["sections"][number]["flows"]>[number];

/**
 * One core flow: the written point, with the clip that shows it running beside
 * it. No control to press — the clip is short, silent and looping, so it reads
 * as an illustration rather than as media the reader has to operate.
 *
 * Reduced motion still wins: the clip holds on its first frame and offers a
 * play control instead, since a silent decorative loop is exactly what that
 * preference exists to stop.
 */
export function CaseStudyFlow({ flow }: { flow: Flow }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  /** Landscape clips get the full column rather than half of one. */
  const wide = flow.video.width / flow.video.height >= 1.3;
  const isGif = flow.video.src.toLowerCase().endsWith(".gif");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(media.matches);
      setPlaying(!media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  // Playback is gated on visibility, and this is a bandwidth decision as much
  // as a battery one: calling play() is what pulls the whole file down, so
  // without this every clip on the page downloads in full on first load even
  // if the reader never scrolls to it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && inView) void video.play().catch(() => {});
    else video.pause();
  }, [playing, inView]);

  return (
    // Layout follows the clip's own shape. A tall or square clip sits in one of
    // two columns with the copy beside it; a wide one would be squeezed to
    // roughly half its useful size there, so it takes the full width and the
    // copy drops underneath. The text column is centred against a side-by-side
    // clip — the copy is much shorter than a portrait clip is tall, and pinning
    // it to the top leaves the card visibly bottom-heavy.
    <div
      className={cn(
        "bg-background grid grid-cols-1 items-center gap-4 rounded-[11px] p-5 shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]",
        !wide && "sm:grid-cols-2 sm:gap-6",
      )}
    >
      {/* No border on the clip: it sits inside a card that already has one,
          and the two hairlines a few pixels apart read as a doubled edge. */}
      <div
        className="w-full overflow-hidden rounded-[9px]"
        style={{ aspectRatio: `${flow.video.width} / ${flow.video.height}` }}
      >
        {isGif ? (
          // A GIF can't go in a <video>, and it can't be paused either — the
          // format has no playback control at all. So reduced motion swaps the
          // file itself for a still first frame rather than trying to stop it,
          // which keeps the same promise the video path makes. `loading="lazy"`
          // stands in for the video's visibility gate: without it, several
          // megabytes of animation download on first load whether or not the
          // reader ever scrolls this far.
          <img
            src={reduced && flow.video.poster ? flow.video.poster : flow.video.src}
            alt={flow.video.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={flow.video.src}
            aria-label={flow.video.alt}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <h4 className="text-foreground!">{flow.title}</h4>
        <p className="text-foreground-light text-[13px] leading-[1.6]">{flow.body}</p>
        {/* Not offered for a GIF: there is nothing to pause or resume, so the
            control would be a button that visibly does nothing. */}
        {reduced && !isGif && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            data-cursor="pointer"
            className="text-primary mt-1 self-start font-mono text-[10.5px] tracking-[0.08em] uppercase"
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </div>
    </div>
  );
}
