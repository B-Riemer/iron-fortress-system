"use client";

import { useState, useActionState } from "react";
import { publishIntel } from "@/app/admin/actions";
import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";
import { Textarea } from "@/components/ui/input/textarea";
import { Select } from "@/components/ui/input/select";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { MessageError } from "@/components/ui/message/message-error";

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

export function IntelEditor() {
  const [state, formAction] = useActionState(publishIntel, null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  return (
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
            minLength={1}
            placeholder="Article Title"
            value={title}
            onChange={handleTitleChange}
            className="border-zinc-700 bg-zinc-950 font-mono"
          />
        </div>

        {/* Slug (Auto-generated, read-only) */}
        <div>
          <InputLabel htmlFor="slug">Slug (Auto-generated)</InputLabel>
          <Input
            id="slug"
            name="slug"
            type="text"
            value={slug}
            readOnly
            className="border-zinc-700 bg-zinc-800/50 font-mono text-zinc-500 cursor-not-allowed"
          />
        </div>

        {/* Category */}
        <div>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            id="category"
            name="category"
            required
            className="border-zinc-700 bg-zinc-950 font-mono"
          >
            <option value="">Select Category</option>
            <option value="tactics">Tactics</option>
            <option value="nutrition">Nutrition</option>
            <option value="mindset">Mindset</option>
            <option value="gear">Gear</option>
          </Select>
        </div>

        {/* Security Level */}
        <div>
          <InputLabel htmlFor="security_level">Security Level</InputLabel>
          <Select
            id="security_level"
            name="security_level"
            required
            className="border-zinc-700 bg-zinc-950 font-mono"
          >
            <option value="">Select Security Level</option>
            <option value="public">Public</option>
            <option value="member">Member</option>
            <option value="operator">Operator</option>
          </Select>
        </div>

        {/* Summary */}
        <div>
          <InputLabel htmlFor="summary">Summary (Optional)</InputLabel>
          <Textarea
            id="summary"
            name="summary"
            rows={3}
            placeholder="Brief summary of the article..."
            className="border-zinc-700 bg-zinc-950 font-mono"
          />
        </div>

        {/* Content */}
        <div>
          <InputLabel htmlFor="content">Content</InputLabel>
          <Textarea
            id="content"
            name="content"
            rows={16}
            required
            placeholder="Article content (Markdown supported)..."
            className="border-zinc-700 bg-zinc-950 font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Info Note */}
        <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-3">
          <p className="font-mono text-xs text-red-500/80 uppercase tracking-wider">
            ⚠ This will be published to the Intelligence Database with the selected security level.
          </p>
        </div>

        {/* Error Message */}
        {state?.error && <MessageError>{state.error}</MessageError>}

        {/* Submit Button */}
        <div className="flex gap-4">
          <ButtonPrimary
            type="submit"
            className="flex-1 border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:border-red-500"
          >
            PUBLISH INTEL
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
}

