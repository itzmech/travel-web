import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-deep px-6 text-center text-paper">
      <p className="font-serif text-7xl text-paper/15">404</p>
      <h1 className="mt-4 font-serif text-2xl">This destination drifted off the map</h1>
      <p className="mt-2 max-w-md text-sm text-muted-w">
        The page you&apos;re looking for doesn&apos;t exist — but plenty of
        places still do.
      </p>
      <Link
        href="/destinations"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-deep transition hover:bg-gold"
      >
        <Compass className="h-4 w-4" />
        Explore destinations
      </Link>
    </main>
  );
}
