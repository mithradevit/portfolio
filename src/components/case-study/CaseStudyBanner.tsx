"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/content/case-studies";

type Banner = NonNullable<CaseStudy["sections"][number]["videos"]>[number];

/**
 * One or more clips under a section.
 *
 * A single video runs the full column width. Two or more become a row of equal
 * columns that collapses to a stack on a phone, where side-by-side would leave
 * each clip too small to read.
 */
export function CaseStudyVideos({ videos }: { videos: Banner[] }) {
  if (videos.length === 0) return null;
  if (videos.length === 1) return <CaseStudyBanner banner={videos[0]} />;

  // Clips recorded separately are rarely the exact same shape, and a row of
  // boxes at slightly different heights reads as a mistake. Give them all the
  // shallowest aspect in the set so the row lines up — `object-cover` takes the
  // difference off the edges, which is invisible at a few percent.
  const shared = Math.min(...videos.map((v) => v.width / v.height));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {videos.map((video) => (
        <CaseStudyBanner key={video.src} banner={video} aspect={shared} />
      ))}
    </div>
  );
}

/**
 * A looping video inside a case-study section.
 *
 * Autoplay only works if the video is muted and `playsInline` — iOS refuses to
 * start otherwise, and Chrome blocks unmuted autoplay outright. Both are set,
 * and neither is a loss: these clips carry no audio.
 *
 * Reduced motion is honoured properly rather than ignored. A silent decorative
 * loop is exactly what that preference exists to stop, so the video is paused
 * and a play control is offered instead of forcing it. The preference is read
 * in an effect, not during render, because the server has no way to know it and
 * guessing would mismatch on hydration.
 */
export function CaseStudyBanner({ banner, aspect }: { banner: Banner; aspect?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      // A rejected play() is normal — a background tab, or a policy this
      // browser applies anyway. Swallow it rather than logging an unhandled
      // rejection on every load.
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <figure className="flex w-full flex-col gap-3">
      <div
        className="border-foreground/10 bg-foreground/[0.03] relative w-full overflow-hidden rounded-[14px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_8px_24px_-12px_rgb(50_64_79_/_20%)]"
        style={{ aspectRatio: aspect ?? `${banner.width} / ${banner.height}` }}
      >
        <video
          ref={videoRef}
          // Not `autoPlay`: playback is driven by the effect above so the
          // reduced-motion preference can veto it before the first frame.
          muted
          loop
          playsInline
          preload="metadata"
          poster={banner.poster}
          aria-label={banner.alt}
          className="h-full w-full object-cover"
        >
          <source src={banner.src} type="video/mp4" />
        </video>

        {reduced && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            data-cursor="pointer"
            className="bg-background/85 text-foreground absolute right-3 bottom-3 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase backdrop-blur-md"
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </div>
      <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
        {banner.alt}
      </figcaption>
    </figure>
  );
}
