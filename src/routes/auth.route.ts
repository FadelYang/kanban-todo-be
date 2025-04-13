import { Router } from "express";
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authMiddleware, authController.logout);

export default authRouter