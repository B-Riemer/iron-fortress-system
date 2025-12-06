"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import type { Workout } from "@/lib/types/workout";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { cn } from "@/lib/utils";
import { logWorkout } from "@/app/dashboard/training/log-action";
import { useSoundFx } from "@/hooks/use-sound-fx";

// Dummy exercises data (in production, this would come from the database)
const dummyExercises = [
  {
    id: "1",
    name: "Deadlifts",
    target: "3 Sets x 5 Reps",
    sets: [
      { id: "1", weight: 0, reps: 0, completed: false },
      { id: "2", weight: 0, reps: 0, completed: false },
      { id: "3", weight: 0, reps: 0, completed: false },
    ],
  },
  {
    id: "2",
    name: "Overhead Press",
    target: "3 Sets x 8 Reps",
    sets: [
      { id: "1", weight: 0, reps: 0, completed: false },
      { id: "2", weight: 0, reps: 0, completed: false },
      { id: "3", weight: 0, reps: 0, completed: false },
    ],
  },
  {
    id: "3",
    name: "Pull-ups",
    target: "3 Sets x 10 Reps",
    sets: [
      { id: "1", weight: 0, reps: 0, completed: false },
      { id: "2", weight: 0, reps: 0, completed: false },
      { id: "3", weight: 0, reps: 0, completed: false },
    ],
  },
];

interface MissionControlProps {
  workout: Workout;
}

export function MissionControl({ workout }: MissionControlProps) {
  const router = useRouter();
  const { playSuccess } = useSoundFx();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [exercises, setExercises] = useState(dummyExercises);
  const [isCompleting, setIsCompleting] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSetComplete = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, completed: !set.completed } : set
              ),
            }
          : exercise
      )
    );
  };

  const handleWeightChange = (
    exerciseId: string,
    setId: string,
    value: string
  ) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, weight: Number(value) || 0 } : set
              ),
            }
          : exercise
      )
    );
  };

  const handleRepsChange = (
    exerciseId: string,
    setId: string,
    value: string
  ) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, reps: Number(value) || 0 } : set
              ),
            }
          : exercise
      )
    );
  };

  const handleCompleteMission = async () => {
    setIsCompleting(true);
    setIsRunning(false);

    // Calculate duration in minutes
    const durationMinutes = Math.ceil(timer / 60);

    // Log the workout
    const result = await logWorkout({
      workout_id: workout.id,
      duration: durationMinutes,
      rating: 5, // Default rating, could be made configurable
      notes: `Completed ${exercises.length} exercises`,
    });

    if (result.success) {
      playSuccess();
      router.push("/dashboard/training");
    } else {
      setIsCompleting(false);
      alert(result.error || "Failed to complete mission");
    }
  };

  const allSetsCompleted = exercises.every((exercise) =>
    exercise.sets.every((set) => set.completed)
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Left: Back Button + Mission Name */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-zinc-200">
                {workout.title}
              </h1>
              <p className="font-mono text-xs text-zinc-500 uppercase">
                MISSION CONTROL
              </p>
            </div>
          </div>

          {/* Right: Timer */}
          <div className="font-mono text-xl font-bold text-emerald-500">
            {formatTime(timer)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto flex-1 px-4 py-8 pb-32">
        <div className="space-y-6">
          {exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.id}
              className="rounded-sm border border-white/5 bg-zinc-900/50 p-6"
            >
              {/* Exercise Header */}
              <div className="mb-4">
                <h2 className="font-sans text-xl font-bold text-zinc-100">
                  {exercise.name}
                </h2>
                <p className="font-mono text-sm text-zinc-400 uppercase tracking-wider">
                  TARGET: {exercise.target}
                </p>
              </div>

              {/* Sets Table */}
              <div className="space-y-3">
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={set.id}
                    className={cn(
                      "grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center rounded-sm border p-4 transition-all",
                      set.completed
                        ? "border-emerald-500/50 bg-emerald-500/5"
                        : "border-white/5 bg-zinc-950/50"
                    )}
                  >
                    {/* Set Number */}
                    <span className="font-mono text-sm font-semibold text-zinc-400">
                      SET {setIndex + 1}
                    </span>

                    {/* Weight Input */}
                    <div>
                      <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        WEIGHT (KG)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={set.weight || ""}
                        onChange={(e) =>
                          handleWeightChange(exercise.id, set.id, e.target.value)
                        }
                        disabled={set.completed}
                        className="w-full min-h-[44px] rounded-sm border border-white/10 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="0"
                      />
                    </div>

                    {/* Reps Input */}
                    <div>
                      <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        REPS
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={set.reps || ""}
                        onChange={(e) =>
                          handleRepsChange(exercise.id, set.id, e.target.value)
                        }
                        disabled={set.completed}
                        className="w-full min-h-[44px] rounded-sm border border-white/10 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="0"
                      />
                    </div>

                    {/* Complete Checkbox */}
                    <button
                      onClick={() => handleSetComplete(exercise.id, set.id)}
                      className={cn(
                        "flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border transition-all",
                        set.completed
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                          : "border-white/10 bg-zinc-900 text-zinc-400 hover:border-emerald-500/50"
                      )}
                    >
                      {set.completed && <Check className="h-5 w-5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-zinc-950/80 backdrop-blur-xl p-4">
        <div className="container mx-auto">
          <ButtonPrimary
            as="button"
            onClick={handleCompleteMission}
            disabled={isCompleting || !allSetsCompleted}
            className="w-full min-h-[56px] font-mono text-base uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompleting ? "PROCESSING..." : "COMPLETE MISSION"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

