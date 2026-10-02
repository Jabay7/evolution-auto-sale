"use client";

import { useState, type ReactNode } from "react";
import { CATEGORY_ORDER, type Vehicle, type VehicleCategory } from "@/data/fleet";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal } from "@/components/ui/Reveal";

type Filter = VehicleCategory | "All";

/**
 * Filters are rendered from the categories that actually exist in the fleet
 * data, so adding an "Electric" vehicle activates that pill on its own. Pills
 * are hidden entirely while the fleet only holds a single category.
 *
 * Non-matching cards are hidden rather than unmounted, which keeps already
 * decoded images in place and makes filtering feel instant.
 */
export function FleetGrid({ vehicles, note }: { vehicles: Vehicle[]; note?: ReactNode }) {
  const [active, setActive] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...CATEGORY_ORDER.filter((category) => vehicles.some((vehicle) => vehicle.category === category))];
  const showFilters = filters.length > 2;
  const visibleCount = vehicles.filter((vehicle) => active === "All" || vehicle.category === active).length;

  return (
    <>
      <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
        {note ? (
          <Reveal>
            <p className="max-w-md text-sm leading-relaxed text-muted">{note}</p>
          </Reveal>
        ) : (
          <span />
        )}

        {showFilters ? (
          <Reveal>
            <div role="group" aria-label="Filter vehicles by category" className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = filter === active;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(filter)}
                    aria-controls="fleet-vehicles"
                    className={`label-micro flex min-h-11 items-center gap-3 rounded-full border px-5 py-2.5 transition-colors duration-300 ${
                      isActive
                        ? "border-transparent bg-ink text-bg"
                        : "border-line text-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    {filter}
                    <span aria-hidden="true" className="tabular-nums">
                      {filter === "All" ? vehicles.length : vehicles.filter((vehicle) => vehicle.category === filter).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="label-micro mt-8 text-muted">
        {visibleCount} featured {visibleCount === 1 ? "vehicle" : "vehicles"}
        {active !== "All" ? ` · ${active}` : ""}
      </p>

      <div id="fleet-vehicles" className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {vehicles.map((vehicle, index) => {
          const visible = active === "All" || vehicle.category === active;
          return (
            <Reveal
              key={vehicle.id}
              delay={(index % 3) * 90}
              className={visible ? undefined : "hidden"}
            >
              <VehicleCard vehicle={vehicle} eager={index < 3} />
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
