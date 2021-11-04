import prismaClient from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { ICreateOneUserRepository } from "@repositories/users/ICreateOneUser.repository";
import IUserDto from "@requirements/dto/users/IUser.dto";

export default class CreateOneUserRepository implements ICreateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<User | null> {
    const users = this.prisma.user;
    const user = new User(data);

    try {
      return await users.create({
        data: user,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
