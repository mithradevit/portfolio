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
  category: string;
  year: string;
  thumbnailColor: string;
  aspect: string; // Tailwind aspect-ratio class, e.g. "aspect-[16/9]"
  image?: string;
  cursorLabel: "case-study" | "overview";
};

export const projects: Project[] = [
  {
    slug: "frontline-safety",
    title: "AI-assisted evidence management",
    company: "Body-Worn Cameras",
    category: "Public Safety · Mobile, Web & Kiosk",
    year: "2026",
    thumbnailColor: "#2B4C7E",
    aspect: "aspect-[16/9]",
    cursorLabel: "case-study",
  },
  {
    slug: "clinical-trial-matching",
    title: "Cutting trial-matching time by 40%",
    company: "Trial Matching",
    category: "Healthcare · AI Decision Workflows",
    year: "2025",
    thumbnailColor: "#3E8E7E",
    aspect: "aspect-[8/5]",
    cursorLabel: "case-study",
  },
  {
    slug: "pet-health-collar",
    title: "Guided setup for a pet collar",
    company: "Connected Pet Collar",
    category: "IoT · Mobile",
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
    year: "2025",
    thumbnailColor: "#8C6FB0",
    aspect: "aspect-[8/5]",
    cursorLabel: "overview",
  },
  {
    slug: "dotlet",
    title: "A 0→1 vector tool, shipped in 10 days",
    company: "Figma x Coding",
    category: "AI-Native · Personal Venture",
    year: "2026",
    thumbnailColor: "#D4A24C",
    aspect: "aspect-[16/9]",
    image: "/images/projects/dotlet.webp",
    cursorLabel: "case-study",
  },
  {
    slug: "elderly-care",
    title: "Designing for low-vision users",
    company: "Elderly Care",
    category: "Healthcare · Web & Mobile",
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
    year: "2026",
    thumbnailColor: "#55677D",
    aspect: "aspect-[16/9]",
    cursorLabel: "case-study",
  },
];
