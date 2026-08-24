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

/**
 * Licences and certifications, straight from LinkedIn. Newest first.
 *
 * `issued` is "YYYY-MM" — the /about timeline plots each one on a real date
 * axis, so the format matters. Add a certificate here and it appears both in
 * any list that reads this array and as a mark on the timeline.
 */
export const certifications = [
  {
    name: "AI Fluency for Educators",
    issuer: "Anthropic",
    issued: "2026-04",
    note: "The 4D framework turned outward — built with Prof. Joseph Feller (University College Cork) and Prof. Rick Dakan (Ringling College) for people who have to teach this, not just use it.",
  },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    issued: "2026-03",
    note: "Anthropic's 4D framework — Delegation, Description, Discernment, Diligence. The vocabulary I'd been missing for why some AI-assisted work lands and some doesn't.",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    issued: "2026-03",
    note: "Prompt construction, constraint-setting, and reading model output critically rather than accepting the first plausible answer.",
  },
  {
    name: "Google UX Design Professional",
    issuer: "Google",
    issued: "2025-06",
    note: "The full seven-course certificate, closed out. Research through high-fidelity delivery, with a portfolio project at every stage.",
  },
  {
    name: "Build Dynamic User Interfaces for Websites",
    issuer: "Google",
    issued: "2024-11",
    note: "Responsive layout and interaction patterns for the web — how a design has to bend across breakpoints without losing its logic.",
  },
  {
    name: "Create High-Fidelity Designs & Prototypes in Figma",
    issuer: "Google",
    issued: "2024-11",
    note: "Taking a validated low-fidelity flow through to a prototype an engineer can build from, and a usability session can actually test.",
  },
  {
    name: "Conduct UX Research & Test Early Concepts",
    issuer: "Google",
    issued: "2024-11",
    note: "Study design, moderation, and synthesis — testing an idea while it's still cheap to be wrong about it.",
  },
  {
    name: "Work with Components in Figma",
    issuer: "Coursera",
    issued: "2024-10",
    note: "Components, variants and properties — the mechanics behind a design system that survives more than one designer.",
  },
  {
    name: "Enterprise Design Thinking Co-Creator",
    issuer: "IBM",
    issued: "2024-07",
    note: "The step past Practitioner: contributing on live engagements and taking the lead, rather than applying the framework to your own work alone.",
  },
  {
    name: "Build Wireframes & Low-Fidelity Prototypes",
    issuer: "Google",
    issued: "2024-07",
    note: "Structure before surface — getting the flow and hierarchy right while it's still a box on a page.",
  },
  {
    name: "Start the UX Design Process: Empathize, Define & Ideate",
    issuer: "Google",
    issued: "2023-04",
    note: "Personas, journey maps and problem statements — the discipline of defining the problem before reaching for a solution.",
  },
  {
    name: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    issued: "2023-01",
    note: "The first of the seven. Started it the month I moved into a full design seat — formalising what the internship had taught by doing.",
  },
  {
    name: "UI / UX",
    issuer: "Great Learning",
    issued: "2022-11",
    note: "First structured UX training, taken five months into the internship to put names to what I was already doing.",
  },
  {
    name: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    issued: "2022-03",
    note: "IBM's framework for keeping a team pointed at the user — collaboration, research, synthesis, prototyping and storytelling as one loop.",
  },
  {
    name: "Digital Marketing",
    issuer: "Udemy",
    issued: "2022-02",
    note: "How a product gets found and framed. Useful later for arguing about positioning, not just pixels.",
  },
  {
    name: "Web Development",
    issuer: "Udemy",
    issued: "2021-09",
    note: "HTML, CSS and JavaScript — taken before the first design job, so I'd stop handing engineers work I couldn't reason about.",
  },
  {
    name: "Positive Psychology",
    issuer: "University of North Carolina",
    issued: "2020-07",
    note: "Barbara Fredrickson's course on how positive emotion widens what people notice. The earliest thing here, and the reason I design for states of mind rather than tasks alone.",
  },
] as const;

export const education = {
  school: "SNS College of Technology",
  location: "Coimbatore, India",
  degree: "B.E., Electronics & Communication Engineering",
  detail:
    "First Class with Distinction — CGPA 9.35 / 10, from an NBA-accredited program shaped by India's first Design Thinking-based educational framework.",
} as const;
