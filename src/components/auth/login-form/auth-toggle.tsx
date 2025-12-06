"use client";

import { cn } from "@/lib/utils";

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: (value: boolean) => void;
}

export function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
  return (
    <div className="mb-6 flex gap-2 rounded-sm border border-zinc-800 bg-zinc-950 p-1">
      <button
        type="button"
        onClick={() => onToggle(true)}
        className={cn(
          "flex-1 rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
          isLogin
            ? "text-white border-b-2 border-emerald-500"
            : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onToggle(false)}
        className={cn(
          "flex-1 rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
          !isLogin
            ? "text-white border-b-2 border-emerald-500"
            : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        Sign Up
      </button>
    </div>
  );
}

