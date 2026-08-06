"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { ChatButton } from "@/components/chat/ChatButton";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Fun" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-background border-foreground/10 relative z-50 flex items-center justify-center gap-6 border-b px-6 py-5 lg:h-16"
    >
      <div className="relative flex w-full max-w-[1800px] items-center gap-6">
        <Link href="/" className="flex flex-col gap-0 sm:flex-row sm:gap-4" data-cursor="pointer">
          <h4 className="text-foreground! font-medium!">{profile.name}</h4>
          <h4>{profile.title}</h4>
        </Link>

        <div className="hidden w-full items-center justify-end gap-8 md:flex">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="pointer"
                >
                  {/* The colour lives on the h4: the global `h4 { color }` rule
                      is unlayered, so it beats a colour inherited from the link. */}
                  <h4 className={cn(active ? "text-primary!" : "hover:text-primary!")}>
                    {link.label}
                  </h4>
                </Link>
              );
            })}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
            >
              <h4 className="hover:text-primary!">Resume</h4>
            </a>
          </div>
          <ThemeToggle />
          <ChatButton variant="desktop" />
        </div>

        <div className="ml-auto md:hidden">
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex items-center gap-4 md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 8H20" stroke="currentColor" strokeWidth="2" />
            <path d="M4 16H20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "border-foreground/10 bg-background absolute top-full right-0 left-0 z-60 border-b p-6 transition-all duration-300 ease-in-out md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(pathname === link.href ? "text-primary" : "")}
            >
              <h4>{link.label}</h4>
            </Link>
          ))}
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            <h4>Resume</h4>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
