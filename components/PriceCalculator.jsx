"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "../helpers/formatPrice";

const ACCOMMODATION_DESCRIPTIONS = {
  standard: "Boutique hotels & guesthouses",
  premium: "Design hotels & wine estates",
  luxury: "5-star resorts & private villas",
};

const SEASON_DESCRIPTIONS = {
  peak: "June - August",
  shoulder: "April - May, September - October",
  low: "November - March",
};

export function PriceCalculator({ tour, selectedDates, groupSize = 2 }) {
  const [guests, setGuests] = useState(groupSize);
  const [season, setSeason] = useState("peak");
  const [accommodation, setAccommodation] = useState("standard");
  const [totalPrice, setTotalPrice] = useState(0);

  // Extract base price from tour price string
  const basePrice = parseInt(tour.price.replace(/[^0-9]/g, "")) || 1280;

  // Pricing tiers based on season and accommodation
  const pricingTiers = {
    peak: {
      standard: { multiplier: 1.0, name: "Peak Season" },
      premium: { multiplier: 1.4, name: "Peak Premium" },
      luxury: { multiplier: 1.8, name: "Peak Luxury" },
    },
    shoulder: {
      standard: { multiplier: 0.8, name: "Shoulder Season" },
      premium: { multiplier: 1.1, name: "Shoulder Premium" },
      luxury: { multiplier: 1.4, name: "Shoulder Luxury" },
    },
    low: {
      standard: { multiplier: 0.6, name: "Low Season" },
      premium: { multiplier: 0.8, name: "Low Premium" },
      luxury: { multiplier: 1.1, name: "Low Luxury" },
    },
  };

  // Group discounts
  const groupDiscounts = {
    1: 1.0,
    2: 1.0,
    3: 0.95,
    4: 0.9,
    5: 0.85,
    6: 0.8,
    7: 0.75,
    8: 0.7,
  };

  // Calculate total price
  useEffect(() => {
    const tier = pricingTiers[season][accommodation];
    const groupDiscount = groupDiscounts[Math.min(guests, 8)] || 0.7;
    const pricePerPerson = basePrice * tier.multiplier;
    const discountedPrice = pricePerPerson * groupDiscount;
    const total = Math.round(discountedPrice * guests);
    setTotalPrice(total);
  }, [guests, season, accommodation, basePrice]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold   dark:text-slate-100">
          Price Calculator
        </h3>
        <p className="text-sm   dark:text-slate-300">
          Customize your journey and see real-time pricing
        </p>
      </div>

      {/* Group Size */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Number of Guests
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white   hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-lg font-semibold   dark:text-slate-100">
            {guests}
          </span>
          <button
            onClick={() => setGuests(Math.min(8, guests + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white   hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light"
          >
            +
          </button>
        </div>
      </div>

      {/* Season Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Travel Season
        </label>
        <div className="grid gap-2">
          {Object.entries(pricingTiers).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSeason(key)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                season === key
                  ? "border-brand bg-brand/10 text-brand-dark dark:border-brand-light dark:bg-brand/20 dark:text-brand-light"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand/50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light/50"
              }`}
            >
              <div className="font-semibold">{value.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {SEASON_DESCRIPTIONS[key] || null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accommodation Level */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Accommodation Level
        </label>
        <div className="grid gap-2">
          {Object.entries(pricingTiers[season]).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setAccommodation(key)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                accommodation === key
                  ? "border-brand bg-brand/10 text-brand-dark dark:border-brand-light dark:bg-brand/20 dark:text-brand-light"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand/50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light/50"
              }`}
            >
              <div className="font-semibold">{value.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {ACCOMMODATION_DESCRIPTIONS[key] || null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold   dark:text-slate-300">
              Price per person
            </span>
            <span className="text-sm font-semibold   dark:text-slate-100">
              {formatPrice(Math.round(totalPrice / guests))}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold   dark:text-slate-300">
              Total for {guests} {guests === 1 ? "guest" : "guests"}
            </span>
            <span className="text-2xl font-bold text-brand-dark dark:text-brand-light">
              {formatPrice(totalPrice)}
            </span>
          </div>
          {guests >= 3 && (
            <div className="rounded-2xl bg-brand/10 px-3 py-2 text-xs font-semibold text-brand-dark dark:bg-brand/20 dark:text-brand-light">
              🎉 Group discount applied! Save{" "}
              {formatPrice(basePrice * guests * (1 - groupDiscounts[guests]))}
            </div>
          )}
        </div>
      </div>

      {/* What's Included */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          What's included
        </h4>
        <ul className="space-y-2 text-xs   dark:text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-brand">✓</span>
            All accommodations as specified
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand">✓</span>
            Private transportation & transfers
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand">✓</span>
            Expert local guides
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand">✓</span>
            All meals & wine tastings
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand">✓</span>
            Entrance fees & activities
          </li>
        </ul>
      </div>
    </div>
  );
}
