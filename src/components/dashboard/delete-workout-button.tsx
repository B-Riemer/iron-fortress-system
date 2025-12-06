"use client";

import { Trash2 } from "lucide-react";
import { deleteWorkout } from "@/app/dashboard/training/actions";
import { useState } from "react";

interface DeleteWorkoutButtonProps {
  workoutId: string;
}

export function DeleteWorkoutButton({ workoutId }: DeleteWorkoutButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this protocol? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteWorkout(workoutId);
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("Failed to delete protocol. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-zinc-600 transition-colors hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Delete workout"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

