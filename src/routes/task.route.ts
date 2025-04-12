import { Router } from 'express';
import { taskController } from './../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const taskRouter = Router();

taskRouter.get("/", authMiddleware, taskController.getDetail);
taskRouter.post("/", authMiddleware, taskController.create);
taskRouter.put("/:task_id", authMiddleware, taskController.update);
taskRouter.delete("/:task_id", authMiddleware, taskController.delete);

export default taskRouter;