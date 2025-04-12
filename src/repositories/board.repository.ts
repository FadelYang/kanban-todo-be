import { prisma } from '..';
import { CreateBoardInput, UpdateBoardInput } from '../schema/board.schema';

export const boardRepository = {
  create: async (data: CreateBoardInput) => {
    return await prisma.board.create({ data });
  },

  createMany: async (data: CreateBoardInput[]) => {
    return await prisma.board.createMany({ data });
  },

  getSpesific: async (query: Object) => {
    return await prisma.board.findFirstOrThrow({
      where: query,
      include: {
        Task: true
      }
    });
  },

  getMany: async (query: Object) => {
    return await prisma.board.findMany({
      where: query
    })
  },

  update: async (data: UpdateBoardInput, boardId: number) => {
    return await prisma.board.update({
      where: {
        id: boardId
      },
      data: data
    });
  },

  delete: async (boardId: number) => {
    return await prisma.board.delete({
      where: {
        id: boardId
      }
    })
  }
};