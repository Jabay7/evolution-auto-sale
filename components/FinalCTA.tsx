import Image from "next/image";
import { bookingHref, siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { InstagramGlyph } from "@/components/ui/InstagramGlyph";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="grain relative isolate flex min-h-[520px] items-center overflow-hidden border-t border-line py-24 md:min-h-[620px]"
    >
      <Image
        src="/images/hero/final-cta.webp"
        alt="White Kia K4 sedan from the Evolution Auto Sale fleet parked in Oceanside, California"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover object-[55%_45%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/85 to-bg/55" />

      <div className="evo-container relative">
        <div className="max-w-2xl">
          <Reveal>
            <h2 id="cta-heading" className="display display-xl">
              Ready for the Next Drive?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="body-lead mt-7 max-w-md text-ink/75">
              Explore the current fleet and find what fits your trip.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink href={bookingHref} external>
                View Live Availability
              </CtaLink>
              <CtaLink href={siteConfig.instagramUrl} external variant="instagram">
                <InstagramGlyph className="size-4" />
                Follow {siteConfig.instagramHandle}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
