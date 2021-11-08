import { User } from "@entities/User.entity";
import { appError } from "@components/errors/AppError";
import { getOneUserRepository } from "@repositories/users/implementations/prisma/GetOneUser.repository";
import { deleteOneUserRepository } from "@repositories/users/implementations/prisma/DeleteOneUser.repository";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IDeleteOneUserRepository } from "@repositories/users/interfaces/IDeleteOneUser.repository";
import { IDeleteOneUserUseCase } from "./interfaces/IDeleteOneUser.useCase";

class DeleteOneUserUseCase implements IDeleteOneUserUseCase {
  private getOneUserRepository: IGetOneUserRepository;
  private deleteOneUserRepository: IDeleteOneUserRepository;

  constructor() {
    this.getOneUserRepository = getOneUserRepository();
    this.deleteOneUserRepository = deleteOneUserRepository();
  }

  async execute(data: IUserUniqueFieldsDto): Promise<User | null | string> {
    const user = await this.getOneUserRepository.execute(data);

    if (!user) {
      throw appError({
        message: "O usuário que você está tentando excluir não existe.",
        statusCode: 400,
      });
    }

    return await this.deleteOneUserRepository.execute(data);
  }
}

export function deleteOneUserUseCase(): DeleteOneUserUseCase {
  return new DeleteOneUserUseCase();
}
