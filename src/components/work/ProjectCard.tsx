import Link from "next/link";
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
          <div
            className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
            style={{ backgroundColor: project.thumbnailColor, opacity: 0.35 }}
          />
          <div className="bg-background/0 group-hover:bg-background/20 absolute inset-0 transition-colors duration-300 ease-in-out" />
        </div>
        <div className="mt-1 flex flex-col justify-between gap-0.5 lg:flex-row">
          <h3 className="text-foreground text-[17px]">{project.title}</h3>
          <h4 className="text-[15px]">
            {project.company} • {project.year}
          </h4>
        </div>
      </div>
    </Link>
  );
}
