"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, ShieldAlert } from "lucide-react";
import { signOut } from "@/app/(auth)/login/actions";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function SidebarUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="mb-4 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-500/20">
          <span className="font-mono text-sm font-bold text-emerald-500">
            OP
          </span>
        </div>
        <div className="flex-1">
          <p className="font-mono text-xs font-semibold uppercase text-zinc-200">
            Operator
          </p>
          <p className="font-sans text-xs text-zinc-500">Active</p>
        </div>
      </div>

      {/* Admin Link - Only visible to admins */}
      {!isLoading && isAdmin && (
        <Link
          href="/admin"
          className="mb-4 flex w-full items-center gap-2 rounded-sm border border-red-500/20 bg-red-500/10 px-2 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>COMMAND BRIDGE</span>
        </Link>
      )}

      {/* Logout Button */}
      <form action={signOut}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-sm border border-zinc-800 bg-zinc-900/50 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </form>
    </div>
  );
}

