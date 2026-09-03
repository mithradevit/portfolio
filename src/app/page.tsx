import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { ExperienceTimeline } from "@/components/work/ExperienceTimeline";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { IntroBlock } from "@/components/home/IntroBlock";
import { ToolsRow } from "@/components/home/ToolsRow";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { PlayfulMotionText } from "@/components/ui/PlayfulMotionText";
import { Reveal } from "@/components/motion/Reveal";
import { LiveTime } from "@/components/home/LiveTime";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HeroStats } from "@/components/home/HeroStats";
import { OrbitGallery, type OrbitImage } from "@/components/work/OrbitGallery";
import { ScrollToHash } from "@/components/motion/ScrollToHash";

// Five personal photos. None carry an `href` — they aren't project work, so
// linking them into a case study would be a misleading destination.
const orbitImages: OrbitImage[] = [
  { src: "/images/orbit/orbit-1.webp", alt: "Mithra outdoors on a hillside under a clear blue sky." },
  { src: "/images/orbit/orbit-2.webp", alt: "Mithra sitting by a lily pond beside a wooden cart pavilion." },
  { src: "/images/orbit/orbit-3.webp", alt: "Mithra taking a mirror photo in a lift." },
  { src: "/images/orbit/orbit-4.webp", alt: "Mithra at a table in a taqueria, black and white." },
  { src: "/images/orbit/orbit-5.webp", alt: "Mithra reading a paperback at a wooden café table." },
];

