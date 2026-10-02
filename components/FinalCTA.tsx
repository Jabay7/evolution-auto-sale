import { bookingHref, siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { InstagramGlyph } from "@/components/ui/InstagramGlyph";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="studio-window relative isolate flex min-h-[100svh] items-center overflow-hidden border-t border-line py-24"
    >
      {/* No photograph of its own: the closing band is the last window onto the
          studio backdrop, so the page ends on the same car it opened with. */}
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
