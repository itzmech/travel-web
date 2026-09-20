"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Crosshair, MapPin, X } from "lucide-react";
import {
  ATLAS_PLATES,
  CONTINENT_FILTERS,
  ATLAS_TOTALS,
  type AtlasPlate,
  type FieldNote,
} from "@/lib/atlas-plates";

/* Shared slideshow timing — one authority for both folio pages */
export const PLATE_CHANGE_MS = 10_000;
export const PROGRESS_SPAN = "7s";

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
                {ATLAS_PLATES.length} Destinations &bull; Honest Guides
              </span>
            </Link>
          </div>
          <nav className="hidden items-center gap-9 font-atlas-label text-xs uppercase tracking-[0.2em] text-atlas-dim md:flex">
            <Link className="transition-colors hover:text-atlas-ink" href="/">
              Plates
            </Link>
            <Link className="transition-colors hover:text-atlas-ink" href="/explore">
              Explore All
            </Link>
            <a className="transition-colors hover:text-atlas-ink" href="#field-notes">
              Field Notes
            </a>
            <a className="transition-colors hover:text-atlas-ink" href="#plan-section">
              Plan
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
              <span className="hidden sm:inline">Trip Notes</span>
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
                  Wander &mdash; The Atlas
                </span>
              </div>
              <p className="max-w-lg font-atlas-body text-base italic text-atlas-faint">
                Explore the world beyond the obvious. {ATLAS_PLATES.length} honest guides:{" "}
                {ATLAS_TOTALS.pros} reasons to go, {ATLAS_TOTALS.cons} things to watch, and{" "}
                {ATLAS_TOTALS.places} places that matter.
              </p>
            </div>
            <div className="space-y-1 font-mono text-xs text-atlas-faint">
              <div>{ATLAS_TOTALS.places} CURATED SITES ACROSS {ATLAS_PLATES.length} GUIDES</div>
              <div>EVERY GUIDE: WHAT TO SEE, SKIP, AND WHEN TO GO</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 font-atlas-label text-xs uppercase tracking-wider text-atlas-faint sm:flex-row">
            <div>&copy; 2024&ndash;2026 Wander &bull; All guides independently researched</div>
            <div className="flex gap-6">
              <Link className="transition-colors hover:text-atlas-brass" href="/explore">
                Explore All
              </Link>
              <Link className="transition-colors hover:text-atlas-brass" href="/destinations">
                Destination Guides
              </Link>
              <a className="transition-colors hover:text-atlas-brass" href="#plan-section">
                Plan a Trip
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inspector dossier + top-picks cards                                 */
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
            Why go
          </span>
          <h3 className="font-atlas-serif text-2xl font-normal text-atlas-bright">
            {plate.cardTitle}
          </h3>
        </div>
        <span aria-hidden className="text-2xl">{plate.badge}</span>
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
          <span className="text-[11px] uppercase tracking-wider text-atlas-faint">
            Curated sites
          </span>
          <span className="font-medium text-atlas-brass">{plate.sites} mapped</span>
        </div>
        <div className="flex items-center justify-between py-0.5">
          <span className="text-[11px] uppercase tracking-wider text-atlas-faint">
            Pros / cons
          </span>
          <span className="text-atlas-ink">
            {plate.stats.pros} / {plate.stats.cons}
          </span>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-atlas-outline-soft pt-4">
        <button
          className="group inline-flex cursor-pointer items-center gap-2 font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright"
          onClick={onOpenDrawer}
          type="button"
        >
          <span>Open Trip Notes</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <Link
          className="font-mono text-[10px] uppercase tracking-widest text-atlas-faint transition-colors hover:text-atlas-brass"
          href={`/destinations/${plate.slug}`}
        >
          Full guide &rarr;
        </Link>
      </div>
    </div>
  );
}

