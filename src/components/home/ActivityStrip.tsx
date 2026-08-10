import { profile } from "@/content/profile";
import { activityLog } from "@/content/activityLog";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ActivityBars, type Bucket } from "./ActivityBars";

/**
 * A 30-day activity strip.
 *
 * With a GitHub username configured it shows real public-event counts. Without
 * one — the current state — it falls back to `content/activityLog.ts`, a
 * hand-kept record of the work that doesn't leave a commit trail: talks,
 * advisory calls, writing, AI-assisted prototyping. That's genuine content,
 * not a placeholder, so it gets the same real "N logged" label a commit count
 * would — the bars themselves stay the plain hover-for-date graph either way.
 */

const DAYS = 30;

/** The curated log, in bucket shape, so it can render through the same bars. */
function logBuckets(): Bucket[] {
  const today = new Date();
  return activityLog.map((entry, i) => {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - (DAYS - 1 - i));
    return { date: d.toISOString().slice(0, 10), count: entry ? 1 : 0 };
  });
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

export async function ActivityStrip({ compact = false }: { compact?: boolean }) {
  const username = profile.socials.github;
  const real = username ? await fetchActivity(username) : null;
  const buckets = real ?? logBuckets();
  const log = real ? null : activityLog;
  const total = real
    ? real.reduce((s, b) => s + b.count, 0)
    : activityLog.filter((e) => e !== null).length;

  return (
    <div className={`flex w-full flex-col gap-4 ${compact ? "max-w-[340px]" : "max-w-[720px]"}`}>
      <ScrambleText as="h4" text="Activity" delay={0.15} scrambleOnHover />

      <div className="flex items-center gap-3">
        <h4 className="text-foreground-light shrink-0">Last {DAYS} days</h4>
        {compact ? null : <span className="bg-foreground/12 h-px flex-1" />}
        <h4 className="text-foreground-light shrink-0">
          {total} {real ? "Contributions" : "Logged"}
        </h4>
      </div>

      <ActivityBars buckets={buckets} log={log} compact={compact} />
    </div>
  );
}
