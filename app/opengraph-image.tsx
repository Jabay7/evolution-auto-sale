import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/* The card never changes at request time. */
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.businessName} — specialty vehicle rentals in ${siteConfig.location}`;

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
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 26, letterSpacing: "-0.01em", fontWeight: 600 }}>EVOLUTION</div>
          <div style={{ width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.28)", margin: "0 18px" }} />
          <div style={{ fontSize: 17, letterSpacing: "0.22em", color: "#A7A7A2" }}>AUTO SALE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: "0.26em", color: "#A7A7A2" }}>
            OCEANSIDE, CALIFORNIA
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              marginTop: 26,
            }}
          >
            <div>{`${siteConfig.fleetCount} Cars. One Fleet.`}</div>
            <div>Your Next Drive.</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
