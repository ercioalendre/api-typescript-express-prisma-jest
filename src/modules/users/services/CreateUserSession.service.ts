import jwt from "@config/auth/jwt";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UsersRepository from "@modules/users/repositories/Users.repository";
import AppError from "@shared/errors/AppError";
import IUserSession from "../interfaces/IUserSession.interface";

export default class CreateSysUserSessionService {
  static async execute(email: string, password: string): Promise<IUserSession> {
    const user = Object.create(await UsersRepository.findByEmail(email));
    const userPassword = user.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw new AppError({
        message: "E-mail ou senha incorretos.",
        statusCode: 401,
      });
    }

    const id = user.id;

    const token = sign({ name: user.full_name, type: "user" }, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    });

    return {
      id,
      token,
    };
  }
}
