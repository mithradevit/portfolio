"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import type { ExperienceEntry } from "@/content/experience";
import { profile } from "@/content/profile";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * Step Flow, applied to the roles list.
 *
 * Two parts move together: a highlight block that travels between rows, and a
 * panel that swaps to the active row's image.
 *
 * The highlight is a single element with a shared `layoutId`, not one box per
 * row. That is what makes it slide — Motion matches the element across the
 * unmount/mount and animates the gap. One box per row could only cross-fade,
 * which reads as two separate things blinking rather than one thing moving.
 *
 * Hover sets the active row and it stays on leave, so the list holds whatever
 * the reader last looked at instead of resetting out from under them.
 */

/** The reference's own spring: a light bounce over half a second. */
const SLIDE = { type: "spring" as const, bounce: 0.2, duration: 0.5 };

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const [active, setActive] = useState(0);
  const activeImage = entries[active]?.image;

  return (
    <div className="flex w-full flex-col gap-4">
      {/* h-8 to match the About block's header row — the CV button is taller
          than the label, so without a fixed height the label centres itself
          lower and the two section headings stop lining up. */}
      <div className="flex h-8 items-center justify-between gap-4">
        <ScrambleText as="h4" text="Experience" delay={0.2} scrambleOnHover />
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300"
        >
          <Download size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          <span className="font-mono text-[12px] tracking-wide uppercase">CV</span>
        </a>
      </div>

      {/* List and panel side by side once there is room; stacked below that,
          where a 200px-wide image would be too small to be worth the space. */}
      {/* `items-start`, not `items-stretch`: the panel now carries a fixed
          aspect ratio, so its height is the same for every row. Stretching it
          to the list would hand the height back to whichever box is taller and
          reintroduce the jump the ratio exists to prevent. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col">
          {entries.map((entry, i) => {
            const isActive = i === active;
            return (
              <div
                key={`${entry.company}-${entry.role}-${i}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className="group relative rounded-[10px] outline-none"
              >
                {/* `inset-0` rather than a fixed height: rows differ in height
                    once a role title wraps, and the shared layout animation
                    interpolates the box, so it takes each row's real size. */}
                {isActive && (
                  <motion.div
                    layoutId="experience-highlight"
                    transition={SLIDE}
                    className="bg-foreground/[0.05] absolute inset-0 rounded-[10px]"
                  />
                )}

                {/* No indent on the active row. The reference shifts it right,
                    but here that pushed the company name out of alignment with
                    the three rows above it and with the section label — the
                    highlight already marks which row is active. */}
                <div className="relative flex items-baseline justify-between gap-4 py-3 pr-3 pl-3">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span
                      // 15px is the site's body size, set on p/h4/li in
                      // globals.css. These rows were at 17px, which made the
                      // experience column read a step larger than the bio
                      // beside it even though both are body text.
                      className={`text-[15px] transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {entry.companyUrl ? (
                        <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
                          {entry.company}
                        </a>
                      ) : (
                        entry.company
                      )}
                    </span>
                    <span
                      // One step under the company name, matching the mono
                      // label size globals.css uses for secondary text.
                      className={`text-foreground-light text-[13px] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {entry.role}
                    </span>
                  </div>
                  {/* The reference's serial number, in the top-right of the
                      row. The year does that job here — it is the number the
                      reader actually wants, so inventing 01–04 alongside it
                      would be two numbering systems competing. */}
                  <span
                    className={`text-foreground-light shrink-0 font-mono text-[12px] tracking-wide transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {entry.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Only rendered once entries actually carry images — an empty framed
            box beside the list would read as something failing to load. */}
        {activeImage && (
          <div className="border-foreground/10 bg-foreground/[0.03] flex w-full shrink-0 overflow-hidden rounded-[14px] border p-2 lg:w-[230px]">
            <motion.img
              // Keyed on src so React swaps the element and the fade replays
              // on each change rather than mutating one image in place.
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              // A fixed 3:4 box rather than `h-auto`. Left to size itself the
              // image took its own intrinsic ratio, and the four photos are
              // not all the same shape — the square one rendered 29px shorter
              // than the portraits, so the panel resized on every hover and
              // the whole section shifted with it. `object-cover` crops to the
              // box instead, so the frame is identical for all four.
              className="h-[180px] w-full rounded-[9px] object-cover lg:h-auto lg:aspect-[3/4]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
