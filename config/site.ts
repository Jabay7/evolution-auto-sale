/**
 * Evolution Auto Sale — central business configuration.
 *
 * Everything a non-developer is likely to change lives in this file.
 * Update these values and the whole site follows.
 */

export const siteConfig = {
  businessName: "Evolution Auto Sale",
  /** Used in tight spaces such as the mobile wordmark. */
  shortName: "Evolution",

  location: "Oceanside, California",
  city: "Oceanside",
  /** Two-letter state code, used in structured data. */
  region: "CA",
  regionName: "California",
  area: "North County San Diego",

  instagramHandle: "@evo_a12",
  instagramUrl: "https://www.instagram.com/evo_a12/",

  /**
   * ⚠️  REPLACE THIS with the real external host-profile / live availability URL.
   *
   * Until it starts with http(s), every "View Live Availability" button safely
   * falls back to the Instagram profile instead of shipping a broken link.
   * See `bookingHref` / `isBookingConfigured` below.
   */
  bookingProfileUrl: "BOOKING_PROFILE_URL",

  fleetCount: "60+",
  /** Numeric form of fleetCount, for copy that needs a plain number. */
  fleetCountNumeric: 60,

  siteUrl: "https://evolutionautosaleturo.com",

  title: "Evolution Auto Sale | Specialty Car Rentals in Oceanside, CA",
  description:
    "Explore Evolution Auto Sale's 60+ vehicle fleet in Oceanside, California. Discover featured vehicles, view current availability and follow @evo_a12 for fleet updates.",
} as const;

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);

/** True once `bookingProfileUrl` has been set to a real URL. */
export const isBookingConfigured = isExternalUrl(siteConfig.bookingProfileUrl);

/**
 * The href every "View Live Availability" control should use.
 * Falls back to Instagram while the booking profile URL is still a placeholder.
 */
export const bookingHref = isBookingConfigured
  ? siteConfig.bookingProfileUrl
  : siteConfig.instagramUrl;

/** Resolves a vehicle-specific booking link, falling back to the main profile. */
export function resolveBookingHref(vehicleBookingUrl?: string) {
  return vehicleBookingUrl && isExternalUrl(vehicleBookingUrl)
    ? vehicleBookingUrl
    : bookingHref;
}

if (process.env.NODE_ENV !== "production" && !isBookingConfigured) {
  console.warn(
    "[Evolution Auto Sale] siteConfig.bookingProfileUrl is still a placeholder — " +
      'every "View Live Availability" link currently falls back to Instagram. ' +
      "Set it in /config/site.ts before launch.",
  );
}

export const navLinks = [
  { label: "Fleet", href: "#fleet" },
  { label: "Why Evolution", href: "#why" },
  { label: "Experience", href: "#experience" },
  { label: "Oceanside", href: "#oceanside" },
  { label: "Instagram", href: "#instagram" },
] as const;
