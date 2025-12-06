import { WorkoutCreator } from "@/components/admin/workout-creator";

export default function AdminWorkoutsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200 mb-2">
          GLOBAL WORKOUT CREATOR
        </h2>
        <p className="font-mono text-sm text-zinc-500 uppercase tracking-wider">
          Deploy training protocols for all operators
        </p>
      </div>

      {/* Form */}
      <WorkoutCreator />
    </div>
  );
}

