import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { RevealItem } from "@/components/motion/Reveal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const indexed = projects.map((project, index) => ({ project, index }));
  const left = indexed.filter((_, i) => i % 2 === 0);
  const right = indexed.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        {left.map(({ project, index }) => (
          <RevealItem key={project.slug} index={index}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {right.map(({ project, index }) => (
          <RevealItem key={project.slug} index={index}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </div>
    </div>
  );
}
