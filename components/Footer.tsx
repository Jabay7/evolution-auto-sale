import { bookingHref, siteConfig } from "@/config/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { Wordmark } from "@/components/ui/Wordmark";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Fleet", href: "#fleet" },
      { label: "About", href: "#why" },
      { label: "Experience", href: "#experience" },
      { label: "Oceanside", href: "#oceanside" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: siteConfig.instagramHandle, href: siteConfig.instagramUrl, external: true },
      { label: "Live Availability", href: bookingHref, external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-elevated">
      <div className="evo-container py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            {/* Not a link: the header mark already carries the back-to-top
                anchor, and a second copy would only add a duplicate stop for
                anyone tabbing through. */}
            <div className="flex items-center gap-3">
              <BrandMark />
              <Wordmark />
            </div>
            <p className="mt-7 text-sm leading-relaxed text-muted">
              Specialty Vehicle Rentals
              <br />
              {siteConfig.location}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="md:col-span-3">
              <p className="label-micro text-muted">{column.title}</p>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            Vehicle availability, trip requirements, pricing and reservations are handled through
            the external booking platform.
          </p>
          <p className="text-xs text-muted md:text-right">
            © {year} {siteConfig.businessName}
          </p>
        </div>
      </div>
    </footer>
  );
}
