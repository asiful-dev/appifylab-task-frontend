"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/comments/api/comment.api";

export function useCreateReply(commentId: string, postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentApi.createReply(commentId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["replies", commentId] });
      void queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
