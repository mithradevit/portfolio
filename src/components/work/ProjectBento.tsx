import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Selected work as a bento grid.
 *
 * Six columns on a fixed row height, with the first project taking four
 * columns and two rows and the rest filling in around it. The uneven sizes are
 * the point: a grid of equal tiles says the five projects are interchangeable,
 * and they are not — the lead tile is the one to read first.
 *
 * Each tile is a picture that grows to whatever height its cell has, with a
 * fixed caption pinned underneath it. That order matters: sizing the picture
 * and letting the caption follow would give every tile a different baseline,
 * and the row would stop reading as a grid.
 */

/**
 * Column and row spans per position, as a 6-column pattern.
 *
 * Written out rather than computed: the shape of a bento is a composition, not
 * a formula, and a rule that produced it would be harder to read than the
 * five lines it replaced. Positions past the fifth fall back to half a row, so
 * adding a project degrades into a tidy two-up instead of breaking the grid.
 */
const SPANS = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function ProjectBento({ projects }: { projects: Project[] }) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-6 sm:grid-cols-2",
        // A fixed row height is what lets a tile span two rows and come out
        // exactly twice as tall. `auto-rows-fr` would size rows to their
        // content and the lead tile would no longer line up with the two
        // beside it.
        "lg:auto-rows-[248px] lg:grid-cols-6 lg:gap-6",
      )}
    >
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          data-cursor={project.cursorLabel}
          className={cn(
            "group border-foreground/10 bg-foreground/[0.02] flex flex-col overflow-hidden rounded-[14px] border transition-colors duration-300",
            "hover:border-foreground/20",
            SPANS[index] ?? "lg:col-span-3",
          )}
        >
          {/* `min-h-0` is doing real work: without it a flex child refuses to
              shrink below its content and the picture pushes the caption out
              of the tile. */}
          <div className="relative min-h-[160px] w-full flex-1 shrink overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                quality={90}
                // The lead tile is two-thirds of the row; the rest are a third
                // or less. One hint cannot serve both, so it is split.
                sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                style={{ backgroundColor: project.thumbnailColor, opacity: 0.35 }}
              />
            )}
          </div>

          {/* Fixed, never flexed — every caption in the row starts at the same
              distance from the bottom of its tile. */}
          <div className="flex shrink-0 flex-col gap-2.5 p-4">
            <h3
              className={cn(
                "text-foreground group-hover:text-primary leading-[1.25]! font-sans! tracking-[-0.03em]! transition-colors duration-300",
                // The lead tile carries the row, so its title is allowed to be
                // a headline. The rest stay at the size of a card title.
                index === 0 ? "text-[22px]!" : "text-[17px]!",
              )}
            >
              {project.title}{" "}
              <span className="text-primary align-super font-mono text-[10px] leading-[0] tracking-[0.1em] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </h3>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-foreground-light mr-1 font-mono text-[11px] tracking-[0.12em] tabular-nums">
                {project.year}
              </span>

              {project.nda && (
                <span
                  className="border-primary/30 text-primary flex items-center justify-center rounded-full border px-2 py-1"
                  style={{ height: 22, minWidth: 22 }}
                >
                  <Lock size={10} strokeWidth={2.5} aria-hidden />
                  <span className="sr-only">Under NDA</span>
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
