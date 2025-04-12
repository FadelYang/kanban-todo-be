import { NextFunction, Request, Response } from 'express';
import { createUserSchema } from '../schema/user.schema';
import { userService } from '../services/user.service';
import { hash } from 'bcrypt';
import { checkError } from '../utils/errors';

export const userController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createUserSchema.parse(req.body);
      data.password = await hash(data.password, 12);
      const createdUser = await userService.create(data);
      const { password, ...safeUser } = createdUser;
      res.status(201).json({
        message: "Success create new user",
        data: safeUser
      });
    } catch (error: any) {
      checkError(res, next, error);
    }
  }
};