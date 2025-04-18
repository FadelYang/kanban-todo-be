import { Router } from 'express';
import { taskController } from './../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const taskRouter = Router();

taskRouter.get("/", authMiddleware, taskController.getAll);
taskRouter.get("/:task_id", authMiddleware, taskController.getDetail);
taskRouter.post("/:board_id", authMiddleware, taskController.create);
taskRouter.put("/:task_id", authMiddleware, taskController.update);
taskRouter.delete("/:task_id", authMiddleware, taskController.delete);
taskRouter.put("/:task_id/status", authMiddleware, taskController.updateTaskStatus)

export default taskRouter;