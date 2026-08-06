"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** What the page is showing right now, whether that came from a saved choice
 *  or from the OS preference the media query picked up. */
function currentTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Null until mounted: the server has no way to know the visitor's saved
  // choice, so rendering either icon during SSR would be a coin flip and a
  // hydration mismatch. The inline script in the layout has already applied
  // the theme by this point — this only syncs the button's label.
  useEffect(() => setTheme(currentTheme()), []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this
      // page view, it just won't be remembered.
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="pointer"
      aria-label={theme === null ? "Toggle theme" : `Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="border-foreground/10 text-foreground-light hover:border-primary/40 hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300"
    >
      {/* Both icons render; opacity/rotation cross-fades them so the swap
          doesn't jump the layout. Hidden from AT — the label above says it. */}
      <span aria-hidden className="relative block h-[15px] w-[15px]">
        <Sun
          size={15}
          strokeWidth={1.5}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon
          size={15}
          strokeWidth={1.5}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
