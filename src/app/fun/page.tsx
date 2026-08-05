import { funProjects, funTagline } from "@/content/fun-projects";
import { writingPosts, substackUrl } from "@/content/writing";
import { WritingList } from "@/components/fun/WritingList";
import { FunProjectCard } from "@/components/fun/FunProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export default function FunPage() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-16">
        <h1 className="max-w-[700px] pt-8 lg:pt-[16vh]">{funTagline}</h1>

        <div className="flex flex-col gap-6">
          <h4>Projects & Hackathons</h4>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {funProjects.map((project, i) => (
              <FunProjectCard key={i} project={project} />
            ))}
          </div>
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
