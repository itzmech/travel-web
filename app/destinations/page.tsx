import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DESTINATIONS } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "All cities",
  description:
    "30 city guides with specific pros, cons, and places — from Paris to Mumbai.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsIndexPage() {
  return (
    <main className="min-h-screen bg-deep text-paper">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
        <Link
          href="/"
          className="text-sm text-muted-w hover:text-teal hover:underline"
        >
          Home
        </Link>

        <h1 className="mt-8 font-serif text-4xl tracking-tight md:text-5xl">
          All cities
        </h1>
        <p className="mt-3 max-w-xl text-muted-w">
          {DESTINATIONS.length} guides — each covers when to go, what to skip,
          and five places we&apos;d walk to on a free afternoon.
        </p>

        <ul className="mt-14 space-y-2">
          {DESTINATIONS.map((destination, index) => (
            <li key={destination.id}>
              <Link
                href={`/destinations/${destination.id}`}
                className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-6"
              >
                {index % 3 === 0 ? (
                  <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-40 sm:w-60">
                    <Image
                      src={destination.heroImage}
                      alt={destination.name}
                      fill
                      sizes="(min-width: 640px) 240px, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={destination.heroImage}
                      alt={destination.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-w">{destination.country}</p>
                  <h2 className="mt-0.5 font-serif text-2xl group-hover:text-teal">
                    {destination.name}
                  </h2>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-w">
                    {destination.pros[0]}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
