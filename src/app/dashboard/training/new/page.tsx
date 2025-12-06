"use client";

import { useActionState } from "react";
import { createWorkout } from "../actions";
import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";
import { Textarea } from "@/components/ui/input/textarea";
import { Select } from "@/components/ui/input/select";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { MessageError } from "@/components/ui/message/message-error";
import { Container } from "@/components/ui/layout/container";

export default function NewTrainingPage() {
  const [state, formAction] = useActionState(createWorkout, null);

  return (
    <Container className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200">
          INITIATE NEW PROTOCOL
        </h1>
      </div>

      <div className="rounded-sm border border-zinc-800 bg-zinc-900 p-8">
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
              placeholder="Mission Protocol Name"
            />
          </div>

          {/* Difficulty */}
          <div>
            <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
            <Select id="difficulty" name="difficulty" required>
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
            />
          </div>

          {/* Description */}
          <div>
            <InputLabel htmlFor="description">Description (Optional)</InputLabel>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Mission briefing and objectives..."
            />
          </div>

          {/* Error Message */}
          {state?.error && <MessageError>{state.error}</MessageError>}

          {/* Submit Button */}
          <div className="flex gap-4">
            <ButtonPrimary type="submit" className="flex-1">
              CONFIRM PROTOCOL
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </Container>
  );
}

