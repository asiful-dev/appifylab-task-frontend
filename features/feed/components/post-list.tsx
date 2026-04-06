"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import type { Post } from "@/features/feed/utils/post.types";
import { PostCard } from "@/features/feed/components/post-card";
import { useAuthStore } from "@/shared/libs/auth-store";

export function PostList({
  posts,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: {
  posts: Post[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore: () => void;
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const currentUserId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [hasNextPage, inView, isFetchingNextPage, onLoadMore]);

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
