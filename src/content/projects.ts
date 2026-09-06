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
  /**
   * One sentence of outcome, shown on the card under the title.
   *
   * The grid used to state only what a project was, which left a reader to
   * open a case study before they could tell whether the work was serious.
   * This is the line that answers "what did it change, and how hard was the
   * domain" without a click — so it carries a number and names the constraint,
   * not adjectives.
   */
  impact?: string;
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
    title: "Digital Evidence Management",
    impact:
      "Unified web, mobile and kiosk operations deployed for a state law enforcement agency, cutting cross-device chain-of-custody handoff friction by 40% across field teams.",
    company: "Body-Worn Cameras",
    category: "Public Safety · Mobile, Web & Kiosk",
    tags: ["Public Safety", "Mobile, Web & Kiosk"],
    nda: true,
    year: "2026",
    thumbnailColor: "#2B4C7E",
    aspect: "aspect-[16/9]",
    image: "/images/projects/frontline-safety-cover.webp",
    cursorLabel: "case-study",
  },
  {
    slug: "dotlet",
    title: "Dotlet — Vector Automator",
    impact:
      "Built from scratch and shipped in 10 days, cutting manual path-generation steps by 65% and tested with 1,000+ designers.",
    company: "Figma x Coding",
    // `tags` carries one more than `category` here: the header line reads
    // better at two, but the card has room for the surface and it is the one
    // thing the title doesn't say.
    category: "AI-Native · Config",
    tags: ["AI-Native", "Config", "Web App"],
    year: "2026",
    thumbnailColor: "#D4A24C",
    aspect: "aspect-[16/9]",
    image: "/images/projects/dotlet-cover-v2.webp",
    cursorLabel: "case-study",
  },
  {
    slug: "clinical-trial-matching",
    title: "AI Clinical Matching Workspace",
    impact:
      "Integrated ophthalmic DICOM/OCT imaging with EMR records to reduce patient screening time by 50% across research sites in Melbourne.",
    company: "Clinical Trial Recruitment",
    category: "Healthcare AI · EMR + Retinal Imaging",
    tags: ["Healthcare AI", "EMR + Retinal Imaging", "Web App"],
    nda: true,
    year: "2026",
    thumbnailColor: "#3E8E7E",
    aspect: "aspect-[16/9]",
    image: "/images/projects/clinical-trial-matching.png",
    cursorLabel: "case-study",
  },
  {
    slug: "menopause-health-audit",
    title: "Menopause Health Compliance Audit",
    impact:
      "Redesigned consent for sensitive medical data on a platform serving 100,000+ patients, closing the legal exposure in how that data was being collected.",
    company: "Perimenopause & Menopause Care",
    category: "Health & Wellness · UX Audit",
    tags: ["Health & Wellness", "UX Audit"],
    year: "2026",
    thumbnailColor: "#8B6FA3",
    aspect: "aspect-[16/9]",
    image: "/images/projects/menopause-cover.svg",
    cursorLabel: "case-study",
  },
  {
    slug: "pet-health-collar",
    title: "Connected Pet Hardware App",
    impact:
      "Designed 0→1 BLE pairing and real-time GPS tracking flows, driving a 92% successful first-try device setup rate.",
    company: "Connected Pet Collar",
    category: "IoT · Mobile",
    tags: ["IoT", "Mobile"],
    nda: true,
    year: "2025",
    thumbnailColor: "#1B5E42",
    aspect: "aspect-[16/9]",
    image: "/images/projects/pet-health-collar.png",
    cursorLabel: "case-study",
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
    // 16/9 like every other card. This was the one entry still on 10/7, which
    // is why it sat taller than its neighbours in the grid; the card crops with
    // object-cover, so the export needs no re-framing.
    aspect: "aspect-[16/9]",
    image: "/images/projects/elderly-care-cover.svg",
    cursorLabel: "case-study",
  },
];
