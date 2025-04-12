import { boardRepository } from '../repositories/board.repository';
import { userRepository } from '../repositories/user.repository';
import { CreateBoardInput } from '../schema/board.schema';
import { CreateUserInput } from '../schema/user.schema';

export const userService = {
  create: async (data: CreateUserInput) => {
    const newUser = await userRepository.create(data);

    // create default board for new user
    const defaultBoard: CreateBoardInput[] = [
      {
        name: "Todo",
        user_id: newUser.id
      },
      {
        name: "On Going",
        user_id: newUser.id
      },
      {
        name: "Completed",
        user_id: newUser.id
      }
    ];

    const createdBoard = await boardRepository.createMany(defaultBoard);

    return newUser;
  },

  getById: async (userId: number) => {
    return userRepository.getById(userId);
  }
};