"use client";

import { useEffect, useState } from "react";

function formatMilitaryTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}${minutes} Hours`;
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 border-b border-white/5 pb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-100">
          COMMAND CENTER
        </h1>
        <div className="flex flex-col gap-1 text-right font-mono text-sm text-zinc-400 sm:flex-row sm:gap-4">
          <span>{formatDate(currentTime)}</span>
          <span className="text-emerald-500">{formatMilitaryTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}

