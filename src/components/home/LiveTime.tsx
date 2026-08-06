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
export function LiveTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: profile.timezone,
      }).format(new Date());

    setNow(format());
    const id = setInterval(() => setNow(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-foreground-light font-mono text-[13px] tracking-wide uppercase tabular-nums">
      {profile.location.split(",")[0]}
      {now && (
        <>
          {" — "}
          <span className="text-foreground">{now}</span>
        </>
      )}
    </span>
  );
}
