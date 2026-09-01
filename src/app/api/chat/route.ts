import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { checkRateLimit } from "@/lib/chat/rateLimit";

export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

export async function POST(req: Request) {
  // Without this the request fails deep inside the stream, which the client can
  // only render as a generic error — a missing key then looks identical to a
  // model outage. Fail here instead, with the reason.
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "The chat isn't configured yet — ANTHROPIC_API_KEY is not set." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Too many messages — please wait a moment and try again." }),
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds ?? 60) } },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No message provided." }), { status: 400 });
  }

  const recentMessages = messages.slice(-MAX_MESSAGES).map((m) => ({
    ...m,
    parts: m.parts.map((p) =>
      p.type === "text" ? { ...p, text: p.text.slice(0, MAX_MESSAGE_CHARS) } : p,
    ),
  }));

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(recentMessages),
    maxOutputTokens: 500,
    providerOptions: {
      // The system prompt is the whole site's content and is byte-identical on
      // every request, so it caches cleanly. Visitors ask several questions in
      // a row, and each follow-up re-sends it — caching makes those ~10x
      // cheaper on the repeated part. Only the trailing conversation varies.
      anthropic: { cacheControl: { type: "ephemeral" } },
    },
  });

  return result.toUIMessageStreamResponse({
    // The default masks every failure as "An error occurred." — fine for a
    // visitor, useless when the key is wrong or a rate limit is hit. Log the
    // real cause server-side; keep the visitor-facing text plain.
    onError(error) {
      console.error("[chat] stream failed:", error);
      return "Sorry — something went wrong answering that. Please try again.";
    },
  });
}
