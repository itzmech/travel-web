"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Crosshair,
  X,
} from "lucide-react";
import type { AtlasDispatch, AtlasPlate } from "@/lib/atlas-plates";

/* Shared slideshow timing — one authority for both folio pages */
export const PLATE_CHANGE_MS = 10_000;
export const PROGRESS_MS = 7_000;
export const PROGRESS_SPAN = "7s";

export const FILTERS = [
  { key: "all", label: "All" },
  { key: "acoustic", label: "Acoustic" },
  { key: "celestial", label: "Celestial" },
  { key: "terrain", label: "Terrain" },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];

export function PinDot({ tone }: { tone: "brass" | "terra" }) {
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

/* ------------------------------------------------------------------ */
/* Shared chrome: folio header + footer                                */
/* ------------------------------------------------------------------ */

export function FolioChrome({
  children,
  activePlate,
  onOpenNotebook,
}: {
  children: React.ReactNode;
  activePlate: AtlasPlate;
  onOpenNotebook: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-atlas-bg text-atlas-ink">
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
            <Link className="transition-colors hover:text-atlas-ink" href="/">
              Survey Plates
            </Link>
            <Link className="transition-colors hover:text-atlas-ink" href="/explore">
              The Grand Survey
            </Link>
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
              <span className="text-atlas-brass/90">{activePlate.liveLat}</span>
              <span className="text-atlas-outline">&bull;</span>
              <span className="text-atlas-dim">{activePlate.liveLon}</span>
            </div>
            <button
              className="flex cursor-pointer items-center gap-2 border border-transparent px-3 py-1.5 font-atlas-label text-xs uppercase tracking-widest text-atlas-ink transition-colors hover:border-atlas-outline hover:text-atlas-brass"
              onClick={onOpenNotebook}
              type="button"
            >
              <BookOpen className="h-[17px] w-[17px] text-atlas-brass" />
              <span className="hidden sm:inline">Surveyor&apos;s Notebook</span>
            </button>
          </div>
        </div>
      </header>

      {children}

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
              <Link className="transition-colors hover:text-atlas-brass" href="/explore">
                Grand Survey
              </Link>
              <Link className="transition-colors hover:text-atlas-brass" href="/destinations">
                Destination Guides
              </Link>
              <a className="transition-colors hover:text-atlas-brass" href="#registration-section">
                Field Register
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inspector dossier + astronomy cards                                 */
/* ------------------------------------------------------------------ */

export function DossierCard({
  plate,
  onOpenDrawer,
}: {
  plate: AtlasPlate;
  onOpenDrawer: () => void;
}) {
  return (
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
          <span className="text-[11px] uppercase tracking-wider text-atlas-faint">Coordinates</span>
          <span className="font-medium text-atlas-ink">{plate.coords}</span>
        </div>
        <div className="flex items-center justify-between py-0.5">
          <span className="text-[11px] uppercase tracking-wider text-atlas-faint">Elevation</span>
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
          onClick={onOpenDrawer}
          type="button"
        >
          <span>Open Expedition Notebook</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <span className="font-mono text-[10px] text-atlas-faint">SEALED ENTRY</span>
      </div>
    </div>
  );
}

export function AstronomyCard({ plate }: { plate: AtlasPlate }) {
  return (
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
  );
}

/* ------------------------------------------------------------------ */
/* Dispatches                                                          */
/* ------------------------------------------------------------------ */

export function DispatchesSection({ dispatches }: { dispatches: AtlasDispatch[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const visible =
    filter === "all" ? dispatches : dispatches.filter((d) => d.category === filter);

  return (
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
            Transcribed directly from logbooks left open in salt gales, thin altitudes, and magnetic
            silence.
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
        {visible.map((dispatch) => (
          <article
            className="group flex flex-col justify-between border border-atlas-outline-soft bg-atlas-surface p-7 transition-colors hover:border-atlas-outline"
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
  );
}

/* ------------------------------------------------------------------ */
/* Register section                                                    */
/* ------------------------------------------------------------------ */

export function RegisterSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
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
              ashore? The salt fog smells of rusted copper and old kelp. Beneath four meters of
              moving sand, our probes struck petrified caravel ribs that charts say never sailed.
            </p>
            <p className="text-base text-atlas-faint">
              The south wind deposits quartz granules inside every compass bezel. What unmapped
              phenomena have you observed in your own crossings?
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
              Have you seen something unmapped? Enter your coordinates and field notes into the
              Society&apos;s register.
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
  );
}

/* ------------------------------------------------------------------ */
/* Notebook drawer                                                     */
/* ------------------------------------------------------------------ */

export function NotebookDrawer({
  open,
  plate,
  onClose,
}: {
  open: boolean;
  plate: AtlasPlate;
  onClose: () => void;
}) {
  const closeDrawer = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeDrawer]);

  return (
    <>
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-atlas-abyss/80 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        id="notebook-backdrop"
        onClick={closeDrawer}
      />
      <aside
        aria-hidden={!open}
        aria-label="Surveyor's Notebook"
        className={`drawer-transition fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col justify-between border-l border-atlas-outline bg-atlas-surface shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
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
              {plate.plateNo.replace("PLATE NO. ", "Plate No. ")} &bull; {plate.shortTitle}
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
            ARCHIVAL REF {plate.sealNo.replace("NO. ", "#S-").replace("-S", "")}
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Crosshair icon re-export for plate components                       */
/* ------------------------------------------------------------------ */

export { Crosshair };
