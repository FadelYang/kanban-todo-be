import { number, z } from "zod";

export const createBoardSchema = z.object({
  name: z.string().max(25),
  user_id: z.number()
})

export type CreateBoardInput = z.infer<typeof createBoardSchema>