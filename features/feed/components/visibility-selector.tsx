"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui-components/controls/dropdown-menu";
import { Button } from "@/shared/ui-components/controls/button";
import type { PostVisibility } from "@/features/feed/utils/post.types";

const options: Array<{ label: string; value: PostVisibility }> = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

export function VisibilitySelector({
  value,
  onChange,
}: {
  value: PostVisibility;
  onChange: (value: PostVisibility) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          {value === "public" ? "Public" : "Private"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
