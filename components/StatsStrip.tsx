import { siteConfig } from "@/config/site";

type Stat = {
  value: string;
  label: string;
  href?: string;
};

const stats: Stat[] = [
  { value: siteConfig.fleetCount, label: "Vehicles" },
  { value: siteConfig.city, label: siteConfig.regionName },
  { value: "Specialty", label: "Rentals" },
  { value: siteConfig.instagramHandle, label: "Instagram", href: siteConfig.instagramUrl },
];

/**
 * Hairline-divided cells: two columns on phones, four across from md.
 * Borders are set per index so the leftmost column always sits flush with the
 * container edge rather than gaining a stray rule.
 */
const cellRules = [
  "pl-0",
  "pl-6 border-l border-line",
  "pl-0 border-t border-line md:border-t-0 md:border-l md:pl-6",
  "pl-6 border-l border-t border-line md:border-t-0",
];

export function StatsStrip() {
  return (
    <ul className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {stats.map((stat, index) => {
        const body = (
          <>
            <span className="font-display block text-[clamp(1.0625rem,2vw,1.5rem)] font-medium tracking-[-0.01em] uppercase leading-none">
              {stat.value}
            </span>
            <span className="label-micro mt-2.5 block text-muted">{stat.label}</span>
          </>
        );

        return (
          <li key={stat.label} className={`py-6 md:py-7 ${cellRules[index]}`}>
            {stat.href ? (
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity duration-300 hover:opacity-65"
              >
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}
