"use client";

import { Search } from "lucide-react";

import { Input } from "@/shared/ui-components/controls/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-[424px]">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="h-10 rounded-full border-[var(--bg3)] bg-[var(--bg3)] pl-10"
      />
    </div>
  );
}
