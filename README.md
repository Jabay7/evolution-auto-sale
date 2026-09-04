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

## Deploying

The site is a static export served by GitHub Pages at
**https://evolutionautosaleturo.com** (repo `Jabay7/evolution-auto-sale`,
branch `gh-pages`).

```bash
npm run build                     # writes ./out
cd out
git init -b gh-pages && git add -A && git commit -m "Deploy"
git push --force https://github.com/Jabay7/evolution-auto-sale.git gh-pages:gh-pages
```

`public/CNAME` carries the domain and `public/.nojekyll` stops GitHub from
hiding the `_next/` folder; both are copied into `out` by the build.

There is no GitHub Actions workflow because the stored `gh` token lacks the
`workflow` scope. To automate deploys, run `gh auth refresh -s workflow` and add
a workflow that runs `npm ci && npm run build` and publishes `out`.

### DNS

Apex `A` records point at GitHub Pages; `www` is a `CNAME` to `jabay7.github.io`.
See "DNS records" in the deploy notes if these ever need re-adding.

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

See `docs/images.md`. Replace a file in place, keep the filename, and
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

The header shows a circular photographic mark (`components/ui/BrandMark.tsx`),
which is also the favicon. There is no vector logo yet, so the wordmark beside
it, the footer and the social card use a text lockup in
`components/ui/Wordmark.tsx`. See `docs/brand.md`.

---

## Structure

```
app/
  layout.tsx            metadata, fonts, skip link
  page.tsx              section composition only
  globals.css           design tokens, typography, scrims, motion
  opengraph-image.tsx   generated social card
  robots.ts sitemap.ts icon.png
components/             one file per section, plus ui/ primitives
config/site.ts          business details
data/fleet.ts           vehicles
data/faqs.ts            FAQ copy (also feeds FAQ structured data)
public/images/          photography, organised by role
scripts/                image preparation
docs/                   notes on the images and the brand mark
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
- **Licence plates are blurred** on the way through the image pipeline, using
  the regions in `scripts/plates.json`. Four of the vehicles have no front plate
  fitted and need no entry. Add a region for any new photograph showing a
  readable plate, then re-run `node scripts/prepare-images.mjs`.
- **No image metadata ships.** Sharp drops EXIF, XMP and IPTC during conversion,
  so no GPS coordinates, device identifiers or capture timestamps reach the web.
  The untouched originals stay in `PICS/`, which is gitignored.
- **Content-Security-Policy** travels in a `<meta>` tag (static hosting sets no
  headers). It includes `form-action 'none'`, which makes it impossible for
  injected markup to submit data from this site.
