"use client";

import { useState } from "react";
import { skillClusters } from "@/content/skills";

/**
 * An Obsidian-graph-style view of the skill clusters: category hubs orbited by
 * their skills, joined by thin edges. Hovering any node lifts its whole cluster
 * and dims the rest.
 *
 * Layout is computed deterministically at module load (seeded jitter, no
 * randomness at render), so server and client agree and nothing shifts on
 * hydration.
 */

const WIDTH = 1100;
const HEIGHT = 700;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const HUB_RX = 265;
const HUB_RY = 170;

/** Small LCG so jitter is stable across renders and between server/client. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type LaidOutSkill = { name: string; x: number; y: number };
type LaidOutCluster = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Label sits in the gap between hub and centre, where no skills orbit. */
  labelX: number;
  labelY: number;
  /** Centre→hub edge stops short so it doesn't run through the label. */
  edgeX: number;
  edgeY: number;
  skills: LaidOutSkill[];
};

const layout: LaidOutCluster[] = (() => {
  const rand = seededRandom(20260805);
  const count = skillClusters.length;

  const laid = skillClusters.map((cluster, i) => {
    // Hubs sit on an ellipse around the centre, starting at 12 o'clock.
    const hubAngle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const hx = CX + Math.cos(hubAngle) * HUB_RX;
    const hy = CY + Math.sin(hubAngle) * HUB_RY;

    // Unit vector pointing back toward the centre of the graph.
    const inX = (CX - hx) / Math.hypot(CX - hx, CY - hy);
    const inY = (CY - hy) / Math.hypot(CX - hx, CY - hy);

    // Skills fan outward, spanning less than a full circle so the inward side
    // stays clear for the cluster label.
    const m = cluster.skills.length;
    const spread = Math.PI * (m >= 9 ? 1.42 : 1.12);
    const rings = m >= 7 ? 3 : 2;
    const skills = cluster.skills.map((name, j) => {
      const t = m === 1 ? 0.5 : (j + 0.5) / m;
      const angle = hubAngle - spread / 2 + t * spread;
      // Staggered rings + jitter keep neighbouring labels off each other.
      const radius = 88 + (j % rings) * 38 + rand() * 8;
      return {
        name,
        x: hx + Math.cos(angle) * radius,
        y: hy + Math.sin(angle) * radius,
      };
    });

    return {
      id: cluster.id,
      label: cluster.label,
      x: hx,
      y: hy,
      labelX: hx + inX * 26,
      labelY: hy + inY * 26 + 4,
      edgeX: hx + inX * 52,
      edgeY: hy + inY * 52,
      skills,
    };
  });

  // Relaxation pass: nudge nodes apart until no two labels overlap. Radial
  // layout alone can't guarantee this once clusters differ in size, and
  // overlapping text is the one thing that makes a graph look broken. Runs
  // once at module load, so it costs nothing at render.
  const LABEL_H = 15;
  const CHAR_W = 5.6;
  const PAD = 4;

  type Movable = { name: string; x: number; y: number; hx: number; hy: number; fixed?: boolean };
  const nodes: Movable[] = laid.flatMap((c) =>
    c.skills.map((s) => ({ name: s.name, x: s.x, y: s.y, hx: c.x, hy: c.y })),
  );
  const skillCount = nodes.length;
  // Cluster labels are anchored — they push skills away but never move.
  for (const c of laid) {
    nodes.push({
      name: c.label,
      x: c.labelX,
      y: c.labelY - 16,
      hx: c.x,
      hy: c.y,
      fixed: true,
    });
  }
  // Cluster labels render in uppercase mono at 12px — noticeably wider per
  // character than the 11px proportional skill labels.
  const halfW = (n: Movable) => (n.name.length * (n.fixed ? 7.8 : CHAR_W)) / 2 + PAD;

  for (let pass = 0; pass < 120; pass++) {
    let moved = false;
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const n1 = nodes[a];
        const n2 = nodes[b];
        // Labels sit just below their node, so compare boxes at y + 16.
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const overlapX = halfW(n1) + halfW(n2) - Math.abs(dx);
        const overlapY = LABEL_H - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;

        if (n1.fixed && n2.fixed) continue;
        moved = true;

        // Fixed nodes don't budge, so the movable one absorbs the whole push.
        const w1 = n1.fixed ? 0 : n2.fixed ? 1 : 0.5;
        const w2 = n2.fixed ? 0 : n1.fixed ? 1 : 0.5;

        // Push apart along whichever axis needs the least movement.
        if (overlapX / (halfW(n1) + halfW(n2)) < overlapY / LABEL_H) {
          const push = (overlapX + 1) * (dx >= 0 ? 1 : -1);
          n1.x -= push * w1;
          n2.x += push * w2;
        } else {
          const push = (overlapY + 1) * (dy >= 0 ? 1 : -1);
          n1.y -= push * w1;
          n2.y += push * w2;
        }
      }
    }
    if (!moved) break;

    // Tether back toward the hub so clusters stay legible as clusters.
    for (const n of nodes) {
      if (n.fixed) continue;
      const d = Math.hypot(n.x - n.hx, n.y - n.hy);
      const max = 190;
      if (d > max) {
        n.x = n.hx + ((n.x - n.hx) / d) * max;
        n.y = n.hy + ((n.y - n.hy) / d) * max;
      }
    }
  }

  // Write relaxed positions back.
  let k = 0;
  for (const c of laid) {
    for (const s of c.skills) {
      s.x = nodes[k].x;
      s.y = nodes[k].y;
      k++;
    }
  }

  return laid;
})();

