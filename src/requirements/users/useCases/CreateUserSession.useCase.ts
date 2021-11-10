import { jwt } from "@requirements/dto/users/IJwt.dto";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { appError } from "@components/errors/AppError";
import { IUserSessionDto } from "@requirements/dto/users/IUserSession.dto";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { ICreateUserSessionUseCase } from "@requirements/users/useCases/interfaces/ICreateUserSession.useCase";
import { User } from "@entities/User.entity";
import { getOneUserRepository } from "@requirements/users/implementations";

class CreateUserSessionUseCase implements ICreateUserSessionUseCase {
  private getOneUserRepository: IGetOneUserRepository;

  constructor() {
    this.getOneUserRepository = getOneUserRepository;
  }

  async execute(email: string, password: string): Promise<IUserSessionDto> {
    const user = Object.create((await this.getOneUserRepository.execute({ email })) as User);
    const userPassword = user.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw appError({
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

export function createUserSessionUseCase(): CreateUserSessionUseCase {
  return new CreateUserSessionUseCase();
}
