import { taskRepository } from './../repositories/task.repository';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task.schema';
import { boardRepository } from '../repositories/board.repository';
import { Board } from '../../generated/prisma';

export const taskService = {
  create: async (data: CreateTaskInput) => {
    return await taskRepository.create(data);
  },

  getSpesific: async (query: Object) => {
    return await taskRepository.getSpesific(query);
  },

  update: async (data: UpdateTaskInput, taskId: number) => {
    return await taskRepository.update(data, taskId);
  },

  delete: async (taskId: number) => {
    return await taskRepository.delete(taskId);
  },

  updateTaskStatus: async (data: UpdateTaskInput, taskId: number, userId: number) => {
    // check is the board is have by user
    const updatedTo = await boardRepository.getSpesific({
      id: data.board_id
    });

    if (!updatedTo) {
      throw new Error("Board not found");
    }

    if (updatedTo.user_id !== userId) {
      throw new Error("You can't access the board");
    }

    const updatedTask = await taskRepository.update(data, taskId);

    return { updatedTask, updatedTo };
  }
};