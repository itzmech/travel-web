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

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07090f] text-white">
      <div className="pointer-events-none absolute -right-24 top-1/2 z-0 h-[34rem] w-[34rem] -translate-y-1/2 opacity-70 md:h-[42rem] md:w-[42rem]">
        <HeroEarthBackground />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 md:px-10">
        <header className="flex items-center justify-between py-2">
          <div className="text-lg font-semibold tracking-wide text-white/90">
            TripNova
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Login
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 inline-block rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
              Dark Experience
            </p>
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
                className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
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

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-4 text-sm font-medium text-cyan-200">
              Why teams choose TripNova
            </div>
            <div id="features" className="space-y-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
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
      </div>
    </main>
  );
}
