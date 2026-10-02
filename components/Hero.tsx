import { bookingHref, siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroIntro } from "@/components/ui/HeroIntro";
import { StatsStrip } from "@/components/StatsStrip";

export function Hero() {
  return (
    <section id="top" className="hero-section grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24">
      {/* The car itself is the fixed studio backdrop behind the whole page
          (components/StudioBackdrop.tsx); the hero is the first window onto
          it, so this section draws only the scrims and the type. */}
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

      <div className="hero-content hero-veil evo-veil-fade evo-container relative pb-6 md:pb-8">
        <div className="max-w-3xl">
          <p className="eyebrow rise flex items-center gap-4 text-ink/70">
            <span aria-hidden="true" className="block h-px w-8 bg-accent" />
            {siteConfig.city}, {siteConfig.regionName}
          </p>

          <h1 className="display display-hero rise mt-6 [animation-delay:100ms]">
            Find your
            <br />
            <span className="text-accent">next drive.</span>
          </h1>

          <p className="body-lead rise mt-6 max-w-sm text-ink/80 [animation-delay:200ms]">
            {siteConfig.fleetCount} vehicles. Specialty rentals from{" "}
            {siteConfig.businessName} in {siteConfig.city}.
          </p>

          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:300ms]">
            <CtaLink href="#fleet">Explore the Fleet</CtaLink>
            <CtaLink href={bookingHref} external variant="secondary">
              View Live Availability
            </CtaLink>
          </div>
        </div>

        <div className="rise mt-10 [animation-delay:420ms] lg:mt-16">
          <StatsStrip />
        </div>
      </div>
    </section>
  );
}
