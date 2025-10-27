import Image from 'next/image';
import Link from 'next/link';

const pillars = [
  {
    title: 'Local artistry',
    description: 'We collaborate with chefs, winemakers, designers, and guides across Georgia to champion their craft and community.'
  },
  {
    title: 'Responsible pacing',
    description: 'Our itineraries balance immersive exploration with restorative pauses, supporting slow travel principles.'
  },
  {
    title: 'Personal concierge',
    description: 'From the first call to your return home, our concierges orchestrate seamless logistics and thoughtful touches.'
  }
];

const timeline = [
  { year: '2014', description: 'Must See Georgia is founded by friends Nia and Sandro after curating bespoke trips for visiting creatives.' },
  { year: '2016', description: 'Opened our Tbilisi atelier and launched our first wine harvest residencies in Kakheti.' },
  { year: '2019', description: 'Expanded to alpine expeditions in Svaneti with certified mountain and ski guides.' },
  { year: '2022', description: 'Introduced wellness residencies focused on mindfulness, forest bathing, and spa rituals.' }
];

export const metadata = {
  title: 'About Must See Georgia',
  description: 'Meet the curators behind Must See Georgia and learn how we craft soulful itineraries throughout the country.'
};

export default function AboutPage() {
  return (
    <section>
      <div className="container space-y-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-6">
            <span className="badge">Our story</span>
            <h1 className="text-4xl font-display font-semibold text-slate-900">Curators of soulful Georgian journeys</h1>
            <p className="text-base text-slate-600">
              Must See Georgia was born from a desire to reveal the hospitality, artistry, and landscapes we grew up with. Our
              team blends backgrounds in hospitality, design, and cultural anthropology to ensure every experience feels both
              authentic and elevated.
            </p>
            <Link href="/contact" className="btn-primary w-fit">
              Meet your concierge
            </Link>
          </div>
          <div className="card overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
              alt="Founders of Must See Georgia welcoming guests"
              width={720}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{pillar.title}</h2>
              <p className="text-sm text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="card space-y-8">
          <h2 className="text-2xl font-display font-semibold text-slate-900">Milestones</h2>
          <dl className="grid gap-6 md:grid-cols-2">
            {timeline.map((entry) => (
              <div key={entry.year} className="rounded-3xl border border-slate-200/80 bg-white/60 p-6">
                <dt className="text-sm font-semibold uppercase tracking-wide text-brand-dark">{entry.year}</dt>
                <dd className="mt-3 text-sm text-slate-600">{entry.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
