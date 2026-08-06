import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { ExperienceTimeline } from "@/components/work/ExperienceTimeline";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { IntroBlock } from "@/components/home/IntroBlock";
import { ToolsRow } from "@/components/home/ToolsRow";
import { SkillsGraph } from "@/components/home/SkillsGraph";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Reveal } from "@/components/motion/Reveal";
import { VinylPlayer } from "@/components/home/VinylPlayer";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center gap-12 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col">
        <div className="w-full pt-8 pb-12 lg:pt-[18vh]">
          <h1 className="max-w-[820px]">
            <ScrambleText text={profile.taglineLead} />{" "}
            <ScrambleText className="italic" text={profile.taglineAccent} delay={0.25} />{" "}
            <ScrambleText text={profile.taglineTail} delay={0.5} />
          </h1>
        </div>

        <div className="grid w-full grid-cols-1 gap-12 pb-16 lg:grid-cols-2 lg:gap-16">
          <IntroBlock />
          <ExperienceTimeline entries={experience} />
        </div>

        <div className="flex flex-col gap-4 pb-8">
          <ScrambleText as="h4" text="Selected Work" delay={0.25} scrambleOnHover />
          <ProjectGrid projects={projects} />
        </div>

        <div className="pt-16 pb-8">
          <ToolsRow />
        </div>

        <div className="pt-8 pb-8">
          <SkillsGraph />
        </div>
      </Reveal>

      <VinylPlayer />
    </div>
  );
}
