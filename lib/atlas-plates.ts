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

/* ------------------------------------------------------------------ */
/* Rotating phrase banks so all 31 plates feel hand-set, not stamped   */
/* ------------------------------------------------------------------ */

const QUESTIONS = [
  "Where Does the Sea Turn to Stone?",
  "Why Do the Compasses Hesitate Here?",
  "What Sings Beneath the Harbor Fog?",
  "Where Do the Dunes Swallow the Stars?",
  "How Old Is the Light on These Rooftops?",
  "Where the Charts Run Out of Ink",
  "What Sleeps Beneath the Still Water?",
  "Which Wind Carries the Bells Home?",
];

const SUFFIXES = [
  "Drift",
  "Passage",
  "Expanse",
  "Meridian",
  "Traverse",
  "Soundings",
  "Latitude",
  "Crossing",
];

const SUBTITLES = [
  (name: string) =>
    `A quiet inquiry into frozen fjords, solitary coastlines, and why the compass begins to hesitate near ${name} in the long twilight.`,
  (name: string) =>
    `A quiet inquiry into salt-stained instruments, patient horizons, and the way ${name} quietly rearranges distance.`,
  (name: string, country: string) =>
    `A quiet inquiry into unmapped currents, borrowed light, and the silence between two bells at ${name}, on the ${country} rim.`,
  (country: string) =>
    `A quiet inquiry into ledger margins, errant compasses, and the stubborn weather of the ${country} interior.`,
];

const CAPTION_QUOTES = [
  (name: string, n: number) => `\u2014 ${name} hummocks sounded at ${n} fathoms`,
  (name: string) => `\u2014 bell heard across the ${name} roads at ebb tide`,
  (country: string) => `\u2014 lantern tallow recorded at the ${country} drift-line`,
  (name: string) => `\u2014 dust and sea-smoke measured off ${name}`,
];

const TERRAIN = ["Coastline", "Plateau", "Basin", "Ridge", "Delta", "Highlands", "Harbor"];

const ASTRONOMY = [
  () =>
    `\u201cA green filament uncoiled across Polaris at 11:40 UTC. Is there an electrical pulse between sea and sun?\u201d`,
  () =>
    `\u201cTwo shadows at noon \u2014 one ours, one unaccounted for. The sextant insists both are real.\u201d`,
  () => `\u201cThe magnetometer swayed with no wind. We logged it as weather and moved on.\u201d`,
  (name: string) =>
    `\u201cVenus rose early and sat low over ${name}, as if waiting for the tide to finish its arithmetic.\u201d`,
];

const PROSE = [
  (name: string, country: string, terrain: string) =>
    `At zero-eight-hundred the ${name} fog lifts under an unseen current. Why is the silence here heavier than elsewhere? There is no bird, no bell, no thaw\u2014only the low resonance of the ${country} ${terrain.toLowerCase()} compressing into blue quartz.`,
  (name: string, country: string) =>
    `The ${country} light arrives late and leaves early. We recorded ${name} in three weathers and not one of them agreed with the chart.`,
  (name: string, country: string, terrain: string) =>
    `Somewhere beneath the ${name} quays the old soundings still hold. Why does the needle lean toward the ${terrain.toLowerCase()} as if it remembered a coastline the charts forgot?`,
  (name: string, country: string) =>
    `Barometers disagree about ${name}. The register says ${country}; the wind says otherwise. We side with the wind, provisionally.`,
];

const PROSE_ASIDES = [
  () =>
    `We left lantern tallow on the drift-line; by noon, something had tasted it and turned toward the open sea.`,
  () => `The moss circles around the well-head orient to magnetic west \u2014 every one of them, without exception.`,
  () => `A courier arrived with blank paper and asked us not to fill it. We filled it.`,
];

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

const PIN_TONES: PlatePin["tone"][][] = [
  ["brass", "brass", "terra"],
  ["brass", "terra", "brass"],
  ["terra", "brass", "brass"],
  ["brass", "brass", "terra"],
];

const pick = <T,>(list: T[], index: number): T => list[index % list.length];

