import { Response, Request, NextFunction } from 'express';
import { checkError } from '../utils/errors';
import { loginUserSchema } from '../schema/auth.schema';
import { authService } from '../services/auth.service';

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginUserSchema.parse(req.body);
      const response = await authService.login(data);

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Success login",
        data: response
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });

      res.status(200).json({
        message: "Success logout success",
      });
    } catch (error) {
      checkError(res, next, error);
    }
  }
};