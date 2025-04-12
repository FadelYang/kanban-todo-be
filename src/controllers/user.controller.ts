import { NextFunction, Request, Response } from 'express';
import { createUserSchema } from '../schema/user.schema';
import { userService } from '../services/user.servie';
import { hash } from 'bcrypt';

export const userController = {
  create: async(req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createUserSchema.parse(req.body);
      data.password = await hash(data.password, 12)
      const createdUser = await userService.create(data);
      const { password, ...safeUser } = createdUser;
      res.status(201).json({
        message: "Success create new user",
        data: safeUser
      })
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({error})
      }
      if (error.code === "P2002") {
        res.status(400).json({error})
      }
      res.status(500).json({error})
      next(error)
    }
  }
}