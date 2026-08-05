import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { checkRateLimit } from "@/lib/chat/rateLimit";

export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

export async function POST(req: Request) {
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
  });

  return result.toUIMessageStreamResponse();
}
