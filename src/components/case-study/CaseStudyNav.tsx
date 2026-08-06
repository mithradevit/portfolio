"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sectionId } from "./CaseStudySection";

/**
 * Sticky section index for a case study.
 *
 * The active item is tracked with an IntersectionObserver rather than scroll
 * maths: the rootMargin pins the trigger line near the top of the viewport, so
 * a heading becomes "current" when it reaches reading position rather than when
 * it first peeks into view.
 */
export function CaseStudyNav({ headings }: { headings: string[] }) {
  // Stores the section *id*, not the heading — they aren't the same string.
  const [active, setActive] = useState(() => (headings[0] ? sectionId(headings[0]) : ""));

  useEffect(() => {
    const sections = headings
      .map((h) => document.getElementById(sectionId(h)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Track which sections are currently in the band rather than reacting to
    // each entry: the observer only reports *changes*, so a section that was
    // already intersecting when its neighbour left would never fire, and the
    // highlight would stick on the section above.
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }

        // Several can straddle the band at once. Take the one that entered
        // most recently — the lowest of them — not the topmost: the section
        // above is the one being scrolled *away* from, and preferring it means
        // the last item can never win, since its predecessor is still in view.
        const current = sections
          .filter((el) => inBand.has(el.id))
          .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];

        if (current) setActive(current.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <Link
        href="/"
        data-cursor="pointer"
        className="text-foreground-light hover:text-primary flex w-fit items-center gap-2 transition-colors duration-300"
      >
        <ArrowLeft size={14} />
        <h4>Back</h4>
      </Link>

      {/* Horizontal and scrollable on phones, where a sticky column would eat
          the screen; a vertical index from lg up. */}
      <ul className="-mx-6 flex list-none gap-4 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:px-0">
        {headings.map((heading) => {
          const id = sectionId(heading);
          const isActive = active === id;
          return (
            <li key={heading} className="shrink-0 lg:shrink">
              <a
                href={`#${id}`}
                data-cursor="pointer"
                aria-current={isActive ? "true" : undefined}
                className={`text-[15px] whitespace-nowrap transition-colors duration-300 lg:whitespace-normal ${
                  isActive ? "text-foreground" : "text-foreground-light hover:text-foreground"
                }`}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
