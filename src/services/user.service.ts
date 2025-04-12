import { boardRepository } from '../repositories/board.repository';
import { taskRepository } from '../repositories/task.repository';
import { userRepository } from '../repositories/user.repository';
import { CreateBoardInput } from '../schema/board.schema';
import { CreateTaskInput } from '../schema/task.schema';
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

    await boardRepository.createMany(defaultBoard);

    const todoBoard = await boardRepository.getSpesific({
      name: "Todo",
      user_id: newUser.id
    });

    if (!todoBoard) {
      throw new Error("Board not found");
    }

    // create sample task
    const defaultTask: CreateTaskInput = {
      user_id: newUser.id,
      title: "Example Task",
      description: "This is short description of your task",
      board_id: todoBoard?.id
    };

    await taskRepository.create(defaultTask);

    return newUser;
  },

  getById: async (userId: number) => {
    return userRepository.getById(userId);
  }
};