import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor={project.cursorLabel}
      className="group block"
    >
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "border-foreground/10 relative w-full overflow-hidden border transition-all duration-300 ease-in-out",
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
              // Cards are half the grid from lg up. A fixed px hint here
              // under-reports the real box on wide screens, and the browser
              // then picks a variant smaller than the slot and upscales it.
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
              style={{ backgroundColor: project.thumbnailColor, opacity: 0.35 }}
            />
          )}
          <div className="bg-background/0 group-hover:bg-background/20 absolute inset-0 transition-colors duration-300 ease-in-out" />
        </div>
        <div className="mt-1 flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-6">
          {/* Wraps on phones; only truncates once the meta sits beside it. */}
          <h3 className="text-foreground min-w-0 sm:truncate">{project.title}</h3>
          <h4 className="shrink-0 sm:text-right">
            {project.company} • {project.year}
          </h4>
        </div>
      </div>
    </Link>
  );
}
