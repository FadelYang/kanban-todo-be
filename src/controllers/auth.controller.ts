import { Response, Request, NextFunction } from 'express';
import { checkError } from '../utils/errors';
import { loginUserSchema } from '../schema/auth.schema';
import { authServie } from '../services/auth.service';

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginUserSchema.parse(req.body);
      const response = authServie.login(data)

      res.status(200).json({
        message: "Success login",
        data: response
      })
    } catch (error) {
      checkError(res, next, error)
    }

  }
}