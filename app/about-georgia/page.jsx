import Image from "next/image";
import Link from "next/link";
import { GeorgiaGallery } from "@/components/GeorgiaGallery";

export const metadata = {
  title: "About Georgia | Must See Georgia",
  description:
    "Discover the rich history, culture, and natural beauty of Georgia - the birthplace of wine, home to ancient traditions, and a crossroads of civilizations.",
};

export default function AboutGeorgiaPage() {
  return (
    <section>
      <div className="container space-y-16">
        {/* Hero Section */}
        <div className="space-y-8">
          <div className="space-y-6">
            <span className="badge">Discover Georgia</span>
            <h1 className="text-5xl font-display font-semibold   dark:text-slate-100">
              The Cradle of Wine & Ancient Traditions
            </h1>
            <p className="max-w-3xl text-xl   dark:text-slate-300">
              Nestled between Europe and Asia, Georgia is a land where ancient
              traditions meet modern innovation. From the birthplace of wine to
              the highest peaks of the Caucasus, discover a country that has
              captivated travelers for millennia.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80"
              alt="Georgian landscape with mountains and traditional architecture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl font-semibold">Tbilisi Old Town</h2>
              <p className="text-white/80">The heart of Georgian culture</p>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Population",
              value: "3.7M",
              description: "Warm & welcoming people",
            },
            {
              label: "Capital",
              value: "Tbilisi",
              description: "Founded in 5th century",
            },
            {
              label: "Languages",
              value: "Georgian",
              description: "Unique alphabet & script",
            },
            {
              label: "Currency",
              value: "Lari (₾)",
              description: "Stable & modern economy",
            },
          ].map((fact) => (
            <div key={fact.label} className="card text-center">
              <div className="text-3xl font-bold text-brand-dark dark:text-brand-light">
                {fact.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {fact.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {fact.description}
              </div>
            </div>
          ))}
        </div>

        {/* Geography & Nature */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-semibold   dark:text-slate-100">
              Geography & Natural Wonders
            </h2>
            <p className="text-lg   dark:text-slate-300">
              Georgia's diverse landscape ranges from subtropical Black Sea
              coast to snow-capped Caucasus peaks, creating unique microclimates
              perfect for wine cultivation and adventure tourism.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80"
                  alt="Caucasus Mountains in Georgia"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold   dark:text-slate-100">
                  The Caucasus Mountains
                </h3>
                <p className="  dark:text-slate-300">
                  Home to Mount Kazbek (5,047m) and Shkhara (5,201m), the
                  Caucasus offers world-class hiking, mountaineering, and
                  breathtaking alpine scenery. The region is also famous for its
                  ancient Svaneti towers and traditional mountain villages.
                </p>
                <ul className="space-y-2 text-sm   dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    UNESCO World Heritage Svaneti region
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    Highest permanent settlements in Europe
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    Unique flora and fauna
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80"
                  alt="Georgian wine region"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold   dark:text-slate-100">
                  Wine Country
                </h3>
                <p className="  dark:text-slate-300">
                  Kakheti region is the heart of Georgian winemaking, where
                  8,000-year-old qvevri (clay vessel) traditions continue today.
                  The unique terroir and ancient techniques produce wines unlike
                  anywhere else.
                </p>
                <ul className="space-y-2 text-sm   dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    Birthplace of wine (8,000 years)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    UNESCO Intangible Heritage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">•</span>
                    500+ indigenous grape varieties
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* History & Culture */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-semibold   dark:text-slate-100">
              Rich History & Vibrant Culture
            </h2>
            <p className="text-lg   dark:text-slate-300">
              Georgia's strategic location at the crossroads of Europe and Asia
              has created a unique cultural tapestry, blending Eastern and
              Western influences while maintaining its distinct identity.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1541849549-216549ae2161?auto=format&fit=crop&w=1200&q=80"
                  alt="Ancient Georgian architecture"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold   dark:text-slate-100">
                Ancient Heritage
              </h3>
              <p className="text-sm   dark:text-slate-300">
                From the ancient kingdom of Colchis to the medieval Georgian
                Golden Age, discover architectural marvels and archaeological
                treasures.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                  alt="Georgian traditional dance"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold   dark:text-slate-100">
                Living Traditions
              </h3>
              <p className="text-sm   dark:text-slate-300">
                Polyphonic singing, traditional dance, and the art of supra
                (feast) continue to thrive in modern Georgia.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="Georgian cuisine"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold   dark:text-slate-100">
                Culinary Excellence
              </h3>
              <p className="text-sm   dark:text-slate-300">
                Khachapuri, khinkali, and unique cooking methods create one of
                the world's most distinctive and delicious cuisines.
              </p>
            </div>
          </div>
        </div>

        {/* Modern Georgia */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-semibold   dark:text-slate-100">
              Modern Georgia
            </h2>
            <p className="text-lg   dark:text-slate-300">
              Today's Georgia seamlessly blends ancient traditions with
              contemporary innovation, creating a dynamic society that honors
              its past while embracing the future.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold   dark:text-slate-100">
                Innovation & Technology
              </h3>
              <p className="  dark:text-slate-300">
                Tbilisi has emerged as a regional tech hub, with a thriving
                startup scene and world-class IT infrastructure. The country is
                also investing heavily in sustainable tourism and green energy
                initiatives.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card">
                  <div className="text-2xl font-bold text-brand-dark dark:text-brand-light">
                    #1
                  </div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Ease of Doing Business
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    in the region
                  </div>
                </div>
                <div className="card">
                  <div className="text-2xl font-bold text-brand-dark dark:text-brand-light">
                    95%
                  </div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Literacy Rate
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    highest in region
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold   dark:text-slate-100">
                Tourism & Hospitality
              </h3>
              <p className="  dark:text-slate-300">
                Georgia welcomes visitors with legendary hospitality. From
                luxury resorts to traditional guesthouses, the country offers
                authentic experiences that showcase its rich culture and natural
                beauty.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand"></div>
                  <span className="text-sm   dark:text-slate-300">
                    Visa-free travel for 95+ countries
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand"></div>
                  <span className="text-sm   dark:text-slate-300">
                    Safe and welcoming environment
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand"></div>
                  <span className="text-sm   dark:text-slate-300">
                    English widely spoken in tourism
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <GeorgiaGallery />

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-brand/10 to-brand-light/10 dark:from-brand/20 dark:to-brand-light/20">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-display font-semibold   dark:text-slate-100">
              Ready to Discover Georgia?
            </h2>
            <p className="text-lg   dark:text-slate-300">
              Let us craft your perfect Georgian adventure, from ancient wine
              cellars to mountain peaks.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/tours" className="btn-primary">
                Explore Our Tours
              </Link>
              <Link href="/contact" className="btn-secondary">
                Plan Custom Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
