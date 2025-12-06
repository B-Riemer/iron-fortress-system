"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSoundFx } from "@/hooks/use-sound-fx";

interface ButtonSecondaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  as?: "button" | "link";
}

export function ButtonSecondary({
  children,
  className,
  href,
  as = href ? "link" : "button",
  onClick,
  onMouseEnter,
  ...props
}: ButtonSecondaryProps) {
  const { playHover, playClick } = useSoundFx();

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 bg-transparent font-mono rounded-sm px-6 py-3 transition-all uppercase tracking-wider",
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
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </button>
  );
}

