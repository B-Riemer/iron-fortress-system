"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const CreateArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(["tactics", "nutrition", "mindset", "gear"]),
  summary: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

export async function createArticle(
  prevState: { error?: string } | null,
  formData: FormData
) {
  // Extract form data
  const rawData = {
    title: formData.get("title"),
    category: formData.get("category"),
    summary: formData.get("summary"),
    content: formData.get("content"),
  };

  // Validate inputs using Zod
  const validation = CreateArticleSchema.safeParse(rawData);

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
    author_id: user.id,
  });

  if (insertError) {
    // Handle unique constraint violation
    if (insertError.code === "23505") {
      return { error: "An article with this title already exists. Please choose a different title." };
    }
    return { error: insertError.message };
  }

  // Success: Revalidate and redirect
  revalidatePath("/dashboard/intel");
  redirect("/dashboard/intel");
}

