// The career timeline on /about, taken from the resume
// (resume/Mithradevi-T-Resume.html) — same dates, same numbers. Keep this in
// step with content/experience.ts when a role changes.
//
// `year` is what sits under the ruler, `title` above it, and `description`
// animates in at the centre when the milestone becomes active. Each
// description should say what the *title* actually meant in practice — the
// scope that changed, not a restatement of the job name.

export type Milestone = {
  /** "YYYY-MM". Orders the ruler; spacing stays even. */
  date: string;
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    date: "2022-06",
    year: "Jun 2022",
    title: "UX Design Intern",
    description:
      "Alchi Design Studio, Bangalore. Five patient-management tools for hospitals, nurses and psychologists — real clinical surface, not intern work. Aged-care apps built around low-vision and low-confidence users lifted adoption 35%.",
  },
  {
    date: "2023-02",
    year: "Feb 2023",
    title: "UX Designer",
    description:
      "Full-time in under six months. Owned the Sanro Health CTMS end to end: physician and coordinator interviews, an EMR-integrated dashboard scoring patients against inclusion criteria in real time. 40% faster trial matching, 30% higher referral efficiency.",
  },
  {
    date: "2024-03",
    year: "Mar 2024",
    title: "Senior UX Designer",
    description:
      "Intern to Senior in roughly two years. The shift was from executing to deciding — owning design risk and UX controls against regulatory requirements, and mentoring the designers doing the work I used to do.",
  },
  {
    date: "2024-06",
    year: "Jun 2024",
    // Product name redacted — the engagement is under NDA and the client's
    // product must not be named anywhere on the site. Describe the work, not
    // the brand.
    title: "Digital Evidence Management",
    description:
      "Two years leading UX on a digital evidence management system for law enforcement. One coherent experience across web, mobile and kiosk — then past the screen into packaging and evidence-handling workflows, because the chain of custody doesn't stop at the interface.",
  },
  {
    date: "2026-06",
    year: "2026",
    title: "Dotlet",
    description:
      "Designed and built a vector tool solo in ten days — specification first, then Figma Make. Shipped for Config Makeathon, then taught as the case study for a Friends of Figma workshop on AI-native workflows.",
  },
];
