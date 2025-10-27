import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export function BrandMark({ className, priority = false }) {
  return (
    <Link href="/" className={clsx('flex items-center gap-3', className)}>
      <div className="relative h-12 w-12 overflow-hidden rounded-2xl">
        <Image src="/logo.svg" alt="Must See Georgia" fill priority={priority} sizes="48px" />
      </div>
      <div className="flex flex-col leading-none text-brand-dark">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Must See</span>
        <span className="text-xl font-display font-bold text-brand-dark">Georgia</span>
      </div>
    </Link>
  );
}
