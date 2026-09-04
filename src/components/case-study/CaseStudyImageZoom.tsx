"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Img = { src: string; alt: string; width: number; height: number };

/**
 * A framed artefact that opens full-screen on click.
 *
 * For the drawings that carry real detail — a working board, a flow scribbled
 * across a wall — where the version in the column is only ever going to read as
 * texture. Rather than give the page over to a 3000px scan, the column keeps a
 * thumbnail and the full thing is one click away.
 *
 * Deliberately not a library: this is one image, one overlay, no gallery, no
 * pan and no pinch. Escape closes it, so does the backdrop, and the page behind
 * is locked while it's open so a scroll doesn't run the article past underneath.
 */
export function CaseStudyImageZoom({
  image,
  className,
  /** Size the thumbnail by its container's height instead of its width — for a
   *  rail where every card has to be the same height and its own width. */
  fitHeight,
}: {
  image: Img;
  className?: string;
  fitHeight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isGif = image.src.toLowerCase().endsWith(".gif");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="pointer"
        aria-label={`Open full size: ${image.alt}`}
        className={`group relative block cursor-zoom-in overflow-hidden rounded-[14px] border border-[#EDEDF0] bg-white p-2 sm:p-3 ${
          fitHeight ? "h-full w-auto" : "w-full"
        } ${className ?? ""}`}
      >
        {isGif ? (
          // Next's image optimizer re-encodes through its own pipeline, which
          // drops a GIF's animation — a plain `<img>` is what keeps it moving.
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={
              fitHeight ? "h-full w-auto rounded-[6px]" : "h-auto w-full rounded-[6px]"
            }
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            quality={90}
            sizes={fitHeight ? "700px" : "(min-width: 1024px) 380px, 100vw"}
            className={
              fitHeight ? "h-full w-auto rounded-[6px]" : "h-auto w-full rounded-[6px]"
            }
          />
        )}
        {/* Only affordance the thumbnail carries. A permanent icon would sit on
            top of the artefact; this appears when the pointer is over it. */}
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-[#32404f]/80 px-2.5 py-1 font-mono text-[9.27px] tracking-[0.12em] text-white uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-auto bg-[#32404f]/85 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            data-cursor="pointer"
            className="fixed top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#32404f] transition-transform duration-200 hover:scale-105"
          >
            <X size={18} aria-hidden />
          </button>

          {/* Stops a click on the picture itself from closing — the backdrop is
              the dismiss target, not the thing you came to look at. */}
          <div onClick={(e) => e.stopPropagation()} className="max-w-[1400px]">
            {isGif ? (
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full rounded-[6px] bg-white"
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={95}
                sizes="100vw"
                className="h-auto w-full rounded-[6px] bg-white"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
