import { DESTINATIONS, type Destination } from "./destinations";

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
  cardTitle: string;
  temp: string;
  prose: string;
  proseAside: string;
  coords: string;
  liveLat: string;
  liveLon: string;
  elevation: string;
  anomaly: string;
  astronomy: string;
  pins: PlatePin[];
  drawerNotes: { text: string; source: string; tone: "brass" | "terra" }[];
  sextant: string;
  baro: string;
  sealSector: string;
  sealNo: string;
}

export interface AtlasDispatch {
  id: string;
  entry: string;
  coords: string;
  title: string;
  teaser: string;
  quote: string;
  category: "acoustic" | "celestial" | "terrain";
  destinationId: string;
}

const PLATE_SLUGS = ["reykjavik", "tokyo", "marrakech", "cairo"];

function pad2(n: number): string {
  return String(Math.floor(n)).padStart(2, "0");
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

export function formatDispatchCoords(lat: number, lng: number): string {
  const latPart = `${Math.abs(lat).toFixed(2)}\u00b0${lat >= 0 ? "N" : "S"}`;
  const lngPart = `${Math.abs(lng).toFixed(2)}\u00b0${lng >= 0 ? "E" : "W"}`;
  return `${latPart}, ${lngPart}`;
}

const PIN_TEMPLATES: Omit<PlatePin, "note" | "source">[] = [
  { id: 1, top: "35%", left: "28%", label: "PT. \u03b1 \u2022 SOUNDING", tone: "brass" },
  { id: 2, top: "68%", left: "64%", label: "PT. \u03b2 \u2022 SPECIMEN", tone: "brass" },
  { id: 3, top: "22%", left: "72%", label: "PT. \u03b3 \u2022 AZIMUTH", tone: "terra" },
];

function buildPins(name: string): PlatePin[] {
  const notes = [
    {
      note: `\u201cIs it wind, or the sea breathing beneath two fathoms of slate off ${name}? The needle shivers when we face the outer breakwater.\u201d \u2014 H.V.`,
      source: "FIELD REGISTER PINPOINT \u03b1",
    },
    {
      note: `\u201cSpecimen 44: fauna sampled off ${name} fluoresces faint cyan when exposed to lantern flame.\u201d`,
      source: "FIELD REGISTER PINPOINT \u03b2",
    },
    {
      note: `\u201cAzimuth reading drifts clockwise by three arcseconds per watch over ${name}. We verify with sextant twice daily.\u201d`,
      source: "FIELD REGISTER PINPOINT \u03b3",
    },
  ];
  return PIN_TEMPLATES.map((pin, i) => ({ ...pin, ...notes[i] }));
}

function buildPlate(destination: Destination, index: number): AtlasPlate {
  const { name, country, lat, lng, heroImage } = destination;
  const fig = 18 + index * 21;
  return {
    slug: destination.id,
    plateNo: `PLATE NO. 0${fig}-A`,
    sector: `${country.toUpperCase()} SECTOR`,
    title: `Where Does the Sea Turn to Stone? The ${name} Drift`,
    shortTitle: `${name} Drift`,
    subtitle: `A quiet inquiry into frozen fjords, solitary coastlines, and why the compass begins to hesitate near ${name} in the long twilight.`,
    epigraph: `\u201cWhat lies past the perimeter of our charts? Questions gathered at the outer rim of ${country}.\u201d`,
    image: heroImage,
    scaleLabel: `PLATE FIG. ${fig} \u2022 MERCATOR SCALE 1:50,000`,
    captionQuote: `\u2014 ${name} hummocks sounded at ${8 + index} fathoms`,
    cardTitle: `Field Inquiries \u2022 ${name} Station`,
    temp: `${(-24.5 + index * 6.25).toFixed(1)}\u00b0 C`,
    prose: `At zero-eight-hundred the fjord groans under an unseen current. Why is the silence here heavier than elsewhere? There is no bird, no insect, no thaw\u2014only the low resonance of the ${country} coastline compressing into blue quartz.`,
    proseAside: `We left lantern tallow on the drift-line; by noon, something had tasted it and turned toward the open sea.`,
    coords: formatDMS(lat, lng),
    liveLat: `LAT: ${Math.abs(lat).toFixed(0)}\u00b0${lat >= 0 ? "N" : "S"}`,
    liveLon: `LON: ${Math.abs(lng).toFixed(0)}\u00b0${lng >= 0 ? "E" : "W"}`,
    elevation: `${14 + index * 9}m AMSL (Coastline)`,
    anomaly: `Compass Variation ${(-11.4 + index * 2.3).toFixed(1)}\u00b0`,
    astronomy: `\u201cA green filament uncoiled across Polaris at 11:40 UTC. Is there an electrical pulse between sea and sun?\u201d`,
    pins: buildPins(name),
    drawerNotes: [
      {
        text: `\u201c08:14 UTC \u2014 Sounding through shelf ice revealed counter-current at ${8 + index} fathoms. Needle deflected 4 degrees east.\u201d`,
        source: "Sounding Register 14",
        tone: "brass",
      },
      {
        text: `\u201cWhy does lantern tallow turn turquoise on the tidal crack near ${name}? Unmapped copper-brine saturation.\u201d`,
        source: "Field Chemist Note",
        tone: "terra",
      },
    ],
    sextant: `${38 + index}\u00b0 14\u2032`,
    baro: `${(1024.2 - index * 3.1).toFixed(1)} hPa`,
    sealSector: `${country.toUpperCase()} CORRIDOR`,
    sealNo: `NO. ${441 + index * 37}-S`,
  };
}

export const ATLAS_PLATES: AtlasPlate[] = PLATE_SLUGS.map((slug, index) => {
  const destination = DESTINATIONS.find((d) => d.id === slug);
  if (!destination) {
    throw new Error(`Unknown atlas plate destination: ${slug}`);
  }
  return buildPlate(destination, index);
});

const DISPATCH_DEFS: {
  destinationId: string;
  entry: string;
  title: string;
  teaser: string;
  quote: string;
  category: AtlasDispatch["category"];
}[] = [
  {
    destinationId: "kyoto",
    entry: "ENTRY 082",
    title: "Why Do the Hollow Canes Ring at Dawn?",
    teaser:
      "Before first light in the northern ravine, an unbroken acoustic hum rises from the bamboo groves. The moss circles around the basins orient to magnetic west.",
    quote: "\u201cCount seventy paces...\u201d",
    category: "acoustic",
  },
  {
    destinationId: "marrakech",
    entry: "ENTRY 097",
    title: "The Red Mountain That Swallows Echoes",
    teaser:
      "Tizi n\u2019Test defies sound: speak toward the valley and the echo returns delayed by half a heartbeat. Why do brass amphorae hum when the afternoon gales rise?",
    quote: "\u201cThree pinch-stones...\u201d",
    category: "terrain",
  },
  {
    destinationId: "santorini",
    entry: "ENTRY 114",
    title: "Looking Through Five Kilometers of Emptiness",
    teaser:
      "Above the caldera, the galactic core casts distinct hand-shadows onto white salt polygons. If absolute silence had mass, it would crack the stone.",
    quote: "\u201cDr. Vandermeer\u201d",
    category: "celestial",
  },
];

export const ATLAS_DISPATCHES: AtlasDispatch[] = DISPATCH_DEFS.flatMap((def) => {
  const destination = DESTINATIONS.find((d) => d.id === def.destinationId);
  if (!destination) return [];
  return [
    {
      ...def,
      id: def.destinationId,
      coords: formatDispatchCoords(destination.lat, destination.lng),
    },
  ];
});
