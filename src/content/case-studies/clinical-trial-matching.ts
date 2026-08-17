// Clinical trial matching — anonymised. A clinician-led health technology
// company; not named here, and neither are its founders, clinical sites or
// trial sponsors.
//
// Written from Mithradevi's own handwritten project notes (2023–2026) plus the
// company's public positioning.
//
// Order is progressive: each section only needs what came before it. The
// company, the product, the business it sits in, the domain behind it, the
// people, the problem, what was found, the requirements, the decisions, then
// what it produced. A reader can stop at any point and still have a complete,
// if shorter, picture.
//
// Decisions each name the alternative that was ruled out — that is the whole
// point of the form, and a decision without a rejected alternative is an
// assertion wearing a decision's clothes.
//
// `slot` blocks mark what still needs her own material. They render as visible
// placeholders rather than invented detail.
import type { CaseStudy } from "./types";

export const clinicalTrialMatching: CaseStudy = {
  slug: "clinical-trial-matching",
  role: "Sole designer — first on the product. Feature definition, IA, design system, prototyping, usability testing and design QA",
  timeline: "2023 – 2026",
  location: "Melbourne, Australia — clinician-led health technology company",
  scope: "60+ screens · 20+ core flows, from live matching through referral to status tracking",
  team: "Small product team of 5+, alongside the clinician founders and the practitioners running trials at the sites",
  skills: [
    "Human–AI Interaction",
    "Explainable AI Workflows",
    "Clinical Data Design",
    "Information Architecture",
    "Design Systems",
  ],
  nda: "Anonymised. The company, its founders, its clinical sites, its trial sponsors and its protocols are withheld, and no patient record, image or cohort appears anywhere on this page. What is described is my own design reasoning and the publicly known shape of the product category.",
  sections: [
    {
      heading: "The Company",
      body: [
        "A clinician-led health technology company founded in Melbourne. The premise is that the people who understand what clinical data means should be the ones building the tools that act on it — so the product was designed from inside clinical practice, rather than by a data team looking in at it.",
        "The company works where interoperability, medical imaging and clinical AI meet. It has since taken strategic investment from a global ophthalmic imaging manufacturer.",
      ],
    },
    {
      heading: "The Product",
      body: [
        "The platform brings electronic medical record data and retinal imaging into one place, evaluates each patient against the criteria of trials that are actively enrolling, and returns a ranked, explainable set of candidates — during the visit, rather than after it.",
        "It connects securely to the systems a practice already runs, delivering real-time insight without adding burden to the site, and ranks patients using detailed criterion-level evaluations so the most promising candidates come first.",
      ],
      image: {
        src: "/images/projects/clinical-trial-matching/imaging-visit.jpg",
        alt: "A clinician steadying a patient at a retinal imaging machine, the OCT scan appearing on the screen beside them.",
        width: 1250,
        height: 833,
      },
      imageLead: true,
      imageBare: true,
      gridRows: true,
      grid: [
        { title: "Data unification", body: "Records and imaging, held together without losing clinical context", icon: "records" },
        { title: "Protocol modules", body: "A trial's criteria configured as a unit, not hardcoded into a screen", icon: "protocol" },
        { title: "Criterion-level evaluation and ranking", body: "Each rule assessed individually, with evidence attached", icon: "criteria" },
        { title: "Image intelligence", body: "OCT, FAF and NIR read for the biomarkers a protocol names, not for a general impression", icon: "imaging" },
        { title: "Status through to enrolment", body: "A candidate carried from referral to enrolled, and kept for the next trial when this one does not fit", icon: "status" },
      ],
    },
    {
      heading: "How the Business Actually Works",
      body: [
        "A pharmaceutical company needs to run a clinical trial. Trials need patients, and patients are in clinics. The platform sits at that junction — and the candidates it produces are referred on to the CRO running the study.",
        "The chain: pharma sponsor → trial → platform → clinic/practice → patient → referral → CRO.",
      ],
      diagram: "matching-modes",
      diagramCaption:
        "Almost everything difficult on this project came from that second column. Retrospective matching tolerates a slow, dense interface — nobody is waiting. Live matching does not.",
    },
    {
      heading: "Learning the Domain",
      body: [
        "My first CTMS project, 2024. These were my notes as I tried to understand the workflows, people, terminology, and complexity behind clinical trial management.",
      ],
      images: [
        {
          src: "/images/projects/clinical-trial-matching/notes-1.jpg",
          alt: "Notebook page: clinical trials tested on small, medium and large groups of people; informed consent as a signed step covering purpose, procedure, benefits and risk; treatment group versus control group; randomisation to prevent bias; blinded trial with standard plus new drug against standard plus placebo.",
          width: 1400,
          height: 1867,
        },
        {
          src: "/images/projects/clinical-trial-matching/notes-2.jpg",
          alt: "Notebook page continuing the trial methodology notes.",
          width: 1400,
          height: 1867,
        },
        {
          src: "/images/projects/clinical-trial-matching/notes-3.jpg",
          alt: "Notebook page on placebo, single and double blinding, Institutional Review Boards and the four clinical trial phases.",
          width: 1400,
          height: 1867,
        },
        {
          src: "/images/projects/clinical-trial-matching/notes-4.jpg",
          alt: "Notebook page mapping the phases of a clinical trial from Phase 0 through Phase 4, with goals, group sizes and durations for each.",
          width: 1400,
          height: 1867,
        },
      ],
      imagesCols: 4,
      imagesBare: true,
      imagesSurface: true,
      imagesLabel: "My notes — understanding CTMS for the first time",
    },
    {
      heading: "Research",
      body: [],
      image: {
        src: "/images/projects/clinical-trial-matching/research-board.png",
        alt: "A board of collected reference material: a recruitment funnel from potential candidates through pre-screening, screening and randomisation; a patient enrolment journey map with process ownership and pain points; a screening and eConsent workflow diagram; an inclusion and exclusion decision tree; published papers on automated eligibility screening; and photographs of clinicians with patients at imaging equipment.",
        width: 1350,
        height: 884,
      },
    },
    {
      heading: "What I Learned",
      body: [
        "Live matching was already the company's differentiator when I arrived — that strategy was right. The bottleneck was the interface: the product could find the patient, and the human could not read the answer fast enough to use it.",
      ],
      accordion: {
        label: "What I found once people were actually reading these screens",
        bullets: [
          "Nothing could be scanned. The information was present and correct, and users still had to read it linearly to find anything. In a clinic, information you have to read is information you don't use.",
          "Priority was invisible. Users could not tell, at a glance, which patients or which criteria deserved attention first. Everything on screen carried the same weight, so the work of deciding what mattered fell entirely on the person.",
          "Complexity was being passed through, not resolved. The interface reflected the structure of the data rather than the structure of the decision.",
          "Live matching is made of edge cases. The happy path — patient in the chair, data complete, criteria resolving cleanly — is the rare one. Missing data, partial imaging and criteria that cannot be evaluated in the room are the normal case.",
          "The same data had to be visualised twice. Inclusion and exclusion are the same underlying evaluation, but a clinician reads them differently, and one flat checklist made neither readable.",
          "Recruitment status had nowhere to live. Referral is not the end — someone has to know where each patient sits between referred and enrolled.",
          "Trial openings and referred patients were separate questions with no separate answers. What can I recruit for, and who have I already sent, both required assembling by hand.",
        ],
      },
      image: {
        src: "/images/projects/clinical-trial-matching/findings.png",
        alt: "Seven illustrated panels: nothing could be scanned, priority was invisible, complexity passed through rather than resolved, live matching is made of edge cases, the same data visualised twice for inclusion and exclusion, recruitment status had nowhere to live, and trial openings and referred patients were separate.",
        width: 1480,
        height: 899,
        caption: "The seven findings, drawn out — the shape of the problem before any of it became screens.",
      },
    },
    {
      heading: "The Users",
      body: [
        "Three people use this, and they do not want the same thing from it.",
      ],
      voices: [
        {
          name: "Clinical Research Coordinator",
          context:
            "Runs recruitment across several trials; not a clinician. Checks protocol criteria by hand, per patient, per trial.",
          quote:
            "I'm checking the same eligibility criteria again and again, across different trials. I just need to know quickly whether this patient actually qualifies.",
        },
        {
          name: "Retina Specialist / Investigator",
          context:
            "Sees the patient; must justify any trial conversation. Has seconds; won't act on output they can't verify.",
          quote:
            "I can't spend five minutes trying to understand what the system wants me to confirm. If I'm going to discuss a trial with a patient, I need to trust why they're being considered.",
        },
        {
          name: "Site / Research Lead",
          context:
            "Accountable for enrolment targets. Can't see where candidates are being lost.",
          quote:
            "We have enrolment targets to hit, but I can't see where candidates are dropping off. I'm looking at the numbers without knowing what's actually happening underneath them.",
        },
      ],
      bullets: [
        "Downstream of all three: the CRO receives the referral and runs the study, and the pharmaceutical sponsor commissions the trial. Neither touches the interface, but both set what the site is accountable for.",
      ],
    },
    {
      heading: "The Problem",
      body: [
        "The problem was not simply finding eligible patients. It was making the eligibility decision possible within the constraints of a real clinic.",
      ],
      image: {
        src: "/images/projects/clinical-trial-matching/clinic-consult.jpg",
        alt: "A clinician at an OCT machine pointing to a retinal scan on the monitor while the patient sits opposite, waiting.",
        width: 1920,
        height: 1214,
      },
      imageLead: true,
      imageBare: true,
      grid: [
        { title: "Patient", body: "May qualify for a trial but never gets considered during the visit." },
        { title: "Clinician", body: "Has to interpret complex criteria across records, images, and protocol documents." },
        { title: "Coordinator", body: "Repeats the same eligibility checks across patients and multiple studies." },
        { title: "Sponsor", body: "Missed candidates translate into slower enrolment and longer study timelines." },
      ],
    },
    {
      heading: "Why Existing Approaches Fell Short",
      body: [
        "Each partial approach solves one half of the question and leaves the other half to a person.",
      ],
      grid: [
        { title: "Image-based matching", body: "Cannot see the patient's full clinical history." },
        { title: "Record-based matching", body: "Misses biomarkers and findings contained in images." },
        { title: "Static trial lists", body: "Surface possibilities, not actionable opportunities." },
        { title: "Generic matching", body: "Lacks protocol-specific context and creates false positives." },
      ],
    },
    {
      heading: "Defining the Design Challenge",
      body: [
        "How might we turn scattered records and retinal imaging into an answer a clinician can read while the patient is still in the room — without making them read everything to get it?",
      ],
      diagram: "design-constraints",
    },
    {
      heading: "What the Product Needed to Do",
      kicker: "Six requirements, one loop",
      body: [
        "Answer questions about the patient's disease. Let the physician match the person against inclusion and exclusion criteria. Communicate with the patient about whether they are eligible. Support the pre-inclusion process. Alert when a patient is recruited. Let the study coordinator update patient status.",
        "Not six features — one loop: understand the patient, check them against the criteria, tell the patient, act, keep the record current. The design job was making that loop survivable inside a clinic visit.",
      ],
      diagram: "eligibility-loop",
      diagramCaption:
        "Written as six requirements, but they only work as a cycle — and step 03 is the one that makes the other five hard.",
    },
    {
      heading: "Design Decisions",
      body: [],
      note: {
        label: "Under NDA",
        body: "Contact me for info.",
      },
    },
    {
      heading: "What I Optimised",
      body: [
        "The through-line across the work: the system already knew things, and the design job was making what it knew legible in the seconds available.",
      ],
      image: {
        src: "/images/projects/clinical-trial-matching/oct-viewer.jpg",
        alt: "A retinal imaging viewer: a cross-sectional OCT scan at the centre, thickness and deviation maps to the side, sector grids in red, green and yellow, and a measurements table of fovea minimum, central sector, area thickness and volume.",
        width: 1521,
        height: 954,
      },
      imageLead: true,
      measures: [
        { label: "Trial matching", body: "40% faster, through structured eligibility comparison" },
        { label: "Referral efficiency", body: "30% improved, through clearer referral workflows" },
        { label: "Scannability", body: "Eligibility, evidence and trial status surfaced by priority" },
        { label: "Verification", body: "Evidence and criteria brought closer to the decision point" },
        { label: "Multi-trial workflow", body: "Reduced context switching across trial interfaces" },
        {
          label: "Trial detail page",
          body: "Rebuilt around a header that orients rather than decorates",
        },
        {
          label: "Lists",
          body: "Answer the two standing questions: what can I recruit for, and who have I already referred",
        },
        {
          label: "Recruitment status",
          body: "Made visible and current instead of living in the gaps between people",
        },
        {
          label: "Inclusion versus exclusion",
          body: "Made distinguishable at a glance rather than by reading",
        },
      ],
    },
    {
      heading: "How we knew it worked",
      body: [
        "We evaluated the workflow through task-based sessions with clinicians and coordinators, think-aloud reviews, expert clinician feedback, and iterative prototype reviews. Where possible, we tested the experience against real clinical workflows rather than isolated screens.",
        "Success meant: a coordinator could move from patient context → eligibility assessment → patient communication without losing context, second-guessing the system, or needing to manually reconcile multiple sources.",
      ],
      diagram: "evaluation-matrix",
    },
    {
      heading: "Impact",
      body: [
        "Trial-matching time fell by 40% and referral efficiency improved by 30%, against a manual baseline where a coordinator read the protocol, opened the record, checked the image and decided — per patient, per trial.",
        "The platform is live in clinics, finding patients for actively enrolling trials.",
      ],
      stats: [
        { value: "40%", label: "Reduction in trial-matching time against the manual baseline" },
        { value: "30%", label: "Improvement in referral efficiency" },
      ],
    },
    {
      heading: "Reflection",
      body: [
        "What I would carry forward is that in clinical AI the interface is not where trust is won or lost. The states are — what the system is willing to admit it does not know changes the product more than any layout.",
      ],
    },
  ],
};
