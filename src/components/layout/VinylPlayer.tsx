"use client";

import { useEffect, useRef, useState } from "react";
import { vinylTrack } from "@/content/audio";
import { cn } from "@/lib/cn";

export function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  // Hidden until the reader has scrolled past the first screen. The player is
  // pinned to the bottom-left, which is exactly where the hero's title sits;
  // padding the hero around it only moved the collision to the next window
  // size. Deferring it means the hero owns its own corner and the player
  // appears once there is nothing there to cover.
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Stop, not pause: the arm lifts off the record, so resuming mid-track
      // would contradict what the control is showing. Next click drops the
      // needle at the start again.
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setUnavailable(true));
  }

  return (
    // Desktop only. On a phone the record covers the bottom-left of the hero,
    // where the content it hides has nowhere else to go.
    // `pointer-events-none` while hidden so an invisible record can't swallow
    // clicks meant for the hero underneath it.
    <div
      className={cn(
        "fixed bottom-6 left-6 z-40 hidden flex-col items-start gap-2 transition-opacity duration-500 lg:flex",
        past ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <audio
        ref={audioRef}
        src={vinylTrack.src}
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => setUnavailable(true)}
      />

      <div
        className={cn(
          "bg-background border-foreground/10 max-w-[200px] rounded-lg border px-3 py-2 shadow-md transition-all duration-200 ease-out",
          isPlaying || unavailable
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0",
        )}
      >
        {unavailable ? (
          <p className="text-foreground-light text-[12px]">
            No track yet — add one at{" "}
            <span className="font-mono">public/audio/track.mp3</span>
          </p>
        ) : (
          <>
            <h4 className="text-foreground">{vinylTrack.title}</h4>
            <p className="text-foreground-light text-[12px]">{vinylTrack.artist}</p>
            {/* Only renders for licences that require credit — see audio.ts. */}
            {vinylTrack.license && (
              <p className="text-foreground-light text-[11px]">
                {vinylTrack.sourceUrl ? (
                  <a
                    href={vinylTrack.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="text-[11px]! hover:text-primary underline underline-offset-2"
                  >
                    {vinylTrack.license}
                  </a>
                ) : (
                  vinylTrack.license
                )}
              </p>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        data-cursor={isPlaying ? "pause" : "play"}
        className="relative flex h-20 w-20 items-center justify-center"
      >
        {/* Tonearm */}
        <div
          className={cn(
            "bg-foreground/70 absolute top-[-6px] right-[-6px] h-1 w-10 origin-top-right rounded-full transition-transform duration-500 ease-in-out",
            isPlaying ? "rotate-[10deg]" : "rotate-[-30deg]",
          )}
        >
          <div className="bg-foreground/70 absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rounded-full" />
        </div>

        {/* Disc */}
        <div
          className="h-20 w-20 rounded-full shadow-lg"
          style={{
            background:
              "repeating-radial-gradient(circle, #2a2a2a 0px, #2a2a2a 2px, #1a1a1a 2px, #1a1a1a 4px)",
            animation: "vinyl-spin 3.5s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div className="bg-primary absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <div className="bg-background absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </div>
      </button>
    </div>
  );
}
