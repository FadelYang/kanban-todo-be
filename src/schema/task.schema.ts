import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(25),
  description: z.string().max(255).nullable(),
  user_id: z.number(),
  board_id: z.number()
});

export type CreateBoardInput = z.infer<typeof createTaskSchema>