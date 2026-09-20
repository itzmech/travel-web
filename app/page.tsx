import type { Metadata } from "next";
import { AtlasLanding } from "@/components/atlas-landing";
import { ATLAS_DISPATCHES, ATLAS_PLATES } from "@/lib/atlas-plates";

export const metadata: Metadata = {
  title: "The Atlas — Surveyor's Folio & Field Register",
  description:
    "An interactive cartographic folio: inspect expedition survey plates, waypoint annotations, curator dispatches, and deposit your own field observations.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Atlas — Surveyor's Folio & Field Register",
    description:
      "An interactive cartographic folio: inspect expedition survey plates, waypoint annotations, curator dispatches, and deposit your own field observations.",
    type: "website",
  },
};

export default function Home() {
  return <AtlasLanding plates={ATLAS_PLATES} dispatches={ATLAS_DISPATCHES} />;
}
