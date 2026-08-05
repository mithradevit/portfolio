import Image from "next/image";
import type { FunProject } from "@/content/fun-projects";

export function FunProjectCard({ project }: { project: FunProject }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="border-foreground/10 relative aspect-[8/5] w-full overflow-hidden border">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="bg-foreground/5 absolute inset-0" />
        )}
      </div>
      <h3 className="text-[17px]">{project.title}</h3>
      <p className="text-foreground-light text-[15px]">{project.description}</p>
      <h4 className="text-foreground-light">{project.event}</h4>
    </div>
  );
}
