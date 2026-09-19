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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030b19] px-6 text-center text-white">
      <h1 className="text-2xl font-semibold">Turbulence ahead</h1>
      <p className="mt-2 max-w-md text-sm text-white/60">
        Something went wrong on our side. Give it another try.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-[#16dca6] px-5 py-2.5 text-sm font-semibold text-[#042617] transition hover:brightness-110"
      >
        Try again
      </button>
    </main>
  );
}
