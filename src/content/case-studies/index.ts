import { frontlineSafety } from "./frontline-safety";
import { clinicalTrialMatching } from "./clinical-trial-matching";
import { petHealthCollar } from "./pet-health-collar";
import { healthRing } from "./health-ring";
import { dotlet } from "./dotlet";
import { elderlyCare } from "./elderly-care";
import { maternityClinicalSuite } from "./maternity-clinical-suite";
import { crmRemediation } from "./crm-remediation";
import type { CaseStudy } from "./types";

export const caseStudies: Record<string, CaseStudy> = {
  [frontlineSafety.slug]: frontlineSafety,
  [clinicalTrialMatching.slug]: clinicalTrialMatching,
  [petHealthCollar.slug]: petHealthCollar,
  [healthRing.slug]: healthRing,
  [dotlet.slug]: dotlet,
  [elderlyCare.slug]: elderlyCare,
  [maternityClinicalSuite.slug]: maternityClinicalSuite,
  [crmRemediation.slug]: crmRemediation,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export type { CaseStudy, CaseStudySection } from "./types";
