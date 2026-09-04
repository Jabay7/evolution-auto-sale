import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionIntroProps = {
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
  /** Places the supporting copy beside the heading instead of beneath it. */
  layout?: "stacked" | "split";
  /** Lets a section reference its own heading with aria-labelledby. */
  headingId?: string;
};

export function SectionIntro({
  eyebrow,
  heading,
  children,
  layout = "split",
  headingId,
}: SectionIntroProps) {
  if (layout === "stacked") {
    return (
      <div className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id={headingId} className="display display-xl mt-6">
            {heading}
          </h2>
        </Reveal>
        {children ? (
          <Reveal delay={160}>
            <div className="body-lead mt-7 max-w-xl">{children}</div>
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id={headingId} className="display display-xl mt-6">
            {heading}
          </h2>
        </Reveal>
      </div>
      {children ? (
        <div className="lg:col-span-5 lg:pb-2">
          <Reveal delay={160}>
            <div className="body-lead">{children}</div>
          </Reveal>
        </div>
      ) : null}
    </div>
  );
}
