import { isBookingConfigured, siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";

/**
 * Only facts confirmed by the business appear here. No phone number, street
 * address, opening hours, rating or review count is asserted, because none
 * have been provided.
 */
export function StructuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Place", name: `${siteConfig.city}, ${siteConfig.regionName}` },
      { "@type": "Place", name: siteConfig.area },
      { "@type": "Place", name: "San Diego County, California" },
    ],
    sameAs: [
      siteConfig.instagramUrl,
      ...(isBookingConfigured ? [siteConfig.bookingProfileUrl] : []),
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
