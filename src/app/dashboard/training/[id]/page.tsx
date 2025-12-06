import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MissionControl } from "@/components/dashboard/training/mission-control";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch workout
  const { data: workout, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !workout) {
    redirect("/dashboard/training");
  }

  return <MissionControl workout={workout} />;
}

