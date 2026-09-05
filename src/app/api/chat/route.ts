import {
  streamText,
  convertToModelMessages,
  type LanguageModel,
  type UIMessage,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { checkRateLimit } from "@/lib/chat/rateLimit";

export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

/**
 * Whichever key is present, preferring Anthropic.
 *
 * Three providers because the site has to be able to run on a
 * free tier: Groq and Gemini both cost nothing and need no card, so the chat
 * can be live before there is a paid account behind it. Anthropic wins when
 * more than one is set: a paid key was added on purpose.
 *
 * Prompt caching is Anthropic-only here: Gemini's free tier is billed in
 * requests rather than tokens, so there is nothing to save.
 */
function selectModel(): {
  model: LanguageModel;
  providerOptions?: Parameters<typeof streamText>[0]["providerOptions"];
} | null {
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      model: anthropic("claude-haiku-4-5"),
      providerOptions: {
        anthropic: { cacheControl: { type: "ephemeral" as const } },
      },
    };
  }
  // Free and by far the largest daily allowance of the three — thousands of
  // requests rather than Gemini's hundreds — and the fastest, since it runs
  // open models on its own hardware. Second only to Anthropic because the
  // prose is blunter. Nothing to configure beyond the key.
  if (process.env.GROQ_API_KEY) {
    return { model: groq("llama-3.3-70b-versatile") };
  }
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return {
      // A lite model, and the floating alias rather than a pinned version.
      //
      // Both are quota decisions. gemini-3.6-flash allows 20 requests a DAY on
      // the free tier — a portfolio chat would exhaust that before lunch — and
      // the lite tier's allowance is an order of magnitude higher for a task
      // that is retrieval and paraphrase, not reasoning. The alias tracks
      // Google's current lite model: they close old versions to new keys
      // (2.5-flash and 2.5-flash-lite both 404 for this key already), and a
      // pinned id here would fail that way one day with nobody watching.
      model: google("gemini-flash-lite-latest"),
      providerOptions: {
        google: {
          // Gemini 3.x reasons before answering and charges that reasoning to
          // the same output budget. Left at its default, it spent the whole
          // allowance thinking and the visible answer stopped mid-word — and
          // took ~24s. Nothing here needs reasoning: every fact is in the
          // prompt and the task is to restate the right part of it.
          //
          // "minimal" rather than off: Gemini 3 has no zero setting, and
          // thinkingBudget: 0 is rejected outright as an invalid argument.
          thinkingConfig: { thinkingLevel: "minimal", includeThoughts: false },
        },
      },
    };
  }
  return null;
}

export async function POST(req: Request) {
  // Without this the request fails deep inside the stream, which the client can
  // only render as a generic error — a missing key then looks identical to a
  // model outage. Fail here instead, with the reason.
  const selected = selectModel();
  if (!selected) {
    return new Response(
      JSON.stringify({
        error:
          "The chat isn't configured yet — set GROQ_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY or ANTHROPIC_API_KEY.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: "Too many messages — please wait a moment and try again.",
      }),
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds ?? 60) },
      },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No message provided." }), {
      status: 400,
    });
  }

  const recentMessages = messages.slice(-MAX_MESSAGES).map((m) => ({
    ...m,
    parts: m.parts.map((p) =>
      p.type === "text"
        ? { ...p, text: p.text.slice(0, MAX_MESSAGE_CHARS) }
        : p,
    ),
  }));

  // The last two turns, not just the newest message: a follow-up is often a
  // bare pronoun ("what did she change there?"), and on its own it names
  // nothing for the prompt builder to retrieve against.
  const retrievalQuery = recentMessages
    .slice(-3)
    .filter((m) => m.role === "user")
    .flatMap((m) => m.parts.filter((p) => p.type === "text").map((p) => p.text))
    .join(" ");

  const result = streamText({
    model: selected.model,
    system: buildSystemPrompt(retrievalQuery),
    messages: await convertToModelMessages(recentMessages),
    // Headroom, not a target: the prompt asks for a few sentences, and this is
    // only the ceiling that stops a runaway answer. Set tight, a reply that
    // needed one more clause got cut mid-word instead.
    maxOutputTokens: 800,
    // Caching still pays on the Anthropic path even though the prompt now
    // varies with the question: a visitor asking follow-ups about one project
    // retrieves the same case study each time, so consecutive turns in a
    // conversation are usually byte-identical up to the trailing messages.
    providerOptions: selected.providerOptions,
  });

  return result.toUIMessageStreamResponse({
    // The default masks every failure as "An error occurred." — fine for a
    // visitor, useless when the key is wrong or a rate limit is hit. Log the
    // real cause server-side; keep the visitor-facing text plain.
    onError(error) {
      console.error("[chat] stream failed:", error);
      // A provider quota failure is the one stream error a visitor can act on
      // — it clears by itself — and it reads as a broken site if we call it
      // "something went wrong". Everything else stays generic.
      const message = error instanceof Error ? error.message : String(error);
      if (/quota|rate.?limit|RESOURCE_EXHAUSTED|429/i.test(message)) {
        return "MithraLLM has hit its daily limit. Please try again later, or email Mithra directly.";
      }
      return "Sorry — something went wrong answering that. Please try again.";
    },
  });
}
