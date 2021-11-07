import AppError from "@components/errors/AppError";
import { User } from "@entities/User.entity";
import { IGetOneUserRepository } from "@repositories/users/IGetOneUser.repository";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import IUserUniqueFieldsDto from "@requirements/dto/users/IUserUniqueFields.dto";

export default class GetAllUsersUseCase {
  private getOneUserRepository: IGetOneUserRepository;

  constructor() {
    this.getOneUserRepository = new GetOneUserRepository();
  }

  async execute(id: IUserUniqueFieldsDto): Promise<User | null | void> {
    const user = await this.getOneUserRepository.execute(id);

    if (user) {
      return user;
    } else {
      throw new AppError({
        message: "Nenhum usuário encontrado.",
        statusCode: 400,
      });
    }
  }
}
