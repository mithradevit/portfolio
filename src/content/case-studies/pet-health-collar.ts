// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/pet-health-collar/.
import type { CaseStudy } from "./types";

export const petHealthCollar: CaseStudy = {
  slug: "pet-health-collar",
  role: "Senior User Experience Designer",
  timeline: "2025 – 2026",
  team: "Hardware & Software Teams",
  skills: ["IoT Onboarding", "Human–Hardware–Software Design", "Shared-Access Systems"],
  sections: [
    {
      heading: "Overview",
      body: [
        "Led product design for an IoT-powered pet health app, translating real-time telemetry, location, sleep, activity, hydration, and behavioural signals into actionable experiences for proactive pet care and longevity.",
      ],
    },
    {
      heading: "The design question",
      body: [
        "How might we turn continuous data from a connected pet collar into meaningful signals that help owners care for their pets proactively and support longer, healthier lives?",
      ],
    },
    {
      heading: "Research",
      body: [
        "The research focused on understanding how pet owners currently monitor health and safety, and where existing connected-pet products fall short.",
      ],
      bullets: [
        "Pet-owner behaviours and routines",
        "GPS and location tracking",
        "Geofencing and safe zones",
        "Activity and behavioural monitoring",
        "Pet health tracking",
        "Existing connected-pet products",
        "Notification and alert behaviour",
        "Hardware/software interactions",
        "How users interpret health information",
      ],
      blocks: [
        {
          title: "The key insight",
          body: ["Owners didn't need more data. They needed context."],
        },
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
