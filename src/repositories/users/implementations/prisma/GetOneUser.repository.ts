import { prismaClient } from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";

class GetOneUserRepository implements IGetOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(colunmAndValue: IUserUniqueFieldsDto): Promise<User | null> {
    const users = this.prisma.user;

    try {
      return (await users.findUnique({
        where: colunmAndValue,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      })) as User;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function getOneUserRepository(): GetOneUserRepository {
  return new GetOneUserRepository();
}
