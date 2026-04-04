"use client";

import { Button } from "@/shared/ui-components/controls/button";

export function ConfirmDialog({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  disabled,
}: {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="destructive"
      disabled={disabled}
      onClick={() => {
        const result = window.confirm(
          description ? `${title}\n\n${description}` : title,
        );

        if (result) {
          onConfirm();
        }
      }}
    >
      {confirmText || cancelText}
    </Button>
  );
}
