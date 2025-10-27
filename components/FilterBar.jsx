'use client';

import { useSnapshot } from 'valtio';
import { setFilter, uiState } from '@/store';

const regions = ['All', 'Tbilisi', 'Svaneti', 'Kakheti'];
const themes = ['All', 'Culture', 'Adventure', 'Wine'];

export function FilterBar() {
  const snap = useSnapshot(uiState);

  return (
    <div className="card flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="text-lg font-semibold text-slate-900">Refine by region & mood</h3>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Region</span>
          <select
            value={snap.filter.region}
            onChange={(event) => setFilter('region', event.target.value)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {regions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Theme</span>
          <select
            value={snap.filter.theme}
            onChange={(event) => setFilter('theme', event.target.value)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {themes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
