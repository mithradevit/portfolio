import { tools } from "@/content/tools";
import { ToolIcon } from "@/components/ui/ToolIcon";

export function ToolsRow() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h4>Tools</h4>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group border-foreground/10 hover:border-primary/40 flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-300"
          >
            <ToolIcon tool={tool} />
            <span className="text-foreground-light group-hover:text-foreground font-mono text-[12px] tracking-wide uppercase transition-colors duration-300">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
