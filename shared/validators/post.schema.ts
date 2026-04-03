import { z } from "zod";

export const postVisibilitySchema = z.enum(["public", "friends", "private"]);

export const createPostSchema = z.object({
  content: z.string().min(1).max(5000),
  mediaUrls: z.array(z.string().url()).default([]),
  visibility: postVisibilitySchema.default("public"),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
