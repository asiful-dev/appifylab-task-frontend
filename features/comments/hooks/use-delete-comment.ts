"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/comments/api/comment.api";

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentApi.deleteComment(commentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
