"use client";

import { X, Check, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] animate-in slide-in-from-bottom duration-300 md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[420px] md:animate-none md:slide-in-from-right">
        <div className="flex h-full flex-col rounded-t-3xl border border-white/10 bg-[#0f0f14]/95 backdrop-blur-xl md:rounded-none md:rounded-l-3xl">
          {/* Header */}
          <div className="relative h-48 w-full overflow-hidden rounded-t-3xl md:rounded-none md:rounded-tl-3xl">
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{destination.flag}</span>
                <h2 className="text-2xl font-bold text-white">{destination.name}</h2>
              </div>
              <p className="text-sm text-white/70">{destination.country}</p>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            {/* Pros Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                <Check className="h-4 w-4" />
                Pros
              </h3>
              <ul className="space-y-2">
                {destination.pros.map((pro, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons Section */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-400">
                <AlertTriangle className="h-4 w-4" />
                Cons
              </h3>
              <ul className="space-y-2">
                {destination.cons.map((con, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            {/* Places to Visit */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#4F8EF7]">
                <MapPin className="h-4 w-4" />
                Places to Visit
              </h3>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {destination.places.map((place, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-36 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="mb-2 text-2xl">{place.icon}</div>
                    <h4 className="mb-1 text-sm font-medium text-white">
                      {place.name}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {place.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full bg-gradient-to-r from-[#4F8EF7] to-[#6366f1] text-white hover:opacity-90">
              Explore More
            </Button>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
