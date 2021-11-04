import { User } from "@entities/User.entity";
import { Prisma, PrismaClient } from "@prisma/client";
import { IGetOneUserRepository } from "@repositories/users/IGetOneUser.repository";

export default class GetOneUserRepository implements IGetOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(colunmAndValue: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const users = this.prisma.user;

    try {
      return await users.findUnique({
        where: colunmAndValue,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
