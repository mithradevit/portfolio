"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ChatOpenContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ChatOpenContext = createContext<ChatOpenContextValue | null>(null);

export function ChatOpenProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);

  // Blur synchronously, before the state flips aria-hidden on — otherwise
  // the browser flags "aria-hidden applied to an element that still has
  // focus" because our effect-based cleanup runs a tick too late.
  const setOpen = useCallback((next: boolean) => {
    if (!next) {
      (document.activeElement as HTMLElement | null)?.blur();
    }
    setOpenState(next);
  }, []);

  // Lock the page behind the panel. On a phone the panel is the whole screen,
  // and without this a swipe that misses the message list scrolls the page
  // underneath it — so closing the chat drops you somewhere you never chose to
  // be. The class is what does the work (see globals.css); this only puts it on
  // and takes it off, and the cleanup runs on unmount too so a route change
  // while the chat is open can't leave the page locked.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;

    // `position: fixed` is the only lock iOS Safari honours, but it also
    // scrolls the page to the top. Offsetting the body by where the reader
    // already was, then scrolling back on release, is what makes the lock
    // invisible — they return to the paragraph they left.
    const offset = window.scrollY;
    body.style.top = `-${offset}px`;
    root.classList.add("chat-open");
    body.classList.add("chat-open");

    return () => {
      root.classList.remove("chat-open");
      body.classList.remove("chat-open");
      body.style.top = "";
      // Instant, not smooth: this is a restore, not a journey.
      window.scrollTo({ top: offset, behavior: "instant" });
    };
  }, [open]);

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);
  return <ChatOpenContext.Provider value={value}>{children}</ChatOpenContext.Provider>;
}

export function useChatOpen() {
  const ctx = useContext(ChatOpenContext);
  if (!ctx) throw new Error("useChatOpen must be used within ChatOpenProvider");
  return ctx;
}
