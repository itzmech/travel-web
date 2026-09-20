import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import {
  DESTINATIONS,
  DESTINATION_SLUGS,
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
    <main className="min-h-screen bg-deep text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 pt-12 md:px-10">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-w transition hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" />
          All destinations
        </Link>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted-w">
          <span aria-hidden className="text-2xl">
            {destination.flag}
          </span>
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {destination.country}
        </div>

        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          {destination.name}
        </h1>
      </div>

      <figure className="relative mt-8 h-[320px] w-full md:h-[440px]">
        <Image
          src={destination.heroImage}
          alt={`View of ${destination.name}, ${destination.country}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </figure>

      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
          <section className="md:pr-10">
            <h2 className="font-serif text-2xl">Why go</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-w">
              {destination.pros.map((pro, index) => (
                <li key={index} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                  />
                  {pro}
                </li>
              ))}
            </ul>
          </section>

          <section className="md:pl-10">
            <h2 className="font-serif text-2xl">Know before you go</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-w">
              {destination.cons.map((con, index) => (
                <li key={index} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-terra"
                  />
                  {con}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="font-serif text-2xl">Places that matter</h2>
          <ul className="mt-5 grid gap-x-12 sm:grid-cols-2">
            {destination.places.map((place) => (
              <li key={place.name} className="border-t border-border py-4">
                <h3 className="text-base font-semibold">
                  <span aria-hidden className="mr-2">
                    {place.icon}
                  </span>
                  {place.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-w">
                  {place.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 border-l-2 border-gold pl-6">
          <h2 className="font-serif text-2xl">The Wander verdict</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-w">
            {destination.name} shines for travelers who value{" "}
            {highlights.join(", ").toLowerCase()}. Weigh the pros above against
            what you actually want from the trip — and if the crowds put you
            off, check the guides nearby for quieter alternatives.
          </p>
        </section>

        <nav className="mt-14 border-t border-border pt-8" aria-label="More destinations">
          <h2 className="text-sm font-semibold">More places</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DESTINATIONS.filter((d) => d.id !== destination.id).map((d) => (
              <Link
                key={d.id}
                href={`/destinations/${d.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-w transition hover:border-teal hover:text-teal"
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
