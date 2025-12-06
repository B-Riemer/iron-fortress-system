import { IntelEditor } from "@/components/admin/intel-editor";

export default function AdminIntelPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200 mb-2">
          INTELLIGENCE EDITOR
        </h2>
        <p className="font-mono text-sm text-zinc-500 uppercase tracking-wider">
          Publish classified dossiers to the intelligence database
        </p>
      </div>

      {/* Editor */}
      <IntelEditor />
    </div>
  );
}

