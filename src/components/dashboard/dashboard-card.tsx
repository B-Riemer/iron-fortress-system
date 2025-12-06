"use client";

import { cn } from "@/lib/utils";
import { useSoundFx } from "@/hooks/use-sound-fx";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ children, className }: DashboardCardProps) {
  const { playHover } = useSoundFx();

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-sm p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)]",
        className
      )}
      onMouseEnter={playHover}
    >
      {children}
    </div>
  );
}

