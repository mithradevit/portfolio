"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A screen recording standing in for a step's still.
 *
 * Same contract as the still it replaces — no controls, silent, looping, sized
 * by the column it sits in. Playback is gated on visibility because calling
 * play() is what downloads the file: without the gate every clip on the page
 * pulls in full on first load whether or not the reader ever reaches it.
 *
 * Reduced motion holds the clip on its first frame; a silent decorative loop
 * is exactly what that preference exists to stop.
 */
export function StepVideo({
  video,
  className,
}: {
  video: { src: string; alt: string; width: number; height: number };
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlaying(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing && inView) void el.play().catch(() => {});
    else el.pause();
  }, [playing, inView]);

  return (
    <video
      ref={ref}
      src={video.src}
      width={video.width}
      height={video.height}
      aria-label={video.alt}
      muted
      loop
      playsInline
      preload="metadata"
      className={`border-foreground/10 h-auto w-full border ${className ?? ""}`}
    />
  );
}
