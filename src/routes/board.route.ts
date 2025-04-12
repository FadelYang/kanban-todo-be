import { Router } from 'express';
import { boardController } from '../controllers/board.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const boardRouter = Router();

boardRouter.get("/", authMiddleware, boardController.getDetail)