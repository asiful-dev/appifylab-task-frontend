"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui-components/controls/button";

export function ErrorState({
  title,
  description,
  onRetry,
}: {
  title: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-destructive/30 bg-card px-6 py-10 text-center">
      <AlertTriangle
        className="mb-3 size-5 text-destructive"
        aria-hidden="true"
      />
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={onRetry}
        >
          Retry
        </Button>
      ) : null}
    </div>
  );
}
