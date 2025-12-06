import { DashboardCard } from "@/components/dashboard/dashboard-card";

export function WidgetIntel() {
  const intelItems = [
    "Training Protocol Alpha Updated",
    "New Equipment Available",
    "Weekly Report Generated",
  ];

  return (
    <DashboardCard>
      <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
        RECENT INTEL
      </h3>
      <ul className="space-y-3">
        {intelItems.map((item, index) => (
          <li
            key={index}
            className="border-l-2 border-emerald-500/50 pl-3 font-sans text-sm text-zinc-100"
          >
            {item}
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}

