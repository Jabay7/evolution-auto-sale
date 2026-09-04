# Evolution Auto Sale — working notes

Promotional showcase site for a 60+ vehicle specialty rental fleet in Oceanside,
California. Next.js App Router + TypeScript + Tailwind v4. See `README.md` for
setup and editing instructions.

## Hard rules

- **No customer data, ever.** No forms, inputs, accounts, date pickers, payment
  fields, newsletter signups or chat widgets. Every CTA is an outbound link.
  Do not add these later because "rental sites usually have them" — they are
  intentionally excluded.
- **No invented facts.** The only confirmed facts are: the business name,
  Oceanside CA, 60+ vehicles, `@evo_a12`, specialty vehicle rentals, and that
  bookings happen on an external marketplace. Do not add prices, ratings,
  reviews, testimonials, years in business, delivery areas, phone numbers,
  street addresses or opening hours.
- **No third-party marketplace branding.** No marketplace logo, UI, colours,
  scraped photos, reviews or pricing, and nothing implying an official
  affiliation.

## Conventions

- Colours live only in the `:root` block of `app/globals.css`. Never hard-code a
  hex value in a component.
- Business details go in `config/site.ts`; vehicles in `data/fleet.ts`.
- `app/page.tsx` composes sections and nothing else.
- Photographs use `next/image` inside an aspect-ratio container so nothing
  shifts on load. Full-bleed images use the `.scrim-*` classes for legibility
  rather than a flat overlay, which crushes dark vehicles into the background.
- Scroll animation is `components/ui/Reveal.tsx`. Do not add an animation
  library for it.

## Checks

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

## Next.js version

This is Next.js 16 (App Router, Turbopack). Several APIs differ from earlier
versions — `params`/`id` are promises in `opengraph-image` and `sitemap`,
`images.qualities` defaults to `[75]`, and smooth scrolling needs
`data-scroll-behavior="smooth"` on `<html>`. The bundled docs are the source of
truth: `node_modules/next/dist/docs/` (upgrade notes in
`01-app/02-guides/upgrading/version-16.md`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
