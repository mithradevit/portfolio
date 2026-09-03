"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/cn";

type Banner = NonNullable<CaseStudy["sections"][number]["videos"]>[number];

/**
 * One or more clips under a section.
 *
 * A single video runs the full column width. Two or more become a two-column
 * grid that collapses to a stack on a phone, where side-by-side would leave
 * each clip too small to read. Any clip marked `span: "full"` takes the whole
 * width — which is what lets a set of mismatched shapes sit together: the
 * odd-shaped ones go full width and keep their own proportions instead of
 * being cropped to match a neighbour they were never going to match.
 */
export function CaseStudyVideos({ videos }: { videos: Banner[] }) {
  if (videos.length === 0) return null;
  if (videos.length === 1) return <CaseStudyBanner banner={videos[0]} showCaption={false} />;

  // Clips recorded separately are rarely the exact same shape, and a row of
  // boxes at slightly different heights reads as a mistake. Give the paired
  // ones the shallowest aspect among themselves so the row lines up —
  // `object-cover` takes the difference off the edges, which is invisible at a
  // few percent. Full-width clips are excluded from that calculation: they have
  // no neighbour to line up with, so they keep their own shape uncropped.
  const paired = videos.filter((v) => v.span !== "full");
  const shared = paired.length > 1 ? Math.min(...paired.map((v) => v.width / v.height)) : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {videos.map((video) =>
        video.span === "full" ? (
          // A squarer clip given the full width gets taller than everything
          // around it — a detail shot ends up the largest block on the page,
          // which reads as emphasis nobody intended. Only genuinely wide clips
          // run edge to edge; the rest are capped and centred.
          <div
            key={video.src}
            className={cn(
              "sm:col-span-2",
              video.width / video.height < 1.8 && "mx-auto w-full max-w-[480px]",
            )}
          >
            <CaseStudyBanner banner={video} showCaption={false} />
          </div>
        ) : (
          <CaseStudyBanner key={video.src} banner={video} aspect={shared} showCaption={false} />
        ),
      )}
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
export function CaseStudyBanner({
  banner,
  aspect,
  showCaption = true,
}: {
  banner: Banner;
  aspect?: number;
  /**
   * Whether `alt` is also printed under the clip. Off for a grid of clips,
   * where the pictures speak for themselves and four ruled captions turn a
   * gallery into a spec sheet. `alt` still goes on the player as its
   * accessible name either way — this hides the caption, not the description.
   */
  showCaption?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const isGif = banner.src.toLowerCase().endsWith(".gif");

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

  // Playback waits until the clip is near the viewport, and that is a bandwidth
  // decision more than a battery one: `preload="metadata"` fetches only the
  // header, but calling play() pulls the whole file. Without this gate every
  // clip on the page downloads in full the moment it mounts, however far down
  // the page it sits and whether or not the reader ever scrolls to it.
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
    if (playing && inView) {
      // A rejected play() is normal — a background tab, or a policy this
      // browser applies anyway. Swallow it rather than latching `playing` off,
      // which would leave the clip dead for the rest of the visit after one
      // transient refusal.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing, inView]);

  return (
    <figure className="flex w-full flex-col gap-3">
      <div
        className="border-foreground/10 bg-foreground/[0.03] relative w-full overflow-hidden rounded-[14px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_8px_24px_-12px_rgb(50_64_79_/_20%)]"
        style={{ aspectRatio: aspect ?? `${banner.width} / ${banner.height}` }}
      >
        {isGif ? (
          // A GIF has no pause, so reduced motion swaps the file itself for a
          // still first frame instead of trying to stop it — the same promise
          // the video path makes, kept the only way this format allows.
          <img
            src={reduced && banner.poster ? banner.poster : banner.src}
            alt={banner.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
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
        )}

        {reduced && !isGif && (
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
      {showCaption && (
        <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
          {banner.alt}
        </figcaption>
      )}
    </figure>
  );
}
