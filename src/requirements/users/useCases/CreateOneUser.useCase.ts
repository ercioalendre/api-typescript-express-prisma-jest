import AppError from "@components/errors/AppError";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import CreateOneUserRepository from "@repositories/users/implementations/prisma/CreateOneUser.repository";
import { User as PrismaUserObject } from "@prisma/client";
import IUserDto from "@requirements/dto/users/IUser.dto";
import { hash } from "bcryptjs";

export default class CreateOneUserUseCase {
  private getOneUserRepository: GetOneUserRepository;
  private createOneUserRepository: CreateOneUserRepository;

  constructor() {
    this.getOneUserRepository = new GetOneUserRepository();
    this.createOneUserRepository = new CreateOneUserRepository();
  }

  async execute(data: IUserDto): Promise<PrismaUserObject | null | undefined> {
    const emailExists = await this.getOneUserRepository.execute({ email: data.email });

    if (emailExists) {
      throw new AppError({
        message: "Este endereço de e-mail já está cadastrado.",
        statusCode: 400,
      });
    }

    const phoneExists = await this.getOneUserRepository.execute({ phone: data.phone });

    if (phoneExists) {
      throw new AppError({
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
