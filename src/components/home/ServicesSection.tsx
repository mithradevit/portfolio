import { Compass, LayoutGrid, Component, Sparkles, Radio, Accessibility } from "lucide-react";
import { services, type Service } from "@/content/services";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** Name → component map, so `content/services.ts` can stay JSX-free. */
const icons = { Compass, LayoutGrid, Component, Sparkles, Radio, Accessibility };

/**
 * One service as a column rather than a full-width row.
 *
 * Everything is flush left. The old row put the name left and its items
 * right-aligned, which gave the list a ragged left edge — the eye has to hunt
 * for the start of each line. Ranged left, all six lists share one margin and
 * scan as a single block.
 */
function ServiceColumn({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <div className="border-foreground/10 group flex flex-col gap-4 border-t pt-5 pb-2">
      <div className="flex items-start gap-2.5">
        <Icon
          size={16}
          strokeWidth={1.25}
          className="text-foreground-light group-hover:text-primary mt-[3px] shrink-0 transition-colors duration-300"
        />
        {/* The one line at full-strength ink in the column, so the name reads as
            the heading of the list under it without needing a larger size. */}
        <span className="text-foreground text-[15px] leading-snug tracking-[-0.01em]">
          {service.name}
        </span>
      </div>

      {/* Indented to the name's text edge (icon 16 + gap 10), so name and items
          share one left margin and the column has a single alignment. */}
      <ul className="flex flex-col gap-1.5 pl-[26px]">
        {service.items.map((item) => (
          // 15px, the site's one body size — the same as case-study prose and
          // the service name above it. This was 13.5px, which made the lists
          // read as captions rather than as content, and put a fourth size in
          // a block that only needs one.
          //
          // No font-size utility at all: the bare `li` rule in globals.css
          // already sets 15px, and it is unlayered, so an override would need
          // `!` to win. Letting the rule apply is what keeps this in step if
          // the base size ever moves.
          <li key={item} className="text-foreground-light leading-[1.55]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesSection() {
  return (
    // gap-4 label→content, the same step every other section on this page
    // uses, with the shell's `gap-16 lg:gap-24` left to do all the separating.
    // This section previously used gap-12 internally, which read as a band
    // break in the middle of one section.
    <div className="flex w-full flex-col gap-4">
      {/* The same fixed 32px label row every other section on this page uses,
          so all the h4s land on one optical line down the page. */}
      <div className="flex h-8 items-center">
        <ScrambleText as="h4" text="Services" delay={0.15} scrambleOnHover />
      </div>

      {/* Six services, so 3 × 2 and 2 × 3 both come out square — no orphan
          column on either breakpoint. The gap is wider across than down
          (x-12 / y-8) because columns need more air between them than rows do
          to stop two adjacent lists reading as one wrapped line. */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceColumn key={service.name} service={service} />
        ))}
      </div>
    </div>
  );
}
