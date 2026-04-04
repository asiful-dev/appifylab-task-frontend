"use client";

import { Heart } from "lucide-react";

import { Button } from "@/shared/ui-components/controls/button";

export function LikeButton({
  isLiked,
  count,
  isLoading,
  onToggle,
}: {
  isLiked: boolean;
  count: number;
  isLoading?: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onToggle}
      disabled={isLoading}
      className={isLiked ? "text-primary" : "text-muted-foreground"}
    >
      <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
      <span>{count}</span>
    </Button>
  );
}
