"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DarkModeToggleProps {
  className?: string;
}

export function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse", className)} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200",
        "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
        "border border-slate-200 dark:border-slate-700",
        "text-slate-600 dark:text-slate-300",
        className
      )}
      aria-label="Toggle dark mode"
    >
      <span className={cn("absolute transition-all duration-300", isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0")}>
        <Sun className="h-4 w-4 text-amber-500" />
      </span>
      <span className={cn("absolute transition-all duration-300", isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90")}>
        <Moon className="h-4 w-4 text-indigo-400" />
      </span>
    </button>
  );
}
