import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, TriangleAlert } from "lucide-react";
import {
  DESTINATION_SLUGS,
  DESTINATIONS,
  getDestinationBySlug,
  getDestinationHighlights,
} from "@/lib/destinations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination not found — Wander" };
  }

  const description = `Is ${destination.name} worth it? Honest pros and cons, the best places to visit, and what most travel sites won't tell you before you go.`;

  return {
    title: `${destination.name}, ${destination.country} Travel Guide — Wander`,
    description,
    alternates: { canonical: `/destinations/${destination.id}` },
    openGraph: {
      title: `${destination.name}, ${destination.country} — Wander Travel Guide`,
      description,
      images: [{ url: destination.heroImage, width: 800, height: 600 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.name} Travel Guide — Wander`,
      description,
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const highlights = getDestinationHighlights(destination);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    touristType: ["Cultural", "Adventure", "Food"],
    description: `Travel guide to ${destination.name}, ${destination.country}: honest pros, cons, and must-see places.`,
    image: destination.heroImage,
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.lat,
      longitude: destination.lng,
    },
    containsPlace: destination.places.map((place) => ({
      "@type": "TouristAttraction",
      name: place.name,
      description: place.description,
    })),
  };

  return (
    <main className="min-h-screen bg-[#030b19] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10">
        <Link
          href="/destinations"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All destinations
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
          <span aria-hidden className="text-3xl">
            {destination.flag}
          </span>
          <p className="flex items-center gap-1.5 tracking-[0.24em]">
            <MapPin className="h-3.5 w-3.5" />
            {destination.country.toUpperCase()}
          </p>
        </div>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {destination.name}
        </h1>

        <div className="relative mt-8 h-64 overflow-hidden rounded-2xl border border-white/10 md:h-80">
          <Image
            src={destination.heroImage}
            alt={`View of ${destination.name}, ${destination.country}`}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-300">
              <Check className="h-4 w-4" />
              Why go
            </h2>
            <ul className="space-y-2 text-sm text-white/75">
              {destination.pros.map((pro) => (
                <li key={pro} className="flex gap-2">
                  <span aria-hidden className="text-emerald-300">
                    •
                  </span>
                  {pro}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-red-400/20 bg-red-400/[0.06] p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-300">
              <TriangleAlert className="h-4 w-4" />
              Know before you go
            </h2>
            <ul className="space-y-2 text-sm text-white/75">
              {destination.cons.map((con) => (
                <li key={con} className="flex gap-2">
                  <span aria-hidden className="text-red-300">
                    •
                  </span>
                  {con}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Places that matter</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {destination.places.map((place) => (
              <article
                key={place.name}
                className="rounded-xl border border-white/10 bg-[#071225] p-4"
              >
                <h3 className="text-base font-semibold">
                  <span aria-hidden className="mr-2">
                    {place.icon}
                  </span>
                  {place.name}
                </h3>
                <p className="mt-1 text-sm text-white/60">{place.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-white/10 bg-[#081327] p-5">
          <h2 className="text-lg font-semibold">The Wander verdict</h2>
          <p className="mt-2 text-sm text-white/70">
            {destination.name} shines for travelers who value{" "}
            {highlights.join(", ").toLowerCase()}. Weigh the cons above against
            what you actually want from the trip — and if the crowds put you
            off, check the guides nearby for quieter alternatives.
          </p>
        </section>

        <nav className="mt-12 border-t border-white/10 pt-8" aria-label="More destinations">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Keep exploring
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DESTINATIONS.filter((d) => d.id !== destination.id).map((d) => (
              <Link
                key={d.id}
                href={`/destinations/${d.id}`}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/35 hover:text-white"
              >
                <span aria-hidden className="mr-1">
                  {d.flag}
                </span>
                {d.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
