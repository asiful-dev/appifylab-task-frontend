"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postApi } from "@/features/feed/api/post.api";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
