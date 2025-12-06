import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function verifyAdmin(): Promise<boolean> {
  const supabase = await createClient();
  
  // Get current user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If not logged in or error, redirect
  if (error || !user) {
    redirect("/dashboard");
  }

  // Check if user email matches admin email
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  if (!adminEmail) {
    // If no admin email is set, deny access
    redirect("/dashboard");
  }

  if (user.email !== adminEmail) {
    // Not an admin, redirect
    redirect("/dashboard");
  }

  // User is admin
  return true;
}

