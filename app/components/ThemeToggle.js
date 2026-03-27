"use client";

import { useThemeMode } from "@/app/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeMode();
  const nextTheme = theme === "cyberpunk" ? "light" : "cyberpunk";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
      className="flex items-center justify-center p-2 rounded-lg hover:bg-[color:rgba(16,185,129,0.2)] transition-colors cursor-pointer"
      onClick={() => setTheme(nextTheme)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setTheme(nextTheme);
      }}
    >
      {theme === "cyberpunk" ? (
        <Sun className="w-5 h-5 text-[color:var(--foreground)]" />
      ) : (
        <Moon className="w-5 h-5 text-[color:var(--foreground)]" />
      )}
    </div>
  );
}