export function TopPicksCard({ plate }: { plate: AtlasPlate }) {
  return (
    <div className="relative border border-atlas-outline bg-atlas-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
          What to see &bull; {plate.shortTitle}
        </span>
        <span aria-hidden className="text-lg leading-none">{plate.badge}</span>
      </div>
      <ul className="space-y-3">
        {plate.sights.map((place) => (
          <li className="flex gap-3" key={place.name}>
            <span aria-hidden className="mt-0.5 shrink-0 text-lg leading-none">
              {place.icon}
            </span>
            <div>
              <p className="font-atlas-serif text-base text-atlas-bright">{place.name}</p>
              <p className="font-atlas-body text-sm leading-snug text-atlas-faint">
                {place.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field notes (continent-filtered)                                    */
/* ------------------------------------------------------------------ */

export function FieldNotesSection({ notes }: { notes: FieldNote[] }) {
  const [filter, setFilter] = useState<(typeof CONTINENT_FILTERS)[number]>("All");
  const visible = filter === "All" ? notes : notes.filter((n) => n.category === filter);

  return (
    <section className="border-b border-atlas-outline-soft py-28" id="field-notes">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="mb-3 block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.28em] text-atlas-brass">
            Field Notes &bull; Straight From the Guides
          </span>
          <h2 className="font-atlas-serif text-3xl font-normal tracking-tight text-atlas-bright sm:text-4xl">
            Every destination, honestly assessed
          </h2>
          <p className="mt-3 font-atlas-body text-lg font-light italic text-atlas-body">
            The highlights and the letdowns, side by side &mdash; so you know where to spend your
            days and what to skip.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-xs border border-atlas-outline bg-atlas-container p-1 font-atlas-label text-[11px] uppercase tracking-wider">
          {CONTINENT_FILTERS.map((item) => (
            <button
              className={`cursor-pointer px-3 py-1.5 transition-colors ${
                filter === item
                  ? "bg-atlas-raised font-medium text-atlas-brass"
                  : "text-atlas-faint hover:text-atlas-ink"
              }`}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {visible.map((note) => (
          <article
            className="group flex flex-col justify-between border border-atlas-outline-soft bg-atlas-surface p-7 transition-colors hover:border-atlas-outline"
            key={note.id}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] text-atlas-faint">
                <span>
                  <span aria-hidden className="mr-1.5">{note.flag}</span>
                  {note.country}
                </span>
                <span className="text-atlas-brass/80">{note.coords}</span>
              </div>
              <h3 className="font-atlas-serif text-xl leading-snug text-atlas-bright transition-colors group-hover:text-atlas-brass">
                {note.title}
              </h3>
              <p className="font-atlas-body text-sm leading-relaxed text-atlas-body">
                {note.teaser}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-atlas-outline-soft pt-5">
              <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
                {note.category}
              </span>
              <Link
                aria-label={`Open the ${note.title} field guide`}
                className="font-mono text-xs text-atlas-brass transition-transform hover:translate-x-1"
                href={`/destinations/${note.destinationId}`}
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
/* Plan-a-trip section                                                 */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function PlanSection({ destinations }: { destinations: AtlasPlate[] }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-28" id="plan-section">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-6">
          <div className="space-y-3">
            <span className="block font-atlas-label text-[11px] font-semibold uppercase tracking-[0.28em] text-atlas-brass">
              Trip Planner
            </span>
            <h2 className="font-atlas-serif text-3xl font-normal leading-tight text-atlas-bright sm:text-4xl">
              Start with an honest guide, not a highlight reel
            </h2>
            <div className="pt-1 font-mono text-xs text-atlas-faint">
              {ATLAS_PLATES.length} DESTINATIONS &bull; {ATLAS_TOTALS.pros} PROS &bull;{" "}
              {ATLAS_TOTALS.cons} CONS &bull; {ATLAS_TOTALS.places} SITES
            </div>
          </div>
          <div className="space-y-5 font-atlas-body text-lg font-light leading-relaxed text-atlas-body">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-atlas-serif first-letter:text-5xl first-letter:text-atlas-brass">
              Every guide in the Atlas lists what a place is genuinely good for, what will test
              your patience, and the specific sights worth your time &mdash; from the {ATLAS_PLATES[0].shortTitle} to{" "}
              {ATLAS_PLATES[ATLAS_PLATES.length - 1].shortTitle}.
            </p>
            <p className="text-base text-atlas-faint">
              Tell us where you&apos;re headed and when. We&apos;ll keep your note with the
              register &mdash; and point you at the guide that matches.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-atlas-outline-soft pt-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-atlas-brass" />
              <span className="font-mono text-xs text-atlas-faint">
                {destinations.length} guides ready to browse
              </span>
            </div>
            <Link
              className="group inline-flex items-center gap-2 font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright"
              href="/destinations"
            >
              <span>Browse all guides</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative border border-atlas-outline bg-atlas-surface p-8 shadow-2xl sm:p-10 lg:col-span-6">
          <div className="mb-6 border-b border-atlas-outline-soft pb-6 text-center">
            <span aria-hidden className="mb-1 block font-atlas-hand text-3xl text-atlas-brass">
              &#10022;
            </span>
            <h3 className="font-atlas-serif text-2xl font-normal tracking-wide text-atlas-bright">
              Plan Your Crossing
            </h3>
            <p className="mt-1.5 font-atlas-body text-xs italic text-atlas-faint">
              Pick a destination and a month &mdash; we&apos;ll match you with the honest guide.
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
                Your name
              </label>
              <input
                className="w-full border border-atlas-outline bg-atlas-abyss px-4 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors placeholder:text-atlas-faint/50 focus:border-atlas-brass/80 focus:outline-none"
                id="atlas-name"
                placeholder="e.g., Alex Rivera"
                required
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                  htmlFor="atlas-destination"
                >
                  Destination
                </label>
                <select
                  className="w-full border border-atlas-outline bg-atlas-abyss px-3 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors focus:border-atlas-brass/80 focus:outline-none"
                  id="atlas-destination"
                >
                  {destinations.map((destination) => (
                    <option key={destination.slug} value={destination.slug}>
                      {destination.badge} {destination.shortTitle}, {destination.sector.replace(" SECTOR", "")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                  htmlFor="atlas-month"
                >
                  When
                </label>
                <select
                  className="w-full border border-atlas-outline bg-atlas-abyss px-3 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors focus:border-atlas-brass/80 focus:outline-none"
                  id="atlas-month"
                >
                  {MONTHS.map((month) => (
                    <option key={month}>{month} 2027</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                className="mb-1.5 block font-atlas-label text-[10px] font-medium uppercase tracking-widest text-atlas-dim"
                htmlFor="atlas-notes"
              >
                Anything we should know?
              </label>
              <textarea
                className="w-full resize-none border border-atlas-outline bg-atlas-abyss px-4 py-2.5 font-atlas-body text-sm text-atlas-ink transition-colors placeholder:text-atlas-faint/50 focus:border-atlas-brass/80 focus:outline-none"
                id="atlas-notes"
                placeholder="Travel style, must-sees, things you'd rather skip..."
                rows={3}
              />
            </div>
            <div className="pt-2">
              <button
                className="w-full cursor-pointer border border-atlas-brass/60 bg-[#815a00] px-6 py-3 font-atlas-label text-xs font-bold uppercase tracking-[0.22em] text-atlas-brass-bright shadow-sm transition-colors hover:bg-[#dca842] hover:text-atlas-bg"
                type="submit"
              >
                Add to the Trip Register
              </button>
            </div>
            {submitted && (
              <div className="border border-atlas-brass/40 bg-atlas-container p-3 text-center font-atlas-hand text-lg text-atlas-brass">
                &#10003; Noted &mdash; your trip is in the register.
              </div>
            )}
            <div className="pt-1 text-center">
              <span className="font-atlas-hand text-sm text-atlas-faint">
                We match your note with the honest guide for that destination
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trip-notes drawer                                                   */
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
        aria-label="Trip notes"
        className={`drawer-transition fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col justify-between border-l border-atlas-outline bg-atlas-surface shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        id="notebook-drawer"
      >
        <div className="flex items-center justify-between border-b border-atlas-outline-soft bg-atlas-container p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-2xl">{plate.badge}</span>
            <div>
              <h3 className="font-atlas-serif text-lg uppercase tracking-wider text-atlas-bright">
                Trip Notes
              </h3>
              <span className="font-mono text-[10px] text-atlas-faint">
                {plate.sector} &bull; {plate.sites} CURATED SITES
              </span>
            </div>
          </div>
          <button
            aria-label="Close Trip Notes"
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
              Now inspecting
            </span>
            <h4 className="font-atlas-serif text-xl text-atlas-bright">
              {plate.plateNo.replace("PLATE NO. ", "Guide ")} &bull; {plate.shortTitle}
            </h4>
            <span className="font-mono text-xs text-atlas-dim">{plate.coords}</span>
          </div>
          <div className="space-y-4">
            <span className="block font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
              Pros &amp; cons, on the record
            </span>
            <div className="space-y-4 font-atlas-body text-base leading-relaxed">
              {plate.drawerNotes.map((note) => (
                <div
                  className={`border-l-2 bg-atlas-abyss/60 p-4 ${
                    note.tone === "terra" ? "border-atlas-terra" : "border-atlas-brass"
                  }`}
                  key={note.source}
                >
                  <p className="text-atlas-ink">{note.text}</p>
                  <span className="mt-2 block text-right font-mono text-xs text-atlas-faint">
                    &mdash; {note.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 border border-atlas-outline bg-atlas-abyss p-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-atlas-faint">
              At a glance
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>TOP PICK:</span>
              <span className="text-atlas-brass">
                {plate.topPick ? `${plate.topPick.icon} ${plate.topPick.name}` : "\u2014"}
              </span>
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>CURATED SITES:</span>
              <span className="text-atlas-ink">{plate.sites}</span>
            </div>
            <div className="flex justify-between text-atlas-dim">
              <span>PROS / CONS:</span>
              <span className="text-atlas-ink">
                {plate.stats.pros} / {plate.stats.cons}
              </span>
            </div>
          </div>
          <Link
            className="group flex items-center justify-between border border-atlas-outline-soft bg-atlas-panel p-4 transition-colors hover:border-atlas-brass/50"
            href={`/destinations/${plate.slug}`}
          >
            <span className="font-atlas-label text-[10px] uppercase tracking-widest text-atlas-faint">
              Continue to the full guide
            </span>
            <MapPin className="h-4 w-4 text-atlas-brass transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="flex items-center justify-between border-t border-atlas-outline-soft bg-atlas-container p-6">
          <span className="font-mono text-[11px] text-atlas-faint">
            GUIDE {plate.plateNo.replace("PLATE NO. ", "")} &bull; {plate.sector.replace(" SECTOR", "").toUpperCase()}
          </span>
          <button
            className="cursor-pointer font-atlas-label text-xs uppercase tracking-widest text-atlas-brass transition-colors hover:text-atlas-brass-bright"
            onClick={closeDrawer}
            type="button"
          >
            Back to the folio
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
