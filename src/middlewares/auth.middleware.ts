import { Request, Response, NextFunction } from "express";
import { LoginPayload } from '../schema/auth.schema';
import { checkJwtKey } from '../utils/checkJwtKey';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { authService } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
  user?: LoginPayload;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const refreshHeader = req.headers["x-refresh-token"] as string;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const { jwtSecretKey } = checkJwtKey();

  try {
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
    if (error instanceof TokenExpiredError) {
      if (!refreshHeader) {
        res.status(401).json({ message: "Access token expired. No refresh token provided" });
      }

      try {
        const { newAccessToken, newRefreshToken } = await authService.refreshToken(refreshHeader);

        res.setHeader("x-access-token", newAccessToken);
        res.setHeader("x-refresh-token", newRefreshToken);

        const newPayload = jwt.decode(newAccessToken) as JwtPayload;

        req.user = {
          sub: Number(newPayload.sub),
          uniqueUUID: newPayload.uniqueUUID,
          date: new Date(newPayload.date)
        };

        next();
        return;
      } catch (refreshError) {
        res.status(401).json({ message: "Refresh token invalid or expired", error: refreshError });
      }
    }

    res.status(401).json({ message: "Unauthorized", error });
  }
};
