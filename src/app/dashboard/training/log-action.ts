"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const LogWorkoutSchema = z.object({
  workout_id: z.string().min(1, "Workout ID is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
});

export type LogWorkoutInput = {
  workout_id: string;
  duration: number;
  rating: number;
  notes?: string;
};

export async function logWorkout(data: LogWorkoutInput) {
  // Validate inputs using Zod
  const validation = LogWorkoutSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: validation.error.errors.map((e) => e.message).join(", "),
    };
  }

  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Authentication required. Please log in again." };
  }

  // Insert into workout_logs table
  // CRITICAL: Map duration to duration_minutes (DB column name)
  const { error: insertError } = await supabase.from("workout_logs").insert({
    workout_id: validation.data.workout_id,
    user_id: user.id,
    duration_minutes: validation.data.duration, // Map to correct DB column
    notes: validation.data.notes ?? null,
    rating: validation.data.rating,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  // Revalidate dashboard to update potential stats
  revalidatePath("/dashboard");

  return { success: true };
}

