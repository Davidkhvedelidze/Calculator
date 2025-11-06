import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tours } from '@/data/tours';

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export function generateMetadata({ params }) {
  const tour = tours.find((item) => item.slug === params.slug);
  if (!tour) return {};
  return {
    title: `${tour.title} | Must See Georgia`,
    description: tour.description
  };
}

export default function TourDetailPage({ params }) {
  const tour = tours.find((item) => item.slug === params.slug);

  if (!tour) {
    notFound();
  }

  const tripAdvisorSearchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${tour.title} Georgia tour`)}&ssrc=e`;
  const paymentMethods = ['PayPal', 'Apple Pay', 'Google Pay'];

  return (
    <section>
      <div className="container space-y-12">
        <div className="space-y-6">
          <Link href="/tours" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
            ← Back to tours
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
            <div className="space-y-6">
              <span className="badge">{tour.theme}</span>
              <h1 className="text-4xl font-display font-semibold text-slate-900">{tour.title}</h1>
              <p className="text-base text-slate-600">{tour.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="card space-y-1 text-sm text-slate-600">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</span>
                  <p className="text-base font-semibold text-slate-900">{tour.duration}</p>
                </div>
                <div className="card space-y-1 text-sm text-slate-600">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Region</span>
                  <p className="text-base font-semibold text-slate-900">{tour.region}</p>
                </div>
                <div className="card space-y-1 text-sm text-slate-600">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Investment</span>
                  <p className="text-base font-semibold text-brand-dark">{tour.price}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {tour.gallery.map((image) => (
                  <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image src={image} alt={tour.title} fill className="object-cover" sizes="(min-width: 1024px) 480px, 100vw" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">Highlights</h2>
                <ul className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">Day-by-day journey</h2>
                <div className="space-y-3">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="card">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-brand-dark">{day.day}</span>
                        <h3 className="text-lg font-semibold text-slate-900">{day.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{day.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <aside className="card sticky top-28 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">Reserve this journey</h2>
              <p className="text-sm text-slate-600">
                Share your preferred dates, group size, and interests. Our concierge will respond within 24 hours with a bespoke
                proposal.
              </p>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Secure online payments</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Reserve with peace of mind using modern payment wallets trusted worldwide.
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <li
                      key={method}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Name</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Travel month</label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                    placeholder="e.g. June 2024"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Guests</label>
                  <input
                    type="number"
                    min="1"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Interests</label>
                  <textarea
                    rows="3"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none"
                    placeholder="Wine, architecture, wellness, adventure..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Request details
                </button>
              </form>
              <Link
                href={tripAdvisorSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-sm"
              >
                Book via TripAdvisor
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
