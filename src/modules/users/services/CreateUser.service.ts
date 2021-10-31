import UsersRepository from "@modules/users/repositories/Users.repository";
import AppError from "@shared/errors/AppError";
import { User } from ".prisma/client";
import { IUser } from "@modules/users/interfaces/IUser.interface";

export default class CreateUserService {
  static async execute({
    full_name,
    email,
    phone,
    password,
  }: IUser): Promise<User | null | undefined> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError({
        message: "Este endereço de e-mail já está cadastrado.",
        statusCode: 400,
      });
    }

    const phoneExists = await UsersRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError({
        message: "Este número de telefone já está cadastrado.",
        statusCode: 400,
      });
    }

    const createNewUser = await UsersRepository.create({
      full_name,
      email,
      phone,
      password,
    });

    return createNewUser;
  }
}
