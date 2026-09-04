import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export function FleetScaleSection() {
  return (
    <section
      aria-labelledby="scale-heading"
      className="grain relative isolate flex min-h-[560px] items-end overflow-hidden border-t border-line py-20 md:min-h-[680px] md:py-24"
    >
      {/* Wide fleet photograph — replace /public/images/fleet/fleet-lineup.webp
          with a lineup shot showing several vehicles together. */}
      <Image
        src="/images/fleet/fleet-lineup.webp"
        alt="Vehicle from the Evolution Auto Sale fleet photographed on a Southern California street"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/80 to-bg/45" />

      <div className="evo-container relative">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <p className="display-numeral" aria-hidden="true">
              {siteConfig.fleetCount}
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:pb-4">
            <Reveal delay={120}>
              <h2 id="scale-heading" className="display display-lg uppercase tracking-[-0.01em]">
                Vehicles and
                <br />
                counting
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-lead mt-6 max-w-md text-ink/70">
                More choices. More flexibility. One professionally managed fleet in{" "}
                {siteConfig.city}.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
