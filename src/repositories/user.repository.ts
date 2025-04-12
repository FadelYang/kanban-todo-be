import { prisma } from "../index";
import { CreateUserInput } from '../schema/user.schema';

export const userRepository = {
  create: async (data: CreateUserInput) => {
    return prisma.user.create({ data });
  },

  getById: async (userId: number) => {
    return prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  },

  getByEmail: async (userEmail: string) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        email: userEmail
      }
    })
  }
};