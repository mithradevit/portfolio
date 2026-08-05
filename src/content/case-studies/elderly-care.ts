// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/elderly-care/.
import type { CaseStudy } from "./types";

export const elderlyCare: CaseStudy = {
  slug: "elderly-care",
  role: "User Experience Designer",
  timeline: "Feb 2023 – Apr 2024",
  team: "Therapists, Care Teams & End Users",
  skills: ["Accessible Design", "Mixed-Methods Research", "Field Research"],
  sections: [
    {
      heading: "Overview",
      body: [
        "Drove a 35% increase in adoption among older adults through research-led accessible design for a web + mobile elderly care platform.",
      ],
    },
    {
      heading: "Approach",
      body: [
        "Rebuilt core flows around low-vision, tremor, and tech-anxiety constraints after field research with therapists, care teams, and end users in their own homes.",
      ],
      bullets: [
        "Applied mixed-methods research (qualitative and quantitative) to inform design direction, drive iteration, and define measurable success criteria.",
      ],
    },
    {
      heading: "Impact",
      body: ["35% increase in adoption among older adults."],
    },
  ],
};