function buildPins(destination: Destination, index: number): PlatePin[] {
  const { name, places } = destination;
  const positions = pick(PIN_POSITIONS, index);
  const tones = pick(PIN_TONES, index);
  const notes = [
    {
      label: "PT. \u03b1 \u2022 SOUNDING",
      note: `\u201cIs it wind, or the sea breathing beneath two fathoms of slate off ${name}? The needle shivers when we face the ${places[0]?.name ?? "outer breakwater"}.\u201d \u2014 H.V.`,
      source: "FIELD REGISTER PINPOINT \u03b1",
    },
    {
      label: "PT. \u03b2 \u2022 SPECIMEN",
      note: `\u201cSpecimen 44, drawn at the ${places[1]?.name ?? "harbor basin"} near ${name}, fluoresces faint cyan under lantern flame.\u201d`,
      source: "FIELD REGISTER PINPOINT \u03b2",
    },
    {
      label: "PT. \u03b3 \u2022 AZIMUTH",
      note: `\u201cAzimuth readings above ${name} drift ${index % 2 === 0 ? "clockwise" : "counter-clockwise"} by ${3 + (index % 7)} arcseconds per watch. We verify with sextant twice daily.\u201d`,
      source: "FIELD REGISTER PINPOINT \u03b3",
    },
  ];
  return notes.map((entry, i) => ({
    id: i + 1,
    top: positions[i].top,
    left: positions[i].left,
    tone: tones[i],
    ...entry,
  }));
}

function buildPlate(destination: Destination, index: number): AtlasPlate {
  const { name, country, lat, lng, heroImage, places } = destination;
  const fig = 18 + index * 3;
  const terrain = pick(TERRAIN, index);
  const question = pick(QUESTIONS, index);
  const suffix = pick(SUFFIXES, index);
  const subtitleFn = pick(SUBTITLES, index);
  const proseFn = pick(PROSE, index);
  const captionFn = pick(CAPTION_QUOTES, index);
  const astronomyFn = pick(ASTRONOMY, index);
  const hour = pad2(6 + (index % 4));

  return {
    slug: destination.id,
    plateNo: `PLATE NO. ${String(fig).padStart(3, "0")}-A`,
    sector: `${country.toUpperCase()} SECTOR`,
    title: `${question} The ${name} ${suffix}`,
    shortTitle: `${name} ${suffix}`,
    subtitle: subtitleFn(name, country),
    epigraph: `\u201cWhat lies past the perimeter of our charts? Questions gathered at the outer rim of ${country}.\u201d`,
    image: heroImage,
    scaleLabel: `PLATE FIG. ${fig} \u2022 MERCATOR SCALE 1:50,000`,
    captionQuote: captionFn(name, 8 + (index % 9)),
    cardTitle: `Field Inquiries \u2022 ${name} Station`,
    temp: `${(28 - Math.abs(lat) * 0.55).toFixed(1)}\u00b0 C`,
    prose: proseFn(name, country, terrain),
    proseAside: pick(PROSE_ASIDES, index)(),
    coords: formatDMS(lat, lng),
    liveLat: `LAT: ${Math.abs(lat).toFixed(0)}\u00b0${lat >= 0 ? "N" : "S"}`,
    liveLon: `LON: ${Math.abs(lng).toFixed(0)}\u00b0${lng >= 0 ? "E" : "W"}`,
    elevation: `${6 + ((index * 13) % 190)}m AMSL (${terrain})`,
    anomaly: `Compass Variation ${(-11.4 + ((index * 7) % 23) - 5).toFixed(1)}\u00b0`,
    astronomy: astronomyFn(name),
    pins: buildPins(destination, index),
    drawerNotes: [
      {
        text: `\u201c${hour}:14 UTC \u2014 Sounding through the ${terrain.toLowerCase()} shelf revealed counter-current at ${8 + (index % 9)} fathoms. Needle deflected ${2 + (index % 5)} degrees east.\u201d`,
        source: `Sounding Register ${12 + index}`,
        tone: "brass",
      },
      {
        text: `\u201cWhy does lantern tallow turn turquoise on the ${name} tidal crack? ${places[2]?.name ?? "The lower quarter"} hums when the gales rise.\u201d`,
        source: "Field Chemist Note",
        tone: "terra",
      },
    ],
    sextant: `${30 + (index % 14)}\u00b0 ${10 + (index % 5) * 7}\u2032`,
    baro: `${(1024.2 - (index % 9) * 2.3).toFixed(1)} hPa`,
    sealSector: `${country.toUpperCase()} CORRIDOR`,
    sealNo: `NO. ${441 + index * 13}-S`,
  };
}

export const ATLAS_PLATES: AtlasPlate[] = DESTINATIONS.map((destination, index) =>
  buildPlate(destination, index),
);

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
