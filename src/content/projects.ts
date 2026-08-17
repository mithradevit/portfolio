// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Add a new project by adding one entry here, then a matching file in
// content/case-studies/. Nothing else needs to change — the homepage grid
// and /projects/[slug] route both read from this list automatically.
//
// `thumbnailColor` is a placeholder swatch shown until you drop a real image
// into public/images/projects/ and set `image` below.

export type Project = {
  slug: string;
  title: string;
  company: string;
  companyUrl?: string;
  /** One string, used as the case-study header's subtitle. */
  category: string;
  /** The same facts as `category`, split for the grid's tag pills. Kept as a
   *  separate field rather than splitting `category` at render time so a
   *  project can carry tags that don't belong in its header line. */
  tags: string[];
  year: string;
  /** Client work that can't be shown in full. Drives the badge on the card
   *  and tells a reader why a case study stops short of screenshots.
   *  TODO(Mithra): confirm these — I inferred NDA for every client
   *  engagement and left it off Dotlet as your own product. Correct any that
   *  are wrong; the badge only appears where this is `true`. */
  nda?: boolean;
  thumbnailColor: string;
  aspect: string; // Tailwind aspect-ratio class, e.g. "aspect-[16/9]"
  image?: string;
  cursorLabel: "case-study" | "overview";
};

export const projects: Project[] = [
  {
    slug: "frontline-safety",
    title: "A digital evidence ecosystem for an Australian state police force",
    company: "Body-Worn Cameras",
    category: "Public Safety · Mobile, Web & Kiosk",
    tags: ["Public Safety", "Mobile, Web & Kiosk"],
    nda: true,
    year: "2026",
    thumbnailColor: "#2B4C7E",
    aspect: "aspect-[16/9]",
    image: "/images/projects/frontline-safety.png",
    cursorLabel: "case-study",
  },
  {
    slug: "dotlet",
    title: "A 0→1 vector tool, shipped in 10 days",
    company: "Figma x Coding",
    category: "AI-Native · Personal Venture",
    tags: ["AI-Native", "Personal Venture"],
    year: "2026",
    thumbnailColor: "#D4A24C",
    aspect: "aspect-[16/9]",
    image: "/images/projects/dotlet.webp",
    cursorLabel: "case-study",
  },
  {
    slug: "clinical-trial-matching",
    title: "A live clinical trial matching platform for retina clinics",
    company: "Clinical Trial Recruitment",
    category: "Healthcare AI · EMR + Retinal Imaging",
    tags: ["Healthcare AI", "EMR + Retinal Imaging"],
    nda: true,
    year: "2026",
    thumbnailColor: "#3E8E7E",
    aspect: "aspect-[16/9]",
    image: "/images/projects/clinical-trial-matching.png",
    cursorLabel: "case-study",
  },
  {
    slug: "pet-health-collar",
    title: "Guided setup for a pet collar",
    company: "Connected Pet Collar",
    category: "IoT · Mobile",
    tags: ["IoT", "Mobile"],
    nda: true,
    year: "2025",
    thumbnailColor: "#C97B63",
    aspect: "aspect-[10/7]",
    cursorLabel: "case-study",
  },
  {
    slug: "health-ring",
    title: "Turning biometrics into insight",
    company: "Health Ring Ecosystem",
    category: "IoT · Mobile & Web",
    tags: ["IoT", "Mobile & Web"],
    nda: true,
    year: "2025",
    thumbnailColor: "#8C6FB0",
    aspect: "aspect-[8/5]",
    cursorLabel: "overview",
  },
  {
    slug: "elderly-care",
    title: "Designing for low-vision users",
    company: "Elderly Care",
    category: "Healthcare · Web & Mobile",
    tags: ["Healthcare", "Web & Mobile"],
    nda: true,
    year: "2024",
    thumbnailColor: "#6E9887",
    aspect: "aspect-[10/7]",
    cursorLabel: "case-study",
  },
  {
    slug: "maternity-clinical-suite",
    title: "6+ products, one coherent system",
    company: "Clinical Suite",
    category: "Healthcare · EMR & PHR",
    tags: ["Healthcare", "EMR & PHR"],
    nda: true,
    year: "2023",
    thumbnailColor: "#A9647C",
    aspect: "aspect-[8/5]",
    cursorLabel: "overview",
  },
  {
    slug: "crm-remediation",
    title: "Surfacing 130+ gaps in a CRM",
    company: "CRM Remediation",
    category: "Freelance · UX Audit & Design System",
    tags: ["Freelance", "UX Audit & Design System"],
    nda: true,
    year: "2026",
    thumbnailColor: "#55677D",
    aspect: "aspect-[16/9]",
    cursorLabel: "case-study",
  },
];
