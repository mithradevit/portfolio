// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).

// The same skills as `skillGroups` below, grouped into thematic clusters for
// the Obsidian-style graph on the homepage. Add a skill to a cluster and the
// graph lays it out automatically — no coordinates to maintain by hand.
export type SkillCluster = {
  id: string;
  label: string;
  skills: string[];
};

export const skillClusters: SkillCluster[] = [
  {
    id: "research",
    label: "Research & Insight",
    skills: [
      "User Research",
      "Usability Testing",
      "UX Audit",
      "A/B Testing",
      "Journey Mapping",
      "Market Analysis",
      "Storyboards",
    ],
  },
  {
    id: "strategy",
    label: "Strategy & Systems",
    skills: [
      "Product Strategy",
      "UX Strategy",
      "Design Thinking",
      "Systems Thinking",
      "Design Systems",
      "DesignOps",
      "0→1 Product Design",
    ],
  },
  {
    id: "craft",
    label: "Design Craft",
    skills: [
      "Product Design",
      "UX/UI Design",
      "Interaction Design",
      "Prototyping",
      "Wireframes",
      "User Flows",
    ],
  },
  {
    id: "visual",
    label: "Visual & Narrative",
    skills: [
      "Responsive Design",
      "Motion Graphics",
      "Data Visualization",
      "UX Writing",
      "Branding",
    ],
  },
  {
    id: "domains",
    label: "Domain Depth",
    skills: [
      "Human-AI Interaction",
      "Ethical AI Design",
      "Enterprise UX",
      "B2B SaaS",
      "IoT & Connected Devices",
      "Accessibility (WCAG 2.1)",
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    skills: [
      "Cross-Functional Leadership",
      "Stakeholder Management",
      "Design Mentorship",
      "People Management",
      "Storytelling",
    ],
  },
];

export const skillGroups = [
  {
    label: "Design & Prototyping",
    items: [
      "Product Design",
      "DesignOps",
      "UX/UI Design",
      "Interaction Design",
      "Product Strategy",
      "A/B Testing",
      "UX Writing",
      "UX Strategy",
      "Design Systems",
      "Storyboards",
      "Branding",
      "Prototyping",
      "Motion Graphics",
      "User Research",
      "UX Audit",
      "Usability Testing",
      "User Flows",
      "Storytelling",
      "Market Analysis",
      "Journey Mapping",
      "Design Thinking",
      "Systems Thinking",
      "0→1 Product Design",
      "Human-AI Interaction",
      "Enterprise UX",
      "B2B SaaS",
      "Mobile & Responsive Design",
      "Accessibility (WCAG 2.1)",
      "Wireframes",
      "Data Visualization",
      "IoT & Connected Devices",
      "Stakeholder Management",
      "Cross-Functional Leadership",
      "Design Mentorship",
      "Ethical AI Design",
      "People Management",
    ],
  },
  {
    label: "Tools — AI-Native Design & Engineering Stack",
    items: [
      "Figma",
      "Higgsfield",
      "Adobe Firefly",
      "Claude",
      "FigJam",
      "Miro",
      "Framer",
      "Figma Make",
      "Figma Agents",
      "Adobe Creative Cloud",
      "Photoshop",
      "After Effects",
      "Illustrator",
      "InDesign",
      "Microsoft 365 Copilot",
      "ChatGPT",
      "Gemini",
      "Google Stitch",
      "Replit",
      "Cursor",
      "Lovable",
      "Obsidian",
      "Supabase",
    ],
  },
] as const;

export const leadership = [
  {
    role: "AI & Design Engineering Mentor",
    detail:
      "Audited 5+ early-stage and founder-led products, delivering strategic insights across product direction, UX, market readiness, and AI implementation to guide concepts toward viable 0→1 digital products.",
  },
  {
    role: "Innovation & Startup Jury",
    detail:
      "Evaluated 50+ student-led startup ideas as an industry jury member, assessing product viability, innovation, user value, and execution potential.",
  },
  {
    role: "Design Thinking Mentor",
    detail:
      "Guided students through human-centered product discovery, translating ambiguous problem spaces into validated, deployable solutions.",
  },
] as const;

export const certifications = [
  { name: "AI Fluency: Framework & Foundation", issuer: "Anthropic" },
  { name: "Claude Code 101 | Model Context Protocol", issuer: "Anthropic" },
  { name: "Introduction to Agent + Subagent", issuer: "Anthropic" },
  { name: "Enterprise Design Thinking Practitioner", issuer: "IBM" },
  { name: "Enterprise Design Thinking Co-Creator", issuer: "IBM" },
  { name: "Google UX Design Specialization", issuer: "Google" },
  { name: "Positive Psychology", issuer: "University of North Carolina" },
] as const;

export const education = {
  school: "SNS College of Technology",
  location: "Coimbatore, India",
  degree: "B.E., Electronics & Communication Engineering",
  detail:
    "First Class with Distinction — CGPA 9.35 / 10, from an NBA-accredited program shaped by India's first Design Thinking-based educational framework.",
} as const;
