"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { likeApi } from "@/features/likes/api/like.api";

type TargetType = "post" | "comment";

export function useWhoLiked(
  targetType: TargetType,
  targetId: string,
  enabled = true,
) {
  return useInfiniteQuery({
    queryKey: ["who-liked", targetType, targetId],
    queryFn: ({ pageParam }) =>
      targetType === "post"
        ? likeApi.getPostLikes(targetId, { cursor: pageParam, limit: 20 })
        : likeApi.getCommentLikes(targetId, { cursor: pageParam, limit: 20 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor ? lastPage.nextCursor : undefined,
    enabled: Boolean(targetId) && enabled,
  });
}
