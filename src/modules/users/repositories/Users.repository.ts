import { IUser } from "@modules/users/interfaces/IUser.interface";
import { hash } from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const Users = prisma.user;

export default class UsersRepository {
  static async findById(id: string | undefined): Promise<User | null> {
    return await Users.findUnique({
      where: {
        id,
      },
    });
  }

  static async findByPhone(phone: string): Promise<User | null> {
    return await Users.findUnique({
      where: {
        phone,
      },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return await Users.findUnique({
      where: {
        email,
      },
    });
  }

  static async findAll(): Promise<User[] | null> {
    return await Users.findMany();
  }

  static async deleteById(id: string): Promise<User | null> {
    return await Users.delete({
      where: {
        id,
      },
    });
  }

  static async create({ full_name, email, phone, password }: IUser): Promise<User | null> {
    const hashedPassword = await hash(password, 8);
    const data = {
      full_name,
      email,
      phone,
      password: hashedPassword,
    };

    const user = await Users.create({
      data,
    });
    return user;
  }

  static async update(id: string | undefined, data: IUser): Promise<User | null> {
    const user = await Users.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }
}
