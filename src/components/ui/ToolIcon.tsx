import type { Tool } from "@/content/tools";

// Icons render greyscale at rest and bloom into brand colour on hover, so the
// tools row reads as a calm list until you engage with it.
export function ToolIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  if (tool.iconPath) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden
        className="opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      >
        <path d={tool.iconPath} fill={tool.color ?? "currentColor"} />
      </svg>
    );
  }

  // Adobe and OpenAI marks aren't redistributable via simple-icons, so those
  // tools get a brand-coloured monogram instead.
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, backgroundColor: tool.color ?? "currentColor" }}
      className="flex items-center justify-center rounded-[4px] font-mono text-[10px] font-medium text-white opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    >
      {tool.name.charAt(0)}
    </div>
  );
}
