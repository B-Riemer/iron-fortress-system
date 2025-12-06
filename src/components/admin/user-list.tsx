"use client";

import { useState, useMemo } from "react";
import { TierSelector } from "@/components/admin/tier-selector";
import { Select } from "@/components/ui/input/select";
import { Input } from "@/components/ui/input/input";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  email: string | null;
  tier: "recruit" | "operator" | "shadow" | null;
  created_at: string;
}

interface UserListProps {
  initialProfiles: Profile[];
}

function shortenUUID(uuid: string): string {
  return uuid.substring(0, 8).toUpperCase();
}

const tierBadgeStyles = {
  recruit: "bg-zinc-700 text-zinc-200 border-zinc-600",
  operator: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  shadow: "bg-purple-500/20 text-purple-500 border-purple-500/50",
};

const tierLabels = {
  recruit: "RECRUIT",
  operator: "OPERATOR",
  shadow: "SHADOW",
};

export function UserList({ initialProfiles }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState<string>("ALL");

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = [...initialProfiles];

    // Filter by search term (email or ID)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((profile) => {
        const emailMatch = profile.email?.toLowerCase().includes(searchLower);
        const idMatch = profile.id.toLowerCase().includes(searchLower);
        return emailMatch || idMatch;
      });
    }

    // Filter by tier
    if (filterTier !== "ALL") {
      const tierLower = filterTier.toLowerCase();
      filtered = filtered.filter((profile) => {
        const profileTier = profile.tier || "recruit";
        return profileTier === tierLower;
      });
    }

    // Sort by email (A-Z), then by created_at (newest first)
    filtered.sort((a, b) => {
      // First sort by email
      const emailA = a.email?.toLowerCase() || "";
      const emailB = b.email?.toLowerCase() || "";
      if (emailA !== emailB) {
        return emailA.localeCompare(emailB);
      }
      // If emails are equal, sort by created_at (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return filtered;
  }, [initialProfiles, searchTerm, filterTier]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by ID or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-zinc-800 bg-zinc-900 text-zinc-200 placeholder:text-zinc-600"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="sm:w-48">
          <Select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="border-zinc-800 bg-zinc-900 text-zinc-200"
          >
            <option value="ALL">Filter by Rank: ALL</option>
            <option value="RECRUIT">RECRUIT</option>
            <option value="OPERATOR">OPERATOR</option>
            <option value="SHADOW">SHADOW</option>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-500">
            NO OPERATORS FOUND
          </p>
          <p className="mt-2 font-sans text-sm text-zinc-600">
            {searchTerm || filterTier !== "ALL"
              ? "No profiles match your search criteria."
              : "No profiles exist in the system."}
          </p>
        </div>
      ) : (
        <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[120px_1fr_150px_200px] gap-4 border-b border-zinc-800 bg-zinc-950/50 p-4">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
              OPERATOR ID
            </div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
              COMM LINK
            </div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
              CLEARANCE
            </div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
              ACTION
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-zinc-800">
            {filteredUsers.map((profile) => {
              const tier = profile.tier || "recruit";
              return (
                <div
                  key={profile.id}
                  className="grid grid-cols-[120px_1fr_150px_200px] gap-4 p-4 hover:bg-zinc-900/30 transition-colors"
                >
                  {/* Operator ID */}
                  <div className="font-mono text-sm font-semibold text-zinc-300">
                    {shortenUUID(profile.id)}
                  </div>

                  {/* Email */}
                  <div className="font-sans text-sm text-zinc-400 truncate">
                    {profile.email || "N/A"}
                  </div>

                  {/* Clearance Badge */}
                  <div>
                    <span
                      className={cn(
                        "inline-block rounded-sm border px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wider",
                        tierBadgeStyles[tier as keyof typeof tierBadgeStyles] ||
                          tierBadgeStyles.recruit
                      )}
                    >
                      {tierLabels[tier as keyof typeof tierLabels] || "RECRUIT"}
                    </span>
                  </div>

                  {/* Action - Tier Selector */}
                  <div>
                    <TierSelector
                      userId={profile.id}
                      currentTier={tier as "recruit" | "operator" | "shadow"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

