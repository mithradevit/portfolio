"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A cursor-following pill that reads its label from the nearest ancestor
 * carrying a `data-cursor="..."` attribute. To make any element trigger it,
 * just add that attribute — no wiring, no imports, no context needed:
 *
 *   <Link data-cursor="Case Study" href="/projects/mview">...</Link>
 *
 * Desktop (fine pointer) only; touch devices never see it.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    function handleMove(e: MouseEvent) {
      const dot = dotRef.current;
      if (!dot) return;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    }

    function handleEnter() {
      setVisible(true);
    }

    function handleLeave() {
      setVisible(false);
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease-out" }}
    >
      <div
        className="flex items-center justify-center whitespace-nowrap rounded-full bg-primary font-mono text-[13px] font-medium text-white transition-all duration-200 ease-out"
        style={
          label
            ? { padding: "8px 14px", height: 32 }
            : { width: 10, height: 10, padding: 0 }
        }
      >
        {label}
      </div>
    </div>
  );
}
