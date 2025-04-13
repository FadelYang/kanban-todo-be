import { Router } from 'express';
import { boardController } from '../controllers/board.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const boardRouter = Router();

boardRouter.get("/", authMiddleware, boardController.getAll)
boardRouter.get("/:board_id", authMiddleware, boardController.getDetail);
boardRouter.post("/", authMiddleware, boardController.create);
boardRouter.put("/:board_id", authMiddleware, boardController.update);
boardRouter.delete("/:board_id", authMiddleware, boardController.delete);

export default boardRouter;