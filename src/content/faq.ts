/**
 * The questions that come up before a first call, answered in full.
 *
 * These render inside a detail window (FaqDetail), not a chat bubble. Each
 * item leads with `tldr` — a one-sentence, recruiter-scannable answer — then
 * the full paragraphs below it for anyone who wants the real context instead
 * of the elevator pitch. Crisp first, complete if you keep reading.
 */
export type FaqItem = {
  question: string;
  /** One sentence, read in under five seconds — the part a skimming recruiter actually needs. */
  tldr: string;
  /** Each string is its own paragraph. */
  paragraphs: string[];
  /** Rendered as a bullet list after the paragraphs, before `closing`. */
  bullets?: string[];
  /** A final pull-quote-style paragraph — used for the one line worth setting apart. */
  closing?: string;
};

export const faqIntro = {
  headingLead: "Things",
  headingTail: "I've been asked",
  blurb: "A few questions that usually come up — answered before the email thread starts.",
  /** Sits above the first bubble, like a message header. */
  meta: "Usually answered within a day",
};

export const faq: FaqItem[] = [
  {
    question: "Are you available to hire?",
    tldr: "Yes — 4+ years as a Senior Product Designer across healthcare, public safety and clinical systems, now looking for a leadership role where AI is part of the interaction model, not just the tooling.",
    paragraphs: [
      "I'm looking for a product design leadership role where I can work on complex products, shape product direction, and explore what happens when AI becomes part of the interaction model.",
      "My experience spans healthcare, clinical trials, public safety, IoT and enterprise software. I've designed large-scale systems for clinical research, digital evidence management, healthcare, elderly care and connected-device ecosystems.",
      "Across very different domains, the challenge has been similar: make complex systems understandable, useful and trustworthy.",
      "More recently, I've been working deeply with AI — both designing AI-enabled experiences and using AI tools throughout my own design process.",
      "I'm looking for a team where I can bring those two sides together: deep product design and an AI-native way of working.",
    ],
  },
  {
    question: "How does working with you look?",
    tldr: "Problem first, interface last: I sit with users, engineers and domain experts before deciding what anything should look like, then prototype in whatever medium answers the question fastest.",
    paragraphs: [
      "I start with the problem, then work outward.",
      "I like getting close to users, engineers, researchers and domain experts before deciding what the interface should be. I try to understand the user need, the business context, the technical constraints and the things that could go wrong.",
      "Then I prototype. Sometimes that is Figma. Sometimes it is a working prototype. Sometimes I use Claude, Cursor, Replit or Figma Make to explore an idea that would otherwise take much longer to communicate.",
      "I like ambiguity, but I don't like ambiguity staying ambiguous for too long. My job is to turn an unclear problem into something the team can reason about, test and eventually ship.",
      "I also care deeply about design systems. I've worked on large products where consistency, reusable patterns and governance matter because the product has to scale beyond one designer or one feature.",
    ],
  },
  {
    question: "What kind of problems do you take on?",
    tldr: "High-stakes, high-complexity ones — evidence management for law enforcement, clinical-trial matching, elderly care — where the obvious solution usually isn't the right one and a bad interface has real consequences.",
    paragraphs: [
      "The obvious solution usually isn't the right one, and I'm drawn to the problems where that's true.",
      "I've worked across clinical trials, healthcare, digital evidence management for law enforcement, elderly care, connected devices and enterprise software. These products involve complex workflows, multiple stakeholders, sensitive information, permissions, large amounts of data and consequential decisions.",
      "I'm particularly drawn to:",
    ],
    bullets: [
      "AI-native products",
      "Agentic workflows",
      "Complex enterprise systems",
      "Healthcare and human-centered technology",
      "Information-dense experiences",
      "Design systems",
      "0→1 products",
      "Ambiguous product problems",
      "Human oversight and trust",
      "AI-assisted decision-making",
    ],
    closing:
      "The question I'm increasingly interested in is: when software can understand intent, reason through a task and take action, what should the human actually see, control and remain responsible for? That feels like one of the defining interaction-design questions of this generation.",
  },
  {
    question: "Do you write code?",
    tldr: "Yes, enough to build, test and understand what I'm designing.",
    paragraphs: [
      "I use it to prototype in code when a static mockup can't answer the question — Claude, Cursor and Figma Make, mainly.",
      "I'm not positioning myself as an engineer. I'm positioning myself as a designer who can cross the boundary between design and implementation.",
      "I use Claude, Cursor, Replit, Lovable and Figma Make to turn ideas into working prototypes, test interactions and understand technical constraints earlier.",
      "Vibe coding has changed my design process because the loop becomes: idea → prototype → interaction → technical constraint → learning → better idea, instead of: idea → Figma → handoff → waiting for implementation.",
      "I don't use AI to avoid thinking. I use it to increase the number of things I can test. That distinction is important to me.",
    ],
  },
  {
    question: "How do you know when something is done?",
    tldr: "When it's held up in usability sessions and accessibility checks and left the person using it with less cognitive load — not when the Figma file looks finished.",
    paragraphs: [
      "When the experience has become meaningfully better for the person using it — not simply when the Figma file looks finished.",
      "For complex products, I look at whether we have:",
    ],
    bullets: [
      "reduced cognitive load",
      "clarified decisions",
      "removed unnecessary work",
      "made important information easier to find",
      "created a workflow people can trust",
      "achieved the intended product outcome",
    ],
    closing:
      "I care about craft enormously, but I don't confuse polish with quality. Sometimes the answer is: ship it. Sometimes: we learned the assumption was wrong. And sometimes: we shouldn't build this. All three can be successful design outcomes.",
  },
  {
    question: "Do you have a style?",
    tldr: "Editorial typography and restraint, visually — but the real style is making dense, high-stakes systems feel simple enough for someone to trust under pressure.",
    paragraphs: [
      "Visually, yes. Philosophically, more so.",
      "I like strong typography, editorial systems, restrained interfaces, thoughtful information hierarchy and details that reward attention.",
      "Outside product design, I'm interested in books, women and intellectual history, technology, architecture, unusual websites, interfaces and the strange corners of the internet. I like connecting things that don't obviously belong together. But I don't want every product I design to look like my product.",
      "My deeper design style is making complexity feel clear. I care about hierarchy, interaction quality, systems and the emotional experience of using something difficult.",
      "With AI, I'm especially interested in the boundary between:",
    ],
    bullets: ["capability and control", "autonomy and agency", "intelligence and trust"],
  },
  {
    // The "read more" option — everything above answers a specific question;
    // this one is here for whoever wants the throughline connecting all of it.
    question: "What ties all of this together?",
    tldr: "Ten different threads — healthcare, law enforcement, clinical trials, IoT, a design system, two conference talks — and every one comes back to systems people have to trust with something that matters.",
    paragraphs: [
      "I've spent my career designing systems that people need to trust. Now I want to explore what happens when those systems can think, reason and act.",
      "That's the connective tissue across the work above — different domains, same underlying thread:",
    ],
    bullets: [
      "Healthcare — complex, sensitive workflows → trust, accessibility, human decisions",
      "Clinical trials — multi-stakeholder systems → workflow orchestration and information architecture",
      "Digital evidence management — high-stakes evidence → permissions, search, sensitive information, auditability and AI-assisted workflows",
      "Pet health / IoT — physical + digital ecosystems → real-time data, alerts and longitudinal information",
      "Elderly care — human vulnerability → accessibility, simplicity and caregiver workflows",
      "Design systems — scale → consistency, governance and reusable infrastructure",
      "AI + vibe coding — new capabilities → rapid experimentation, agentic workflows and design-to-code",
      "Azure + Config talks — communication → articulating a point of view publicly",
      "Startup guidance — leadership → shaping ambiguous problems beyond the assigned interface",
      "Books + Substack + culture — intellectual curiosity → a designer who thinks beyond product conventions",
    ],
  },
];
