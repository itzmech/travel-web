import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "All Destinations — Wander",
  description:
    "Browse every Wander destination guide: honest pros and cons, must-see places, and hidden gems for 30 cities worldwide.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsIndexPage() {
  return (
    <main className="min-h-screen bg-[#030b19] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          All destinations
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          {DESTINATIONS.length} city guides with honest pros, cons, and the
          places actually worth your time.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-[#071225] transition hover:border-white/25"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={destination.heroImage}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="flex items-center gap-1.5 text-[10px] tracking-[0.24em] text-white/45">
                  <MapPin className="h-3 w-3" />
                  {destination.country.toUpperCase()}
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  <span aria-hidden className="mr-1.5">
                    {destination.flag}
                  </span>
                  {destination.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
