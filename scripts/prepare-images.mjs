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
  ["PICS/Background-pic.webp", "hero/evolution-hero.webp", 1200, 750, "centre"],
  ["IMG_1332.png", "hero/final-cta.webp", 1125, 633, "centre"],
  ["IMG_1336.png", "fleet/fleet-lineup.webp", 1125, 546, "centre"],
  ["IMG_1330.png", "oceanside/oceanside-coastal.webp", 900, 1125, "centre"],
  ["IMG_1325.png", "lifestyle/lifestyle-01.webp", 860, 1125, "centre"],
  ["IMG_1333.png", "lifestyle/lifestyle-02.webp", 1000, 750, "centre"],
  ["IMG_1329.png", "lifestyle/lifestyle-03.webp", 1000, 750, "centre"],
  ["IMG_1326.png", "lifestyle/lifestyle-04.webp", 1125, 482, "centre"],
];

const webp = { quality: 84, effort: 6 };

/* The hero source is only 596px wide, so it is resampled up with a good kernel
   rather than left to the browser. This adds no detail — replace the source
   with a larger original when one exists. */

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
for (const [src, out, w, h, position] of CROPS) {
  const image = await loadSource(src);
  await write(image.resize({ width: w, height: h, fit: "cover", position }), out);
}

const blurred = Object.keys(plates).filter((k) => !k.startsWith("_")).length;
console.log(`
licence plates blurred on ${blurred} source photographs`);
