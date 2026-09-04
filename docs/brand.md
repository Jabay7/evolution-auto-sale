# Brand assets

Notes for `/public/images/brand`, kept in `/docs` so they are not deployed
alongside the images themselves — everything inside `/public` is copied
verbatim into the published site.

- `/public/images/brand/mark.webp` — the square profile photograph, shown as a
  circle in the header by `/components/ui/BrandMark.tsx`.
- `/app/icon.png` — the same photograph masked to a circle, used as the
  favicon. It lives in `/app` because that is where Next's `icon` file
  convention looks for it.

Both are generated from `PICS/evo-x.jpg` by `scripts/prepare-images.mjs`.
Replace the source and re-run the script rather than editing them in place.

No official vector logo has been supplied yet, so the wordmark beside the mark,
the footer and the social image use a text lockup
(`/components/ui/Wordmark.tsx`).

When a vector logo arrives:

1. Drop `logo.svg` (and a square `mark.svg` if there is one) into
   `/public/images/brand`.
2. Swap the contents of `Wordmark.tsx` for a `next/image`.
3. Update the brand colours in the `:root` block of `/app/globals.css`.
4. Point the favicon step in `scripts/prepare-images.mjs` at the real mark.
