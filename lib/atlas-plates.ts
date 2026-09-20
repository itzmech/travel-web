import { DESTINATIONS, type Destination, type Place } from "./destinations";

export interface PlatePin {
  id: number;
  top: string;
  left: string;
  label: string;
  tone: "brass" | "terra";
  note: string;
  source: string;
}

export interface AtlasPlate {
  slug: string;
  plateNo: string;
  sector: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  epigraph: string;
  image: string;
  scaleLabel: string;
  captionQuote: string;
  badge: string;
  cardTitle: string;
  prose: string;
  proseAside: string;
  coords: string;
  liveLat: string;
  liveLon: string;
  sites: number;
  topPick: Place | null;
  sights: Place[];
  pins: PlatePin[];
  drawerNotes: { text: string; source: string; tone: "brass" | "terra" }[];
  stats: { pros: number; cons: number; places: number };
  sealSector: string;
  sealNo: string;
}

export interface FieldNote {
  id: string;
  destinationId: string;
  flag: string;
  country: string;
  title: string;
  teaser: string;
  coords: string;
  category: Continent;
}

export type Continent = "Europe" | "Asia" | "Africa" | "Americas" | "Oceania";

const CONTINENTS: Record<string, Continent> = {
  France: "Europe",
  Italy: "Europe",
  Greece: "Europe",
  "Czech Republic": "Europe",
  Netherlands: "Europe",
  Portugal: "Europe",
  Spain: "Europe",
  Austria: "Europe",
  Turkey: "Europe",
  "United Kingdom": "Europe",
  Iceland: "Europe",
  Japan: "Asia",
  Indonesia: "Asia",
  Singapore: "Asia",
  Thailand: "Asia",
  "South Korea": "Asia",
  Vietnam: "Asia",
  India: "Asia",
  Maldives: "Asia",
  UAE: "Asia",
  Morocco: "Africa",
  Egypt: "Africa",
  Tanzania: "Africa",
  "South Africa": "Africa",
  "United States": "Americas",
  Brazil: "Americas",
  Canada: "Americas",
  Peru: "Americas",
  Argentina: "Americas",
  Australia: "Oceania",
};

export const CONTINENT_FILTERS: ("All" | Continent)[] = [
  "All",
  "Europe",
  "Asia",
  "Africa",
  "Americas",
  "Oceania",
];

function pad2(n: number): string {
  return String(Math.floor(n)).padStart(2, "0");
}

function pad3(n: number): string {
  return String(Math.floor(n)).padStart(3, "0");
}

function dms(value: number, pos: string, neg: string): string {
  const d = Math.abs(value);
  const degrees = Math.floor(d);
  const minutes = Math.floor((d - degrees) * 60);
  const seconds = Math.round(((d - degrees) * 60 - minutes) * 60);
  return `${degrees}\u00b0 ${pad2(minutes)}\u2032 ${pad2(seconds)}\u2033 ${value >= 0 ? pos : neg}`;
}

export function formatDMS(lat: number, lng: number): string {
  return `${dms(lat, "N", "S")}, ${dms(lng, "E", "W")}`;
}

