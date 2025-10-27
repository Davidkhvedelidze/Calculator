'use client';

import { useSnapshot } from 'valtio';
import { FilterBar } from '@/components/FilterBar';
import { TourCard } from '@/components/TourCard';
import { tours } from '@/data/tours';
import { uiState } from '@/store';

export function ToursListing() {
  const snap = useSnapshot(uiState);

  const filtered = tours.filter((tour) => {
    const matchRegion = snap.filter.region === 'All' || tour.region === snap.filter.region;
    const matchTheme = snap.filter.theme === 'All' || tour.theme === snap.filter.theme;
    return matchRegion && matchTheme;
  });

  return (
    <div className="space-y-10">
      <FilterBar />
      {filtered.length === 0 ? (
        <div className="card text-center text-slate-600">
          No tours match your filters right now. Reach out and we will craft something bespoke!
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
