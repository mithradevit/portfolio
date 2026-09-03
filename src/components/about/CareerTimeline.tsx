"use client";

import { useState } from "react";
import { careerTimeline, type CareerEntry } from "@/content/career-timeline";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * The roles, as an editorial row.
 *
 * Each entry is a column: the span in small mono caps, the role and where it
 * happened set as one line, then what it actually meant. All three sit across
 * the page at once — two up at sm, stacked on a phone.
 *
 * Setting the role line in mono rather than the body face is what separates
 * these from ordinary paragraphs. It is the same voice the site's labels use,
 * so a career entry reads as a record rather than as prose about a job.
 *
 * The body is clamped to four lines with an expander rather than truncated for
 * good. Four lines is enough to know whether the rest is worth reading, and
 * the columns stay level with each other until someone opens one.
 */

/** Body lines shown before "Read more". */
const CLAMP_LINES = 4;

export function CareerTimeline() {
  // Sorted oldest-first so `spanFor` can read each range off the entry that
  // follows it, then reversed for display: newest role first, since the current
  // title is the one a reader is here to find.
  const entries = [...careerTimeline].sort((a, b) => a.date.localeCompare(b.date));
  const shown = entries
    .map((entry, index) => ({ entry, span: spanFor(entries, index) }))
    .reverse();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-8 items-center">
        <ScrambleText as="h4" text="The roles" delay={0.15} scrambleOnHover />
      </div>

      {/* A grid, not a scroller. Three roles fit across the page at once, and
          a row that scrolls when there is nothing past the edge to reach is a
          control that does nothing. Columns are equal fractions so the three
          share one baseline grid; `items-start` keeps them top-aligned when
          one is expanded. */}
      <ul className="grid w-full grid-cols-1 items-start gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {shown.map(({ entry, span }) => (
          <li key={`${entry.date}-${entry.title}`} className="min-w-0">
            <Entry entry={entry} span={span} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Entry({ entry, span }: { entry: CareerEntry; span: string }) {
  const [open, setOpen] = useState(false);

  return (
    /* Every size and gap in this column is a step on one φ ladder off the
       site's 15px body: 9.27 · 15 · 24.27 for type, 6.2 · 10 · 16.2 · 26.2 for
       space. Nothing here is a rounded-off guess. */
    <div className="flex flex-col gap-[16.2px]">
      <span
        className="text-foreground-light font-mono tracking-[0.12em] uppercase"
        style={{ fontSize: "9.27px" }}
      >
        {span}
      </span>

      {/* Company on its own line under the role, not trailing it after a
          middot. On one line the two competed for the same emphasis and long
          company names wrapped mid-phrase; stacked, the role is the heading and
          the company is its address. */}
      <div className="flex flex-col gap-[6.2px]">
        <h3 className="text-foreground font-mono! text-[clamp(18.75px,1.9vw,24.27px)]! leading-[1.2]! tracking-[-0.01em]! uppercase">
          {entry.title}
        </h3>
        {entry.meta && (
          <span
            className="text-foreground-light/70 font-mono tracking-[0.06em] uppercase"
            style={{ fontSize: "15px" }}
          >
            {entry.meta}
          </span>
        )}
      </div>

      <p
        className="text-foreground-light leading-[1.6]"
        style={
          open
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: CLAMP_LINES,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {entry.description}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="border-foreground/10 text-foreground-light rounded-full border px-2.5 py-1 font-mono tracking-[0.08em] uppercase"
              style={{ fontSize: "9.27px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Underlined rather than a button or a pill — at this size in a column
          of prose, an underline is the only affordance that doesn't read as a
          second piece of furniture. */}
      <button
        type="button"
        data-cursor="pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-foreground-light hover:text-primary w-fit font-mono tracking-[0.12em] uppercase underline underline-offset-4 transition-colors duration-300"
        style={{ fontSize: "9.27px" }}
      >
        {open ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

/**
 * "JUN 2022 — FEB 2023" for an entry, read off the entry that follows it.
 *
 * Derived rather than typed into the content file so a range can't contradict
 * the dates either side of it. The newest entry runs to "PRESENT" — it is the
 * one still true.
 */
function spanFor(entries: CareerEntry[], index: number) {
  const from = entries[index].year;
  const next = entries[index + 1];
  return `${from} — ${next ? next.year : "Present"}`;
}
