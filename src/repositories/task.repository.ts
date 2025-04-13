import { prisma } from '..';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task.schema';

export const taskRepository = {
  create: async (data: CreateTaskInput) => {
    return await prisma.task.create({ data });
  },

  getSpesific: async (query: Object) => {
    return await prisma.task.findFirst({
      where: query,
    });
  },

  getAll: async (query: Object) => {
    return await prisma.task.findMany({
      where: query,
    });
  },

  update: async (data: UpdateTaskInput, taskId: number) => {
    return await prisma.task.update({
      where: {
        id: taskId
      },
      data: data
    });
  },

  delete: async (taskId: number) => {
    return await prisma.task.delete({
      where: {
        id: taskId
      }
    })
  }
};