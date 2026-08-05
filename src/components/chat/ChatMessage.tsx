import type { UIMessage } from "ai";
import { cn } from "@/lib/cn";

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

  if (!text) return null;

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap",
          isUser ? "bg-primary text-white" : "bg-foreground/5 text-foreground",
        )}
      >
        {text}
      </div>
    </div>
  );
}
