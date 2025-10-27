import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Must See Georgia Travel Journal',
  description: 'Insights, stories, and inspiration from the Must See Georgia curator team.'
};

export default function BlogPage() {
  return (
    <section>
      <div className="container space-y-12">
        <div className="space-y-4">
          <span className="badge">Travel journal</span>
          <h1 className="text-4xl font-display font-semibold text-slate-900">Dispatches from our curator team</h1>
          <p className="max-w-2xl text-base text-slate-600">
            Explore seasonal itineraries, culinary trends, and design-forward stays curated by Must See Georgia. Each story is a
            glimpse into how we shape bespoke journeys.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} id={post.slug} className="card space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 400px, 100vw" />
              </div>
              <span className="badge w-fit">{post.category}</span>
              <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
              <p className="text-sm text-slate-600">{post.content}</p>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{post.date}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
