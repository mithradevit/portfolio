// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Add a new item by adding one entry here. Add images to
// public/images/fun/ and set `image` once you have them.

export const funTagline =
  "I lose sleep to hackathons, AI experiments, & problems that come with too many tabs open.";

// The image revealed by the pixel-grid hero at the top of the Fun page.
// Swap `image` for any file in public/images/fun/.
export const funHero = {
  image: "/images/fun/fun-hero.png",
  alt: "A collage of two vivid figurative paintings of crowded social scenes",
};

export type FunProject = {
  title: string;
  description: string;
  event: string;
  image?: string;
  /** Shown in the detail window's title bar, e.g. "fiestaa.app". */
  fileLabel: string;
  /** TODO: FIESTAA and SYNECTICS don't have a confirmed date anywhere in her
   *  resume or content files — 2023 is a placeholder mid-career guess.
   *  Correct once she confirms the real year. */
  year: string;
  tools: string[];
};

export const funProjects: FunProject[] = [
  {
    title: "FIESTAA",
    description:
      "Reimagined food delivery as a shared, social experience instead of a solo transaction. Simplified a cluttered, multi-step order flow into one scalable interaction model built to hold group ordering, splitting and real-time status without adding complexity.",
    event: "Hackathon · Winner",
    image: "/images/fun/fiestaa.jpg",
    fileLabel: "fiestaa.app",
    year: "2023",
    tools: ["Figma", "Prototyping"],
  },
  {
    title: "SYNECTICS",
    description:
      "Designed an interaction-led CBT experience that turns therapeutic principles — reframing, grounding, guided reflection — into digital moments a user actually feels, not just reads. Built for a hackathon judged on both clinical grounding and interaction quality.",
    event: "Hackathon · Winner",
    image: "/images/fun/synectics.jpg",
    fileLabel: "synectics.app",
    year: "2023",
    tools: ["Figma", "Interaction Design"],
  },
  {
    title: "Designing with Leverage: The AI-Empowered Designer",
    description:
      "Planned and led a workshop on AI-native design workflows and the judgment they still require. Used Dotlet, a self-built 0→1 vector product, as a live case study — walking the room through ideation to AI-assisted development in real time.",
    event: "Friends of Figma · Workshop",
    image: "/images/fun/friends-of-figma.png",
    fileLabel: "workshop.talk",
    year: "2026",
    tools: ["Figma Make", "Claude"],
  },
];
