import { tools, toolCategories, type Tool } from "@/content/tools";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * The tool stack, grouped.
 *
 * One state, no toggle, no motion. This used to default to a drifting marquee
 * with a button to sort it, and later sorted itself when the section scrolled
 * into view — three behaviours for a block whose whole job is to answer "what
 * does she work in". Grouped and still, it answers that on sight, and the
 * section can be read at a glance instead of waited on.
 *
 * Dropping the marquee also removes a permanent animation from a page that is
 * otherwise quiet, and with it the whole class of layout shifts that came from
 * swapping between two views of different heights.
 *
 * No `"use client"`: there is no state left here, so this renders on the
 * server and ships no JavaScript.
 */

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <div className="group border-foreground/10 hover:border-primary/40 flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300">
      <ToolIcon tool={tool} />
      <span className="text-foreground-light group-hover:text-foreground font-mono text-[12px] tracking-wide whitespace-nowrap uppercase transition-colors duration-300">
        {tool.name}
      </span>
    </div>
  );
}

export function ToolsRow() {
  return (
    // gap-4 and a 32px header row, matching Experience, Selected Work and
    // Skills. Every section on this page uses the same label→content step, so
    // the only varying vertical space is the shell's band gap.
    <div className="flex w-full flex-col gap-4">
      {/* Decodes when the section is scrolled to, not on page load — this
          block sits well below the fold, so a mount-time effect finished long
          before anyone got here. */}
      <div className="flex min-h-8 items-center">
        <ScrambleText as="h4" text="Tools" scrambleInView scrambleOnHover />
      </div>

      <div className="flex flex-col gap-4">
        {toolCategories.map((category, i) => {
          const group = tools.filter((t) => t.category === category.id);
          if (group.length === 0) return null;

          return (
            <div
              key={category.id}
              className="grid grid-cols-1 gap-3 lg:grid-cols-[200px_1fr] lg:items-start lg:gap-6"
            >
              {/* Staggered off each label's own arrival, so the five decode
                  in sequence down the column as the section comes up. */}
              <ScrambleText
                as="h4"
                text={category.label}
                delay={0.12 + i * 0.09}
                scrambleInView
                scrambleOnHover
                className="lg:pt-1.5"
              />
              <div className="flex flex-wrap gap-2">
                {group.map((tool) => (
                  <ToolPill key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
