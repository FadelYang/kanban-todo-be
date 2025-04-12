import { Request, Response, NextFunction } from 'express';
import { checkError } from '../utils/errors';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { insertUserSubToReqBody } from '../utils/insertUserSubToReqBody';
import { taskService } from '../services/task.service';
import { createTaskSchema, updateTaskSchema } from '../schema/task.schema';

export const taskController = {
  getDetail: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { task_id } = req.params;
      const { userId } = insertUserSubToReqBody(req);
      const taskDetail = await taskService.getSpesific({
        id: task_id,
        user_id: userId
      });
      res.status(200).json({
        message: "Success get task detail",
        data: taskDetail
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  create: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { board_id } = req.params;
      req.body.board_id = +board_id;
      const { reqBody } = insertUserSubToReqBody(req);
      const data = createTaskSchema.parse(reqBody);
      const createdTask = await taskService.create(data);
      res.status(201).json({
        message: "Success create new task",
        data: createdTask
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  update: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const data = updateTaskSchema.parse(req.body);
      const { task_id } = req.params;
      const updatedTask = await taskService.update(data, +task_id);
      res.status(201).json({
        message: "Sucess update a task",
        data: updatedTask
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { task_id } = req.params;
      const deletedTask = await taskService.delete(+task_id);
      res.status(201).json({
        message: "Success delete a task",
        data: deletedTask
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  updateTaskStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { task_id } = req.params;
      const { reqBody } = insertUserSubToReqBody(req);
      const data = updateTaskSchema.parse(reqBody);
      if (!data.user_id) throw new Error("User id not found")
      const {updatedTask, updatedTo} = await taskService.updateTaskStatus(data, +task_id, data.user_id)
      res.status(201).json({
        message: `Success update task to ${updatedTo.name.toLowerCase()}`,
        data: updatedTask
      })
    } catch (error) {
      checkError(res, next, error);
    }
  }
};