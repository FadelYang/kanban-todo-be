import { Request, Response, NextFunction } from 'express';
import { createBoardSchema, updateBoardSchema } from '../schema/board.schema';
import { boardService } from '../services/board.service';
import { checkError } from '../utils/errors';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const boardController = {
  getDetail: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { board_id } = req.params;
      const userId = req.user?.sub;
      const boardDetail = await boardService.getSpesific({
        id: board_id,
        user_id: userId
      });
      res.status(200).json({
        message: "Success get board detail",
        data: boardDetail
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createBoardSchema.parse(req.body);
      const createdBoard = await boardService.create(data);
      res.status(201).json({
        message: "Success create new board",
        data: createdBoard
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = updateBoardSchema.parse(req.body);
      const { board_id } = req.params;
      const updatedBoard = await boardService.update(data, +board_id);
      res.status(201).json({
        message: "Sucess update a board",
        data: updatedBoard
      });
    } catch (error) {
      checkError(res, next, error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { board_id } = req.params;
      const deletedBoard = await boardService.delete(+board_id);
      res.status(201).json({
        message: "Success delete a board",
        data: deletedBoard
      });
    } catch (error) {
      checkError(res, next, error);
    }
  }
};