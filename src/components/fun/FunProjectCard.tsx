import Image from "next/image";
import type { FunProject } from "@/content/fun-projects";

export function FunProjectCard({ project }: { project: FunProject }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Same rounded-frame language as the ProfileWindow/FaqDetail chrome —
          a soft radius and a hairline + shadow instead of a hard square
          border, which is most of why the flat 1px-border version read as
          unfinished next to the reference. */}
      <div className="border-foreground/[0.08] bg-foreground/[0.03] relative aspect-[8/5] w-full overflow-hidden rounded-[14px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_6px_16px_-8px_rgb(50_64_79_/_12%)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            quality={90}
            className="object-cover object-center"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="bg-foreground/5 absolute inset-0" />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[17px]">{project.title}</h3>
        <p className="text-foreground-light line-clamp-3 text-[15px] leading-[1.5]">{project.description}</p>
        <h4 className="text-foreground-light mt-1">{project.event}</h4>
      </div>
    </div>
  );
}
