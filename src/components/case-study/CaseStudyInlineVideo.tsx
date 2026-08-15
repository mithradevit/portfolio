"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudySection } from "@/content/case-studies";

type GridVideo = NonNullable<NonNullable<CaseStudySection["grid"]>[number]["video"]>;

/**
 * A clip shown inside a card, as evidence for the point the card makes.
 *
 * It drops the outer frame and caption the standalone player carries, which
 * would double the card's own border.
 *
 * Playback waits until the clip is near the viewport. `preload="metadata"`
 * fetches only the header, but calling play() pulls the whole file — so a bare
 * `autoPlay` attribute downloads every clip on the page at load, however far
 * down it sits. Reduced motion holds it on the first frame, since a silent
 * decorative loop is exactly what that preference exists to stop.
 */
export function CaseStudyInlineVideo({ video }: { video: GridVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAllowed(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // A refused play() is normal — a background tab, or a policy this browser
    // applies anyway. Swallow it and let the next intersection try again.
    if (allowed && inView) void el.play().catch(() => {});
    else el.pause();
  }, [allowed, inView]);

  return (
    <div
      className="border-foreground/10 mt-1 w-full overflow-hidden rounded-[8px] border"
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        aria-label={video.alt}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
