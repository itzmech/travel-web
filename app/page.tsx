"use client";

import { useState } from "react";
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
    title: "Smart itinerary builder",
    description: "Generate day plans in seconds with route-aware scheduling.",
  },
  {
    title: "Budget visibility",
    description: "Track expected trip costs before you book flights and stays.",
  },
  {
    title: "Local insights",
    description: "Discover high-rated places and hidden gems by destination.",
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
    name: "Riya Sharma",
    role: "Solo Traveler",
    quote:
      "TripNova made planning my Europe trip incredibly easy. I saved time and stayed within budget.",
  },
  {
    name: "Arjun Patel",
    role: "Travel Vlogger",
    quote:
      "The destination suggestions were spot on. I discovered local places I would have never found myself.",
  },
  {
    name: "Sana Khan",
    role: "Family Planner",
    quote:
      "Simple, clean, and very practical. It helped me coordinate flights, stays, and activities for everyone.",
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
  const [earthView, setEarthView] = useState(false);

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

      <div
        className={`fixed inset-0 z-0 flex items-center justify-center opacity-90 ${
          earthView ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            earthView
              ? "h-[84vmin] w-[84vmin] min-h-[460px] min-w-[460px] max-h-[920px] max-w-[920px]"
              : "h-[72vmin] w-[72vmin] min-h-[380px] min-w-[380px] max-h-[760px] max-w-[760px]"
          }`}
        >
          <HeroEarthBackground interactive={earthView} zoomed={earthView} />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 opacity-85 md:px-10">
        <header className="flex items-center justify-between py-2">
          <div className="text-3xl font-extrabold tracking-wide text-yellow-300 md:text-4xl">
            TripNova
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEarthView((prev) => !prev)}
              className="rounded-full border border-yellow-300/40 bg-yellow-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-200 transition hover:bg-yellow-300/20"
            >
              {earthView ? "Back" : "Earth"}
            </button>
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

        {!earthView && (
          <>
            <section className="grid flex-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Plan exceptional travel with clarity and control.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
              A high-contrast modern travel platform for discovery, planning,
              and booking-ready itineraries. Built to keep your next trip
              organized from idea to takeoff.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
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
            <div className="mb-4 text-sm font-medium text-cyan-300">
              Why teams choose TripNova
            </div>
            <div id="features" className="space-y-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-black/15 p-4"
                >
                  <h2 className="text-base font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-sm text-white/65">
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
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Destinations people are visiting right now
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPlaces.map((place) => (
              <article
                key={place.name}
                className="rounded-2xl border border-white/10 bg-black/15 p-5 backdrop-blur"
              >
                <h3 className="text-base font-semibold text-white">{place.name}</h3>
                <p className="mt-2 text-sm text-white/65">{place.blurb}</p>
              </article>
            ))}
          </div>
            </section>

            <section id="reviews" className="py-12 md:py-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              Reviews
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              What our users say about us
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="text-sm leading-6 text-white/75">"{review.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-white">{review.name}</p>
                <p className="text-xs text-white/55">{review.role}</p>
              </article>
            ))}
          </div>
            </section>

            <section id="about" className="py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              About Us
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              We design travel experiences around real people
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              TripNova is built for travelers who want speed, confidence, and
              flexibility. Our mission is to simplify travel planning with
              intelligent tools and destination insights that help you decide
              faster and travel better.
            </p>
          </div>
            </section>

            <section id="contact" className="pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-300 md:text-base">
              Contact Us
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Let&apos;s plan your next journey
            </h2>
            <div className="mt-5 grid gap-3 text-sm text-white/75 md:grid-cols-3">
              <p>Email: hello@tripnova.com</p>
              <p>Phone: +91 90000 11111</p>
              <p>Location: Mumbai, India</p>
            </div>
          </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
