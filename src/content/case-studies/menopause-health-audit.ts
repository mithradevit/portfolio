// Self-initiated UX audit of a live menopause health platform. Written from
// Mithradevi's own audit document (Miyara-Case-Study-FINAL.md, Sep 2026).
//
// The product's real name is withheld throughout, per her explicit
// instruction — this is unsolicited third-party work, not a client
// engagement, and she asked for it redacted the way an NDA product would be.
// The source doc used the real name in its own title and body; every mention
// here has been generalised to "the platform" / "the product".
//
// No screenshots or brand imagery were supplied. Every place the source doc
// marks `[IMAGE — ...]` is a `slot` or an empty `steps[].image` here — a
// visible placeholder rather than an invented screen. Do not fill these with
// a generic mockup; they need the real audited screens or nothing.
import type { CaseStudy } from "./types";

export const menopauseHealthAudit: CaseStudy = {
  slug: "menopause-health-audit",
  // Grey-mat treatment for the two redesigned-screen captures in "The
  // Redesign" — see CaseStudySteps' `matted` branch.
  mattedImages: true,
  role: "Lead Product Designer",
  timeline: "2 weeks, 2026",
  team: "Solo",
  scope: "UX audit, IA restructure, visual identity, design system",
  skills: ["UX Audit", "Accessibility (WCAG 2.1)", "Design Systems", "Health & Wellness"],
  nda: "This is self-initiated, independent work — I audited a live product I have no affiliation with, and I'm not naming it here. Every screen and finding below is real; the product's identity is the only thing withheld.",
  sections: [
    {
      heading: "Overview",
      intro: {
        lead: "A menopause health platform was collecting sensitive medical data through a consent flow that couldn't legally hold — and showing women clinical results they had no way to interpret.",
        columns: [
          {
            title: "The product",
            body: "A perimenopause and menopause platform. Women complete a 17-step clinical assessment, receive a staged health score, log symptoms and cycles daily, consult an AI companion, browse an educational library, and book expert consultations. It's a product where a user hands over her most sensitive medical history and receives back something she may act on — or take to her doctor.",
          },
          {
            title: "What I did",
            body: "I audited 19 screens, prioritised 13 critical and major issues, and redesigned the four flows carrying the most risk.",
          },
        ],
        insight:
          "The app calculates a perimenopause stage and generates a health score. That makes clarity a clinical requirement, not a design preference — an unreadable score either generates anxiety or gets misinterpreted and carried into a doctor's appointment.",
      },
      body: [],
      slot: {
        label: "Hero image",
        text: "Home screen, before and after, full bleed.",
      },
    },
    {
      heading: "The User",
      body: [
        "The women using this platform are in their forties and fifties. What matters about them, design-wise, is specific.",
      ],
      intro: {
        columns: [
          {
            title: "They track over months, not days",
            body: "Perimenopause is diagnosed by pattern. A single day's symptom log is meaningless — the value is entirely in the trend. Any interface that makes long-range patterns hard to see has failed at the product's core job.",
          },
          {
            title: "They haven't been taught the vocabulary",
            body: "“Vasomotor symptoms” is the clinical term for hot flashes and night sweats. Most users have never encountered it. Health products routinely inherit clinical language from their medical advisors and ship it straight to patients.",
          },
          {
            title: "They're often using the app at the worst moment",
            body: "A woman logs a night sweat at 3am, one-handed, in the dark, having just woken up. That is the real usage context, and it makes touch-target size and contrast into functional requirements rather than accessibility checkboxes.",
          },
          {
            title: "They arrive already under-served",
            body: "Menopause is one of the most under-researched areas in women's health, and many users come to a product like this after being dismissed elsewhere. The app is not starting from neutral trust — it's starting from depleted trust.",
          },
        ],
      },
    },
    {
      heading: "Approach",
      body: [
        "I ran a screen-by-screen expert audit across all 19 screens of the core experience, evaluating against four frameworks — chosen deliberately rather than comprehensively.",
      ],
      blocks: [
        {
          title: "Nielsen's 10 heuristics",
          body: ["Catch interaction and mental-model failures — the mismatches between what the interface implies and what it does."],
        },
        {
          title: "WCAG 2.1",
          body: ["Non-negotiable for a product whose users skew toward age-related vision change. Contrast, text size and colour-independence aren't polish here; they're the difference between a symptom log being accurate and being guessed at."],
        },
        {
          title: "iOS Human Interface Guidelines",
          body: ["Govern touch targets and scroll affordances — which matter disproportionately given the 3am, one-handed usage context."],
        },
        {
          title: "Google's HEART framework",
          body: ["Ties each finding to a measurable outcome, so severity ratings are arguments about consequence rather than expressions of taste."],
        },
      ],
      findingsLabel: "Severity scale · how findings were rated",
      findings: [
        {
          title: "S4 — Critical",
          body: "Blocks the user or creates compliance risk. Must fix before launch.",
        },
        {
          title: "S3 — Major",
          body: "Significant friction, likely abandonment. Fix immediately.",
        },
        {
          title: "S2 — Minor",
          body: "Usability friction with a workaround. Next sprint.",
        },
        {
          title: "S1 — Cosmetic",
          body: "Visual polish, minimal functional impact. Fix when convenient.",
        },
      ],
      note: {
        label: "A note on method",
        body: "This audit is expert-heuristic — inspection, not observation. It reliably catches structural, accessibility and compliance failures. It is weaker at predicting emotional impact, which for a menopause product is exactly where the highest-stakes failures live. I return to this in What I'd Do Differently.",
      },
    },
    {
      heading: "What I Found",
      navLabel: "What I Found",
      body: [
        "Eighty-two findings is a number, not an insight. Grouped by root cause, they collapsed into five systemic patterns — and it was the patterns, not the individual items, that drove the redesign.",
      ],
      stats: [
        { value: "82", label: "Findings" },
        { value: "13", label: "Critical or major" },
        { value: "25", label: "Cosmetic, deprioritised" },
      ],
      // Collapsed rows rather than open cards. The five titles are the finding
      // — the argument is that 82 items reduce to five causes — so the titles
      // alone should read as the summary, with the evidence for each one a
      // click away rather than five paragraphs the reader has to wade through
      // to see the shape.
      findingsLabel: "Five systemic patterns",
      findings: [
        {
          title: "Consent and compliance were structurally broken",
          body: "The consent mechanism didn't work as a consent mechanism. The disclaimer was set at roughly 8pt and buried below the fold — legal artefacts presented as visual decoration. (F-04, F-13, F-14)",
        },
        {
          title: "Health data was shown without interpretive context",
          body: "A score of “15 out of 60” with no scale. A symptom calendar rendered as violet dots with no legend. In a health product, uninterpretable data is not neutral — it generates anxiety. (F-41, F-46, F-51, F-55)",
        },
        {
          title: "Colour carried no consistent meaning",
          body: "Orange meant “Ask the AI companion,” “skip this step,” “weight input,” and “exit,” depending on the screen. Nine findings, one cause: no semantic system, so users had to relearn the interface constantly. (F-08, F-11, F-15, F-18, F-19, F-38, F-54, F-60, F-64)",
        },
        {
          title: "Clinical copy didn't match lived experience",
          body: "Section headers read “Vasomotor Symptoms.” A life-stage option read “Uterus removed and hence cannot say.” Language sourced from clinicians, shipped unmediated to patients. (F-22, F-25, F-30, F-32)",
        },
        {
          title: "Interactive affordances were ambiguous",
          body: "Selectable cards had no hover or tap state, so users hesitated over whether options were locked. The primary CTA stayed enabled with nothing selected — the interface signalled availability where there was none. (F-24, F-29, F-75, F-79)",
        },
      ],
      note: {
        label: "How I prioritised",
        body: "I ranked by user consequence × regulatory exposure, not fix cost. Two S4 findings were launch-blocking on compliance grounds and went first regardless of engineering effort. The remaining eleven were sequenced by their effect on assessment completion — the flow every downstream feature depends on. Twenty-five cosmetic findings were logged and deliberately deprioritised, so they wouldn't dilute attention from the two compliance failures that actually mattered.",
      },
    },
    {
      heading: "Four Findings That Weren't Usability Problems",
      navLabel: "Beyond Usability",
      body: [
        "Most of the 82 were usability issues. Four were not. These are the ones that changed how I scoped the project.",
      ],
      findings: [
        {
          title: "The consent checkbox sat above the text it referred to",
          body: "F-13, F-14 · S4 Critical · Screen 4. A checkbox labelled “I agree (read below)” referenced a legal note that rendered below the primary CTA — a user couldn't read what she was consenting to before consenting to it. The CTA ran no validation against the checkbox at all: the full 17-step health data collection proceeded whether consent was given or not. Under GDPR and India's Digital Personal Data Protection Act, consent for processing health data must be informed, specific and unambiguous; this failed on all three. I restructured the sequence to disclosure → consent → action, raised the disclaimer above the fold at 14pt minimum (WCAG 1.4.4), rewrote the copy to name specifically what is collected and why, and gated the CTA on consent state with an inline explanation. Gating the CTA will measurably reduce assessment starts — I recommended accepting that cost, since an assessment completed without valid consent isn't a conversion, it's a liability that has to be deleted later.",
        },
        {
          title: "“Uterus removed and hence cannot say”",
          body: "F-22 · S4 Critical · Screen 6. The life-stage selector offered this phrasing for women who'd had a hysterectomy. It implies uncertainty about her own medical history — but she can say; it's one of the most definite facts about her health. The copy takes a clear medical event and reframes it as ambiguity. This is the failure mode that separates health products from other products: the copy is factually defensible and emotionally wrong, and the emotional wrongness is the clinically relevant part. I rewrote it to state the fact plainly: “Uterus surgically removed — periods have stopped,” with no inference about what she can or cannot know, and removed an unexplained asterisk on the question title (F-23) that invited the reader to imagine what caveat was being withheld.",
        },
        {
          title: "The medical disclaimer was 8pt and below the fold",
          body: "F-04 · S3 Major · Screen 1. On sign-up, the text establishing that the platform does not provide diagnosis was set at roughly 8pt at the very bottom of the screen. For a health data product, this is exactly the text that must meet WCAG 1.4.4 legibility standards, and exactly the text most often treated as a footer. Placing it where nobody reads it creates two exposures at once — legal, and trust: a user who later discovers a disclaimer she never saw has learned something about how the product treats her. I raised it to 14pt, moved it above the fold, and rewrote it in plain language, so it reads as a statement the product is making, not a hedge it is hiding.",
        },
        {
          title: "A health score with no scale",
          body: "F-41, F-55 · S4 Critical · Screens 10 and 13. The assessment result showed “15 out of 60” with no visual scale, range, or severity context — the product's single most important output, arriving uninterpretable. The symptom history calendar was worse: severity as violet dots with no legend, across a 16-row grid where shade differences were near-indistinguishable, especially for low vision. The score now carries a diagnosis label and stage — “78/100 · Perimenopause Stage 2” — legible without a decoder. Severity states in tracking were rebuilt as colour plus icon, satisfying WCAG 1.4.1 rather than relying on hue alone, and symptoms were grouped into clinical categories so a 16-row wall became scannable sections.",
        },
      ],
    },
    {
      heading: "The Redesign",
      body: [],
      steps: [
        {
          title: "Home",
          body: "The original carried three separate entry points to the AI companion, a generic “+” icon where every other tab used a descriptive one, action cards whose “+” implied create rather than navigate, and a community banner that read as an ad inside a health context.",
          image: {
            src: "/images/projects/menopause-health-audit/redesign-home.gif",
            alt: "The redesigned home screen: a single AI-companion card, labelled tracking icon, a health score reading 78 out of 100 with stage and recency, and a streak module.",
            width: 432,
            height: 924,
          },
          bullets: [
            { title: "Consolidated the AI companion", body: "From three placements to one persistent card — freeing the space the health assessment result actually needed." },
            { title: "Replaced the generic + with a labelled icon", body: "New users had no reason to associate a plus sign with the full tracking area." },
            { title: "Gave the score meaning", body: "“78/100 · Perimenopause Stage 2 · Last updated May 16” — score, interpretation and recency in one block, with a single primary CTA replacing two identically-weighted buttons." },
            { title: "Added a streak module", body: "The original had a passive empty state on the weekly score — a screen that asked for daily logging while giving no feedback for having done it." },
            { title: "Rebuilt the community banner in brand palette", body: "Same feature, no longer reading as an advertisement." },
          ],
        },
        {
          title: "Tracking",
          body: "The original symptom logger was a flat 16-row grid of symptom names against Mild/Moderate/Severe columns that didn't align to the dots beneath them, with severity conveyed by colour alone and a Log Symptom CTA that stayed active with nothing selected.",
          image: {
            src: "/images/projects/menopause-health-audit/redesign-tracking.gif",
            alt: "The redesigned symptom tracker: symptoms grouped into clinical categories with severity shown as colour plus icon, aligned column headers, and a month view.",
            width: 432,
            height: 912,
          },
          bullets: [
            { title: "Grouped symptoms into clinical categories", body: "Vasomotor, Physical/Body Changes — replacing an undifferentiated wall with scannable sections." },
            { title: "Rebuilt severity as colour + icon", body: "A check, a warning, a critical marker, each its own hue — severity no longer depends on colour perception." },
            { title: "Aligned column headers to their dots", body: "The Mild/Moderate/Severe labels now sit directly above what they describe." },
            { title: "Gated the CTA on input", body: "The button now reflects whether there is anything to log." },
            { title: "Surfaced the month view", body: "Week-only context made cross-month patterns invisible — in a product diagnosed by pattern, that was the wrong default." },
          ],
        },
        {
          title: "Library",
          body: "The original was a text list with six arbitrary pastel card backgrounds carrying no semantic meaning, half-cropped cards with no scroll affordance, and identical “For You” sections duplicated across both tabs.",
          bullets: [
            { title: "Replaced arbitrary pastels with a semantic tag system", body: "Pelvic Health, Mental Wellness, Mindfulness — colour now indicates category rather than decorating randomly." },
            { title: "Introduced content thumbnails", body: "Editorial imagery replaced icon-and-arrow rows, making the library scannable rather than readable." },
            { title: "Added explicit Previous/Next pagination", body: "In place of half-visible cards with no swipe affordance." },
            { title: "De-duplicated “For You”", body: "Into a single Recommendations block." },
          ],
        },
        {
          title: "The assessment flow",
          body: "The most consequential change isn't visible in any single screen. The original ran profile → consent checkbox → CTA → legal text.",
          bullets: [
            { title: "Reordered to disclosure → consent → gated CTA", body: "The reader sees what she's agreeing to before she's asked to agree to it." },
            { title: "Added a time estimate before the 17-step sequence", body: "The single highest-impact intervention available on multi-step completion rates, and one the original omitted entirely." },
          ],
        },
      ],
    },
    {
      heading: "Visual Identity",
      body: [
        "The palette wasn't ugly. It was non-semantic — and that distinction drove the entire visual system.",
        "Orange simultaneously meant “Ask the AI companion,” “skip this step,” “weight input,” and “exit.” Purple meant primary action, form-field label, and error state. Nine of the 82 findings traced back to this single root cause: users weren't learning one interface, they were relearning it on every screen.",
      ],
      blocks: [
        {
          title: "Colour, rebuilt as fixed roles",
          body: [
            "Primary — Violet — primary actions, brand, navigation, active states.",
            "AI companion — Amber — the companion, and only the companion, everywhere, exclusively.",
            "Ink — Neutral greys — form labels, body copy, informational status.",
            "Severity — a dedicated ramp — clinical states, always paired with an icon.",
            "Two rules followed: accent colour never appears on non-interactive elements (fixing two findings where brand violet on a form label and a life-stage status created false affordance cues), and clinical states never rely on colour alone (WCAG 1.4.1).",
          ],
        },
        {
          title: "Art direction",
          body: [
            "Menopause products tend to default to one of two registers: clinical sterility, or pastel euphemism that avoids naming what it's for. I chose neither — warm product photography of things a woman actually carries (a cooling spray, a handheld fan, a magnesium tablet), alongside portraits of women in the real age range in ordinary domestic moments. One woman stands in front of a fan with her eyes closed. That's a hot flash, photographed as a fact rather than a euphemism.",
            "The goal was recognition rather than aspiration. A user mid-symptom should see her own experience represented, not an idealised version of it — for a population that has spent years being told their symptoms are minor or imagined, being depicted accurately is itself a trust signal.",
          ],
        },
        {
          title: "Component system",
          body: [
            "Selection states with explicit unselected / hover / selected / disabled treatments, resolving the cards that read as locked.",
            "Severity indicators as colour + icon pairs across the full ramp.",
            "Card system at 8–12px radius, replacing an over-rounded pill radius that clipped content, on a consistent neutral background with a defined grid separating thumbnail, title and metadata.",
            "Touch targets at 44×44pt minimum throughout.",
          ],
        },
      ],
      slot: {
        label: "Brand imagery",
        text: "Product photography and lifestyle portraits — the art direction described above, unphotographed here.",
      },
    },
    {
      heading: "Impact",
      body: [
        "The result screen now presents a score a user can read without guessing, and can screenshot and bring to a clinician as something that carries meaning. The symptom history is grouped by clinical category with legible severity encoding, so a pattern across months is visible at a glance rather than reconstructed from a grid of near-identical dots. For a condition diagnosed by pattern, that's the product working as intended for the first time.",
      ],
      measures: [
        { label: "13 critical and major issues", body: "Resolved across 19 audited screens" },
        { label: "Consent flow", body: "Rebuilt to a defensible disclosure → consent → gated action sequence" },
        { label: "All clinical severity states", body: "Given icon or text redundancy (WCAG 1.4.1)" },
        { label: "Medical and legal copy", body: "Raised to 14pt minimum (WCAG 1.4.4)" },
        { label: "Touch targets", body: "Brought to the 44×44pt iOS HIG minimum" },
        { label: "Nine colour-semantics findings", body: "Resolved through a single systemic fix rather than nine patches" },
        { label: "Health score", body: "Made interpretable — label and stage replacing a bare number" },
      ],
      note: {
        label: "How I would validate this",
        body: "This is a measurement plan, not measured data. Primary metric: assessment start-to-complete rate, since every downstream feature depends on it. Supporting: drop-off by assessment step (isolating whether the new consent gate costs more than the removed friction saves), time-to-first-symptom-log, and 7- and 30-day logging retention. Qualitative: a five-task moderated benchmark against the original build, focused on score interpretation and symptom logging. Success: completion up 15% or more, with consent-stage abandonment no worse than baseline — if the consent gate costs more than 5% of starts, the fix is shortening the disclosure copy, not removing the gate.",
      },
    },
    {
      heading: "What I'd Do Differently",
      navLabel: "Reflection",
      body: [],
      findings: [
        {
          title: "Eighty-two findings was too many",
          body: "Twenty-five cosmetic items should have been logged as a backlog note rather than presented as findings. Including them at equal visual weight diluted attention from the two compliance failures that actually blocked launch — the opposite of what a severity system is supposed to achieve. Volume read as thoroughness to me and as noise to everyone else.",
        },
        {
          title: "This audit has no users in it",
          body: "Every finding came from expert inspection against frameworks — reliable for structural, accessibility and compliance failures, and weak precisely where this product's stakes are highest: emotional impact. My S4 rating on the hysterectomy copy is an inference about how a woman would feel reading it. I believe it's correct. I didn't verify it, and I should have — five moderated sessions with women aged 42–58 would have cost days and would likely have reordered my priorities.",
        },
        {
          title: "I audited from the outside",
          body: "The original team had constraints I couldn't see — technical debt, timelines, clinical review cycles, business decisions made for reasons that never reach the interface. Several findings I've framed as design failures may have been compromises someone argued hard against and lost. Where I've written “this is wrong,” the more accurate claim is “this likely causes X, and here's how I'd test it.”",
        },
        {
          title: "And the original got real things right",
          body: "The information architecture is sound — the five-tab structure maps cleanly to how a user actually moves between tracking, learning and consulting. The AI companion is genuinely well-conceived for a condition where users have questions at 3am they won't take to a GP. The assessment logic underneath is clinically serious. The failures I found were almost entirely in presentation and consent mechanics, sitting on top of a product whose thinking was largely right.",
        },
      ],
    },
  ],
};
