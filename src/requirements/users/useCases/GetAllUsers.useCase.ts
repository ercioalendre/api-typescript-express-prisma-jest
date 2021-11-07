import AppError from "@components/errors/AppError";
import { User } from "@entities/User.entity";
import { IGetAllUsersRepository } from "@repositories/users/IGetAllUsers.repository";
import GetAllUsersRepository from "@repositories/users/implementations/prisma/GetAllUsers.repository";

export default class GetAllUsersUseCase {
  private getAllUsersRepository: IGetAllUsersRepository;

  constructor() {
    this.getAllUsersRepository = new GetAllUsersRepository();
  }

  async execute(): Promise<User[] | null | void> {
    const users = await this.getAllUsersRepository.execute();

    if (users && users.length >= 1) {
      return users;
    } else {
      throw new AppError({
        message: "Nenhum usuário encontrado.",
        statusCode: 400,
      });
    }
  }
}
