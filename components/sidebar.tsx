"use client";

import { useState } from "react";
import { Search, TrendingUp, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DESTINATIONS, type Destination } from "@/lib/destinations";

interface SidebarProps {
  onSelectDestination: (dest: Destination) => void;
}

// TODO: Replace with API call to fetch trending destinations
const TRENDING_DESTINATIONS = [
  "Tokyo",
  "Paris",
  "Bali",
  "Dubai",
  "Santorini",
];

export function Sidebar({ onSelectDestination }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // TODO: Replace with API call
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
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-white/10 bg-[#0a0a0f]/80 p-6 backdrop-blur-lg md:flex">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <Globe2 className="h-8 w-8 text-[#4F8EF7]" />
        <h1 className="text-xl font-bold text-white">Wanderlust</h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 focus:border-[#4F8EF7]"
        />

        {/* Search Results Dropdown */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-[#0f0f14] shadow-xl">
            {searchResults.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleSelectFromSearch(dest)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-white/5"
              >
                <span>{dest.flag}</span>
                <div>
                  <p className="text-sm font-medium text-white">{dest.name}</p>
                  <p className="text-xs text-white/50">{dest.country}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {isSearching && searchResults.length === 0 && searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-white/10 bg-[#0f0f14] p-4 text-center text-sm text-white/50">
            No destinations found
          </div>
        )}
      </div>

      {/* Trending Destinations */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
          <TrendingUp className="h-4 w-4 text-[#FFD166]" />
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
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
        <p className="text-xs text-white/30">
          {DESTINATIONS.length} destinations worldwide
        </p>
      </div>
    </aside>
  );
}
