"use client";

import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import type {
  CommentPageResponse,
  ReplyPageResponse,
} from "@/features/comments/utils/comment.types";
import { likeApi } from "@/features/likes/api/like.api";
import type { LikeToggleResponse } from "@/features/likes/utils/like.types";
import type { FeedPageResponse } from "@/features/feed/utils/post.types";

type TargetType = "post" | "comment";

type ToggleInput = {
  targetId: string;
};

type ToggleContext = {
  previousFeed?: InfiniteData<FeedPageResponse>;
  previousComments: Array<
    [readonly unknown[], InfiniteData<CommentPageResponse> | undefined]
  >;
  previousReplies: Array<
    [readonly unknown[], InfiniteData<ReplyPageResponse> | undefined]
  >;
};

function toggleInCommentsPages(
  oldData: InfiniteData<CommentPageResponse> | undefined,
  targetId: string,
) {
  if (!oldData) {
    return oldData;
  }

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      comments: page.comments.map((comment) =>
        comment.id === targetId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likeCount: comment.likeCount + (comment.isLiked ? -1 : 1),
            }
          : comment,
      ),
    })),
  };
}

function toggleInRepliesPages(
  oldData: InfiniteData<ReplyPageResponse> | undefined,
  targetId: string,
) {
  if (!oldData) {
    return oldData;
  }

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      replies: page.replies.map((reply) =>
        reply.id === targetId
          ? {
              ...reply,
              isLiked: !reply.isLiked,
              likeCount: reply.likeCount + (reply.isLiked ? -1 : 1),
            }
          : reply,
      ),
    })),
  };
}

export function useToggleLike(targetType: TargetType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ targetId }: ToggleInput) =>
      targetType === "post"
        ? likeApi.togglePostLike(targetId)
        : likeApi.toggleCommentLike(targetId),

    onMutate: async ({ targetId }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const context: ToggleContext = {
        previousFeed: queryClient.getQueryData<InfiniteData<FeedPageResponse>>([
          "feed",
        ]),
        previousComments: [],
        previousReplies: [],
      };

      if (targetType === "post") {
        queryClient.setQueryData<InfiniteData<FeedPageResponse>>(
          ["feed"],
          (oldData) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                posts: page.posts.map((post) =>
                  post.id === targetId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likeCount: post.likeCount + (post.isLiked ? -1 : 1),
                      }
                    : post,
                ),
              })),
            };
          },
        );
      }

      if (targetType === "comment") {
        const commentEntries = queryClient.getQueriesData<
          InfiniteData<CommentPageResponse>
        >({
          queryKey: ["comments"],
        });

        context.previousComments = commentEntries.map(([key, value]) => [
          key,
          value,
        ]);

        for (const [queryKey, queryData] of commentEntries) {
          queryClient.setQueryData<InfiniteData<CommentPageResponse>>(
            queryKey,
            toggleInCommentsPages(queryData, targetId),
          );
        }

        const replyEntries = queryClient.getQueriesData<
          InfiniteData<ReplyPageResponse>
        >({
          queryKey: ["replies"],
        });

        context.previousReplies = replyEntries.map(([key, value]) => [
          key,
          value,
        ]);

        for (const [queryKey, queryData] of replyEntries) {
          queryClient.setQueryData<InfiniteData<ReplyPageResponse>>(
            queryKey,
            toggleInRepliesPages(queryData, targetId),
          );
        }
      }

      return context;
    },

    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      if (context.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }

      for (const [key, value] of context.previousComments) {
        queryClient.setQueryData(key, value);
      }

      for (const [key, value] of context.previousReplies) {
        queryClient.setQueryData(key, value);
      }
    },

    onSuccess: (response: LikeToggleResponse) => {
      return response;
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
      void queryClient.invalidateQueries({ queryKey: ["comments"] });
      void queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
  });
}
