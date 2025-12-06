import { Target, Shield, Activity } from "lucide-react";

export function HeroIcons() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-zinc-500">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-emerald-500" />
        <span className="font-mono text-sm uppercase tracking-wider">
          Precision
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-emerald-500" />
        <span className="font-mono text-sm uppercase tracking-wider">
          Resilience
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-emerald-500" />
        <span className="font-mono text-sm uppercase tracking-wider">
          Performance
        </span>
      </div>
    </div>
  );
}

