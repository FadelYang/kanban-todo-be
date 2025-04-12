import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(25),
  description: z.string().max(255).nullable().optional(),
  user_id: z.number(),
  board_id: z.number()
});

export const updateTaskSchema = z.object({
  title: z.string().max(25).optional(),
  description: z.string().max(255).nullable().optional(),
  user_id: z.number().optional(),
  board_id: z.number().optional()
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;