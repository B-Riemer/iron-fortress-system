"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Perform Auth Logic
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 2. Handle Auth Error FIRST
  if (error) {
    return { error: error.message };
  }

  // 3. Revalidate & Redirect OUTSIDE of any try/catch
  revalidatePath("/", "layout");
  
  // SMART REDIRECT: Admins go to Command Bridge, users go to Dashboard
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (email === adminEmail) {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function signup(
  prevState: { error?: string; message?: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  
  // SMART REDIRECT: Admins go to Command Bridge, users go to Dashboard
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (email === adminEmail) {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

