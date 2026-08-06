import type { CaseStudySection as CaseStudySectionType } from "@/content/case-studies";

/** Stable anchor id from a heading, shared with CaseStudyNav. */
export function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function CaseStudySection({ section }: { section: CaseStudySectionType }) {
  return (
    <div id={sectionId(section.heading)} className="flex w-full scroll-mt-24 flex-col gap-4">
      <h3>{section.heading}</h3>
      {section.body.map((paragraph, i) => (
        <p key={i} className="text-foreground-light max-w-[700px] leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="flex list-none flex-col gap-2">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="text-foreground-light relative max-w-[700px] pl-4 leading-relaxed">
              <span className="absolute left-0">–</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
