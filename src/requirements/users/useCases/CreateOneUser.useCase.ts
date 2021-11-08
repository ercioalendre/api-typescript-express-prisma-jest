import { appError } from "@components/errors/AppError";
import { getOneUserRepository } from "@repositories/users/implementations/prisma/GetOneUser.repository";
import { createOneUserRepository } from "@repositories/users/implementations/prisma/CreateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";
import { hash } from "bcryptjs";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { ICreateOneUserRepository } from "@repositories/users/interfaces/ICreateOneUser.repository";
import { ICreateOneUserUseCase } from "./interfaces/ICreateOneUser.useCase";
import { User } from "@entities/User.entity";

class CreateOneUserUseCase implements ICreateOneUserUseCase {
  private getOneUserRepository: IGetOneUserRepository;
  private createOneUserRepository: ICreateOneUserRepository;

  constructor() {
    this.getOneUserRepository = getOneUserRepository();
    this.createOneUserRepository = createOneUserRepository();
  }

  async execute(data: IUserDto): Promise<User | null | undefined> {
    const emailExists = await this.getOneUserRepository.execute({ email: data.email });

    if (emailExists) {
      throw appError({
        message: "Este endereço de e-mail já está cadastrado.",
        statusCode: 400,
      });
    }

    const phoneExists = await this.getOneUserRepository.execute({ phone: data.phone });

    if (phoneExists) {
      throw appError({
        message: "Este número de telefone já está cadastrado.",
        statusCode: 400,
      });
    }

    const hashedPassword = await hash(data.password, 8);
    data.password = hashedPassword;

    const createNewUser = await this.createOneUserRepository.execute(data);

    return createNewUser;
  }
}

export function createOneUserUseCase(): CreateOneUserUseCase {
  return new CreateOneUserUseCase();
}
