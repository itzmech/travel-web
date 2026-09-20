"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "Unable to login. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-6 text-paper">
      <div className="w-full max-w-md p-7">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-muted-w">
            Enter your credentials to access saved places and trips.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted-w">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-paper/20 bg-paper/[0.04] px-3 py-2 text-sm outline-none focus:border-teal placeholder:text-muted-w"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-w">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-paper/20 bg-paper/[0.04] px-3 py-2 text-sm outline-none focus:border-teal placeholder:text-muted-w"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="rounded-md border border-terra/20 bg-terra/[0.06] px-3 py-2 text-sm text-terra">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-deep transition hover:bg-terra disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-muted-w hover:text-teal"
        >
          Back to guides
        </Link>
      </div>
    </main>
  );
}
