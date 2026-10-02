import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/* The card never changes at request time. */
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.businessName} — specialty vehicle rentals in ${siteConfig.location}`;

/* The studio photograph, exported as a JPEG by scripts/prepare-images.mjs
   because this renderer cannot decode WebP. Read once, at build time. */
const studio = `data:image/jpeg;base64,${await readFile(
  join(process.cwd(), "app/_assets/og-studio.jpg"),
  "base64",
)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          color: "#F5F5F2",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* The car on the right, already faded into the card colour on its
            left and bottom edges (see prepare-images.mjs), so the type stays
            clear of it — the same arrangement as the site's hero. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img
          src={studio}
          alt=""
          width={840}
          height={630}
          style={{ position: "absolute", right: -220, top: -20, width: 840, height: 630 }}
        />
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <div style={{ fontSize: 26, letterSpacing: "-0.01em", fontWeight: 600 }}>EVOLUTION</div>
          <div style={{ width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.28)", margin: "0 18px" }} />
          <div style={{ fontSize: 17, letterSpacing: "0.22em", color: "#A7A7A2" }}>AUTO SALE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 22, letterSpacing: "0.26em", color: "#A7A7A2" }}>
            OCEANSIDE, CALIFORNIA
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              marginTop: 26,
            }}
          >
            <div>{`${siteConfig.fleetCount} Cars.`}</div>
            <div>One Fleet.</div>
            <div>Your Next Drive.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            fontSize: 21,
            color: "#A7A7A2",
          }}
        >
          <div style={{ display: "flex" }}>Specialty Vehicle Rentals</div>
          <div style={{ display: "flex" }}>{siteConfig.instagramHandle}</div>
        </div>
      </div>
    ),
    size,
  );
}
