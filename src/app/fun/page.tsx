import Image from "next/image";
import { funProjects, funHero } from "@/content/fun-projects";
import { writingPosts, substackUrl } from "@/content/writing";
import { WritingList } from "@/components/fun/WritingList";
import { FunProjectsGrid } from "@/components/fun/FunProjectsGrid";
import { PixelHero } from "@/components/fun/PixelHero";
import { Reveal } from "@/components/motion/Reveal";

export default function FunPage() {
  return (
    // Same shell as Work and About: `p-6 lg:p-10` margins and the
    // `gap-40 lg:gap-60` band rhythm. Fun was still on the old 24px/96px
    // values, which is why it read as a different page rather than a
    // lighter one.
    <div className="flex w-full flex-col items-center gap-16 p-6 lg:p-10">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-40 lg:gap-60">
        {/* The reveal is invisible until the cursor is actually over the
            panel, so without a prompt most readers scroll straight past it.
            The label sits outside the hero rather than inside it — the tiles
            clear wherever the pointer goes, so any hint printed on the artwork
            would be erased by the very gesture it is asking for. */}
        {/* Every section on the site puts its label in a fixed 32px row and
            steps 16px down to its content. Fun was using a bare label and a
            24px step, so its headings sat on a different line to the ones on
            Work and About. */}
        <div className="flex flex-col gap-4">
          <div className="flex h-8 items-center">
            <h4>{"Hover to see <3"}</h4>
          </div>
          <PixelHero image={funHero.image} alt={funHero.alt} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-8 items-center">
            <h4>Projects & Hackathons</h4>
          </div>
          <FunProjectsGrid projects={funProjects} />
        </div>

        {/* Same label-plus-content shape as the two sections either side, so
            the moodboard reads as a third section rather than a loose image
            dropped between them. */}
        <div className="flex flex-col gap-4">
          <div className="flex h-8 items-center">
            <h4>Me if I was a board</h4>
          </div>
          {/* Full width and uncropped. `aspect-[16/9]` is the file's own
              ratio, so `object-cover` never actually crops — it is there to
              hold the box's shape while the image loads rather than to trim
              it. Same border as the hero so the two read as a pair. */}
          <div className="border-foreground/10 relative aspect-[16/9] w-full overflow-hidden border">
            <Image
              src="/images/fun/moodboard.webp"
              alt="A moodboard on a blue checkerboard background: coffee, flowers, a girl reading in headphones, a disco ball, a record player, and handwritten notes about keeping space for the impossible."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* `items-center` in a 32px row, not `items-baseline`: the same
              header shape Experience uses for its CV button, so a label with
              something beside it still lands on the common line. */}
          <div className="flex h-8 items-center justify-between gap-4">
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
