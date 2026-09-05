/**
 * Why the chat is failing, answered from inside the deployment.
 *
 * The chat route deliberately tells a visitor nothing about why a request
 * failed, and function logs are not always to hand — which leaves "it works
 * locally, it fails live" with no way to tell a missing key from a bad one
 * from a quota that has run out. This route makes one minimal call to the
 * configured provider and reports what came back.
 *
 * It returns no secrets: which env vars are present, the length and first
 * three characters of the key (enough to spot a truncated paste or a stray
 * quote, not enough to use), and the provider's own error text.
 *
 * Safe to leave deployed, and safe to delete once the chat is working.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const present = {
    GOOGLE_GENERATIVE_AI_API_KEY: describe(process.env.GOOGLE_GENERATIVE_AI_API_KEY),
    GROQ_API_KEY: describe(process.env.GROQ_API_KEY),
    ANTHROPIC_API_KEY: describe(process.env.ANTHROPIC_API_KEY),
  };

  if (!key) {
    return Response.json({ env: present, probe: "skipped — no Google key in this environment" });
  }

  // The plainest possible call: if this fails, the problem is the key, the
  // quota or the network, not our prompt or the AI SDK.
  let probe: unknown;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "say ok" }] }],
          generationConfig: { maxOutputTokens: 2000, thinkingConfig: { thinkingLevel: "minimal" } },
        }),
      },
    );
    const body = await res.json();
    probe = {
      status: res.status,
      error: body?.error?.message ?? null,
      text: body?.candidates?.[0]?.content?.parts?.[0]?.text ?? null,
    };
  } catch (error) {
    probe = { threw: error instanceof Error ? `${error.name}: ${error.message}` : String(error) };
  }

  return Response.json({ env: present, probe, runtime: process.version });
}

/** Enough to spot a truncated paste or a wrapping quote; never the key. */
function describe(value: string | undefined) {
  if (!value) return "absent";
  const trimmed = value.trim();
  return {
    length: trimmed.length,
    startsWith: trimmed.slice(0, 3),
    hasSurroundingQuotes: /^["'].*["']$/.test(trimmed),
    hadWhitespace: trimmed.length !== value.length,
  };
}
