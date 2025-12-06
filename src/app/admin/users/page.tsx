import { createClient } from "@/lib/supabase/server";
import { verifyAdmin } from "@/lib/auth/admin";
import { Container } from "@/components/ui/layout/container";
import { UserList } from "@/components/admin/user-list";

interface Profile {
  id: string;
  email: string | null;
  tier: "recruit" | "operator" | "shadow" | null;
  created_at: string;
}

export default async function AdminUsersPage() {
  // Verify admin access
  await verifyAdmin();

  const supabase = await createClient();

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching profiles:", error);
  }

  // Map profiles to include email (assuming email might be in profiles table or null)
  const profileList: Profile[] = (profiles || []).map((profile: any) => ({
    id: profile.id,
    email: profile.email || null, // Email might be stored in profiles table
    tier: profile.tier || null,
    created_at: profile.created_at,
  }));

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200 mb-2">
          OPERATOR ROSTER
        </h1>
        <p className="font-mono text-sm text-zinc-500 uppercase tracking-wider">
          Manage clearance levels and operator access
        </p>
      </div>

      {/* User List with Search and Filter */}
      <UserList initialProfiles={profileList} />
    </Container>
  );
}

