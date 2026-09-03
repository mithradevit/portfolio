"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { CaseStudySection } from "@/content/case-studies/types";

type Embed = NonNullable<CaseStudySection["embed"]>;

/**
 * The viewport width the frame is *told* it has, before being scaled down to
 * fit. Without this the tool lays itself out for a ~770px window and every
 * control renders at full size inside it, so the UI reads as zoomed in. Giving
 * it a desktop viewport and shrinking the result means the embed shows the same
 * proportions a visitor sees on the real site.
 */
const BASE_WIDTH = 1280;

/**
 * The live product, running inside the case study.
 *
 * Click to start, rather than an iframe that loads with the page. Three
 * reasons, in order of how much they matter here: the embedded app is a canvas
 * tool with its own audio engine and it should not begin running while someone
 * is reading a paragraph four sections above it; a third-party frame that
 * loads unasked sets that origin's cookies for every visitor; and it is a
 * second full application's worth of scripts on a page that already carries a
 * dozen videos.
 *
 * So the resting state is a real preview — the browser chrome, the address,
 * and a caption saying what will happen — and the frame is only created once
 * the reader asks for it. Once started it stays; there is no stop control,
 * because someone who wants it gone will scroll.
 */
export function CaseStudyEmbed({ embed }: { embed: Embed }) {
  const [live, setLive] = useState(embed.eager ?? false);
  const host = embed.label ?? hostOf(embed.src);

  // Measured rather than derived from `embed.ratio`, which is a Tailwind class
  // string and would have to be parsed. The box is already sized by that class;
  // we only need the pixels it settled on.
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStage({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = embed.fluid || !stage.width ? 1 : stage.width / BASE_WIDTH;

  return (
    <figure className="flex w-full flex-col gap-3">
      <div className="border-foreground/10 bg-background overflow-hidden rounded-[12px] border shadow-[0_1px_2px_rgb(50_64_79_/_5%),0_10px_30px_-12px_rgb(50_64_79_/_14%)]">
        {/* Browser chrome. The same window metaphor the About page uses, so a
            reader already knows the frame means "this is a real thing running"
            rather than a screenshot with a decorative border. */}
        <div className="border-foreground/[0.08] bg-foreground/[0.04] flex items-center gap-3 border-b px-3.5 py-2.5">
          <div className="flex shrink-0 items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/60" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/60" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/60" />
          </div>

          <span className="bg-background/60 text-foreground-light min-w-0 flex-1 truncate rounded-full px-3 py-1 text-center font-mono text-[11px] tracking-wide">
            {host}
          </span>

          {/* Always available, live or not: an iframe is a cramped window for a
              canvas tool, and some readers will want it on its own. */}
          <a
            href={embed.src}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="text-foreground-light hover:text-primary flex shrink-0 items-center gap-1 font-mono text-[11px] tracking-wide uppercase transition-colors"
          >
            Open
            <ArrowUpRight size={12} aria-hidden />
          </a>
        </div>

        <div ref={stageRef} className={`relative overflow-hidden ${embed.ratio}`}>
          {live ? (
            <iframe
              src={embed.src}
              title={embed.title}
              // `allow-same-origin` is scoped to the framed document's own
              // origin, not ours — it lets the tool keep its localStorage
              // (the mute preference) without granting it anything here.
              // `allow-downloads` is what makes its SVG/PNG export work.
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              className="absolute top-0 left-0 border-0"
              style={{
                width: embed.fluid ? "100%" : BASE_WIDTH,
                // Undo the scale so the shrunk frame still covers the box.
                height: stage.height ? stage.height / scale : "100%",
                ...(embed.fluid
                  ? {}
                  : { transform: `scale(${scale})`, transformOrigin: "top left" }),
              }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setLive(true)}
              data-cursor="pointer"
              className="group relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-foreground/[0.02] transition-colors hover:bg-foreground/[0.04]"
            >
              {/* A still of the thing, dimmed, with the control on top. An
                  empty panel behind a play button reads as a failed embed —
                  the frame has to show what it is before it is started. */}
              {embed.poster && (
                <>
                  <Image
                    src={embed.poster}
                    alt=""
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="bg-background/45 absolute inset-0 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-background/30" />
                </>
              )}

              <span className="border-primary/30 bg-primary/10 text-primary relative flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_2px_10px_rgb(50_64_79_/_12%)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <Play size={20} fill="currentColor" strokeWidth={0} aria-hidden />
              </span>
              <span className="text-foreground-light relative font-mono text-[11px] tracking-[0.12em] uppercase">
                Launch the live tool
              </span>
            </button>
          )}
        </div>
      </div>

      {embed.caption && (
        <figcaption className="text-foreground-light text-[13px] leading-relaxed">
          {embed.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Bare host for the address pill — the full URL is noise at 11px. */
function hostOf(src: string) {
  try {
    return new URL(src).host;
  } catch {
    return src;
  }
}
