/**
 * What Mithra takes on as engagements — the "services" section on the Work page.
 *
 * `icon` is a lucide-react icon name resolved in the component, so this file
 * stays plain data with no JSX (same rule as every other content file).
 */
export type Service = {
  name: string;
  icon: "Compass" | "LayoutGrid" | "Component" | "Sparkles" | "Radio" | "Accessibility";
  items: string[];
};

export const servicesIntro = {
  /** Rendered muted, then the second half in full-strength ink for emphasis. */
  lead: "Every engagement is shaped around the problem rather than a template —",
  emphasis: "pairing deep research with systems that hold up under pressure.",
};

export const services: Service[] = [
  {
    name: "0→1 Product Design",
    icon: "Compass",
    items: ["Discovery", "Concept sprints", "MVP definition", "Prototyping"],
  },
  {
    name: "Enterprise UX",
    icon: "LayoutGrid",
    items: ["Complex workflows", "Dashboards", "Information architecture", "Admin tooling"],
  },
  {
    name: "Design Systems",
    icon: "Component",
    items: ["Component libraries", "Tokens & theming", "Documentation", "Governance"],
  },
  {
    name: "Human–AI Interaction",
    icon: "Sparkles",
    items: ["AI-assisted workflows", "Trust & explainability", "Prompt-driven UI", "Evaluation"],
  },
  {
    name: "IoT & Connected Devices",
    icon: "Radio",
    items: ["Companion apps", "Pairing & onboarding", "Data visualisation", "Cross-device flows"],
  },
  {
    name: "Research & Accessibility",
    icon: "Accessibility",
    items: ["Usability testing", "Field research", "WCAG audits", "Inclusive design"],
  },
];
