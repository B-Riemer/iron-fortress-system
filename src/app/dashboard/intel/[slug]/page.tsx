import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/layout/container";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Article } from "@/lib/types/article";
import { cn } from "@/lib/utils";

const categoryColors = {
  tactics: "bg-red-500/20 text-red-500 border-red-500/50",
  nutrition: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  mindset: "bg-blue-500/20 text-blue-500 border-blue-500/50",
  gear: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
};

const categoryLabels = {
  tactics: "TACTICS",
  nutrition: "NUTRITION",
  mindset: "MINDSET",
  gear: "GEAR",
};

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    notFound();
  }

  const typedArticle = article as Article;

  return (
    <Container>
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <ButtonSecondary href="/dashboard/intel" as="link">
            <ArrowLeft className="h-4 w-4" />
            BACK TO INTEL
          </ButtonSecondary>
        </div>

        {/* Header */}
        <div className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={cn(
                "inline-block rounded-sm border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider",
                categoryColors[typedArticle.category]
              )}
            >
              {categoryLabels[typedArticle.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-sans text-4xl font-bold text-white">
            {typedArticle.title}
          </h1>

          {/* Date */}
          {typedArticle.created_at && (
            <p className="font-mono text-sm text-zinc-500">
              {new Date(typedArticle.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="whitespace-pre-wrap font-sans text-zinc-200 leading-relaxed">
            {typedArticle.content}
          </div>
        </div>
      </div>
    </Container>
  );
}

