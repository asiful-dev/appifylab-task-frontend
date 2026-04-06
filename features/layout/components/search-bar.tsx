"use client";

import { Search } from "lucide-react";

import { Input } from "@/shared/ui-components/controls/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-106">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        aria-label="Search"
        className="h-10 rounded-full border-(--bg3) bg-(--bg3) pl-10"
      />
    </div>
  );
}
