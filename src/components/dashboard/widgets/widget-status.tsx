import { DashboardCard } from "@/components/dashboard/dashboard-card";

export function WidgetStatus() {
  return (
    <DashboardCard>
      <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
        OPERATIONAL STATUS
      </h3>
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
        <p className="font-mono text-3xl font-bold text-zinc-100">ACTIVE</p>
      </div>
    </DashboardCard>
  );
}

