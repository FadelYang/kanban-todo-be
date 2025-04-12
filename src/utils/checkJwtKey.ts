import createHttpError from 'http-errors';

export const checkJwtKey = () => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const jwtRefreshKey = process.env.JWT_REFRESH_KEY;

  if (!jwtSecretKey || !jwtRefreshKey) throw createHttpError(400, "JWT Secret key not found");

  return {
    jwtSecretKey,
    jwtRefreshKey
  }
};