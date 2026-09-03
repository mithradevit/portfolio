// Vault — digital evidence management. Written from Mithradevi's own IA notes,
// resume and process documentation (Aug 2026).
//
// Structure follows a decision-making narrative rather than a generic UX
// process template: Overview → Challenge → System → Research → Findings →
// Tensions → Principles → Reframe → Decisions → Cross-surface → AI & Trust →
// Design System → Validation → Impact → Reflection. The point is to show how
// the thinking moved, not to list deliverables in order.
//
// Entity and product names here are the anonymised set. Every interface is a
// reconstruction built to the product's own design tokens with invented data.
import type { CaseStudy } from "./types";

export const frontlineSafety: CaseStudy = {
  slug: "frontline-safety",
  // Centred grey-mat photo-essay presentation for this case study alone — see
  // CaseStudyFigure. Every other case study keeps the default bordered card.
  mattedImages: true,
  role: "Sole UX designer — end-to-end across mobile, web DEMS and device configuration",
  timeline: "May 2024 – May 2026",
  team: "Embedded with a 40+ person product & engineering org",
  skills: ["Enterprise UX", "Information Architecture", "AI-Assisted Workflows", "Cross-Platform Design Systems"],
  // Short on purpose. The long version listed everything being withheld, which
  // read as a disclaimer to get past rather than a fact. Two sentences: what
  // the constraint is, and what it means for what's on the page.
  nda: "This work is strictly confidential. Names, figures and real records are withheld — every screen here uses sample data.",
  // Same file the card on the home page uses. One image, one path — a second
  // copy would double the bytes and drift the moment either is re-exported.
  cover: {
    src: "/images/projects/frontline-safety-cover.webp",
    alt: "Cover artwork for the digital evidence ecosystem case study.",
    width: 1600,
    height: 900,
  },
  sections: [
    {
      heading: "Overview",
      // No fact cards. The header above already answers role, timeline, team
      // and skills; a second labelled column directly under it read as a
      // duplicate of the same furniture, and the NDA line it carried is
      // already stated in the banner.
      intro: {
        // No `**marked**` phrase: the reference sets this line as a plain
        // question with no accent rule under it.
        lead: "How do you design a cohesive evidence ecosystem from patrol car to courtroom?",
        columns: [
          {
            title: "System Architecture",
            body: "Mapping the complex flow of data across body-worn cameras, biometric kiosks, and cloud infrastructure.",
          },
          {
            title: "Web & Mobile UI",
            body: "Creating a comprehensive design system from the ground up to accelerate case creation and build resilient field features like real-time duress detection.",
          },
          {
            title: "Evidentiary Trust",
            body: "Ensuring every digital interaction maintains strict legal compliance, non-destructive editing, and an unbreakable chain of custody.",
          },
        ],
      },
      // One line between the question and the columns. The two paragraphs that
      // used to sit here — the shape of the system, and the reading done before
      // designing — moved out with the template: this section now states the
      // problem and the three strands, and the sections below do the telling.
      body: [
        "As the sole UX designer within a 40-person engineering team, my goal was to unify a complex public safety network into one secure, efficient platform.",
      ],
      diagram: "ecosystem",
    },
    {
      // Replaces "The Challenge". Same ground — evidence piling up faster than
      // anyone could account for it — but stated as the two problems users
      // actually reported, with the systemic reading underneath.
      heading: "Pain Points",
      intro: {
        columns: [
          {
            title: "1. Evidence is difficult to move",
            body: "Officers often need to return to the station to dock cameras, upload footage, and manually organise evidence.",
          },
          {
            title: "2. Evidence is difficult to manage",
            body: "As digital evidence grows, supervisors, investigators and legal teams struggle with fragmented systems, scattered files and manual workflows.",
          },
        ],
        image: {
          src: "/images/projects/frontline-safety/evidence-journey-today.webp",
          alt: "Five-panel sketch of the journey as it stood: an officer on duty capturing footage in the field, driving back to the police station, docking the camera and waiting on a 42% upload, then manually reviewing, categorising and tagging evidence at a desk, ending with a stack of case files ready for investigation.",
          width: 1735,
          height: 906,
        },
        insight:
          "The problem wasn't collecting more evidence — it was the friction created every time that evidence had to move from one person, system or stage of the justice process to another.",
      },
      body: [
        "From the moment footage is captured in the field to the moment it is presented in court, evidence passes through multiple people, platforms and processes. Each handoff introduces delay, manual work, and an opportunity for something critical to be lost.",
        "The commercial constraint made it harder: this is a product sold on evidentiary defensibility. Anything that made the workflow faster but the record weaker was not a trade the business could take.",
      ],
    },
    {
      heading: "Research",
      body: [
        "The assumed pain points and the real ones diverged sharply, which is why the fieldwork was not negotiable. Interviews ran across the full chain — officers, supervisors, investigators, evidence technicians, administrators, device-maintenance staff and judiciary users — because each of them inherits the previous role's shortcuts.",
        "Alongside primary research: support-ticket and product-feedback analysis, device telemetry review, stakeholder workshops with product, engineering and domain experts, and iterative design reviews through implementation.",
      ],
      // Prose runs full width; every artefact lives in the rail below it. The
      // board leads the rail because it is the whole working session at wall
      // scale and the three detail pages are what it resolves into.
      imagesScroll: true,
      images: [
        {
          src: "/images/projects/frontline-safety/working-notes-board.jpg",
          alt: "A large handwritten working board: flow sketches of an officer checking in at the office, pairing a body-worn camera to the phone app by QR code and Bluetooth, branches for cameras already registered versus not registered in the back end, duress-button notification states, Wi-Fi and hotspot fallbacks, upload paths from dock to server, and lists of features and open questions annotated in pink and orange highlighter.",
          width: 3000,
          height: 2250,
          caption: "The full working board — everything below is a page out of it.",
        },
        {
          src: "/images/projects/frontline-safety/working-notes-detail-1.jpg",
          alt: "Handwritten flow: an officer arrives at the office, logs in and checks in for the day, collects a body-worn camera and connects it to the phone app; branches cover Bluetooth permission states from 'not enabled' through to 'can't scan', cameras already registered versus not registered in the back end, and duress-button notifications in foreground, background and locked-screen states.",
          width: 3000,
          height: 2250,
          caption:
            "Mapped the camera check-out and pairing journey, including common failure scenarios such as Bluetooth being off, unregistered devices, and locked phones during emergencies.",
        },
        {
          src: "/images/projects/frontline-safety/working-notes-detail-2.jpg",
          alt: "Handwritten notes: a solution flow diagram listing check out the camera, check out as a button, and view all footage in phone; a feature list for storing files from camera to phone, viewing in a media player and uploading to cloud; and a boxed comparison of individual-user versus agency-level deployment with dock stations noted as costly.",
          width: 3000,
          height: 2250,
          caption:
            // Third bullet, second image: this page is the deployment sketch,
            // and the store/view/upload bullet belongs to the page that
            // actually works it out. Captions follow the artefact, not the
            // order they were written in.
            "Explored different deployment models, designing for both individual officers and large agencies managing hundreds of cameras and docking stations.",
        },
        {
          src: "/images/projects/frontline-safety/working-notes-detail-3.jpg",
          alt: "Handwritten notes: a camera about-page breakdown separating static information such as MAC ID and battery from dynamic session video data, with store, view and upload each marked restricted or unrestricted; beside it a sketch of the phone-to-camera-to-cloud path and a media hierarchy reading camera, then info, files and videos.",
          width: 3000,
          height: 2250,
          caption:
            "Defined how officers interact with footage, including storing, viewing, and uploading videos from the camera to the cloud.",
        },
      ],
    },
    {
      heading: "User Interviews",
      navLabel: "Interviews",
      body: [
        "Three roles inherit the same evidence in sequence, and each one describes a different failure. Their words set the brief for the surfaces that follow.",
      ],
      // All three at once: the argument is that three roles inherit the same
      // evidence and each describes a different failure, which can't be read
      // when the other two are hidden behind a timer.
      voicesStacked: true,
      voices: [
        {
          name: "Patrol officer",
          context: "The capture UX",
          quote:
            "In a critical moment, I can't check my phone to see if the camera is connected. I hit record and trust that it worked.",
        },
        {
          name: "Shift supervisor",
          context: "The triage UX",
          quote:
            "I'm managing cameras that won't sync while searching through hundreds of videos for the one thing that actually matters.",
        },
        {
          name: "Evidence technician",
          context: "The disclosure UX",
          quote:
            "Getting the video isn't enough. I need to prepare it for disclosure without breaking the chain of custody.",
        },
      ],
      image: {
        src: "/images/projects/frontline-safety/journey-map.webp",
        alt: "Journey map across six phases — check out and pair, capture in the field, upload and sync, organise evidence, review and manage cases, retain and audit. Each phase lists key actions, an emotion curve running between prepared, focused, relieved, in control, confident and assured at the top and frustrated, distracted, anxious, overwhelmed, uncertain and concerned at the bottom, the user's thoughts at that moment, and the opportunities each low point opens up.",
        width: 1839,
        height: 1214,
      },
    },
    {
      // The map is the section — no heading above a label saying the same
      // thing, and no paragraph introducing a list that introduces itself.
      heading: "Process & Deliverables",
      navLabel: "Process",
      body: [],
      processLabel: "Six stages, and what each one left behind",
      process: [
        {
          icon: "discover",
          title: "Discover",
          body: "Understand the ecosystem, its users and where the work actually breaks.",
          deliverables: ["Research synthesis", "Stakeholder maps", "Journey maps"],
        },
        {
          icon: "define",
          title: "Define",
          body: "Frame the right problems and the opportunities worth taking.",
          deliverables: ["Problem statements", "Opportunity areas", "Design principles"],
        },
        {
          icon: "architect",
          title: "Architect",
          body: "Design the structure and the flows that make the system work.",
          deliverables: ["Information architecture", "User flows", "Wireframes"],
        },
        {
          icon: "validate",
          title: "Validate",
          body: "Prototype early and test often, with the people who do the job.",
          deliverables: ["Clickable prototypes", "Usability findings", "Iteration notes"],
        },
        {
          icon: "systemise",
          title: "Systemise",
          body: "Build a design system that holds consistency as the product grows.",
          deliverables: ["Design system", "Component library", "Documentation"],
        },
        {
          icon: "handoff",
          title: "Handoff",
          body: "Give engineering everything it needs to build without guessing.",
          deliverables: ["Handoff specs", "Annotations", "Assets & guides"],
        },
      ],
    },
    {
      heading: "What I Found",
      navLabel: "Insights",
      body: [
        "Five findings did most of the work in reshaping the product. None of them were what the team expected going in.",
      ],
      image: {
        src: "/images/projects/frontline-safety/findings.webp",
        alt: "A findings board. The lead panel reads 'Documenting video was harder than capturing it' beside an officer at a patrol car and an incident form warning that recall is fading and detail is missing. Four numbered panels follow: end-of-day offload, showing a kiosk upload in progress over a risk window of loss, damage and delay; device faults handled alone, showing a camera error with restart, check connection and call supervisor as the only options; supervisors inheriting what officers did not do, showing 127 incomplete submissions with missing field counts; and no shared definition of handled, showing three supervisors on one file — reviewed, in review, and never opened.",
        width: 1536,
        height: 1024,
        caption:
          "The five findings as they were presented back to the team — each one paired with the screen or moment it came from.",
      },
      findings: [
        {
          title: "Documenting video was harder than capturing it.",
          body: "Officers captured willingly and often — describing footage accurately afterwards was the actual bottleneck, and it happened at the exact moment users had the least recall and the least patience for typing.",
        },
        {
          title: "End-of-day offload meant footage sat on a device for a full shift.",
          body: "That is a window of risk for loss, damage and delay, and it existed purely because the kiosk was the only route off the device.",
        },
        {
          title: "Device faults in the field were handled alone.",
          body: "No one to ask, no obvious next step, and an escalation path that ran through a phone call to the supervisor.",
        },
        {
          title: "Supervisors inherited whatever officers did not do.",
          body: "Every skipped metadata field became somebody else's backlog, which meant the desk experience was largely a consequence of the field experience.",
        },
        {
          title: "There was no shared definition of handled.",
          body: "Two supervisors could review the same file while a third was missed entirely, because status lived in people's heads rather than in the system.",
        },
      ],
    },
    {
      heading: "The Design Tensions",
      navLabel: "Design Decisions",
      body: [
        "The interesting decisions on this product were not usability problems with a correct answer. They were tensions where both sides were legitimate, and the job was to decide which one won in which context — and to be able to say why.",
      ],
      grid: [
        { title: "Speed vs. accountability", body: "Efficiency rewards removing steps; evidentiary integrity demands visibility. Resolved by simplifying how people interact with controls rather than removing the controls, and never letting auditability live only in the backend." },
        { title: "Field use vs. desk use", body: "Seconds and split attention against hours and dense information. Resolved by refusing a single average-user experience: same object model, deliberately different posture per surface." },
        { title: "Automation vs. human judgment", body: "AI could remove the documentation load, but the model probably got it right is not acceptable for evidence. Resolved by automating the work around the decision, never the decision." },
        { title: "Hardware dependency vs. mobility", body: "The kiosk guaranteed a controlled chain of custody; the phone was already in the officer's hand. Resolved by making the kiosk optional rather than removing it, wherever the workflow did not genuinely need it." },
        { title: "Simplicity vs. system complexity", body: "Most users were not tech-savvy and used the product briefly, daily, under pressure — but the domain is genuinely complex. Resolved with hierarchy and progressive disclosure, so complexity stayed available but never led." },
      ],
    },
    {
      heading: "Design Principles",
      navLabel: "Principles",
      body: [
        "Nine rules, authored early and applied in order of precedence whenever two of them conflicted. Writing them down was what let me defend a decision to engineering months later without relitigating it from scratch.",
      ],
      grid: [
        { title: "Design for the widest end of the spectrum", body: "Critical workflows built around the least confident user without slowing down experienced ones. If someone unfamiliar could not finish a task unaided, that was a design defect, not a training problem." },
        { title: "Trust is a feature", body: "Ownership, status, history and consequential actions stay visible inside the workflow itself, not buried in an audit table someone has to go looking for." },
        { title: "The field and the desk are different worlds", body: "Field: one clear action, minimal reading, immediate feedback. Desk: context, density, filtering, control." },
        { title: "Safety is something the product can influence", body: "Officers depend on this system in unpredictable environments, so a technical failure becomes an operational risk. A lost GPS signal is an alert someone must investigate, not a line in a log." },
        { title: "Remove hardware dependencies that do not add value", body: "The kiosk forced officers back to a station to offload footage — a hardware constraint expressed as a UX problem. Push transfer to the device already in their hand." },
        { title: "Three steps, then it should just work", body: "Setup and recovery usually happen beyond the support team's reach, so recovery is a designed experience: common flows within three clear steps, in user language, before any support dependency." },
        { title: "Let AI do the documentation, keep judgment with the human", body: "AI prepares, organises and surfaces. Consequential decisions stay with the person, and the system never implies more certainty than it has." },
        { title: "Design for the device that exists", body: "More functionality means more battery drain, and a camera that dies mid-shift is a product failure regardless of interface quality. Battery, connectivity and storage were evaluated per feature from the start." },
        { title: "Go to the field before drawing the screen", body: "Assuming was always faster than observing, and always more expensive. What users did in the field consistently outranked what the team assumed in a workshop." },
      ],
    },
    {
      heading: "Reframing the Problem",
      navLabel: "Reframing",
      body: [
        "The brief I was handed was make the review interface better. The finding that changed the product was that the review interface was inheriting a problem created two steps upstream — so the highest-leverage change to the desk experience happened outside the desk experience entirely.",
        "If metadata is captured in the field, at or near the moment of recording, the supervisor never inherits the debt for it. That single reframe moved the supervisor's job from authoring metadata to verifying it, and pulled upload forward out of the end-of-shift window at the same time.",
      ],
      diagram: "flow",
      diagramCaption:
        "The same lifecycle, redistributed. Documentation moves to the moment of capture where recall is highest, AI handles the transcription and tagging pass, and the supervisor arrives to verify rather than to write.",
    },
    {
      heading: "The Solution: A Trust-First Ecosystem",
      navLabel: "The Solution",
      body: [
        "The ecosystem was redesigned to automate data tagging in the field, surface critical anomalies at the desk, and lock down the chain of custody for the courtroom.",
      ],
      // TODO(Mithra): each step's left column is a marked placeholder until you
      // send the artefact for it. Drop the files into
      // public/images/projects/frontline-safety/ and add an `image` to the step.
      steps: [
        {
          title: "Zero-Friction Capture (Mobile & Hardware)",
          body: "Officers under adrenaline cannot navigate complex UI. The capture experience was rebuilt for the worst-case scenario.",
          bullets: [
            {
              title: "Resilient duress flows",
              body: "Engineered the mobile app to bypass locked screens and OS battery-savers, so a hardware duress press pings dispatch instantly, even in low-connectivity zones.",
            },
            {
              title: "Automated cruisers",
              body: "Integrated Computer-Aided Dispatch (CAD) metadata directly into the capture sequence, eliminating manual typing in the vehicle.",
            },
            {
              title: "Biometric handoffs",
              body: "Replaced manual check-ins with one-tap palm-vein authentication at the kiosk, with visual LED feedback when a body-worn camera is paired and ready.",
            },
          ],
        },
        {
          title: "Triage Over Chronology (Web Dashboard)",
          body: "Supervisors no longer scroll through 500 routine traffic stops to find one critical incident.",
          bullets: [
            {
              title: "Exception-based routing",
              body: "The dashboard prioritises files by missing metadata, impending retention deletion, or flagged hardware anomalies — a camera that failed to upload, for instance.",
            },
            {
              title: "Automated ingestion",
              body: "Docking a camera offloads the footage, clears local device storage to prevent mid-shift storage failure, and routes the data to the correct case file.",
            },
          ],
        },
        {
          title: "The Secure Workspace (Investigation & Disclosure)",
          body: "Speed is irrelevant if the evidence is thrown out of court.",
          bullets: [
            {
              title: "Cases as containers",
              body: "Instead of downloading and exporting via USB or FTP, evidence is bundled into secure, shareable containers governed by strict backend permissions.",
            },
            {
              title: "Non-destructive redaction",
              body: "A layered video workspace: blurring a bystander's face applies a visual mask, and the interface says plainly that the original raw file stays locked and untouched.",
            },
            {
              title: "Immutable audit trails",
              body: "Every view, tag and redaction is logged to an un-editable ledger, turning a messy workflow into a court-defensible document.",
            },
          ],
        },
      ],
    },
    {
      heading: "Designing Across the Ecosystem",
      navLabel: "Ecosystem",
      body: [
        "The surfaces are not three versions of the same app. The mobile app exists to close the gap between capture and documentation; the kiosk exists to guarantee a controlled handover; the console exists to make sense of everything after the fact.",
        "What holds them together is the object model, not the layout. A session created on a device, described on a phone, edited on the console and shared into a case is one record moving through four contexts — and the design work was mostly about making each handoff survivable.",
      ],
      image: {
        src: "/images/projects/frontline-safety/live.webp",
        alt: "Watch live: a streaming player with a LIVE badge, the officer and location, removable Incident and Evidence tags, a team notes thread, and a rail of currently streaming cameras.",
        width: 1280,
        height: 1026,
        caption: "Watch live — tagging happens during the incident, not after it.",
      },
      diagram: "user-flows",
      diagramCaption:
        "Five flows carry almost all real usage. Each one crosses at least two surfaces, which is why cross-surface blueprints mattered more here than any single screen.",
    },
    {
      heading: "AI & Trust",
      body: [
        "Transcription turned scrub for ten minutes into a query. Transcript lines are navigational — selecting one moves the playhead — so finding the moment a suspect mentions a vehicle stopped meaning real-time scrubbing.",
        "The trust design matters more than the capability. Automated output is framed as assistive, not authoritative: it carries a visible caveat to check against the audio before evidentiary use, it is labelled as auto-generated at the point of reading, and it never enters the record as fact. AI prepares, organises and surfaces; the human decides.",
      ],
      image: {
        src: "/images/projects/frontline-safety/transcript.webp",
        alt: "The Transcript tab: a Find a word search, a caveat telling the reader to check it against the audio, and speaker-labelled lines with timestamps.",
        width: 1280,
        height: 1033,
        caption: "The shipped Transcript tab.",
      },
      mockup: "transcript",
      annotations: [
        { title: "The caveat sits above the results", body: "Not in a tooltip and not in a help page. It is the first thing read, because by the time someone is scanning lines they have already started trusting them." },
        { title: "Auto-generated is a persistent badge", body: "It travels with the transcript into export and download, so provenance is not lost the moment the content leaves the screen." },
        { title: "Speaker diarization without named attribution", body: "Speaker 1 and Speaker 2 rather than guessed identities — the system does not assert something it cannot verify." },
        { title: "Matches are highlighted, not filtered to", body: "Surrounding dialogue stays visible, because a match without context is exactly how a transcript gets misread." },
      ],
    },
    {
      heading: "Building the System",
      navLabel: "Build",
      body: [
        "With one designer and 40+ engineers, consistency could not depend on me reviewing every screen. It had to be structural: a small set of components that appear everywhere, with their states and interaction specs defined once.",
        "The reused patterns did most of the governance work. The tabbed detail shell, the search and date-range bar, the status chip, the notes-with-history block, the vertical audit timeline and the map component each appear on multiple surfaces with identical behaviour — which is also why a new feature could usually be specified as a composition of existing parts rather than a new design.",
      ],
      diagram: "data-model",
      diagramCaption:
        "Every screen in either front-end resolves to one of these objects. Designing against the data model rather than the page list is what kept two apps coherent with one designer.",
      // The embedded live design-system document was removed; the plates below
      // are the same system as flat exports, which read at a glance instead of
      // asking the reader to scroll a 6800px page inside a frame.
      imagesScroll: true,
      imagesRailHeight: 400,
      images: [
        {
          src: "/images/projects/frontline-safety/ds-01-colour.webp",
          alt: "01 Colour — token groups for surface and ink, the accent set, and five semantic hues, each swatch labelled with its variable name and hex value.",
          width: 1236,
          height: 776,
        },
        {
          src: "/images/projects/frontline-safety/ds-02-type-spacing.webp",
          alt: "02 Type, spacing, radius and shadow — the typographic scale from h1 to mono with size, weight and tracking; a 4px spacing grid from 4 to 40px; five radius steps; three shadow elevations; and the single easing curve used for motion.",
          width: 1236,
          height: 1052,
        },
        {
          src: "/images/projects/frontline-safety/ds-03-icons.webp",
          alt: "03 Icons — the construction spec (24x24 viewBox, stroke 1.8–2, round joins, 17px nav and 14px inline sizes) beside the navigation and action set used in product.",
          width: 1236,
          height: 439,
        },
        {
          src: "/images/projects/frontline-safety/ds-04-atoms.webp",
          alt: "04 Atoms — button variants with padding, radius and font specs; text field and search with focus-ring rules; tags and badges; checkbox and switch; avatars.",
          width: 1236,
          height: 600,
        },
        {
          src: "/images/projects/frontline-safety/ds-05-molecules.webp",
          alt: "05 Molecules — atoms composed into stat tiles, ranked bars, tabs, an alert row with a severity stripe and fix action, and a list row with thumbnail, title and actions.",
          width: 1236,
          height: 530,
        },
      ],
    },
    {
      heading: "Validation & Iteration",
      navLabel: "Validation",
      body: [
        "Usability sessions ran monthly, after every sprint, across all three surfaces — which meant findings landed while the work was still cheap to change rather than at the end of a release.",
        "The corrections were as instructive as the confirmations. The first status vocabulary had five states, and testing showed two of them were interpreted inconsistently by different supervisors, so it collapsed to a smaller mutually exclusive set. An early version of the editor put treatments in a side panel; observation showed operators lost track of what they had applied, which is why treatments moved onto the timeline as labelled regions. Terminology testing killed most of the internal jargon — language written for engineers was being read by operators with no technical background.",
      ],
    },
    {
      heading: "Impact",
      body: [
        "Evidence-management efficiency improved by 45%, with case creation measurably accelerated — mostly a second-order effect of moving documentation upstream and giving the queue an explicit shared vocabulary.",
        "The reporting surface closed the loop for the organisation: storage and bandwidth trends became something an administrator could see and plan against rather than discover at procurement time.",
      ],
      stats: [
        { value: "45%", label: "Improvement in evidence-management efficiency, with accelerated case creation" },
        { value: "3", label: "Surfaces kept consistent through shared components rather than per-screen review" },
        { value: "9", label: "Design principles authored and applied in order of precedence across two years" },
      ],
      image: {
        src: "/images/projects/frontline-safety/storage.webp",
        alt: "Storage: tiles for stored, streamed, deleted on schedule and kept as evidence, a streamed-versus-stored line chart by month, and a table with month-on-month change.",
        width: 1280,
        height: 1291,
        caption: "The shipped Storage screen.",
      },
      mockup: "usage",
      mockupCaption:
        "Storage growth had no owner before this. Making it visible, with a year-on-year delta and a per-month breakdown, turned an invisible cost into a managed one.",
    },
    {
      heading: "Reflection",
      body: [
        "The recurring move across almost every decision here was the same: not make this step nicer, but does this step need to happen at this moment at all — and can it happen earlier, automatically, or not at all. That question is harder to ask on an enterprise product already in flight, and it was worth asking every time.",
        "What I would carry into the next mission-critical system is the discipline of writing the principles down before the pressure arrives. The decisions that held up over two years were the ones I could trace back to a rule I had already committed to; the ones I had to defend from scratch every time were the ones I had never articulated.",
        "The other thing I would carry is a lower tolerance for designing an average user. This product had judiciary users and cleaning-service operators reading the same screen, and every time I tried to serve the midpoint between them I served neither. Naming the two postures explicitly, and letting them diverge, was the decision that made the rest of the system possible.",
      ],
    },
  ],
};
