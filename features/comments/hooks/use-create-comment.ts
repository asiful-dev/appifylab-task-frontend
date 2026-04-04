"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/comments/api/comment.api";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentApi.createComment(postId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
