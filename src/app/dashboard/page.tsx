import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { WidgetNextMission } from "@/components/dashboard/widgets/widget-next-mission";
import { MissionHistory } from "@/components/dashboard/mission-history";
import type { Workout } from "@/lib/types/workout";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch the most recent workout
  const { data: latestWorkout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (workoutError) {
    console.error("Error fetching latest workout:", workoutError);
  }

  // Fetch workout logs for the last 30 days (to ensure we have data for the last 7 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { data: logs, error: logsError } = await supabase
    .from("workout_logs")
    .select("*, workouts ( title )")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  if (logsError) {
    console.error("Error fetching workout logs:", logsError);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Weekly Activity Chart */}
        <ActivityChart logs={logs} />

        {/* Card 2: Next Mission */}
        <WidgetNextMission workout={latestWorkout as Workout | null} />

        {/* Card 3: Mission Log - CRITICAL: Real data, not static text */}
        <MissionHistory logs={logs} />
      </div>
    </div>
  );
}
