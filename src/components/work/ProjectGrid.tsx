import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { RevealItem } from "@/components/motion/Reveal";

/**
 * One column, not two.
 *
 * The cards number themselves and carry their year, so a single stack reads
 * as a dated list running 01 → 08 down the page. Split across two columns the
 * left one ran 01, 03, 05 and the numbering stopped meaning anything.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex w-full flex-col gap-12 lg:gap-16">
      {projects.map((project, index) => (
        <RevealItem key={project.slug} index={index}>
          <ProjectCard project={project} index={index} />
        </RevealItem>
      ))}
    </div>
  );
}
