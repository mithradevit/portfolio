// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/frontline-safety/.
import type { CaseStudy } from "./types";

export const frontlineSafety: CaseStudy = {
  slug: "frontline-safety",
  role: "Senior User Experience Designer",
  timeline: "April 2024 – July 2026",
  team: "Product, Engineering, Business & Design",
  skills: ["AI-Assisted Workflows", "Cross-Platform Design Systems", "Stakeholder Alignment"],
  sections: [
    {
      heading: "Overview",
      body: [
        "Led product design for an Australian public-safety technology company, building a connected mobile, web, and kiosk ecosystem integrating body-worn and in-vehicle cameras with cloud evidence management.",
      ],
    },
    {
      heading: "Approach",
      body: [
        "Streamlined mission-critical workflows and introduced AI-assisted evidence processing to cut manual steps out of case creation.",
      ],
      bullets: [
        "Improved evidence-management efficiency by 45% and accelerated case creation.",
        "Scaled design impact through proactive collaboration with Product, Engineering, Business, and Design, aligning cross-functional teams around customer needs and product outcomes.",
      ],
    },
    {
      heading: "Reflection",
      body: [
        "Designing for officers and administrators managing chain-of-custody at scale meant every interaction had to survive high-stress, mission-critical use — a very different bar than average-case consumer design.",
      ],
    },
  ],
};
