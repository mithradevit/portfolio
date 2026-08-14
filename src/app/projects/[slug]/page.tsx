import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyLinks } from "@/components/case-study/CaseStudyLinks";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  const caseStudy = getCaseStudy(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <div className="flex w-full justify-center p-6">
      <Reveal className="grid w-full max-w-[1200px] grid-cols-1 gap-12 py-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <CaseStudyNav headings={caseStudy.sections.map((s) => s.heading)} />

        {/* Bottom padding lets the final section scroll up into the nav's
            trigger band — without it the page bottoms out first and the
            highlight can never reach the last item. */}
        <div className="flex w-full max-w-[760px] flex-col gap-16 pb-[45vh]">
          <CaseStudyHeader project={project} caseStudy={caseStudy} />
          {caseStudy.sections.map((section, i) => (
            <CaseStudySection
              key={i}
              section={section}
              trailing={
                i === 0 && caseStudy.links?.length ? (
                  <CaseStudyLinks links={caseStudy.links} />
                ) : undefined
              }
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
