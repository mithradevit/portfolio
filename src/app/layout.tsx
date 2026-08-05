import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ChatOpenProvider } from "@/components/chat/ChatOpenContext";
import { ChatButton } from "@/components/chat/ChatButton";
import { ChatPanel } from "@/components/chat/ChatPanel";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.title}`,
  description: profile.bio[0],
  authors: [{ name: profile.name }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#fafcfd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <MotionConfig reducedMotion="user">
          <ChatOpenProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatButton variant="mobile" />
            <ChatPanel />
          </ChatOpenProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
