import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
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
    <div className="flex w-full flex-col items-center p-6">
      <Reveal className="flex w-full max-w-[900px] flex-col gap-16 py-8">
        <CaseStudyHeader project={project} caseStudy={caseStudy} />
        {caseStudy.sections.map((section, i) => (
          <CaseStudySection key={i} section={section} />
        ))}
      </Reveal>
    </div>
  );
}
