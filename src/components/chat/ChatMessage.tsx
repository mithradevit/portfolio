import type { UIMessage } from "ai";
import { cn } from "@/lib/cn";

/**
 * Renders `**bold**` runs inside a line.
 *
 * The model is asked for bullets, and the useful shape of a bullet is a short
 * label followed by the detail — so bold has to mean something rather than
 * arriving as literal asterisks. Nothing else is interpreted: this is not a
 * markdown parser and should not grow into one, because everything it accepts
 * is another way for model output to inject structure into the page.
 */
function inline(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={`${keyPrefix}-${i}`} className="font-medium">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

/**
 * Splits an answer into paragraphs and bullet lists.
 *
 * Streaming means this runs on every partial chunk, including on a half-typed
 * "- " that is not yet a bullet — so it has to be tolerant rather than strict.
 * A line is a bullet only once it has a marker *and* a space, which is why a
 * bullet appears whole instead of the marker flickering in as a stray dash.
 */
function render(text: string) {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let paragraph: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="flex list-none flex-col gap-1.5 pl-0">
        {items.map((item, i) => (
          <li key={i} className="relative pl-4 leading-[1.55]">
            {/* A dot drawn by the layout rather than a list marker: the bare
                `li` rule in globals.css sets its own list styling site-wide,
                and a bubble needs the marker to hang inside the padding
                instead of outside the bubble's edge. */}
            <span
              aria-hidden
              className="bg-foreground/40 absolute top-[0.6em] left-[3px] h-[3px] w-[3px] rounded-full"
            />
            {inline(item, `li-${i}`)}
          </li>
        ))}
      </ul>,
    );
  };

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const joined = paragraph.join(" ");
    paragraph = [];
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-[1.55]">
        {inline(joined, `p-${blocks.length}`)}
      </p>,
    );
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushBullets();
      continue;
    }
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      flushParagraph();
      bullets.push(bullet[1]);
    } else {
      flushBullets();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushBullets();

  return blocks;
}

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
          "rounded-2xl px-4 py-2.5 text-[14px]",
          // The visitor's own question is short and reads as an aside, so it
          // stays a narrow bubble. An answer is the content of the panel and
          // gets nearly the whole measure — a structured, bulleted reply
          // squeezed to 85% wraps every line for no reason.
          isUser
            ? "bg-primary max-w-[85%] whitespace-pre-wrap text-white"
            : "bg-foreground/5 text-foreground flex max-w-[96%] flex-col gap-2.5",
        )}
      >
        {isUser ? text : render(text)}
      </div>
    </div>
  );
}
