"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-deep px-6 text-center text-paper">
      <h1 className="font-serif text-2xl">Turbulence ahead</h1>
      <p className="mt-2 max-w-md text-sm text-muted-w">
        Something went wrong on our side. Give it another try.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-deep transition hover:bg-gold"
      >
        Try again
      </button>
    </main>
  );
}
