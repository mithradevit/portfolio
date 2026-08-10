import { funProjects, funTagline, funHero } from "@/content/fun-projects";
import { writingPosts, substackUrl } from "@/content/writing";
import { WritingList } from "@/components/fun/WritingList";
import { FunProjectsGrid } from "@/components/fun/FunProjectsGrid";
import { PixelHero } from "@/components/fun/PixelHero";
import { Reveal } from "@/components/motion/Reveal";

export default function FunPage() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-16">
        <PixelHero image={funHero.image} alt={funHero.alt}>
          <h1>{funTagline}</h1>
        </PixelHero>

        <div className="flex flex-col gap-6">
          <h4>Projects & Hackathons</h4>
          <FunProjectsGrid projects={funProjects} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <h4>Writing</h4>
            <a
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="hover:text-primary"
            >
              <h4>Read on Substack</h4>
            </a>
          </div>
          <WritingList posts={writingPosts} />
        </div>
      </Reveal>
    </div>
  );
}
