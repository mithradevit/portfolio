// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Add a new item by adding one entry here. Add images to
// public/images/fun/ and set `image` once you have them.

export const funTagline =
  "I lose sleep to hackathons, AI experiments, & problems that come with too many tabs open.";

export type FunProject = {
  title: string;
  description: string;
  event: string;
  image?: string;
};

export const funProjects: FunProject[] = [
  {
    title: "FIESTAA",
    description: "Reimagined the food delivery experience through a simplified, scalable interaction model.",
    event: "Hackathon · Winner",
    image: "/images/fun/fiestaa.jpg",
  },
  {
    title: "SYNECTICS",
    description: "Designed an interaction-led CBT experience, translating therapeutic principles into intuitive digital interactions.",
    event: "Hackathon · Winner",
    image: "/images/fun/synectics.jpg",
  },
  {
    title: "Designing with Leverage: The AI-Empowered Designer",
    description:
      "Planned and led an AI design workshop on AI-native design workflows and designer judgment, using Dotlet — a self-built 0→1 vector product — as a live case study from ideation through AI-assisted development.",
    event: "Friends of Figma · Workshop",
    image: "/images/fun/friends-of-figma.png",
  },
];
