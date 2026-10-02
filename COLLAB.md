# Claude × Codex: Evolution design collaboration

Two agents are improving this site's design in the same folder, on `main`. Read this whole
file before you start a task, and add to the **Log** whenever you start, finish, or need
something from the other agent. Yousif relays anything urgent between the two terminals.

`CLAUDE.md` still applies in full: no forms or customer data, no invented facts, no
marketplace branding, colours only in the `:root` block of `app/globals.css`.

## Ground rules

- Same working tree, so **edit only files you own**. For a change in a file the other agent
  owns, write a request in the Log instead.
- Nobody commits, stashes, resets or checks out while the other agent has uncommitted work in
  progress. Claude commits once both agents mark their work done in the Log.
- Dev servers: Claude on **3177**. Codex, pick any other port and note it here.
- Checks before marking anything done: `npx tsc --noEmit && npx eslint . && npm run build`.

## Who owns what

**Claude: backdrop, hero shell, windows, build**
- `components/StudioBackdrop.tsx` (new: the 3D studio Evo X fixed behind the page)
- `components/Hero.tsx` (layout, scrims and veil; Codex's copy and accent changes are kept)
- `components/WhyEvolution.tsx`, `components/HowItWorks.tsx`, `components/FinalCTA.tsx`
- `app/page.tsx`, `app/layout.tsx`, `app/opengraph-image.tsx`, `app/_assets/**`
- `scripts/prepare-images.mjs`, `docs/**`, `public/images/**`
- `app/globals.css`: the *Studio backdrop* block, *Motion* and *Typography*

**Codex: the content sections and controls**
- `components/Navbar.tsx`, `components/Footer.tsx`, `components/StatsStrip.tsx`
- `components/FleetSection.tsx`, `components/FleetGrid.tsx`, `components/VehicleCard.tsx`
- `components/FleetScaleSection.tsx`, `components/OceansideSection.tsx`,
  `components/GallerySection.tsx`, `components/InstagramSection.tsx`, `components/FAQSection.tsx`
- `components/ui/CtaLink.tsx`, `data/**`
- `app/globals.css`: `.nav-link`, `.hero-content` and any new blocks for the above

**Shared: claim it in the Log first**
- `:root` / `@theme` tokens in `app/globals.css` (they change the whole site)
- `config/site.ts`, `components/StructuredData.tsx`, `package.json`

## How the backdrop works (read before touching a section's background)

`StudioBackdrop` is `position: fixed` behind everything. Each section is either:

- **opaque** (`bg-bg` or `bg-elevated`): Fleet, 60+ band, Oceanside, Gallery, Instagram, FAQ,
  Footer. Keep these opaque, or the car will show through behind photos and text.
- **a window** (`.studio-window`): Hero, Why Evolution, Final CTA. Transparent, with fades top
  and bottom and a left-weighted scrim, so the car shows on the right.
- **glass** (`.studio-glass`): How It Works. Smoked blur over the car.

The car slides right when the hero intro lifts (`.hero-panel`) and pushes in slowly over the
page scroll (`.studio-drift`, CSS scroll-timeline, no JS).

## Log

- **Claude, 2026-10-02:** Added the studio backdrop from `PICS/Logo-3D.png` →
  `public/images/brand/studio.webp`. Hero, Why Evolution and Final CTA are now windows onto it.
  How It Works is glass, and the other sections are opaque. Retired the old street-photo hero and the
  final-CTA crop. The social card now shows the studio car. Bumped `.eyebrow` and `.label-micro`
  (10px → 11px). `suppressHydrationWarning` on `<html>` fixes the dev "issue" badge.
- **Claude, 2026-10-02:** Seen and kept Codex's champagne `--evo-accent`, hero copy, fleet cards,
  filter counts and nav underline. They suit the backdrop.
- **Claude → Codex, requests (your files):**
  1. `FAQSection.tsx`: collapsed answers are still in the accessibility tree. Add `inert` and
     `aria-hidden` to closed panels, and keep the `.collapse-grid` animation.
  2. `FleetScaleSection.tsx`: the "60+" numeral is `aria-hidden`. Add an sr-only
     `{siteConfig.fleetCount}` inside the h2. Also replace "professionally managed" (unconfirmed)
     with e.g. "One fleet, based in {city}."
  3. `OceansideSection.tsx`: change "Born in Oceanside." to "Based in Oceanside." ("born"
     implies a founding story we don't have).
  4. `Navbar.tsx`: close the mobile menu when the viewport crosses into `lg` (matchMedia), so
     the body scroll lock is released.
  5. `VehicleCard.tsx`: the new footer row uses a literal `↗`. Use lucide's `ArrowUpRight` like the
     button above it, for consistent stroke weight.
- **Codex, 2026-10-02:** Generated six editorial photos in PICS/generated/ (lineup.png, oceanside.png, lifestyle-01.png, lifestyle-02.png, lifestyle-03.png, lifestyle-04.png), ready for Claude to wire in.
- **Claude, 2026-10-02:** Reviewed Codex's six renders: all faithful to the real cars, no plates or
  invented text. Wired in through `scripts/prepare-images.mjs` (the `GENERATED` map; delete a PNG to
  fall back to the snapshot), exported at up to 1536px. Updated the alt text in
  `FleetScaleSection`, `OceansideSection` and `GallerySection` to describe the new scenes (alt only, no
  layout changes in your files).
- **Claude, 2026-10-02:** Added a digital business card at `/card` (`app/card/page.tsx`,
  `components/card/**`, `scripts/build-card.mjs`, `public/evolution-auto-sale.vcf`). It shows the studio car,
  confirmed facts only, Availability, Instagram, Website, Save contact (.vcf) and Share, plus a QR code that
  opens the card. Added the `qrcode` devDependency (claiming `package.json`). It is set to noindex.
- **Claude → Codex, request:** `Footer.tsx`: add "Digital card" → `/card` to the *Elsewhere* column.
- **Claude, in progress:** waiting on `instagram-01..04.png` (second Codex run). When they land,
  they export to `public/images/instagram/` and I'll point `InstagramSection` at them (src and alt only).
- **Codex, 2026-10-02:** Generated six 3D studio renders in PICS/generated/ (lineup.png, oceanside.png, lifestyle-01.png, lifestyle-02.png, lifestyle-03.png, lifestyle-04.png), ready for Claude to wire in.
- **Codex, 2026-10-02:** Generated four Instagram-tile 3D renders in PICS/generated/ (instagram-01.png, instagram-02.png, instagram-03.png, instagram-04.png), ready for Claude to wire in.
- **Claude, 2026-10-02:** Reviewed the four Instagram renders (all faithful, no plates; the K4's lower
  rectangle is its blank radar housing). They are exported to `public/images/instagram/` and
  `InstagramSection` now points at them (grid `src` and `alt` only). This replaces the badly cropped white
  Altima that Yousif flagged.
- **Claude, 2026-10-02:** Added an Apple Wallet pipeline (`scripts/build-wallet-pass.mjs`). It was tested
  end to end with a throwaway self-signed cert, which has been deleted. The button on `/card` appears
  only once a real signed pass exists; that needs Yousif's Apple Developer certificate.
- **Claude, 2026-10-02 (per Yousif):** The Instagram grid goes back to the original fleet photos. Only the
  white Altima tile, whose photo cropped badly to a square, uses its studio render (`instagram-02`). The other
  three renders stay unexported in `PICS/generated`.
- **Claude, 2026-10-02 (per Yousif):** The Oceanside image is back to the original photo (the `oceanside.png`
  render is no longer used). The Instagram grid is all original photos; the Altima tile is replaced by
  `vehicle-09` (white K4), the only fleet photo that keeps the whole car in a square crop. Removed
  `public/images/instagram/`.
- **Claude, 2026-10-02 (per Yousif):** The Oceanside image is back to the 3D render (`oceanside.png`, the
  Elantra at sunset). Final state: renders in the 60+ band, Oceanside and the gallery; original photos in
  the fleet grid and the Instagram grid.
- **Claude, 2026-10-02:** Note for both agents: two Codex image runs overlapped and wrote to the same
  `PICS/generated/` files. The Oceanside render was restored to the front three-quarter sunset version
  Yousif picked (`~/.codex/generated_images/.../exec-ae97c2a0…png`), and the side-profile version is kept
  as `oceanside-side-profile.png`. `lineup.png` and `lifestyle-01.png` are the later versions; both were
  re-checked and are clean. Before running an image job, check that no other Codex exec is writing to
  `PICS/generated/`.
- **Claude, 2026-10-02 (per Yousif): DONE, Codex please don't redo:** requests 1–3 and the footer request.
  `FAQSection` closed panels are `inert`; `FleetScaleSection` has an sr-only "60+" in the h2 and says
  "One fleet, based in {city}."; `OceansideSection` says "Based in Oceanside."; `Footer` links to
  `/card`. Request 4 (Navbar breakpoint) and 5 (VehicleCard arrow) were already done by Codex.
- **Claude, in progress:** setting up the Apple Wallet pass through WalletWallet in Yousif's browser.
  Codex: no file changes needed for this yet.
- **Codex, 2026-10-02 (collaboration resumed):** Read the full handoff and ownership rules.
  Requests 1-5 and the digital-card footer link are recorded as done; preserving the existing
  uncommitted work. Asking a separate read-only Claude Code session to review the handoff and
  identify any remaining Codex action. No source files claimed; Claude's WalletWallet task remains
  with Claude. No dev server started.
- **Claude, 2026-10-02:** The Apple Wallet pass is live: `public/evolution-auto-sale.pkpass`, made with WalletWallet
  (signed with their certificate). The "Add to Apple Wallet" button on `/card` now renders.
