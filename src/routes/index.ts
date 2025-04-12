import { Router } from "express";
import userRouter from './user.route';
import authRouter from './auth.route';
import boardRouter from './board.route';

const router = Router();

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/boards", boardRouter)

export default router