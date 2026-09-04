import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { InstagramGlyph } from "@/components/ui/InstagramGlyph";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A static, locally hosted grid — no Instagram API, no embed script, no
 * third-party tracking. Swap these paths to change what is shown.
 */
const grid = [
  { src: "/images/fleet/vehicle-03.webp", alt: "Black Hyundai Elantra sedan from the fleet" },
  { src: "/images/fleet/vehicle-05.webp", alt: "White Nissan Altima SR sedan from the fleet" },
  { src: "/images/fleet/vehicle-07.webp", alt: "Silver Kia Forte sedan from the fleet" },
  { src: "/images/fleet/vehicle-12.webp", alt: "Black Kia K4 sedan from the fleet" },
];

export function InstagramSection() {
  return (
    <section id="instagram" className="evo-section border-t border-line bg-elevated">
      <div className="evo-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Instagram</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display display-xl mt-6">Follow the Fleet.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lead mt-7 max-w-md">
                New arrivals. Fleet updates. Cars worth stopping for.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="font-display mt-10 text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em]">
                {siteConfig.instagramHandle}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <CtaLink href={siteConfig.instagramUrl} external className="mt-8">
                <InstagramGlyph className="size-4" />
                Follow {siteConfig.instagramHandle}
              </CtaLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {grid.map((item, index) => (
                <Reveal as="li" key={item.src} delay={index * 80}>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.alt} — view on Instagram`}
                    className="group relative block aspect-square overflow-hidden border border-line bg-card transition-colors duration-500 hover:border-white/25"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 27vw, 45vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
