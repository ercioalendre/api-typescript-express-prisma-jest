import AppError from "@components/errors/AppError";
import { User } from ".prisma/client";
import { IUser } from "@modules/users/interfaces/IUser.interface";
import FindOneUser from "@modules/users/repositories/FindOneUser.repository";
import CreateOneUser from "@modules/users/repositories/CreateOneUser.repository";

export default class CreateUserService {
  static async execute({
    full_name,
    email,
    phone,
    password,
  }: IUser): Promise<User | null | undefined> {
    const emailExists = await FindOneUser.execute({ email });

    if (emailExists) {
      throw new AppError({
        message: "Este endereço de e-mail já está cadastrado.",
        statusCode: 400,
      });
    }

    const phoneExists = await FindOneUser.execute({ phone });

    if (phoneExists) {
      throw new AppError({
        message: "Este número de telefone já está cadastrado.",
        statusCode: 400,
      });
    }

    const createNewUser = await CreateOneUser.execute({
      full_name,
      email,
      phone,
      password,
    });

    return createNewUser;
  }
}
