import { User } from "@entities/User.entity";
import AppError from "@components/errors/AppError";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import DeleteOneUserRepository from "@repositories/users/implementations/prisma/DeleteOneUser.repository";
import IUserUniqueFieldsDto from "@requirements/dto/users/IUserUniqueFields.dto";

export default class DeleteOneUserUseCase {
  private getOneUserRepository: GetOneUserRepository;
  private deleteOneUserRepository: DeleteOneUserRepository;

  constructor() {
    this.getOneUserRepository = new GetOneUserRepository();
    this.deleteOneUserRepository = new DeleteOneUserRepository();
  }

  async execute(data: IUserUniqueFieldsDto): Promise<User | null | string> {
    const user = await this.getOneUserRepository.execute(data);

    if (!user) {
      throw new AppError({
        message: "O usuário que você está tentando excluir não existe.",
        statusCode: 400,
      });
    }

    return await this.deleteOneUserRepository.execute(data);
  }
}
