import { about } from "@/content/about";
import { leadership } from "@/content/fun-projects";
import { FunProjectsGrid } from "@/components/fun/FunProjectsGrid";
import { profile } from "@/content/profile";
import { InterestList } from "@/components/about/InterestList";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { ProfileWindow } from "@/components/about/ProfileWindow";
import { ArcCarousel } from "@/components/about/ArcCarousel";
import { CertificationTimeline } from "@/components/about/MilestoneTimeline";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { ActivityStrip } from "@/components/home/ActivityStrip";
import { SkillsGraph } from "@/components/home/SkillsGraph";
import { FaqChat } from "@/components/about/FaqChat";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Reveal } from "@/components/motion/Reveal";
import { flags } from "@/lib/flags";

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-6 lg:p-10">
      {/* Same 1800px shell and same `gap-40 lg:gap-60` band rhythm as Home, so
          About shares a left edge with the header and footer and the two pages
          breathe identically. The narrower 1040px measure the hero wants is
          applied by ProfileWindow itself, which centres inside this container. */}
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-40 lg:gap-60">
        {/* The fold is centred in the viewport rather than pinned under the
            header — that vertical breathing room is most of what reads as
            "composed" in the reference. */}
        <div className="flex min-h-[calc(100svh-140px)] items-center">
          <ProfileWindow />
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
          <div className="flex flex-col gap-6">
            {/* The 32px label row and 16px step to content that every
                labelled section on the site uses. This was an 8px `mt-2`
                against a bare label, which sat tighter than anything else on
                the page. */}
            <div className="flex flex-col gap-4">
              <div className="flex h-8 items-center">
                <ScrambleText as="h4" text="Outside of work" delay={0.15} scrambleOnHover />
              </div>
              <InterestList interests={about.interests} />
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

        {/* Two dense rulers back to back, so they're grouped as one block
            rather than two bands. The internal gap is a clear step below the
            band rhythm — the same relationship Tools has inside the About
            band on Home — so the grouping stays visible without the pair
            reading as cramped. */}
        <div className="flex flex-col gap-24 lg:gap-40">
          <CareerTimeline />

          {/* Moved off /fun. The workshop is not a side project — it belongs
              with the roles and certifications, which is where the page
              answers what she has actually done. It keeps the fun card and
              detail window because the shape of the content is identical. */}
          <div className="flex w-full flex-col gap-4">
            <div className="flex h-8 items-center">
              <ScrambleText as="h4" text="Leadership @ Figma" delay={0.15} scrambleOnHover />
            </div>
            <FunProjectsGrid
              projects={leadership}
              gridClassName="grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16"
            />
          </div>

          <CertificationTimeline />
        </div>

        {/* Moved here from Home. It belongs to the same question the timelines
            answer — what she's done and what she can do — and it was the one
            block on Work that wasn't a piece of work.

            No fold and no snap point here. The viewport-tall bands are a Work
            page device; About is a page you read down. */}
        <SkillsGraph />

        {/* Both are switched off in lib/flags.ts until there are real photos
            to put in them — see the note there. The wrapper is inside the
            check too, so the page doesn't keep an empty band's worth of gap
            where they used to be. */}
        {(flags.aboutPhotoGrid || flags.aboutArcCarousel) && (
          <div className="flex flex-col gap-10">
            {flags.aboutPhotoGrid && <PhotoGrid categories={about.photoCategories} />}
            {flags.aboutArcCarousel && <ArcCarousel />}
          </div>
        )}

        <FaqChat />
      </Reveal>
    </div>
  );
}
