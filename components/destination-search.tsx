"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import { DESTINATIONS, type Destination } from "@/lib/destinations";

export function DestinationSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];

    return new Fuse(DESTINATIONS, {
      keys: ["name", "country"],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    })
      .search(trimmed)
      .slice(0, 6)
      .map((result) => result.item);
  }, [query]);

  const go = (destination: Destination) => {
    setOpen(false);
    setQuery("");
    router.push(`/destinations/${destination.id}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1527] px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-white/40" />
        <input
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-label="Search destinations"
          placeholder="Where do you want to go?"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && results[0]) {
              go(results[0]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-white/40 transition hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b1527] shadow-2xl shadow-black/50">
          {results.map((destination) => (
            <li key={destination.id}>
              <button
                onClick={() => go(destination)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/10"
              >
                <span aria-hidden>{destination.flag}</span>
                <span className="font-medium">{destination.name}</span>
                <span className="text-xs text-white/45">
                  {destination.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
