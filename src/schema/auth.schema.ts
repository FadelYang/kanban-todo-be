import { UUID } from 'crypto';
import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginPayload = {
  sub: number
  uniqueUUID: UUID
  date: Date   
}

export type LoginUserType = z.infer<typeof loginUserSchema>
