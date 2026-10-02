import Image from "next/image";

const studioPhoto = "/images/brand/studio.webp";

/**
 * The studio photograph, fixed behind the whole page.
 *
 * Every section is opaque except the few that open a window onto it — the
 * hero, Why Evolution and the closing call to action — so the car stays put
 * while the page slides over it, and reappears each time a window comes past.
 * A fixed layer rather than `background-attachment: fixed`, which iOS ignores.
 *
 * The photograph is never stretched to cover the viewport. Its dark seamless
 * fades into the page background at every edge (.studio-mask), so on a wide
 * screen the seamless simply continues, and the car keeps its proportions.
 */
export function StudioBackdrop() {
  return (
    <div aria-hidden="true" className="studio-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="studio-drift absolute inset-0">
        {/* Phones: full width, high in the frame, with the type beneath. */}
        <div className="hero-frame studio-mask absolute inset-x-0 top-[11svh] aspect-[1448/1086] md:hidden">
          <Image src={studioPhoto} alt="" fill priority sizes="100vw" className="studio-image object-cover" />
        </div>

        {/* Wider: as tall as the viewport, centred during the intro and
            settling to the right once the headline arrives. */}
        <div className="hero-panel studio-mask absolute top-[7vh] left-1/2 hidden h-[92vh] aspect-[1448/1086] md:block">
          <Image src={studioPhoto} alt="" fill priority sizes="100vw" className="studio-image object-cover" />
        </div>
      </div>

      <div className="studio-vignette absolute inset-0" />
    </div>
  );
}
