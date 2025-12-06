import { HudBackground } from "@/components/marketing/background/hud-background";
import { HeroSection } from "@/components/marketing/hero/hero-section";
import { ProtocolGrid } from "@/components/marketing/methodology/protocol-grid";
import { CommanderProfile } from "@/components/marketing/about/commander-profile";
import { TacticalAssessment } from "@/components/marketing/features/tactical-assessment";
import { PricingSection } from "@/components/marketing/pricing/pricing-section";
import { IntelTeaser } from "@/components/marketing/intel/intel-teaser";
import { MissionReports } from "@/components/marketing/social-proof/mission-reports";

function Separator() {
  return (
    <div className="w-full h-px bg-zinc-800 my-24 flex items-center justify-center">
      <span className="bg-zinc-950 px-4 text-xs text-zinc-600 font-mono tracking-widest">
        /// CLASSIFIED ///
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <HudBackground />
      <HeroSection />
      <ProtocolGrid />
      <Separator />
      <CommanderProfile />
      <Separator />
      <TacticalAssessment />
      <Separator />
      <div className="w-full h-px bg-zinc-800 my-24 flex items-center justify-center">
        <span className="bg-zinc-950 px-4 text-xs text-zinc-600 font-mono tracking-widest">
          /// REQUISITION ///
        </span>
      </div>
      <PricingSection />
      <Separator />
      <IntelTeaser />
      <Separator />
      <MissionReports />
    </main>
  );
}

