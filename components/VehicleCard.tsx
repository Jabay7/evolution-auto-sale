import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { resolveBookingHref } from "@/config/site";
import type { Vehicle } from "@/data/fleet";

type VehicleCardProps = {
  vehicle: Vehicle;
  /** Only the first row is worth fetching eagerly. */
  eager?: boolean;
};

export function VehicleCard({ vehicle, eager = false }: VehicleCardProps) {
  return (
    <a
      href={resolveBookingHref(vehicle.bookingUrl)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${vehicle.name} — View live availability (opens in a new tab)`}
      className="vehicle-card group block h-full overflow-hidden rounded-lg border border-line bg-elevated transition-colors duration-300 hover:border-accent/50 focus-visible:border-accent"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-card">
        <Image
          src={vehicle.image}
          alt={vehicle.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] motion-reduce:transform-none"
        />
      </div>

      <div className="p-5 md:p-6">
        <p className="label-micro text-accent">{vehicle.category}</p>
        <h3 className="font-display mt-2.5 text-[1.0625rem] font-medium tracking-[-0.015em] leading-snug">
          {vehicle.name}
          {vehicle.year ? <span className="text-muted"> · {vehicle.year}</span> : null}
        </h3>
      </div>
      <div className="mx-5 flex items-center justify-between border-t border-line py-3.5 text-xs text-muted transition-colors group-hover:text-accent md:mx-6">
        <span>View live availability</span>
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </div>
    </a>
  );
}
