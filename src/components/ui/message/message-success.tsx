import { cn } from "@/lib/utils";

interface MessageSuccessProps {
  children: React.ReactNode;
  className?: string;
}

export function MessageSuccess({ children, className }: MessageSuccessProps) {
  return (
    <div
      className={cn(
        "rounded-[--radius-sm] border border-[--color-primary]/50 bg-[--color-primary]/10 p-3",
        className
      )}
    >
      <p className="font-mono text-xs text-[--color-primary]">{children}</p>
    </div>
  );
}

