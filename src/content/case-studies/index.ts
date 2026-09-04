import { frontlineSafety } from "./frontline-safety";
import { clinicalTrialMatching } from "./clinical-trial-matching";
import { petHealthCollar } from "./pet-health-collar";
import { dotlet } from "./dotlet";
import { elderlyCare } from "./elderly-care";
import { menopauseHealthAudit } from "./menopause-health-audit";
import type { CaseStudy } from "./types";

export const caseStudies: Record<string, CaseStudy> = {
  [frontlineSafety.slug]: frontlineSafety,
  [clinicalTrialMatching.slug]: clinicalTrialMatching,
  [petHealthCollar.slug]: petHealthCollar,
  [dotlet.slug]: dotlet,
  [elderlyCare.slug]: elderlyCare,
  [menopauseHealthAudit.slug]: menopauseHealthAudit,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export type { CaseStudy, CaseStudySection } from "./types";
