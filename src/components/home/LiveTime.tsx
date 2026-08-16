"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

/**
 * Mithra's local time, ticking.
 *
 * Renders nothing until after mount: the server has no idea what second it is
 * by the time the HTML reaches the browser, so rendering a time during SSR
 * guarantees a hydration mismatch.
 */
/** How long the coordinates spin before locking, and how fast they cycle. */
const LOCK_MS = 1100;
const TICK_MS = 55;

function formatCoords(lat: number, lon: number) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${ns} ${Math.abs(lon).toFixed(4)}°${ew}`;
}

/**
 * The coordinates arriving as if they were being acquired: the digits cycle
 * through random values, then lock onto the real fix.
 *
 * Only the fractional digits scramble — the whole-degree part stays put, so
 * the readout never claims to be somewhere it isn't while it settles.
 */
function CoordinateLoader() {
  const { lat, lon } = profile.coordinates;
  const settled = formatCoords(lat, lon);
  // Null until mount, same reason as the clock: Math.random() during SSR is a
  // guaranteed hydration mismatch.
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const start = Date.now();
    const jitter = (base: number) => base + (Math.random() - 0.5) * 0.06;

    const id = setInterval(() => {
      if (Date.now() - start >= LOCK_MS) {
        setText(settled);
        clearInterval(id);
        return;
      }
      setText(formatCoords(jitter(lat), jitter(lon)));
    }, TICK_MS);

    return () => clearInterval(id);
  }, [lat, lon, settled]);

  if (!text) return null;

  return (
    <>
      {" · "}
      {/* aria-label carries the final fix so a screen reader announces the
          real coordinates once, not a stream of spinning digits. */}
      <span className="text-primary" aria-label={settled}>
        <span aria-hidden>{text}</span>
      </span>
    </>
  );
}

export function LiveTime() {
  // Parts rather than one string: the seconds get their own treatment, which
  // means they need to be a separate node.
  const [now, setNow] = useState<[string, string, string] | null>(null);

  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: profile.timezone,
      }).formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
      return [get("hour"), get("minute"), get("second")] as [string, string, string];
    };

    setNow(read());
    const id = setInterval(() => setNow(read()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    // One continuous line: place, time, coordinates, availability. Inline
    // rather than a flex row with the status pushed right — it reads as one
    // sentence of status, and the parts stay together when the line wraps.
    <div className="text-foreground-light font-mono text-[11px] tracking-wide uppercase tabular-nums sm:text-[13px]">
      <span>
        {profile.location.split(",")[0]}
      {now && (
        <>
          {" — "}
          {/* Hours and minutes read as the time; the seconds are motion, not
              information, so they sit smaller and dimmer and let the eye skip
              them. The colon between H and M blinks on the same 1s beat the
              seconds tick on, which is what makes the readout feel live rather
              than merely accurate. */}
          <span className="text-foreground">
            {now[0]}
            <span className="animate-[blink_1s_ease-in-out_infinite] px-px">:</span>
            {now[1]}
          </span>
          <span className="text-foreground-light/60 pl-[3px] align-super text-[9px]">
            {now[2]}
          </span>
        </>
      )}
        <CoordinateLoader />
      </span>

      {/* Plain text, no dot — the separator already does the work the marker
          was doing, and a pinging dot in the middle of a line pulls the eye
          off the words either side of it. */}
      <span className="text-foreground-light/60 px-2">·</span>
      {/* Only the last word is accented: it carries the meaning, and colouring
          the whole phrase would put a second block of orange against the
          coordinates. */}
      Actively looking for <span className="text-primary">jobs</span>
    </div>
  );
}
