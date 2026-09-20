import type { Metadata } from "next";
import { AtlasExplore } from "@/components/atlas-explore";
import { ATLAS_DISPATCHES, ATLAS_PLATES } from "@/lib/atlas-plates";

export const metadata: Metadata = {
  title: "The Grand Survey — Complete Plate Register",
  description:
    "Slide through the full register of 31 survey plates: waypoint annotations, expedition dossiers, and instrument logs for every destination in the Atlas archive.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "The Grand Survey — Complete Plate Register",
    description:
      "Slide through the full register of 31 survey plates: waypoint annotations, expedition dossiers, and instrument logs for every destination in the Atlas archive.",
    type: "website",
  },
};

export default function ExplorePage() {
  return <AtlasExplore plates={ATLAS_PLATES} dispatches={ATLAS_DISPATCHES} />;
}
