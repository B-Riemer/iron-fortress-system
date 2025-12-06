import Link from "next/link";
import { verifyAdmin } from "@/lib/auth/admin";
import { Container } from "@/components/ui/layout/container";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify admin access
  await verifyAdmin();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-red-500/20 bg-zinc-950/80 backdrop-blur-xl">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-xl font-bold uppercase tracking-wider text-red-500">
                COMMAND BRIDGE // RESTRICTED ACCESS
              </h1>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">
                /// ADMINISTRATIVE CONTROL PANEL ///
              </p>
            </div>
            <Link
              href="/dashboard"
              className="font-mono text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
            >
              ← RETURN TO BASE
            </Link>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-8">
        {children}
      </Container>
    </div>
  );
}

