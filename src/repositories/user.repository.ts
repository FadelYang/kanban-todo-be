import { prisma } from "../index";
import { CreateUserInput } from '../schema/user.schema';

export const userRepository = {
  create: async (data: CreateUserInput) => {
    return prisma.user.create({ data });
  }
};