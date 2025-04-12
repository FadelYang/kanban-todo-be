import { userRepository } from '../repositories/user.repository';
import { CreateUserInput } from '../schema/user.schema';

export const userService = {
  create: async (data: CreateUserInput) => {
    return userRepository.create(data);
  },
  
  getById: async (userId: number) => {
    return userRepository.getById(userId);
  }
};