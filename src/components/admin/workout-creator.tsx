"use client";

import { useActionState } from "react";
import { createGlobalWorkout } from "@/app/admin/actions";
import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";
import { Textarea } from "@/components/ui/input/textarea";
import { Select } from "@/components/ui/input/select";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { MessageError } from "@/components/ui/message/message-error";

export function WorkoutCreator() {
  const [state, formAction] = useActionState(createGlobalWorkout, null);

  return (
    <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-8">
      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            placeholder="Global Protocol Name"
            className="border-zinc-700 bg-zinc-950"
          />
        </div>

        {/* Difficulty */}
        <div>
          <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
          <Select
            id="difficulty"
            name="difficulty"
            required
            className="border-zinc-700 bg-zinc-950"
          >
            <option value="">Select Difficulty</option>
            <option value="recruit">Recruit</option>
            <option value="soldier">Soldier</option>
            <option value="spec-ops">Spec-Ops</option>
          </Select>
        </div>

        {/* Duration */}
        <div>
          <InputLabel htmlFor="duration">Duration (Minutes)</InputLabel>
          <Input
            id="duration"
            name="duration"
            type="number"
            required
            min={1}
            placeholder="30"
            className="border-zinc-700 bg-zinc-950"
          />
        </div>

        {/* Description */}
        <div>
          <InputLabel htmlFor="description">Description (Optional)</InputLabel>
          <Textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Global mission briefing and objectives..."
            className="border-zinc-700 bg-zinc-950"
          />
        </div>

        {/* Info Note */}
        <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-3">
          <p className="font-mono text-xs text-red-500/80 uppercase tracking-wider">
            ⚠ This will be deployed as a GLOBAL PROTOCOL visible to all users.
          </p>
        </div>

        {/* Error Message */}
        {state?.error && <MessageError>{state.error}</MessageError>}

        {/* Submit Button */}
        <div className="flex gap-4">
          <ButtonPrimary type="submit" className="flex-1 border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:border-red-500">
            DEPLOY GLOBAL PROTOCOL
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
}

