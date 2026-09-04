import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const steps = [
  { title: "Explore", copy: "Browse Evolution's featured vehicles." },
  { title: "Choose", copy: "Find a vehicle that fits your trip." },
  {
    title: "Check Availability",
    copy: "Continue to the official booking profile for live availability and trip details.",
  },
  { title: "Drive", copy: "Complete the reservation there and get ready for the road." },
];

export function HowItWorks() {
  return (
    <section id="experience" className="evo-section border-t border-line bg-elevated">
      <div className="evo-container">
        <SectionIntro eyebrow="The Experience" heading="Your Next Drive, Made Simple." layout="stacked" />

        <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 100} className="relative lg:pr-6">
              {/* Timeline rule: horizontal across desktop, hidden when stacked. */}
              <div aria-hidden="true" className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-white/45" />
                <span className="h-px flex-1 bg-line" />
              </div>

              <p className="label-micro mt-7 text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-[1.25rem] font-medium uppercase tracking-[0.015em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
