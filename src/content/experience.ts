// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Add a new job by adding one entry here — the homepage timeline picks it up
// automatically, newest first.

export type ExperienceEntry = {
  year: string;
  company: string;
  companyUrl?: string;
  role: string;
  /** Two lines under the role — what the job actually was. Drawn from the
   *  same material as /about's career entries, cut to the length this
   *  column can hold without pushing the photo panel out of step. */
  summary?: string;
  /** Shown in the panel beside the list while this role is active. The panel
   *  only appears once entries carry one. */
  image?: { src: string; alt: string };
};

// All four entries carry real photos from public/images/experience/.
export const experience: ExperienceEntry[] = [
  {
    year: "2026",
    company: "Maylasoft Technologies",
    role: "Lead Product Design Consultant (Freelance)",
    summary:
      "Product strategy, design systems and end-to-end product design for B2B tools.",
    image: {
      src: "/images/experience/maylasoft-v2.webp",
      alt: "Mithra in sunglasses and a striped tee, seated against a half-blue, half-grey wall.",
    },
  },
  {
    year: "2024–26",
    company: "Alchi Design Studio",
    role: "Senior User Experience Designer",
    summary:
      "Owning design risk and UX controls against regulatory requirements, and mentoring the designers doing the work I used to do.",
    image: {
      src: "/images/experience/alchi-senior-v2.webp",
      alt: "Mithra on an office terrace, badge lanyard on, looking up at the glass building opposite.",
    },
  },
  {
    year: "2023–24",
    company: "Alchi Design Studio",
    role: "User Experience Designer",
    summary:
      "Owned a clinical trial management system end to end — physician interviews through an EMR-integrated dashboard scoring patients in real time.",
    image: {
      src: "/images/experience/alchi-designer.webp",
      alt: "The Alchi Design Studio workspace — laptops and a shared desk in an open-plan office.",
    },
  },
  {
    year: "2022–23",
    company: "Alchi Design Studio",
    role: "User Experience Intern",
    summary:
      "Five patient-management tools for hospitals, nurses and psychologists. Aged-care apps built for low-vision users lifted adoption 35%.",
    image: {
      src: "/images/experience/alchi-senior.webp",
      alt: "Mithra at the Alchi Design Studio office, glass partitions and exposed ceiling behind her.",
    },
  },
];
