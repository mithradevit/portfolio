import { ArrowRight } from "lucide-react";
import type { CaseStudyDiagram, CaseStudyMockup } from "@/content/case-studies/types";
import { trialDiagrams } from "./TrialDiagrams";
import { collarDiagrams } from "./CollarDiagrams";

/**
 * Recreations of Vault's key surfaces, rebuilt in React against the product's
 * own design tokens (not the portfolio's) so they read as "the product," not
 * "the portfolio talking about the product."
 *
 * Always light: the real product ships both themes, but a case study that
 * flips dark/light per screen reads as inconsistent, so every surface here is
 * pinned to the product's light palette regardless of the site's own toggle.
 *
 * All data is invented. No real session, case, device or personnel record
 * appears in any of these.
 */
const c = {
  /* iOS system palette (light). Grouped-background grey behind white inset
     cards, hairline separators instead of borders, and translucent system
     fills for pills — the surface language is Apple's, so these read as
     native app screens rather than web cards.

     The one deliberate departure is `accent`: iOS would use systemOrange
     (#FF9500), but this stays the product's own brand orange, which is also
     the portfolio's primary. Everything structural is iOS; the brand is not. */
  bg: "#F2F2F7", // systemGroupedBackground
  card: "#FFFFFF", // secondarySystemGroupedBackground
  card2: "#F9F9FB", // header strip
  card3: "#E9E9EB", // tertiarySystemFill — pills, tracks
  ink: "#000000", // label
  ink2: "#6C6C70", // secondaryLabel
  ink3: "#8E8E93", // systemGray
  ink4: "#AEAEB2", // systemGray2
  line: "#E5E5EA", // systemGray5 — hairline separator
  line2: "#D1D1D6", // systemGray4
  accent: "#F4600B",
  accentBg: "#FEF0E6",
  green: "#34C759", // systemGreen
  greenBg: "#E4F7E9",
  amber: "#FF9500", // systemOrange
  amberBg: "#FFF1DF",
  red: "#FF3B30", // systemRed
  redBg: "#FFE9E8",
  blue: "#007AFF", // systemBlue
  blueBg: "#E5F1FF",
  purple: "#AF52DE", // systemPurple
};

/** SF first — the whole point of an iOS surface is that it is set in SF. */
const IOS_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", system-ui, sans-serif';

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden rounded-[16px] shadow-[0_1px_3px_rgb(0_0_0_/_6%)]"
      style={{ background: c.bg, fontFamily: IOS_FONT }}
    >
      {/* iOS grouped-list header: uppercase footnote in systemGray, sitting on
          the grouped background rather than in a chrome bar of its own. */}
      <div className="flex items-center gap-2 px-4 pt-3.5 pb-2.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.accent }} />
        <span className="text-[10.5px] font-semibold tracking-[0.04em] uppercase" style={{ color: c.ink3 }}>
          {label}
        </span>
      </div>
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">{children}</div>
    </div>
  );
}

type Tone = "red" | "amber" | "green" | "blue" | "neutral";
const TONES: Record<Tone, { bg: string; fg: string }> = {
  red: { bg: c.redBg, fg: c.red },
  amber: { bg: c.amberBg, fg: c.amber },
  green: { bg: c.greenBg, fg: c.green },
  blue: { bg: c.blueBg, fg: c.blue },
  neutral: { bg: c.card3, fg: c.ink3 },
};

function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  const t = TONES[tone];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap"
      style={{ background: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
}

/** The search + date-range + filter bar reused across Sessions, Streaming and Devices. */
function SearchBar() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span
        className="min-w-0 flex-1 truncate rounded-[10px] border px-3 py-1.5 text-[11.5px]"
        style={{ borderColor: c.line, background: c.card, color: c.ink4 }}
      >
        Search by Session ID, date range, incident, last modified
      </span>
      {["From date", "To date", "All filters"].map((f) => (
        <span
          key={f}
          className="rounded-[10px] border px-2.5 py-1.5 text-[11.5px]"
          style={{ borderColor: c.line, background: c.card, color: c.ink3 }}
        >
          {f}
        </span>
      ))}
      <span
        className="rounded-[10px] px-3 py-1.5 text-[11.5px] font-medium text-white"
        style={{ background: c.accent }}
      >
        Search
      </span>
    </div>
  );
}

/* ───────────────────────────── SESSIONS LIST ───────────────────────────── */

