import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/layout/container";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { signOut } from "@/app/(auth)/login/actions";
import { SettingsPreferences } from "@/components/dashboard/settings/settings-preferences";
import { LogOut, Shield, Mail, Calendar, User, Settings } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Truncate user ID to first 8 characters
  const operatorId = user.id.substring(0, 8).toUpperCase();

  // Format created_at date
  const serviceStart = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200">
          SYSTEM CONFIGURATION
        </h1>
        <p className="mt-2 font-sans text-sm text-zinc-400">
          Manage your operator profile and system preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Identity Card */}
        <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <h2 className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-200">
              IDENTITY CARD
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Operator ID */}
            <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Operator ID
                </span>
              </div>
              <p className="font-mono text-lg font-bold text-emerald-500">
                {operatorId}
              </p>
            </div>

            {/* Comm Link */}
            <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Comm Link
                </span>
              </div>
              <p className="font-sans text-sm text-zinc-200">{user.email}</p>
            </div>

            {/* Clearance Level */}
            <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Clearance Level
                </span>
              </div>
              <span className="inline-block rounded-sm border border-emerald-500/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500">
                Level 1 - Operator
              </span>
            </div>

            {/* Service Start */}
            <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Service Start
                </span>
              </div>
              <p className="font-mono text-sm text-zinc-200">{serviceStart}</p>
            </div>
          </div>
        </div>

        {/* Section 2: System Preferences */}
        <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-500" />
            <h2 className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-200">
              SYSTEM PREFERENCES
            </h2>
          </div>
          <p className="mb-4 font-sans text-sm text-zinc-400">
            Configure system behavior and preferences
          </p>
          <SettingsPreferences />
        </div>

        {/* Section 3: Danger Zone */}
        <div className="rounded-sm border border-red-500/50 bg-red-500/10 p-6">
          <div className="mb-4">
            <h2 className="font-mono text-lg font-semibold uppercase tracking-wider text-red-400">
              DANGER ZONE
            </h2>
            <p className="mt-1 font-sans text-sm text-red-500/80">
              Irreversible actions. Proceed with caution.
            </p>
          </div>

          <form action={signOut}>
            <ButtonPrimary
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="h-4 w-4" />
              SIGN OUT
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </Container>
  );
}

