"use client";

import { useSnapshot } from "valtio";
import { Select } from "antd";
import { setFilter, uiState } from "@/store";

const regions = [
  { value: "Tbilisi", label: "Tbilisi" },
  { value: "Svaneti", label: "Svaneti" },
  { value: "Kakheti", label: "Kakheti" },
  { value: "Batumi", label: "Batumi" },
  { value: "Kutaisi", label: "Kutaisi" },
  { value: "Mtskheta", label: "Mtskheta" },
];

const themes = [
  { value: "Culture", label: "Culture" },
  { value: "Adventure", label: "Adventure" },
  { value: "Wine", label: "Wine" },
  { value: "Wellness", label: "Wellness" },
  { value: "History", label: "History" },
  { value: "Nature", label: "Nature" },
];

export function FilterBar() {
  const snap = useSnapshot(uiState);

  const clearAllFilters = () => {
    setFilter("regions", []);
    setFilter("themes", []);
  };

  const hasActiveFilters =
    snap.filter.regions?.length > 0 || snap.filter.themes?.length > 0;

  return (
    <div className="card flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Refine by region & mood
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-dark hover:text-brand dark:text-brand-light dark:hover:text-brand transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Regions
          </span>
          <Select
            mode="multiple"
            value={snap.filter.regions || []}
            onChange={(value) => setFilter("regions", value)}
            options={regions}
            className="w-full sm:w-[200px]"
            size="middle"
            placeholder="Select regions"
            maxTagCount="responsive"
            showSearch={false}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Themes
          </span>
          <Select
            mode="multiple"
            value={snap.filter.themes || []}
            onChange={(value) => setFilter("themes", value)}
            options={themes}
            className="w-full sm:w-[200px]"
            size="middle"
            placeholder="Select themes"
            maxTagCount="responsive"
            showSearch={false}
          />
        </div>
      </div>
    </div>
  );
}
