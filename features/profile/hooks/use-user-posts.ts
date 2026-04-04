"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";

export function useUserPosts(userId: string) {
  return useInfiniteQuery({
    queryKey: ["userPosts", userId],
    queryFn: ({ pageParam }) =>
      userApi.getUserPosts(userId, {
        cursor: pageParam,
        limit: 10,
      }),
    enabled: Boolean(userId),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.meta?.hasMore ?? lastPage.hasMore;
      const nextCursor = lastPage.meta?.nextCursor ?? lastPage.nextCursor;

      return hasMore ? (nextCursor ?? undefined) : undefined;
    },
  });
}
