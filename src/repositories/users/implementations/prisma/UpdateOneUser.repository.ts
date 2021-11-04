import prismaClient from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { IUpdateOneUserRepository } from "@repositories/users/IUpdateOneUser.repository";
import IUserDto from "@requirements/dto/users/IUser.dto";

export default class UpdateOneUserRepository implements IUpdateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<User | null> {
    const users = this.prisma.user;

    try {
      return await users.update({
        where: {
          id: data.id,
        },
        data,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
