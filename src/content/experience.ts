// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Add a new job by adding one entry here — the homepage timeline picks it up
// automatically, newest first.

export type ExperienceEntry = {
  year: string;
  company: string;
  companyUrl?: string;
  role: string;
};

export const experience: ExperienceEntry[] = [
  {
    year: "2026",
    company: "Maylasoft Technologies",
    role: "Lead Product Design Consultant (Freelance)",
  },
  {
    year: "2024–26",
    company: "Alchi Design Studio",
    role: "Senior User Experience Designer",
  },
  {
    year: "2023–24",
    company: "Alchi Design Studio",
    role: "User Experience Designer",
  },
  {
    year: "2022–23",
    company: "Alchi Design Studio",
    role: "User Experience Intern",
  },
];
