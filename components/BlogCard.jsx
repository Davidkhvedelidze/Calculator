import Image from "next/image";
import Link from "next/link";

export function BlogCard({ post }) {
  return (
    <article className="card flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 400px, 100vw"
        />
      </div>
      <span className="badge w-fit">{post.category}</span>
      <h3 className="text-xl font-semibold   dark:text-slate-100">
        {post.title}
      </h3>
      <p className="text-sm   dark:text-slate-300">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>{post.date}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="font-semibold text-brand-dark hover:text-brand dark:text-brand-light dark:hover:text-brand transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
