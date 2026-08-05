import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyHeader({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <Link href="/" data-cursor="pointer" className="text-foreground-light flex w-fit items-center gap-2 hover:text-primary">
        <ArrowLeft size={14} />
        <h4>Back to Work</h4>
      </Link>

      <div className="flex flex-col gap-2">
        <h1>{project.title}</h1>
        <h4 className="text-foreground-light">
          {project.companyUrl ? (
            <a href={project.companyUrl} target="_blank" rel="noopener noreferrer" data-cursor="pointer" className="hover:text-primary">
              {project.company}
            </a>
          ) : (
            project.company
          )}{" "}
          • {project.category}
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-6 border-y border-foreground/10 py-6 sm:grid-cols-4">
        <MetaField label="Role" value={caseStudy.role} />
        <MetaField label="Timeline" value={caseStudy.timeline} />
        <MetaField label="Team" value={caseStudy.team} />
        <MetaField label="Skills" value={caseStudy.skills.join(", ")} />
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-foreground-light">{label}</h4>
      <p className="text-[15px]">{value}</p>
    </div>
  );
}
