// The home page proof strip: one rolling number, the countries it happened in,
// and the domains the work sits in.

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export const projectsShipped: Stat = {
  label: "Projects shipped",
  value: 30,
  suffix: "+",
};

// `flag` is a local SVG, not an emoji: Windows ships no flag glyphs and falls
// back to rendering the raw letter pair, so emoji flags would look broken on a
// large share of visitors' machines. Files are from country-flag-icons (MIT),
// copied in rather than kept as a dependency for five images.
export const countries = [
  { code: "AU", name: "Australia", flag: "/images/flags/AU.svg" },
  { code: "US", name: "United States", flag: "/images/flags/US.svg" },
  { code: "IN", name: "India", flag: "/images/flags/IN.svg" },
  { code: "QA", name: "Qatar", flag: "/images/flags/QA.svg" },
  { code: "UK", name: "United Kingdom", flag: "/images/flags/GB.svg" },
];

// Stands in for the client-logo row in the reference. Domains rather than
// marks, because shipping under NDA means most client logos aren't mine to
// display — and a wordmark row of sectors still does the "here's the range"
// job the logos were doing.
export const domains = [
  "Healthcare",
  "Public Safety",
  "IoT & Devices",
  "AI-Native Tools",
  "Enterprise",
];
