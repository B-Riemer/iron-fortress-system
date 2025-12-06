"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/training", label: "Operations", icon: Dumbbell },
  { href: "/dashboard/intel", label: "Intel", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    }
    getUser();
  }, []);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = user?.email === adminEmail;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-4 backdrop-blur-md md:hidden">
        {/* Logo */}
        <Link href="/" className="font-mono text-lg font-bold uppercase tracking-wider text-zinc-200">
          IRON FORTRESS
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 transition-colors hover:text-emerald-500"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-zinc-950 border-r border-white/5 pt-20 px-6 overflow-y-auto"
            >
              <nav className="flex flex-col gap-2 py-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 rounded-sm px-4 py-3 font-mono text-sm font-semibold uppercase tracking-wider transition-colors",
                        isActive
                          ? "bg-zinc-900 text-emerald-500"
                          : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Admin Link - Only visible to admins */}
                {!isLoading && isAdmin && (
                  <Link
                    href="/admin"
                    onClick={handleLinkClick}
                    className={cn(
                      "mt-4 flex items-center gap-3 rounded-sm border border-red-500/20 bg-red-500/10 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20 hover:text-red-400",
                      pathname === "/admin" && "border-red-500/50 bg-red-500/20"
                    )}
                  >
                    <ShieldAlert className="h-5 w-5" />
                    <span>COMMAND BRIDGE</span>
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

