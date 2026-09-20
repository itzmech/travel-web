import type { Metadata } from "next";
import { AtlasLanding } from "@/components/atlas-landing";
import { ATLAS_PLATES, FIELD_NOTES } from "@/lib/atlas-plates";

export const metadata: Metadata = {
  title: "The Atlas — Honest travel guides for 31 destinations",
  description:
    "Interactive travel folio: explore 31 destinations with honest pros, cons, curated sights, and coordinates. Auto-cycling survey plates with waypoint details.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Atlas — Honest travel guides for 31 destinations",
    description:
      "Interactive travel folio: explore 31 destinations with honest pros, cons, curated sights, and coordinates.",
    type: "website",
  },
};

export default function Home() {
  return <AtlasLanding plates={ATLAS_PLATES} notes={FIELD_NOTES} />;
}
