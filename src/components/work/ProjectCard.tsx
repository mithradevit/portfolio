"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * A work card: picture on the left, everything else on the right.
 *
 * The right column is a top-and-bottom arrangement rather than a stack — the
 * title sits against the top of the image, and the tags and the dated rail
 * are pushed down to sit against its bottom edge. That gives the block two
 * clean horizontals instead of a ragged run of text floating in the middle.
 *
 * The rail is what carries the "selected work" idea: a number on the left, the
 * year on the right, and a hairline running between them. Every card repeats
 * it, so scanning down the page reads as a dated list — the rules line up into
 * a spine and the years step backwards through it. On hover the rule fills
 * from the left in the accent colour; that plus a slight lift on the image is
 * the whole hover state.
 *
 * The NDA badge sits on the artwork rather than in the tag row because it is a
 * fact about the *image* — it is the reason the thumbnail is a colour block or
 * a partial view rather than the real screens.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor={project.cursorLabel}
      className="group block"
    >
      {/* `items-stretch` so the text column takes the image's full height —
          without it the column shrinks to its own content and `justify-between`
          has no space to push the bottom group into. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
        {/* The thumbnail is wiped open from the bottom edge as it scrolls in.
            `clipPath` rather than height or scale: it animates on the
            compositor and leaves the hover transform free to do its own job. */}
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          // A little over half the row. In one full-width column a 16:9
          // thumbnail spanning the whole 1800px shell would be more than
          // 1000px tall on its own.
          className={cn(
            "border-foreground/10 relative w-full shrink-0 overflow-hidden border transition-all duration-300 ease-in-out lg:w-[56%]",
            project.aspect,
          )}
        >
          {/* Real thumbnail when there is one, colour block until then. */}
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              quality={90}
              // Cards are a little over half the shell from lg up. A fixed px
              // hint here under-reports the real box on wide screens, and the
              // browser then picks a variant smaller than the slot and
              // upscales it.
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
              style={{ backgroundColor: project.thumbnailColor, opacity: 0.35 }}
            />
          )}
          <div className="bg-background/0 group-hover:bg-background/20 absolute inset-0 transition-colors duration-300 ease-in-out" />


        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-8">
          {/* Title and index share the top line, so the number lands in the
              card's own top-right corner — clear of the artwork, and level
              with the first line of the title rather than floating above it.
              `items-start` keeps it pinned there when the title wraps to three
              lines. */}
          <div className="flex items-start justify-between gap-6">
            {/* Geist, not the serif the bare `h3` rule sets. The `!` is
                required: that rule is unlayered and beats a plain utility. */}
            <h3 className="text-foreground group-hover:text-primary max-w-[20ch] min-w-0 font-sans! tracking-[-0.03em]! transition-colors duration-300">
              {project.title}
            </h3>

            <span className="text-primary shrink-0 pt-1.5 font-mono text-[11px] tracking-[0.12em] tabular-nums">
              ({String(index + 1).padStart(2, "0")})
            </span>
          </div>

          {/* Tags and year on one bottom-anchored line, so the slack on a tall
              card falls between the title and this row rather than splitting
              it. `items-center` rather than baseline: the rule between them is
              a 1px box with no baseline of its own to align to. */}
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {/* First in the row, and the only pill carrying the accent: it
                  is the one piece of metadata that changes what a reader can
                  expect to see inside. Only rendered when true — a pill
                  announcing that a project is *not* confidential would be
                  noise on every other card. */}
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
                // Inline font-size: 10px sits a clear step under the 15px body
                // scale, and it is worth stating next to the tracking it
                // depends on to stay legible at that size.
                <span
                  key={tag}
                  className="border-foreground/10 text-foreground-light rounded-full border px-2.5 py-1 font-mono tracking-[0.08em] uppercase"
                  style={{ fontSize: "10px" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Two stacked rules, not one that changes colour: the base
                hairline stays put while the accent scales over it, so the fill
                animates on the compositor and the line never reflows. */}
            <span className="bg-foreground/10 relative h-px min-w-0 flex-1">
              <span className="bg-primary absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>

            <span className="text-foreground-light shrink-0 font-mono text-[11px] tracking-[0.12em] tabular-nums">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
