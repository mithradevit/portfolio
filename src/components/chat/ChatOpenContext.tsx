"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

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

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);
  return <ChatOpenContext.Provider value={value}>{children}</ChatOpenContext.Provider>;
}

export function useChatOpen() {
  const ctx = useContext(ChatOpenContext);
  if (!ctx) throw new Error("useChatOpen must be used within ChatOpenProvider");
  return ctx;
}
