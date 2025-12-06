import Link from "next/link";
import { Target, FileText, Users } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200 mb-2">
          SYSTEM CONTROL
        </h2>
        <p className="font-mono text-sm text-zinc-500 uppercase tracking-wider">
          Select operation module
        </p>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Manage Operations */}
        <Link
          href="/admin/workouts"
          className="group relative block rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-3">
              <Target className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
              [ MANAGE OPERATIONS ]
            </h3>
          </div>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
            Deploy Global Training Protocols.
          </p>
          <div className="mt-4">
            <span className="font-mono text-xs text-red-500/80 uppercase tracking-wider">
              ACCESS →
            </span>
          </div>
        </Link>

        {/* Card 2: Manage Intel */}
        <Link
          href="/admin/intel"
          className="group relative block rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-3">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
              [ MANAGE INTEL ]
            </h3>
          </div>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
            Publish Classified Dossiers.
          </p>
          <div className="mt-4">
            <span className="font-mono text-xs text-red-500/80 uppercase tracking-wider">
              ACCESS →
            </span>
          </div>
        </Link>

        {/* Card 3: Manage Roster */}
        <Link
          href="/admin/users"
          className="group relative block rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-3">
              <Users className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
              [ MANAGE ROSTER ]
            </h3>
          </div>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
            Adjust operator clearance levels and access permissions.
          </p>
          <div className="mt-4">
            <span className="font-mono text-xs text-red-500/80 uppercase tracking-wider">
              ACCESS →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

