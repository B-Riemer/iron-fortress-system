"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/auth/admin";

const CreateGlobalWorkoutSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  difficulty: z.enum(["recruit", "soldier", "spec-ops"]),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  description: z.string().optional(),
});

export async function createGlobalWorkout(
  prevState: { error?: string } | null,
  formData: FormData
) {
  // Verify admin access
  await verifyAdmin();

  // Validate inputs using Zod
  const rawData = {
    title: formData.get("title"),
    difficulty: formData.get("difficulty"),
    duration: formData.get("duration"),
    description: formData.get("description"),
  };

  const validation = CreateGlobalWorkoutSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.errors.map((e) => e.message).join(", "),
    };
  }

  const supabase = await createClient();

  // Get current User (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Authentication required. Please log in again." };
  }

  // Insert data into workouts table with is_global = true
  const { error: insertError } = await supabase.from("workouts").insert({
    title: validation.data.title,
    difficulty: validation.data.difficulty,
    duration_minutes: validation.data.duration,
    description: validation.data.description || null,
    user_id: user.id,
    is_global: true,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  // Success: Revalidate and redirect
  revalidatePath("/admin/workouts");
  redirect("/admin/workouts");
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

const PublishIntelSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(["tactics", "nutrition", "mindset", "gear"]),
  summary: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  security_level: z.enum(["public", "member", "operator"]),
});

export async function publishIntel(
  prevState: { error?: string } | null,
  formData: FormData
) {
  // Verify admin access
  await verifyAdmin();

  // Extract form data
  const rawData = {
    title: formData.get("title"),
    category: formData.get("category"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    security_level: formData.get("security_level"),
  };

  // Validate inputs using Zod
  const validation = PublishIntelSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.errors.map((e) => e.message).join(", "),
    };
  }

  const supabase = await createClient();

  // Get current User (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Authentication required. Please log in again." };
  }

  // Generate slug from title
  let slug = generateSlug(validation.data.title);

  // Check if slug exists, append timestamp if it does
  const { data: existingArticle } = await supabase
    .from("articles")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingArticle) {
    // Append timestamp to make it unique
    slug = `${slug}-${Date.now()}`;
  }

  // Insert into articles table
  const { error: insertError } = await supabase.from("articles").insert({
    title: validation.data.title,
    slug,
    category: validation.data.category,
    summary: validation.data.summary || null,
    content: validation.data.content,
    security_level: validation.data.security_level,
    author_id: user.id,
  });

  if (insertError) {
    // Handle unique constraint violation
    if (insertError.code === "23505") {
      return {
        error:
          "An article with this title already exists. Please choose a different title.",
      };
    }
    return { error: insertError.message };
  }

  // Success: Revalidate and redirect
  revalidatePath("/admin/intel");
  revalidatePath("/dashboard/intel");
  redirect("/admin/intel");
}

export async function updateUserTier(
  userId: string,
  newTier: "recruit" | "operator" | "shadow"
) {
  // Verify admin access
  await verifyAdmin();

  const supabase = await createClient();

  // Get current user to verify admin email
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Authentication required. Please log in again." };
  }

  // Verify admin email
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (user.email !== adminEmail) {
    return { error: "Unauthorized. Admin access required." };
  }

  // Update profile tier
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ tier: newTier })
    .eq("id", userId);

  if (updateError) {
    return { error: updateError.message };
  }

  // Revalidate paths
  revalidatePath("/admin/users");
  revalidatePath("/dashboard");

  return { success: true };
}

