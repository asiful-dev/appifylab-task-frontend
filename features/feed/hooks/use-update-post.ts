"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postApi } from "@/features/feed/api/post.api";
import type { UpdatePostInput } from "@/features/feed/utils/post.types";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePostInput | FormData;
    }) => postApi.updatePost(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}
