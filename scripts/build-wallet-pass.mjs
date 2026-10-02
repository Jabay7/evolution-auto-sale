/**
 * Evolution Auto Sale — Apple Wallet pass
 *
 * Builds public/evolution-auto-sale.pkpass, a store-card style pass with the
 * studio Evo X as its strip image, the confirmed business facts, links on the
 * back and a QR code that opens /card.
 *
 * Apple only installs a pass signed with a Pass Type ID certificate from an
 * Apple Developer account, so this needs, in ./certs (gitignored, never
 * deployed):
 *
 *   certs/pass.pem   the Pass Type ID certificate, PEM
 *   certs/pass.key   its private key, PEM (unencrypted, or set PASS_KEY_PASSWORD)
 *   certs/wwdr.pem   Apple's WWDR intermediate certificate (G4), PEM
 *
 * and two identifiers from the same account:
 *
 *   PASS_TYPE_ID=pass.com.example.evolution TEAM_ID=ABCDE12345 \
 *     node scripts/build-wallet-pass.mjs
 *
 * Without them it stops before writing anything, and the "Add to Apple
 * Wallet" button on /card stays hidden — it only renders when the .pkpass
 * file exists.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { crc32 } from "node:zlib";
import sharp from "sharp";

const CERTS = "certs";
const OUT = "public/evolution-auto-sale.pkpass";

const { PASS_TYPE_ID, TEAM_ID, PASS_KEY_PASSWORD } = process.env;
const certFiles = ["pass.pem", "pass.key", "wwdr.pem"].map((f) => path.join(CERTS, f));
const missing = [];
if (!PASS_TYPE_ID) missing.push("PASS_TYPE_ID");
if (!TEAM_ID) missing.push("TEAM_ID");
for (const file of certFiles) {
  if (!(await access(file).then(() => true, () => false))) missing.push(file);
}
if (missing.length) {
  console.error(`Apple Wallet pass not built. Missing: ${missing.join(", ")}`);
  console.error("See the header of scripts/build-wallet-pass.mjs for what is needed.");
  process.exit(1);
}

/* ---------- business details, read from config/site.ts ---------- */

const config = await readFile("config/site.ts", "utf8");
const field = (name) => {
  const match = config.match(new RegExp(`${name}:\\s*"([^"]+)"`));
  if (!match) throw new Error(`config/site.ts: missing ${name}`);
  return match[1];
};
const site = {
  businessName: field("businessName"),
  location: field("location"),
  city: field("city"),
  region: field("region"),
  instagramUrl: field("instagramUrl"),
  instagramHandle: field("instagramHandle"),
  bookingProfileUrl: field("bookingProfileUrl"),
  siteUrl: field("siteUrl"),
  fleetCount: field("fleetCount"),
};
const cardUrl = `${site.siteUrl}/card`;

/* ---------- pass.json ---------- */

/* Wallet takes colours as rgb() strings and cannot read CSS variables, so
   these mirror --evo-bg, --evo-text and --evo-accent in app/globals.css. */
const pass = {
  formatVersion: 1,
  passTypeIdentifier: PASS_TYPE_ID,
  teamIdentifier: TEAM_ID,
  serialNumber: "evolution-card-1",
  organizationName: site.businessName,
  description: `${site.businessName} digital card`,
  logoText: "EVOLUTION",
  backgroundColor: "rgb(10, 10, 10)",
  foregroundColor: "rgb(245, 245, 242)",
  labelColor: "rgb(216, 197, 163)",
  sharingProhibited: false,
  storeCard: {
    headerFields: [{ key: "fleet", label: "FLEET", value: `${site.fleetCount} vehicles` }],
    primaryFields: [{ key: "name", label: "SPECIALTY RENTALS", value: site.businessName }],
    secondaryFields: [
      { key: "location", label: "LOCATION", value: `${site.city}, ${site.region}` },
      { key: "instagram", label: "INSTAGRAM", value: site.instagramHandle },
    ],
    /* Wallet turns URLs on the back of a pass into tappable links. */
    backFields: [
      { key: "availability", label: "Live availability", value: site.bookingProfileUrl },
      { key: "website", label: "Website", value: site.siteUrl },
      { key: "instagram-url", label: "Instagram", value: site.instagramUrl },
      {
        key: "about",
        label: "About",
        value: `${site.businessName} is a ${site.fleetCount} vehicle specialty rental fleet in ${site.location}. Bookings, pricing and availability are handled on the external booking platform.`,
      },
    ],
  },
  barcodes: [
    {
      format: "PKBarcodeFormatQR",
      message: cardUrl,
      messageEncoding: "iso-8859-1",
      altText: "Scan to open the digital card",
    },
  ],
};

