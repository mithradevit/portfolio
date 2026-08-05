import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { ExperienceTimeline } from "@/components/work/ExperienceTimeline";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ToolsRow } from "@/components/home/ToolsRow";
import { Reveal } from "@/components/motion/Reveal";
import { VinylPlayer } from "@/components/home/VinylPlayer";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center gap-12 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col">
        <div className="grid w-full grid-cols-1 gap-12 pt-8 pb-8 lg:grid-cols-2 lg:gap-6 lg:pt-[26vh]">
          <div className="flex w-full flex-col gap-4">
            <h1 className="max-w-[700px]">
              {profile.taglineLead} <span className="italic">{profile.taglineAccent}</span>{" "}
              {profile.taglineTail}
            </h1>
          </div>
          <ExperienceTimeline entries={experience} />
        </div>

        <ProjectGrid projects={projects} />

        <div className="pt-16 pb-8">
          <ToolsRow />
        </div>
      </Reveal>

      <VinylPlayer />
    </div>
  );
}
