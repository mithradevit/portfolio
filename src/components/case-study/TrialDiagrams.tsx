import { ArrowRight } from "lucide-react";

/**
 * Diagrams for the clinical trial matching case study.
 *
 * Built from the site's own design system rather than a palette of their own:
 * `foreground` / `foreground-light` / `background` / `primary` tokens, the site
 * font stack, and the same card treatment `CaseStudySection` uses for its grid
 * — so these read as part of the page, not as pictures dropped into it, and
 * they follow the theme toggle into dark mode instead of staying pinned light.
 *
 * They are diagrams, not screen recreations: they describe the reasoning, which
 * is documented, rather than asserting an interface appearance.
 */

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-foreground/10 bg-foreground/[0.02] flex w-full flex-col gap-3 rounded-[12px] border p-4">
              <span className="text-primary font-mono text-[11px] tracking-[0.08em]">
        {label}
      </span>
      {children}
    </div>
  );
}

/** The same card the section grid uses, so diagram parts match page parts. */
function Card({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "flex min-w-0 flex-1 flex-col gap-1 rounded-[11px] border p-3",
        accent ? "border-primary/40 bg-primary/[0.06]" : "border-foreground/10 bg-background",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Step({ label, note, accent }: { label: string; note?: string; accent?: boolean }) {
  return (
    <Card accent={accent}>
      <span className="text-foreground text-[13px] font-medium">{label}</span>
      {note && <span className="text-foreground-light text-[12px] leading-[1.5]">{note}</span>}
    </Card>
  );
}

function Arrow() {
  return (
    <ArrowRight
      size={14}
      aria-hidden
      className="text-foreground-light/50 shrink-0 self-center rotate-90 sm:rotate-0"
    />
  );
}

/** Sponsor → protocol → platform → practice → CRO, in one line. */
function TrialChainDiagram() {
  return (
    <Frame label="The chain">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Step label="Sponsor" note="Commissions the trial" />
        <Arrow />
        <Step label="Protocol" note="Criteria, in clinical prose" />
        <Arrow />
        <Step label="Platform" note="Records + imaging, evaluated" accent />
        <Arrow />
        <Step label="Practice" note="Where the patients are" />
        <Arrow />
        <Step label="CRO" note="Takes the referral" />
      </div>
    </Frame>
  );
}

/** Retrospective vs prospective. */
function MatchingModesDiagram() {
  const rows = [
    { k: "When", a: "Across existing patient data", b: "During the visit, patient in the room" },
    { k: "Who acts", a: "The clinic runs the process", b: "The clinician sits with the patient" },
    { k: "Output", a: "A candidate list, referred to the CRO", b: "An eligibility conversation, then a referral" },
  ];
  return (
    <Frame label="Two modes">
      <div className="border-foreground/10 bg-background overflow-hidden rounded-[11px] border">
        <div className="grid grid-cols-[minmax(64px,0.6fr)_1fr_1fr]">
          <div className="p-3" />
          <div className="border-foreground/10 border-l p-3">
            <span className="text-foreground-light text-[12px] font-medium">Retrospective</span>
          </div>
          <div className="border-foreground/10 bg-primary/[0.06] border-l p-3">
            <span className="text-foreground text-[12px] font-medium">Prospective — live</span>
          </div>
          {rows.map((r) => (
            <div key={r.k} className="contents">
              <div className="border-foreground/10 text-foreground-light border-t p-3 text-[11.5px]">
                {r.k}
              </div>
              <div className="border-foreground/10 text-foreground-light border-t border-l p-3 text-[12px] leading-[1.5]">
                {r.a}
              </div>
              <div className="border-foreground/10 bg-primary/[0.06] text-foreground border-t border-l p-3 text-[12px] leading-[1.5] font-medium">
                {r.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/** The six requirements as one cycle. */
function EligibilityLoopDiagram() {
  const steps = [
    { title: "Understand", note: "Questions about the patient's disease" },
    { title: "Check", note: "Against inclusion and exclusion criteria" },
    { title: "Tell the patient", note: "Communicate whether they are eligible", accent: true },
    { title: "Act", note: "Pre-inclusion, then refer" },
    { title: "Alert", note: "When a patient is recruited" },
    { title: "Keep current", note: "Coordinator updates status" },
  ];
  return (
    <Frame label="Six requirements, one loop">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Card key={s.title} accent={s.accent}>
            <span
              className={[

                s.accent ? "text-primary" : "text-foreground-light/60",
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground text-[13px] font-medium">{s.title}</span>
            <span className="text-foreground-light text-[12px] leading-[1.5]">{s.note}</span>
          </Card>
        ))}
      </div>
    </Frame>
  );
}

/** Match % on top, criteria underneath. */
function CriteriaLogicDiagram() {
  const criteria = [
    { kind: "Inclusion", label: "Age within protocol range", state: "Meets" },
    { kind: "Inclusion", label: "Geographic atrophy on FAF", state: "Meets" },
    { kind: "Inclusion", label: "BCVA within range", state: "Insufficient data", accent: true },
    { kind: "Exclusion", label: "Prior anti-VEGF within 90 days", state: "Does not meet", accent: true },
  ];
  return (
    <Frame label="Eligibility logic">
      <div className="border-primary/40 bg-primary/[0.06] flex items-center gap-3.5 rounded-[11px] border p-3.5">
        <span className="text-primary font-mono text-[24px] leading-none font-semibold">78%</span>
            <span className="text-foreground-light min-w-0 text-[12px] leading-[1.55]">
          <span className="text-foreground font-medium">The match percentage is the door.</span> It
          cannot say whether the missing 22% is a soft preference or a hard stop.
        </span>
      </div>
      <div className="border-foreground/10 bg-background overflow-hidden rounded-[11px] border">
        {criteria.map((cr, i) => (
          <div
            key={cr.label}
            className={[
              "flex flex-wrap items-center gap-x-3 gap-y-1.5 p-3",
              i === 0 ? "" : "border-foreground/10 border-t",
            ].join(" ")}
          >
            <span className="text-foreground-light/60 w-[58px] shrink-0 font-mono text-[10px] tracking-[0.08em] uppercase">
              {cr.kind}
            </span>
            <span className="text-foreground min-w-0 flex-1 text-[12.5px]">{cr.label}</span>
            <span
              className={[
                "rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
                cr.accent
                  ? "border-primary/40 text-primary border"
                  : "border-foreground/15 text-foreground-light border",
              ].join(" ")}
            >
              {cr.state}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Step label="Inclusion" note="Additive — does this person qualify" />
        <Step label="Exclusion" note="One outranks any number of inclusions" accent />
        <Step label="Insufficient data" note="Not a failure — a gap, sometimes closable in the visit" />
      </div>
    </Frame>
  );
}

/** The five constraints, and that none of them could be won outright. */
function DesignConstraintsDiagram() {
  const items = [
    {
      title: "Clinical complexity",
      body: "Detailed clinical data and eligibility criteria couldn't be simplified away. The challenge was making that complexity understandable without losing its meaning.",
    },
    {
      title: "Usability",
      body: "Users needed to make sense of complex information quickly, without needing to understand the technology behind it.",
    },
    {
      title: "Trust",
      body: "Every recommendation needed context — where the information came from, how it was derived, and why it mattered.",
    },
    {
      title: "Information density",
      body: "The interface had to surface substantial clinical information while preserving hierarchy, scanability, and focus.",
    },
    {
      title: "Scalability",
      body: "The experience needed to work across different trials, patient profiles, workflows, and evolving clinical use cases.",
    },
  ];
  return (
    <Frame label="Five constraints, pulling against each other">
      <div className="border-foreground/10 bg-background overflow-hidden rounded-[11px] border">
        {items.map((it, i) => (
          <div
            key={it.title}
            className={[
              "flex flex-col gap-1 p-3.5 sm:flex-row sm:items-baseline sm:gap-4",
              i === 0 ? "" : "border-foreground/10 border-t",
            ].join(" ")}
          >
            <div className="flex shrink-0 items-baseline gap-2.5 sm:w-[170px]">
      <span className="text-primary font-mono text-[11px] tracking-[0.08em] uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground text-[13px] font-medium">{it.title}</span>
            </div>
        <span className="text-foreground-light min-w-0 text-[12px] leading-[1.5]">
              {it.body}
            </span>
          </div>
        ))}
      </div>
      <p className="text-foreground-light text-[12px] leading-[1.55]">
        <span className="text-foreground font-medium">None of these could be won outright.</span>{" "}
        Density fights usability, trust adds to density, and scalability rules out tuning any one
        screen until it works.
      </p>
    </Frame>
  );
}

/** What was tested, what failed, and what the failure changed. */
function EvaluationMatrixDiagram() {
  const rows = [
    {
      tested: "Eligibility matching",
      failed: "Users could see the result but not understand why",
      changed: "Made supporting criteria and evidence visible at the decision point",
    },
    {
      tested: "Dense eligibility criteria",
      failed: "Clinicians skipped important details when scanning",
      changed: "Reordered information by decision priority, not protocol order",
    },
    {
      tested: "Multiple trial matches",
      failed: "Too many possible trials created decision fatigue",
      changed: "Introduced prioritisation instead of presenting a flat list",
    },
    {
      tested: "AI-supported recommendations",
      failed: "Users questioned recommendations without visible evidence",
      changed: "Added traceability from recommendation → criteria → clinical evidence",
    },
    {
      tested: "Patient communication",
      failed: "Internal clinical terminology was difficult to explain aloud",
      changed: "Separated system-level detail from a concise, patient-facing eligibility summary",
    },
  ];
  return (
    <Frame label="What failed, and what it changed">
      <div className="border-foreground/10 bg-background overflow-hidden rounded-[11px] border">
        <div className="text-foreground-light/60 border-foreground/10 hidden border-b font-mono text-[10px] tracking-[0.08em] uppercase sm:grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="p-3">What we tested</div>
          <div className="border-foreground/10 border-l p-3">What failed</div>
          <div className="border-foreground/10 border-l p-3">What changed</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.tested}
            className={[
              "grid grid-cols-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1.15fr)]",
              i === 0 ? "" : "border-foreground/10 border-t",
            ].join(" ")}
          >
            <div className="flex items-baseline gap-2.5 p-3">
      <span className="text-primary font-mono text-[11px] tracking-[0.08em] uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground text-[12.5px] font-medium">{r.tested}</span>
            </div>
            <div className="border-foreground/10 text-foreground-light p-3 pt-0 text-[12px] leading-[1.5] sm:border-l sm:pt-3">
              {r.failed}
            </div>
            <div className="border-foreground/10 bg-primary/[0.06] text-foreground p-3 text-[12px] leading-[1.5] sm:border-l">
              {r.changed}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export const trialDiagrams = {
  "trial-chain": TrialChainDiagram,
  "matching-modes": MatchingModesDiagram,
  "eligibility-loop": EligibilityLoopDiagram,
  "criteria-logic": CriteriaLogicDiagram,
  "design-constraints": DesignConstraintsDiagram,
  "evaluation-matrix": EvaluationMatrixDiagram,
};
