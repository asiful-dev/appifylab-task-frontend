"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { commentApi } from "@/features/comments/api/comment.api";

export function useReplies(commentId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: ["replies", commentId],
    queryFn: ({ pageParam }) =>
      commentApi.getReplies(commentId, { cursor: pageParam, limit: 5 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: Boolean(commentId) && enabled,
  });
}
