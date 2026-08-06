import { profile } from "@/content/profile";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** Short bio plus the tag pills that summarise what she works on. */
export function IntroBlock() {
  return (
    <div className="flex w-full max-w-[720px] flex-col gap-5">
      <ScrambleText as="h4" text="About" delay={0.1} scrambleOnHover />

      <div className="flex flex-col gap-3">
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-foreground-light leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="border-foreground/10 bg-foreground/5 text-foreground-light hover:border-primary/40 hover:text-foreground rounded-full border px-3 py-1.5 font-mono text-[12px] tracking-wide uppercase transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
