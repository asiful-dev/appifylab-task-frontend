"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useFeed } from "@/features/feed/hooks/use-feed";
import { PostCard } from "@/features/feed/components/post-card";
import { useAuthStore } from "@/shared/libs/auth-store";

export function PostList() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const currentUserId = useAuthStore((state) => state.user?.id);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFeed();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Loading feed...
      </p>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts ?? []) ?? [];

  if (!posts.length) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No posts yet.
      </p>
    );
  }

  return (
    <section>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={currentUserId} />
      ))}

      <div ref={ref} className="h-10" />

      {isFetchingNextPage ? (
        <p className="pb-6 text-center text-sm text-muted-foreground">
          Loading more posts...
        </p>
      ) : null}
    </section>
  );
}
