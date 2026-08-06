import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the project root explicitly — an unrelated package.json sitting in
  // C:\Users\Dell (a stray 2023 create-react-app leftover) was confusing
  // Next.js's and Netlify's workspace-root auto-detection.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Next 16 only allows quality 75 unless listed here. Project thumbnails are
    // flat-colour UI art, which is exactly what lossy compression smears — they
    // opt into 90 while everything else stays on the cheaper default.
    qualities: [75, 90],
  },
};

export default nextConfig;