export function formatShortCoords(lat: number, lng: number): string {
  const latPart = `${Math.abs(lat).toFixed(2)}\u00b0${lat >= 0 ? "N" : "S"}`;
  const lngPart = `${Math.abs(lng).toFixed(2)}\u00b0${lng >= 0 ? "E" : "W"}`;
  return `${latPart}, ${lngPart}`;
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}\u2026`;
}

const PIN_POSITIONS = [
  [
    { top: "35%", left: "28%" },
    { top: "68%", left: "64%" },
    { top: "22%", left: "72%" },
  ],
  [
    { top: "30%", left: "60%" },
    { top: "62%", left: "30%" },
    { top: "24%", left: "74%" },
  ],
  [
    { top: "40%", left: "22%" },
    { top: "66%", left: "58%" },
    { top: "18%", left: "48%" },
  ],
  [
    { top: "32%", left: "50%" },
    { top: "70%", left: "36%" },
    { top: "20%", left: "66%" },
  ],
];

function buildPins(places: Place[], fallbackName: string): PlatePin[] {
  const positions = PIN_POSITIONS[fallbackName.length % PIN_POSITIONS.length];
  return positions.map((position, i) => {
    const place = places[i];
    return {
      id: i + 1,
      top: position.top,
      left: position.left,
      label: `PT. ${i + 1} \u2022 ${truncate((place?.name ?? fallbackName).toUpperCase(), 22)}`,
      tone: i === 2 ? "terra" : "brass",
      note: place
        ? `${place.icon} ${place.name} \u2014 ${place.description}.`
        : `Start at the historic centre of ${fallbackName} and work outward.`,
      source: `WAYPOINT ${i + 1} \u2022 ${place ? place.name.toUpperCase() : "ORIENTATION"}`,
    };
  });
}

function buildPlate(destination: Destination, index: number): AtlasPlate {
  const {
    name,
    country,
    flag,
    lat,
    lng,
    heroImage,
    pros,
    cons,
    places,
  } = destination;
  const fig = index + 1;
  const whyGo = pros.slice(0, 3).join(" ");
  const watchOut = cons[0] ?? "Check seasonal opening hours before you go.";

  return {
    slug: destination.id,
    plateNo: `PLATE NO. ${pad3(fig)}`,
    sector: `${country.toUpperCase()} SECTOR`,
    title: `${name}, ${country}`,
    shortTitle: name,
    subtitle: pros[0] ?? `An honest field guide to ${name}.`,
    epigraph: `${flag} ${places.length} sites \u00b7 ${pros.length} pros \u00b7 ${cons.length} cons`,
    image: heroImage,
    scaleLabel: `PLATE FIG. ${pad3(fig)} \u2022 ${country.toUpperCase()} GUIDE`,
    captionQuote: `\u2014 Watch out: ${truncate(cons[0] ?? "Check seasonal hours.", 70)}`,
    badge: flag,
    cardTitle: `Honest Guide \u2022 ${name}`,
    prose: whyGo,
    proseAside: watchOut,
    coords: formatDMS(lat, lng),
    liveLat: `LAT: ${Math.abs(lat).toFixed(0)}\u00b0${lat >= 0 ? "N" : "S"}`,
    liveLon: `LON: ${Math.abs(lng).toFixed(0)}\u00b0${lng >= 0 ? "E" : "W"}`,
    sites: places.length,
    topPick: places[0] ?? null,
    sights: places.slice(0, 3),
    pins: buildPins(places, name),
    drawerNotes: [
      {
        text: `Why go: ${pros[1] ?? pros[0] ?? "\u2014"}`,
        source: `Pros \u2022 ${name}`,
        tone: "brass",
      },
      {
        text: `Watch out: ${cons[1] ?? cons[0] ?? "\u2014"}`,
        source: `Cons \u2022 ${name}`,
        tone: "terra",
      },
    ],
    stats: { pros: pros.length, cons: cons.length, places: places.length },
    sealSector: country.toUpperCase(),
    sealNo: `NO. ${pad3(fig)}-W`,
  };
}

export const ATLAS_PLATES: AtlasPlate[] = DESTINATIONS.map((destination, index) =>
  buildPlate(destination, index),
);

export const ATLAS_TOTALS: Record<string, number> = ATLAS_PLATES.reduce(
  (totals, plate) => ({
    pros: totals.pros + plate.stats.pros,
    cons: totals.cons + plate.stats.cons,
    places: totals.places + plate.stats.places,
  }),
  { pros: 0, cons: 0, places: 0 },
);

export const FIELD_NOTES: FieldNote[] = DESTINATIONS.map((destination) => ({
  id: destination.id,
  destinationId: destination.id,
  flag: destination.flag,
  country: destination.country,
  title: `${destination.name}: the honest guide`,
  teaser: destination.pros[0] ?? `What to see, skip, and when to go in ${destination.name}.`,
  coords: formatShortCoords(destination.lat, destination.lng),
  category: CONTINENTS[destination.country] ?? "Europe",
}));
