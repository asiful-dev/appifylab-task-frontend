"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postApi } from "@/features/feed/api/post.api";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => postApi.createPost(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
