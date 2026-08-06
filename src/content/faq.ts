/**
 * The questions that come up before a first call, answered up front.
 *
 * Answers are written in Mithra's voice and kept to two or three sentences —
 * they render inside a chat bubble, and anything longer stops reading like a
 * reply and starts reading like a page.
 */
export type FaqItem = {
  question: string;
  answer: string;
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
    answer:
      "Both ways. Freelance for projects and retainers, full-time if the work and the team are worth it. Either way — let's talk.",
  },
  {
    question: "How does working with you look?",
    answer:
      "I start by understanding the problem before touching Figma — users, constraints, what's already been tried. Then short loops: sketch, review, refine, with you in the room for each one. You'll never wait two weeks to see where it's going.",
  },
  {
    question: "What kind of problems do you take on?",
    answer:
      "The messy, high-stakes kind — enterprise workflows, clinical and safety-critical tools, connected devices, AI-assisted products. If people use it under pressure and the cost of a bad interface is real, that's my territory.",
  },
  {
    question: "Do you write code?",
    answer:
      "Enough to be dangerous, and enough to hand engineers something they can actually build. I prototype in code when a static mockup can't answer the question — this site is one of those cases.",
  },
  {
    question: "How do you know when something is done?",
    answer:
      "When it holds up in someone else's hands, not mine. That means usability sessions, accessibility checks, and edge cases that only show up in the field — not a pixel-perfect file that no one has tested.",
  },
  {
    question: "Do you have a style?",
    answer:
      "Not a visual one I'd impose on you. What is consistent: restraint, clear hierarchy, and interfaces that stay calm as they get more complex. The look should come from your product, not my portfolio.",
  },
];
