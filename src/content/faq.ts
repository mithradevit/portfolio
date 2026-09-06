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
  meta: "To make it easy for you",
};

export const faq: FaqItem[] = [
  {
    question: "How do you handle complex, data-dense enterprise workflows?",
    tldr: "By breaking high-stakes environments into modular, predictable layers — information architecture, progressive disclosure and role-based access, so someone can triage in seconds rather than read a screen.",
    paragraphs: [
      "The domains I work in — law enforcement, clinical trials, connected devices — put thousands of data points in front of someone who has a decision to make and no time to hunt for the one that matters. The failure mode is never a missing feature. It is everything being present at once.",
      "So the work is structural. What belongs on the surface, what belongs one level down, what a given role should never see at all. Progressive disclosure and role-based access are not conveniences here; they are what keeps a screen readable under pressure.",
      "Modular and predictable matters as much as minimal. Someone working a shift learns one pattern and should be able to apply it across the product, so the interface stops being something they think about.",
    ],
  },
  {
    question: "What kind of healthcare products have you designed?",
    tldr: "Four years of clinical and patient-facing systems — diagnostic AI workspaces, EMR and PHR platforms, regulated consent flows, and WCAG 2.1 AA interfaces for low-vision patients.",
    paragraphs: [
      "Healthcare is where most of my work sits, across both the clinician's side and the patient's.",
    ],
    bullets: [
      "Clinical AI workspaces — split-screen diagnostic tools integrating ophthalmic DICOM/OCT imaging with EMR records, to streamline research trial matching.",
      "Enterprise EMR and PHR systems — centralised design systems and tokenised component libraries that unified six-plus fragmented clinical products.",
      "Regulated digital health platforms — patient consent flows and data architectures built to hold up under scrutiny, not just to collect.",
      "Accessible healthcare interfaces — WCAG 2.1 AA web and mobile, designed for low-vision patients and high-stress medical environments.",
    ],
    closing:
      "The constant across all four: in a health product, a design decision is a clinical one. An unreadable score gets carried into a doctor's appointment.",
  },
  {
    question: "What's your experience with AI-native interfaces, LLMs and conversational UI?",
    tldr: "I design intelligent workflows into complex enterprise environments without adding cognitive noise — transparent human-AI loops, graceful fallbacks, and outputs a user can govern.",
    paragraphs: [
      "Most AI features fail in the same place: the model is capable, and the interface gives the user no way to judge whether to trust this particular answer. So the design problem is rarely the model. It is the loop around it.",
      "That means showing what an output was drawn from, designing the failure states as carefully as the success ones, and leaving the person with a way to override, correct or ignore. Confidence has to be earned per answer, not claimed once.",
      "I prototype these workflows rather than specify them, because a conversation is not something a static frame can settle.",
    ],
  },
  {
    question: "Can you build and scale design systems from scratch?",
    tldr: "Yes — component libraries, token structures and the governance that keeps them alive. Consolidating six-plus fragmented clinical products into one tokenised ecosystem cut front-end component delivery time by 50%.",
    paragraphs: [
      "A design system is only half a component library. The other half is governance: who can add to it, what happens when a team needs something it doesn't have, and how it stays true as the products move.",
      "The consolidation work is the clearest example — six-plus clinical products that had drifted apart, brought back to one token structure and one library, which is where the 50% came from. Nobody was rebuilding a date picker for the fourth time.",
      "I build these to bridge design and engineering rather than to police it, which is why the token layer matters more to me than the component count.",
    ],
  },
  {
    question: "What's your experience with 0→1 product development?",
    tldr: "I take products from zero to deployed — discovery, rapid prototyping, front-end handoff and QA. Most recently a custom vector generation tool, built and shipped in 10 days.",
    paragraphs: [
      "0→1 is where I am most useful, because the constraint is judgment rather than process. There is no existing pattern to extend and no research backlog to lean on; you decide what the thing is, build enough of it to be wrong quickly, and keep going.",
      "Dotlet is the cleanest example — a vector generation tool that automates a repetitive designer workflow, taken from idea to a live release in ten days, including the build.",
      "I stay in it through handoff and QA. A 0→1 product that ships at 80% is a prototype with a domain name.",
    ],
  },
  {
    question: "How do you handle front-end execution and technical implementation?",
    tldr: "I build production-grade front-ends as well as design them, coding with AI-assisted tools — so my layouts and systems account for implementation reality instead of discovering it at handoff.",
    paragraphs: [
      "I write and ship front-end code, working with AI-assisted tooling — Cursor, Replit, Claude Code — as part of my normal process rather than as an experiment.",
      "The value is not that it saves an engineer time. It is that a design made by someone who has implemented it arrives with its constraints already resolved: what the component can actually do, where the state lives, what the edge cases cost.",
      "That is most of what handoff friction is — decisions deferred to the person least able to change them. Making them earlier removes the friction rather than documenting it.",
    ],
  },
];
