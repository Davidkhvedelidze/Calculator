import Link from "next/link";
import { BrandMark } from "./BrandMark";

const quickLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/tours", label: "Signature Tours" },
  { href: "/blog", label: "Travel Journal" },
  { href: "/contact", label: "Contact" },
];

const policies = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70">
      <div className="container grid gap-12 py-14 lg:grid-cols-[1.5fr,1fr,1fr]">
        <div className="space-y-4">
          <BrandMark className="text-brand-dark" />
          <p className="max-w-sm text-sm  ">
            Must See Georgia designs immersive journeys that celebrate local
            culture, cuisine, and the dramatic landscapes of the Caucasus.
            Travel responsibly with our expert curators.
          </p>
          <div className="flex gap-3 text-sm text-slate-500">
            <span>© {new Date().getFullYear()} Must See Georgia.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-brand-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Stay in touch
          </h3>
          <p className="mt-4 text-sm  ">
            Join our newsletter for fresh itineraries, seasonal offers, and
            cultural stories.
          </p>
          <form className="mt-4 flex gap-3">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none"
            />
            <button type="submit" className="btn-primary text-sm">
              Join
            </button>
          </form>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {policies.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition hover:text-brand-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
