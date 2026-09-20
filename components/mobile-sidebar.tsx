"use client";

import { useState } from "react";
import { Search, TrendingUp, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DESTINATIONS, type Destination } from "@/lib/destinations";

interface MobileSidebarProps {
  onSelectDestination: (dest: Destination) => void;
}

const TRENDING_DESTINATIONS = ["Tokyo", "Paris", "Bali", "Dubai", "Santorini"];

export function MobileSidebar({ onSelectDestination }: MobileSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = DESTINATIONS.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query.toLowerCase()) ||
          dest.country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSelectFromSearch = (dest: Destination) => {
    onSelectDestination(dest);
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleTrendingClick = (name: string) => {
    const dest = DESTINATIONS.find(
      (d) => d.name.toLowerCase() === name.toLowerCase()
    );
    if (dest) {
      onSelectDestination(dest);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <Globe2 className="h-8 w-8 text-teal" />
        <h1 className="font-serif text-xl text-paper">Wander</h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-w" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-border bg-paper/[0.05] pl-10 text-paper placeholder:text-muted-w focus:border-teal"
        />

        {isSearching && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-border bg-deep shadow-xl">
            {searchResults.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleSelectFromSearch(dest)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-paper/10"
              >
                <span>{dest.flag}</span>
                <div>
                  <p className="text-sm font-medium text-paper">{dest.name}</p>
                  <p className="text-xs text-muted-w">{dest.country}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {isSearching && searchResults.length === 0 && searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-border bg-deep p-4 text-center text-sm text-muted-w">
            No destinations found
          </div>
        )}
      </div>

      {/* Trending */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-w">
          <TrendingUp className="h-4 w-4 text-gold" />
          Trending
        </h2>
        <ul className="space-y-1">
          {TRENDING_DESTINATIONS.map((name) => {
            const dest = DESTINATIONS.find(
              (d) => d.name.toLowerCase() === name.toLowerCase()
            );
            return (
              <li key={name}>
                <button
                  onClick={() => handleTrendingClick(name)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-w transition-colors hover:bg-paper/10 hover:text-paper"
                >
                  <span>{dest?.flag || "🌍"}</span>
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="text-xs text-muted-w/70">
          {DESTINATIONS.length} destinations worldwide
        </p>
      </div>
    </div>
  );
}
