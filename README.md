# Evolution Auto Sale

Promotional website for Evolution Auto Sale — a 60+ vehicle specialty rental
fleet in Oceanside, California.

This site is a **showcase, not a booking platform**. It collects no customer
information of any kind: no forms, no accounts, no dates, no payment, no chat
widget. Every call to action is a link out to the company's external booking
profile or to Instagram. That is deliberate — please keep it that way.

Built with Next.js (App Router), TypeScript and Tailwind CSS. No database, no
backend, no CMS, no third-party tracking.

---

## Before launch — three things to change

| What | Where | Currently |
| --- | --- | --- |
| **Booking profile URL** | `config/site.ts` → `bookingProfileUrl` | Placeholder `"BOOKING_PROFILE_URL"`. Until it is a real `https://` URL, every "View Live Availability" button falls back to the Instagram profile so nothing links to a dead page. A warning prints in the dev console. |
| **Production domain** | `config/site.ts` → `siteUrl` | `https://evolutionautosale.com` — used for canonical URL, sitemap, robots and social metadata. |
| **Vehicle years** | `data/fleet.ts` → `year` | Omitted. Model names were read from the photographs; confirm them and add years when known. |

Nothing else is required to deploy.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Deploy to Vercel by importing the repository — no environment variables needed.

---

## Editing the site

### Business details

`config/site.ts` is the single source of truth for the business name, location,
Instagram handle, booking URL, fleet count and page metadata. Change a value
there and the whole site follows.

### The fleet

`data/fleet.ts` holds every vehicle:

```ts
{
  id: "kia-telluride",
  name: "Kia Telluride",
  year: "2024",                            // optional
  category: "SUV",
  image: "/images/fleet/vehicle-04.webp",
  alt: "Grey Kia Telluride from the fleet", // used by screen readers and SEO
  featured: true,                           // shows on the homepage grid
  bookingUrl: "https://…",                  // optional per-vehicle listing
}
```

- `featured: true` puts a vehicle on the homepage grid; everything else stays in
  the file but is not rendered.
- Category filter pills are generated from the categories that actually have
  vehicles. Adding the first `"Electric"` vehicle activates that pill by itself.
  Available categories: `Performance`, `Luxury`, `SUV`, `Daily`, `Electric`.
- With no `bookingUrl`, a card links to the main booking profile.

### Photography

See `public/images/README.md`. Replace a file in place, keep the filename, and
the site picks it up. `scripts/prepare-images.mjs` converts source photos into
optimised WebP at the right sizes:

```bash
node scripts/prepare-images.mjs
```

Source photographs live in `PICS/` and are not committed.

### Brand colours

Every colour is a CSS variable in the `:root` block of `app/globals.css`.
Nothing else hard-codes a colour, so the whole site can be re-skinned from that
one block when the official brand palette arrives.

There is no logo file yet — the header, footer and social card use a text
lockup in `components/ui/Wordmark.tsx`. See `public/images/brand/README.md`.

---

## Structure

```
app/
  layout.tsx            metadata, fonts, skip link
  page.tsx              section composition only
  globals.css           design tokens, typography, scrims, motion
  opengraph-image.tsx   generated social card
  robots.ts sitemap.ts icon.svg
components/             one file per section, plus ui/ primitives
config/site.ts          business details
data/fleet.ts           vehicles
data/faqs.ts            FAQ copy (also feeds FAQ structured data)
public/images/          photography, organised by role
scripts/                image preparation
```

## Notes

- **Motion** is a ~1 KB `IntersectionObserver` (`components/ui/Reveal.tsx`)
  rather than an animation library, and is disabled under
  `prefers-reduced-motion`. Content is only hidden when JavaScript is available,
  so the page still reads with scripting off.
- **Structured data** asserts only what has been confirmed: name, city, region,
  Instagram, service area. No phone number, street address, hours, rating or
  review count — those are omitted rather than invented.
- **Third-party marketplace**: the site carries no marketplace branding and does
  not copy any marketplace interface, imagery, pricing or reviews. Buttons say
  "View Live Availability" and link to the company's own host profile.
- **Licence plates** are legible in some photographs. If you would rather they
  were not, blur them in the source files in `PICS/` and re-run the image
  script.
