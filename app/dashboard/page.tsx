"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-deep px-6 py-10 text-paper md:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-w">
              Protected space. Only logged-in users can access this and other
              non-landing pages.
            </p>
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="rounded-lg border border-border bg-paper/[0.06] px-4 py-2 text-sm transition hover:bg-paper/10 disabled:opacity-70"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        <section className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          <article className="border-t border-gold/60 pt-4">
            <h2 className="text-base font-semibold">Trips in progress</h2>
            <p className="mt-2 font-serif text-4xl text-gold">7</p>
          </article>
          <article className="border-t border-gold/60 pt-4">
            <h2 className="text-base font-semibold">Upcoming departures</h2>
            <p className="mt-2 font-serif text-4xl text-gold">3</p>
          </article>
          <article className="border-t border-gold/60 pt-4">
            <h2 className="text-base font-semibold">Saved destinations</h2>
            <p className="mt-2 font-serif text-4xl text-gold">18</p>
          </article>
        </section>
      </div>
    </main>
  );
}