export function SkillsGraph() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-4">
      <h4>Skills</h4>

      <div className="border-foreground/10 w-full overflow-hidden rounded-lg border">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="A graph of skill clusters and the skills within each"
          onMouseLeave={() => setActive(null)}
        >
          {/* Edges: centre → hub, then hub → each skill. Drawn first so nodes
              sit on top of them. */}
          {layout.map((cluster) => {
            const dim = active !== null && active !== cluster.id;
            return (
              <g
                key={`edges-${cluster.id}`}
                className="transition-opacity duration-300"
                style={{ opacity: dim ? 0.15 : 1 }}
              >
                <line
                  x1={CX}
                  y1={CY}
                  x2={cluster.edgeX}
                  y2={cluster.edgeY}
                  stroke="currentColor"
                  strokeWidth={1}
                  className="text-foreground/15"
                />
                {cluster.skills.map((skill) => (
                  <line
                    key={`edge-${skill.name}`}
                    x1={cluster.x}
                    y1={cluster.y}
                    x2={skill.x}
                    y2={skill.y}
                    stroke="currentColor"
                    strokeWidth={1}
                    className={
                      active === cluster.id ? "text-primary/40" : "text-foreground/15"
                    }
                  />
                ))}
              </g>
            );
          })}

          {/* Centre node */}
          <circle cx={CX} cy={CY} r={7} className="fill-primary" />
          <text
            x={CX}
            y={CY + 24}
            textAnchor="middle"
            className="fill-foreground font-mono text-[13px] tracking-wide uppercase"
          >
            Mithra
          </text>

          {/* Clusters */}
          {layout.map((cluster) => {
            const isActive = active === cluster.id;
            const dim = active !== null && !isActive;

            return (
              <g
                key={cluster.id}
                onMouseEnter={() => setActive(cluster.id)}
                className="transition-opacity duration-300"
                style={{ opacity: dim ? 0.2 : 1 }}
              >
                {/* Hub */}
                <circle
                  cx={cluster.x}
                  cy={cluster.y}
                  r={isActive ? 7 : 5.5}
                  className={isActive ? "fill-primary" : "fill-foreground/70"}
                  style={{ transition: "r 0.2s ease-out" }}
                />
                <text
                  x={cluster.labelX}
                  y={cluster.labelY}
                  textAnchor="middle"
                  className={`font-mono text-[12px] tracking-wide uppercase ${
                    isActive ? "fill-primary" : "fill-foreground"
                  }`}
                >
                  {cluster.label}
                </text>

                {/* Skills */}
                {cluster.skills.map((skill) => (
                  <g key={skill.name}>
                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={isActive ? 4 : 3}
                      className={isActive ? "fill-primary" : "fill-foreground/50"}
                      style={{ transition: "r 0.2s ease-out" }}
                    />
                    <text
                      x={skill.x}
                      y={skill.y + 16}
                      textAnchor="middle"
                      className={`text-[11px] ${
                        isActive ? "fill-foreground" : "fill-foreground/60"
                      }`}
                    >
                      {skill.name}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
