"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function TierSwitcher() {
  const [currentTier, setCurrentTier] = useState<"recruit" | "operator" | "shadow">("recruit");
  const router = useRouter();

  useEffect(() => {
    // Read current cookie value on mount
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("simulated_tier="))
      ?.split("=")[1];

    if (cookieValue === "recruit" || cookieValue === "operator" || cookieValue === "shadow") {
      setCurrentTier(cookieValue);
    }
  }, []);

  const setTier = (tier: "recruit" | "operator" | "shadow") => {
    // Set cookie with 30 days expiration
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `simulated_tier=${tier}; expires=${expirationDate.toUTCString()}; path=/`;

    setCurrentTier(tier);
    router.refresh();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-sm border border-emerald-500/50 bg-black/90 backdrop-blur-sm p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            SIMULATION MODE:
          </span>
          <button
            onClick={() => setTier("recruit")}
            className={cn(
              "rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
              currentTier === "recruit"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                : "border-zinc-700 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
            )}
          >
            RECRUIT
          </button>
          <button
            onClick={() => setTier("operator")}
            className={cn(
              "rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
              currentTier === "operator"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                : "border-zinc-700 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
            )}
          >
            OPERATOR
          </button>
          <button
            onClick={() => setTier("shadow")}
            className={cn(
              "rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
              currentTier === "shadow"
                ? "border-purple-500 bg-purple-500/20 text-purple-500"
                : "border-zinc-700 bg-zinc-900/50 text-zinc-500 hover:border-purple-600 hover:text-purple-400"
            )}
          >
            SHADOW
          </button>
        </div>
      </div>
    </div>
  );
}

