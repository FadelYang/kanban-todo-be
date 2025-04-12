import { compare } from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { LoginPayload, LoginUserType } from '../schema/auth.schema';
import { UserType } from '../schema/user.schema';
import { randomUUID } from 'crypto';
import jwt from "jsonwebtoken";
import { checkJwtKey } from '../utils/checkJwtKey';

export const authServie = {
  login: async (data: LoginUserType) => {
    const user: UserType | null = await userRepository.getByEmail(data.email);
    const { password, id, ...safeUser } = user;

    if (!(await compare(data.password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const payload: LoginPayload = {
      sub: user.id,
      uniqueUUID: randomUUID(),
      date: new Date()
    };

    const { jwtSecretKey, jwtRefreshKey } = checkJwtKey();

    const accessToken = jwt.sign(payload, jwtSecretKey, {
      expiresIn: '15m'
    });

    const refreshToken = jwt.sign(payload, jwtRefreshKey, {
      expiresIn: '7d'
    });

    return {
      user: safeUser,
      accessToken,
      refreshToken
    };
  },

  refreshToken: async (token: string) => {
    const { jwtSecretKey, jwtRefreshKey } = checkJwtKey();
    const payload = jwt.verify(token, jwtRefreshKey);

    const newPayLoad = {
      sub: payload.sub,
      uniqueUUID: randomUUID(),
      date: new Date()
    };

    const newAccessToken = jwt.sign(newPayLoad, jwtSecretKey, {
      expiresIn: '15m'
    });

    const newRefreshToken = jwt.sign(newPayLoad, jwtRefreshKey, {
      expiresIn: '7d'
    });

    return { newAccessToken, newRefreshToken };
  }
};