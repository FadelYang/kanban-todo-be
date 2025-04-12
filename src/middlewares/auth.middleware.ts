import { Request, Response, NextFunction } from "express";
import { LoginPayload } from '../schema/auth.schema';
import { checkJwtKey } from '../utils/checkJwtKey';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: LoginPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: Missing token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const { jwtSecretKey } = checkJwtKey();

    const payload = jwt.verify(token, jwtSecretKey);

    if (typeof payload === 'string') {
      res.status(401).json({ message: 'Invalid token format' });
    }

    const { sub, uniqueUUID, date } = payload as JwtPayload;

    if (!sub || !uniqueUUID || !date) {
      res.status(401).json({ message: 'Token missing required fields' });
    }

    req.user = {
      sub: Number(sub),
      uniqueUUID: uniqueUUID,
      date: new Date(date),
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error
    });
  }
};