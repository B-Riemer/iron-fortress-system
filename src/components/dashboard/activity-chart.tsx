"use client";

import { useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

interface WorkoutLog {
  id: string;
  created_at: string;
  rating: number;
  notes: string | null;
  workouts?: {
    title: string;
  } | null | {
    title: string;
  }[];
}

interface ActivityChartProps {
  logs: WorkoutLog[] | null;
}

// Helper to format date as YYYY-MM-DD for comparison
function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper to get short day name
function getShortDayName(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

export function ActivityChart({ logs }: ActivityChartProps) {
  // Generate array of last 7 days (6 days ago to today)
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0); // Normalize to start of day
      d.setDate(d.getDate() - (6 - i)); // 6 days ago to today
      return d;
    });
  }, []);

  // Count logs per day using YYYY-MM-DD string comparison
  const counts = useMemo(() => {
    if (!logs || logs.length === 0) {
      return Array(7).fill(0);
    }

    return days.map((day) => {
      const dayString = formatDateString(day);
      return logs.filter((log) => {
        const logDate = new Date(log.created_at);
        logDate.setHours(0, 0, 0, 0); // Normalize to start of day
        const logDateString = formatDateString(logDate);
        return logDateString === dayString;
      }).length;
    });
  }, [logs, days]);

  // Find max count for proportional scaling
  const maxCount = useMemo(() => {
    return Math.max(...counts, 1);
  }, [counts]);

  return (
    <DashboardCard>
      <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
        WEEKLY ACTIVITY
      </h3>

      <div className="flex items-end justify-between gap-2 h-32">
        {counts.map((count, index) => {
          const height = maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%";
          const isActive = count > 0;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
              title={`${count} workout${count !== 1 ? "s" : ""} on ${getShortDayName(days[index])}`}
            >
              {/* Bar */}
              <div
                className={`w-full rounded-sm transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    : "bg-white/5"
                }`}
                style={{ height, minHeight: isActive ? "4px" : "0px" }}
              />

              {/* Label */}
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                {getShortDayName(days[index])}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
