import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const users = prisma.user;

export default class FindOneUserRepository {
  static async execute(colunmAndValue: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      return await users.findUnique({
        where: colunmAndValue,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
