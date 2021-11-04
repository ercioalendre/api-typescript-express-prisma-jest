import AppError from "@components/errors/AppError";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import { User } from "@entities/User.entity";
import IUserDto from "@requirements/dto/users/IUser.dto";
import UpdateOneUserRepository from "@repositories/users/implementations/prisma/UpdateOneUser.repository";
import CheckFields from "@components/providers/CheckFields.provider";
import { hash } from "bcryptjs";

export default class UpdateOneUserUseCase {
  private getOneUserRepository: GetOneUserRepository;
  private updateOneUserRepository: UpdateOneUserRepository;

  constructor() {
    this.getOneUserRepository = new GetOneUserRepository();
    this.updateOneUserRepository = new UpdateOneUserRepository();
  }

  async execute(data: IUserDto): Promise<User | null | undefined> {
    const user = await this.getOneUserRepository.execute({ id: data.id });

    if (!user) {
      throw new AppError({
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
            throw new AppError({
              message: "Você já está usando o e-mail que está tentando alterar.",
              statusCode: 400,
            });
          } else {
            throw new AppError({
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

      user.updatedAt = new Date();

      return await this.updateOneUserRepository.execute(data);
    } else {
      throw new AppError({
        message: "Não foi possível editar este usuário: dados inválidos.",
        statusCode: 500,
      });
    }
  }
}
