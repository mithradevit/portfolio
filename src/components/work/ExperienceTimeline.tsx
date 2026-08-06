import { Download } from "lucide-react";
import type { ExperienceEntry } from "@/content/experience";
import { profile } from "@/content/profile";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <ScrambleText as="h4" text="Experience" delay={0.2} scrambleOnHover />
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300"
        >
          <Download size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          <span className="font-mono text-[12px] tracking-wide uppercase">CV</span>
        </a>
      </div>

      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div
            key={`${entry.company}-${entry.role}-${i}`}
            className="group border-foreground/10 hover:border-primary/30 flex flex-col gap-0.5 border-b py-3 transition-colors duration-300 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <div className="group-hover:text-primary min-w-[220px] font-medium transition-colors duration-300">
              {entry.companyUrl ? (
                <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
            </div>
            <p className="text-foreground-light flex-1 text-[15px]">{entry.role}</p>
            <h4 className="text-foreground-light shrink-0">{entry.year}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
