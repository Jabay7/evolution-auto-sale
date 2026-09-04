"use client";

import { useState, type ReactNode } from "react";
import { activeCategories, type Vehicle, type VehicleCategory } from "@/data/fleet";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal } from "@/components/ui/Reveal";

type Filter = VehicleCategory | "All";

const filters: Filter[] = ["All", ...activeCategories];

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
  const showFilters = filters.length > 2;

  return (
    <>
      <div className="mt-16 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
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
                    className={`label-micro min-h-10 rounded-full border px-5 py-2.5 transition-colors duration-300 ${
                      isActive
                        ? "border-transparent bg-ink text-bg"
                        : "border-line text-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
