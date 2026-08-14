"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Copy, Pause, Play } from "lucide-react";

/**
 * A cursor-following dot that expands into a labelled pill over certain
 * elements, modelled on the reference site's behaviour.
 *
 * Three states, in increasing order of emphasis:
 *
 *   1. Idle — a 16px dot in the brand colour.
 *   2. Interactive — over any link, button, or `data-cursor="pointer"`, the dot
 *      scales to 1.5x and drops to 35% opacity. It stays a dot: "clickable" is
 *      not worth a word, and writing one would just repeat what the element
 *      already looks like.
 *   3. Labelled — over an element whose `data-cursor` names a mode in LABELS,
 *      it becomes a pill with an icon and uppercase mono text.
 *
 * Add a mode by putting `data-cursor="case-study"` on an element and a matching
 * entry in LABELS. The attribute carries a slug, never display copy, so the
 * wording of every cursor lives in one place.
 *
 * Desktop only — returns null under 768px, where there is no cursor to follow.
 */

type Mode = { text: string; icon: "arrow" | "copy" | "play" | "pause" };

const LABELS: Record<string, Mode> = {
  "case-study": { text: "VIEW CASE STUDY", icon: "arrow" },
  overview: { text: "VIEW OVERVIEW", icon: "arrow" },
  site: { text: "VIEW WEBSITE", icon: "arrow" },
  github: { text: "VIEW ON GITHUB", icon: "arrow" },
  resume: { text: "VIEW RESUME", icon: "arrow" },
  email: { text: "COPY EMAIL", icon: "copy" },
  play: { text: "PLAY", icon: "play" },
  pause: { text: "PAUSE", icon: "pause" },
};

/** Shown for a few seconds after the email mode copies to the clipboard. */
const COPIED: Mode = { text: "EMAIL COPIED!", icon: "copy" };

const DOT = 16;
const PILL_HEIGHT = 30;
const ICON = 16;
const ICON_GAP = 8;
const PILL_PAD = 10;

/**
 * Measures a label once and caches it.
 *
 * The pill animates its width, which needs a number rather than `auto`, so the
 * text has to be measured off-screen first. The cache is cleared when webfonts
 * finish loading — measurements taken against the fallback font are wrong by
 * enough to clip the last character.
 */
const widths = new Map<string, number>();
let ruler: HTMLSpanElement | null = null;

function textWidth(text: string) {
  const hit = widths.get(text);
  if (hit !== undefined) return hit;

  if (!ruler) {
    ruler = document.createElement("span");
    ruler.setAttribute("aria-hidden", "true");
    ruler.className = "font-mono";
    ruler.style.cssText =
      "position:absolute;left:-10000px;top:0;visibility:hidden;white-space:nowrap;font-weight:500;font-size:0.875rem;pointer-events:none;";
    document.body.appendChild(ruler);
  }

  ruler.textContent = text;
  const w = Math.ceil(ruler.getBoundingClientRect().width);
  widths.set(text, w);
  return w;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [inWindow, setInWindow] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [small, setSmall] = useState(false);

  const mode = copied ? COPIED : slug ? (LABELS[slug] ?? null) : null;
  const expanded = mode !== null;

  useEffect(() => {
    const fonts = document.fonts;
    if (!fonts?.ready) return;
    const clear = () => widths.clear();
    fonts.ready.then(clear).catch(clear);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onResize = () => setSmall(media.matches);
    onResize();
    window.addEventListener("resize", onResize);

    // Position on mousemove, state on mouseover/mouseout. Splitting them means
    // the expensive `closest` walk runs once per element crossed rather than on
    // every one of the hundreds of mousemove events a second.
    const onMove = (e: MouseEvent) => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
      setReady(true);
      setInWindow(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      const tagged = target.closest("[data-cursor]");
      const value = tagged?.getAttribute("data-cursor") ?? null;
      const named = value && value in LABELS ? value : null;
      setSlug(named);
      setInteractive(
        !named && (Boolean(target.closest('a, button, [role="button"]')) || value === "pointer"),
      );
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setInWindow(false);
    const onEnter = () => setInWindow(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // The email mode copies rather than opening a mail client, and says so.
  useEffect(() => {
    if (slug !== "email") return;
    const onClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('[data-cursor="email"]') as HTMLAnchorElement | null;
      if (!el) return;
      const address = el.href?.replace(/^mailto:/, "") ?? el.textContent?.trim();
      if (!address) return;
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Clipboard blocked (insecure context, or the user denied it). Fall
        // through to the mailto: the anchor already carries.
        window.location.href = el.href;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slug]);

  const width = useMemo(() => {
    if (!mode) return DOT;
    return PILL_PAD * 2 + ICON + ICON_GAP + textWidth(mode.text);
  }, [mode]);

  if (small) return null;

  const Icon =
    mode?.icon === "copy"
      ? Copy
      : mode?.icon === "play"
        ? Play
        : mode?.icon === "pause"
          ? Pause
          : ArrowUpRight;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center"
      style={{
        // The pill sits just to the right of the true pointer position rather
        // than centred on it, so it never covers what is being pointed at.
        transform: expanded ? "translate(-12px, -50%)" : "translate(-8px, -50%)",
        opacity: inWindow && ready ? 1 : 0,
        transition: "opacity 0.3s ease-out, transform 0.1s ease-out",
        visibility: ready ? "visible" : "hidden",
      }}
    >
      <div
        className="bg-primary flex items-center font-mono text-white select-none"
        style={{
          width,
          height: expanded ? PILL_HEIGHT : DOT,
          borderRadius: expanded ? 32 : 999,
          padding: expanded ? `0 ${PILL_PAD}px` : 0,
          fontSize: "0.875rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
          boxShadow: expanded ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          // Pressed shrinks; hovering something clickable swells the bare dot
          // and fades it, which is the whole "interactive" affordance.
          transform: pressed && !expanded ? "scale(0.75)" : interactive && !expanded ? "scale(1.5)" : "scale(1)",
          opacity: interactive && !expanded ? 0.35 : 1,
          transition:
            "width 0.2s ease-out, height 0.2s ease-out, border-radius 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.1s ease-out, padding 0.2s ease-out, opacity 0.2s ease-out",
        }}
      >
        <span
          style={{
            opacity: expanded ? 1 : 0,
            display: "flex",
            alignItems: "center",
            marginRight: expanded ? ICON_GAP : 0,
            width: expanded ? ICON : 0,
            overflow: "hidden",
            transition: "opacity 0.2s ease-out, margin 0.2s ease-out, width 0.2s ease-out",
          }}
        >
          <Icon style={{ width: ICON, height: ICON }} strokeWidth={2} />
        </span>
        <span
          style={{
            opacity: expanded ? 1 : 0,
            width: expanded ? "auto" : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease-out, width 0.2s ease-out",
          }}
        >
          {mode?.text}
        </span>
      </div>
    </div>
  );
}
