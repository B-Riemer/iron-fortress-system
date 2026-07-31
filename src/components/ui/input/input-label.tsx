import { cn } from "@/lib/utils";

interface InputLabelProps {
  /** Omitted when the label heads a group (e.g. a radio set) rather than one input. */
  htmlFor?: string;
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

