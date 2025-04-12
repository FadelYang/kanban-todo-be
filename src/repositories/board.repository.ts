import { prisma } from '..';
import { CreateBoardInput } from '../schema/board.schema';

export const boardRepository = {
  create: async (data: CreateBoardInput) => {
    return prisma.board.create({ data });
  }
};