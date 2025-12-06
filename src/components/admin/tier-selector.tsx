"use client";

import { useState, useTransition } from "react";
import { updateUserTier } from "@/app/admin/actions";
import { Select } from "@/components/ui/input/select";
import { cn } from "@/lib/utils";

interface TierSelectorProps {
  userId: string;
  currentTier: "recruit" | "operator" | "shadow";
}

export function TierSelector({ userId, currentTier }: TierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState(currentTier);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newTier: string) => {
    if (newTier === selectedTier) return;

    setError(null);
    setSelectedTier(newTier as "recruit" | "operator" | "shadow");

    startTransition(async () => {
      const result = await updateUserTier(
        userId,
        newTier as "recruit" | "operator" | "shadow"
      );

      if (result?.error) {
        setError(result.error);
        setSelectedTier(currentTier); // Revert on error
      }
    });
  };

  return (
    <div className="space-y-1">
      <Select
        value={selectedTier}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className={cn(
          "w-full border-zinc-700 bg-zinc-950 text-sm",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        <option value="recruit">RECRUIT</option>
        <option value="operator">OPERATOR</option>
        <option value="shadow">SHADOW</option>
      </Select>
      {isPending && (
        <p className="font-mono text-[10px] text-yellow-500 uppercase tracking-wider">
          UPDATING...
        </p>
      )}
      {error && (
        <p className="font-mono text-[10px] text-red-500 uppercase tracking-wider">
          {error}
        </p>
      )}
    </div>
  );
}

