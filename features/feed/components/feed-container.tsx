"use client";

import { useMemo } from "react";

import { FeedEmpty } from "@/features/feed/components/feed-empty";
import { FeedSkeleton } from "@/features/feed/components/feed-skeleton";
import { PostComposer } from "@/features/feed/components/post-composer";
import { PostList } from "@/features/feed/components/post-list";
import { StoryCards } from "@/features/feed/components/story-cards";
import { useFeed } from "@/features/feed/hooks/use-feed";
import { ErrorBoundary } from "@/shared/ui-components/composed/error-boundary";
import { ErrorState } from "@/shared/ui-components/composed/error-state";

export function FeedContainer() {
  const feedQuery = useFeed();
  const posts = useMemo(
    () => feedQuery.data?.pages.flatMap((page) => page.posts ?? []) ?? [],
    [feedQuery.data],
  );

  return (
    <ErrorBoundary>
      <div className="w-full">
        <StoryCards />
        <PostComposer />

        {feedQuery.isLoading ? <FeedSkeleton /> : null}

        {feedQuery.isError ? (
          <ErrorState
            title="Failed to load feed"
            description="We couldn't load your feed right now."
            onRetry={() => void feedQuery.refetch()}
          />
        ) : null}

        {!feedQuery.isLoading && !feedQuery.isError && !posts.length ? (
          <FeedEmpty />
        ) : null}

        {!feedQuery.isLoading && !feedQuery.isError && posts.length ? (
          <PostList
            posts={posts}
            hasNextPage={feedQuery.hasNextPage}
            isFetchingNextPage={feedQuery.isFetchingNextPage}
            onLoadMore={() => void feedQuery.fetchNextPage()}
          />
        ) : null}
      </div>
    </ErrorBoundary>
  );
}
