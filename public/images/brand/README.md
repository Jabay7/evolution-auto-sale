# Brand assets

No official logo has been supplied yet, so the header, footer and social image
use a text lockup (`/components/ui/Wordmark.tsx`).

When the logo arrives:

1. Drop `logo.svg` (and a square `mark.svg` if there is one) into this folder.
2. Swap the contents of `Wordmark.tsx` for a `next/image`.
3. Update the brand colours in the `:root` block of `/app/globals.css`.
4. Replace `/app/icon.svg` with the real favicon mark.
