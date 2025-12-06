import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-zinc-600 resize-none",
        className
      )}
      {...props}
    />
  );
}

