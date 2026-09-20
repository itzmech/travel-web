"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Crosshair,
  MousePointerClick,
  X,
} from "lucide-react";
import type { AtlasDispatch, AtlasPlate, PlatePin } from "@/lib/atlas-plates";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "acoustic", label: "Acoustic" },
  { key: "celestial", label: "Celestial" },
  { key: "terrain", label: "Terrain" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function PinDot({ tone }: { tone: PlatePin["tone"] }) {
  const color = tone === "terra" ? "bg-atlas-terra-bright" : "bg-atlas-brass";
  return (
    <span className="relative flex h-6 w-6 items-center justify-center">
      <span
        className={`animate-ping-slow absolute inline-flex h-full w-full rounded-full ${color} opacity-60`}
      />
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${color} border border-atlas-bg shadow-lg`}
      />
    </span>
  );
}

export function AtlasLanding({
  plates,
  dispatches,
}: {
  plates: AtlasPlate[];
  dispatches: AtlasDispatch[];
}) {
  const [activePlate, setActivePlate] = useState(0);
  const [activePin, setActivePin] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [submitted, setSubmitted] = useState(false);

  const plate = plates[activePlate];
  const pin = plate.pins.find((p) => p.id === activePin) ?? plate.pins[0];
  const visibleDispatches =
    filter === "all"
      ? dispatches
      : dispatches.filter((d) => d.category === filter);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-atlas-bg text-atlas-ink">
      {/* ============ TOP FOLIO BAR ============ */}
      <header className="fixed left-0 top-0 z-40 w-full border-b border-atlas-outline-soft/70 bg-atlas-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-baseline gap-3.5">
              <span className="font-atlas-serif text-2xl font-semibold uppercase tracking-[0.24em] text-atlas-ink transition-colors group-hover:text-atlas-brass">
                The Atlas
              </span>
              <span className="hidden border-l border-atlas-outline pl-3.5 font-atlas-label text-[10px] uppercase tracking-[0.28em] text-atlas-faint sm:inline-block">
                Folio Vol. XIV &bull; Surveyor&apos;s Register
              </span>
            </Link>
          </div>
          <nav className="hidden items-center gap-9 font-atlas-label text-xs uppercase tracking-[0.2em] text-atlas-dim md:flex">
            <a
              className="border-b border-atlas-brass/60 pb-0.5 font-medium text-atlas-brass transition-colors"
              href="#folio-inspector"
            >
              Plates &amp; Loupe
            </a>
            <a className="transition-colors hover:text-atlas-ink" href="#curated-dispatches">
              Dispatches
            </a>
            <a className="transition-colors hover:text-atlas-ink" href="#registration-section">
              The Register
            </a>
            <Link className="transition-colors hover:text-atlas-ink" href="/destinations">
              Guides
            </Link>
          </nav>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2.5 rounded-xs border border-atlas-outline bg-atlas-container px-3.5 py-1.5 font-mono text-[11px] text-atlas-faint lg:flex">
              <span className="text-atlas-brass/90">{plate.liveLat}</span>
              <span className="text-atlas-outline">&bull;</span>
              <span className="text-atlas-dim">{plate.liveLon}</span>
            </div>
            <button
              className="flex cursor-pointer items-center gap-2 border border-transparent px-3 py-1.5 font-atlas-label text-xs uppercase tracking-widest text-atlas-ink transition-colors hover:border-atlas-outline hover:text-atlas-brass"
              onClick={() => setDrawerOpen(true)}
              type="button"
            >
              <BookOpen className="h-[17px] w-[17px] text-atlas-brass" />
              <span className="hidden sm:inline">Surveyor&apos;s Notebook</span>
            </button>
          </div>
        </div>
      </header>

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
                Terra Incognita &bull; Expeditionary Folio
              </span>
              <h1 className="font-atlas-serif text-4xl font-normal leading-[1.15] tracking-tight text-atlas-bright sm:text-5xl md:text-[54px]">
                {plate.title}
              </h1>
              <p className="max-w-2xl pt-2 font-atlas-body text-xl font-light italic leading-relaxed text-atlas-body md:text-2xl">
                {plate.subtitle}
              </p>
            </div>
          </section>

          {/* ============ SECTION 2: PLATE INSPECTOR ============ */}
          <section className="border-b border-atlas-outline-soft pb-32" id="folio-inspector">
            <div className="mb-10 flex items-center justify-between gap-4 overflow-x-auto border-b border-atlas-outline-soft pb-2">
              <div className="flex items-center gap-1 font-atlas-label text-xs uppercase tracking-[0.18em] sm:gap-2">
                {plates.map((item, index) => (
                  <button
                    className={`cursor-pointer border-b-2 px-4 py-2.5 transition-colors ${
                      index === activePlate
                        ? "border-atlas-brass font-medium text-atlas-brass"
                        : "border-transparent text-atlas-faint hover:text-atlas-ink"
                    }`}
                    key={item.slug}
                    onClick={() => {
                      setActivePlate(index);
                      setActivePin(1);
                    }}
                    type="button"
                  >
                    {String(index + 1).padStart(2, "0")}. {item.shortTitle}
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 font-mono text-[11px] text-atlas-faint md:flex">
                <MousePointerClick className="text-sm text-atlas-brass" />
                <span>Click waypoints on plate to reveal notes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left: interactive photographic plate */}
              <div className="lg:col-span-7">
                <div className="photo-mount relative border border-atlas-outline bg-atlas-abyss p-3.5 shadow-2xl sm:p-4">
                  {/* Archival stamp seal */}
                  <div
                    className="pointer-events-none absolute -right-3 -top-3 z-30 select-none"
                    id="plate-seal"
                    style={{ transform: "rotate(3deg)" }}
                  >
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-atlas-terra/80 bg-[#140b0d]/95 p-1 text-center shadow-2xl">
                      <span className="font-mono text-[8px] uppercase tracking-tighter text-atlas-terra-bright">
                        {plate.sealSector}
                      </span>
                      <span className="my-0.5 border-y border-atlas-terra/40 text-[10px] font-bold uppercase tracking-widest text-atlas-terra-bright">
                        Verified
                      </span>
                      <span className="font-mono text-[7px] text-atlas-terra">{plate.sealNo}</span>
                    </div>
                  </div>

                  {/* Image viewport with waypoint pins */}
                  <div className="group relative select-none overflow-hidden bg-atlas-abyss">
                    <Image
                      alt={`${plate.title} — cartographic survey plate`}
                      className="h-[400px] w-full object-cover opacity-90 contrast-105 transition-all duration-500 sm:h-[480px]"
                      height={480}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      src={plate.image}
                      width={800}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-atlas-abyss/85 via-transparent to-atlas-abyss/20" />
                    {plate.pins.map((item) => (
                      <button
                        aria-label={`Inspect waypoint ${item.label}`}
                        className="group/pin absolute z-20 cursor-pointer"
                        key={item.id}
                        onClick={() => setActivePin(item.id)}
                        style={{ top: item.top, left: item.left }}
                        title={`Inspect Waypoint ${item.label}`}
                        type="button"
                      >
                        <PinDot tone={item.tone} />
                        <span
                          className={`absolute left-7 top-0 whitespace-nowrap border border-atlas-outline bg-atlas-surface/95 px-2 py-0.5 font-mono text-[10px] tracking-widest shadow-md transition-opacity ${
                            item.tone === "terra" ? "text-atlas-terra-bright" : "text-atlas-ink"
                          } ${item.id === activePin ? "opacity-100" : "opacity-90 group-hover/pin:opacity-100"}`}
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

              {/* Right: inspector card & observation log */}
              <div className="space-y-6 lg:col-span-5">
                <div className="relative border border-atlas-outline bg-atlas-surface p-6 shadow-xl sm:p-7">
                  <div className="mb-5 flex items-baseline justify-between border-b border-atlas-outline pb-4">
                    <div>
                      <span className="mb-1 block font-atlas-label text-[10px] font-semibold uppercase tracking-[0.24em] text-atlas-brass">
                        Field Journal Excerpt
                      </span>
                      <h3 className="font-atlas-serif text-2xl font-normal text-atlas-bright">
                        {plate.cardTitle}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-atlas-faint">{plate.temp}</span>
                  </div>
                  <div className="space-y-4 font-atlas-body text-base leading-relaxed text-atlas-body">
                    <p>{plate.prose}</p>
                    <p className="text-sm italic text-atlas-faint">{plate.proseAside}</p>
                  </div>
                  <div className="mt-6 space-y-2.5 border-t border-atlas-outline-soft pt-5 font-mono text-xs text-atlas-dim">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-atlas-faint">
                        Coordinates
                      </span>
                      <span className="font-medium text-atlas-ink">{plate.coords}</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-atlas-faint">
                        Elevation
                      </span>
                      <span className="font-medium text-atlas-brass">{plate.elevation}</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-atlas-faint">
                        Anomaly Index
                      </span>
                      <span className="text-atlas-ink">{plate.anomaly}</span>
                    </div>
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-atlas-outline-soft pt-4">
                    <button
                      className="group inline-flex cursor-pointer items-center gap-2 font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright"
                      onClick={() => setDrawerOpen(true)}
                      type="button"
                    >
                      <span>Open Expedition Notebook</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="font-mono text-[10px] text-atlas-faint">SEALED ENTRY</span>
                  </div>
                </div>

                <div className="relative border border-atlas-outline bg-atlas-panel p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
                      Astronomical &amp; Acoustic Log
                    </span>
                    <span className="font-atlas-hand text-lg leading-none text-atlas-brass">&#10022;</span>
                  </div>
                  <p className="font-atlas-hand text-lg leading-relaxed text-atlas-parchment">
                    {plate.astronomy}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SECTION 3: DISPATCHES ============ */}
          <section className="border-b border-atlas-outline-soft py-28" id="curated-dispatches">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="mb-3 block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.28em] text-atlas-brass">
                  Field Anomalies &amp; Curator Dispatches
                </span>
                <h2 className="font-atlas-serif text-3xl font-normal tracking-tight text-atlas-bright sm:text-4xl">
                  Dispatches from the Living Register
                </h2>
                <p className="mt-3 font-atlas-body text-lg font-light italic text-atlas-body">
                  Transcribed directly from logbooks left open in salt gales, thin altitudes, and
                  magnetic silence.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xs border border-atlas-outline bg-atlas-container p-1 font-atlas-label text-[11px] uppercase tracking-wider">
                {FILTERS.map((item) => (
                  <button
                    className={`cursor-pointer px-3 py-1.5 transition-colors ${
                      filter === item.key
                        ? "bg-atlas-raised font-medium text-atlas-brass"
                        : "text-atlas-faint hover:text-atlas-ink"
                    }`}
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {visibleDispatches.map((dispatch) => (
                <article
                  className="group flex flex-col justify-between border border-atlas-outline-soft bg-atlas-surface p-7 transition-colors hover:border-atlas-outline"
                  data-category={dispatch.category}
                  key={dispatch.id}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-[11px] text-atlas-faint">
                      <span>{dispatch.entry}</span>
                      <span className="text-atlas-brass/80">{dispatch.coords}</span>
                    </div>
                    <h3 className="font-atlas-serif text-xl leading-snug text-atlas-bright transition-colors group-hover:text-atlas-brass">
                      {dispatch.title}
                    </h3>
                    <p className="font-atlas-body text-sm leading-relaxed text-atlas-body">
                      {dispatch.teaser}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-atlas-outline-soft pt-5">
                    <span className="font-atlas-hand text-base text-atlas-parchment">
                      {dispatch.quote}
                    </span>
                    <Link
                      aria-label={`Open the ${dispatch.title} field guide`}
                      className="font-mono text-xs text-atlas-brass transition-transform hover:translate-x-1"
                      href={`/destinations/${dispatch.destinationId}`}
                    >
                      &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ============ SECTION 4: REGISTER & FORM ============ */}
          <section className="py-28" id="registration-section">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-6">
                <div className="space-y-3">
                  <span className="block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.28em] text-atlas-brass">
                    Field Register &bull; Vol. XIV
                  </span>
                  <h2 className="font-atlas-serif text-3xl font-normal leading-tight text-atlas-bright sm:text-4xl">
                    Where the Dunes Overtake the Ocean: The Skeleton Coast
                  </h2>
                  <div className="pt-1 font-mono text-xs text-atlas-faint">
                    NAMIB BASIN &bull; NOVEMBER 2024
                  </div>
                </div>
                <div className="space-y-5 font-atlas-body text-lg font-light leading-relaxed text-atlas-body">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:font-atlas-serif first-letter:text-5xl first-letter:text-atlas-brass">
                    Where the Atlantic swell crashes into shifting red dunes, why do the whales swim
                    ashore? The salt fog smells of rusted copper and old kelp. Beneath four meters
                    of moving sand, our probes struck petrified caravel ribs that charts say never
                    sailed.
                  </p>
                  <p className="text-base text-atlas-faint">
                    The south wind deposits quartz granules inside every compass bezel. What
                    unmapped phenomena have you observed in your own crossings?
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-atlas-outline-soft pt-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-atlas-brass" />
                    <span className="font-mono text-xs text-atlas-faint">21&deg;46&prime;S, 13&deg;58&prime;E</span>
                  </div>
                  <span className="font-atlas-hand text-xl text-atlas-parchment">
                    &mdash; Surveyor H. Vandermeer
                  </span>
                </div>
              </div>

              <div className="relative border border-atlas-outline bg-atlas-surface p-8 shadow-2xl sm:p-10 lg:col-span-6">
                <div className="mb-6 border-b border-atlas-outline-soft pb-6 text-center">
                  <span className="mb-1 block font-atlas-hand text-3xl text-atlas-brass">&#10022;</span>
                  <h3 className="font-atlas-serif text-2xl font-normal tracking-wide text-atlas-bright">
                    Deposit an Observation
                  </h3>
                  <p className="mt-1.5 font-atlas-body text-xs italic text-atlas-faint">
                    Have you seen something unmapped? Enter your coordinates and field notes into
                    the Society&apos;s register.
                  </p>
                </div>
                <form
                  className="space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label
                      className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                      htmlFor="atlas-name"
                    >
                      Navigator or Surveyor Name
                    </label>
                    <input
                      className="w-full border border-atlas-outline bg-atlas-abyss px-4 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors placeholder:text-atlas-faint/50 focus:border-atlas-brass/80 focus:outline-none"
                      id="atlas-name"
                      placeholder="e.g., Capt. Julian Vance, FRGS"
                      required
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                        htmlFor="atlas-region"
                      >
                        Corridor / Region
                      </label>
                      <select
                        className="w-full border border-atlas-outline bg-atlas-abyss px-3 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors focus:border-atlas-brass/80 focus:outline-none"
                        id="atlas-region"
                      >
                        <option>High Arctic &amp; Polar Basins</option>
                        <option>Equatorial Volcanic Zones</option>
                        <option>Maghreb &amp; Saharan Ridges</option>
                        <option>Altiplano Dark Sky Plateaus</option>
                        <option>Patagonian Icefields</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                        htmlFor="atlas-coords"
                      >
                        Waypoint Coordinates
                      </label>
                      <input
                        className="w-full border border-atlas-outline bg-atlas-abyss px-3 py-2.5 font-mono text-xs text-atlas-brass transition-colors placeholder:text-atlas-faint/50 focus:border-atlas-brass/80 focus:outline-none"
                        id="atlas-coords"
                        placeholder="e.g., 78° 13′ 22″ N"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                      htmlFor="atlas-notes"
                    >
                      Field Observation / Marginalia
                    </label>
                    <textarea
                      className="w-full resize-none border border-atlas-outline bg-atlas-abyss px-4 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors placeholder:text-atlas-faint/50 focus:border-atlas-brass/80 focus:outline-none"
                      id="atlas-notes"
                      placeholder="Transcribe magnetic deviations, acoustic hums, or terrain anomalies..."
                      rows={3}
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      className="w-full cursor-pointer border border-atlas-brass/60 bg-[#815a00] px-6 py-3 font-atlas-label text-xs font-bold uppercase tracking-[0.22em] text-atlas-brass-bright shadow-sm transition-colors hover:bg-[#dca842] hover:text-atlas-bg"
                      type="submit"
                    >
                      Submit Dispatch to the Curators
                    </button>
                  </div>
                  {submitted && (
                    <div className="border border-atlas-brass/40 bg-atlas-container p-3 text-center font-atlas-hand text-lg text-atlas-brass">
                      &#10003; Log entry received and catalogued under seal.
                    </div>
                  )}
                  <div className="pt-1 text-center">
                    <span className="font-atlas-hand text-sm text-atlas-faint">
                      Verified by the Cartographic Curators under Royal Charter
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ============ NOTEBOOK DRAWER ============ */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-50 bg-atlas-abyss/80 backdrop-blur-xs transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        id="notebook-backdrop"
        onClick={closeDrawer}
      />
      <aside
        aria-hidden={!drawerOpen}
        aria-label="Surveyor's Notebook"
        className={`drawer-transition fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col justify-between border-l border-atlas-outline bg-atlas-surface shadow-2xl ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="notebook-drawer"
      >
        <div className="flex items-center justify-between border-b border-atlas-outline-soft bg-atlas-container p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="font-atlas-hand text-2xl text-atlas-brass">&#10022;</span>
            <div>
              <h3 className="font-atlas-serif text-lg uppercase tracking-wider text-atlas-bright">
                Surveyor&apos;s Notebook
              </h3>
              <span className="font-mono text-[10px] text-atlas-faint">
                MANUSCRIPT FOLIO &bull; PRIVATELY ANNOTATED
              </span>
            </div>
          </div>
          <button
            aria-label="Close Notebook"
            className="cursor-pointer p-1.5 text-atlas-dim transition-colors hover:bg-atlas-raised hover:text-atlas-ink"
            onClick={closeDrawer}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-grow space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="border border-atlas-outline bg-atlas-raised p-4">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-atlas-brass">
              Inspection Target
            </span>
            <h4 className="font-atlas-serif text-xl text-atlas-bright">
              {plate.plateNo.replace("PLATE NO. ", "Plate No. ")} &bull;{" "}
              {plate.shortTitle}
            </h4>
            <span className="font-mono text-xs text-atlas-dim">{plate.coords}</span>
          </div>
          <div className="space-y-4">
            <span className="block font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
              Field Marginalia &amp; Curiosities
            </span>
            <div className="space-y-4 font-atlas-hand text-base leading-relaxed text-atlas-parchment">
              {plate.drawerNotes.map((note) => (
                <div
                  className={`border-l-2 bg-atlas-abyss/60 p-4 ${
                    note.tone === "terra" ? "border-atlas-terra" : "border-atlas-brass"
                  }`}
                  key={note.source}
                >
                  <p className="text-lg text-atlas-ink">{note.text}</p>
                  <span className="mt-2 block text-right font-mono text-xs text-atlas-faint">
                    &mdash; {note.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 border border-atlas-outline bg-atlas-abyss p-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-atlas-faint">
              Instrument Log
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>SEXTANT ALTITUDE:</span>
              <span className="text-atlas-brass">{plate.sextant}</span>
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>BAROMETRIC INCLINE:</span>
              <span className="text-atlas-ink">{plate.baro}</span>
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>OBSERVER STATUS:</span>
              <span className="text-atlas-ink">SOLITARY IN VIGIL</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-atlas-outline-soft bg-atlas-container p-6">
          <span className="font-mono text-[11px] text-atlas-faint">
            ARCHIVAL REF #{plate.sealNo.replace("NO. ", "S-").replace("-S", "")}
          </span>
          <button
            className="cursor-pointer font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright"
            onClick={closeDrawer}
            type="button"
          >
            Return to Folio
          </button>
        </div>
      </aside>

      {/* ============ FOOTER ============ */}
      <footer className="w-full border-t border-atlas-outline-soft bg-atlas-abyss pb-14 pt-16 text-atlas-dim">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-atlas-outline-soft pb-10 md:flex-row md:items-baseline">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-atlas-brass">&#9670;</span>
                <span className="font-atlas-serif text-xl font-medium uppercase tracking-widest text-atlas-bright">
                  The Atlas Cartographic Society
                </span>
              </div>
              <p className="max-w-lg font-atlas-body text-base italic text-atlas-faint">
                Preserving handwritten logs, physical copperplate prints, and true-scale geodetic
                charts since MDCCXCII.
              </p>
            </div>
            <div className="space-y-1 font-mono text-xs text-atlas-faint">
              <div>DATUM: WGS 84 &bull; ELLIPSOID GRS 80</div>
              <div>CENTRAL MERIDIAN: GREENWICH 00&deg;00&prime;00&Prime;</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 font-atlas-label text-xs uppercase tracking-wider text-atlas-faint sm:flex-row">
            <div>&copy; MDCCXCII&ndash;MMXXVI The Atlas Archive &bull; All folio rights reserved</div>
            <div className="flex gap-6">
              <Link className="transition-colors hover:text-atlas-brass" href="/destinations">
                Destinations
              </Link>
              <a className="transition-colors hover:text-atlas-brass" href="#registration-section">
                Field Register
              </a>
              <a className="transition-colors hover:text-atlas-brass" href="#folio-inspector">
                Survey Plates
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Screen-reader live region for pin selection */}
      <span className="sr-only" role="status">
        {`Selected ${pin.source} on ${plate.plateNo}`}
      </span>
    </div>
  );
}
