import type { ExperienceEntry } from "@/content/experience";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="flex w-full flex-col justify-end gap-0 align-bottom">
      <div className="flex flex-col gap-3 lg:gap-1">
        {entries.map((entry, i) => (
          <div key={`${entry.company}-${entry.role}-${i}`} className="flex gap-2">
            <h4 className="w-26 min-w-26">{entry.year}</h4>
            <div className="flex flex-col gap-0.5 lg:flex-row">
              <div className="w-56 min-w-56">
                {entry.companyUrl ? (
                  <a
                    href={entry.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="hover:text-primary"
                  >
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </div>
              <p>{entry.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
