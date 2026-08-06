export type CaseStudySection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string; // must match a slug in content/projects.ts
  role: string;
  timeline: string;
  team: string;
  skills: string[];
  sections: CaseStudySection[];
  /** Live product, full write-up, repo — rendered as buttons under the header. */
  links?: { label: string; href: string }[];
};
