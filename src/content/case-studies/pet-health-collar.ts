// Real bullet points from Mithradevi's resume PDF (Aug 2026). TODO: add real
// process narrative and screenshots to public/images/projects/pet-health-collar/.
import type { CaseStudy } from "./types";

export const petHealthCollar: CaseStudy = {
  slug: "pet-health-collar",
  role: "Senior User Experience Designer",
  timeline: "2025 – 2026",
  team: "Hardware & Software Teams",
  skills: ["IoT Onboarding", "Human–Hardware–Software Design", "Shared-Access Systems"],
  nda: "Covered by an NDA. The company, its product name, its hardware partners and all commercial figures are withheld, and no shipped screen appears on this page. The architecture shown is a generic description of how a connected collar works, and what is described beyond it is my own design reasoning.",
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
      heading: "How the system fits together",
      body: [
        "The app is one layer in a chain that starts at a sensor on a moving animal. Understanding that chain was the job before any screen: what the collar can measure, what survives the trip through connectivity, what the cloud can infer from it, and what is left worth showing an owner.",
      ],
      diagram: "collar-architecture",
      diagramCaption:
        "Six layers between a sensor reading and an owner's decision. The owner only ever sees layer five — every constraint in the four below it still lands on that screen.",
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
