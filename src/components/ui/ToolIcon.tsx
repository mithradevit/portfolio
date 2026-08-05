import type { Tool } from "@/content/tools";

export function ToolIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  if (tool.iconPath) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden
        className="grayscale opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      >
        <path d={tool.iconPath} fill={tool.color ?? "currentColor"} />
      </svg>
    );
  }

  return (
    <div
      aria-hidden
      style={{ width: size, height: size }}
      className="border-foreground/20 text-foreground-light group-hover:border-primary group-hover:text-primary flex items-center justify-center rounded-[4px] border font-mono text-[9px] transition-colors duration-300"
    >
      {tool.name.charAt(0)}
    </div>
  );
}
