import { prisma } from '..';
import { CreateTaskInput } from '../schema/task.schema';

export const taskRepository = {
  create: async (data: CreateTaskInput) => {
    return await prisma.task.create({ data });
  }
};