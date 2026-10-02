import { Car, Compass, Layers, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const benefits = [
  {
    icon: Layers,
    title: `A ${siteConfig.fleetCount} Vehicle Fleet`,
    copy: `More than ${siteConfig.fleetCountNumeric} vehicles with options for different trips, preferences and driving styles.`,
  },
  {
    icon: MapPin,
    title: `Based in ${siteConfig.city}`,
    copy: `Conveniently positioned in ${siteConfig.area}.`,
  },
  {
    icon: Car,
    title: "Vehicle-Focused",
    copy: "A business built around cars and the people who enjoy driving them.",
  },
  {
    icon: Compass,
    title: "Simple Discovery",
    copy: "Explore the fleet here, then check the external booking profile for live vehicle availability.",
  },
];

export function WhyEvolution() {
  return (
    /* A window onto the studio backdrop: the car sits on the right of the
       viewport, so everything here is kept to the left half on a desktop. */
    <section id="why" className="studio-window evo-section relative flex min-h-[100svh] items-center border-t border-line">
      <div className="evo-container">
        <div className="lg:max-w-[min(44rem,48%)]">
          <SectionIntro eyebrow="Approach" heading="Why Evolution?" layout="stacked" />

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit.title} delay={index * 90} className="border-t border-line-strong pt-8">
                <div className="flex items-center justify-between">
                  <span className="label-micro text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <benefit.icon className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-display mt-8 text-[1.125rem] font-medium tracking-[-0.015em]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{benefit.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
