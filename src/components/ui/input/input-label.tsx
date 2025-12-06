import { cn } from "@/lib/utils";

interface InputLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export function InputLabel({
  htmlFor,
  children,
  className,
}: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-xs font-mono text-emerald-500 mb-1 uppercase tracking-widest",
        className
      )}
    >
      {children}
    </label>
  );
}

