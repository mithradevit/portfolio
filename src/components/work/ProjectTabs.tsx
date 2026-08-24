"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectGrid } from "./ProjectGrid";

/**
 * Selected work as a tabbed card.
 *
 * A rail of project titles on the left, one big picture on the right. Pointing
 * at a title opens it — the row grows a panel carrying everything the old card
 * carried (index, NDA, tags, year) and the picture swaps to match. Clicking
 * anywhere in the open row, or the picture, goes to the case study.
 *
 * Why a rail rather than eight stacked cards: eight 16:9 thumbnails down a
 * 1800px page is most of a screen each, so the list could only ever be read by
 * scrolling past it. Here all eight titles are visible at once and the picture
 * is the reward for choosing one — the page shows the whole body of work in the
 * space one card used to take.
 *
 * The first row is open on load rather than the rail starting blank: a column
 * of titles beside an empty box reads as a broken image, and there is no
 * neutral picture to show instead.
 *
 * Below lg this falls back to the stacked cards. The rail needs two columns to
 * exist at all, and on a phone the picture would be the width of the screen
 * with nowhere for the titles to go.
 */
export function ProjectTabs({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <>
      <div className="hidden w-full gap-6 lg:flex">
        {/* The rail. Fixed share rather than intrinsic width: the titles vary
            from three words to a dozen, and a shrink-to-fit column would jump
            sideways every time the open row changed. */}
        <div className="flex w-[32%] shrink-0 flex-col">
          {projects.map((project, index) => (
            <Tab
              key={project.slug}
              project={project}
              index={index}
              isActive={index === active}
              onActivate={() => setActive(index)}
            />
          ))}
        </div>

        {/* One picture box, held at a fixed ratio so swapping projects never
            changes the height of the section. `project.aspect` varies per
            entry and would make the rail jump. */}
        <Link
          href={`/projects/${current.slug}`}
          data-cursor={current.cursorLabel}
          aria-label={`${current.title} — view case study`}
          className="group border-foreground/10 relative aspect-[16/10] min-w-0 flex-1 overflow-hidden rounded-[14px] border"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {current.image ? (
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover"
                  priority={active === 0}
                />
              ) : (
                // Same fallback the cards use: a colour block for the projects
                // that have no shippable thumbnail.
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: current.thumbnailColor, opacity: 0.35 }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="bg-background/0 group-hover:bg-background/10 absolute inset-0 transition-colors duration-300" />

          {/* The picture is a link but carries no text, so it needs something
              visible saying it goes somewhere. */}
          <span className="border-foreground/10 bg-background/90 text-foreground-light group-hover:text-primary absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase backdrop-blur transition-colors duration-300">
            View case study
            <ArrowUpRight size={12} aria-hidden />
          </span>
        </Link>
      </div>

      <div className="lg:hidden">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}

function Tab({
  project,
  index,
  isActive,
  onActivate,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor={project.cursorLabel}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative block rounded-[12px] px-5 py-4 outline-none"
    >
      {/* A shared `layoutId` rather than a background on each row: the panel
          then slides between rows instead of one fading out while another
          fades in, which is what makes the rail feel like a single control. */}
      {isActive && (
        <motion.span
          layoutId="project-tab-panel"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-foreground/[0.045] absolute inset-0 rounded-[12px]"
        />
      )}

      <span className="relative flex flex-col gap-3">
        <span className="flex items-start justify-between gap-4">
          <span
            className={`min-w-0 text-[17px] leading-snug tracking-[-0.02em] transition-colors duration-300 ${
              isActive ? "text-foreground" : "text-foreground-light group-hover:text-foreground"
            }`}
          >
            {project.title}
          </span>

          <span
            className={`shrink-0 pt-1 font-mono text-[11px] tracking-[0.12em] tabular-nums transition-colors duration-300 ${
              isActive ? "text-primary" : "text-foreground-light/60"
            }`}
          >
            ({String(index + 1).padStart(2, "0")})
          </span>
        </span>

        {/* Every detail the card carried, revealed with the open row. Height
            animates from 0 so the rows below slide rather than jump. */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.span
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block overflow-hidden"
            >
              <span className="flex flex-col gap-3 pt-0.5">
                <span className="flex flex-wrap gap-1.5">
                  {project.nda && (
                    <span
                      className="border-primary/30 text-primary flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono tracking-[0.08em] uppercase"
                      style={{ fontSize: "10px" }}
                    >
                      <Lock size={9} strokeWidth={2.5} aria-hidden />
                      Under NDA
                    </span>
                  )}
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-foreground/10 text-foreground-light rounded-full border px-2.5 py-1 font-mono tracking-[0.08em] uppercase"
                      style={{ fontSize: "10px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </span>

                {/* The dated rail from the old card, kept: the hairline runs
                    out to the year so the open row still reads as an entry in
                    a dated list rather than a floating blurb. */}
                <span className="flex items-center gap-3">
                  <span className="bg-foreground/10 relative h-px min-w-0 flex-1">
                    <span className="bg-primary absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                  <span className="text-foreground-light shrink-0 font-mono text-[11px] tracking-[0.12em] tabular-nums">
                    {project.year}
                  </span>
                </span>
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Link>
  );
}
