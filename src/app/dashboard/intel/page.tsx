import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/layout/container";
import { FileText } from "lucide-react";
import Link from "next/link";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import type { Article } from "@/lib/types/article";
import { cn } from "@/lib/utils";

const categoryColors = {
  tactics: "border-l-red-500",
  nutrition: "border-l-emerald-500",
  mindset: "border-l-blue-500",
  gear: "border-l-yellow-500",
};

const categoryLabels = {
  tactics: "TACTICS",
  nutrition: "NUTRITION",
  mindset: "MINDSET",
  gear: "GEAR",
};

export default async function IntelPage() {
  const supabase = await createClient();

  // Get current user to check access level
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Build query based on security level
  // For now, show all articles, but filter by security_level if user is not logged in
  let query = supabase.from("articles").select("*");

  if (!user) {
    // Not logged in: only show public articles
    query = query.eq("security_level", "public");
  } else {
    // Logged in: show public, member, and operator articles
    // In the future, you could add tier checking here
    // For now, all logged-in users see all articles
    query = query.in("security_level", ["public", "member", "operator"]);
  }

  const { data: articles, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Error fetching articles:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }

  const articleList = (articles as Article[]) || [];

  return (
    <Container>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200">
            INTELLIGENCE DATABASE
          </h1>
          <p className="mt-2 font-sans text-sm text-zinc-400">
            Tactical knowledge repository for elite operators
          </p>
        </div>
        <ButtonPrimary href="/dashboard/intel/new" as="link">
          CREATE INTEL
        </ButtonPrimary>
      </div>

      {/* Content */}
      {error ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-sm border border-red-500/50 bg-red-500/10 p-12 text-center">
          <div className="mb-4 rounded-sm bg-red-500/20 p-4">
            <FileText className="h-8 w-8 text-red-500" />
          </div>
          <p className="font-mono text-lg font-semibold uppercase tracking-wider text-red-400">
            DATABASE ERROR
          </p>
          <p className="mt-2 font-sans text-sm text-red-500/80">
            {error.message || "Failed to fetch intelligence files. Please check your database connection."}
          </p>
          {error.code && (
            <p className="mt-1 font-mono text-xs text-red-500/60">
              Error Code: {error.code}
            </p>
          )}
        </div>
      ) : articleList.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <div className="mb-4 rounded-sm bg-zinc-800 p-4">
            <FileText className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-500">
            NO INTELLIGENCE FILES
          </p>
          <p className="mt-2 font-sans text-sm text-zinc-600">
            Intelligence database is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articleList.map((article) => (
            <Link
              key={article.id}
              href={`/dashboard/intel/${article.slug}`}
              className="group block"
            >
              <div
                className={cn(
                  "rounded-sm border-l-4 border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                  categoryColors[article.category]
                )}
              >
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {categoryLabels[article.category]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 font-sans text-lg font-bold text-white transition-colors group-hover:text-emerald-500">
                  {article.title}
                </h3>

                {/* Summary */}
                {article.summary && (
                  <p className="font-sans text-sm text-zinc-400 line-clamp-3">
                    {article.summary}
                  </p>
                )}

                {/* Date */}
                {article.created_at && (
                  <div className="mt-4 font-mono text-xs text-zinc-600">
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}

