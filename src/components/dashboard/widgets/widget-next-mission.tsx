import { Clock, Plus } from "lucide-react";
import Link from "next/link";
import type { Workout } from "@/lib/types/workout";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

interface WidgetNextMissionProps {
  workout: Workout | null;
}

const difficultyColors = {
  recruit: "bg-zinc-700 text-zinc-200 border-zinc-600",
  soldier: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  "spec-ops": "bg-red-500/20 text-red-500 border-red-500/50",
};

const difficultyLabels = {
  recruit: "RECRUIT",
  soldier: "SOLDIER",
  "spec-ops": "SPEC-OPS",
};

export function WidgetNextMission({ workout }: WidgetNextMissionProps) {
  if (!workout) {
    return (
      <DashboardCard>
        <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
          NEXT MISSION
        </h3>
        <div className="space-y-4">
          <p className="font-mono text-lg font-bold text-zinc-100">
            NO ASSIGNMENT
          </p>
          <Link
            href="/dashboard/training/new"
            className="inline-flex items-center gap-2 rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500 transition-colors hover:bg-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
        </div>
      </DashboardCard>
    );
  }

  return (
    <Link href="/dashboard/training" className="group block">
      <DashboardCard className="hover:border-emerald-500/50">
        <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
          NEXT MISSION
        </h3>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <p className="font-mono text-lg font-bold text-zinc-100 group-hover:text-emerald-500 transition-colors">
              {workout.title}
            </p>
            <span
              className={cn(
                "rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider whitespace-nowrap",
                difficultyColors[workout.difficulty]
              )}
            >
              {difficultyLabels[workout.difficulty]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">
              {workout.duration_minutes} min
            </span>
          </div>
        </div>
      </DashboardCard>
    </Link>
  );
}

