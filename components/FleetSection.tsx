import { ArrowRight } from "lucide-react";
import { bookingHref, siteConfig } from "@/config/site";
import { featuredFleet } from "@/data/fleet";
import { FleetGrid } from "@/components/FleetGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function FleetSection() {
  return (
    <section id="fleet" className="evo-section border-t border-line">
      <div className="evo-container">
        <SectionIntro eyebrow="The Fleet" heading="A Fleet Built for Every Drive.">
          From everyday transportation to vehicles made for the weekend,{" "}
          {siteConfig.businessName} offers a constantly evolving fleet of more than{" "}
          {siteConfig.fleetCountNumeric} vehicles.
        </SectionIntro>

        <FleetGrid
          vehicles={featuredFleet}
          note="Browse featured vehicles below or view live availability to see the complete current selection."
        />

        <Reveal>
          <div className="mt-16 border-t border-line pt-10">
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[0.9375rem] transition-colors duration-300 hover:text-white"
            >
              View the Full Fleet
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
