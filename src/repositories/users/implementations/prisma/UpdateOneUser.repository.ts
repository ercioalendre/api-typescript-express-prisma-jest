import { prismaClient } from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { IUpdateOneUserRepository } from "@repositories/users/interfaces/IUpdateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";

class UpdateOneUserRepository implements IUpdateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<User | null> {
    const users = this.prisma.user;

    try {
      return (await users.update({
        where: {
          id: data.id,
        },
        data,
      })) as User;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function updateOneUserRepository(): UpdateOneUserRepository {
  return new UpdateOneUserRepository();
}
