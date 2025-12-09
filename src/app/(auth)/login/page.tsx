import Link from "next/link";
import { HudBackground } from "@/components/marketing/background/hud-background";
import { AuthHeader } from "@/components/auth/login-form/auth-header";
import { LoginForm } from "@/components/auth/login-form/login-form";
import { Container } from "@/components/ui/layout/container";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      <HudBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center py-24">
        <Container className="max-w-md">
          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
            <AuthHeader />
            <LoginForm />

            {/* --- HIER STARTET DER DEMO HINWEIS --- */}
            <div className="mt-8 p-4 border border-zinc-800 bg-zinc-950/50 rounded-sm text-xs font-mono text-zinc-500">
              <p className="mb-2 font-bold text-zinc-400">/// DEMO ACCESS ///</p>
              <div className="flex flex-col gap-1">
                <p>
                  USER: <span className="text-emerald-500">charly@tester.com</span> // test123
                </p>
                <p>
                  ADMIN: <span className="text-emerald-500">admin@ironfortress.com</span> // admin123
                </p>
              </div>
            </div>
            {/* --- ENDE DEMO HINWEIS --- */}

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs font-mono text-zinc-600 transition-colors hover:text-emerald-500"
              >
                Abort Mission / Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}