"use client";

import { useState } from "react";
import { PriceCalculator } from "@/components/PriceCalculator";
import { Calendar } from "@/components/Calendar";

export function TourDetailClient({ tour }) {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("Selected dates:", dates);
  };

  return (
    <aside className="space-y-8">
      {/* Calendar Component */}
      <div className="card">
        <Calendar onDateSelect={handleDateSelect} />
      </div>

      {/* Price Calculator Component */}
      <div className="card">
        <PriceCalculator tour={tour} selectedDates={selectedDates} />
      </div>

      {/* Contact Form */}
      <div className="card space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold   dark:text-slate-100">
            Reserve this journey
          </h2>
          <p className="text-sm   dark:text-slate-300">
            Share your preferred dates, group size, and interests. Our concierge
            will respond within 24 hours with a bespoke proposal.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Name
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-brand-light"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Email
            </label>
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-brand-light"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Interests
            </label>
            <textarea
              rows="3"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-brand-light"
              placeholder="Wine, architecture, wellness, adventure..."
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Request details
          </button>
        </form>
      </div>
    </aside>
  );
}
