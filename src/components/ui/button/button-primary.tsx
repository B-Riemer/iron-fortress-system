"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSoundFx } from "@/hooks/use-sound-fx";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  as?: "button" | "link";
}

export function ButtonPrimary({
  children,
  className,
  href,
  as = href ? "link" : "button",
  type = "button",
  onClick,
  onMouseEnter,
  ...props
}: ButtonPrimaryProps) {
  const { playHover, playClick } = useSoundFx();

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-mono rounded-sm px-6 py-3 font-bold transition-all uppercase tracking-wider",
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    playHover();
    onMouseEnter?.(e);
  };

  if (as === "link" && href) {
    return (
      <Link href={href} className={baseClasses} onMouseEnter={handleMouseEnter}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
}

