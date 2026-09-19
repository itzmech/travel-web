import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { DestinationSearch } from "@/components/destination-search";
import HeroEarthLazy from "@/components/hero-earth-lazy";
import { DESTINATIONS } from "@/lib/destinations";

const navItems = [
  { label: "Destinations", href: "/destinations" },
  { label: "Hidden Gems", href: "/destinations#hidden-gems" },
  { label: "Guides", href: "/destinations#guides" },
  { label: "Itineraries", href: "/destinations#itineraries" },
];

// Drawn from the destinations dataset instead of a separate hardcoded list.
const trendingIds = ["santorini", "bali", "tokyo"];
const trending = trendingIds.map(
  (id) => DESTINATIONS.find((d) => d.id === id)!
);

const hiddenPlaces = [
  { name: "Svaneti", teaser: "Medieval watchtowers in the Caucasus — Georgia's wildest region." },
  { name: "Faroe Islands", teaser: "Grass-roofed villages above the North Atlantic." },
  { name: "Lofoten", teaser: "Arctic surfing and midnight sun in northern Norway." },
  { name: "Gásadalur", teaser: "A waterfall-plunging village only road-connected since 2004." },
  { name: "Matera", teaser: "Cave dwellings inhabited for 9,000 years in southern Italy." },
  { name: "Wadi Rum", teaser: "Martian desert valleys best explored by camel or balloon." },
];

export const metadata: Metadata = {
  title: "Wander — Explore the world beyond the obvious",
  description:
    "Discover overrated traps and underrated hidden gems for every destination on Earth. Honest travel guides with pros, cons, and the places that matter.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wander — Explore the world beyond the obvious",
    description:
      "Honest travel guides: overrated traps vs. hidden gems for 30 destinations worldwide.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030b19] text-white">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(53,132,255,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-7 md:px-10 md:pb-24">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Globe className="h-4 w-4 text-white/90" />
              <span>Wander</span>
            </Link>
            <nav className="hidden gap-7 text-xs text-white/80 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/destinations"
              className="rounded-full border border-white/25 px-5 py-2 text-xs font-semibold transition hover:bg-white/10"
            >
              Start Exploring
            </Link>
          </header>

          <div className="relative mt-20 max-w-xl">
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Explore the world
            </h1>
            <p className="mt-6 text-sm text-white/65">
              Discover overrated traps and underrated gems for every destination
              on Earth.
            </p>
            <div className="mt-8">
              <DestinationSearch />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[-140px] top-24 hidden h-[620px] w-[620px] opacity-95 md:block">
          <HeroEarthLazy />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Trending destinations</h2>
          <Link
            href="/destinations"
            className="hidden text-xs text-white/60 transition hover:text-white md:block"
          >
            View all {DESTINATIONS.length} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trending.map((item) => (
            <Link
              key={item.id}
              href={`/destinations/${item.id}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-[#071225] transition hover:border-white/25"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.heroImage}
                  alt={`${item.name}, ${item.country}`}
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-[10px] tracking-[0.24em] text-white/45">
                  {item.country.toUpperCase()}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">
                  <span aria-hidden className="mr-1.5">
                    {item.flag}
                  </span>
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="hidden-gems"
        className="border-y border-white/5 bg-[#040d1d]"
      >
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
          <h2 className="mb-8 text-center text-4xl font-semibold">
            Places the internet forgot
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {hiddenPlaces.map((place) => (
              <article
                key={place.name}
                className="rounded-xl border border-white/10 bg-[#081327] p-4"
              >
                <p className="text-sm font-semibold">{place.name}</p>
                <p className="mt-1 text-xs text-white/55">{place.teaser}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="itineraries" className="mx-auto max-w-6xl px-6 py-16 text-center md:px-10">
        <h2 className="text-5xl font-semibold">Plan your perfect trip</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">
          Start from an honest destination guide — the pros, the cons, and the
          places actually worth your time.
        </p>
        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-white/10 bg-[#081328] p-6">
          <p className="text-sm text-white/70">
            Pick a place to begin — every guide includes what to see, what to
            skip, and when to go.
          </p>
          <Link
            href="/destinations"
            className="mt-5 inline-block rounded-lg bg-[#16dca6] px-6 py-3 text-sm font-semibold text-[#033725] transition hover:brightness-110"
          >
            Browse destinations
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 text-sm text-white/65 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold text-white">
              <Globe className="h-4 w-4" />
              <span>Wander</span>
            </div>
            <p>
              Stop blindly booking trips. Expose the world beyond the obvious
              and discover hidden gems that matter.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">PRODUCT</p>
            <ul className="space-y-1">
              <li>
                <Link href="/destinations" className="transition hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/destinations#hidden-gems" className="transition hover:text-white">
                  Hidden Gems
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">POPULAR GUIDES</p>
            <ul className="space-y-1">
              {["paris", "tokyo", "rome"].map((id) => {
                const d = DESTINATIONS.find((dest) => dest.id === id)!;
                return (
                  <li key={id}>
                    <Link
                      href={`/destinations/${id}`}
                      className="transition hover:text-white"
                    >
                      {d.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">LEGAL</p>
            <ul className="space-y-1 text-white/45">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
