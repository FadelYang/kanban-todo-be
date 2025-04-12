import { Router } from "express";
import userRouter from './user.route';
import authRouter from './auth.route';
import boardRouter from './board.route';
import taskRouter from './task.route';

const router = Router();

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/boards", boardRouter)
router.use("/tasks", taskRouter)

export default router