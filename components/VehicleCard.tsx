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
      aria-label={`${vehicle.name} — view on the live availability page`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-card transition-colors duration-500 group-hover:border-white/25">
        <Image
          src={vehicle.image}
          alt={vehicle.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="label-micro text-muted">{vehicle.category}</p>
          <h3 className="font-display mt-2.5 text-[1.0625rem] font-medium tracking-[-0.015em] leading-snug">
            {vehicle.name}
            {vehicle.year ? <span className="text-muted"> · {vehicle.year}</span> : null}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-white/30 group-hover:text-ink"
        >
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
