// Minimal in-memory per-IP rate limit for the chat endpoint, so a stranger
// scripting requests can't run up the Anthropic bill. Good enough for a
// personal site's traffic; this resets on redeploy/cold-start since it's
// process memory, not a database. If this ever needs to survive across
// serverless instances (real traffic spikes), swap it for Upstash Ratelimit
// — same call site, one file to change.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const hits = new Map<string, number[]>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = (hits.get(ip) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return { allowed: true };
}
