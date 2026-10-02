import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { bookingHref, siteConfig } from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { Wordmark } from "@/components/ui/Wordmark";

export const metadata: Metadata = {
  title: "Privacy & Legal",
  description: `Privacy, accessibility and booking notices for ${siteConfig.businessName}.`,
  alternates: { canonical: "/legal" },
};

/** Change this whenever the policy below changes (CalOPPA requires it). */
const EFFECTIVE_DATE = "October 2, 2026";

type Section = {
  id: string;
  title: string;
  /** The law that requires or shapes this section, shown under its heading. */
  law: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "bookings",
    title: "Bookings and photos",
    law: "False Advertising Law, Bus. & Prof. Code § 17500; rental rate disclosures, Civ. Code § 1939.19",
    body: (
      <>
        <p>
          This site shows no prices and takes no bookings or payments. Rates, fees, trip
          requirements and reservations are all handled on{" "}
          <a href={bookingHref} target="_blank" rel="noopener noreferrer">
            Turo
          </a>
          , under Turo&rsquo;s own terms.
        </p>
        <p>
          Some images are digital 3D renderings based on vehicles in our fleet, not photographs.
          Details may differ slightly, and what&rsquo;s available changes often, so check the
          listing on Turo before you book.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    law: "California Online Privacy Protection Act, Bus. & Prof. Code §§ 22575–22579; California Consumer Privacy Act, Civ. Code § 1798.100 et seq.",
    body: (
      <>
        <p>
          We collect nothing. No forms, accounts, cookies, analytics, ads or
          trackers, and we never sell or share personal information. That also means we hold
          nothing about you to view, change or delete. Our web host keeps standard security logs.
        </p>
        <p>
          Because nothing is tracked, &ldquo;Do Not Track&rdquo; browser settings change nothing
          here, and no other company can track you across websites through this one. If this
          policy changes, we&rsquo;ll update this page. Effective <strong>{EFFECTIVE_DATE}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    law: "Americans with Disabilities Act, 42 U.S.C. § 12182; Unruh Civil Rights Act, Civ. Code §§ 51–52",
    body: (
      <p>
        We aim to meet WCAG 2.1 AA so everyone can use this site. If something is hard to use, tell
        us on{" "}
        <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
          Instagram {siteConfig.instagramHandle}
        </a>{" "}
        and we&rsquo;ll fix it.
      </p>
    ),
  },
  {
    id: "trademarks",
    title: "Trademarks",
    law: "Lanham Act, 15 U.S.C. § 1125",
    body: (
      <p>
        {siteConfig.businessName} is an independent business, not owned or operated by Turo or
        Meta. Turo, Instagram and vehicle brands belong to their owners and are named only to show
        where to book and follow us. © {new Date().getFullYear()} {siteConfig.businessName}.
      </p>
    ),
  },
];

/**
 * Privacy policy and legal notices, in plain language, each section citing the
 * law behind it. Linked from the footer with the word "Privacy" so it counts as
 * "conspicuously posted" under CalOPPA (Bus. & Prof. Code § 22577(b)).
 *
 * Everything here must stay true of the site: if a form, cookie, analytics or
 * any third-party script is ever added, this page has to change first.
 */
export default function LegalPage() {
  return (
    <main className="min-h-[100svh] bg-bg">
      <header className="border-b border-line">
        <div className="evo-container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.businessName} home`}>
            <BrandMark size={40} />
            <Wordmark compact />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </header>

      <div className="evo-container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-8 bg-accent" />
            Legal
          </p>
          <h1 className="display display-xl mt-6">Privacy &amp; Legal</h1>

          <nav aria-label="On this page" className="mt-10 border-y border-line py-5">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-muted transition-colors duration-300 hover:text-accent">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="legal-section mt-14">
              <h2 id={`${section.id}-title`} className="font-display text-[1.5rem] font-medium tracking-[-0.015em]">
                {section.title}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-accent">{section.law}</p>
              <div className="legal-prose mt-6">{section.body}</div>
            </section>
          ))}

          <p className="mt-16 border-t border-line pt-8 text-xs leading-relaxed text-muted">
            Effective {EFFECTIVE_DATE}. This page explains how this website works. It is general
            information, not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
