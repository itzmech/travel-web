"use client";

import { useMemo, useState } from "react";
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
      <div className="flex items-center gap-3 border-b border-border bg-paper/[0.04] px-1 py-3">
        <Search className="h-4 w-4 shrink-0 text-muted-w" />
        <input
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-label="Search destinations"
          placeholder="Try Paris, Kyoto, or Marrakech"
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
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-w"
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-muted-w hover:text-paper"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full border border-border bg-deep">
          {results.map((destination) => (
            <li key={destination.id}>
              <button
                onClick={() => go(destination)}
                className="flex w-full items-baseline gap-3 px-3 py-3 text-left text-sm hover:bg-paper/10"
              >
                <span className="font-medium text-paper">{destination.name}</span>
                <span className="text-muted-w">{destination.country}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
