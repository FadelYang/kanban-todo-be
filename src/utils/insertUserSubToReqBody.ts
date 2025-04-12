import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const insertUserSubToReqBody = (req: AuthenticatedRequest) => {
  
  const userId = req.user?.sub;

  if (!req.body) {
    req.body = {};
  }

  req.body.user_id = userId;

  return {
    userId,
    reqBody: req.body
  };
};