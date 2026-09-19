import type { MetadataRoute } from "next";
import { DESTINATION_SLUGS } from "@/lib/destinations";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATION_SLUGS.map(
    (slug) => ({
      url: `${BASE_URL}/destinations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...destinationRoutes];
}
