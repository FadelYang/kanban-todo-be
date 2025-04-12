import { z } from "zod";

export const createBoardSchema = z.object({
  name: z.string().max(25),
  user_id: z.number()
})

export const updateBoardSchema = z.object({
  name: z.string().max(25).optional(),
  user_id: z.number().optional()
})

export type CreateBoardInput = z.infer<typeof createBoardSchema>
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>