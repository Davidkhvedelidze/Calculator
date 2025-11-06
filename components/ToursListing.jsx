"use client";

import { useSnapshot } from "valtio";
import { FilterBar } from "@/components/FilterBar";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";
import { uiState } from "@/store";

export function ToursListing() {
  const snap = useSnapshot(uiState);

  const filtered = tours.filter((tour) => {
    const matchRegion =
      snap.filter.regions.length === 0 || snap.filter.regions.includes(tour.region);
    const matchTheme =
      snap.filter.themes.length === 0 || snap.filter.themes.includes(tour.theme);
    return matchRegion && matchTheme;
  });

  return (
    <div className="space-y-10">
      <FilterBar />
      {filtered.length === 0 ? (
        <div className="card text-center  ">
          No tours match your filters right now. Reach out and we will craft
          something bespoke!
        </div>
      ) : (
        <div className="grid gap-8">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} layout="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
}
