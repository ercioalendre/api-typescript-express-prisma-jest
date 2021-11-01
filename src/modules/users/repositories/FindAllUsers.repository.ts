import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const users = prisma.user;

export default class FindAllUsers {
  static async execute(): Promise<User[] | null> {
    try {
      return await users.findMany();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
