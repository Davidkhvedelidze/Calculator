import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { BrandMark } from "@/components/BrandMark";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Must See Georgia`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-sunrise">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="badge">{post.category}</span>
            <h1 className="text-4xl font-display font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="font-semibold uppercase tracking-wide">
                {post.date}
              </span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-slate max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <div className="text-xl text-slate-600 leading-relaxed">
                  {post.content}
                </div>

                {/* Main Content - This would be expanded content */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-display font-semibold text-slate-900">
                    The Experience
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {post.slug === "chef-guided-supra-rituals" &&
                      "Our culinary journey begins in the heart of Kakheti, where ancient traditions meet modern gastronomy. The supra, Georgia's traditional feast, becomes a transformative experience when guided by master chefs who understand both the cultural significance and contemporary appeal of these sacred gatherings."}
                    {post.slug === "winter-wellness-in-borjomi" &&
                      "Borjomi's mineral-rich waters and pristine mountain air create the perfect sanctuary for winter wellness. Our carefully curated program combines traditional Georgian healing practices with modern wellness techniques, offering a holistic approach to seasonal renewal."}
                    {post.slug === "svaneti-stargazing" &&
                      "High in the Caucasus Mountains, Svaneti offers some of the clearest night skies in the world. Our stargazing expeditions combine scientific knowledge with local folklore, creating an unforgettable experience that connects you to both the cosmos and Georgian culture."}
                  </p>
                  <h3 className="text-2xl font-display font-semibold text-slate-900">
                    What Makes It Special
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {post.slug === "chef-guided-supra-rituals" &&
                      "Each supra is carefully orchestrated to balance tradition with innovation. Our chef partners have spent years studying with local tamadas, learning not just the rituals but the deeper meaning behind each toast, each dish, each moment of connection around the table."}
                    {post.slug === "winter-wellness-in-borjomi" &&
                      "The combination of Borjomi's unique mineral composition and our expert wellness practitioners creates a program that addresses both physical and mental well-being. From forest bathing sessions to private spa treatments, every element is designed to restore and rejuvenate."}
                    {post.slug === "svaneti-stargazing" &&
                      "Our astronomy guides are not just scientists—they're storytellers who weave together celestial knowledge with Svan legends. As you gaze at the stars, you'll learn about both the science of the cosmos and the cultural significance of the night sky in Georgian tradition."}
                  </p>

                  <h3 className="text-2xl font-display font-semibold text-slate-900">
                    Practical Details
                  </h3>
                  <div className="bg-slate-50 rounded-3xl p-8 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Duration
                        </h4>
                        <p className="text-slate-600">
                          {post.slug === "chef-guided-supra-rituals" &&
                            "3-4 hours"}
                          {post.slug === "winter-wellness-in-borjomi" &&
                            "3-5 days"}
                          {post.slug === "svaneti-stargazing" && "2-3 hours"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Group Size
                        </h4>
                        <p className="text-slate-600">
                          {post.slug === "chef-guided-supra-rituals" &&
                            "8-12 guests"}
                          {post.slug === "winter-wellness-in-borjomi" &&
                            "4-8 guests"}
                          {post.slug === "svaneti-stargazing" && "6-10 guests"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Best Season
                        </h4>
                        <p className="text-slate-600">
                          {post.slug === "chef-guided-supra-rituals" &&
                            "Year-round"}
                          {post.slug === "winter-wellness-in-borjomi" &&
                            "December - March"}
                          {post.slug === "svaneti-stargazing" &&
                            "April - October"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Difficulty
                        </h4>
                        <p className="text-slate-600">
                          {post.slug === "chef-guided-supra-rituals" && "Easy"}
                          {post.slug === "winter-wellness-in-borjomi" &&
                            "Easy to Moderate"}
                          {post.slug === "svaneti-stargazing" && "Moderate"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-brand/5 rounded-3xl p-8 text-center space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-slate-900">
                    Ready to Experience This?
                  </h3>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    This experience is part of our curated itineraries. Contact
                    our team to include it in your personalized Georgian
                    journey.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/contact" className="btn-primary">
                      Plan Your Journey
                    </Link>
                    <Link href="/tours" className="btn-secondary">
                      View All Tours
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-slate-50/70">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-semibold text-slate-900 text-center mb-12">
              More Stories from Our Journal
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {blogPosts
                .filter((relatedPost) => relatedPost.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="card group hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="badge w-fit mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-brand-dark transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {relatedPost.date}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
