import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DestinationSearch } from "@/components/destination-search";
import HeroEarthLazy from "@/components/hero-earth-lazy";
import { DESTINATIONS } from "@/lib/destinations";

const navItems = [
  { label: "All cities", href: "/destinations" },
  { label: "Lesser-known", href: "/#lesser-known" },
];

const featuredIds = ["santorini", "bali", "tokyo"];
const featured = featuredIds.map(
  (id) => DESTINATIONS.find((d) => d.id === id)!
);

const lesserKnown = [
  {
    name: "Svaneti",
    country: "Georgia",
    detail:
      "Stone watchtowers above the Caucasus — reachable by a winding mountain road from Kutaisi.",
  },
  {
    name: "Faroe Islands",
    country: "Denmark",
    detail:
      "Grass-roofed villages on cliffs; book the Mykines ferry weeks ahead in summer.",
  },
  {
    name: "Lofoten",
    country: "Norway",
    detail:
      "Arctic beaches and cod-drying racks; rent a car in Svolvær and drive the E10.",
  },
  {
    name: "Gásadalur",
    country: "Faroe Islands",
    detail:
      "Múlafossur falls drop straight into the Atlantic — the village got its first road in 2004.",
  },
  {
    name: "Matera",
    country: "Italy",
    detail:
      "Sassi cave dwellings carved into limestone; stay in a converted grotto hotel.",
  },
  {
    name: "Wadi Rum",
    country: "Jordan",
    detail:
      "Red sandstone valleys; most visitors camp one night with a Bedouin guide from the village.",
  },
];

export const metadata: Metadata = {
  title: "Wander — City guides that name the crowds and the corners",
  description:
    "Practical guides to 30 cities: when to visit, what to skip, and the neighborhoods worth a half-day.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wander — City guides that name the crowds and the corners",
    description:
      "Pros, cons, and specific places for 30 cities — Paris, Tokyo, Bali, and more.",
    type: "website",
  },
};

export default function Home() {
  const [lead, ...rest] = featured;

  return (
    <main className="min-h-screen bg-deep text-paper">
      <section className="relative border-b border-border">
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-8 md:px-10 md:pb-32">
          <header className="flex items-center justify-between">
            <Link href="/" className="font-serif text-lg tracking-tight">
              Wander
            </Link>
            <nav className="hidden gap-8 text-sm text-muted-w md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/destinations"
              className="text-sm text-teal hover:underline"
            >
              Browse guides
            </Link>
          </header>

          <div className="hero-in relative mt-16 max-w-xl md:mt-24">
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight md:text-[3.75rem]">
              Thirty cities, written like you&apos;d ask a friend who lives
              there.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-w">
              We note the rush-hour crush in Tokyo, the cruise-ship days in
              Santorini, and the rice-terrace walks in Bali that most day tours
              skip.
            </p>
            <div className="mt-8">
              <DestinationSearch />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[-120px] top-20 hidden h-[580px] w-[580px] opacity-90 md:block">
          <HeroEarthLazy />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">
            Three cities people keep opening
          </h2>
          <Link
            href="/destinations"
            className="text-sm text-teal hover:underline"
          >
            All {DESTINATIONS.length} guides
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <Link
            href={`/destinations/${lead.id}`}
            className="group md:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-[420px]">
              <Image
                src={lead.heroImage}
                alt={`${lead.name}, ${lead.country}`}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-6 pt-16">
                <p className="text-sm text-muted-w">{lead.country}</p>
                <h3 className="mt-1 font-serif text-3xl">{lead.name}</h3>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-6 md:col-span-5 md:justify-end">
            {rest.map((item) => (
              <Link
                key={item.id}
                href={`/destinations/${item.id}`}
                className="group flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                  <Image
                    src={item.heroImage}
                    alt={`${item.name}, ${item.country}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="py-1">
                  <p className="text-sm text-muted-w">{item.country}</p>
                  <h3 className="mt-0.5 font-serif text-xl">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-w">
                    {item.pros[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="lesser-known"
        className="border-y border-border bg-paper/[0.04]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="max-w-lg font-serif text-3xl md:text-4xl">
            Six places that rarely make the front page of a guidebook
          </h2>
          <p className="mt-4 max-w-xl text-muted-w">
            Not a bucket list — just corners we mention when someone asks for
            somewhere quieter than Barcelona or cheaper than Reykjavik.
          </p>

          <ul className="mt-12 divide-y divide-border md:columns-2 md:gap-x-16">
            {lesserKnown.map((place) => (
              <li key={place.name} className="break-inside-avoid py-6 first:pt-0">
                <h3 className="font-serif text-xl">
                  {place.name}
                  <span className="ml-2 text-base font-sans font-normal text-muted-w">
                    {place.country}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-w">
                  {place.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">
            Read before you book the flight
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-w">
            Each guide lists five places we&apos;d actually walk to, four things
            that might ruin your week if you ignore them, and the months when
            the weather and the crowds align.
          </p>
          <Link
            href="/destinations"
            className="mt-8 inline-block border-b border-teal pb-0.5 text-teal hover:text-paper hover:border-paper"
          >
            Open the full list of {DESTINATIONS.length} cities
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 text-sm text-muted-w md:grid-cols-3">
          <div>
            <p className="font-serif text-lg text-paper">Wander</p>
            <p className="mt-3 leading-relaxed">
              City guides with the boring parts included — visa hassles, rainy
              seasons, and the museum that&apos;s closed on Mondays.
            </p>
          </div>
          <div>
            <p className="text-paper">Guides</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/destinations" className="hover:text-paper">
                  All cities
                </Link>
              </li>
              <li>
                <Link href="/#lesser-known" className="hover:text-paper">
                  Lesser-known places
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-paper">Often opened</p>
            <ul className="mt-3 space-y-2">
              {["paris", "tokyo", "rome"].map((id) => {
                const d = DESTINATIONS.find((dest) => dest.id === id)!;
                return (
                  <li key={id}>
                    <Link
                      href={`/destinations/${id}`}
                      className="hover:text-paper"
                    >
                      {d.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
