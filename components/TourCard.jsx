'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { toggleFavorite, uiState } from '@/store';

export function TourCard({ tour, layout = 'vertical' }) {
  const snap = useSnapshot(uiState);
  const isFavorite = snap.favorites.includes(tour.id);

  return (
    <article className="card overflow-hidden">
      <div className={layout === 'horizontal' ? 'grid gap-6 lg:grid-cols-[1.3fr,1fr]' : 'space-y-6'}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" sizes="(min-width: 1024px) 500px, 100vw" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="badge">{tour.theme}</span>
            <span>{tour.duration}</span>
            <span>{tour.region}</span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900">{tour.title}</h3>
          <p className="text-sm text-slate-600">{tour.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {tour.highlights.slice(0, 3).map((highlight) => (
              <span key={highlight} className="rounded-full bg-slate-100 px-3 py-1">
                {highlight}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-dark">{tour.price}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(tour.id)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  isFavorite ? 'border-brand bg-brand/10 text-brand-dark' : 'border-slate-200 text-slate-500 hover:border-brand hover:text-brand-dark'
                }`}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Remove from saved tours' : 'Save tour'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path
                    d="M12 20.5l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.019 3.99 4 6.5 4c1.54 0 3.04.81 3.9 2.09C11.46 4.81 12.96 4 14.5 4 17.01 4 19 6.019 19 8.5c0 3.78-3.4 6.86-8.55 10.68L12 20.5z"
                    fill={isFavorite ? 'currentColor' : 'none'}
                  />
                </svg>
              </button>
              <Link href={`/tours/${tour.slug}`} className="btn-secondary text-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
