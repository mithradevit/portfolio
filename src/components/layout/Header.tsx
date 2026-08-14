"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { navItems } from "@/content/nav";
import { cn } from "@/lib/cn";
import { useChatOpen } from "@/components/chat/ChatOpenContext";
import { ThemeToggle } from "./ThemeToggle";

/**
 * One segment of the pill.
 *
 * The label styling lives here rather than on an h4: the global `h4 { color }`
 * rule in globals.css is unlayered, so it beats any Tailwind colour utility and
 * the active state would never show.
 */
// Mono uppercase is the design system's label role — the same treatment
// globals.css gives h4. Set a step below the system's 15px body size: the nav
// is chrome rather than content, and at 15px the pill outgrew a phone.
const segment =
  // text-[13px]! — globals.css sets a bare `a { font-size: 15px }`, and that
  // unlayered rule beats a plain Tailwind size utility, so the segments would
  // silently render at 15px without the important suffix.
  "rounded-full px-2 py-1.5 font-mono text-[13px]! tracking-[0.04em] uppercase transition-colors duration-200 sm:px-3.5 sm:tracking-[0.06em]";

const inactive = "text-foreground-light hover:text-foreground";

/** The raised chip behind the current page. */
const active = "bg-foreground/[0.08] text-foreground";

/** How close to the top of the viewport the cursor must come to summon the nav. */
const HOVER_BAND = 110;

/** Above this scroll position the nav stops showing itself unprompted. Keeps it
 *  present while the reader is still at the top of a page. */
const TOP_ZONE = 40;

/**
 * Reveals the nav only when the cursor approaches the top of the window.
 *
 * Three escape hatches, because "follow the mouse" alone would strand people:
 * a coarse pointer (touch) has no cursor to track, so the nav stays put; focus
 * inside the nav pins it open for keyboard users who tab into it from the page;
 * and it stays visible while the reader is still at the top of a document,
 * where a bare page with no navigation reads as broken rather than clean.
 */
function useProximityReveal() {
  const [visible, setVisible] = useState(true);
  // Refs, not state: these are read inside event handlers on every mousemove
  // and must not re-subscribe the listeners when they change.
  const nearTop = useRef(false);
  const held = useRef(false);
  const always = useRef(false);

  const sync = useCallback(() => {
    setVisible(always.current || held.current || nearTop.current || window.scrollY < TOP_ZONE);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      always.current = true;
      setVisible(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      const near = e.clientY < HOVER_BAND;
      // Only re-render when the cursor actually crosses the band, rather than
      // on every one of the hundreds of mousemove events a second.
      if (near !== nearTop.current) {
        nearTop.current = near;
        sync();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    sync();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", sync);
    };
  }, [sync]);

  /** Pins the nav open while the cursor is inside it. */
  const hold = useCallback(
    (on: boolean) => {
      held.current = on;
      sync();
    },
    [sync],
  );

  return { visible, hold };
}

/**
 * Keyboard escape hatch, in CSS rather than JS.
 *
 * Motion writes opacity and transform as inline styles, which no ordinary class
 * can override — hence the `!` on each. Without this a keyboard user tabbing in
 * from the page lands on a link that is fully focusable but invisible.
 */
const focusReveal =
  "focus-within:opacity-100! focus-within:[transform:none]! focus-within:pointer-events-auto!";

export function Header() {
  const pathname = usePathname();
  const { open, setOpen } = useChatOpen();
  const { visible, hold } = useProximityReveal();

  return (
    // Sticky rather than fixed: it floats over the page on scroll but still
    // occupies its own space in flow, so no page needs a compensating
    // padding-top and the existing 100svh hero maths stay correct.
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      // Hidden means untouchable: without this the invisible pill would still
      // swallow clicks aimed at whatever sits underneath it.
      className={cn(
        "sticky top-0 z-50 flex justify-center px-4 pt-4 pb-2",
        !visible && "pointer-events-none",
        focusReveal,
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "border-foreground/10 bg-background/80 flex items-center gap-0.5 rounded-full border p-1.5 backdrop-blur-xl",
          "shadow-[0_1px_2px_rgb(50_64_79_/_6%),0_12px_32px_-14px_rgb(50_64_79_/_30%)]",
        )}
      >
        {navItems.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className={cn(segment, inactive)}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="pointer"
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(segment, pathname === item.href ? active : inactive)}
            >
              {item.label}
            </Link>
          ),
        )}

        {/* Navigation to the left, page utilities to the right. */}
        <span aria-hidden className="bg-foreground/10 mx-1 h-5 w-px" />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          data-cursor="pointer"
          aria-label="Open MithraLLM chat"
          aria-expanded={open}
          className={cn(
            "text-foreground-light hover:text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200",
            open && "bg-foreground/[0.08] text-foreground",
          )}
        >
          <Sparkles size={15} strokeWidth={1.5} />
        </button>

        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
