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
    <main className="min-h-screen bg-[#07090f] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm text-white/60">
              Protected space. Only logged-in users can access this and other
              non-landing pages.
            </p>
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20 disabled:opacity-70"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-base font-semibold">Trips in progress</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-300">7</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-base font-semibold">Upcoming departures</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-300">3</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-base font-semibold">Saved destinations</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-300">18</p>
          </article>
        </section>
      </div>
    </main>
  );
}
