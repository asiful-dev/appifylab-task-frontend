"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PostCard } from "@/features/feed/components/post-card";
import { useUserPosts } from "@/features/profile/hooks/use-user-posts";
import { useAuthStore } from "@/shared/libs/auth-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

export function ProfilePosts({
  userId,
  isOwnProfile,
}: {
  userId: string;
  isOwnProfile: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const currentUserId = useAuthStore((state) => state.user?.id);
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useUserPosts(userId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const posts = data?.pages.flatMap((page) => page.posts ?? []) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isOwnProfile ? "My Posts" : "Posts"}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Loading posts...
          </p>
        ) : null}

        {!isLoading && !posts.length ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No posts yet.
          </p>
        ) : null}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={currentUserId} />
        ))}

        <div ref={ref} className="h-8" />

        {isFetchingNextPage ? (
          <p className="pb-2 text-center text-sm text-muted-foreground">
            Loading more posts...
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
