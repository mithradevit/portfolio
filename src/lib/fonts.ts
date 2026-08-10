import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Source_Serif_4, Instrument_Serif } from "next/font/google";

export const sans = GeistSans;
export const mono = GeistMono;

export const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// cindyly.design's headings use "EditorialNew" (PP Editorial New) — a paid
// Pangram Pangram font, not something to pull into someone else's site
// without a licence. Instrument Serif is the closest free equivalent: same
// high-contrast, calligraphic-italic register as that PP Editorial New /
// Reckless family of display serifs.
export const editorial = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable} ${editorial.variable}`;
