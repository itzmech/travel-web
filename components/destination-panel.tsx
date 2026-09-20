"use client";

import Link from "next/link";
import { X, Check, AlertTriangle, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Destination } from "@/lib/destinations";

interface DestinationPanelProps {
  destination: Destination | null;
  onClose: () => void;
}

// TODO: Replace with API call to fetch destination details
export function DestinationPanel({ destination, onClose }: DestinationPanelProps) {
  if (!destination) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        onClick={onClose}
      />

      {/* Panel - Side panel on desktop, bottom sheet on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[420px]">
        <div className="flex h-full flex-col rounded-t-3xl border border-border bg-deep/95 backdrop-blur-xl md:rounded-none md:rounded-l-3xl">
          {/* Header */}
          <div className="relative h-48 w-full overflow-hidden rounded-t-3xl md:rounded-none md:rounded-tl-3xl">
            <img
              src={destination.heroImage}
              alt={`View of ${destination.name}, ${destination.country}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5 text-paper" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{destination.flag}</span>
                <h2 className="font-serif text-2xl text-paper">{destination.name}</h2>
              </div>
              <p className="text-sm text-paper/70">{destination.country}</p>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            {/* Pros Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal">
                <Check className="h-4 w-4" />
                Why go
              </h3>
              <ul className="space-y-2">
                {destination.pros.map((pro, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-paper/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-terra">
                <AlertTriangle className="h-4 w-4" />
                Know before you go
              </h3>
              <ul className="space-y-2">
                {destination.cons.map((con, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-paper/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terra" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            {/* Places to Visit */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
                <MapPin className="h-4 w-4" />
                Places that matter
              </h3>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {destination.places.map((place, index) => (
                  <div
                    key={index}
                    className="w-36 flex-shrink-0 border-t border-border pt-3"
                  >
                    <div className="mb-2 text-2xl">{place.icon}</div>
                    <h4 className="mb-1 text-sm font-medium text-paper">
                      {place.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-w line-clamp-2">
                      {place.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/destinations/${destination.id}`}
              className="flex w-full items-center justify-center rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-deep transition hover:bg-gold"
            >
              Read the full {destination.name} guide
            </Link>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
