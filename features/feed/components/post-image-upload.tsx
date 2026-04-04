"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/shared/ui-components/controls/button";

export function PostImageUpload({
  preview,
  onSelect,
  onClear,
  disabled,
}: {
  preview: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-70">
        <ImagePlus className="size-4" />
        Add Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onSelect(file);
            }
          }}
        />
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-md border border-border">
          <Image
            src={preview}
            alt="Selected preview"
            width={640}
            height={360}
            className="h-auto max-h-72 w-full object-cover"
          />
          <Button
            type="button"
            size="icon-xs"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={onClear}
            disabled={disabled}
            aria-label="Remove selected image"
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
