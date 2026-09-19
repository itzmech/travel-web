const DEFAULT_SITE_URL = "https://wander.example.com";

/** Canonical site origin for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured;

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return DEFAULT_SITE_URL;
}
