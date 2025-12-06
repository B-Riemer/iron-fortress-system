import { cn } from "@/lib/utils";

interface MessageErrorProps {
  children: React.ReactNode;
  className?: string;
}

export function MessageError({ children, className }: MessageErrorProps) {
  return (
    <div
      className={cn(
        "rounded-[--radius-sm] border border-[--color-alert]/50 bg-[--color-alert]/10 p-3",
        className
      )}
    >
      <p className="font-mono text-xs text-[--color-alert]">{children}</p>
    </div>
  );
}

