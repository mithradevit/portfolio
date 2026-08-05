import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Source_Serif_4 } from "next/font/google";

export const sans = GeistSans;
export const mono = GeistMono;

export const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;
