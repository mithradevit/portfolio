import { profile } from "@/content/profile";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** Short bio plus the tag pills that summarise what she works on. */
export function IntroBlock() {
  return (
    <div className="flex w-full max-w-[720px] flex-col gap-4">
      {/* Fixed-height header row, matched by the Experience block. Its label
          shares a row with a 32px button; without a shared height the two
          section labels sit on different baselines. */}
      <div className="flex h-8 items-center">
        <ScrambleText as="h4" text="About" delay={0.1} scrambleOnHover />
      </div>

      {/* ~70 characters a line at 15px. Set in px, not ch: `ch` resolves
          against this wrapper's own font size rather than the paragraphs'
          inside it, which quietly measured a third too wide. */}
      <div className="flex max-w-[520px] flex-col gap-3">
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-foreground-light leading-[1.65]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
