import { cn } from "@/lib/utils";

interface TacticalCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  variant?: "default" | "transparent";
}

export function TacticalCard({
  children,
  className,
  noPadding = false,
  variant = "default",
}: TacticalCardProps) {
  return (
    <div
      className={cn(
        "relative",
        variant === "transparent"
          ? "bg-transparent border-b border-white/5"
          : "bg-zinc-900/40 backdrop-blur-md border border-white/5",
        "before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
        noPadding ? "" : "p-6",
        className
      )}
    >
      {/* Corner Accents - Top Left */}
      <svg
        className="absolute top-0 left-0 w-3 h-3 text-zinc-700"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0 L0 4 M0 0 L4 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Corner Accents - Top Right */}
      <svg
        className="absolute top-0 right-0 w-3 h-3 text-zinc-700"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0 L12 4 M12 0 L8 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Corner Accents - Bottom Left */}
      <svg
        className="absolute bottom-0 left-0 w-3 h-3 text-zinc-700"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12 L0 8 M0 12 L4 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Corner Accents - Bottom Right */}
      <svg
        className="absolute bottom-0 right-0 w-3 h-3 text-zinc-700"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12 L12 8 M12 12 L8 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

