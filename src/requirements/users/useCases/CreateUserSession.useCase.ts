import jwt from "@requirements/dto/users/IJwt.dto";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError from "@components/errors/AppError";
import IUserSessionDto from "@requirements/dto/users/IUserSession.dto";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import { IGetOneUserRepository } from "@repositories/users/IGetOneUser.repository";

export default class CreateSysUserSessionService {
  private getOneUserRepository: IGetOneUserRepository;

  constructor() {
    this.getOneUserRepository = new GetOneUserRepository();
  }

  async execute(email: string, password: string): Promise<IUserSessionDto> {
    const user = Object.create(await this.getOneUserRepository.execute({ email }));
    const userPassword = user.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw new AppError({
        message: "E-mail ou senha incorretos.",
        statusCode: 401,
      });
    }

    const id = user.id;

    const token = sign({ name: user.name, type: "user" }, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    });

    return {
      id,
      token,
    };
  }
}
