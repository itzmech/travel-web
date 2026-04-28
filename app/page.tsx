"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const HeroEarthBackground = dynamic(
  () =>
    import("@/components/hero-earth-background").then(
      (mod) => mod.HeroEarthBackground
    ),
  { ssr: false }
);

const features = [
  {
    title: "AI itinerary planning",
    description: "Build optimized day-by-day plans with realistic travel timing.",
  },
  {
    title: "Budget confidence",
    description: "Preview spend across flights, stays, and activities before booking.",
  },
  {
    title: "Local recommendations",
    description: "Get curated hotspots and lesser-known places worth visiting.",
  },
];

const popularPlaces = [
  { name: "Bali, Indonesia", blurb: "Beach sunsets, temples, and island nightlife." },
  { name: "Paris, France", blurb: "Iconic city walks, cafes, and timeless landmarks." },
  { name: "Dubai, UAE", blurb: "Luxury stays, desert adventures, and skyline views." },
  { name: "Tokyo, Japan", blurb: "Modern culture, food streets, and historic shrines." },
  { name: "Santorini, Greece", blurb: "White villages, sea cliffs, and romantic evenings." },
  { name: "Swiss Alps", blurb: "Snow peaks, scenic trains, and alpine villages." },
];

const reviews = [
  {
    name: "Riya S.",
    role: "Solo traveler",
    quote:
      "Wander helped me plan a 10-day Europe route in one evening and I stayed on budget.",
  },
  {
    name: "Arjun P.",
    role: "Travel creator",
    quote:
      "The destination suggestions were accurate and gave me places I would have missed myself.",
  },
  {
    name: "Sana K.",
    role: "Family planner",
    quote:
      "Clean, practical, and fast. It made flights, hotels, and activities easy to coordinate.",
  },
];

const shootingStars = [
  { top: "14%", left: "8%", delay: "0s", duration: "5.5s" },
  { top: "22%", left: "58%", delay: "1.4s", duration: "6.2s" },
  { top: "36%", left: "28%", delay: "2.1s", duration: "5.8s" },
  { top: "48%", left: "72%", delay: "3.3s", duration: "6.8s" },
  { top: "62%", left: "16%", delay: "0.9s", duration: "6.4s" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07090f] text-white">
      <div className="space-stars pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0">
        {shootingStars.map((star) => (
          <span
            key={`${star.top}-${star.left}`}
            className="shooting-star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-90">
        <div className="h-[72vmin] w-[72vmin] min-h-[380px] min-w-[380px] max-h-[760px] max-w-[760px]">
          <HeroEarthBackground />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 opacity-[0.96] md:px-10">
        <header className="flex items-center justify-between py-2">
          <div className="text-3xl font-extrabold tracking-wide text-cyan-300 md:text-4xl">
            Wander
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#about"
              className="hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.12] md:inline-flex"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="hidden rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.12] md:inline-flex"
            >
              Contact Us
            </a>
            <Link
              href="/login"
              className="rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-sm font-medium text-white transition hover:bg-white/[0.16]"
            >
              Login
            </Link>
          </div>
        </header>

        <>
          <section className="grid flex-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Discover your next journey with confidence.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
              Wander is your modern travel frontend for exploring destinations,
              comparing options, and generating practical trip plans in minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.01] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-4 text-base font-semibold text-cyan-300 md:text-lg">
              Why travelers choose Wander
            </div>
            <div id="features" className="space-y-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-black/15 p-4"
                >
                  <h2 className="text-lg font-semibold md:text-xl">{feature.title}</h2>
                  <p className="mt-2 text-base text-white/65">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          </section>

          <section id="popular-places" className="py-12 md:py-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              Popular Places
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Popular destinations right now
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPlaces.map((place) => (
              <article
                key={place.name}
                className="rounded-2xl border border-white/10 bg-black/15 p-5 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white md:text-xl">{place.name}</h3>
                <p className="mt-2 text-base text-white/65">{place.blurb}</p>
              </article>
            ))}
          </div>
          </section>

          <section id="reviews" className="py-12 md:py-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              Reviews
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              What users say about Wander
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="text-lg leading-8 text-white/80">"{review.quote}"</p>
                <p className="mt-4 text-base font-semibold text-white md:text-lg">{review.name}</p>
                <p className="text-sm text-white/55">{review.role}</p>
              </article>
            ))}
          </div>
          </section>

          <section id="about" className="py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              About Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Designed for real travel decisions
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Wander helps travelers move from inspiration to clear plans. We
              combine smart trip guidance with destination intelligence so you
              can make faster decisions and travel with less uncertainty.
            </p>
          </div>
          </section>

          <section id="contact" className="pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              Contact Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Let&apos;s plan your next journey
            </h2>
            <div className="mt-5 grid gap-3 text-base text-white/75 md:grid-cols-3 md:text-lg">
              <p>Email: hello@wander.com</p>
              <p>Phone: +91 90000 11111</p>
              <p>Location: Mumbai, India</p>
            </div>
          </div>
          </section>
        </>
      </div>
    </main>
  );
}
