import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

const places = ["Oceanside", "North County", "San Diego County", "Southern California"];

export function OceansideSection() {
  return (
    <section id="oceanside" className="evo-section border-t border-line">
      <div className="evo-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            {/* Replace /public/images/oceanside/ with a coastal or palm-lined
                photograph once one is available. */}
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-card">
              <Image
                src="/images/oceanside/oceanside-coastal.webp"
                alt="Sedan from the Evolution Auto Sale fleet on a palm-lined street in Oceanside, California"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Location</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display display-xl mt-6">
                Born in Oceanside.
                <br />
                Built for Southern California.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lead mt-8 max-w-lg">
                Based in {siteConfig.city}, {siteConfig.businessName} puts you in the heart of{" "}
                {siteConfig.area} — with the coast, San Diego, Orange County and countless Southern
                California drives within reach.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {places.map((place) => (
                  <li
                    key={place}
                    className="label-micro rounded-full border border-line px-4 py-2.5 text-muted"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
