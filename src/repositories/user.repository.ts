import { prisma } from "../index";
import { CreateUserInput } from '../schema/user.schema';

export const userRepository = {
  create: async (data: CreateUserInput) => {
    return await prisma.user.create({ data });
  },

  getById: async (userId: number) => {
    return await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  },

  getByEmail: async (userEmail: string) => {
    return await prisma.user.findUniqueOrThrow({
      where: {
        email: userEmail
      }
    })
  }
};