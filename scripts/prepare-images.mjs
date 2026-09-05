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
import { mkdir, readFile } from "node:fs/promises";
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
  ["IMG_1332.png", "hero/final-cta.webp", 1125, 633, "centre"],
  ["IMG_1336.png", "fleet/fleet-lineup.webp", 1125, 546, "centre"],
  ["IMG_1330.png", "oceanside/oceanside-coastal.webp", 900, 1125, "centre"],
  ["IMG_1325.png", "lifestyle/lifestyle-01.webp", 860, 1125, "centre"],
  ["IMG_1333.png", "lifestyle/lifestyle-02.webp", 1000, 750, "centre"],
  ["IMG_1329.png", "lifestyle/lifestyle-03.webp", 1000, 750, "centre"],
  ["IMG_1326.png", "lifestyle/lifestyle-04.webp", 1125, 482, "centre"],
];

/**
 * Brand mark: the square profile photograph, rendered as a circle in the
 * header. Exported at its native 150px, which keeps the 48px mark sharp on a
 * 3x screen. Supply a larger original before rendering it any bigger.
 */
const BRAND = [["PICS/evo-x.jpg", "brand/mark.webp", 150, 150, "centre"]];

const webp = { quality: 84, effort: 6 };

/* The hero photograph is portrait and stays that way: Hero.tsx fits it whole
   inside the full-viewport section and fills the rest with a blurred copy of
   itself, so nothing here crops it to a landscape band. See buildHero(). */

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
for (const [src, out, w, h, position] of [...CROPS, ...BRAND]) {
  const image = await loadSource(src);
  await write(image.resize({ width: w, height: h, fit: "cover", position }), out);
}

/**
 * Hero. An explicit crop rather than a cover-fit, because both edges matter:
 * 70px off the left, where a bystander stands, and 280px of sky off the top,
 * which lifts the car towards the middle of the frame and lets it render
 * larger once the section fits the whole photograph on screen.
 */
await write(
  (await loadSource("PICS/Background-2.0.jpg")).extract({
    left: 70,
    top: 280,
    width: 1100,
    height: 1279,
  }),
  "hero/evolution-hero.webp",
);

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
