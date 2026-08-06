import { profile } from "@/content/profile";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ActivityBars, type Bucket } from "./ActivityBars";

/**
 * A 30-day activity strip.
 *
 * With a GitHub username configured it shows real public-event counts. Without
 * one it falls back to a shape-only placeholder that says so on the label —
 * a portfolio implying contributions that never happened would be worse than
 * showing nothing, so the fallback never claims to be real.
 */

const DAYS = 30;

/** Deterministic filler, so server and client render identical markup. */
function placeholderBuckets(): Bucket[] {
  const out: Bucket[] = [];
  const today = new Date();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const day = d.getUTCDay();
    // Quiet weekends, busier midweek — a plausible rhythm, no randomness.
    const base = day === 0 || day === 6 ? 0 : 2 + ((i * 7) % 5);
    const count = (i * 13) % 11 === 0 ? 0 : base;
    out.push({ date: d.toISOString().slice(0, 10), count });
  }
  return out;
}

async function fetchActivity(username: string): Promise<Bucket[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;

    const events: { created_at: string }[] = await res.json();
    const counts = new Map<string, number>();
    for (const e of events) {
      const day = e.created_at.slice(0, 10);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }

    const out: Bucket[] = [];
    const today = new Date();
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setUTCDate(d.getUTCDate() - i);
      const key = d.toISOString().slice(0, 10);
      out.push({ date: key, count: counts.get(key) ?? 0 });
    }
    return out;
  } catch {
    return null;
  }
}

export async function ActivityStrip() {
  const username = profile.socials.github;
  const real = username ? await fetchActivity(username) : null;
  const buckets = real ?? placeholderBuckets();
  const total = real ? real.reduce((s, b) => s + b.count, 0) : null;

  return (
    <div className="flex w-full max-w-[720px] flex-col gap-4">
      <ScrambleText as="h4" text="Activity" delay={0.15} scrambleOnHover />

      <div className="flex items-center gap-4">
        <h4 className="text-foreground-light shrink-0">Last {DAYS} days</h4>
        <span className="bg-foreground/12 h-px flex-1" />
        <h4 className="text-foreground-light shrink-0">
          {total === null ? "Placeholder" : `${total} Contributions`}
        </h4>
      </div>

      <ActivityBars buckets={buckets} />
    </div>
  );
}
