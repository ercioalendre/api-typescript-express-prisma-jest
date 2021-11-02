import { PrismaClient, User } from "@prisma/client";
import { hash } from "bcryptjs";
import { IUser } from "@modules/users/interfaces/IUser.interface";

const prisma = new PrismaClient();
const users = prisma.user;

export default class CreateOneUser {
  static async execute({ full_name, email, phone, password }: IUser): Promise<User | null> {
    const hashedPassword = await hash(password, 8);

    const data = {
      full_name,
      email,
      phone,
      password: hashedPassword,
    };

    try {
      return await users.create({
        data,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
