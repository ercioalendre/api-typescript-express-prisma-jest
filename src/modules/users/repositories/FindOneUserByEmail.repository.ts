import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const users = prisma.user;

export default class FindOneUserByEmail {
  static async execute(email: string): Promise<User | null> {
    try {
      return await users.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
