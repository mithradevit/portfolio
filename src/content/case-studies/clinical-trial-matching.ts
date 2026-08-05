// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/clinical-trial-matching/.
import type { CaseStudy } from "./types";

export const clinicalTrialMatching: CaseStudy = {
  slug: "clinical-trial-matching",
  role: "Senior User Experience Designer",
  timeline: "2024 – 2026",
  team: "Clinical Research Coordinators & Trial Recruitment Teams",
  skills: ["Human-AI Interaction", "Explainable AI Workflows", "Interaction Design"],
  sections: [
    {
      heading: "Overview",
      body: [
        "Led end-to-end product design and UX strategy for a clinical intelligence platform, translating complex EMR data, multimodal medical imaging, protocol logic, and AI-generated evidence into explainable human–AI decision workflows.",
      ],
    },
    {
      heading: "Approach",
      body: [
        "Collaborated directly with clinical research coordinators and trial recruitment teams to remove friction from patient matching and referral.",
      ],
      bullets: [
        "Reduced trial-matching time by 40% and improved referral efficiency by 30%.",
        "Reduced cognitive load across complex clinical workflows through high-fidelity interaction design, simplifying decision-making while preserving critical operational depth.",
      ],
    },
    {
      heading: "Impact",
      body: [
        "40% faster trial matching, 30% higher referral efficiency — without hiding the clinical reasoning behind the AI's recommendations.",
      ],
    },
  ],
};