export default function HomePage() {
  return (
    // Every page uses this same shell: 1800px container aligned with the
    // header and footer, and one `gap-16 lg:gap-24` band rhythm. Sections
    // must not carry their own vertical padding — that is what made the
    // spacing read as uneven from page to page.
    <div className="flex w-full flex-col items-center gap-16 p-6 lg:p-10">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-40 lg:gap-60">
        {/* The hero is at least a screen tall, but it does not promise that
            every element inside it fits above the fold. That promise was what
            forced five things to shrink together whenever a window got short,
            and it is what produced the collisions — tiles under the header,
            the record over the title, the name below the screen edge. Orbit,
            status line, title and name fit on any realistic screen; on a short
            laptop the stats block sits just below the fold, which is ordinary
            and costs nothing. `dvh` so a mobile address bar collapsing doesn't
            shift the layout; the 3rem is the shell's own `p-6`, top and bottom. */}
        {/* Spacing runs on one ratio rather than a single flat gap: the orbit
            gets the largest space around it, the status line sits closer to
            the title it introduces, and the title/name pair is tightest of
            all. Proximity is what groups them — equal gaps everywhere would
            read as four unrelated blocks. */}
        <div className="snap-section flex min-h-[calc(100dvh-11rem)] w-full flex-col justify-center gap-[clamp(2rem,7vh,5rem)] pt-4">
          {/* Width-capped and centred rather than filling the page container:
              the orbit radius is a percentage of its own box, so letting it
              inherit the 1800px shell doubled the radius and flung the tiles
              to the edges — the cap is what keeps the cluster tight. */}
          {/* `flex-1` so the orbit takes the whole band between the header and
              the text block, and centres itself inside it — the cluster then
              sits midway between the two rather than wherever the stack's
              gaps happen to leave it. */}
          {/* The top padding is the header's own footprint: the nav is a fixed
              overlay, so it takes no space in the flow and the orbit would
              otherwise centre itself into the band the nav is floating over.
              The tiles scale up past 1 near the viewer, so they need real
              clearance, not just the box's edge. */}
          <div className="flex flex-1 items-center justify-center pt-[clamp(3.5rem,9vh,6rem)]">
          <OrbitGallery
            images={orbitImages}
            // One rule for the box, no breakpoints: it grows with the display
            // instead of sitting at a fixed size in the middle of a large
            // monitor, and `maxFit` lets the tiles scale up to match. The
            // component takes both dimensions into account, so a short box
            // gets proportionally smaller tiles rather than full-size ones
            // overhanging its top edge.
            // Narrower cap on the 1366-class laptop only. There the 74vw box
            // came to 1011px, and since the radius is a percentage of the box,
            // the cluster spread most of the way across the screen. Every
            // other size keeps 74vw / the 1240px ceiling.
            // `orbit-laptop` narrows the box on the 1366-class laptop only —
            // see globals.css. Written as a real media query there rather than
            // an arbitrary variant here: Tailwind drops the spaces around the
            // `and` keywords, which produces CSS the parser rejects.
            className="orbit-laptop mx-auto h-[clamp(220px,38vh,520px)] w-full max-w-[min(1240px,74vw)]"
            maxFit={1.45}
            itemWidth={260}
            itemHeight={180}
            // Wider tiles than the original 190, on a path only slightly wider
            // than the original 60 — enough to stop them piling up, without
            // the cluster stretching across the whole page.
            orbitWidth={64}
            referenceWidth={880}
            xCurve={-90}
            // Flatter than the -90 default: the reference spreads about 136px
            // vertically against 590px horizontally, so the ellipse is much
            // shallower than it is wide.
            yCurve={-30}
            // The original's rate is `speed × 12` degrees per second, so its
            // default of 3 is 36°/s — a full turn every 10 seconds. This is the
            // same motion model, just wound down to a slower drift.
            speed={1.2}
            depthEffect="pixelate"
            pixelSize={14}
            rounded={3}
          />
          </div>
          {/* Status, title and stats form one block under the orbit, held
              together by a gap much smaller than the one above them. The top
              margin adds to the stack's own gap, so the space the block keeps
              from the orbit grows with the viewport while the spacing inside
              the block stays fixed. */}
          <div className="mt-[clamp(2rem,6vh,5rem)] flex flex-col gap-5">
          {/* Its own full-width row rather than sitting in the left column:
              the availability half is right-aligned to the page edge, which it
              can only reach if the line spans the container. */}
          <LiveTime />
          {/* Title/name left, proof block right, both sitting on the same
              bottom edge. Stacked below lg, where two columns would leave the
              name on one narrow line. */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="flex min-w-0 flex-col gap-5">
          {/* Geist rather than the serif display face the h1 rule sets, and
              tightened — the `!` is required because the bare `h1` rule in
              globals.css is unlayered and would otherwise win. */}
          {/* Phone steps the title down to 1.5rem; the sm/lg sizes are the
              globals.css h1 values, restated because overriding the base size
              means restating the ones above it. `!` throughout: the bare h1
              rule is unlayered and beats a plain utility. */}
          <h1 className="max-w-[820px] text-[1.5rem]! font-sans! tracking-[-0.04em]! sm:text-[2.75rem]! lg:text-[3.5rem]!">
            <PlayfulMotionText segments={[{ text: profile.title }]} />
          </h1>
          {/* One golden-ratio step down from the title at every breakpoint —
              0.618 × the h1 sizes set in globals.css (2rem / 2.75rem / 3.5rem).
              The 1200px stop is the h1's own, not a Tailwind default. */}
          <p
            // The parent stack is `gap-5` (20px); this pulls the name back up
            // against the title so the two read as one lockup rather than as
            // two separate lines.
            className="text-foreground-light -mt-4 leading-none font-sans! tracking-[-0.03em]"
            // Inline, not a utility: the bare `p` rule in globals.css sets
            // 15px and is unlayered, so it beat even the `!` font-size.
            // The clamp tracks the h1's own 2rem → 3.5rem ramp at 0.618×.
            // Golden ratio against the title at every stop: 0.618 × the h1's
            // 1.5rem / 2.75rem / 3.5rem ramp. The floor moved down with the
            // phone title so the pair keeps the same relationship there.
            style={{ fontSize: "clamp(0.927rem, 0.18rem + 2.643vw, 2.163rem)" }}
          >
            {profile.name}
          </p>
            </div>
            <HeroStats />
          </div>
          </div>
        </div>

        {/* The second screen: About and Experience, centred in a band a
            viewport tall. The height is what makes it read as a fold rather
            than as another block in the scroll, and `content-center` sits the
            two columns in the middle of it instead of pinning them to the top
            of a mostly empty screen.

            Tools has a fold of its own, further down. */}
        <div className="snap-section grid min-h-[calc(100dvh-12rem)] w-full grid-cols-1 content-center gap-12 lg:grid-cols-2 lg:gap-6">
          <IntroBlock />
          <ExperienceTimeline entries={experience} />
        </div>

        {/* No `snap-section` from here down. Snapping earns its keep on the
            two screens that are meant to be read whole; below that the
            sections are taller than the viewport and reading them means
            stopping partway, which is exactly where a snap point pulls the
            page out from under the reader. */}
        <ScrollToHash />
        <ServicesSection />

        {/* After Services, which it now reads as the evidence for: Services
            says what she takes on, Tools says what she takes it on with. */}
        <div className="snap-section flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center">
          <ToolsRow />
        </div>

        {/* `id` is the return address for a case study's Back link, which
            sends the reader to the grid they came from rather than the top of
            the page. `scroll-mt-28` keeps the heading clear of the floating
            header once the jump lands, and ScrollToHash (above) re-runs the
            jump after this page finishes growing — without it the arrival
            overshoots, because the browser scrolls before the images below
            have taken up their space. */}
        <div id="selected-work" className="flex scroll-mt-28 flex-col gap-4">
          <div className="flex h-8 items-center">
            <ScrambleText as="h4" text="Selected Work" delay={0.25} scrambleOnHover />
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </Reveal>
    </div>
  );
}
