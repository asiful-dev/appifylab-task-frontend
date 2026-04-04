"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { commentApi } from "@/features/comments/api/comment.api";

export function useComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) =>
      commentApi.getComments(postId, { cursor: pageParam, limit: 10 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: Boolean(postId),
  });
}
