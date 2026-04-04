"use client";

import { useEffect } from "react";

import { useWhoLiked } from "@/features/likes/hooks/use-who-liked";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";

type TargetType = "post" | "comment";

export function WhoLikedModal({
  open,
  onClose,
  targetType,
  targetId,
}: {
  open: boolean;
  onClose: () => void;
  targetType: TargetType;
  targetId: string;
}) {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useWhoLiked(targetType, targetId, open);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const users = data?.pages.flatMap((page) => page.users ?? []) ?? [];

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-card p-4 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-medium text-foreground">
            People who liked this ({users.length})
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close who liked modal"
          >
            ✕
          </Button>
        </div>

        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : users.length ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
              >
                <UserAvatar
                  size="sm"
                  src={user.profileImageUrl}
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
                <p className="text-sm text-foreground">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No one has liked this yet.
            </p>
          )}
        </div>

        {hasNextPage ? (
          <div className="mt-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => void fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading..."
                : `Load more (${users.length} shown)`}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
