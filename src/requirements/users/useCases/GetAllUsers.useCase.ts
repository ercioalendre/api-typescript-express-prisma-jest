import { appError } from "@components/errors/AppError";
import { User } from "@entities/User.entity";
import { IGetAllUsersRepository } from "@repositories/users/interfaces/IGetAllUsers.repository";
import { getAllUsersRepository } from "@repositories/users/implementations/prisma/GetAllUsers.repository";
import { IGetAllUsersUseCase } from "./interfaces/IGetAllUsers.useCase";

class GetAllUsersUseCase implements IGetAllUsersUseCase {
  private getAllUsersRepository: IGetAllUsersRepository;

  constructor() {
    this.getAllUsersRepository = getAllUsersRepository();
  }

  async execute(): Promise<User[] | null | void> {
    const users = await this.getAllUsersRepository.execute();

    if (users && users.length >= 1) {
      return users;
    } else {
      throw appError({
        message: "Nenhum usuário encontrado.",
        statusCode: 400,
      });
    }
  }
}

export function getAllUsersUseCase(): GetAllUsersUseCase {
  return new GetAllUsersUseCase();
}
