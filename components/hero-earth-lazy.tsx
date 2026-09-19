"use client";

import dynamic from "next/dynamic";

// ssr:false must live in a client component (Next.js App Router rule).
// The globe is purely decorative — it never renders on the server and
// gets code-split out of the initial bundle.
const HeroEarthBackground = dynamic(
  () =>
    import("@/components/hero-earth-background").then(
      (mod) => mod.HeroEarthBackground
    ),
  { ssr: false }
);

export default function HeroEarthLazy() {
  return <HeroEarthBackground />;
}
