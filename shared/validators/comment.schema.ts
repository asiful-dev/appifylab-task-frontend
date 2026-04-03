import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1).max(1000),
});

export const replyCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentCommentId: z.string().min(1),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ReplyCommentInput = z.infer<typeof replyCommentSchema>;
