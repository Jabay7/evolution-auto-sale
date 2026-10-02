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

- `/public/images/brand/studio.webp` — the studio photograph of the Evo X on a
  dark seamless (`PICS/Logo-3D.png`), fixed behind the whole page by
  `/components/StudioBackdrop.tsx`. Sections are opaque by default; the hero,
  Why Evolution (`.studio-window`) and the closing call to action open onto it,
  and How It Works is smoked glass over it (`.studio-glass`). Its treatment —
  edge feathering, brightness, desaturation, vignette — lives under
  "Studio backdrop" in `/app/globals.css`. To swap the photograph, replace the
  source and re-run the script; any landscape shot on a dark, plain background
  will work.
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

## Digital business card

`/card` (`app/card/page.tsx`) is a one-screen card for phones. Its contact file
(`public/evolution-auto-sale.vcf`) and QR code (`components/card/qr.ts`) are
generated from `config/site.ts` by `node scripts/build-card.mjs`. Re-run it after
changing the business details.

**Apple Wallet.** `node scripts/build-wallet-pass.mjs` builds
`public/evolution-auto-sale.pkpass`. It needs an Apple Developer account: a Pass Type
ID certificate and key, plus Apple's WWDR intermediate, all as PEM files in `certs/`
(gitignored), and the `PASS_TYPE_ID` and `TEAM_ID` environment variables. See the
script header. The "Add to Apple Wallet" button on `/card` appears only when that
file exists at build time. Before launch, swap the button for Apple's official
"Add to Apple Wallet" badge, as Apple's guidelines require.
