import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { ExperienceTimeline } from "@/components/work/ExperienceTimeline";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { IntroBlock } from "@/components/home/IntroBlock";
import { ToolsRow } from "@/components/home/ToolsRow";
import { SkillsGraph } from "@/components/home/SkillsGraph";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { PlayfulMotionText } from "@/components/ui/PlayfulMotionText";
import { Reveal } from "@/components/motion/Reveal";
import { LiveTime } from "@/components/home/LiveTime";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsOdometer } from "@/components/home/StatsOdometer";

export default function HomePage() {
  return (
    // Every page uses this same shell: 1800px container aligned with the
    // header and footer, and one `gap-16 lg:gap-24` band rhythm. Sections
    // must not carry their own vertical padding — that is what made the
    // spacing read as uneven from page to page.
    <div className="flex w-full flex-col items-center gap-16 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-16 lg:gap-24">
        <div className="flex w-full flex-col gap-5 pt-8 lg:pt-[18vh]">
          <LiveTime />
          <h1 className="max-w-[820px]">
            <PlayfulMotionText
              segments={[
                { text: `${profile.taglineLead} ` },
                { text: profile.taglineAccent, className: "italic" },
                { text: ` ${profile.taglineTail}` },
              ]}
            />
          </h1>
        </div>

        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
          <IntroBlock />
          <ExperienceTimeline entries={experience} />
        </div>

        <StatsOdometer />

        <ServicesSection />

        <div className="flex flex-col gap-4">
          <ScrambleText as="h4" text="Selected Work" delay={0.25} scrambleOnHover />
          <ProjectGrid projects={projects} />
        </div>

        <ToolsRow />

        <SkillsGraph />
      </Reveal>
    </div>
  );
}
