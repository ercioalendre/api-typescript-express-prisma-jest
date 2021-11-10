import { appError } from "@components/errors/AppError";
import { User } from "@entities/User.entity";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";
import { getOneUserRepository } from "@requirements/users/implementations";
import { IGetOneUserUseCase } from "@requirements/users/useCases/interfaces/IGetOneUser.useCase";

class GetOneUserUseCase implements IGetOneUserUseCase {
  private getOneUserRepository: IGetOneUserRepository;

  constructor() {
    this.getOneUserRepository = getOneUserRepository;
  }

  async execute(id: IUserUniqueFieldsDto): Promise<User | null | void> {
    const user = await this.getOneUserRepository.execute(id);

    if (user) {
      return user;
    } else {
      throw appError({
        message: "Nenhum usuário encontrado.",
        statusCode: 400,
      });
    }
  }
}

export function getOneUserUseCase(): GetOneUserUseCase {
  return new GetOneUserUseCase();
}
