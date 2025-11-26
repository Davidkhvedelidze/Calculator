"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/tours", label: "Tours" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full rounded-2xl border border-border-subtle bg-white/80 p-4 shadow-soft dark:bg-surface-muted">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.12em] text-text-secondary">Navigation</p>
      </div>
      <nav className="flex flex-col gap-2 text-sm font-semibold">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-xl px-3 py-2 transition hover:bg-brand-50",
              pathname === link.href && "bg-brand-50 text-brand-700"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
