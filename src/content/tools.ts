// Real data, sourced from Mithradevi's resume PDF (Aug 2026) — the
// "Tools — AI-Native Design & Engineering Stack" list, kept in sync with
// content/skills.ts. `iconPath` + `color` are SVG brand marks (24x24
// viewBox) vendored from simple-icons where a match exists; tools without
// an official mark available fall back to a monogram badge in ToolIcon.

export type ToolCategory = "design" | "ai" | "visual" | "build" | "research";

/** Grouped for a non-designer reader: the label says what the tools are FOR,
 *  not which vendor made them. Order is the order they render in. */
export const toolCategories: { id: ToolCategory; label: string }[] = [
  { id: "design", label: "Design & Prototyping" },
  { id: "ai", label: "AI-Assisted Design" },
  { id: "visual", label: "Visual & Motion" },
  { id: "build", label: "Build & Ship" },
  { id: "research", label: "Research & Synthesis" },
];

export type Tool = {
  name: string;
  category: ToolCategory;
  /** 24×24 SVG path, vendored from simple-icons. */
  iconPath?: string;
  /**
   * Path to a logo file under `public/images/tools/` — for brands that don't
   * license a mark to simple-icons (Adobe, OpenAI, Microsoft). Download the
   * official asset from the vendor's own brand page, drop it in, and set this.
   * Takes precedence over `iconPath`; without either, ToolIcon draws a
   * brand-coloured monogram.
   */
  iconSrc?: string;
  color?: string;
};

const FIGMA_ICON_PATH =
  "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z";

