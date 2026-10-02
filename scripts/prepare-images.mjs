/**
 * Evolution Auto Sale — image preparation
 *
 * Converts source photographs into optimised WebP files under /public/images.
 *
 * Licence plates are blurred on the way through, using the regions in
 * scripts/plates.json. Add an entry there for any new photograph that shows a
 * readable plate.
 *
 * Usage:
 *   node scripts/prepare-images.mjs
 *
 * Source photos live in ./PICS/cropped (not deployed). Add new vehicle photos
 * there, add an entry to FLEET below, then re-run this script and update
 * /data/fleet.ts.
 */
import sharp from "sharp";
import { access, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const SRC = "PICS/cropped";
const OUT = "public/images";

/** Vehicle photos: exported at native resolution, 3:2-ish, used on fleet cards. */
const FLEET = [
  ["IMG_1332.png", "fleet/vehicle-01.webp"],
  ["IMG_1326.png", "fleet/vehicle-02.webp"],
  ["IMG_1328.png", "fleet/vehicle-03.webp"],
  ["IMG_1333.png", "fleet/vehicle-04.webp"],
  ["IMG_1336.png", "fleet/vehicle-05.webp"],
  ["IMG_1329.png", "fleet/vehicle-06.webp"],
  ["IMG_1331.png", "fleet/vehicle-07.webp"],
  ["IMG_1327.png", "fleet/vehicle-08.webp"],
  ["IMG_1325.png", "fleet/vehicle-09.webp"],
  ["IMG_1330.png", "fleet/vehicle-10.webp"],
  ["IMG_1334.png", "fleet/vehicle-11.webp"],
  ["IMG_1335.png", "fleet/vehicle-12.webp"],
];

/** Editorial crops. [source, output, width, height, gravity] */
const CROPS = [
  ["IMG_1336.png", "fleet/fleet-lineup.webp", 1125, 546, "centre"],
  ["IMG_1330.png", "oceanside/oceanside-coastal.webp", 900, 1125, "centre"],
  ["IMG_1325.png", "lifestyle/lifestyle-01.webp", 860, 1125, "centre"],
  ["IMG_1333.png", "lifestyle/lifestyle-02.webp", 1000, 750, "centre"],
  ["IMG_1329.png", "lifestyle/lifestyle-03.webp", 1000, 750, "centre"],
  ["IMG_1326.png", "lifestyle/lifestyle-04.webp", 1125, 482, "centre"],
];

/**
 * Editorial re-photographs of the same fleet vehicles, generated from the
 * phone snapshots above (see COLLAB.md). Where one exists in PICS/generated it
 * replaces the snapshot for that crop, exported at the largest size the
 * source allows in the crop's aspect ratio rather than at the snapshot's size.
 * They show no plate, so nothing is blurred. Delete a file to fall back.
 */
const GENERATED_DIR = "PICS/generated";
const GENERATED = {
  "fleet/fleet-lineup.webp": "lineup.png",
  "oceanside/oceanside-coastal.webp": "oceanside.png",
  "lifestyle/lifestyle-01.webp": "lifestyle-01.png",
  "lifestyle/lifestyle-02.webp": "lifestyle-02.png",
  "lifestyle/lifestyle-03.webp": "lifestyle-03.png",
  "lifestyle/lifestyle-04.webp": "lifestyle-04.png",
};

/** Full-bleed bands render at 100vw, so allow these to go wider than the cards. */
const EDITORIAL_MAX_WIDTH = 2400;

/**
 * Brand mark: the square profile photograph, rendered as a circle in the
 * header. Exported at its native 150px, which keeps the 48px mark sharp on a
 * 3x screen. Supply a larger original before rendering it any bigger.
 */
const BRAND = [["PICS/evo-x.jpg", "brand/mark.webp", 150, 150, "centre"]];

const webp = { quality: 84, effort: 6 };

/** Vehicle cards never render wider than ~440 CSS px, so 900 covers 2x screens. */
const CARD_MAX_WIDTH = 900;

const plates = JSON.parse(await readFile("scripts/plates.json", "utf8"));

/**
 * Returns a sharp pipeline for a source photo with its licence plate blurred
 * out. The blurred patch is composited back over the original so the rest of
 * the image is untouched.
 */
async function loadSource(file) {
  /* Entries containing a slash are paths from the repo root; bare names come
     from the cropped-screenshot folder. */
  const source = file.includes("/") ? file : path.join(SRC, file);
  const box = plates[file];
  if (!box) return sharp(source);

  const patch = await sharp(source)
    .extract(box)
    .blur(Math.max(7, box.width / 7))
    .toBuffer();

  return sharp(
    await sharp(source)
      .composite([{ input: patch, left: box.left, top: box.top }])
      .toBuffer(),
  );
}

async function write(pipeline, out) {
  const dest = path.join(OUT, out);
  await mkdir(path.dirname(dest), { recursive: true });
  const info = await pipeline.sharpen({ sigma: 0.5 }).webp(webp).toFile(dest);
  console.log(`${out.padEnd(40)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}

for (const [src, out] of FLEET) {
  const image = await loadSource(src);
  await write(image.resize({ width: CARD_MAX_WIDTH, withoutEnlargement: true }), out);
}
const exists = (file) => access(file).then(() => true, () => false);

for (const [src, out, w, h, position] of [...CROPS, ...BRAND]) {
  const generated = GENERATED[out] && path.join(GENERATED_DIR, GENERATED[out]);
  if (generated && (await exists(generated))) {
    /* Largest crop of the target aspect that fits inside the source. */
    const meta = await sharp(generated).metadata();
    const scale = Math.min(meta.width / w, meta.height / h, EDITORIAL_MAX_WIDTH / w);
    const size = { width: Math.round(w * scale), height: Math.round(h * scale) };
    await write(sharp(generated).resize({ ...size, fit: "cover", position: "centre" }), out);
    continue;
  }
  const image = await loadSource(src);
  await write(image.resize({ width: w, height: h, fit: "cover", position }), out);
}

/**
 * Studio backdrop. The brand photograph of the Evo X on a dark seamless,
 * fixed behind the whole page by components/StudioBackdrop.tsx. Kept at its
 * native size and uncropped: the backdrop fades its edges into the page
 * background in CSS, so the seamless itself is what fills a wide screen.
 */
await write(await loadSource("PICS/Logo-3D.png"), "brand/studio.webp");

/* The same photograph for the social card. A JPEG, because the renderer behind
   app/opengraph-image.tsx cannot decode WebP; kept in a private app folder so
   it is read at build time but never published. The fade into the card's
   background is baked in, because that renderer does not reliably draw a
   gradient over an image. */
const OG_W = 840;
const OG_H = 630;
const ogFade = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}"><defs>` +
    `<linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="#0a0a0a"/>` +
    `<stop offset="0.12" stop-color="#0a0a0a" stop-opacity="0.85"/>` +
    `<stop offset="0.4" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="b" x1="0" x2="0" y1="0" y2="1"><stop offset="0.7" stop-color="#0a0a0a" stop-opacity="0"/>` +
    `<stop offset="1" stop-color="#0a0a0a" stop-opacity="0.9"/></linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#l)"/><rect width="100%" height="100%" fill="url(#b)"/></svg>`,
);
const og = await (await loadSource("PICS/Logo-3D.png"))
  .resize(OG_W, OG_H, { fit: "cover", position: "top" })
  .composite([{ input: ogFade }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("app/_assets/og-studio.jpg");
console.log(`${"app/_assets/og-studio.jpg".padEnd(40)} ${og.width}x${og.height}  ${Math.round(og.size / 1024)}KB`);

/**
 * Favicon. The same mark, masked to a circle so the corners are transparent —
 * a browser draws the tab icon on its own background, which is usually light,
 * and a square photograph there would read as a sticker rather than a logo.
 *
 * Written to /app, not /public, because that is where Next's `icon` file
 * convention looks for it. 96px covers the 16 and 32px the browser actually
 * draws, with room for a hi-dpi tab strip.
 */
const FAVICON_SIZE = 96;
const circleMask = Buffer.from(
  `<svg width="${FAVICON_SIZE}" height="${FAVICON_SIZE}">` +
    `<circle cx="${FAVICON_SIZE / 2}" cy="${FAVICON_SIZE / 2}" r="${FAVICON_SIZE / 2}" fill="#fff"/>` +
    `</svg>`,
);

const icon = await (await loadSource("PICS/evo-x.jpg"))
  .resize(FAVICON_SIZE, FAVICON_SIZE, { fit: "cover" })
  .ensureAlpha()
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png({ compressionLevel: 9 })
  .toFile("app/icon.png");
console.log(`${"app/icon.png".padEnd(40)} ${icon.width}x${icon.height}  ${Math.round(icon.size / 1024)}KB`);

const blurred = Object.keys(plates).filter((k) => !k.startsWith("_")).length;
console.log(`
licence plates blurred on ${blurred} source photographs`);
