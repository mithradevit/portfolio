import Image from "next/image";
import type { Project } from "@/content/projects";
import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyBanner } from "./CaseStudyBanner";
import { CONTENT_HEADING } from "./typography";

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
      {/* Eyebrow above the title, as on both references. It answers "what field
          is this" before the title answers "what was built", and it stops the
          title's descenders running straight into a line of mono capitals. */}
      <div className="flex flex-col gap-3">
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
        {/* Geist, not the serif the bare `h1` rule sets. The `!` is required:
            that rule is unlayered and beats a plain utility. */}
        <h1 className="font-sans! tracking-[-0.03em]!">{project.title}</h1>
      </div>

      {/* The product, shown before it is described. Above the meta grid rather
          than below it: role, timeline and team are answers to questions a
          reader only has once they know what the thing is. */}
      {caseStudy.hero ? (
        <CaseStudyBanner banner={caseStudy.hero} />
      ) : (
        caseStudy.cover && (
          <div className="border-foreground/10 w-full overflow-hidden rounded-[14px] border">
            <Image
              src={caseStudy.cover.src}
              alt={caseStudy.cover.alt}
              width={caseStudy.cover.width}
              height={caseStudy.cover.height}
              quality={90}
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="h-auto w-full"
            />
          </div>
        )
      )}

      {/* Four fields sit in one four-up row. Once location or scope is added
          the row would squeeze past reading width, so it drops to three across
          and wraps — two tidy rows of three rather than six thin columns. */}
      <div
        className={
          "grid grid-cols-2 gap-6 border-y border-foreground/10 py-6 " +
          (caseStudy.location || caseStudy.scope ? "sm:grid-cols-3" : "sm:grid-cols-4")
        }
      >
        <MetaField label="Role" value={caseStudy.role} />
        <MetaField label="Timeline" value={caseStudy.timeline} />
        {caseStudy.location && <MetaField label="Location" value={caseStudy.location} />}
        {caseStudy.scope && <MetaField label="Scope" value={caseStudy.scope} />}
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
      <h4 className={CONTENT_HEADING}>{label}</h4>
      <p className="text-[15px]">{value}</p>
    </div>
  );
}
