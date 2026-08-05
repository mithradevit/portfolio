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
};
