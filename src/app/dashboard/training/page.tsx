import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { WorkoutGrid } from "@/components/dashboard/workout-grid";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { Container } from "@/components/ui/layout/container";
import { Target } from "lucide-react";
import type { Workout } from "@/lib/types/workout";

export default async function TrainingPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Container>
        <p className="text-zinc-500">Please log in to view workouts.</p>
      </Container>
    );
  }

  // Read simulated tier from cookie (for testing)
  const cookieStore = await cookies();
  const cookieSimulatedTier = cookieStore.get("simulated_tier")?.value;

  // Fetch real tier from profiles table
  let dbProfileTier: "recruit" | "operator" | "shadow" | null = null;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (!profileError && profile) {
    dbProfileTier = profile.tier as "recruit" | "operator" | "shadow" | null;
  }

  // Priority: Simulator > DB Profile > Default to 'recruit'
  const effectiveTier = cookieSimulatedTier || dbProfileTier || "recruit";

  // Define tier values
  const TIERS = {
    recruit: 0,
    operator: 1,
    shadow: 2,
  } as const;

  // Fetch workouts: user's own workouts OR global workouts
  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*, workout_logs(created_at)")
    .or(`user_id.eq.${user.id},is_global.eq.true`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching workouts:", error);
  }

  // Process workouts to extract most recent log date and calculate locked status
  const workoutList = ((workouts as any[]) || []).map((workout) => {
    // Extract most recent log date
    let lastRun: string | null = null;
    
    if (workout.workout_logs && Array.isArray(workout.workout_logs) && workout.workout_logs.length > 0) {
      // Sort logs by created_at descending and get the most recent
      const sortedLogs = [...workout.workout_logs].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      lastRun = sortedLogs[0].created_at;
    }

    // Calculate locked status based on effective tier
    const userLevel = TIERS[effectiveTier as keyof typeof TIERS] || 0;
    const requiredLevel = workout.required_tier
      ? TIERS[workout.required_tier as keyof typeof TIERS] || 0
      : 0;
    const isLocked = userLevel < requiredLevel;

    return {
      ...workout,
      lastRun,
      isLocked,
    };
  }).sort((a, b) => {
    // Helper function to get workout order (case-insensitive, partial match)
    const getWorkoutOrder = (title: string | null | undefined): number => {
      if (!title) return 999;
      const titleLower = title.toLowerCase();
      
      if (titleLower.includes("power pilates")) return 1;
      if (titleLower.includes("around the world")) return 2;
      if (titleLower.includes("hell workout") || titleLower.includes("hell week")) return 3;
      if (titleLower.includes("black ops") || titleLower.includes("classified")) return 4;
      
      return 999; // Not in explicit list
    };
    
    const aOrder = getWorkoutOrder(a.title);
    const bOrder = getWorkoutOrder(b.title);
    
    // If both are in explicit order list, use that order
    if (aOrder !== 999 && bOrder !== 999) {
      return aOrder - bOrder;
    }
    
    // If only one is in explicit list, prioritize it
    if (aOrder !== 999) return -1;
    if (bOrder !== 999) return 1;
    
    // Sort by required_tier: lower tier first, higher tier last (Black Ops/Classified goes to end)
    const aTier = a.required_tier ? TIERS[a.required_tier as keyof typeof TIERS] || 0 : 0;
    const bTier = b.required_tier ? TIERS[b.required_tier as keyof typeof TIERS] || 0 : 0;
    
    if (aTier !== bTier) {
      return aTier - bTier; // Lower tier first (0 = recruit, 1 = operator, 2 = shadow)
    }
    
    // Same tier, sort alphabetically by title
    return (a.title || "").localeCompare(b.title || "");
  });

  return (
    <Container>
      {/* Top Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200">
          ACTIVE OPERATIONS
        </h1>
        <ButtonPrimary href="/dashboard/training/new" as="link">
          CREATE PROTOCOL
        </ButtonPrimary>
      </div>

      {/* Content */}
      {workoutList.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <div className="mb-4 rounded-sm bg-zinc-800 p-4">
            <Target className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-500">
            NO ACTIVE MISSIONS
          </p>
          <p className="mt-2 font-sans text-sm text-zinc-600">
            Initiate protocol to begin training operations.
          </p>
        </div>
      ) : (
        <WorkoutGrid workouts={workoutList} />
      )}
    </Container>
  );
}
