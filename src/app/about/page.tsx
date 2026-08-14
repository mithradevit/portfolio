import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { InterestList } from "@/components/about/InterestList";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { ProfileWindow } from "@/components/about/ProfileWindow";
import { ArcCarousel } from "@/components/about/ArcCarousel";
import { MilestoneTimeline, CertificationTimeline } from "@/components/about/MilestoneTimeline";
import { ActivityStrip } from "@/components/home/ActivityStrip";
import { FaqChat } from "@/components/about/FaqChat";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Reveal } from "@/components/motion/Reveal";

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-6">
      {/* Same 1800px shell and same `gap-16 lg:gap-24` band rhythm as Home and
          Fun, so About shares a left edge with the header and footer. The
          narrower 1040px measure the hero wants is applied by ProfileWindow
          itself, which centres inside this container. */}
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-16 lg:gap-24">
        {/* The fold is centred in the viewport rather than pinned under the
            header — that vertical breathing room is most of what reads as
            "composed" in the reference. */}
        <div className="flex min-h-[calc(100svh-140px)] items-center">
          <ProfileWindow />
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
          <div className="flex flex-col gap-6">
            <div>
              <ScrambleText as="h4" text="Outside of work" delay={0.15} scrambleOnHover />
              <div className="mt-2">
                <InterestList interests={about.interests} />
              </div>
            </div>
            <p className="text-foreground-light text-[15px]">
              {about.contactPrompt}{" "}
              <a href={`mailto:${profile.email}`} data-cursor="pointer" className="text-primary">
                {profile.email}
              </a>
            </p>
          </div>

          {/* Compact: this row is about the interests list, not the graph —
              the full-width version stays available via `compact={false}`
              if it ever needs its own section again. */}
          <ActivityStrip compact />
        </div>

        {/* These two pairs render visually similar content back to back —
            two dense rulers, two photo grids — so the shared page rhythm
            reads as one continuous block rather than four sections. Each
            pair gets a tighter internal gap than the band rhythm separating
            them, so the grouping itself stays visible. */}
        <div className="flex flex-col gap-10">
          <MilestoneTimeline />
          <CertificationTimeline />
        </div>

        <div className="flex flex-col gap-10">
          <PhotoGrid categories={about.photoCategories} />
          <ArcCarousel />
        </div>

        <FaqChat />
      </Reveal>
    </div>
  );
}
