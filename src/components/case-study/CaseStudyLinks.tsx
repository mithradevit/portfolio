import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";

/**
 * The outbound link pills — live product, full write-up, repo.
 *
 * Rendered on the same row as the first section's heading rather than in the
 * header block, so the page opens with one line that says both what this
 * section is and where to go see the real thing.
 */
export function CaseStudyLinks({ links }: { links: NonNullable<CaseStudy["links"]> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="site"
          className="group border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[12px] tracking-wide uppercase transition-colors duration-300"
        >
          {link.label}
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </div>
  );
}
