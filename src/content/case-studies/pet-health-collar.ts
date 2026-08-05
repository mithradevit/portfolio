// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/pet-health-collar/.
import type { CaseStudy } from "./types";

export const petHealthCollar: CaseStudy = {
  slug: "pet-health-collar",
  role: "Senior User Experience Designer",
  timeline: "2024 – 2026",
  team: "Hardware & Software Teams",
  skills: ["IoT Onboarding", "Human–Hardware–Software Design", "Shared-Access Systems"],
  sections: [
    {
      heading: "Overview",
      body: [
        "Led product design for a mobile app integrated with an IoT pet health collar, translating real-time telemetry, location, and longitudinal health data into decision-ready experiences.",
      ],
    },
    {
      heading: "Approach",
      body: [
        "Partnered with hardware teams to streamline mobile–collar connectivity, simplifying device pairing, connection states, and reimagining guided setup across the human–hardware–software ecosystem.",
      ],
      bullets: [
        "Streamlined safety-zone setup and launched co-parent sharing, introducing shared-access functionality.",
        "Lifted setup completion by 10%.",
      ],
    },
  ],
};
