import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Scanline } from "@/components/ui/effects/scanline";
import { HudBackground } from "@/components/marketing/background/hud-background";
import { TierSwitcher } from "@/components/debug/tier-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full bg-zinc-950 bg-noise text-zinc-100 font-sans overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* The Grid Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HudBackground />
      </div>

      {/* The Content Layer */}
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <main className="relative z-10 pt-16 md:pt-0 md:ml-64 flex-1 flex flex-col overflow-hidden p-4 md:p-8 w-full">
          {children}
        </main>
      </div>
      <Scanline />
      <TierSwitcher />
    </div>
  );
}

