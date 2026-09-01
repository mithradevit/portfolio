"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, X } from "lucide-react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { useChatOpen } from "./ChatOpenContext";
import { ChatMessage } from "./ChatMessage";

const SUGGESTIONS = [
  "What does she do at Alchi Design Studio?",
  // Named the client's product, which is redacted, and pointed at a slug that
  // no longer exists — the bot answered "I don't know" to its own suggestion.
  "Tell me about the digital evidence work.",
  "What are her core skills?",
];

/** Pulls the `error` field out of the API's JSON body when there is one, so a
 *  rate limit reads as a rate limit. Falls back to a generic line — an
 *  exception message from the SDK is not something to show a visitor. */
function readableError(error: Error): string {
  try {
    const parsed = JSON.parse(error.message);
    if (typeof parsed?.error === "string") return parsed.error;
  } catch {
    // Not JSON — a network or stream failure. Fall through.
  }
  return "Something went wrong. Please try again in a moment.";
}

export function ChatPanel() {
  const { open, setOpen } = useChatOpen();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div
      className={cn(
        "border-foreground/10 bg-background fixed top-0 right-0 z-[70] flex h-[100dvh] w-full flex-col border-l shadow-xl transition-transform duration-300 ease-in-out sm:w-[400px]",
        open ? "translate-x-0" : "translate-x-full",
      )}
      aria-hidden={!open}
    >
      <div className="border-foreground/10 flex items-center justify-between border-b p-4">
        <div>
          <h4>MithraLLM</h4>
          <p className="text-foreground-light text-xs">Ask me about {profile.shortName}</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-foreground-light text-sm">
              Hi! I&apos;m MithraLLM — ask me anything about {profile.shortName}&apos;s work,
              experience, or skills.
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="border-foreground/10 hover:border-primary hover:text-primary rounded-lg border px-3 py-2 text-left text-[13px] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {status === "submitted" && (
          <div className="bg-foreground/5 w-fit rounded-2xl px-4 py-2.5 text-[14px]">
            <span className="animate-pulse">Thinking…</span>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {/* The API sends a readable reason for the failures a visitor can
                act on (rate limit, not configured). Anything else is an
                internal detail and stays generic. */}
            {readableError(error)}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="border-foreground/10 flex items-center gap-2 border-t p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          disabled={isBusy}
          className="border-foreground/10 flex-1 rounded-full border bg-transparent px-4 py-2 text-[14px] outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          aria-label="Send"
          className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
