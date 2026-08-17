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
  role: "Sole UX designer — end-to-end across mobile, web DEMS and device configuration",
  timeline: "May 2024 – May 2026",
  team: "Embedded with a 40+ person product & engineering org",
  skills: ["Enterprise UX", "Information Architecture", "AI-Assisted Workflows", "Cross-Platform Design Systems"],
  nda: "Covered by an NDA with an Australian state police force. The force, its commands and districts, deployment scale and all commercial figures are withheld, and product and entity names are anonymised. The screens below are shown with invented sample data, and each is paired with a simplified schematic isolating the pattern it demonstrates — no real recording, case, exhibit, device or sworn-officer record appears anywhere on this page.",
  sections: [
    {
      heading: "Overview",
      body: [
        "I started working on this project in March 2024.",
        "This wasn't a single product. It was a connected system of hardware and software — body-worn cameras, in-car cameras, 4G cameras, a kiosk with a palm-vein scanner, mobile applications, and the web-based evidence platform. These systems had to work across hardware-to-software and hardware-to-hardware integrations, while supporting different roles, permissions, and operational workflows.",
        "Before designing anything, I spent hours going through user guides, technical documentation, role and responsibility documents, existing workflows, and system behaviours to understand how everything connected.",
      ],
      image: {
        src: "/images/projects/frontline-safety/evidence-story.webp",
        alt: "Sketch strip: cameras, phones and patrol cars feed a box overflowing with video files, which overwhelms one person, then reaches a supervisor at a desk surrounded by questions, weighed on a scale between speed and safeguarding, ending in a certified document.",
        width: 1800,
        height: 352,
        caption:
          "The whole problem in one line: everything captured lands somewhere, and one person has to turn that pile into something a court will accept. Every decision in this case study sits between the box and the certificate.",
      },
      diagram: "ecosystem",
    },
    {
      heading: "The Challenge",
      body: [
        "Evidence was arriving faster than anyone could account for it. Hundreds of recordings a day landed in a single undifferentiated list, most of them never needed as evidence — but the ones that mattered were buried in the same feed as routine patrol footage, sorted by nothing more useful than recency.",
        "The people responsible for that record were also, in practice, the fleet manager and the helpdesk. A supervisor had to know what existed, whether it was intact, who touched it, who could see it, what had been disclosed and what had to be destroyed — while also fielding calls about a camera that would not turn on.",
        "The commercial constraint made it harder: this is a product sold on evidentiary defensibility. Anything that made the workflow faster but the record weaker was not a trade the business could take.",
      ],
      stats: [
        { value: "2", label: "Distinct front-ends sharing one backend data model, both of which I owned" },
        { value: "3", label: "Surfaces — web console, mobile field app, kiosk dock software" },
        { value: "1", label: "Designer, embedded across a 40+ person product and engineering organisation" },
      ],
    },
    {
      heading: "Research",
      body: [
        "The assumed pain points and the real ones diverged sharply, which is why the fieldwork was not negotiable. Interviews ran across the full chain — officers, supervisors, investigators, evidence technicians, administrators, device-maintenance staff and judiciary users — because each of them inherits the previous role's shortcuts.",
        "Alongside primary research: support-ticket and product-feedback analysis, device telemetry review, stakeholder workshops with product, engineering and domain experts, and iterative design reviews through implementation.",
      ],
    },
    {
      heading: "What I Did",
      body: [
        "The fieldwork and the deliverables it produced — what the research actually consisted of, and where the work landed once it was synthesised.",
      ],
      stats: [
        // TODO(Mithra): this was 12+ and you changed it to 5+. Lowering a
        // research number is unusual enough to be worth a second look —
        // confirm it, or tell me what the 5+ was meant to count.
        { value: "5+", label: "Contextual interviews across every role in the evidence chain, including judiciary users" },
        { value: "8+", label: "Workflow observations and ride-alongs across capture, transfer and review" },
        { value: "15+", label: "Usability sessions across web, mobile and kiosk — run monthly, after every sprint" },
      ],
      diagram: "artefacts",
      diagramCaption:
        "Twenty-eight artefacts, and the distribution is the point: more than a third sit in Flows & IA. This was an architecture problem before it was a screen problem, and the deliverables show it.",
    },
    {
      heading: "What I Found",
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
      body: [
        "The brief I was handed was make the review interface better. The finding that changed the product was that the review interface was inheriting a problem created two steps upstream — so the highest-leverage change to the desk experience happened outside the desk experience entirely.",
        "If metadata is captured in the field, at or near the moment of recording, the supervisor never inherits the debt for it. That single reframe moved the supervisor's job from authoring metadata to verifying it, and pulled upload forward out of the end-of-shift window at the same time.",
      ],
      diagram: "flow",
      diagramCaption:
        "The same lifecycle, redistributed. Documentation moves to the moment of capture where recall is highest, AI handles the transcription and tagging pass, and the supervisor arrives to verify rather than to write.",
    },
    {
      heading: "Decision 01 · Triage Before Chronology",
      body: [
        "The old entry point answered what happened. The redesign answers what needs you. Sessions open on work queues — uncategorized, aging, approaching a deadline — instead of a reverse-chronological feed where a flagged incident from Tuesday sits below routine patrol from this morning.",
        "The alternative considered was a smarter sort on the existing list. I rejected it because sorting still requires the supervisor to interpret; a queue with an explicit shared vocabulary answers the question by structure instead.",
      ],
      image: {
        src: "/images/projects/frontline-safety/triage.webp",
        alt: "Vault Recordings list: status tabs across the top, a filter row, then rows showing recording name, time, camera and officer, a status pill and clip count.",
        width: 1280,
        height: 974,
        caption: "The shipped Recordings screen.",
      },
      mockup: "sessions",
      annotations: [
        { title: "Status became a fixed vocabulary", body: "Uncategorized → Categorized → Evidence, mutually exclusive, always in the same column position. Scannable peripherally without reading the label." },
        { title: "Counts derive from the same query as the list", body: "The number a supervisor acts on and the list they open can never disagree, because there is only one source." },
        { title: "Selection uses the accent fill, not just a tick", body: "The target of a bulk action is unmissable — bulk operations on evidence are exactly where a wrong selection is expensive." },
        { title: "Device identity travels with every row", body: "Serial and MAC sit under the session ID, so attribution survives sorting, filtering and export without a drill-in." },
      ],
      mockupCaption:
        "Every queue tile is a filter rather than a statistic, and the query lives in the URL so a supervisor can share or return to exactly the view they were working from.",
    },
    {
      heading: "Decision 02 · One Detail Pattern, Reused Everywhere",
      body: [
        "Rather than designing a bespoke screen per object, I built one detail pattern — a horizontal tab bar over a two-column layout, main content beside a related-items rail — and reused it for Sessions and Cases alike.",
        "This is the decision with the most downstream leverage in the whole project. It meant a user who learned the session screen already knew the case screen, and it meant engineering built the shell once.",
      ],
      image: {
        src: "/images/projects/frontline-safety/detail-pattern.webp",
        alt: "Vault recording detail: player and editing timeline on the left, a Details, Transcript and History tab set on the right holding name, status, case and incident fields plus earlier notes.",
        width: 1280,
        height: 1033,
        caption: "The shipped recording detail.",
      },
      mockup: "session-tabs",
      annotations: [
        { title: "Four tabs, ordered by frequency of use", body: "File information first because it is the daily job; audit trail last because it is consulted, not edited." },
        { title: "The rail keeps siblings in reach", body: "Child files and adjacent sessions stay visible, so moving between related media never costs a round-trip back to the list." },
        { title: "Category is the only required field", body: "Marked inline with the accent border. Everything else can wait; the one field that unblocks the rest of the workflow cannot." },
        { title: "Identity strip is always above the tabs", body: "Owner, status and incident flag persist across every tab, so context never disappears when the user switches task." },
      ],
    },
    {
      heading: "Decision 03 · The Original Is Never Modified",
      body: [
        "The highest-stakes surface in the product, governed by one rule. Redaction, beeping, clipping and annotation all operate on a selection and produce a new derived file — the source is untouched, always.",
        "Derived files are first-class records with their own identifier and a visible link back to the parent, and every save writes an audit entry describing the range and the treatments applied. The destructive path does not exist rather than being discouraged.",
      ],
      image: {
        src: "/images/projects/frontline-safety/editor.webp",
        alt: "The editing timeline: selection range readout, scrubber with waveform, Blur faces, Mute sound and Add a note controls, the line stating the original is never changed, and the resulting clips below.",
        width: 652,
        height: 470,
        caption: "The shipped editor, cropped to the timeline and its clips.",
      },
      mockup: "editor",
      annotations: [
        { title: "Treatments are labelled regions on the timeline", body: "Not hidden in a settings panel — a reviewer can see what was done at a glance and remove any of it individually." },
        { title: "The unselected range is dimmed, not cropped", body: "The full recording stays visible while the selection is being made, so the operator never loses the surrounding context." },
        { title: "Audio waveform sits under the video track", body: "Beep redaction targets speech, so the operator needs to see audio to place a treatment accurately." },
        { title: "The safety guarantee is stated in the tool belt", body: "Written where the destructive-looking action lives, not in a help page — the moment of hesitation is the moment to answer it." },
      ],
    },
    {
      heading: "Decision 04 · Custody Moved Into the Interface",
      body: [
        "Chain of custody existed in the database but not on screen, which meant answering who touched this required an administrator and a support ticket. Moving it into the primary interface, in plain language, made supervisors self-sufficient on the question the product exists to answer.",
        "Edits, status changes, case additions, exports and shares all append to the same record — including system events like ingest and integrity verification — so one narrative covers the file's whole life rather than three partial ones.",
      ],
      image: {
        src: "/images/projects/frontline-safety/custody.webp",
        alt: "The History tab: a permanent record listing who recorded, uploaded, changed status, blurred faces and added the file to a case, each with a timestamp.",
        width: 1280,
        height: 1033,
        caption: "The shipped History tab.",
      },
      mockup: "audit",
      mockupCaption:
        "The same vertical-timeline component serves the session audit trail and the case chain of custody. Accent dots mark the current user's own actions; system and third-party events stay neutral.",
    },
    {
      heading: "Decision 05 · Cases as Containers, Not Exports",
      body: [
        "Sharing outside the organisation used to mean an export and an email attachment, at which point control was gone and there was no record of what left, to whom, or for how long.",
        "Cases became containers that gather sessions, derived clips and attachments into one reviewable unit. Sharing operates on the case with explicit named recipients, access is revocable, and revocation is treated as consequential enough to require confirmation. Every sharing event appends to the same custody record as everything else.",
      ],
      image: {
        src: "/images/projects/frontline-safety/sharing.webp",
        alt: "Case sharing: a table of who can see the case, what each recipient can do — view and download, view only, blurred copy only — and an expiry date, with Remove on every row.",
        width: 1050,
        height: 560,
        caption: "The shipped sharing controls, where revocability and blurred-copy access are explicit.",
      },
      mockup: "case-file",
      mockupCaption:
        "Add to case is the funnel from raw media to curated evidence, and it is the same primary action on the sessions list and the session detail — one path, repeated wherever the user might decide.",
    },
    {
      heading: "Designing Across the Ecosystem",
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
      body: [
        "With one designer and 40+ engineers, consistency could not depend on me reviewing every screen. It had to be structural: a small set of components that appear everywhere, with their states and interaction specs defined once.",
        "The reused patterns did most of the governance work. The tabbed detail shell, the search and date-range bar, the status chip, the notes-with-history block, the vertical audit timeline and the map component each appear on multiple surfaces with identical behaviour — which is also why a new feature could usually be specified as a composition of existing parts rather than a new design.",
      ],
      diagram: "data-model",
      diagramCaption:
        "Every screen in either front-end resolves to one of these objects. Designing against the data model rather than the page list is what kept two apps coherent with one designer.",
    },
    {
      heading: "Validation & Iteration",
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
