"use client";

import dynamic from "next/dynamic";
import { Globe, Search } from "lucide-react";

const HeroEarthBackground = dynamic(
  () =>
    import("@/components/hero-earth-background").then(
      (mod) => mod.HeroEarthBackground
    ),
  { ssr: false }
);

const navItems = ["Explore", "Hidden Gems", "Guides", "Itineraries"];

const trending = [
  { name: "Santorini", country: "GREECE", tagA: "OVERRATED", tagB: "HIDDEN" },
  { name: "Ubud", country: "INDONESIA", tagA: "OVERRATED", tagB: "HIDDEN" },
  { name: "Kyoto", country: "JAPAN", tagA: "OVERRATED", tagB: "HIDDEN" },
];

const hiddenPlaces = [
  "Svaneti",
  "Faroe Islands",
  "Lofoten",
  "Gasadalur",
  "Matera",
  "Wadi Rum",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030b19] text-white">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(53,132,255,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-7 md:px-10 md:pb-24">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="h-4 w-4 text-white/90" />
              <span>Wander</span>
            </div>
            <nav className="hidden gap-7 text-xs text-white/80 md:flex">
              {navItems.map((item) => (
                <a key={item} href="#" className="transition hover:text-white">
                  {item}
                </a>
              ))}
            </nav>
            <button className="rounded-full border border-white/25 px-5 py-2 text-xs font-semibold hover:bg-white/10">
              Start Exploring
            </button>
          </header>

          <div className="relative mt-20 max-w-xl">
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Explore the world
            </h1>
            <p className="mt-6 text-sm text-white/65">
              Discover overrated traps and underrated gems for every destination
              on Earth.
            </p>
            <div className="mt-8 flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-[#0b1527] px-4 py-2.5">
              <Search className="h-4 w-4 text-white/40" />
              <input
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-[#16dca6] px-5 py-1.5 text-xs font-semibold text-[#042617]">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-44 bottom-[-330px] h-[760px] w-[760px] opacity-95">
          <HeroEarthBackground />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Trending destinations</h2>
          <div className="hidden items-center gap-2 md:flex">
            <button className="h-8 w-8 rounded-full border border-white/15 text-white/70">
              &#8592;
            </button>
            <button className="h-8 w-8 rounded-full border border-white/15 text-white/70">
              &#8594;
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trending.map((item, index) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#071225]"
            >
              <div
                className={`h-40 bg-gradient-to-br ${
                  index === 0
                    ? "from-amber-300/80 via-orange-500/40 to-slate-900"
                    : index === 1
                      ? "from-lime-200/60 via-emerald-600/30 to-slate-900"
                      : "from-orange-200/70 via-red-700/40 to-slate-900"
                }`}
              />
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold">
                  <span className="rounded-full bg-[#ff4f4f] px-2 py-0.5 text-white">
                    {item.tagA}
                  </span>
                  <span className="rounded-full bg-[#16dca6] px-2 py-0.5 text-[#053523]">
                    {item.tagB}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.24em] text-white/45">
                  {item.country}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{item.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#040d1d]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
          <h2 className="mb-8 text-center text-4xl font-semibold">
            Places the internet forgot
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {hiddenPlaces.map((place) => (
              <article
                key={place}
                className="rounded-xl border border-white/10 bg-[#081327] p-4"
              >
                <p className="text-sm font-semibold">{place}</p>
                <p className="mt-1 text-xs text-white/55">
                  Ancient trails, dramatic views, and culture you can still
                  experience without crowds.
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="rounded-full bg-[#16dca620] px-2 py-1 text-[#2ce7b6]">
                    3h, by AI
                  </span>
                  <button className="text-white/70 hover:text-white">
                    READ GUIDE
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center md:px-10">
        <h2 className="text-5xl font-semibold">Plan your perfect trip with AI</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">
          Let our AI travel expert craft a deeply personalized itinerary based on
          the hidden gems you actually want to see.
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl gap-2 rounded-xl border border-white/10 bg-[#081328] p-2 md:grid-cols-4">
          <div className="rounded-lg bg-[#0a1630] px-4 py-3 text-left">
            <p className="text-[10px] text-white/45">WHERE TO?</p>
            <p className="text-sm font-semibold">Anywhere in Europe</p>
          </div>
          <div className="rounded-lg bg-[#0a1630] px-4 py-3 text-left">
            <p className="text-[10px] text-white/45">HOW LONG?</p>
            <p className="text-sm font-semibold">14 Days</p>
          </div>
          <div className="rounded-lg bg-[#0a1630] px-4 py-3 text-left">
            <p className="text-[10px] text-white/45">VIBE</p>
            <p className="text-sm font-semibold">Culture & Food</p>
          </div>
          <button className="rounded-lg bg-[#16dca6] px-4 py-3 text-sm font-semibold text-[#033725]">
            Generate Itinerary
          </button>
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
              Stop blindly booking trips. Expose the world beyond the obvious and
              discover hidden gems that matter.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">PRODUCT</p>
            <ul className="space-y-1">
              <li>Destinations</li>
              <li>AI Planner</li>
              <li>Pro Guides</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">COMPANY</p>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold text-white">LEGAL</p>
            <ul className="space-y-1">
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
