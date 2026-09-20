import type { Metadata } from "next";
import { AtlasExplore } from "@/components/atlas-explore";
import { ATLAS_PLATES, FIELD_NOTES } from "@/lib/atlas-plates";

export const metadata: Metadata = {
  title: "Explore All — The full destination register",
  description:
    "Slide through the full register of 31 destinations: honest pros and cons, curated sights, coordinates, and trip planning for every guide in the Atlas.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore All — The full destination register",
    description:
      "Slide through the full register of 31 destinations: honest pros and cons, curated sights, coordinates, and trip planning.",
    type: "website",
  },
};

export default function ExplorePage() {
  return <AtlasExplore plates={ATLAS_PLATES} notes={FIELD_NOTES} />;
}
