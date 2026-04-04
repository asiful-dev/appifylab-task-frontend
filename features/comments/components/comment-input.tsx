"use client";

import { useState } from "react";

import { Button } from "@/shared/ui-components/controls/button";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";

export function CommentInput({
  avatarUrl,
  firstName,
  lastName,
  placeholder,
  isLoading,
  onSubmit,
}: {
  avatarUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  placeholder?: string;
  isLoading?: boolean;
  onSubmit: (content: string) => Promise<void> | void;
}) {
  const [content, setContent] = useState("");
  const trimmed = content.trim();

  async function handleSubmit() {
    const value = content.trim();

    if (!value) {
      return;
    }

    await onSubmit(value);
    setContent("");
  }

  return (
    <div className="flex items-start gap-3">
      <UserAvatar
        src={avatarUrl}
        firstName={firstName}
        lastName={lastName}
        size="sm"
      />
      <div className="flex w-full items-center gap-2">
        <textarea
          className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring"
          placeholder={placeholder ?? "Write a comment..."}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={800}
        />
        <Button
          type="button"
          size="sm"
          onClick={() => void handleSubmit()}
          disabled={isLoading || !trimmed}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
