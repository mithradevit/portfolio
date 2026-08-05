"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { useChatOpen } from "./ChatOpenContext";

export function ChatButton({ variant }: { variant: "desktop" | "mobile" }) {
  const { open, setOpen } = useChatOpen();

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open MithraLLM chat"
        className="fixed right-6 bottom-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-200 active:scale-95 md:hidden"
      >
        <Sparkles size={20} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-label="Open MithraLLM chat"
      data-cursor="pointer"
      className={cn(
        "group hidden items-center gap-2 rounded-full p-2 opacity-60 transition-all duration-200 hover:text-primary hover:opacity-100 md:flex",
      )}
    >
      <Sparkles size={16} className="transition-colors duration-200 group-hover:text-primary" />
      <span className="font-mono text-[13px] tracking-wide uppercase">MithraLLM</span>
    </button>
  );
}
