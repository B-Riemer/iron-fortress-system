"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../action";
import { Input } from "@/components/ui/input/input";
import { InputLabel } from "@/components/ui/input/input-label";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { MessageError } from "@/components/ui/message/message-error";
import { Container } from "@/components/ui/layout/container";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createArticle, null);

  return (
    <Container className="py-8">
      {/* Back Button */}
      <Link
        href="/dashboard/intel"
        className="mb-6 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-wider">Back to Intel</span>
      </Link>

      {/* Main Form */}
      <div className="mx-auto max-w-3xl">
        <div className="rounded-sm border border-white/5 bg-zinc-950/50 backdrop-blur-sm p-8">
          {/* Header */}
          <h1 className="mb-8 font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200">
            NEW DOSSIER ENTRY
          </h1>

          {/* Form */}
          <form action={formAction} className="space-y-6">
            {/* Title */}
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Enter article title..."
                className="border-white/10 bg-zinc-900/50"
              />
            </div>

            {/* Category */}
            <div>
              <InputLabel htmlFor="category">Category</InputLabel>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-sm border border-white/10 bg-zinc-900/50 p-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Select category...</option>
                <option value="tactics">Tactics</option>
                <option value="nutrition">Nutrition</option>
                <option value="mindset">Mindset</option>
                <option value="gear">Gear</option>
              </select>
            </div>

            {/* Summary */}
            <div>
              <InputLabel htmlFor="summary">Summary</InputLabel>
              <textarea
                id="summary"
                name="summary"
                rows={3}
                placeholder="Brief summary of the article..."
                className="w-full rounded-sm border border-white/10 bg-zinc-900/50 p-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Content */}
            <div>
              <InputLabel htmlFor="content">Content</InputLabel>
              <textarea
                id="content"
                name="content"
                rows={24}
                required
                placeholder="Enter article content (Markdown supported)..."
                className="w-full rounded-sm border border-white/10 bg-zinc-900/50 p-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Error Message */}
            {state?.error && <MessageError>{state.error}</MessageError>}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <ButtonSecondary
                type="button"
                onClick={() => router.back()}
                className="flex-1"
              >
                CANCEL
              </ButtonSecondary>
              <ButtonPrimary type="submit" className="flex-1">
                PUBLISH TO DATABASE
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

