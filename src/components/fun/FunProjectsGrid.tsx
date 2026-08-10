"use client";

import { useState } from "react";
import type { FunProject } from "@/content/fun-projects";
import { FunProjectCard } from "./FunProjectCard";
import { FunProjectDetail } from "./FunProjectDetail";

/** Owns which project is open — split from the page so the page itself can stay a server component. */
export function FunProjectsGrid({ projects }: { projects: FunProject[] }) {
  const [active, setActive] = useState<FunProject | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
