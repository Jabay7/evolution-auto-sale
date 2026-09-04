import { Car, Compass, Layers, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const benefits = [
  {
    icon: Layers,
    title: "A Growing Fleet",
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
    <section id="why" className="evo-section border-t border-line">
      <div className="evo-container">
        <SectionIntro eyebrow="Approach" heading="Why Evolution?" layout="stacked" />

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} delay={index * 90} className="border-t border-line pt-8">
              <div className="flex items-center justify-between">
                <span className="label-micro text-muted">{String(index + 1).padStart(2, "0")}</span>
                <benefit.icon className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="font-display mt-8 text-[1.125rem] font-medium tracking-[-0.015em]">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{benefit.copy}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
