import { ArrowUpRight } from "lucide-react";
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
      {/* Back lives in CaseStudyNav now, so it stays on screen while reading. */}
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

      {caseStudy.links && caseStudy.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {caseStudy.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="group border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[12px] tracking-wide uppercase transition-colors duration-300"
            >
              {link.label}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      )}
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
