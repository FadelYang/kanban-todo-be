import { Router } from "express";
import { userController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post("/register", userController.create);

export default userRouter;