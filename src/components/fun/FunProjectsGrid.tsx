"use client";

import { useState } from "react";
import type { FunProject } from "@/content/fun-projects";
import { FunProjectCard } from "./FunProjectCard";
import { FunProjectDetail } from "./FunProjectDetail";

/** Owns which project is open — split from the page so the page itself can stay a server component. */
export function FunProjectsGrid({
  projects,
  // /about sets this to the column gap its own three-up sections use, so a
  // card there lands on the same track as the roles above it. Fun keeps its
  // tighter default, where the grid is full and the gap is doing real work.
  gridClassName = "grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
}: {
  projects: FunProject[];
  gridClassName?: string;
}) {
  const [active, setActive] = useState<FunProject | null>(null);

  return (
    <>
      <div className={`grid w-full ${gridClassName}`}>
        {projects.map((project, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(project)}
            data-cursor="pointer"
            className="text-left"
          >
            <FunProjectCard project={project} />
          </button>
        ))}
      </div>

      <FunProjectDetail project={active} onClose={() => setActive(null)} />
    </>
  );
}
