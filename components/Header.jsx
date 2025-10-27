'use client';

import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { BrandMark } from './BrandMark';
import { closeMobileNav, toggleMobileNav, uiState } from '@/store';

const links = [
  { href: '/about', label: 'About' },
  { href: '/tours', label: 'Tours' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const snap = useSnapshot(uiState);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <BrandMark className="shrink-0" priority />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-dark">
              {link.label}
            </Link>
          ))}
          <Link href="/tours" className="btn-primary text-sm">
            Plan a Journey
          </Link>
        </nav>
        <button
          type="button"
          onClick={toggleMobileNav}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-brand hover:text-brand lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={snap.mobileNavOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d={snap.mobileNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </div>
      {snap.mobileNavOpen && (
        <div className="border-t border-slate-200/80 bg-white lg:hidden">
          <div className="container flex flex-col gap-2 py-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileNav}
                className="rounded-full px-4 py-2 text-base font-semibold text-slate-700 transition hover:bg-brand/10 hover:text-brand-dark"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tours"
              onClick={closeMobileNav}
              className="btn-primary text-center text-base"
            >
              Plan a Journey
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
