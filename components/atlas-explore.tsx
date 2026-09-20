"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Crosshair, MousePointerClick } from "lucide-react";
import type { AtlasDispatch, AtlasPlate } from "@/lib/atlas-plates";
import {
  DossierCard,
  DispatchesSection,
  FolioChrome,
  NotebookDrawer,
  PinDot,
  RegisterSection,
} from "@/components/atlas-chrome";

export function AtlasExplore({
  plates,
  dispatches,
}: {
  plates: AtlasPlate[];
  dispatches: AtlasDispatch[];
}) {
  const [focusIndex, setFocusIndex] = useState(0);
  const [activePin, setActivePin] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const plate = plates[focusIndex];
  const pin = plate.pins.find((p) => p.id === activePin) ?? plate.pins[0];

  const focusPlate = (index: number) => {
    setFocusIndex(index);
    setActivePin(1);
  };

  /* Keep the focused card in view inside the filmstrip */
  useEffect(() => {
    cardRefs.current[focusIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [focusIndex]);

  const scrollStrip = (direction: 1 | -1) => {
    const next = Math.min(Math.max(focusIndex + direction, 0), plates.length - 1);
    focusPlate(next);
  };

  return (
    <FolioChrome activePlate={plate} onOpenNotebook={() => setDrawerOpen(true)}>
      <main className="w-full flex-grow pb-36 pt-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          {/* ============ SECTION 1: SURVEY INDEX ============ */}
          <section className="pb-14 pt-8">
            <div className="mb-8 flex flex-col justify-between gap-3 border-b border-atlas-outline-soft pb-4 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-3 font-atlas-label text-[11px] uppercase tracking-[0.24em] text-atlas-faint">
                <span className="font-bold text-atlas-brass">&#9670;</span>
                <span className="font-semibold tracking-widest text-atlas-brass">
                  The Grand Survey
                </span>
                <span className="text-atlas-outline">|</span>
                <span className="tracking-widest">{plates.length} Registered Plates</span>
              </div>
              <span className="font-atlas-hand text-xl tracking-wide text-atlas-parchment">
                &ldquo;Every plate a doorway; every doorway a question.&rdquo;
              </span>
            </div>
            <div className="max-w-3xl space-y-4">
              <span className="block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.3em] text-atlas-brass/90">
                Terra Incognita &bull; Complete Register
              </span>
              <h1 className="font-atlas-serif text-4xl font-normal leading-[1.15] tracking-tight text-atlas-bright sm:text-5xl md:text-[54px]">
                The Surveyor&apos;s Grand Traverse
              </h1>
              <p className="max-w-2xl pt-2 font-atlas-body text-xl font-light italic leading-relaxed text-atlas-body md:text-2xl">
                Thirty-one plates from the Society&apos;s archive, arranged for inspection. Slide
                along the folio, stop where the compass trembles.
              </p>
            </div>
          </section>

          {/* ============ SECTION 2: SLIDEABLE FILMSTRIP ============ */}
          <section className="border-b border-atlas-outline-soft pb-6" id="plate-strip">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-atlas-outline-soft pb-2">
              <div className="flex items-center gap-3 font-atlas-label text-xs uppercase tracking-[0.18em] text-atlas-faint">
                <MousePointerClick className="h-4 w-4 text-atlas-brass" />
                <span>Slide the folio &mdash; select a plate to inspect</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="mr-2 font-mono text-[11px] text-atlas-faint">
                  {String(focusIndex + 1).padStart(2, "0")} / {plates.length}
                </span>
                <button
                  aria-label="Previous plate"
                  className="cursor-pointer border border-atlas-outline bg-atlas-container p-2 text-atlas-dim transition-colors hover:border-atlas-brass/60 hover:text-atlas-brass disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={focusIndex === 0}
                  onClick={() => scrollStrip(-1)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Next plate"
                  className="cursor-pointer border border-atlas-outline bg-atlas-container p-2 text-atlas-dim transition-colors hover:border-atlas-brass/60 hover:text-atlas-brass disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={focusIndex === plates.length - 1}
                  onClick={() => scrollStrip(1)}
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:-mx-12 sm:px-12"
              ref={stripRef}
            >
              {plates.map((item, index) => (
                <button
                  aria-label={`Inspect plate ${item.shortTitle}`}
                  className={`group relative w-64 shrink-0 snap-center border p-3 text-left transition-colors sm:w-72 ${
                    index === focusIndex
                      ? "border-atlas-brass/70 bg-atlas-surface"
                      : "border-atlas-outline-soft bg-atlas-panel hover:border-atlas-outline"
                  }`}
                  key={item.slug}
                  onClick={() => focusPlate(index)}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  type="button"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-atlas-abyss">
                    <Image
                      alt={`${item.title} — cartographic survey plate`}
                      className={`object-cover transition-all duration-700 ${
                        index === focusIndex
                          ? "scale-100 opacity-95 contrast-105"
                          : "scale-105 opacity-60 group-hover:opacity-85"
                      }`}
                      fill
                      sizes="288px"
                      src={item.image}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-atlas-abyss/85 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-atlas-brass/90">
                      {item.plateNo.replace("PLATE NO. ", "PL. ")}
                    </span>
                  </div>
                  <div className="pt-3">
                    <div className="flex items-center justify-between font-mono text-[10px] text-atlas-faint">
                      <span className="uppercase tracking-widest">{item.sector}</span>
                      <span className="text-atlas-brass/80">{item.temp}</span>
                    </div>
                    <h3
                      className={`mt-1.5 font-atlas-serif text-lg leading-snug transition-colors ${
                        index === focusIndex
                          ? "text-atlas-brass"
                          : "text-atlas-bright group-hover:text-atlas-brass"
                      }`}
                    >
                      {item.shortTitle}
                    </h3>
                    <p className="mt-1 truncate font-mono text-[10px] text-atlas-faint">
                      {item.coords}
                    </p>
                  </div>
                  {index === focusIndex && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 top-0 h-0.5 bg-atlas-brass"
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* ============ SECTION 3: FOCUSED PLATE INSPECTOR ============ */}
          <section className="border-b border-atlas-outline-soft pb-32 pt-14" id="folio-inspector">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left: the focused photographic plate */}
              <div className="lg:col-span-7">
                <div className="photo-mount relative border border-atlas-outline bg-atlas-abyss p-3.5 shadow-2xl sm:p-4">
                  {/* Archival stamp seal */}
                  <div
                    className="pointer-events-none absolute -right-3 -top-3 z-30 select-none"
                    style={{ transform: "rotate(3deg)" }}
                  >
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-atlas-terra/80 bg-[#140b0d]/95 p-1 text-center shadow-2xl">
                      <span className="font-mono text-[8px] uppercase leading-tight tracking-tighter text-atlas-terra-bright">
                        {plate.sealSector}
                      </span>
                      <span className="my-0.5 border-y border-atlas-terra/40 text-[10px] font-bold uppercase tracking-widest text-atlas-terra-bright">
                        Verified
                      </span>
                      <span className="font-mono text-[7px] text-atlas-terra">{plate.sealNo}</span>
                    </div>
                  </div>

                  {/* Image viewport with waypoint pins */}
                  <div className="relative aspect-[5/4] select-none overflow-hidden bg-atlas-abyss sm:aspect-[16/11]">
                    <Image
                      alt={`${plate.title} — cartographic survey plate`}
                      className="object-cover opacity-90 contrast-105"
                      fill
                      key={plate.slug}
                      priority
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      src={plate.image}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-atlas-abyss/85 via-transparent to-atlas-abyss/20" />
                    {plate.pins.map((item) => (
                      <button
                        aria-label={`Inspect waypoint ${item.label}`}
                        className="group/pin absolute z-20 cursor-pointer"
                        key={`${plate.slug}-${item.id}`}
                        onClick={() => setActivePin(item.id)}
                        style={{ top: item.top, left: item.left }}
                        title={`Inspect Waypoint ${item.label}`}
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

                {/* Waypoint callout / marginalia */}
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

              {/* Right: dossier + observation log */}
              <div className="space-y-6 lg:col-span-5">
                <DossierCard plate={plate} onOpenDrawer={() => setDrawerOpen(true)} />
                <div className="relative border border-atlas-outline bg-atlas-panel p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
                      Astronomical &amp; Acoustic Log
                    </span>
                    <span className="font-atlas-hand text-lg leading-none text-atlas-brass">
                      &#10022;
                    </span>
                  </div>
                  <p className="font-atlas-hand text-lg leading-relaxed text-atlas-parchment">
                    {plate.astronomy}
                  </p>
                </div>
                <div className="flex items-center justify-between border border-atlas-outline-soft bg-atlas-panel p-4">
                  <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
                    Continue the traverse
                  </span>
                  <button
                    className="group inline-flex cursor-pointer items-center gap-2 font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={focusIndex === plates.length - 1}
                    onClick={() => scrollStrip(1)}
                    type="button"
                  >
                    <span>Next plate</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTIONS 4 & 5: dispatches + register ============ */}
          <DispatchesSection dispatches={dispatches} />
          <RegisterSection />
        </div>
      </main>

      <NotebookDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        plate={plate}
      />

      <span className="sr-only" role="status">
        {`Inspecting ${plate.plateNo} — ${plate.shortTitle}, plate ${focusIndex + 1} of ${plates.length}`}
      </span>
    </FolioChrome>
  );
}
