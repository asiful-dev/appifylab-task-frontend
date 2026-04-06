"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed right-0 top-1/2 z-1 -translate-x-1/2">
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
        className={`relative flex h-8 w-16.5 items-center rounded-[40px] border rotate-90 ${
          isDark
            ? "border-[#1890FF]  bg-[#232E42]"
            : "border-[#1890FF] bg-[#1890FF]"
        }`}
      >
        <div
          className={`absolute h-4.5 w-4.5 rounded-full transition-all duration-200 ease ${
            isDark ? "left-[calc(100%-28px)] bg-[#1890FF]" : "left-2.5 bg-white"
          }`}
        />

        <Sun
          className={`absolute left-2 size-5 -rotate-90 transition-opacity duration-200 ${
            isDark ? "visible opacity-100" : "invisible opacity-0"
          }`}
        />

        <Moon
          className={`absolute right-2 size-5 rotate-180 transition-opacity duration-200 ${
            isDark
              ? "invisible opacity-0"
              : "visible opacity-100 text-white fill-white"
          }`}
        />
      </button>
    </div>
  );
}
