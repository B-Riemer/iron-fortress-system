import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-zinc-600",
        className
      )}
      {...props}
    />
  );
}

