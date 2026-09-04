/**
 * Evolution Auto Sale — fleet data.
 *
 * HOW TO EDIT
 * -----------
 * 1. Drop a photo into /public/images/fleet/ (WebP, roughly 3:2, ~1600px wide).
 *    `node scripts/prepare-images.mjs` will convert source photos for you.
 * 2. Add or edit an entry below.
 * 3. Set `featured: true` for the vehicles that should appear on the homepage
 *    grid. Anything else stays in the data but is not rendered.
 * 4. `bookingUrl` is optional. Leave it out and the card links to the main
 *    booking profile from /config/site.ts.
 *
 * Only categories that actually appear below are rendered as filter pills,
 * so adding a new one (for example "Electric") activates it automatically.
 */

export type VehicleCategory =
  | "Performance"
  | "Luxury"
  | "SUV"
  | "Daily"
  | "Electric";

/** Pill order. Categories with no vehicles are skipped at render time. */
export const CATEGORY_ORDER: VehicleCategory[] = [
  "Performance",
  "Luxury",
  "SUV",
  "Daily",
  "Electric",
];

export type Vehicle = {
  id: string;
  name: string;
  /** Optional — leave undefined until the model year is confirmed. */
  year?: string;
  category: VehicleCategory;
  /** Path under /public. */
  image: string;
  /** Descriptive alt text for screen readers and SEO. */
  alt: string;
  featured: boolean;
  /** Optional per-vehicle external listing. Falls back to the booking profile. */
  bookingUrl?: string;
};

/**
 * Photographs supplied by Evolution Auto Sale.
 *
 * NOTE: `name` values were read from the photographs. Confirm model and trim
 * before launch, and add `year` once known.
 */
export const fleet: Vehicle[] = [
  {
    id: "kia-k4-white",
    name: "Kia K4",
    category: "Daily",
    image: "/images/fleet/vehicle-01.webp",
    alt: "White Kia K4 sedan parked at the Evolution Auto Sale lot in Oceanside, California",
    // Also used on the closing call-to-action band, so it is kept out of the grid.
    featured: false,
  },
  {
    id: "chevrolet-equinox",
    name: "Chevrolet Equinox",
    category: "SUV",
    image: "/images/fleet/vehicle-02.webp",
    alt: "Dark grey Chevrolet Equinox SUV from the Evolution Auto Sale rental fleet",
    featured: true,
  },
  {
    id: "hyundai-elantra-black",
    name: "Hyundai Elantra",
    category: "Daily",
    image: "/images/fleet/vehicle-03.webp",
    alt: "Black Hyundai Elantra sedan in Oceanside, California",
    featured: true,
  },
  {
    id: "kia-telluride",
    name: "Kia Telluride",
    category: "SUV",
    image: "/images/fleet/vehicle-04.webp",
    alt: "Grey Kia Telluride three-row SUV from the Evolution Auto Sale fleet",
    featured: true,
  },
  {
    id: "nissan-altima-sr",
    name: "Nissan Altima SR",
    category: "Daily",
    image: "/images/fleet/vehicle-05.webp",
    alt: "White Nissan Altima SR sedan with black alloy wheels",
    featured: true,
  },
  {
    id: "hyundai-kona",
    name: "Hyundai Kona",
    category: "SUV",
    image: "/images/fleet/vehicle-06.webp",
    alt: "Silver Hyundai Kona compact SUV parked in North County San Diego",
    featured: true,
  },
  {
    id: "kia-forte",
    name: "Kia Forte",
    category: "Daily",
    image: "/images/fleet/vehicle-07.webp",
    alt: "Silver Kia Forte sedan from the Evolution Auto Sale rental fleet",
    featured: true,
  },
  {
    id: "hyundai-elantra-grey",
    name: "Hyundai Elantra",
    category: "Daily",
    image: "/images/fleet/vehicle-08.webp",
    alt: "Grey Hyundai Elantra sedan on a residential street in Oceanside",
    featured: true,
  },
  {
    id: "kia-k4-white-two",
    name: "Kia K4",
    category: "Daily",
    image: "/images/fleet/vehicle-09.webp",
    alt: "White Kia K4 sedan photographed from the front three-quarter angle",
    featured: true,
  },
  {
    id: "hyundai-elantra-graphite",
    name: "Hyundai Elantra",
    category: "Daily",
    image: "/images/fleet/vehicle-10.webp",
    alt: "Graphite Hyundai Elantra sedan on a palm-lined Southern California street",
    featured: false,
  },
  {
    id: "kia-k4-black",
    name: "Kia K4",
    category: "Daily",
    image: "/images/fleet/vehicle-11.webp",
    alt: "Black Kia K4 sedan photographed at golden hour",
    // Also used as the hero photograph, so it is kept out of the grid.
    featured: false,
  },
  {
    id: "kia-k4-black-two",
    name: "Kia K4",
    category: "Daily",
    image: "/images/fleet/vehicle-12.webp",
    alt: "Black Kia K4 sedan parked at the Evolution Auto Sale lot",
    featured: true,
  },
];

export const featuredFleet = fleet.filter((vehicle) => vehicle.featured);

/** Categories present in the featured fleet, in CATEGORY_ORDER order. */
export const activeCategories = CATEGORY_ORDER.filter((category) =>
  featuredFleet.some((vehicle) => vehicle.category === category),
);
