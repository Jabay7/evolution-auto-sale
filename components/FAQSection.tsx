"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { faqs } from "@/data/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby="faq-heading" className="evo-section border-t border-line">
      <div className="evo-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionIntro eyebrow="Questions" heading="Good to Know." layout="stacked" headingId="faq-heading" />
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {faqs.map((faq, index) => {
                const open = openIndex === index;
                const panelId = `${baseId}-panel-${index}`;
                const buttonId = `${baseId}-button-${index}`;

                return (
                  <Reveal as="li" key={faq.question} delay={index * 60} className="border-b border-line">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : index)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-white"
                      >
                        <span className="font-display text-[1.0625rem] font-medium tracking-[-0.015em] md:text-[1.1875rem]">
                          {faq.question}
                        </span>
                        <Plus
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className={`size-5 shrink-0 text-muted transition-transform duration-500 ${
                            open ? "rotate-45" : ""
                          }`}
                        />
                      </button>
                    </h3>

                    <div id={panelId} role="region" aria-labelledby={buttonId} className="collapse-grid" data-open={open}>
                      <div>
                        <p className="max-w-2xl pb-7 text-[0.9375rem] leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
