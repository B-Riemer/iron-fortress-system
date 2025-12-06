"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MarketingNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-sm bg-zinc-950/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Left: Logo */}
        <Link
          href="/"
          className="font-mono text-lg font-bold uppercase tracking-tighter text-zinc-200 transition-colors hover:text-emerald-500"
        >
          IRON FORTRESS
        </Link>

        {/* Right: Login Button */}
        <Link
          href="/login"
          className="font-mono text-sm font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:text-emerald-500"
        >
          LOGIN
        </Link>
      </div>
    </nav>
  );
}

