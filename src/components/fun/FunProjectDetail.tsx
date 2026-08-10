"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FunProject } from "@/content/fun-projects";

/**
 * Detail overlay for a fun project, styled after the same macOS-window
 * chrome as ProfileWindow — text only, no photo pane. The reference this was
 * built from puts an image on the left; skipping it means the window is just
 * the metadata column, so it's centred and capped narrow rather than trying
 * to fill a wide frame with nothing in it.
 */
export function FunProjectDetail({
  project,
  onClose,
}: {
  project: FunProject | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Locks the page behind the overlay rather than letting it scroll under it.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="bg-foreground/20 absolute inset-0 backdrop-blur-[2px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            className="border-foreground/[0.08] bg-background relative flex w-full max-w-[420px] flex-col overflow-hidden rounded-[14px] border shadow-[inset_0_1px_0_rgb(255_255_255_/_80%),0_2px_6px_rgb(50_64_79_/_6%),0_20px_48px_rgb(50_64_79_/_18%)]"
          >
            {/* Chrome — same recipe as ProfileWindow's window. The close
                affordance is the red dot itself, not a separate icon. */}
            <div className="border-foreground/[0.08] bg-foreground/[0.04] relative flex shrink-0 items-center gap-2 px-3.5 py-3">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-cursor="pointer"
                className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity duration-150 hover:opacity-80"
              />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]/60" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]/60" />
              <span className="text-foreground-light absolute left-1/2 -translate-x-1/2 text-[13px]">
                {project.fileLabel}
              </span>
            </div>

            <div className="flex flex-col gap-5 p-6">
              <h1 className="text-[26px] italic">{project.title}</h1>

              <div className="flex flex-col">
                <div className="border-foreground/10 flex items-baseline justify-between border-t py-2.5">
                  <h4>Created</h4>
                  <p className="text-[15px]">{project.year}</p>
                </div>
                <div className="border-foreground/10 flex items-baseline justify-between border-t py-2.5">
                  <h4>Tools</h4>
                  <p className="text-[15px]">{project.tools.join(", ")}</p>
                </div>
                <div className="border-foreground/10 flex items-baseline justify-between border-t border-b py-2.5">
                  <h4>Context</h4>
                  <p className="text-[15px]">{project.event}</p>
                </div>
              </div>

              <p className="leading-[1.65]">{project.description}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
