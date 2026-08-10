// The 30-day activity strip's real content, in place of GitHub events — most
// of the actual work (talks, advisory calls, writing, AI-assisted builds)
// leaves no public commit trail, so a commit graph would under-report it.
// Oldest first, index 0 = 30 days ago, index 29 = today — same order the
// bars render in, so `activityLog[i]` always describes bar `i`.
//
// `null` marks a day with nothing logged; its bar renders at rest and the
// hover card shows nothing to explain rather than inventing an entry.

export type ActivityLogEntry = {
  day: number;
  activity: string;
  type: string;
  tool: string;
  signal: string;
  output: string;
};

export const activityLog: (ActivityLogEntry | null)[] = [
  {
    day: 1,
    activity: "Built a tiny interface that turns vague thoughts into product hypotheses",
    type: "Build",
    tool: "Claude + Cursor",
    signal: "AI as a thinking partner",
    output: "Prototype",
  },
  {
    day: 2,
    activity: 'Read about model behavior and wrote notes on what "helpful" actually means',
    type: "Research",
    tool: "Claude",
    signal: "Human values → product behavior",
    output: "Notes",
  },
  {
    day: 3,
    activity: "Rebuilt an old product concept through vibe coding",
    type: "Build",
    tool: "Replit",
    signal: "Prototyping as a thinking medium",
    output: "Prototype",
  },
  {
    day: 4,
    activity: "Compared Claude, Cursor and Lovable on the same product problem",
    type: "Experiment",
    tool: "AI tools",
    signal: "Tools influence creative decisions",
    output: "Comparison",
  },
  {
    day: 5,
    activity: "Studied AI interfaces that give users too much certainty",
    type: "UX Research",
    tool: "Claude",
    signal: "Trust ≠ confidence",
    output: "Research notes",
  },
  {
    day: 6,
    activity: "Designed an interaction for communicating uncertainty",
    type: "Design",
    tool: "Figma Make",
    signal: "Epistemic transparency",
    output: "Prototype",
  },
  null,
  {
    day: 8,
    activity: "Gave product feedback to an early-stage founder",
    type: "Startup",
    tool: "Founder call",
    signal: "Design leadership beyond UI",
    output: "Advisory",
  },
  {
    day: 9,
    activity: "Built a deliberately bad AI assistant to understand failure modes",
    type: "Experiment",
    tool: "Claude",
    signal: "Failure as research material",
    output: "Prototype",
  },
  {
    day: 10,
    activity: "watched odyssey, finally",
    type: "leisure",
    tool: "—",
    signal: "some nights you just need a story",
    output: "watched",
  },
  {
    day: 11,
    activity: "Explored how AI agents could change onboarding and information architecture",
    type: "Research",
    tool: "Claude",
    signal: "New interaction models",
    output: "Research",
  },
  {
    day: 12,
    activity: "Built an agentic workflow that researches a topic and produces a visual brief",
    type: "Build",
    tool: "Claude",
    signal: "Designer as orchestrator",
    output: "Prototype",
  },
  {
    day: 13,
    activity: "Reviewed AI products and documented recurring UX anti-patterns",
    type: "Design Research",
    tool: "AI products",
    signal: "Pattern recognition",
    output: "Research",
  },
  null,
  {
    day: 15,
    activity: "Prepared a Microsoft Azure AI talk",
    type: "Speaking",
    tool: "Microsoft Azure",
    signal: "Technical fluency + communication",
    output: "Presentation",
  },
  {
    day: 16,
    activity: "Delivered / refined an AI design talk",
    type: "Community",
    tool: "Azure AI",
    signal: "Translating technical ideas",
    output: "Talk",
  },
  {
    day: 17,
    activity: "Investigated why AI interfaces increasingly resemble chat",
    type: "Research",
    tool: "Claude",
    signal: "Chat may be transitional",
    output: "Essay notes",
  },
  {
    day: 18,
    activity: "Built three different UI directions for the same AI capability",
    type: "Design",
    tool: "Figma Make",
    signal: "Exploration before convergence",
    output: "Prototypes",
  },
  {
    day: 19,
    activity: "watched brand new day, no notes just vibes",
    type: "leisure",
    tool: "—",
    signal: "rest counts as research too",
    output: "watched",
  },
  {
    day: 20,
    activity: "Helped a startup rethink a workflow around AI instead of adding an AI feature",
    type: "Strategy",
    tool: "Startup advisory",
    signal: "AI should reshape products",
    output: "Strategy",
  },
  {
    day: 21,
    activity: "Wrote about women whose intelligence doesn't always look technical",
    type: "Substack",
    tool: "Writing",
    signal: "Culture + technology",
    output: "Essay",
  },
  null,
  {
    day: 23,
    activity: "Built a prototype where the AI communicates its uncertainty",
    type: "Build",
    tool: "Claude + Figma Make",
    signal: "Trust through legibility",
    output: "Prototype",
  },
  {
    day: 24,
    activity: "Reviewed an AI product as both designer and user",
    type: "Critique",
    tool: "Product teardown",
    signal: "UX beyond aesthetics",
    output: "UX critique",
  },
  {
    day: 25,
    activity: "Read about interpretability and translated the idea into an interface metaphor",
    type: "Research",
    tool: "AI research",
    signal: "Technical → interaction thinking",
    output: "Concept",
  },
  {
    day: 26,
    activity: "Prepared Config presentation around AI-empowered designers",
    type: "Speaking",
    tool: "Figma + Claude",
    signal: "Designer → systems thinker",
    output: "Presentation",
  },
  {
    day: 27,
    activity: 'Presented "Designing with Leverage: The AI-Empowered Designer"',
    type: "Community",
    tool: "Config",
    signal: "Public point of view",
    output: "Talk",
  },
  null,
  {
    day: 29,
    activity: "Wrote about what happens to design when making becomes nearly free",
    type: "Substack",
    tool: "Writing",
    signal: "Judgment becomes more valuable",
    output: "Essay",
  },
  {
    day: 30,
    activity: "Built a personal archive connecting AI, design, books, women, startups and culture",
    type: "Synthesis",
    tool: "Claude + Figma",
    signal: "Cross-disciplinary synthesis",
    output: "Archive",
  },
];
