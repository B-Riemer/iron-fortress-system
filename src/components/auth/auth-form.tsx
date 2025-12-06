"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        setMessage("Sign in successful. Redirecting...");
        window.location.href = "/dashboard";
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        setMessage(
          "Sign up successful! Please check your email to verify your account."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-sm bg-emerald-500/10 p-3">
              <Target className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
          <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200">
            {mode === "signin" ? "Access Granted" : "Enlist Now"}
          </h2>
          <p className="mt-2 font-sans text-sm text-zinc-400">
            {mode === "signin"
              ? "Enter your credentials to proceed"
              : "Create your account to begin"}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-6 flex gap-2 rounded-sm border border-zinc-800 bg-zinc-950 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
              setMessage(null);
            }}
            className={cn(
              "flex-1 rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
              mode === "signin"
                ? "bg-emerald-500 text-zinc-950"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
              setMessage(null);
            }}
            className={cn(
              "flex-1 rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
              mode === "signup"
                ? "bg-emerald-500 text-zinc-950"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-3 font-sans text-sm text-zinc-200 placeholder-zinc-600 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="operator@ironfortress.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-sm border border-zinc-800 bg-zinc-950 px-4 py-3 font-sans text-sm text-zinc-200 placeholder-zinc-600 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-sm border border-red-500/50 bg-red-500/10 p-3">
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="rounded-sm border border-emerald-500/50 bg-emerald-500/10 p-3">
              <p className="font-mono text-xs text-emerald-400">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-emerald-500 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
          >
            {loading ? "Processing..." : mode === "signin" ? "Access" : "Enlist"}
          </button>
        </form>
      </div>
    </div>
  );
}

