# Image directories

Notes for editing `/public/images`. This file lives in `/docs`, not beside the
images, because everything inside `/public` is copied verbatim into the
deployed site — a README in there would be served to the public.

Every photograph on the site is served from `/public/images`. Replace a file in place
(keeping the same filename) and the site picks it up — no code changes needed.

| Folder       | Used by                          | Suggested aspect |
| ------------ | -------------------------------- | ---------------- |
| `hero/`      | Hero background, final CTA band  | ~16:10 landscape |
| `fleet/`     | Vehicle cards, the 60+ band      | ~3:2 landscape   |
| `lifestyle/` | Editorial photo break            | mixed, see below |
| `oceanside/` | Location section                 | 4:5 portrait     |
| `brand/`     | Header mark — see `brand.md`     | 1:1 square       |

## Current files

- `hero/evolution-hero.webp` — full-viewport hero
- `hero/final-cta.webp` — closing call-to-action band
- `fleet/fleet-lineup.webp` — the wide "60+" scale band
- `fleet/vehicle-01.webp` … `vehicle-12.webp` — vehicle cards, wired up in `/data/fleet.ts`
- `lifestyle/lifestyle-01.webp` — tall left image (4:5)
- `lifestyle/lifestyle-02.webp`, `lifestyle-03.webp` — stacked right images (4:3)
- `lifestyle/lifestyle-04.webp` — full-width band (21:9)
- `oceanside/oceanside-coastal.webp` — location section (4:5)

## Adding new photographs

Put the originals in `PICS/cropped/`, add them to the list in
`scripts/prepare-images.mjs`, then run:

```bash
node scripts/prepare-images.mjs
```

That converts everything to optimised WebP at the right sizes. Higher-resolution
originals are worth using where available — the current hero is about 1125px
wide, which is sharp on phones but soft on a large desktop display.

Only use photography Evolution Auto Sale owns or is authorised to publish.