export const tools: Tool[] = [
  {
    name: "Figma",
    category: "design",
    color: "#F24E1E",
    iconSrc: "/images/tools/figma.svg",
  },
  {
    name: "Higgsfield",
    category: "ai",
    color: "#6366F1",
    // Taken from higgsfield.ai itself — no icon set carries their mark.
    iconSrc: "/images/tools/higgsfield.svg",
  },
  {
    name: "Adobe Firefly",
    category: "ai",
    color: "#FA0F00",
    iconSrc: "/images/tools/adobe-icon.svg",
  },
  {
    name: "Claude",
    category: "ai",
    color: "#D97757",
    iconSrc: "/images/tools/claude-icon.svg",
  },
  {
    name: "FigJam",
    category: "design",
    color: "#F24E1E",
    iconSrc: "/images/tools/figma.svg",
  },
  {
    name: "Miro",
    category: "research",
    color: "#050038",
    iconSrc: "/images/tools/miro-icon.svg",
  },
  {
    name: "Framer",
    category: "design",
    color: "#0055FF",
    iconSrc: "/images/tools/framer.svg",
  },
  {
    name: "Figma Make",
    category: "design",
    color: "#F24E1E",
    iconSrc: "/images/tools/figma.svg",
  },
  {
    name: "Figma Agents",
    category: "ai",
    color: "#F24E1E",
    iconSrc: "/images/tools/figma.svg",
  },
  {
    name: "Adobe Creative Cloud",
    category: "visual",
    color: "#DA1F26",
    iconPath:
      "M14.782 3.153c-.231.02-.472.04-.703.07a8.453 8.453 0 0 0-2.832.834 8.951 8.951 0 0 0-2.46 1.777c-.03.04-.09.06-.141.05a7.44 7.44 0 0 0-1.496-.07 7.424 7.424 0 0 0-2.932.763c-1.768.884-3.013 2.26-3.736 4.108a7.089 7.089 0 0 0-.462 2.139c0 .05-.01.09-.02.13v.773c.02.201.05.392.07.593.1.813.332 1.596.703 2.33.824 1.646 2.089 2.851 3.786 3.594a7.127 7.127 0 0 0 2.45.593c.032 0 .06.004.086.01h8.576c.183-.017.362-.035.547-.06a8.344 8.344 0 0 0 2.811-.834 8.836 8.836 0 0 0 3.646-3.304 8.187 8.187 0 0 0 1.184-3.093c.05-.34.08-.692.121-1.034 0-.05.01-.09.02-.13v-.794c-.02-.23-.05-.452-.05-.662a8.345 8.345 0 0 0-.834-2.812 8.952 8.952 0 0 0-3.324-3.645 8.245 8.245 0 0 0-3.072-1.175c-.362-.06-.713-.09-1.075-.13-.05 0-.09-.01-.14-.02zm.369 1.693c2.126.005 3.93.826 5.395 2.455a6.93 6.93 0 0 1 1.616 3.323c.15.764.181 1.547.07 2.32-.19 1.346-.702 2.55-1.576 3.605a7.082 7.082 0 0 1-3.997 2.45 7.297 7.297 0 0 1-2.56.1c-1.095-.14-2.099-.501-3.003-1.154a5.2 5.2 0 0 1-.672-.573c-1.226-1.205-2.44-2.42-3.666-3.625-.301-.3-.321-.632-.18-.934a.822.822 0 0 1 .863-.472c.21.02.372.141.522.292 1.105 1.114 2.2 2.209 3.304 3.324a5.263 5.263 0 0 0 3.093 1.536c1.948.261 3.605-.341 4.92-1.798.713-.793 1.145-1.747 1.326-2.811.26-1.587-.11-3.013-1.095-4.268-.873-1.115-2.018-1.808-3.404-2.059-1.416-.25-2.751.02-3.966.794-.03.02-.1.03-.131.01a9.04 9.04 0 0 0-1.406-.854s-.01-.01-.02-.03a6.603 6.603 0 0 1 1.255-.823 6.646 6.646 0 0 1 2.641-.784 8.45 8.45 0 0 1 .67-.024zM7.546 7.509c1.455-.024 2.791.525 3.982 1.63.854.802 1.637 1.636 2.46 2.47.231.23.281.522.171.833-.11.311-.362.462-.683.512a.722.722 0 0 1-.632-.23c-.784-.784-1.567-1.557-2.34-2.35-.633-.653-1.386-1.025-2.27-1.186-1.958-.351-3.936.784-4.639 2.641-.904 2.36.522 5.031 2.982 5.594.482.11.995.11 1.497.1.14-.01.22.04.32.13.483.473.995.945 1.497 1.416.03.03.07.06.1.09-.06 0-.1.01-.14.01h-2.3a5.833 5.833 0 0 1-5.693-4.568c-.653-2.942 1.034-5.925 3.926-6.798a6.33 6.33 0 0 1 1.762-.294Z",
  },
  {
    name: "Photoshop",
    category: "visual",
    color: "#31A8FF",
    iconSrc: "/images/tools/adobe-photoshop.svg",
  },
  {
    name: "After Effects",
    category: "visual",
    color: "#9999FF",
    iconSrc: "/images/tools/adobe-after-effects.svg",
  },
  {
    name: "Illustrator",
    category: "visual",
    color: "#FF9A00",
    iconSrc: "/images/tools/adobe-illustrator.svg",
  },
  {
    name: "InDesign",
    category: "visual",
    color: "#FF3366",
    iconSrc: "/images/tools/adobe-indesign.svg",
  },
  {
    name: "Microsoft 365 Copilot",
    category: "ai",
    color: "#0078D4",
    iconSrc: "/images/tools/microsoft-icon.svg",
  },
  {
    name: "ChatGPT",
    category: "ai",
    color: "#10A37F",
    iconSrc: "/images/tools/openai-icon.svg",
  },
  {
    name: "Gemini",
    category: "ai",
    color: "#8E75B2",
    iconSrc: "/images/tools/google-gemini-icon.svg",
  },
  {
    name: "Replit",
    category: "build",
    color: "#F26207",
    iconSrc: "/images/tools/replit-icon.svg",
  },
  {
    name: "Claude Code",
    category: "build",
    color: "#D97757",
    iconSrc: "/images/tools/claude-icon.svg",
  },
  {
    name: "Antigravity",
    category: "build",
    color: "#4285F4",
    iconSrc: "/images/tools/antigravity.svg",
  },
  {
    name: "Cursor",
    category: "build",
    color: "#000000",
    iconSrc: "/images/tools/cursor-icon.svg",
  },
  {
    name: "Lovable",
    category: "build",
    color: "#FF4D4D",
    // Supplied by Mithra from Lovable directly — lovable.dev refuses scripted
    // requests, and no icon set carries their mark.
    iconSrc: "/images/tools/lovable.svg",
  },
  {
    name: "Obsidian",
    category: "research",
    color: "#7C3AED",
    iconSrc: "/images/tools/obsidian-icon.svg",
  },
  {
    name: "Supabase",
    category: "build",
    color: "#3FCF8E",
    iconSrc: "/images/tools/supabase-icon.svg",
  },
] satisfies Tool[];
