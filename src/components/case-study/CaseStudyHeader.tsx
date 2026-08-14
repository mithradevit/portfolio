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

      {caseStudy.nda && (
        <p className="border-primary/40 text-foreground-light border-l-2 py-1 pl-4 text-[14px] leading-[1.6]">
          {caseStudy.nda}
        </p>
      )}

      {/* Links are not rendered here — they sit on the same row as the first
          section's heading, in CaseStudySection's `trailing` slot. */}
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
