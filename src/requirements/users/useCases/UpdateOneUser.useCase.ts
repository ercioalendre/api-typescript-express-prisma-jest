import { appError } from "@components/errors/AppError";
import { User } from "@entities/User.entity";
import { IUserDto } from "@requirements/dto/users/IUser.dto";
import { CheckFields } from "@components/providers/CheckFields.provider";
import { hash } from "bcryptjs";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IUpdateOneUserRepository } from "@repositories/users/interfaces/IUpdateOneUser.repository";
import { IUpdateOneUserUseCase } from "@requirements/users/useCases/interfaces/IUpdateOneUser.useCase";
import { getOneUserRepository, updateOneUserRepository } from "@requirements/users/implementations";

class UpdateOneUserUseCase implements IUpdateOneUserUseCase {
  private getOneUserRepository: IGetOneUserRepository;
  private updateOneUserRepository: IUpdateOneUserRepository;

  constructor() {
    this.getOneUserRepository = getOneUserRepository;
    this.updateOneUserRepository = updateOneUserRepository;
  }

  async execute(data: IUserDto): Promise<User | null | undefined> {
    const user = await this.getOneUserRepository.execute({ id: data.id });

    if (!user) {
      throw appError({
        message: "O usuário que você está tentando editar não existe.",
        statusCode: 400,
      });
    }

    if (data.name || data.email || data.phone || data.password) {
      if (data.name && CheckFields.inputName(data.name)) {
        user.name = data.name.toUpperCase();
      }

      if (data.email && CheckFields.inputEmail(data.email)) {
        const emailExists = await this.getOneUserRepository.execute({ email: data.email });

        if (emailExists) {
          if (emailExists.id === user.id) {
            throw appError({
              message: "Você já está usando o e-mail que está tentando alterar.",
              statusCode: 400,
            });
          } else {
            throw appError({
              message: "O e-mail que você está tentando utilizar já está em uso.",
              statusCode: 400,
            });
          }
        }

        user.email = data.email;
      }

      if (data.phone && CheckFields.inputPhone(data.phone)) {
        user.phone = data.phone;
      }

      if (data.password && CheckFields.inputPassword(data.password)) {
        const hashedPassword = await hash(data.password, 8);
        user.password = hashedPassword;
      }

      user.SocialMedias = data.SocialMedias;

      return await this.updateOneUserRepository.execute(user);
    } else {
      throw appError({
        message: "Não foi possível editar este usuário: dados inválidos.",
        statusCode: 500,
      });
    }
  }
}

export function updateOneUserUseCase(): UpdateOneUserUseCase {
  return new UpdateOneUserUseCase();
}
