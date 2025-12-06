import { DashboardCard } from "@/components/dashboard/dashboard-card";

interface WorkoutLog {
  id: string;
  created_at: string;
  rating: number;
  notes: string | null;
  workouts: {
    title: string;
  } | null | {
    title: string;
  }[];
}

interface MissionHistoryProps {
  logs: WorkoutLog[] | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

export function MissionHistory({ logs }: MissionHistoryProps) {
  if (!logs || logs.length === 0) {
    return (
      <DashboardCard>
        <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
          MISSION LOG
        </h3>
        <p className="font-sans text-sm text-zinc-500">No missions recorded.</p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
        MISSION LOG
      </h3>
      <ul className="space-y-0">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex items-center gap-4 border-b border-white/5 py-3 last:border-0"
          >
            {/* Left: Date */}
            <div className="font-mono text-xs text-zinc-500 min-w-[60px]">
              {formatDate(log.created_at)}
            </div>

            {/* Center: Workout Title */}
            <div className="flex-1 font-sans text-sm font-medium text-zinc-200 truncate">
              {Array.isArray(log.workouts)
                ? log.workouts[0]?.title || "Unknown Mission"
                : log.workouts?.title || "Unknown Mission"}
            </div>

            {/* Right: Rating Badge */}
            <div className="font-mono text-xs font-semibold text-emerald-500 min-w-[40px] text-right">
              ★ {log.rating}
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}

