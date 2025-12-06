import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-500",
        className
      )}
      {...props}
    />
  );
}

