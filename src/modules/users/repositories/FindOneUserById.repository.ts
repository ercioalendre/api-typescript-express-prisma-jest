import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const users = prisma.user;

export default class FindOneUserByIdRepository {
  static async execute(id: string): Promise<User | null> {
    try {
      return await users.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
