import Image from "next/image";
import { bookingHref, siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroIntro } from "@/components/ui/HeroIntro";
import { StatsStrip } from "@/components/StatsStrip";

const heroPhoto = "/images/hero/evolution-hero.webp";
const heroAlt = "White performance sedan parked on a tree-lined road";

export function Hero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24">
      {/*
        The photograph is portrait but this section is full-viewport, so on a
        wide screen object-cover would scale it up until only a band of it
        survived — a close-up of one headlight. Instead the whole frame is kept
        and the space around it is filled with a blurred, darkened copy of the
        same file, feathered at the edges so there is no seam between them.
        One src throughout, so it is still a single request.
      */}
      <Image
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 scale-110 object-cover blur-3xl brightness-[0.32]"
      />

      {/* A phone is close enough to the photograph's own shape to crop it
          directly, and the blurred layer never shows through. */}
      <Image
        src={heroPhoto}
        alt={heroAlt}
        fill
        priority
        sizes="100vw"
        className="hero-frame -z-10 object-cover object-[41%_50%] md:hidden"
      />

      {/* Wider than that, the frame is kept whole in its own aspect-ratio box —
          which is what lets the mask line up with the edges of the photograph
          rather than with the edges of the viewport. */}
      <div className="hero-panel absolute -top-[9%] bottom-[9%] left-1/2 -z-10 hidden aspect-[1100/1279] [mask-image:linear-gradient(to_right,transparent,#000_13%,#000_87%,transparent)] md:block">
        <Image src={heroPhoto} alt={heroAlt} fill sizes="60vw" className="object-cover" />
      </div>

      <HeroIntro />

      {/* Seen only during the intro: the photograph alone gives no sign that
          there is anything below it. */}
      <div aria-hidden="true" className="hero-cue pointer-events-none absolute inset-x-0 bottom-12 z-10">
        <div className="evo-container flex flex-col gap-4">
          <span className="label-micro text-ink/70">Scroll</span>
          <span className="hero-cue-line block h-14 w-px bg-white/45" />
        </div>
      </div>

      {/* See .scrim-* in globals.css for how these are weighted. The scrims are
          part of the veil so that, before it lifts, the photograph is seen
          undimmed. */}
      <div aria-hidden="true" className="hero-veil evo-veil-fade scrim-bottom absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-veil evo-veil-fade scrim-left absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-veil evo-veil-fade scrim-top absolute inset-x-0 top-0 -z-10 h-36" />

      <div className="hero-veil evo-veil-fade evo-container relative pb-8">
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
