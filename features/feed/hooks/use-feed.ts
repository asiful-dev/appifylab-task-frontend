"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { postApi } from "@/features/feed/api/post.api";

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) =>
      postApi.getPosts({
        cursor: pageParam,
        limit: 10,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.meta?.hasMore ?? lastPage.hasMore;
      const nextCursor = lastPage.meta?.nextCursor ?? lastPage.nextCursor;

      return hasMore ? (nextCursor ?? undefined) : undefined;
    },
  });
}
