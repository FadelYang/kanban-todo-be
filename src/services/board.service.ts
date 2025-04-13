import { boardRepository } from '../repositories/board.repository';
import { CreateBoardInput, UpdateBoardInput } from '../schema/board.schema';

export const boardService = {
  create: async (data: CreateBoardInput) => {
    return await boardRepository.create(data);
  },

  createMany: async (data: CreateBoardInput[]) => {
    return await boardRepository.createMany(data);
  },

  getSpesific: async (query: Object) => {
    return await boardRepository.getSpesific(query);
  },

  getAll: async (query: Object) => {
    return await boardRepository.getMany(query);
  },

  update: async (data: UpdateBoardInput, boardId: number) => {
    return await boardRepository.update(data, boardId);
  },

  delete: async (boardId: number) => {
    return await boardRepository.delete(boardId);
  }
};