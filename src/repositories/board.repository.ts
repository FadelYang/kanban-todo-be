import { prisma } from '..';
import { CreateBoardInput } from '../schema/board.schema';

export const boardRepository = {
  create: async (data: CreateBoardInput) => {
    return await prisma.board.create({ data });
  },

  createMany: async (data: CreateBoardInput[]) => {
    return await prisma.board.createMany({ data });
  },

  getSpesific: async(query: Object) => {
    return await prisma.board.findFirst({
      where: query
    })
  }
};