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
  cursorLabel: "Case Study" | "Overview";
};

export const projects: Project[] = [
  {
    slug: "frontline-safety",
    title: "AI-assisted evidence management for the frontline",
    company: "Digital Evidence Management & Body-Worn Cameras",
    category: "Public Safety · Mobile, Web & Kiosk",
    year: "2026",
    thumbnailColor: "#2B4C7E",
    aspect: "aspect-[16/9]",
    cursorLabel: "Case Study",
  },
  {
    slug: "clinical-trial-matching",
    title: "Cutting trial-matching time by 40%",
    company: "AI-Powered Clinical Trial Recruitment & Patient Matching",
    category: "Healthcare · AI Decision Workflows",
    year: "2025",
    thumbnailColor: "#3E8E7E",
    aspect: "aspect-[8/5]",
    cursorLabel: "Case Study",
  },
  {
    slug: "pet-health-collar",
    title: "Guided setup for a connected pet health collar",
    company: "IoT-Powered Pet Health & Safety Collar",
    category: "IoT · Mobile",
    year: "2025",
    thumbnailColor: "#C97B63",
    aspect: "aspect-[10/7]",
    cursorLabel: "Case Study",
  },
  {
    slug: "health-ring",
    title: "Turning biometric data into everyday insight",
    company: "IoT-Powered Health Ring Ecosystem",
    category: "IoT · Mobile & Web",
    year: "2025",
    thumbnailColor: "#8C6FB0",
    aspect: "aspect-[8/5]",
    cursorLabel: "Overview",
  },
  {
    slug: "dotlet",
    title: "A 0→1 vector tool, shipped in 10 days",
    company: "Dotlet — A Vector Creation Tool",
    category: "AI-Native · Personal Venture",
    year: "2026",
    thumbnailColor: "#D4A24C",
    aspect: "aspect-[16/9]",
    cursorLabel: "Case Study",
  },
  {
    slug: "elderly-care",
    title: "Designing around low-vision, tremor & tech-anxiety",
    company: "Elderly Care Platform",
    category: "Healthcare · Web & Mobile",
    year: "2024",
    thumbnailColor: "#6E9887",
    aspect: "aspect-[10/7]",
    cursorLabel: "Case Study",
  },
  {
    slug: "maternity-clinical-suite",
    title: "6+ healthcare products, one coherent system",
    company: "Maternity & Clinical Suite",
    category: "Healthcare · EMR & PHR",
    year: "2023",
    thumbnailColor: "#A9647C",
    aspect: "aspect-[8/5]",
    cursorLabel: "Overview",
  },
  {
    slug: "crm-remediation",
    title: "Surfacing 130+ experience gaps in an enterprise CRM",
    company: "UX Remediation & Design System — Enterprise CRM",
    category: "Freelance · UX Audit & Design System",
    year: "2026",
    thumbnailColor: "#55677D",
    aspect: "aspect-[16/9]",
    cursorLabel: "Case Study",
  },
];
