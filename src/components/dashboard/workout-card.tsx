"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import type { Workout } from "@/lib/types/workout";
import { cn } from "@/lib/utils";
import { DeleteWorkoutButton } from "./delete-workout-button";
import { UpgradeModal } from "@/components/ui/upgrade-modal";

interface WorkoutCardProps {
  workout: Workout;
  lastRun?: string | null;
  isLocked?: boolean;
}

function formatLastRunDate(dateString: string | null | undefined): string {
  if (!dateString) return "STATUS: PENDING";
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `LAST RUN: ${day}.${month}`;
}

const difficultyStyles = {
  recruit: "bg-zinc-700 text-zinc-200 border-zinc-600",
  soldier: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  "spec-ops": "bg-red-500/20 text-red-500 border-red-500/50",
};

const difficultyLabels = {
  recruit: "RECRUIT",
  soldier: "SOLDIER",
  "spec-ops": "SPEC-OPS",
};

export function WorkoutCard({ workout, lastRun, isLocked = false }: WorkoutCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const baseClassName = cn(
    "group relative block bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-sm p-4 transition-all duration-300",
    isLocked
      ? "opacity-75 cursor-not-allowed"
      : "hover:border-emerald-500/30 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)] hover:scale-[1.02] cursor-pointer"
  );

  const cardContent = (
    <div className={baseClassName} onClick={isLocked ? handleClick : undefined}>
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[1px] rounded-sm">
          <div className="flex flex-col items-center gap-2">
            <Lock className="h-12 w-12 text-red-500" />
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-red-500">
              RESTRICTED ACCESS
            </span>
          </div>
        </div>
      )}

      {/* Content - Blurred when locked */}
      <div className={cn(isLocked && "grayscale blur-[2px]")}>
        {/* Delete Button - Top Right (only for non-global workouts) */}
        {!workout.is_global && (
          <div
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 z-10"
            onClick={(e) => e.preventDefault()}
          >
            <DeleteWorkoutButton workoutId={workout.id} />
          </div>
        )}

        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-2 pr-6">
          <h3 className="font-sans text-lg font-bold text-zinc-100">
            {workout.title}
          </h3>
          <div className="flex flex-col items-end gap-2">
            <span
              className={cn(
                "rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider whitespace-nowrap",
                difficultyStyles[workout.difficulty]
              )}
            >
              {difficultyLabels[workout.difficulty]}
            </span>
            {/* Official Protocol Badge */}
            {workout.is_global && (
              <span className="rounded-sm border border-yellow-500/50 bg-yellow-500/20 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-yellow-500 whitespace-nowrap">
                OFFICIAL PROTOCOL
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {workout.description && (
          <p className="mb-3 font-sans text-sm text-zinc-400 line-clamp-2">
            {workout.description}
          </p>
        )}

        {/* Duration Badge */}
        <div className="mb-3 flex items-center gap-2 text-zinc-400">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-sm font-semibold">
            {workout.duration_minutes} min
          </span>
        </div>

        {/* Last Run Badge */}
        <div className="mb-4">
          <p
            className={cn(
              "text-xs font-mono",
              lastRun
                ? "text-emerald-500/80"
                : "text-zinc-500"
            )}
          >
            {formatLastRunDate(lastRun)}
          </p>
        </div>

        {/* Initiate Button */}
        <button
          className={cn(
            "mt-4 w-full rounded-sm border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
            isLocked
              ? "border-zinc-800 bg-zinc-900/50 text-zinc-600 cursor-not-allowed"
              : "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            if (isLocked) {
              setIsModalOpen(true);
            }
          }}
          disabled={isLocked}
        >
          {isLocked ? "LOCKED" : "INITIATE"}
        </button>
      </div>
    </div>
  );

  // If locked, render as div
  if (isLocked) {
    return (
      <>
        {cardContent}
        <UpgradeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          level={2}
        />
      </>
    );
  }

  // Normal state - wrap in Link
  return (
    <Link href={`/dashboard/training/${workout.id}`} className="block">
      {cardContent}
    </Link>
  );
}
