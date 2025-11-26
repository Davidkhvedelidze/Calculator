"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

interface TopbarProps {
  userName?: string;
}

export function Topbar({ userName = "Concierge" }: TopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-white/80 px-6 py-4 shadow-soft dark:bg-surface-muted">
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-text-secondary">Operations Center</p>
        <h1 className="text-xl font-semibold text-text-primary">Bespoke Travel Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{userName}</span>
        <Link href="/" className="text-sm text-brand-700 underline-offset-4 hover:underline">
          Back to site
        </Link>
        <Button variant="secondary">Logout</Button>
      </div>
    </header>
  );
}
