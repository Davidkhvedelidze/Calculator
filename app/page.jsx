import Image from 'next/image';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';
import { TourCard } from '@/components/TourCard';
import { BlogCard } from '@/components/BlogCard';
import { tours } from '@/data/tours';
import { blogPosts } from '@/data/blog';

const heroStats = [
  { label: 'Handcrafted itineraries', value: '120+' },
  { label: 'Trusted local hosts', value: '65' },
  { label: 'Five-star reviews', value: '2.4k' }
];

const experiences = [
  {
    title: 'Boutique stays',
    description: 'Design-led hotels, vineyard estates, and alpine lodges curated for comfort and character.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z" />
      </svg>
    )
  },
  {
    title: 'Culinary storytelling',
    description: 'Private supra feasts, chef collaborations, and vineyard lunches with tamadas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M4 3h16l-1.5 9.5a4 4 0 01-4 3.5H9.5a4 4 0 01-4-3.5L4 3zm4 19a3 3 0 006 0" />
      </svg>
    )
  },
  {
    title: 'Slow travel experts',
    description: 'Balanced pacing with wellness rituals, cultural workshops, and time to breathe.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 3v18m9-9H3" />
      </svg>
    )
  }
];

export default function HomePage() {
  return (
    <>
      <section className="gradient-sunrise">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-10">
            <span className="badge">Boutique journeys across Georgia</span>
            <h1 className="max-w-2xl text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-5xl">
              Unlock soulful adventures crafted by Must See Georgia.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              We design immersive escapes across Georgia, pairing iconic landmarks with rare local encounters. Travel deeper with
              hosts who celebrate culture, cuisine, and community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tours" className="btn-primary">
                Explore Signature Tours
              </Link>
              <Link href="/contact" className="btn-secondary">
                Consult a Curator
              </Link>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/80 p-5 text-center shadow-md">
                  <dt className="text-sm font-medium text-slate-600">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-brand-dark">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -left-10 -top-10 hidden h-24 w-24 rounded-3xl bg-brand/20 lg:block" />
            <div className="card relative overflow-hidden rounded-[36px]">
              <Image
                src="https://images.unsplash.com/photo-1541849549-216549ae2161?auto=format&fit=crop&w=1200&q=80"
                alt="Traveler overlooking the mountains in Georgia"
                width={720}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 text-white">
                <BrandMark className="text-white" />
                <p className="mt-3 text-sm text-white/80">
                  "Every itinerary felt like it was crafted exclusively for us—intimate, surprising, and perfectly paced."
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-brand-light">— Zara & Mikel, Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-display font-semibold text-slate-900">Why travel with us</h2>
              <p className="text-base text-slate-600">
                Our curators unlock insider access to chefs, artisans, guides, and storytellers. We choreograph journeys that
                honor Georgian traditions while embracing modern comforts.
              </p>
            </div>
            <Link href="/about" className="btn-secondary">
              Learn about our philosophy
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div key={experience.title} className="card space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                  {experience.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{experience.title}</h3>
                <p className="text-sm text-slate-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70">
        <div className="container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="badge">Featured escapes</span>
              <h2 className="mt-4 text-3xl font-display font-semibold text-slate-900">Signature journeys to bookmark</h2>
            </div>
            <Link href="/tours" className="btn-secondary">
              View all tours
            </Link>
          </div>
          <div className="grid gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} layout="horizontal" />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-6">
            <span className="badge">Travel journal</span>
            <h2 className="text-3xl font-display font-semibold text-slate-900">Stories from our curators</h2>
            <p className="text-base text-slate-600">
              Stay inspired with dispatches from Georgia—from new hotel openings to seasonal tasting menus and mindful travel
              rituals.
            </p>
            <Link href="/blog" className="btn-primary w-fit">
              Explore the journal
            </Link>
          </div>
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr,1fr] lg:items-center">
          <div className="space-y-6">
            <span className="badge bg-white/10 text-white">Tailor-made service</span>
            <h2 className="text-3xl font-display font-semibold text-white">Let’s choreograph your Georgian odyssey</h2>
            <p className="text-base text-white/80">
              Share your dream dates, travel style, and must-see moments. Our curators will respond within 24 hours with a
              handcrafted concept.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary bg-white text-brand-dark hover:bg-brand-light">
                Request a consultation
              </Link>
              <Link href="/tours" className="btn-secondary border-white text-white hover:bg-white/10">
                Browse itineraries
              </Link>
            </div>
          </div>
          <div className="card bg-white/10 text-white backdrop-blur">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">Preferred travel month</label>
                <input
                  type="text"
                  placeholder="e.g. September 2024"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">Interests</label>
                <textarea
                  rows="3"
                  placeholder="Wine, wellness, culinary, adventure..."
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-light focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full bg-white text-brand-dark hover:bg-brand-light">
                Submit request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
