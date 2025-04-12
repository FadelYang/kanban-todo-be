import { taskRepository } from './../repositories/task.repository';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task.schema';

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
  }
};