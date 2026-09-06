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
  // A recruiter's first question about a bot on a portfolio is usually whether
  // the candidate built it or dropped in a widget. Offering it as a prompt
  // answers that without the page having to make the claim itself.
  "How was this chat built?",
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
    <>
      {/* Scrim, drawer breakpoints only. Above 1024px the page is docked
          beside the panel and stays live — dimming it there would say
          "modal", which is the opposite of the panel belonging to the page.
          Below it the panel covers the screen, and the scrim is what makes a
          tap outside read as "close" rather than as a dead zone. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[65] bg-black/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        className={cn(
          // Width comes from the same `--chat-width` the page shell insets
          // itself by, so the panel and the gap it opens are one number.
          // Below the dock breakpoint that variable is 0 and the panel falls
          // back to the full screen, which is what a drawer should be.
          "border-foreground/10 bg-background fixed top-0 right-0 z-[70] flex h-[100dvh] w-full flex-col border-l shadow-xl lg:w-[var(--chat-width)]",
          // Matched to the shell's own easing and duration so the page and
          // the panel move as one gesture instead of two animations that
          // happen to overlap.
          "transition-transform duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="border-foreground/10 flex shrink-0 items-center justify-between border-b px-4 py-3.5">
          <div>
            <h4>MithraLLM</h4>
            <p className="text-foreground-light text-xs">Ask me about {profile.shortName}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={18} />
          </button>
        </div>

        {/* `overscroll-contain` stops a flick past the end of the thread from
            handing the scroll to the page behind it — the desktop dock has no
            body lock, so nothing else prevents that chaining. */}
        <div
          ref={scrollRef}
          className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {/* A reading column inside the scroller. The panel is fluid, so on a
              wide display the thread would otherwise run the full rail width
              and the eye loses the line; capped, the messages keep a
              comfortable measure and simply centre in whatever room there is. */}
          <div className="mx-auto flex w-full max-w-[42rem] flex-col gap-3">
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
                {/* The API sends a readable reason for the failures a visitor
                    can act on (rate limit, not configured). Anything else is
                    an internal detail and stays generic. */}
                {readableError(error)}
              </p>
            )}
          </div>
        </div>

        {/* `sticky` on top of being the flex column's last child: the flex
            layout already pins it while the thread is short, and sticky is
            what holds it against the bottom edge when a mobile keyboard
            shrinks the visual viewport under it. The safe-area padding keeps
            it clear of the iOS home indicator in the full-screen drawer. */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="border-foreground/10 bg-background sticky bottom-0 shrink-0 border-t px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto flex w-full max-w-[42rem] items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={isBusy}
              className="border-foreground/10 focus:border-primary min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2 text-[14px] outline-none"
            />
            <button
              type="submit"
              disabled={isBusy || !input.trim()}
              aria-label="Send"
              className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