function SessionsMockup() {
  const rows = [
    { id: "SN-4417", time: "09:12 – 09:31", date: "13 Aug", owner: "@k.chen", serial: "BWC-04-88213", mac: "D4:9C:33:45", items: 4, tone: "red" as Tone, status: "Uncategorized", picked: true },
    { id: "SN-4418", time: "10:13 – 10:23", date: "12 Aug", owner: "@j.mayor", serial: "BWC-11-40072", mac: "A1:0F:71:2C", items: 2, tone: "red" as Tone, status: "Uncategorized", picked: false },
    { id: "SN-4419", time: "11:04 – 11:05", date: "13 Aug", owner: "@k.chen", serial: "BWC-04-88213", mac: "D4:9C:33:45", items: 1, tone: "amber" as Tone, status: "Categorized", picked: false },
    { id: "SN-4420", time: "14:22 – 14:39", date: "11 Aug", owner: "@a.novak", serial: "ICV-02-55901", mac: "9B:23:E8:10", items: 6, tone: "green" as Tone, status: "Evidence", picked: false },
  ];
  return (
    <Frame label="Media › Sessions · the triage surface">
      <SearchBar />
      <div className="mb-2 flex items-center gap-2">
        {["Sessions", "Uncategorized", "Categorized", "RTAC", "Evidence"].map((t, i) => (
          <span
            key={t}
            className="border-b-2 px-1 pb-1.5 text-[11.5px] font-medium"
            style={{ borderColor: i === 0 ? c.accent : "transparent", color: i === 0 ? c.ink : c.ink3 }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-2 rounded-[12px] border p-3 lg:flex-row lg:items-center lg:gap-3"
            style={{
              borderColor: r.picked ? c.accent : c.line,
              background: r.picked ? c.accentBg : c.card,
              boxShadow: "0 1px 2px rgba(22,21,15,.05)",
            }}
          >
            <span
              className="h-4 w-4 shrink-0 rounded-[6px] border"
              style={{
                borderColor: r.picked ? c.accent : c.line2,
                background: r.picked ? c.accent : c.card,
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-semibold" style={{ color: c.ink }}>{r.id}</span>
                <span className="text-[11.5px]" style={{ color: c.ink3 }}>{r.owner}</span>
              </div>
              <div className="truncate font-mono text-[10.5px]" style={{ color: c.ink4 }}>
                {r.serial} · {r.mac}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5 text-[12px]" style={{ color: c.ink2 }}>
              <span>{r.time}</span>
              <span style={{ color: c.ink3 }}>{r.date}</span>
              <Chip>{r.items} items</Chip>
              <Chip tone={r.tone}>{r.status}</Chip>
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex items-center gap-2 rounded-[12px] px-3 py-2 text-[11.5px] text-white"
        style={{ background: c.ink }}
      >
        1 selected
        <span className="ml-auto flex gap-1.5">
          {["Download", "Share", "Add to case"].map((a, i) => (
            <span
              key={a}
              className="rounded-[8px] px-2.5 py-1"
              style={{ background: i === 2 ? c.accent : "rgba(255,255,255,.14)" }}
            >
              {a}
            </span>
          ))}
        </span>
      </div>
    </Frame>
  );
}

/* ───────────────────────── SESSION DETAIL (TAB PATTERN) ───────────────────────── */

function SessionTabsMockup() {
  return (
    <Frame label="Session detail · the reusable four-tab pattern">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold" style={{ color: c.ink }}>SN-4417</span>
        <span className="text-[11.5px]" style={{ color: c.ink3 }}>@k.chen</span>
        <Chip tone="red">Uncategorized</Chip>
        <Chip tone="blue"># Incident</Chip>
        <Chip>Central server</Chip>
      </div>

      <div className="mb-3 flex gap-1 border-b" style={{ borderColor: c.line }}>
        {["File information", "Edit", "Transcript", "Audit trail"].map((t, i) => (
          <span
            key={t}
            className="border-b-2 px-2.5 pb-2 text-[11.5px] font-medium"
            style={{ borderColor: i === 0 ? c.accent : "transparent", color: i === 0 ? c.ink : c.ink3 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px]">
        <div className="flex flex-col gap-3">
          <div className="aspect-video w-full rounded-[10px]" style={{ background: "linear-gradient(155deg,#4C5C49,#282C31)" }} />
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: "Created by", v: "K. Chen" },
              { k: "Device serial", v: "BWC-04-88213" },
              { k: "Camera MAC", v: "D4:9C:33:45" },
              { k: "File size", v: "412 MB" },
            ].map((f) => (
              <div key={f.k} className="rounded-[10px] p-2.5" style={{ background: c.card }}>
                <div className="font-mono text-[9px] tracking-[0.08em] uppercase" style={{ color: c.ink4 }}>{f.k}</div>
                <div className="mt-0.5 text-[11.5px] font-medium" style={{ color: c.ink }}>{f.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-[10px] p-3" style={{ background: c.card }}>
            <div className="mb-2 text-[11.5px] font-semibold" style={{ color: c.ink }}>Session notes</div>
            <div className="grid grid-cols-2 gap-2">
              {["Name", "Case number", "Category *", "Event number"].map((f) => (
                <span
                  key={f}
                  className="rounded-[8px] border px-2.5 py-1.5 text-[11px]"
                  style={{ borderColor: f.includes("*") ? c.accent : c.line2, background: c.card2, color: c.ink4 }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[10px] p-2.5" style={{ background: c.card }}>
          <div className="mb-2 font-mono text-[9px] tracking-[0.08em] uppercase" style={{ color: c.ink4 }}>
            Session rail
          </div>
          {["D49C3345_00", "D49C3345_02", "D49C3345_05"].map((f, i) => (
            <div
              key={f}
              className="mb-1.5 flex items-center gap-2 rounded-[8px] px-2 py-1.5"
              style={{ background: i === 0 ? c.blueBg : "transparent" }}
            >
              <span className="h-6 w-9 shrink-0 rounded-[4px]" style={{ background: "linear-gradient(155deg,#4C5C49,#282C31)" }} />
              <span className="min-w-0">
                <span className="block truncate font-mono text-[9.5px]" style={{ color: c.ink2 }}>{f}</span>
                <span className="block text-[9px]" style={{ color: c.ink4 }}>Central server</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── TRANSCRIPT ───────────────────────────── */

function TranscriptMockup() {
  const lines = [
    { who: "Speaker 1", at: "00:41", text: "Can you tell me what happened with the car before we arrived?", mark: "car" },
    { who: "Speaker 2", at: "00:48", text: "It was parked here about an hour, then the driver came back and drove off quickly.", mark: null },
    { who: "Speaker 2", at: "01:02", text: "I think the car was a dark blue hatchback, but I could not see the plate.", mark: "car" },
    { who: "Speaker 1", at: "01:15", text: "That is helpful. I am recording this on my body camera.", mark: null },
  ];
  return (
    <Frame label="Transcript · auto-generated, speaker-diarized, caveated">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Chip tone="blue">Auto generated</Chip>
        <span
          className="ml-auto rounded-[8px] border px-2.5 py-1 text-[11px]"
          style={{ borderColor: c.line2, background: c.card, color: c.ink2 }}
        >
          Download transcript
        </span>
      </div>
      <p className="mb-3 text-[12px]" style={{ color: c.ink3 }}>
        Written automatically. Check it against the audio before using it in a case — selecting a line moves the playhead
        to that moment.
      </p>
      <div className="flex flex-col">
        {lines.map((l, i) => {
          const parts = l.mark ? l.text.split(l.mark) : [l.text];
          return (
            <div
              key={i}
              className="grid grid-cols-[68px_1fr] gap-3 rounded-[10px] px-2.5 py-2"
              style={{ background: l.mark ? c.accentBg : "transparent" }}
            >
              <div>
                <div className="text-[11px] font-semibold" style={{ color: c.ink }}>{l.who}</div>
                <div className="font-mono text-[10px]" style={{ color: c.ink4 }}>{l.at}</div>
              </div>
              <p className="text-[12.5px] leading-[1.55]" style={{ color: c.ink2 }}>
                {l.mark
                  ? parts.map((part, j) => (
                      <span key={j}>
                        {part}
                        {j < parts.length - 1 && (
                          <mark style={{ background: "rgba(244,96,11,.2)", color: "inherit", borderRadius: 3, padding: "0 2px" }}>
                            {l.mark}
                          </mark>
                        )}
                      </span>
                    ))
                  : l.text}
              </p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ───────────────────────────── EDITOR ───────────────────────────── */

function EditorMockup() {
  const heights = [22, 48, 70, 38, 84, 52, 30, 64, 88, 44, 26, 58, 76, 34, 62, 90, 40, 24, 56, 72];
  return (
    <Frame label="Edit tab · non-destructive timeline operations">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-semibold" style={{ color: c.ink }}>0:30 – 2:00 (1:30)</span>
        <span className="flex gap-1.5">
          {["Undo", "Redo"].map((t) => (
            <span key={t} className="rounded-[8px] border px-2 py-1 text-[11px]" style={{ borderColor: c.line, color: c.ink3 }}>
              {t}
            </span>
          ))}
        </span>
        <span className="ml-auto rounded-[8px] px-3 py-1 text-[11.5px] font-medium text-white" style={{ background: c.accent }}>
          Save as clip
        </span>
      </div>

      <div className="mb-1 flex justify-between font-mono text-[9px]" style={{ color: c.ink4 }}>
        {["11:00", "11:15", "11:30", "11:45", "12:00"].map((t) => <span key={t}>{t}</span>)}
      </div>
      <div className="relative h-10 overflow-hidden rounded-[8px]" style={{ background: c.card3 }}>
        <div className="absolute inset-y-0 left-0" style={{ background: "rgba(0,0,0,.42)", width: "16.6%" }} />
        <div className="absolute inset-y-0 right-0" style={{ background: "rgba(0,0,0,.42)", width: "33.4%" }} />
        <div
          className="absolute inset-y-0 border-x-2"
          style={{ left: "16.6%", width: "50%", background: "rgba(244,96,11,.12)", borderColor: c.accent }}
        />
      </div>
      <div className="mt-1.5 flex h-6 items-center gap-[2px] px-1">
        {heights.map((h, i) => (
          <span key={i} className="flex-1 rounded-[1px]" style={{ height: `${h}%`, background: c.ink4, opacity: 0.55 }} />
        ))}
      </div>
      <div className="mt-1 font-mono text-[9px]" style={{ color: c.ink4 }}>Audio per frame</div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="rounded-[6px] border px-2 py-0.5 text-[10px]" style={{ borderColor: c.accent, background: c.accentBg, color: c.accent }}>
          Redacted 0:30–2:00
        </span>
        <span className="rounded-[6px] border px-2 py-0.5 text-[10px]" style={{ borderColor: c.line2, background: c.card3, color: c.ink3 }}>
          Beeped 1:12–1:19
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t pt-3" style={{ borderColor: c.line }}>
        {["Annotate", "Clip", "Snap", "Beep", "Redact"].map((t) => (
          <span
            key={t}
            className="rounded-[8px] border px-2.5 py-1 text-[11.5px]"
            style={{ borderColor: c.line2, background: c.card, color: c.ink2 }}
          >
            {t}
          </span>
        ))}
        <span className="ml-auto text-[11px]" style={{ color: c.ink3 }}>
          The original is never modified — every save creates a new derived file.
        </span>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── AUDIT TRAIL ───────────────────────────── */

function AuditMockup() {
  const events = [
    { who: "K. Chen", text: "Session created as category: Uncategorized", when: "13 Aug, 09:12", mine: false },
    { who: "System", text: "Upload verified — content unchanged since recording", when: "13 Aug, 11:20", mine: false },
    { who: "J. Mayor", text: "Category modified to Categorized", when: "13 Aug, 12:04", mine: false },
    { who: "S. Reyes", text: "Clip saved — 0:30 to 2:00 (redacted, beeped)", when: "13 Aug, 13:22", mine: true },
    { who: "S. Reyes", text: "Session content exported and added to case CS-6899", when: "13 Aug, 15:41", mine: true },
  ];
  return (
    <Frame label="Audit trail · append-only, in plain language">
      <p className="mb-4 text-[12px]" style={{ color: c.ink3 }}>
        A permanent record of everyone who touched this session. It cannot be edited or deleted.
      </p>
      <div className="relative flex flex-col gap-5 pl-6">
        <span className="absolute top-1 bottom-1 left-[7px] w-px" style={{ background: c.line }} />
        {events.map((e, i) => (
          <div key={i} className="relative">
            <span
              className="absolute top-0.5 -left-6 h-3.5 w-3.5 rounded-full border-[3px]"
              style={{ background: e.mine ? c.accent : c.ink4, borderColor: c.bg }}
            />
            <div className="text-[12.5px] font-semibold" style={{ color: c.ink }}>{e.who}</div>
            <div className="text-[12px]" style={{ color: c.ink2 }}>{e.text}</div>
            <div className="mt-0.5 text-[10.5px]" style={{ color: c.ink4 }}>{e.when}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ───────────────────────────── CASE FILE ───────────────────────────── */

function CaseFileMockup() {
  const evidences = [
    { id: "SN-4417", owner: "@k.chen", mac: "D4:9C:33:45", when: "13 Aug · 09:12 – 09:31" },
    { id: "SN-4417-C1", owner: "@s.reyes", mac: "D4:9C:33:45", when: "13 Aug · 00:30 – 02:00" },
    { id: "SN-4420", owner: "@a.novak", mac: "9B:23:E8:10", when: "11 Aug · 14:22 – 14:39" },
  ];
  return (
    <Frame label="Evidence › Case files · the packaging surface">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold" style={{ color: c.ink }}>CS-6899</span>
        <span className="text-[11.5px]" style={{ color: c.ink3 }}>@s.reyes</span>
        <span
          className="ml-auto rounded-[8px] px-3 py-1 text-[11.5px] font-medium text-white"
          style={{ background: c.accent }}
        >
          Add sessions
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1 border-b" style={{ borderColor: c.line }}>
        {["File information", "Sharing details", "Chain of custody", "Activity log", "File uploads"].map((t, i) => (
          <span
            key={t}
            className="border-b-2 px-2.5 pb-2 text-[11.5px] font-medium"
            style={{ borderColor: i === 0 ? c.accent : "transparent", color: i === 0 ? c.ink : c.ink3 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_210px]">
        <div className="flex flex-col gap-2.5">
          <span
            className="rounded-[8px] border px-2.5 py-1.5 text-[11.5px]"
            style={{ borderColor: c.line2, background: c.card, color: c.ink2 }}
          >
            High Street incident — 13 Aug
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[9px] tracking-[0.08em] uppercase" style={{ color: c.ink4 }}>Tags</span>
            <Chip tone="blue">Accident</Chip>
            <Chip tone="blue">Incident</Chip>
            <span className="rounded-full border border-dashed px-2 py-0.5 text-[10.5px]" style={{ borderColor: c.line2, color: c.ink4 }}>
              + Add
            </span>
          </div>
          <div className="rounded-[10px] border" style={{ borderColor: c.line2, background: c.card }}>
            <div className="flex gap-1.5 border-b px-2.5 py-1.5" style={{ borderColor: c.line }}>
              {["B", "I", "U", "≡", "•"].map((t) => (
                <span key={t} className="text-[11px]" style={{ color: c.ink3 }}>{t}</span>
              ))}
            </div>
            <p className="px-2.5 py-2 text-[11.5px] leading-[1.6]" style={{ color: c.ink3 }}>
              Case description — narrative context linking the attached sessions.
            </p>
          </div>
        </div>

        <div className="rounded-[10px] p-2.5" style={{ background: c.card }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.08em] uppercase" style={{ color: c.ink4 }}>Evidences</span>
            <Chip>3 files</Chip>
          </div>
          {evidences.map((e) => (
            <div key={e.id} className="mb-1.5 rounded-[8px] px-2 py-1.5" style={{ background: c.card2 }}>
              <div className="text-[11px] font-semibold" style={{ color: c.ink }}>{e.id}</div>
              <div className="font-mono text-[9px]" style={{ color: c.ink4 }}>{e.owner} · {e.mac}</div>
              <div className="text-[9.5px]" style={{ color: c.ink3 }}>{e.when}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── LIVE STREAMING ───────────────────────────── */

function LiveMockup() {
  const sources = [
    { who: "@k.chen", state: "Broadcasting", tone: "red" as Tone },
    { who: "@a.novak", state: "Broadcasting", tone: "red" as Tone },
    { who: "@j.mayor", state: "Not broadcasting", tone: "neutral" as Tone },
    { who: "@t.okafor", state: "Not broadcasting", tone: "neutral" as Tone },
  ];
  return (
    <Frame label="Streaming › Live · real-time monitoring and in-the-moment tagging">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_200px]">
        <div className="flex flex-col gap-2.5">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-[10px]"
            style={{ background: "linear-gradient(155deg,#4C5C49,#333F38 36%,#282C31 70%,#191B1E)" }}
          >
            <span
              className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ background: c.red }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Live
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-semibold" style={{ color: c.ink }}>@k.chen</span>
            <span className="text-[11px]" style={{ color: c.ink4 }}>13 Aug · 09:12</span>
            <Chip tone="blue">Incident ×</Chip>
            <Chip tone="green">Evidence ×</Chip>
            <span className="rounded-full border border-dashed px-2 py-0.5 text-[10.5px]" style={{ borderColor: c.line2, color: c.ink4 }}>
              + Add tag
            </span>
          </div>
          <div className="rounded-[10px] p-2.5" style={{ background: c.card }}>
            <div className="text-[11px] font-semibold" style={{ color: c.ink }}>S. Reyes · 09:14</div>
            <p className="mt-0.5 text-[11.5px] leading-[1.5]" style={{ color: c.ink2 }}>
              Tagged live during the callout. Attached 2 evidences in the case file.
            </p>
          </div>
        </div>

        <div className="rounded-[10px] p-2.5" style={{ background: c.card }}>
          <div className="mb-2 flex flex-wrap gap-1">
            {["Broadcasting", "GPS", "Auto"].map((t, i) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[9.5px] font-medium"
                style={{ background: i === 0 ? c.ink : c.card3, color: i === 0 ? "#fff" : c.ink3 }}
              >
                {t}
              </span>
            ))}
          </div>
          {sources.map((s) => (
            <div key={s.who} className="mb-1.5 flex items-center gap-2 rounded-[8px] px-2 py-1.5" style={{ background: c.card2 }}>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold" style={{ color: c.ink }}>{s.who}</span>
                <span className="block text-[9px]" style={{ color: TONES[s.tone].fg }}>{s.state}</span>
              </span>
              <span className="text-[9.5px]" style={{ color: c.ink4 }}>Watch</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── DEVICES / FLEET ───────────────────────────── */

function Donut({ pct, label, color }: { pct: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(${color} ${pct}%, ${c.card3} 0)` }}
      >
        <span className="absolute inset-[7px] rounded-full" style={{ background: c.card }} />
        <span className="relative text-[10px] font-semibold" style={{ color: c.ink2 }}>{pct}%</span>
      </span>
      <span className="min-w-0 text-[10.5px]" style={{ color: c.ink3 }}>{label}</span>
    </div>
  );
}

function DevicesMockup() {
  const bars = [
    { name: "BWC-19", pct: 100 },
    { name: "ICV-07", pct: 100 },
    { name: "ICV-11", pct: 92 },
    { name: "FX-03", pct: 87 },
    { name: "FX-01", pct: 79 },
    { name: "BWC-11", pct: 64 },
  ];
  const table = [
    { name: "BWC-04", type: "BWC", status: "Active", tone: "green" as Tone, sessions: 42, uptime: "99.2%", storage: 38 },
    { name: "BWC-19", type: "BWC", status: "Disconnected", tone: "red" as Tone, sessions: 11, uptime: "61.4%", storage: 100 },
    { name: "ICV-07", type: "ICV", status: "Active", tone: "green" as Tone, sessions: 28, uptime: "97.8%", storage: 100 },
  ];
  return (
    <Frame label="Dashboard › Devices · fleet health as an operations surface">
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-[12px] p-3" style={{ background: c.card }}>
          <div className="mb-2 text-[11px]" style={{ color: c.ink2 }}>Devices online</div>
          <Donut pct={11} label="03 of 27 reporting" color={c.accent} />
        </div>
        <div className="rounded-[12px] p-3" style={{ background: c.card }}>
          <div className="mb-2 text-[11px]" style={{ color: c.ink2 }}>Camera errors</div>
          <Donut pct={22} label="6 devices need attention" color={c.red} />
        </div>
        <div className="rounded-[12px] p-3" style={{ background: c.card }}>
          <div className="mb-2 text-[11px]" style={{ color: c.ink2 }}>Case briefs created</div>
          <div className="text-[26px] leading-none font-semibold" style={{ color: c.ink, letterSpacing: "-0.03em" }}>557</div>
          <div className="mt-1.5 text-[10.5px]" style={{ color: c.ink4 }}>Rolling 12 months</div>
        </div>
      </div>

      <div className="mb-3 rounded-[12px] border p-3.5" style={{ borderColor: c.line, background: c.card }}>
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[12px] font-semibold" style={{ color: c.ink }}>Top storage utilisation</span>
          <span className="text-[10.5px]" style={{ color: c.ink3 }}>90% offload threshold</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {bars.map((b) => (
            <div key={b.name} className="grid grid-cols-[54px_1fr_36px] items-center gap-2.5">
              <span className="font-mono text-[10px]" style={{ color: c.ink4 }}>{b.name}</span>
              <span className="relative h-3.5 rounded-[6px]" style={{ background: c.card3 }}>
                <span
                  className="absolute inset-y-0 left-0 rounded-[6px]"
                  style={{ width: `${b.pct}%`, background: c.accent, opacity: b.pct >= 90 ? 1 : 0.65 }}
                />
                <span className="absolute top-[-3px] bottom-[-3px] w-px" style={{ left: "90%", background: c.ink4, opacity: 0.55 }} />
              </span>
              <span className="text-right text-[11px] font-semibold" style={{ color: b.pct >= 90 ? c.red : c.ink3 }}>
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[12px] border" style={{ borderColor: c.line, background: c.card }}>
        <table className="w-full text-[11.5px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Type", "Status", "Sessions", "Uptime", "Storage"].map((h) => (
                <th
                  key={h}
                  className="border-b px-3 py-2 text-left font-mono text-[9px] tracking-[0.08em] uppercase"
                  style={{ borderColor: c.line, color: c.ink4, background: c.card2 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((r) => (
              <tr key={r.name}>
                <td className="border-b px-3 py-2 font-medium" style={{ borderColor: c.line, color: c.ink }}>{r.name}</td>
                <td className="border-b px-3 py-2" style={{ borderColor: c.line, color: c.ink3 }}>{r.type}</td>
                <td className="border-b px-3 py-2" style={{ borderColor: c.line }}><Chip tone={r.tone}>{r.status}</Chip></td>
                <td className="border-b px-3 py-2" style={{ borderColor: c.line, color: c.ink2 }}>{r.sessions}</td>
                <td className="border-b px-3 py-2" style={{ borderColor: c.line, color: c.ink2 }}>{r.uptime}</td>
                <td className="border-b px-3 py-2 font-semibold" style={{ borderColor: c.line, color: r.storage >= 90 ? c.red : c.ink2 }}>
                  {r.storage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── USAGE ANALYTICS ───────────────────────────── */

function UsageMockup() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const streamed = [2.1, 2.4, 2.2, 2.8, 3.1, 2.9, 3.4, 3.2, 3.6, 3.9, 3.7, 4.2];
  const stored = [1.2, 1.4, 1.6, 1.7, 1.9, 2.1, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2];
  const max = 4.6;
  const W = 600;
  const H = 150;
  const pt = (v: number, i: number) => `${(i * W) / 11},${H - (v / max) * (H - 18) - 6}`;
  return (
    <Frame label="Usage reporting · storage and bandwidth trend">
      <div className="mb-3 flex flex-wrap items-baseline gap-2.5">
        <span className="text-[26px] leading-none font-semibold" style={{ color: c.ink, letterSpacing: "-0.03em" }}>6 TB</span>
        <Chip tone="green">+10% vs last year</Chip>
        <span className="ml-auto flex gap-1">
          {["Daily", "Weekly", "Annually"].map((t, i) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
              style={{ background: i === 2 ? c.ink : c.card3, color: i === 2 ? "#fff" : c.ink3 }}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="rounded-[12px] p-3" style={{ background: c.card }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Streamed versus stored data across twelve months">
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1="0" y1={(g * H) / 3} x2={W} y2={(g * H) / 3} stroke={c.line} strokeWidth="1" />
          ))}
          <polyline points={streamed.map(pt).join(" ")} fill="none" stroke={c.accent} strokeWidth="2.5" strokeLinejoin="round" />
          <polyline points={stored.map(pt).join(" ")} fill="none" stroke={c.blue} strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="5 4" />
          {streamed.map((v, i) => (
            <circle key={i} cx={(i * W) / 11} cy={H - (v / max) * (H - 18) - 6} r="3" fill={c.accent} />
          ))}
        </svg>
        <div className="mt-1.5 flex justify-between font-mono text-[8.5px]" style={{ color: c.ink4 }}>
          {months.map((m) => <span key={m}>{m}</span>)}
        </div>
        <div className="mt-2.5 flex gap-4 border-t pt-2.5" style={{ borderColor: c.line }}>
          <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: c.ink3 }}>
            <span className="h-0.5 w-4 rounded" style={{ background: c.accent }} /> Streamed data
          </span>
          <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: c.ink3 }}>
            <span className="h-0.5 w-4 rounded" style={{ background: c.blue }} /> Stored data
          </span>
        </div>
      </div>
    </Frame>
  );
}

/* ═════════════════════════════ DIAGRAMS ═════════════════════════════ */

function DiaBox({
  kicker,
  lines,
  note,
  accent,
}: {
  kicker: string;
  lines: string[];
  note?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-1 rounded-[12px] border p-3.5"
      style={{ borderColor: accent ? c.accent : c.line, background: accent ? c.accentBg : c.card }}
    >
      <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase" style={{ color: accent ? c.accent : c.ink4 }}>
        {kicker}
      </span>
      {lines.map((l) => (
        <span key={l} className="text-[12.5px] font-semibold" style={{ color: c.ink }}>{l}</span>
      ))}
      {note && <span className="mt-0.5 text-[10.5px]" style={{ color: c.ink3 }}>{note}</span>}
    </div>
  );
}

function Arrow() {
  return (
    <ArrowRight size={15} aria-hidden className="shrink-0 self-center rotate-90 sm:rotate-0" style={{ color: c.ink4 }} />
  );
}

function EcosystemDiagram() {
  return (
    <Frame label="The ecosystem · every surface in scope">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
        <DiaBox kicker="Capture" lines={["Body-worn (BWC)", "In-car video (ICV)", "Fixed cameras"]} note="Field, in motion" />
        <Arrow />
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <DiaBox kicker="Transfer" lines={["Mobile app"]} note="Upload from the field" accent />
          <DiaBox kicker="Transfer" lines={["Kiosk / dock"]} note="Check-in, check-out" />
        </div>
        <Arrow />
        <DiaBox
          kicker="DEMS"
          lines={["Sessions", "Cases", "Streaming", "Devices"]}
          note="Desk, with time to think"
        />
        <Arrow />
        <DiaBox kicker="Outcome" lines={["Case briefs", "Disclosure"]} note="Court-defensible" />
      </div>
    </Frame>
  );
}

function IaDiagram() {
  const apps = [
    {
      app: "Admin console",
      who: "Evidence managers, org admins",
      tree: [
        { node: "Media", children: ["Sessions", "Uncategorized", "Categorized", "RTAC", "Evidence"] },
        { node: "Streaming", children: ["Live"] },
        { node: "Dashboard", children: ["Live map", "Devices"] },
        { node: "Administration · Settings · Support", children: [] },
      ],
    },
    {
      app: "m-View field app",
      who: "Officers, field operators",
      tree: [
        { node: "Dashboard", children: ["Live map", "Devices"] },
        { node: "Media", children: [] },
        { node: "Evidence", children: ["Case files", "Created by me", "Shared with me"] },
        { node: "My work · My team · Message", children: ["Organisation usage", "My usage"] },
      ],
    },
  ];
  return (
    <Frame label="Information architecture · two front-ends, one data model">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {apps.map((a) => (
          <div key={a.app} className="rounded-[12px] p-3.5" style={{ background: c.card }}>
            <div className="text-[12.5px] font-semibold" style={{ color: c.ink }}>{a.app}</div>
            <div className="mb-2.5 text-[10.5px]" style={{ color: c.ink3 }}>{a.who}</div>
            <div className="flex flex-col gap-2">
              {a.tree.map((b) => (
                <div key={b.node}>
                  <div className="text-[11.5px] font-medium" style={{ color: c.ink2 }}>{b.node}</div>
                  {b.children.length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5 border-l pl-2.5" style={{ borderColor: c.line2 }}>
                      {b.children.map((ch) => (
                        <span key={ch} className="text-[10.5px]" style={{ color: c.ink4 }}>{ch}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function DataModelDiagram() {
  const rows: { depth: number; label: string; note?: string; accent?: boolean }[] = [
    { depth: 0, label: "Organisation" },
    { depth: 1, label: "User", note: "role-based access" },
    { depth: 2, label: "Device", note: "BWC / ICV · serial, MAC, uptime, storage" },
    { depth: 3, label: "Session", note: "ID, time range, category, incident flag", accent: true },
    { depth: 4, label: "File", note: "the media asset itself" },
    { depth: 5, label: "Metadata · Notes · Transcript · Edits · Audit trail" },
    { depth: 0, label: "Case", note: "ID, name, description, tags", accent: true },
    { depth: 1, label: "Evidence[]", note: "references to sessions and derived files" },
    { depth: 1, label: "Sharing · Chain of custody · Activity log · Uploads" },
    { depth: 0, label: "LiveStream", note: "broadcast state, GPS, tags, evidence links" },
    { depth: 0, label: "UsageMetric", note: "org / user scope · streamed and stored bytes" },
  ];
  return (
    <Frame label="Data model · the objects every screen resolves to">
      <div className="flex flex-col gap-1">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex flex-wrap items-baseline gap-2 rounded-[8px] px-2.5 py-1.5"
            style={{
              marginLeft: `${r.depth * 14}px`,
              background: r.accent ? c.accentBg : r.depth === 0 ? c.card : "transparent",
              border: `1px solid ${r.accent ? c.accent : r.depth === 0 ? c.line : "transparent"}`,
            }}
          >
            <span
              className="text-[11.5px] font-semibold"
              style={{ color: r.accent ? c.accent : c.ink }}
            >
              {r.label}
            </span>
            {r.note && <span className="text-[10.5px]" style={{ color: c.ink3 }}>{r.note}</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function FlowDiagram() {
  const rows = [
    { label: "Before", steps: ["Capture", "End of shift", "Dock upload", "Supervisor writes it all"], badLast: true },
    { label: "After", steps: ["Capture + describe", "Upload from phone", "AI transcript + tags", "Supervisor verifies"], badLast: false },
  ];
  return (
    <Frame label="Reframe · where the documentation burden sits">
      {rows.map((row) => (
        <div key={row.label} className="mb-4 last:mb-0">
          <div className="mb-2 font-mono text-[9.5px] tracking-[0.1em] uppercase" style={{ color: c.ink4 }}>
            {row.label}
          </div>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
            {row.steps.map((step, i) => {
              const last = i === row.steps.length - 1;
              const bad = row.badLast && last;
              const good = !row.badLast && i === 0;
              return (
                <div key={step} className="flex min-w-0 flex-1 items-center gap-1.5">
                  <span
                    className="min-w-0 flex-1 rounded-full border px-3 py-1.5 text-center text-[11.5px] font-medium"
                    style={{
                      borderColor: bad ? c.red : good ? c.accent : c.line,
                      background: bad ? c.redBg : good ? c.accentBg : c.card,
                      color: bad ? c.red : good ? c.accent : c.ink2,
                    }}
                  >
                    {step}
                  </span>
                  {!last && <Arrow />}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Frame>
  );
}

function UserFlowsDiagram() {
  const flows = [
    { name: "Ingest → triage", steps: ["Device records", "Session lands uncategorized", "Admin reviews", "Category + case number set"] },
    { name: "Redaction", steps: ["Open session", "Edit tab", "Redact / beep / clip", "Save → audit entry"] },
    { name: "Evidence packaging", steps: ["Select sessions", "Add to case", "Describe + tag", "Share"] },
    { name: "Live monitoring", steps: ["Live map", "Watch broadcast", "Tag incident live", "Attach to case"] },
    { name: "Oversight", steps: ["Devices dashboard", "Spot storage / errors", "Act", "Usage reporting"] },
  ];
  return (
    <Frame label="Primary user flows · five paths through the system">
      <div className="flex flex-col gap-3">
        {flows.map((f) => (
          <div key={f.name}>
            <div className="mb-1.5 font-mono text-[9.5px] tracking-[0.1em] uppercase" style={{ color: c.ink4 }}>
              {f.name}
            </div>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
              {f.steps.map((s, i) => (
                <div key={s} className="flex min-w-0 flex-1 items-center gap-1.5">
                  <span
                    className="min-w-0 flex-1 rounded-[10px] border px-2.5 py-1.5 text-center text-[11px]"
                    style={{
                      borderColor: i === f.steps.length - 1 ? c.accent : c.line,
                      background: i === f.steps.length - 1 ? c.accentBg : c.card,
                      color: i === f.steps.length - 1 ? c.accent : c.ink2,
                    }}
                  >
                    {s}
                  </span>
                  {i < f.steps.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ArtefactsDiagram() {
  // Counts are real: each chip is one artefact that actually shipped. Laying
  // them out this way makes the shape of the project visible — Flows & IA is
  // more than a third of the total, which is the honest signal that this was
  // an architecture problem before it was a screen problem.
  const phases = [
    {
      phase: "Discover",
      name: "Ecosystem & journeys",
      items: ["Ecosystem maps", "Personas", "Evidence lifecycle journey map", "Custody-chain journey map"],
    },
    {
      phase: "Define",
      name: "Service design",
      items: ["Web–mobile–kiosk service blueprints", "Cross-surface workflow maps"],
    },
    {
      phase: "Architect",
      name: "Flows & IA",
      items: [
        "Investigator task flows",
        "Evidence-technician task flows",
        "Cross-surface IA",
        "Evidence–case relationship models",
        "Camera interaction flows",
        "Kiosk interaction flows",
        "Upload & transfer states",
        "AI transcription, translation & redaction flows",
        "Permissions & role-based access models",
        "Edge-case & failure-state maps",
      ],
    },
    {
      phase: "Validate",
      name: "Prototypes & testing",
      items: [
        "Low-fidelity prototypes",
        "High-fidelity prototypes",
        "Usability test scenarios",
        "Findings & recommendations",
        "Cross-platform interaction patterns",
      ],
    },
    {
      phase: "Systemise",
      name: "System & handoff",
      items: [
        "Design principles",
        "Web components",
        "Mobile components",
        "Kiosk components",
        "Component states & interaction specs",
        "Engineering-ready specifications",
        "User guides",
      ],
    },
  ];
  // A ruled table, in the site's own type and colour. This was previously an
  // iOS-styled card — rounded chrome, SF Pro, hardcoded system greys and a
  // progress bar per row, which asserted an interface that does not exist.
  //
  // The counts are gone too. They were doing the same job twice: the caption
  // under this figure already says twenty-eight artefacts and that more than a
  // third sit in Flows & IA, and a column of numbers repeating it added
  // arithmetic to a list whose job is to name the phases. The `items` arrays
  // stay as the record of what each phase actually produced.
  return (
    <figure className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="text-foreground-light font-mono text-[11px] tracking-[0.12em] uppercase">
        Artefacts
      </div>

      <div className="flex flex-col">
        {phases.map((p) => (
          <div
            key={p.name}
            className="border-foreground/10 grid grid-cols-[92px_1fr] items-baseline gap-4 border-t py-3 sm:grid-cols-[120px_1fr]"
          >
            <span className="text-foreground-light/70 font-mono text-[10px] tracking-[0.1em] uppercase">
              {p.phase}
            </span>
            <span className="text-foreground text-[15px] leading-snug">{p.name}</span>
          </div>
        ))}
        {/* Closing rule, so the list ends on a line rather than trailing off. */}
        <div className="border-foreground/10 border-t" />
      </div>
    </figure>
  );
}

/* ═════════════════════════════ EXPORTS ═════════════════════════════ */

const diagrams: Record<CaseStudyDiagram, () => React.ReactElement> = {
  ecosystem: EcosystemDiagram,
  ia: IaDiagram,
  "data-model": DataModelDiagram,
  flow: FlowDiagram,
  "user-flows": UserFlowsDiagram,
  artefacts: ArtefactsDiagram,
  // Clinical trial matching — own palette, kept in their own file.
  ...trialDiagrams,
  // Pet collar — same treatment, its own file.
  ...collarDiagrams,
};

const mockups: Record<CaseStudyMockup, () => React.ReactElement> = {
  sessions: SessionsMockup,
  "session-tabs": SessionTabsMockup,
  transcript: TranscriptMockup,
  editor: EditorMockup,
  audit: AuditMockup,
  "case-file": CaseFileMockup,
  live: LiveMockup,
  devices: DevicesMockup,
  usage: UsageMockup,
};

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="border-foreground/10 text-foreground-light border-l-2 py-0.5 pl-3 text-[13px] leading-[1.6]">
      {children}
    </figcaption>
  );
}

export function CaseStudyDiagramBlock({ id, caption }: { id: CaseStudyDiagram; caption?: string }) {
  const Diagram = diagrams[id];
  return (
    <figure className="flex w-full flex-col gap-3">
      <Diagram />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

export function CaseStudyMockupBlock({
  id,
  caption,
  annotations,
}: {
  id: CaseStudyMockup;
  caption?: string;
  annotations?: { title: string; body: string }[];
}) {
  const Mockup = mockups[id];
  return (
    <figure className="flex w-full flex-col gap-3">
      <Mockup />
      {annotations && annotations.length > 0 && (
        <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {annotations.map((a, i) => (
            <li key={a.title} className="flex gap-2.5">
              <span
                className="border-primary/40 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[13px] font-medium">{a.title}</span>
                <span className="text-foreground-light text-[12.5px] leading-[1.5]">{a.body}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** A visible "not yet published" placeholder — better than quietly omitting a
 *  section that the case study's own structure implies should exist. */
export function CaseStudySlot({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-foreground/20 flex flex-col items-center gap-1.5 rounded-[12px] border border-dashed px-5 py-8 text-center">
      <span className="text-foreground-light font-mono text-[10.5px] tracking-[0.1em] uppercase">{label}</span>
      <p className="text-foreground-light max-w-[46ch] text-[13px] leading-[1.55]">{text}</p>
    </div>
  );
}
