import type { Tool } from "@/content/tools";

// The vendors' own marks, in their own colours, in one fixed state. No
// greyscale and no hover bloom: the row is a reference list, and a logo that
// only resolves when you point at it makes the reader work for a fact that
// should be legible on sight.
export function ToolIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  // A dropped-in logo file wins: it's the vendor's own artwork, which beats
  // anything reconstructed. Plain <img>, not next/image — these are 18px and
  // already optimised, so the loader would cost more than it saves.
  if (tool.iconSrc) {
    return (
      // Every mark the same height, width free to follow its own aspect.
      //
      // The marks are not one shape — Figma and Framer are tall, the Adobe
      // suite square — so fitting them into a square box by their longest side
      // renders the tall ones visibly smaller than the rest. Matching heights
      // is what makes them sit as one row; it is also how a brand book sizes a
      // set of logos beside each other.
      //
      // The height has to be set on the image, not left to the `height`
      // attribute: globals.css carries an unlayered `img { max-width: 100% }`,
      // which wins against the attributes and lets each file render at
      // whatever size it likes.
      <span aria-hidden className="inline-flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.iconSrc}
          alt=""
          style={{ height: size, width: "auto", maxWidth: "none" }}
        />
      </span>
    );
  }

  if (tool.iconPath) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
        <path d={tool.iconPath} fill={tool.color ?? "currentColor"} />
      </svg>
    );
  }

  // Higgsfield and Lovable publish no mark in any of the icon sets, so they
  // get a brand-coloured monogram until a file is dropped into
  // public/images/tools/ and pointed at with `iconSrc`. Drawing a lookalike
  // would be worse than an honest placeholder.
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, backgroundColor: tool.color ?? "currentColor" }}
      className="flex items-center justify-center rounded-[4px] font-mono text-[10px] font-medium text-white"
    >
      {tool.name.charAt(0)}
    </div>
  );
}
