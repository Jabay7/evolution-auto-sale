import Image from "next/image";
import { bookingHref, siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { StatsStrip } from "@/components/StatsStrip";

export function Hero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24">
      {/*
        Hero photograph. The current source is 596px wide, well under what a
        full-viewport hero wants; replace
        /public/images/hero/evolution-hero.webp with a higher-resolution
        authorised photograph when one is available. The framing below is tuned
        to keep the vehicle in shot on portrait phones.
      */}
      <Image
        src="/images/hero/evolution-hero.webp"
        alt="White performance sedan parked on an open coastal road at sunset"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[58%_62%] md:object-[58%_50%]"
      />

      {/* See .scrim-* in globals.css for how these are weighted. */}
      <div aria-hidden="true" className="scrim-bottom absolute inset-0 -z-10" />
      <div aria-hidden="true" className="scrim-left absolute inset-0 -z-10" />
      <div aria-hidden="true" className="scrim-top absolute inset-x-0 top-0 -z-10 h-36" />

      <div className="evo-container relative pb-8">
        <div className="max-w-4xl">
          <p className="eyebrow rise flex items-center gap-4 text-ink/70">
            <span aria-hidden="true" className="block h-px w-10 bg-white/35" />
            {siteConfig.city}, {siteConfig.regionName}
          </p>

          <h1 className="display display-hero rise mt-6 [animation-delay:100ms]">
            {siteConfig.fleetCount} Cars.
            <br />
            One Fleet.
            <br />
            Your Next Drive.
          </h1>

          <p className="body-lead rise mt-7 max-w-lg text-ink/80 [animation-delay:200ms]">
            {siteConfig.businessName} brings together a {siteConfig.fleetCount} vehicle fleet in{" "}
            {siteConfig.location} — giving drivers more ways to find the right car for the road
            ahead.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:300ms]">
            <CtaLink href="#fleet">Explore the Fleet</CtaLink>
            <CtaLink href={bookingHref} external variant="secondary">
              View Live Availability
            </CtaLink>
          </div>
        </div>

        <div className="rise mt-12 [animation-delay:420ms] lg:mt-16">
          <StatsStrip />
        </div>
      </div>
    </section>
  );
}
