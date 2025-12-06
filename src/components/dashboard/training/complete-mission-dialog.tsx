"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { logWorkout } from "@/app/dashboard/training/log-action";
import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { MessageError } from "@/components/ui/message/message-error";
import { MessageSuccess } from "@/components/ui/message/message-success";
import { useSoundFx } from "@/hooks/use-sound-fx";
import { cn } from "@/lib/utils";

interface CompleteMissionDialogProps {
  workoutId: string;
}

export function CompleteMissionDialog({
  workoutId,
}: CompleteMissionDialogProps) {
  const { playSuccess } = useSoundFx();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<{ success?: boolean; error?: string } | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  // Close dialog on successful submission
  useEffect(() => {
    if (state?.success) {
      playSuccess(); // Play success sound
      const timer = setTimeout(() => {
        setIsOpen(false);
        // Reset form
        setDuration("");
        setNotes("");
        setRating("");
        setState(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state?.success, playSuccess]);

  const handleClose = () => {
    setIsOpen(false);
    // Reset form
    setDuration("");
    setNotes("");
    setRating("");
    setState(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);

    if (!duration || !rating) {
      setState({ error: "Duration and rating are required." });
      return;
    }

    const result = await logWorkout({
      workout_id: workoutId,
      duration: Number(duration),
      rating: Number(rating),
      notes: notes || undefined,
    });

    setState(result);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500 transition-all hover:bg-emerald-500/20 hover:border-emerald-500"
      >
        COMPLETE MISSION
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-md rounded-sm border border-white/10 bg-zinc-900/95 backdrop-blur-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h2 className="mb-6 font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
              MISSION DEBRIEF
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Actual Duration */}
              <div>
                <InputLabel htmlFor="duration">Actual Duration (min)</InputLabel>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border-white/10 bg-zinc-950/50"
                />
              </div>

              {/* Tactical Notes */}
              <div>
                <InputLabel htmlFor="notes">Tactical Notes</InputLabel>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-zinc-950/50 p-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Optional notes about the mission..."
                />
              </div>

              {/* Difficulty Rating */}
              <div>
                <InputLabel>Difficulty Rating</InputLabel>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((ratingValue) => (
                    <div key={ratingValue} className="flex-1">
                      <input
                        type="radio"
                        id={`rating-${ratingValue}`}
                        name="rating"
                        value={ratingValue}
                        checked={rating === String(ratingValue)}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`rating-${ratingValue}`}
                        className={cn(
                          "block w-full cursor-pointer rounded-sm border border-white/10 bg-zinc-950/50 px-4 py-2 text-center font-mono text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-all hover:border-emerald-500/30 peer-checked:border-emerald-500/50 peer-checked:bg-emerald-500/10 peer-checked:text-emerald-500"
                        )}
                      >
                        {ratingValue}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              {state?.error && <MessageError>{state.error}</MessageError>}
              {state?.success && (
                <MessageSuccess>LOGGED</MessageSuccess>
              )}

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <ButtonSecondary
                  type="button"
                  onClick={handleClose}
                  className="flex-1"
                >
                  CANCEL
                </ButtonSecondary>
                <ButtonPrimary type="submit" className="flex-1">
                  CONFIRM
                </ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

