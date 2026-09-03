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
    // Page margin, at the reference's own two exact values: 20px below 700px,
    // 24px from 700 up (`--cs-margin`). Tailwind's own `sm:` (640) doesn't land
    // on her number, so this uses an arbitrary variant to hit 700 precisely.
    <div className="min-h-screen w-full px-5 min-[700px]:px-6">
      {/* No column track for the rail: it is `fixed`, so it is out of flow and
          the article is simply centred in the full viewport at every width.
          That is what makes the reference's centring hold on a small laptop —
          there is no side column competing with the measure for room. */}
      <Reveal className="mx-auto flex w-full max-w-[2000px] flex-col">
        <CaseStudyNav
          items={caseStudy.sections.map((s) => ({ heading: s.heading, navLabel: s.navLabel }))}
        />

        {/* Bottom padding lets the final section scroll up into the nav's
            trigger band — without it the page bottoms out first and the
            highlight can never reach the last item.

            Section rhythm at the reference's own three exact values —
            `--cs-section-gap`: 72px below 700px, 84px from 700–991, 120px from
            992 up. Its page is a 12-column photo grid and ours is a single
            prose column, so the grid itself doesn't transfer, but the spacing
            scale is just numbers and those do.

            900px, close to the reference's own large-media width — at 1440 her
            twelve columns resolve to 100px each on 16px gaps, and a large
            media block spans eight of them, 913px, inside a 1377px container.
            Ours is a single column rather than a twelve-column grid, so the
            article takes one width rather than every element inheriting a
            grid track.

            `data-case-study-content` is a bare marker, not a styling hook:
            CaseStudyNav measures this element's own left edge at runtime to
            decide whether the rail actually clears it, rather than assuming a
            hand-picked viewport-width breakpoint still holds. */}
        <div
          data-case-study-content
          className="mx-auto flex w-full flex-col gap-[72px] py-12 pb-[45vh] md:max-w-[900px] min-[700px]:gap-[84px] min-[992px]:gap-[120px]"
        >
          <CaseStudyHeader project={project} caseStudy={caseStudy} />
          {caseStudy.sections.map((section, i) => (
            <CaseStudySection
              key={i}
              section={section}
              matted={caseStudy.mattedImages}
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