/* ---------- images ---------- */

const mark = "public/images/brand/mark.webp";
const studio = "public/images/brand/studio.webp";
const png = (input, w, h) => sharp(input).resize(w, h, { fit: "cover", position: "centre" }).png().toBuffer();

/* Apple's sizes: icon 29pt, logo up to 160x50pt, store-card strip 375x123pt,
   each at 1x/2x/3x. The mark is a 150px photograph, so the 3x icon (87px) is
   the largest it is asked to fill. */
const files = {
  "pass.json": Buffer.from(JSON.stringify(pass, null, 2)),
  "icon.png": await png(mark, 29, 29),
  "icon@2x.png": await png(mark, 58, 58),
  "icon@3x.png": await png(mark, 87, 87),
  "logo.png": await png(mark, 50, 50),
  "logo@2x.png": await png(mark, 100, 100),
  "logo@3x.png": await png(mark, 150, 150),
  "strip.png": await png(studio, 375, 123),
  "strip@2x.png": await png(studio, 750, 246),
  "strip@3x.png": await png(studio, 1125, 369),
};

/* ---------- manifest and signature ---------- */

const manifest = Object.fromEntries(
  Object.entries(files).map(([name, data]) => [name, createHash("sha1").update(data).digest("hex")]),
);
files["manifest.json"] = Buffer.from(JSON.stringify(manifest));

/* Detached PKCS#7 signature of the manifest, with the WWDR intermediate in
   the chain — Wallet rejects a pass signed without it. */
const work = await mkdtemp(path.join(tmpdir(), "pkpass-"));
try {
  const manifestFile = path.join(work, "manifest.json");
  const signatureFile = path.join(work, "signature");
  await writeFile(manifestFile, files["manifest.json"]);
  execFileSync("openssl", [
    "smime", "-binary", "-sign",
    "-certfile", certFiles[2],
    "-signer", certFiles[0],
    "-inkey", certFiles[1],
    ...(PASS_KEY_PASSWORD ? ["-passin", `env:PASS_KEY_PASSWORD`] : []),
    "-in", manifestFile,
    "-out", signatureFile,
    "-outform", "DER",
  ]);
  files.signature = await readFile(signatureFile);
} finally {
  await rm(work, { recursive: true, force: true });
}

/* ---------- zip (stored, no compression — all Wallet requires) ---------- */

function zip(entries) {
  const local = [];
  const central = [];
  let offset = 0;
  for (const [name, data] of entries) {
    const nameBuf = Buffer.from(name);
    const crc = crc32(data);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4); // version needed
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(data.length, 18);
    header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(nameBuf.length, 26);
    local.push(header, nameBuf, data);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4); // version made by
    dir.writeUInt16LE(20, 6); // version needed
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(data.length, 20);
    dir.writeUInt32LE(data.length, 24);
    dir.writeUInt16LE(nameBuf.length, 28);
    dir.writeUInt32LE(offset, 42);
    central.push(dir, nameBuf);

    offset += header.length + nameBuf.length + data.length;
  }
  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, centralBuf, end]);
}

const pkpass = zip(Object.entries(files));
await writeFile(OUT, pkpass);
console.log(`${OUT}  ${Math.round(pkpass.length / 1024)}KB  (${PASS_TYPE_ID}, team ${TEAM_ID})`);
