"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const CreateWorkoutSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  difficulty: z.enum(["recruit", "soldier", "spec-ops"]),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  description: z.string().optional(),
});

export async function createWorkout(
  prevState: { error?: string } | null,
  formData: FormData
) {
  // Validate inputs using Zod
  const rawData = {
    title: formData.get("title"),
    difficulty: formData.get("difficulty"),
    duration: formData.get("duration"),
    description: formData.get("description"),
  };

  const validation = CreateWorkoutSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.errors.map((e) => e.message).join(", "),
    };
  }

  const supabase = await createClient();

  // Get current User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Authentication required. Please log in again." };
  }

  // Insert data into workouts table
  const { error: insertError } = await supabase.from("workouts").insert({
    title: validation.data.title,
    difficulty: validation.data.difficulty,
    duration_minutes: validation.data.duration,
    description: validation.data.description || null,
    user_id: user.id,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  // Success: Revalidate and redirect
  revalidatePath("/dashboard/training");
  redirect("/dashboard/training");
}

export async function deleteWorkout(id: string) {
  const supabase = await createClient();

  // Get current User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Authentication required. Please log in again.");
  }

  // Delete workout (only if it belongs to the user)
  const { error: deleteError } = await supabase
    .from("workouts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // Revalidate both dashboard and training pages
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/training");
}

