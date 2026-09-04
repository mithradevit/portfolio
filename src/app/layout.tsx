import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ChatOpenProvider } from "@/components/chat/ChatOpenContext";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { VinylPlayer } from "@/components/layout/VinylPlayer";

/** Shared by the Open Graph and Twitter cards. Deliberately shorter than the
 *  document title: a link preview truncates, and without an explicit og:title
 *  scrapers fall back to the first heading — which here is the scrambling one,
 *  so the card read as spaced-out letters followed by the same words again. */
const SHARE_TITLE = "Mithra | Senior Product Designer";

export const metadata: Metadata = {
  // Required for the card image to resolve to an absolute URL — scrapers
  // cannot follow a relative one.
  metadataBase: new URL("https://mithradevi.site"),
  title: `${profile.name} | ${profile.title}`,
  description: profile.bio[0],
  authors: [{ name: profile.name }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: SHARE_TITLE,
    description: profile.bio[0],
    url: "/",
  },
  twitter: {
    // The wide card: the image is a 1200×630 canvas with the photo set whole
    // inside it, so no platform's crop can cut into the picture itself.
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: profile.bio[0],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

/**
 * Applies the saved theme before first paint.
 *
 * This has to be a blocking inline script in <head>: any React-based approach
 * runs after hydration, by which point the browser has already painted the
 * default theme and a dark-mode visitor sees a white flash.
 */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `data-scroll-behavior="smooth"` is Next's required opt-in when the html
    // element sets `scroll-behavior: smooth` (globals.css). Without it Next
    // warns, and route changes animate the whole page back to the top instead
    // of jumping — the attribute lets the router force an instant reset while
    // in-page anchor links stay smooth.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <MotionConfig reducedMotion="user">
          <ChatOpenProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* The nav carries a chat button at every breakpoint now, so the
                old fixed mobile button would be a second entry point for the
                same panel. */}
            <ChatPanel />
            {/* In the layout rather than a page: it renders on every route, and
                because the layout does not remount on navigation, a track keeps
                playing while the visitor moves around the site. */}
            <VinylPlayer />
          </ChatOpenProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
