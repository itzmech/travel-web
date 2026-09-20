import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030b19] px-6 text-center text-white">
      <p className="text-7xl font-bold text-white/15">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This destination drifted off the map</h1>
      <p className="mt-2 max-w-md text-sm text-white/60">
        The page you&apos;re looking for doesn&apos;t exist — but plenty of
        places still do.
      </p>
      <Link
        href="/destinations"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#16dca6] px-5 py-2.5 text-sm font-semibold text-[#042617] transition hover:brightness-110"
      >
        <Compass className="h-4 w-4" />
        Explore destinations
      </Link>
    </main>
  );
}
