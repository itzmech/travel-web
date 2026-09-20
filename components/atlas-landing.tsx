"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Crosshair, MousePointerClick } from "lucide-react";
import type { AtlasPlate, FieldNote } from "@/lib/atlas-plates";
import {
  DossierCard,
  FieldNotesSection,
  FolioChrome,
  NotebookDrawer,
  PinDot,
  PLATE_CHANGE_MS,
  PROGRESS_SPAN,
  PlanSection,
  TopPicksCard,
} from "@/components/atlas-chrome";

export function AtlasLanding({
  plates,
  notes,
}: {
  plates: AtlasPlate[];
  notes: FieldNote[];
}) {
  const [activePlate, setActivePlate] = useState(0);
  const [activePin, setActivePin] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const cycleRef = useRef<number | null>(null);

  const plate = plates[activePlate];
  const pin = plate.pins.find((p) => p.id === activePin) ?? plate.pins[0];

  /* ----- 10-second slideshow -------------------------------------- */
  /* Advances automatically; pauses when the tab is hidden, the user  */
  /* hovers the inspector, or the trip-notes drawer is open.          */
  const isPaused = paused || drawerOpen;
  useEffect(() => {
    if (isPaused || typeof window === "undefined") return;
    cycleRef.current = window.setInterval(() => {
      setActivePlate((current) => (current + 1) % plates.length);
      setActivePin(1);
    }, PLATE_CHANGE_MS);
    return () => {
      if (cycleRef.current !== null) window.clearInterval(cycleRef.current);
    };
  }, [isPaused, plates.length]);

  const selectPlate = (index: number) => {
    setActivePlate(index);
    setActivePin(1);
  };

  return (
    <FolioChrome activePlate={plate} onOpenNotebook={() => setDrawerOpen(true)}>
      <main className="w-full flex-grow pb-36 pt-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          {/* ============ SECTION 1: HERO ============ */}
          <section className="pb-16 pt-8">
            <div className="mb-8 flex flex-col justify-between gap-3 border-b border-atlas-outline-soft pb-4 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-3 font-atlas-label text-[11px] uppercase tracking-[0.24em] text-atlas-faint">
                <span className="font-bold text-atlas-brass">&#9670;</span>
                <span className="font-semibold tracking-widest text-atlas-brass">
                  {plate.plateNo}
                </span>
                <span className="text-atlas-outline">|</span>
                <span className="tracking-widest">{plate.sector}</span>
              </div>
              <span className="font-atlas-hand text-xl tracking-wide text-atlas-parchment">
                {plate.epigraph}
              </span>
            </div>
            <div className="max-w-3xl space-y-4">
              <span className="block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.3em] text-atlas-brass/90">
                Honest travel guides &bull; beyond the obvious
              </span>
              <h1 className="min-h-[2.3em] font-atlas-serif text-4xl font-normal leading-[1.15] tracking-tight text-atlas-bright transition-all duration-500 sm:text-5xl md:text-[54px]">
                {plate.title}
              </h1>
              <p className="max-w-2xl pt-2 font-atlas-body text-xl font-light italic leading-relaxed text-atlas-body transition-all duration-500 md:text-2xl">
                {plate.subtitle}
              </p>
            </div>
          </section>

          {/* ============ SECTION 2: PLATE INSPECTOR SLIDESHOW ============ */}
          <section
            className="border-b border-atlas-outline-soft pb-32"
            id="folio-inspector"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="mb-10 flex items-center justify-between gap-4 border-b border-atlas-outline-soft pb-2">
              <div className="no-scrollbar flex items-center gap-1 overflow-x-auto font-atlas-label text-xs uppercase tracking-[0.18em] sm:gap-2">
                {plates.map((item, index) => (
                  <button
                    className={`relative shrink-0 cursor-pointer border-b-2 px-4 py-2.5 transition-colors ${
                      index === activePlate
                        ? "border-atlas-brass font-medium text-atlas-brass"
                        : "border-transparent text-atlas-faint hover:text-atlas-ink"
                    }`}
                    key={item.slug}
                    onClick={() => selectPlate(index)}
                    type="button"
                  >
                    {String(index + 1).padStart(2, "0")}. {item.shortTitle}
                    {index === activePlate && !isPaused && (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-atlas-brass-bright/70"
                        style={{ animation: `plate-progress ${PROGRESS_SPAN} linear forwards` }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="hidden shrink-0 items-center gap-2 font-mono text-[11px] text-atlas-faint md:flex">
                <MousePointerClick className="h-4 w-4 text-atlas-brass" />
                <span>
                  {isPaused ? "Held for inspection" : `Auto-cycling every ${PLATE_CHANGE_MS / 1000}s`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left: the photographic plate with stacked crossfading images */}
              <div className="lg:col-span-7">
                <div className="photo-mount relative border border-atlas-outline bg-atlas-abyss p-3.5 shadow-2xl sm:p-4">
                  {/* Location stamp seal */}
                  <div
                    className="pointer-events-none absolute -right-3 -top-3 z-30 select-none"
                    style={{ transform: "rotate(3deg)" }}
                  >
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-atlas-terra/80 bg-[#140b0d]/95 p-1 text-center shadow-2xl">
                      <span aria-hidden className="my-0.5 text-xl leading-none">{plate.badge}</span>
                      <span className="border-y border-atlas-terra/40 px-1 text-[9px] font-bold uppercase tracking-widest text-atlas-terra-bright">
                        Guide
                      </span>
                      <span className="font-mono text-[7px] text-atlas-terra">
                        {plate.sealNo}
                      </span>
                    </div>
                  </div>

                  {/* Image viewport — every plate image is mounted, opacity crossfades */}
                  <div className="relative aspect-[5/4] select-none overflow-hidden bg-atlas-abyss sm:aspect-[16/11]">
                    {plates.map((item, index) => (
                      <Image
                        alt={`${item.title} — travel guide plate`}
                        className={`object-cover transition-opacity duration-1000 ${
                          index === activePlate ? "opacity-90 contrast-105" : "opacity-0"
                        }`}
                        fill
                        key={item.slug}
                        priority={index < 2}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        src={item.image}
                      />
                    ))}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-atlas-abyss/85 via-transparent to-atlas-abyss/20" />
                    {plate.pins.map((item) => (
                      <button
                        aria-label={`Inspect waypoint ${item.label}`}
                        className="group/pin absolute z-20 cursor-pointer"
                        key={`${plate.slug}-${item.id}`}
                        onClick={() => setActivePin(item.id)}
                        style={{ top: item.top, left: item.left }}
                        title={`Inspect ${item.label}`}
                        type="button"
                      >
                        <PinDot tone={item.tone} />
                        <span
                          className={`absolute left-7 top-0 whitespace-nowrap border border-atlas-outline bg-atlas-surface/95 px-2 py-0.5 font-mono text-[10px] tracking-widest shadow-md transition-opacity ${
                            item.tone === "terra"
                              ? "text-atlas-terra-bright"
                              : "text-atlas-ink"
                          } ${
                            item.id === activePin
                              ? "opacity-100"
                              : "opacity-90 group-hover/pin:opacity-100"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Footer caption beneath plate */}
                  <div className="mt-2 flex flex-col justify-between gap-2 border-t border-atlas-outline-soft px-2 pt-3.5 font-mono text-xs text-atlas-faint sm:flex-row sm:items-center">
                    <span>{plate.scaleLabel}</span>
                    <span className="font-atlas-hand text-base tracking-normal text-atlas-brass/85">
                      {plate.captionQuote}
                    </span>
                  </div>
                </div>

                {/* Waypoint callout under the plate */}
                <div className="mt-6 border-l-2 border-atlas-brass bg-atlas-surface p-4.5 transition-all duration-300">
                  <div className="flex items-center gap-2 font-atlas-label text-[10px] font-semibold uppercase tracking-widest text-atlas-brass">
                    <Crosshair className="h-[14px] w-[14px]" />
                    <span>{pin.source}</span>
                  </div>
                  <p className="mt-1.5 font-atlas-hand text-xl leading-snug text-atlas-parchment sm:text-2xl">
                    {pin.note}
                  </p>
                </div>
              </div>

              {/* Right: honest-guide dossier + top picks */}
              <div className="space-y-6 lg:col-span-5">
                <DossierCard plate={plate} onOpenDrawer={() => setDrawerOpen(true)} />
                <TopPicksCard plate={plate} />
              </div>
            </div>
          </section>

          {/* ============ SECTIONS 3 & 4: field notes + planner ============ */}
          <FieldNotesSection notes={notes} />
          <PlanSection destinations={plates} />
        </div>
      </main>

      <NotebookDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        plate={plate}
      />

      <span className="sr-only" role="status">
        {`Now showing ${plate.plateNo} — ${plate.shortTitle}, guide ${activePlate + 1} of ${plates.length}`}
      </span>
    </FolioChrome>
  );
}
