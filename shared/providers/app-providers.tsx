"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/shared/ui-components/controls/sonner";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
