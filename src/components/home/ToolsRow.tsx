"use client";

import { useState } from "react";
import { LayoutList, Shuffle } from "lucide-react";
import { tools, toolCategories, type Tool } from "@/content/tools";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * The tool stack, in two moods.
 *
 * Default is a drifting marquee — 25 logos as texture rather than a list,
 * which is what most visitors want from this section. The toggle sorts them
 * into plain-language groups for the reader who actually came to audit the
 * stack, and puts them back when they're done.
 *
 * Both states render the same pills from the same data; only the container
 * changes, so nothing has to be kept in sync.
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

/** One scrolling lane. The list is rendered twice so the -50% loop is seamless;
 *  the copy is hidden from assistive tech to avoid reading 25 tools twice. */
function MarqueeLane({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track flex gap-2 ${reverse ? "marquee-track-reverse" : ""}`}>
        {items.map((tool) => (
          <ToolPill key={tool.name} tool={tool} />
        ))}
        <div aria-hidden className="flex gap-2">
          {items.map((tool) => (
            <ToolPill key={`${tool.name}-copy`} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolsRow() {
  const [sorted, setSorted] = useState(false);

  // Split into lanes that drift in opposite directions — a single lane reads
  // as a broken scrollbar, two read as motion.
  const half = Math.ceil(tools.length / 2);
  const lanes = [tools.slice(0, half), tools.slice(half)];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ScrambleText as="h4" text="Tools" delay={0.3} scrambleOnHover />

        <button
          type="button"
          onClick={() => setSorted((v) => !v)}
          data-cursor="pointer"
          aria-pressed={sorted}
          className="group border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[12px] tracking-wide uppercase transition-colors duration-300"
        >
          {/* Says what it does first, personality second — a visitor scanning
              the page shouldn't have to click to find out what the button is
              for. */}
          {sorted ? <Shuffle size={13} strokeWidth={1.5} /> : <LayoutList size={13} strokeWidth={1.5} />}
          {sorted ? "Set them drifting" : "Categorize"}
        </button>
      </div>

      {sorted ? (
        toolCategories.map((category, i) => {
          const group = tools.filter((t) => t.category === category.id);
          if (group.length === 0) return null;

          return (
            <div
              key={category.id}
              className="grid grid-cols-1 gap-3 lg:grid-cols-[200px_1fr] lg:items-start lg:gap-6"
            >
              <ScrambleText
                as="h4"
                text={category.label}
                delay={i * 0.06}
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
        })
      ) : (
        <div className="flex flex-col gap-2">
          {lanes.map((lane, i) => (
            <MarqueeLane key={i} items={lane} reverse={i % 2 === 1} />
          ))}
        </div>
      )}
    </div>
  );
}
